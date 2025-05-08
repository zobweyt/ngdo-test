import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "ngd-placeholder",
  templateUrl: "placeholder.component.html",
  styleUrl: "placeholder.component.scss",
  host: { "class": "ngd-placeholder" },
  exportAs: "ngdPlaceholder",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPlaceholder {}

@Directive({
  selector: "[ngdPlaceholderIcon]",
  host: { "class": "ngd-placeholder__icon" },
})
export class NgdPlaceholderIcon {}

@Directive({
  selector: "[ngdPlaceholderTitle]",
  host: { "class": "ngd-placeholder__title" },
})
export class NgdPlaceholderTitle {}

@Directive({
  selector: "[ngdPlaceholderDescription]",
  host: { "class": "ngd-placeholder__description" },
})
export class NgdPlaceholderDescription {}

@Directive({
  selector: "[ngdPlaceholderAction]",
  host: { "class": "ngd-placeholder__action" },
})
export class NgdPlaceholderAction {}
