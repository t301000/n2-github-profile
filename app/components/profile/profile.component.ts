import { Component, OnInit, OnDestroy } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SearchComponent } from '../search/search.component';
import { GithubService } from '../../services/github.service';
import { InfoComponent } from './info/info.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'my-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css'],
    directives: [SearchComponent, InfoComponent, RepoListComponent, PaginationComponent],
    providers: [HTTP_PROVIDERS, GithubService]
})
export class ProfileComponent implements OnInit, OnDestroy {

  private user: any;
  private repos: any;
  private userSubscription: Subscription;

  private currPage: number = 1;
  private perPage: number = 30;

  private error: any;

  constructor(private githubService: GithubService) {}

  search(term: string) {
    //console.log('search:', term);
    this.userSubscription = this.githubService.getUser(term)
      .switchMap(user => this.githubService.getUserWithRepos(user))
      .subscribe(
        data => {
          console.log(data);
          this.error = null;
          this.user = data.user;
          this.repos = data.repos;
          this.currPage = 1;
          this.perPage = 30;
        },
        err => this.handleError(err)
      );
  }

  loadReposByPage(page: number) {
    //console.log('change to page :', page);
    this.githubService.getReposByPage(this.user.login, page)
      .subscribe(
        data => {
          console.log(data);
          this.error = null;
          this.repos = data.repos;
          this.currPage = data.page;
          this.perPage = data.perPage;
        },
        err => this.handleError(err)
      );
  }

  ngOnInit() {
    this.userSubscription = this.githubService.getRandomUser()
      .subscribe(
        data => {
          console.log(data);
          this.user = data.user;
          this.repos = data.repos;
          this.unsubscribe();
        },
        err => this.handleError(err)
      );
  }

  ngOnDestroy() {
    // console.info('Profile Component destroy');
    // this.userSubscription.unsubscribe();
    this.unsubscribe();
  }

  private unsubscribe() {
    // console.log('unsubscribe...', this.userSubscription);
    this.userSubscription.unsubscribe();
  }

  private handleError(err: any) {
    this.error = err.json();
  }

}
