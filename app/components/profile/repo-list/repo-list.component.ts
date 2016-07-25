import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-repo-list',
    templateUrl: 'repo-list.component.html'
})
export class RepoListComponent {

  @Input() repos: any;
}
