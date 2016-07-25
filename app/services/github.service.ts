import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubService {

    private baseUrl: string = 'https://api.github.com/users';

    constructor(private http: Http) { }

  /**
   * 取得 user
   * @param login 登入帳號
   * @returns {Observable<R>}
     */
    getUser(login: string) {
      let url = this.baseUrl.concat('/', login);
      return this.http.get(url)
        .map( (response: Response) => response.json());
    }

  /**
   * 隨機取得一個 user 與其 repos
   * @returns {Observable<R>}
   */
    getRandomUser() {
      return this.http.get(this.baseUrl)
        .map( (response: Response) => response.json()[this.getRandomIndex()])
        .switchMap(user => this.getUser(user.login))
        .switchMap(user => this.getUserWithRepos(user));
    }

  /**
   * 依頁數取得 user repos
   * @param login 已有之 user 帳號
   * @param page 第幾頁
   * @param perPage 一頁幾筆
   * @returns {Observable<R>}
     */
    getReposByPage(login: string, page: number = 1, perPage: number = 30) {
      // "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
      let url = this.baseUrl.concat('/', login, '/repos?page=', page.toString(), '&per_page=', perPage.toString());
      //console.log(url);
      return this.http.get(url)
        .map((response: Response) => response.json())
        .map(repos => ({repos, page, perPage}));
    }

  /**
   * 取得 user 的 repos
   * @param user 已取得之 user
   * @returns {Observable<R>}
     */
    getUserWithRepos(user: any) {
      let url = this.baseUrl.concat('/', user.login, '/repos');
      return this.http.get(url)
        .map( (response: Response) => ({user: user, repos: response.json()}));
    }

    /*
    * 取得隨機索引，0 ~ 29
    * Github 預設一次傳回 30 筆
    * */
    private getRandomIndex() {
      return Math.floor(Math.random()*30);
    }

}
