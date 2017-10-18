import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LazyComponent, LazyModule} from "./lazy/lazy.module";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        LazyModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'lazy', component: LazyComponent}
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
