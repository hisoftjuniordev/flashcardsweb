import 'zone.js'; // <-- To nujno dodaj na vrh
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // Preveri, če je ime App ali AppComponent

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));