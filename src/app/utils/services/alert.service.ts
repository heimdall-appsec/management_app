import {Injectable, NgZone, SecurityContext} from '@angular/core';
import {Alert} from "../models/alert";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  timeout = 5000
  toast = true
  position = 'top right'
  private alertId = 0;
  private alerts: Alert[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
  ) {
  }

  clear(): void {
    this.alerts = [];
  }

  get(): Alert[] {
    return this.alerts;
  }

  private closeAlert(alertId: number, extAlerts?: Alert[]): void {
    const alerts = extAlerts ?? this.alerts;
    const alertIndex = alerts.map(alert => alert.id).indexOf(alertId);
    if (alertIndex >= 0) {
      alerts.splice(alertIndex, 1);
    }
  }

  addAlert(alert: Alert, extAlerts?: Alert[]): Alert {
    alert.id = this.alertId++
    alert.message = this.sanitizer.sanitize(SecurityContext.HTML, alert.message ?? '') ?? '';
    alert.timeout = alert.timeout ?? this.timeout;
    alert.position = alert.position ?? this.position;
    alert.toast = alert.toast ?? this.toast;
    alert.close = (alertsArray: Alert[]) => this.closeAlert(alert.id!, alertsArray);
    ((extAlerts ?? this.alerts).push(alert));
    if (alert.timeout > 0) {
      this.ngZone.runOutsideAngular(
        () => setTimeout(
          () => {
            this.ngZone.run(
              () => {
                this.closeAlert(alert.id!, extAlerts ?? this.alerts)
              }
            )
          }, alert.timeout
        )
      )
    }
    return alert;
  }

}
