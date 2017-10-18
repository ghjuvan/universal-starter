import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `
        <h1>Universal Demo using Angular and Angular CLI</h1>
        <a routerLink="/home">Home</a>
        <a routerLink="/home/42">Home 42</a>
        <a routerLink="/lazy">Lazy</a>
        <a routerLink="/lazy/nested">Lazy_Nested</a>
        <router-outlet></router-outlet>
    `,
    styles: []
})
export class AppComponent {



}
