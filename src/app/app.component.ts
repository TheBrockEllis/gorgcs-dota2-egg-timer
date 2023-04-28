import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTU59V9N7v_9qHTm5N31X8FIaFZcJTPSE",
  authDomain: "gorgcs-dota2-egg-timer.firebaseapp.com",
  projectId: "gorgcs-dota2-egg-timer",
  storageBucket: "gorgcs-dota2-egg-timer.appspot.com",
  messagingSenderId: "908448798094",
  appId: "1:908448798094:web:7b5c05e7ffe8861276c0df",
  measurementId: "G-RF0GVWW5BC"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  firebaseApp!: FirebaseApp;
  firebaseAnalytics!: any;

  constructor() {
    // Initialize Firebase
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firebaseAnalytics = getAnalytics(this.firebaseApp);
  }
}
