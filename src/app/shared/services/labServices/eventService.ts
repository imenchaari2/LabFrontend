import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {EgretCalendarEvent} from "../../models/event.model";


@Injectable({
    providedIn: 'root'
})
export class EventService {

    private apiUrl = `http://localhost:8084/api/event`;

    constructor(private http: HttpClient) {
    }

    public getAllEvents(): Observable<EgretCalendarEvent[]> {
        return this.http.get<EgretCalendarEvent[]>(`${this.apiUrl}/events`);
    }
    public getEventById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/findEvent/${id}`);
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
