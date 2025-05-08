import { bootstrapApplication } from "@angular/platform-browser";
import { NgdRoot } from "./app.component";
import { config } from "./app.config";

bootstrapApplication(NgdRoot, config).catch((error) => console.error(error));
