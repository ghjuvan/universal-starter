import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import * as firebase from "firebase";

@Component({
    selector: 'home',
    template: `<h3>{{ message }}</h3>
    <ul>
        <li *ngFor="let item of list | async">
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

    constructor(private route: ActivatedRoute, private afDb: AngularFireDatabase) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.message = 'Hello ' + (this.id || '');

        this.list = this.afDb.list('/').valueChanges().take(1).toPromise();

        var ref = firebase.database().ref("/");
        ref.once("value").then((value) => {
            this.list2 = value.val().forEach((value, key)=>{
                console.log(value, key);
            });
        })

    }
}