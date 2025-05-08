import { Settings } from "./settings.model";

export const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  delayAfterCheckMark: 500,
  confirmTaskDeletion: true,
  showTaskDeletionSnackbar: true,
  showTaskCompletionSnackbar: true,
  confirmListDeletion: true,
  showListDeletionSnackbar: true,
};

export const LOCAL_STORAGE_SETTINGS_KEY = "settings";
