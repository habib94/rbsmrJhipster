import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UtilisateurRbsmr } from './utilisateur-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UtilisateurRbsmr>;

@Injectable()
export class UtilisateurRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/utilisateurs';

    constructor(private http: HttpClient) { }

    create(utilisateur: UtilisateurRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(utilisateur);
        return this.http.post<UtilisateurRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(utilisateur: UtilisateurRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(utilisateur);
        return this.http.put<UtilisateurRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UtilisateurRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UtilisateurRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<UtilisateurRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UtilisateurRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UtilisateurRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UtilisateurRbsmr[]>): HttpResponse<UtilisateurRbsmr[]> {
        const jsonResponse: UtilisateurRbsmr[] = res.body;
        const body: UtilisateurRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UtilisateurRbsmr.
     */
    private convertItemFromServer(utilisateur: UtilisateurRbsmr): UtilisateurRbsmr {
        const copy: UtilisateurRbsmr = Object.assign({}, utilisateur);
        return copy;
    }

    /**
     * Convert a UtilisateurRbsmr to a JSON which can be sent to the server.
     */
    private convert(utilisateur: UtilisateurRbsmr): UtilisateurRbsmr {
        const copy: UtilisateurRbsmr = Object.assign({}, utilisateur);
        return copy;
    }
}
