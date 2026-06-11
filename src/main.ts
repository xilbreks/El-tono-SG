/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// =========================================================================
// INTERCEPTOR PARA SILENCIAR EL LOG DE ADVERTENCIA DE @ANGULAR/FIRE V19
// =========================================================================
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    (args[0].includes('outside injection context') || args[0].includes('outside of an Injection context'))
  ) {
    return; // Ignora el warning de Firebase y no lo muestra en consola
  }
  originalWarn.apply(console, args); // Muestra cualquier otra advertencia normal
};
// =========================================================================

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
