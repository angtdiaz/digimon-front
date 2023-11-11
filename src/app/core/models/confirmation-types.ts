export interface ConfirmationDialogData {
  title: string;
  message: string;
  type?: string;
  showIcon: boolean;
  actions?: ConfirmationActions;
}

export interface ConfirmationActions {
  confirm?: {
    text: string;
    show: boolean;
  };
  cancel?: {
    text: string;
    show: boolean;
  };
}
