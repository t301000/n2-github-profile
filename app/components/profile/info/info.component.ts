import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-user-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.css']
})
export class InfoComponent {

  @Input() user: any;

}
