import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpModule} from "@angular/http";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        HttpModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            {path: '', redirectTo:'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'home/:id', component: HomeComponent},
            {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
            {path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
        ]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}