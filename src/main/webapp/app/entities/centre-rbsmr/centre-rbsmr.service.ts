import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CentreRbsmr } from './centre-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CentreRbsmr>;

@Injectable()
export class CentreRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/centres';

    constructor(private http: HttpClient) { }

    create(centre: CentreRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(centre);
        return this.http.post<CentreRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(centre: CentreRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(centre);
        return this.http.put<CentreRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CentreRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CentreRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CentreRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CentreRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CentreRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CentreRbsmr[]>): HttpResponse<CentreRbsmr[]> {
        const jsonResponse: CentreRbsmr[] = res.body;
        const body: CentreRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CentreRbsmr.
     */
    private convertItemFromServer(centre: CentreRbsmr): CentreRbsmr {
        const copy: CentreRbsmr = Object.assign({}, centre);
        return copy;
    }

    /**
     * Convert a CentreRbsmr to a JSON which can be sent to the server.
     */
    private convert(centre: CentreRbsmr): CentreRbsmr {
        const copy: CentreRbsmr = Object.assign({}, centre);
        return copy;
    }
}
