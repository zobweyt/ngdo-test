import { Routes } from "@angular/router";
import { CompletedComponent } from "../pages/completed/completed.component";
import { HomeComponent } from "../pages/home/home.component";
import { SettingsComponent } from "../pages/settings/settings.component";
import { TodayComponent } from "../pages/today/today.component";

export const ngdoRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    title: "All",
    data: { icon: "home" },
  },
  {
    path: "today",
    component: TodayComponent,
    pathMatch: "full",
    title: "Today",
    data: { icon: "today" },
  },
  {
    path: "completed",
    component: CompletedComponent,
    pathMatch: "full",
    title: "Completed",
    data: { icon: "check" },
  },
  {
    path: "settings",
    component: SettingsComponent,
    pathMatch: "full",
    title: "Settings",
    data: { icon: "settings" },
  },
];

export const routes: Routes = [
  ...ngdoRoutes,
];
