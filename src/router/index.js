import { createRouter, createWebHistory } from "vue-router"

import Accueil from "@/view/Accueil.vue";
import Recherche from "@/view/Recherche.vue";
import ListeRecherche from "@/view/ListeRecherche.vue";
import AnnonceVoiture from "@/view/AnnonceVoiture.vue";
import User from "@/view/User.vue";
import CreateAnnonce from "@/view/CreateAnnonce.vue";
import UserSettings from "@/view/UserSettings.vue";
import NotificationList from "@/view/NotificationList.vue";
import Notification from "@/view/Notification.vue"
import SupportList from "@/view/SupportList.vue";
import Support from "@/view/Support.vue";
import Connexion from "@/view/Connexion.vue";
import Inscription from "@/view/Inscription.vue";
import Upgrade from "@/view/Upgrade.vue";
import AdminPanel from "@/view/admin/AdminPanel.vue";
import AdminAnnonce from "@/view/admin/AdminAnnonce.vue";
import AdminUser from "@/view/admin/AdminUser.vue";
import AdminSupportList from "@/view/admin/AdminSupportList.vue";
import AdminSupportMessage from "@/view/admin/AdminSupportMessage.vue";
import AdminNotification from "@/view/admin/AdminNotification.vue";
import AdminParameters from "@/view/admin/AdminParameters.vue";
import {getToken, hasToken, logout} from "@/router/middleware";
import {ElMessage} from "element-plus";
import axios from "axios";
import jwt from "jsonwebtoken";

// Créez une instance de WebSocket
let socket = null;

// Définissez une fonction pour créer la connexion WebSocket
function createWebSocketConnection() {
    if(hasToken()){
        const token = getToken()
        const decoded = jwt.decode(token)
        let userId = null
        if(decoded !== null) {
            userId = decoded.id
        }
        socket = new window.WebSocket('ws://localhost:3001');

        // Gérez les événements WebSocket
        socket.onopen = () => {
            socket.send(JSON.stringify({ userId }));
        };

        socket.onclose = () => {
        };

        socket.onerror = (error) => {
            console.error('Erreur WebSocket:', error);
        };

        socket.onmessage = (event) => {
            if(event.data === "Vous avez été déconnecté car votre compte a été modifié."){
                logout()
                ElMessage.error({
                    showClose: true,
                    message: event.data,
                })
                router.push('/connexion')
            }else {
                const sound = new Audio(require('@/assets/notificationSound.mp3'))
                sound.volume = 0.5
                sound.play()
                ElMessage({
                    showClose: true,
                    message: event.data,
                    type: "success"
                })
            }
        };
    }
}

// Créez une fonction pour fermer la connexion WebSocket
function closeWebSocketConnection() {
    if (socket) {
        socket.close();
        socket = null;
    }
}

const router =createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            component: Accueil
        },
        {
            path: "/recherche",
            component: Recherche
        },
        {
            path: '/recherche/resultats',
            component: ListeRecherche
        },
        {
            path: '/annonce/voiture/:id',
            component: AnnonceVoiture,
            props: true
        },
        {
            path: '/user/:id',
            component: User,
            props: true
        },
        {
            path: '/createAnnonce',
            component: CreateAnnonce,
            beforeEnter: checkToken
        },
        {
            path: '/userSettings',
            component: UserSettings,
            beforeEnter: checkToken
        },
        {
            path: '/user/:idUser/modifyAnnonce/:id',
            component: CreateAnnonce,
            beforeEnter: checkToken
        },
        {
            path: '/notifications',
            component: NotificationList,
            beforeEnter: checkToken
        },
        {
            path: '/notifications/:id',
            component: Notification,
            beforeEnter: checkToken,
            props: true
        },
        {
            path: '/support',
            component: SupportList,
            beforeEnter: checkToken,
        },
        {
            path: '/support/:id',
            component: Support,
            beforeEnter: checkToken,
            props: true
        },
        {
            path: '/connexion',
            component: Connexion
        },
        {
            path: '/inscription',
            component: Inscription
        },
        {
            path: '/upgrade',
            component: Upgrade
        },
        {
            path: '/admin',
            component: AdminPanel,
            beforeEnter: checkToken
        },
        {
            path: '/admin/annonce',
            component: AdminAnnonce,
            beforeEnter: checkToken
        },
        {
            path: "/admin/user",
            component: AdminUser,
            beforeEnter: checkToken
        },
        {
            path: "/admin/support",
            component: AdminSupportList,
            beforeEnter: checkToken
        },
        {
            path: "/admin/support/:id",
            component: AdminSupportMessage,
            beforeEnter: checkToken,
            props: true
        },
        {
            path: "/admin/notification",
            component: AdminNotification,
            beforeEnter: checkToken
        },
        {
            path: "/admin/parametres",
            component: AdminParameters,
            beforeEnter: checkToken
        }
    ]
})

router.beforeEach((to, from, next) => {
    closeWebSocketConnection();
    next();
});

// Écoutez l'événement de navigation 'afterEach' de Vue Router
router.afterEach(() => {
    createWebSocketConnection();
});

function checkToken(to, from, next) {
    const token = getToken()
    axios.post("http://localhost:3000/token", token)
        .then((res) => {
            if (to.path.includes('admin')) {
                if (res.data.token.permission !== 10) {
                    ElMessage.error({
                        message: "Vous n'êtes pas administrateur !",
                        showClose: true
                    })
                    router.push('/')
                } else {
                    next()
                }
            } else {
                next()
            }
        })
        .catch((err) => {
            console.log(err)
            ElMessage.error({
                message: "Vous n'êtes pas connecté ou votre session a expiré.",
                showClose: true
            })
            logout()
            next('/connexion');
        })
}


export default router