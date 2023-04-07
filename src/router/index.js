import { createRouter, createWebHistory } from "vue-router"
import Accueil from "@/view/Accueil.vue";
import Recherche from "@/view/Recherche.vue";
import ListeRecherche from "@/view/ListeRecherche.vue";
import Annonce from "@/view/Annonce.vue";

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
            path: '/annonce/id',
            component: Annonce
        }
    ]
})

export default router