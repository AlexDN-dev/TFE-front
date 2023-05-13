import { createRouter, createWebHistory } from "vue-router"

import Accueil from "@/view/Accueil.vue";
import Recherche from "@/view/Recherche.vue";
import ListeRecherche from "@/view/ListeRecherche.vue";
import AnnonceVoiture from "@/view/AnnonceVoiture.vue";
import AnnonceGarage from "@/view/AnnonceGarage.vue";
import User from "@/view/User.vue";
import CreateAnnonce from "@/view/CreateAnnonce.vue";
import UserSettings from "@/view/UserSettings.vue";
import GarageSettings from "@/view/GarageSettings.vue";
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
import AdminGarage from "@/view/admin/AdminGarage.vue";
import AdminParameters from "@/view/admin/AdminParameters.vue";
import {getToken, hasToken} from "@/router/middleware";
import {ElMessage} from "element-plus";
import axios from "axios";

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
            path: '/annonce/garage',
            component: AnnonceGarage
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
            path: '/garageSettings',
            component: GarageSettings,
            beforeEnter: checkToken
        },
        {
            path: '/notifications',
            component: NotificationList,
            beforeEnter: checkToken
        },
        {
            path: '/notifications/id',
            component: Notification,
            beforeEnter: checkToken
        },
        {
            path: '/support',
            component: SupportList
        },
        {
            path: '/support/id',
            component: Support
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
            path: "/admin/support/id",
            component: AdminSupportMessage,
            beforeEnter: checkToken
        },
        {
            path: "/admin/notification",
            component: AdminNotification,
            beforeEnter: checkToken
        },
        {
            path: "/admin/garage",
            component: AdminGarage,
            beforeEnter: checkToken
        },
        {
            path: "/admin/parametres",
            component: AdminParameters,
            beforeEnter: checkToken
        }
    ]
})

function checkToken(to, from, next) {
    if (hasToken()) {
        next();
    } else {
        const token = getToken()
        axios.post("http://localhost:3000/token", token)
            .then(() => {
                next()
            })
            .catch((err) => {
                console.log(err)
                ElMessage.error({
                    message: "Vous n'êtes pas connecté ou votre session à expiré.",
                    showClose: true
                })
            })
        next('/connexion');
    }
}

export default router