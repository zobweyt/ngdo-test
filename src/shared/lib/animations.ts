// https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration

import { animate, style, transition, trigger } from "@angular/animations";

export const fadeHeight = trigger("fadeHeight", [
  transition(":enter", [
    style({ opacity: 0, height: 0 }),
    animate(
      "250ms cubic-bezier(0, 0, 0, 1)",
      style({ opacity: 1, height: "*" }),
    ),
  ]),
  transition(":leave", [
    style({ opacity: 1, height: "*" }),
    animate(
      "200ms cubic-bezier(0.3, 0, 1, 1)",
      style({ opacity: 0, height: 0 }),
    ),
  ]),
]);

export const fade = trigger("fade", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate(
      "250ms cubic-bezier(0, 0, 0, 1)",
      style({ opacity: 1 }),
    ),
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate(
      "200ms cubic-bezier(0.3, 0, 1, 1)",
      style({ opacity: 0 }),
    ),
  ]),
]);
