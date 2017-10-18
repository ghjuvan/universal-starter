import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'home',
    template: `<h3>{{ message }}</h3>`
})
export class HomeComponent implements OnInit {
    public message: string;
    id;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.message = 'Hello ' + (this.id || '');
    }
}