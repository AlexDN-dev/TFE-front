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
        }
    ]
})

export default router