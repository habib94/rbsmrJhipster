import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ReponseNewAuditRbsmr } from './reponse-new-audit-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReponseNewAuditRbsmr>;

@Injectable()
export class ReponseNewAuditRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/reponse-new-audits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(reponseNewAudit: ReponseNewAuditRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(reponseNewAudit);
        return this.http.post<ReponseNewAuditRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reponseNewAudit: ReponseNewAuditRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(reponseNewAudit);
        return this.http.put<ReponseNewAuditRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReponseNewAuditRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReponseNewAuditRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReponseNewAuditRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReponseNewAuditRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReponseNewAuditRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReponseNewAuditRbsmr[]>): HttpResponse<ReponseNewAuditRbsmr[]> {
        const jsonResponse: ReponseNewAuditRbsmr[] = res.body;
        const body: ReponseNewAuditRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReponseNewAuditRbsmr.
     */
    private convertItemFromServer(reponseNewAudit: ReponseNewAuditRbsmr): ReponseNewAuditRbsmr {
        const copy: ReponseNewAuditRbsmr = Object.assign({}, reponseNewAudit);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(reponseNewAudit.date);
        return copy;
    }

    /**
     * Convert a ReponseNewAuditRbsmr to a JSON which can be sent to the server.
     */
    private convert(reponseNewAudit: ReponseNewAuditRbsmr): ReponseNewAuditRbsmr {
        const copy: ReponseNewAuditRbsmr = Object.assign({}, reponseNewAudit);

        copy.date = this.dateUtils.toDate(reponseNewAudit.date);
        return copy;
    }
}
