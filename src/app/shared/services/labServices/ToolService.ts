import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Tool} from "../../models/tool";
import {environment} from "../../../../environments/environment";

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
    public addTool(tool: Tool): Observable<Tool> {
        return this.http.post<Tool>(`${this.apiUrl}/addTool`, tool);
    }

    public updateTool(tool: Tool): Observable<Tool> {
        return this.http.put<Tool>(`${this.apiUrl}/updateTool`, tool);
    }

    public deleteTool(id: bigint): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteTool/${id}`);
    }
}
