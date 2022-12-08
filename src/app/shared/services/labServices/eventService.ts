import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {EgretCalendarEvent} from "../../models/event.model";
import {environment} from "../../../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class EventService {

    private apiUrl = `${environment.apiURL}/event`;

    constructor(private http: HttpClient) {
    }

    public getAllEvents(): Observable<EgretCalendarEvent[]> {
        return this.http.get<EgretCalendarEvent[]>(`${this.apiUrl}/events`);
    }
    public getEventById(idMember: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/eventsByMember/${idMember}`);
    }
    public addEvent(event: EgretCalendarEvent): Observable<EgretCalendarEvent> {
        return this.http.post<EgretCalendarEvent>(`${this.apiUrl}/addEvent`, event);
    }

    public updateEvent(event: EgretCalendarEvent, id: string): Observable<EgretCalendarEvent> {
        return this.http.put<EgretCalendarEvent>(`${this.apiUrl}/updateEvent/${id}`, event);
    }
    public deleteEvent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteEvent/${id}`);
    }
}
