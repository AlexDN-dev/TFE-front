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
            path: '/annonce/voiture',
            component: AnnonceVoiture
        },
        {
            path: '/annonce/garage',
            component: AnnonceGarage
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/createAnnonce',
            component: CreateAnnonce
        },
        {
            path: '/userSettings',
            component: UserSettings
        },
        {
            path: '/garageSettings',
            component: GarageSettings
        },
        {
            path: '/notifications',
            component: NotificationList
        },
        {
            path: '/notifications/id',
            component: Notification
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
            component: AdminPanel
        },
        {
            path: '/admin/annonce',
            component: AdminAnnonce
        }
    ]
})

export default router