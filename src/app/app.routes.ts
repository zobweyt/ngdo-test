import { Routes } from "@angular/router";

export const ngdoRoutes: Routes = [
  {
    title: "All",
    path: "",
    pathMatch: "full",
    loadComponent: () => import("@/pages/home"),
    data: { icon: "home" },
  },
  {
    title: "Today",
    path: "today",
    pathMatch: "full",
    loadComponent: () => import("@/pages/today"),
    data: { icon: "today" },
  },
  {
    title: "Completed",
    path: "completed",
    pathMatch: "full",
    loadComponent: () => import("@/pages/completed"),
    data: { icon: "check" },
  },
  {
    title: "Settings",
    path: "settings",
    pathMatch: "full",
    loadComponent: () => import("@/pages/settings"),
    data: { icon: "settings" },
  },
];

export const routes: Routes = [
  ...ngdoRoutes,
];
