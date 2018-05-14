import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReponseRbsmr } from './reponse-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReponseRbsmr>;

@Injectable()
export class ReponseRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/reponses';

    constructor(private http: HttpClient) { }

    create(reponse: ReponseRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(reponse);
        return this.http.post<ReponseRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reponse: ReponseRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(reponse);
        return this.http.put<ReponseRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReponseRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReponseRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReponseRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReponseRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReponseRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReponseRbsmr[]>): HttpResponse<ReponseRbsmr[]> {
        const jsonResponse: ReponseRbsmr[] = res.body;
        const body: ReponseRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReponseRbsmr.
     */
    private convertItemFromServer(reponse: ReponseRbsmr): ReponseRbsmr {
        const copy: ReponseRbsmr = Object.assign({}, reponse);
        return copy;
    }

    /**
     * Convert a ReponseRbsmr to a JSON which can be sent to the server.
     */
    private convert(reponse: ReponseRbsmr): ReponseRbsmr {
        const copy: ReponseRbsmr = Object.assign({}, reponse);
        return copy;
    }
}
