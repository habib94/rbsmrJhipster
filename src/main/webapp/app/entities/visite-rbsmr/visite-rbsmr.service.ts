import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VisiteRbsmr } from './visite-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VisiteRbsmr>;

@Injectable()
export class VisiteRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/visites';

    constructor(private http: HttpClient) { }

    create(visite: VisiteRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(visite);
        return this.http.post<VisiteRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(visite: VisiteRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(visite);
        return this.http.put<VisiteRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VisiteRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VisiteRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<VisiteRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VisiteRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VisiteRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VisiteRbsmr[]>): HttpResponse<VisiteRbsmr[]> {
        const jsonResponse: VisiteRbsmr[] = res.body;
        const body: VisiteRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VisiteRbsmr.
     */
    private convertItemFromServer(visite: VisiteRbsmr): VisiteRbsmr {
        const copy: VisiteRbsmr = Object.assign({}, visite);
        return copy;
    }

    /**
     * Convert a VisiteRbsmr to a JSON which can be sent to the server.
     */
    private convert(visite: VisiteRbsmr): VisiteRbsmr {
        const copy: VisiteRbsmr = Object.assign({}, visite);
        return copy;
    }
}
