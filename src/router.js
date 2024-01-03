// 0.Import the createWebHashHistory and createRouter from vue-router
import { createWebHashHistory, createRouter } from "vue-router";

// 1. Define route components.
import HomeView from "./views/HomeView.vue";
import ProjectsView from "./views/ProjectsView.vue";
import SingleProjectView from "./views/SingleProjectView.vue";
//import AboutView from "./views/AboutView.vue";
import ContactsView from "./views/ContactsView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import TechnologyView from "./views/TechnologyView.vue";
import TypeView from "./views/TypeView.vue";

// 2. Define some routes
const routes = [
  { path: "/", component: HomeView },
  /* { path: '/about', component: AboutView }, */
  { path: "/projects", component: ProjectsView },
  {
    path: "/project/:id",
    name: "project",
    component: SingleProjectView,
  },

  { path: "/contacts", component: ContactsView },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundView",
    component: NotFoundView,
  },

  {
    path: "/technologies/:id",
    name: "technology",
    component: TechnologyView,
  },

  {
    path: "/types/:id",
    name: "type",
    component: TypeView,
  },
];

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes,
});

// export the vue router instance
export { router };
