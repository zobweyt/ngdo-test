import CompletedComponent from "@/pages/completed";
import HomeComponent from "@/pages/home";
import SettingsComponent from "@/pages/settings";
import TodayComponent from "@/pages/today";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: "Home",
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    data: { icon: "home" },
  },
  {
    title: "Today",
    path: "today",
    pathMatch: "full",
    component: TodayComponent,
    data: { icon: "today" },
  },
  {
    title: "Completed",
    path: "completed",
    pathMatch: "full",
    component: CompletedComponent,
    data: { icon: "check" },
  },
  {
    title: "Settings",
    path: "settings",
    pathMatch: "full",
    component: SettingsComponent,
    data: { icon: "settings" },
  },
];
