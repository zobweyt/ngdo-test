import { NgModule } from "@angular/core";
import {
  NgdPlaceholder,
  NgdPlaceholderAction,
  NgdPlaceholderDescription,
  NgdPlaceholderIcon,
  NgdPlaceholderTitle,
} from "./placeholder.component";

@NgModule({
  imports: [
    NgdPlaceholder,
    NgdPlaceholderAction,
    NgdPlaceholderDescription,
    NgdPlaceholderIcon,
    NgdPlaceholderTitle,
  ],
  exports: [
    NgdPlaceholder,
    NgdPlaceholderAction,
    NgdPlaceholderDescription,
    NgdPlaceholderIcon,
    NgdPlaceholderTitle,
  ],
})
export class NgdPlaceholderModule {}
