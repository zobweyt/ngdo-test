import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ListService {
  public readonly lists = signal<string[]>([
    "List 1",
    "List 2",
    "List 3",
  ]);

  public createList(name: string): void {
    this.lists.update((lists) => [...lists, name]);
  }
}
