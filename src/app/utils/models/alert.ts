export interface Alert {
  id?: number;
  alertType: AlertType,
  message?: string;
  timeout?: number;
  toast?: boolean;
  position?: string;
  close?: (alerts: Alert[]) => void;
}

export enum AlertType {
  SUCCESS,
  WARNING,
  DANGER,
  ERROR,
  INFO
}
