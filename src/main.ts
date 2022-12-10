import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv'
dotenv.config()
//import {} from 'dotenv/config'
//console.log(process.env); // remove this after you've confirmed it is working

//console.log(process.env) // remove this after you've confirmed it is working
//console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMM   " + process.env["BACK_URL"]);
//console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMM   " + process.env["BACK_URL"]);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
