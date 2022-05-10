import {Injectable} from '@angular/core';
import {filter, Observable, Observer, Subscription} from "rxjs";

export class EventWithContent<T> {
  constructor(
    public name: string,
    public content: T
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  observable: Observable<EventWithContent<unknown> | string>;
  observer?: Observer<EventWithContent<unknown> | string>;

  constructor() {
    this.observable = new Observable<EventWithContent<unknown> | string>((observer: Observer<EventWithContent<unknown> | string>) => {
      this.observer = observer;
    })

  }

  broadcast(event: EventWithContent<unknown> | string) {
    if (this.observer) {
      this.observer.next(event)
    }
  }

  destroy(subscriber: Subscription) {
    subscriber.unsubscribe();
  }

  subscribe(eventNames: string | string[], callback: (event: EventWithContent<unknown> | string) => void): Subscription {
    if (typeof eventNames === 'string') {
      eventNames = [eventNames];
    }
    return this.observable.pipe(
      filter((event: EventWithContent<unknown> | string) => {
        for (const eventName of eventNames) {
          if ((typeof event === 'string' && event === eventNames) || typeof event !== 'string' && event.name === eventNames) {
            return true;
          }
        }
        return false;
      })
    ).subscribe(callback);
  }
}
