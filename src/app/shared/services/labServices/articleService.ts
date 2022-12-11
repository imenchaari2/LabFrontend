import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from "../../models/article";
import {Observable} from "rxjs";
import {Student} from "../../models/Student";
import {environment} from "../../../../environments/environment";
import {EgretCalendarEvent} from "../../models/event.model";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiURL}/article`;

  constructor(private http: HttpClient) {
  }
  public getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }
  public getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/findArticle/${id}`);
  }
  public addArticle(article: Article , source: File): Observable<Article> {
    const formData = new FormData();
    for (const key in article ) {
      formData.append(key, article[key]);
    }
    formData.append('file', source);
    return this.http.post<Article>(`${this.apiUrl}/addArticle`, formData);
  }
  public updateArticle(article: Article , id: string, source: File): Observable<Article> {
    const formData = new FormData();
    for (const key in article ) {
      formData.append(key, article[key]);
    }
    formData.append('file', source);
    return this.http.put<Article>(`${this.apiUrl}/updateArticle/${id}`, formData);
  }
  public affectAuthorsToArticle( idArticle: string, ids: string[]): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/affectAuthors/${idArticle}?membersIds=${ids}`,{});
  }

  public findArticleBySearch(title: string, type: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/findArticleBySearch?title=${title}&type=${type}`);
  }
  public findArticleByAuthorName(name: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articlesByAuthorName?name=${name}`);
  }
  public findArticleByCreatedDatePeriod(createdDateGT: Date, createdDateLT: Date): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/findByCreatedDatePeriod?createdDateGT=${createdDateGT}&createdDateLT=${createdDateLT}`);
  }


  public deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteArticle/${id}`);
  }
}
