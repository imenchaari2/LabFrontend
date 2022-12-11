import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Tool} from "../../models/tool";
import {environment} from "../../../../environments/environment";
import {Article} from "../../models/article";

@Injectable({
    providedIn: 'root'
})
export class ToolService {

    private apiUrl = `${environment.apiURL}/tool`;

    constructor(private http: HttpClient) {
    }

    public getAllTools(): Observable<Tool[]> {
        return this.http.get<Tool[]>(`${this.apiUrl}/tools`);
    }
    public getToolById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/findTool/${id}`);
    }
    public addTool(tool: Tool, idMember:string): Observable<Tool> {
        return this.http.post<Tool>(`${this.apiUrl}/addTool/${idMember}`, tool);
    }

    public updateTool(id: string , tool: Tool): Observable<Tool> {
        return this.http.put<Tool>(`${this.apiUrl}/updateTool/${id}`, tool);
    }

    public deleteTool(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteTool/${id}`);
    }
    public findToolByCreatedDatePeriod(createdDateGT: Date, createdDateLT: Date): Observable<Tool[]> {
        return this.http.get<Tool[]>(`${this.apiUrl}/findByCreatedDatePeriod?createdDateGT=${createdDateGT}&createdDateLT=${createdDateLT}`);
    }
    public findToolByAuthorName(name: string): Observable<Tool[]> {
        return this.http.get<Tool[]>(`${this.apiUrl}/toolsByAuthorName?name=${name}`);
    }
    public affectMemberToTool( idMember: string, idTool: string): Observable<Tool> {
        return this.http.put<Tool>(`${this.apiUrl}/affectMember/${idMember}/${idTool}`,{});
    }
}
