import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DemandeChangementRbsmr } from './demande-changement-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DemandeChangementRbsmr>;

@Injectable()
export class DemandeChangementRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/demande-changements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(demandeChangement: DemandeChangementRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(demandeChangement);
        return this.http.post<DemandeChangementRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(demandeChangement: DemandeChangementRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(demandeChangement);
        return this.http.put<DemandeChangementRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DemandeChangementRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DemandeChangementRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<DemandeChangementRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DemandeChangementRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DemandeChangementRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DemandeChangementRbsmr[]>): HttpResponse<DemandeChangementRbsmr[]> {
        const jsonResponse: DemandeChangementRbsmr[] = res.body;
        const body: DemandeChangementRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DemandeChangementRbsmr.
     */
    private convertItemFromServer(demandeChangement: DemandeChangementRbsmr): DemandeChangementRbsmr {
        const copy: DemandeChangementRbsmr = Object.assign({}, demandeChangement);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(demandeChangement.date);
        return copy;
    }

    /**
     * Convert a DemandeChangementRbsmr to a JSON which can be sent to the server.
     */
    private convert(demandeChangement: DemandeChangementRbsmr): DemandeChangementRbsmr {
        const copy: DemandeChangementRbsmr = Object.assign({}, demandeChangement);

        copy.date = this.dateUtils.toDate(demandeChangement.date);
        return copy;
    }
}
