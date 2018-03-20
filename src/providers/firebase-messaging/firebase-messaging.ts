import { Injectable } from "@angular/core";
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

@Injectable()
export class FirebaseMessagingProvider {
  private messaging;
  private unsubscribeOnTokenRefresh = () => {};

  constructor(
    private storage: Storage,
    private db: AngularFireDatabase,
    private app: FirebaseApp
  ) {
    this.messaging = app.messaging();
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
    this.messaging.useServiceWorker(registration);
    //this.disableNotifications()
    this.enableNotifications();
});
  }

  public enableNotifications() {
    console.log('Requesting permission...');
    return this.messaging.requestPermission().then(() => {
        console.log('Permission granted');
        // token might change - we need to listen for changes to it and update it
        this.setupOnTokenRefresh();
        return this.updateToken();
      });
  }

  public disableNotifications() {
    this.unsubscribeOnTokenRefresh();
    this.unsubscribeOnTokenRefresh = () => {};
    return this.storage.set('fcmToken','').then();
  }

  private updateToken() {
    return this.messaging.getToken().then((currentToken) => {
      if (currentToken) {
        // we've got the token from Firebase, now let's store it in the database
        console.log(currentToken)
        this.db.object(`fcmToken/${currentToken}`).update({ [currentToken]: true } );
        return this.storage.set('fcmToken', currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    });
  }


  private setupOnTokenRefresh(): void {
      this.unsubscribeOnTokenRefresh = this.messaging.onTokenRefresh(() => {
          console.log("Token refreshed");
          this.storage.set('fcmToken','').then(() => { this.updateToken(); });
      });
  }

}
