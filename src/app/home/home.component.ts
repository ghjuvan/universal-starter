import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import {Http} from "@angular/http";

@Component({
    selector: 'home',
    template: `

        <h1>test 3</h1>
        <ul>
            <li *ngFor="let item of list3" class=".my-li">
                {{ item?.title }}
            </li>
        </ul>

    `
})
export class HomeComponent implements OnInit {
    list3 = [];

    constructor(private route: ActivatedRoute, private afDb: AngularFireDatabase, private http: Http) {
    }

    ngOnInit() {

        this.http.get('https://us-central1-actuuniversal.cloudfunctions.net/nestor/')
            .map(res => res.json())
            .subscribe((data) => {
                Object.keys(data).map((key) => {
                    this.list3.push(data[key]);
                });
                return this.list3
            })
    }
}