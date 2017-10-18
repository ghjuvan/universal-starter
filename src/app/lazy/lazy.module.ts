import {NgModule, Component} from '@angular/core'

@Component({
  selector: 'lazy-view',
  template: `<h3>i'm lazy</h3>`
})
export class LazyComponent {}

@NgModule({
  declarations: [LazyComponent],
    exports: [LazyComponent]
})
export class LazyModule {

}