import { Pipe, PipeTransform } from "@angular/core";
import { marked } from "marked";

@Pipe({ name: "markdown" })
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string | Promise<string> {
    marked.use({
      renderer: {
        link({ href, title, text }) {
          return `<a target="_blank" href="${href}" title="${title || ''}">${text}</a>`;
        },
        heading({ text }) {
          return text;
        },
      },
      breaks: true,
    });

    return marked(value);
  }
}
