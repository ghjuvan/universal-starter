import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import * as firebase from "firebase";
import {Http, HttpModule} from "@angular/http";

@Component({
    selector: 'home',
    template: `<h3>{{ message }}</h3>
    <h1>test 1</h1>
    <ul>
        <li *ngFor="let item of list | async" class=".my-li">
            {{ item.title }}
        </li>
    </ul>

    <h1>test 2</h1>
    <ul>
        <li *ngFor="let item of list2" class=".my-li">
            {{ item.title }}
        </li>
    </ul>

    <h1>test 3</h1>
    <ul>
        <li *ngFor="let item of list3" class=".my-li">
            {{ item.title }}
        </li>
    </ul>

    `
})
export class HomeComponent implements OnInit {
    public message: string;
    id;
    list;
    list2 = [];
    list3 = [];

    constructor(private route: ActivatedRoute, private afDb: AngularFireDatabase, private http: Http) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.message = 'Hello ' + (this.id || '');

        this.list = this.afDb.list('/').valueChanges().take(1).toPromise();

        const ref = firebase.database().ref("/");
        ref.once("value").then((value) => {
            let data = value.val();

            Object.keys(data).map((key)=> {
                this.list2.push(data[key]);
            });
        });

        this.http.get('http://localhost:5001/actuuniversal/us-central1/nestor/')
            .map(res =>res.json() as any)
            .subscribe((data)=>{
                Object.keys(data).map((key)=> {
                    this.list3.push(data[key]);
                });
                return this.list3
            })
    }
}