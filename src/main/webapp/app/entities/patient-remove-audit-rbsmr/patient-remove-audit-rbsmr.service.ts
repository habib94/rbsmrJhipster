import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PatientRemoveAuditRbsmr } from './patient-remove-audit-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PatientRemoveAuditRbsmr>;

@Injectable()
export class PatientRemoveAuditRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/patient-remove-audits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(patientRemoveAudit: PatientRemoveAuditRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(patientRemoveAudit);
        return this.http.post<PatientRemoveAuditRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(patientRemoveAudit: PatientRemoveAuditRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(patientRemoveAudit);
        return this.http.put<PatientRemoveAuditRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PatientRemoveAuditRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PatientRemoveAuditRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PatientRemoveAuditRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PatientRemoveAuditRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PatientRemoveAuditRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PatientRemoveAuditRbsmr[]>): HttpResponse<PatientRemoveAuditRbsmr[]> {
        const jsonResponse: PatientRemoveAuditRbsmr[] = res.body;
        const body: PatientRemoveAuditRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PatientRemoveAuditRbsmr.
     */
    private convertItemFromServer(patientRemoveAudit: PatientRemoveAuditRbsmr): PatientRemoveAuditRbsmr {
        const copy: PatientRemoveAuditRbsmr = Object.assign({}, patientRemoveAudit);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(patientRemoveAudit.date);
        return copy;
    }

    /**
     * Convert a PatientRemoveAuditRbsmr to a JSON which can be sent to the server.
     */
    private convert(patientRemoveAudit: PatientRemoveAuditRbsmr): PatientRemoveAuditRbsmr {
        const copy: PatientRemoveAuditRbsmr = Object.assign({}, patientRemoveAudit);

        copy.date = this.dateUtils.toDate(patientRemoveAudit.date);
        return copy;
    }
}
