import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from "../../models/article";
import {Observable} from "rxjs";
import {Student} from "../../models/Student";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiURL}/article`;

  constructor(private http: HttpClient) {
  }

  //
  // saveArticle(objectToSubmit: any): Promise<any> {
  //   const articleToSave = {
  //     ...objectToSubmit,
  //     id: objectToSubmit.id ?? (Math.random() * 100000).toString(),
  //     createdDate: objectToSubmit.createdDate ?? new Date().toISOString()
  //   };
  //   this.tab = [articleToSave, ...this.tab.filter(item => item.id !== articleToSave.id)];
  //   return new Promise(resolve => resolve(articleToSave));
  //
  // }

  // getArticleById(id: string): Promise<Article> {
  //   // return this.httpClient.get<M
  //   return new Promise(resolve => resolve(this.tab.filter(item => item.id === id)[0] ?? null));
  // }
  //
  // delete(id: string): Promise<void> {
  //   this.tab = this.tab.filter(item => item.id !== id);
  //   return new Promise(resolve => resolve());
  // }
  //
  // getAllArticles(): Promise<Article[]> {
  //   return new Promise(resolve => resolve(this.tab));
  // }
  //
  // updateArticle(objectToSubmit: any , auteur: string): Promise<any> {
  //   objectToSubmit.auteur = auteur;
  //   const articleToUpdate = {
  //     ...objectToSubmit,
  //     id: objectToSubmit.id ?? (Math.random() * 100000).toString(),
  //     auteur: objectToSubmit.auteur,
  //   };
  //   this.tab = [articleToUpdate, ...this.tab.filter(item => item.id !== articleToUpdate.id)];
  //   return new Promise(resolve => resolve(articleToUpdate));
  //
  //
  // }


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
  public affectAuthorToArticle(idMember: string , idArticle: string): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/affectAuthor/${idMember}/${idArticle}`, {});
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
