import { Theme } from "@/entities/theme";

export interface Settings {
  theme: Theme;
  /**
   * Delay in milliseconds
   */
  delayAfterCheckMark: number;
  confirmTaskDeletion: boolean;
  showTaskDeletionSnackbar: boolean;
  showTaskCompletionSnackbar: boolean;
  confirmListDeletion: boolean;
  showListDeletionSnackbar: boolean;
}
