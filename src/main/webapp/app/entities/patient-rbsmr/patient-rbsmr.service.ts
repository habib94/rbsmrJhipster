import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PatientRbsmr } from './patient-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PatientRbsmr>;

@Injectable()
export class PatientRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/patients';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(patient: PatientRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(patient);
        return this.http.post<PatientRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(patient: PatientRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(patient);
        return this.http.put<PatientRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PatientRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PatientRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PatientRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PatientRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PatientRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PatientRbsmr[]>): HttpResponse<PatientRbsmr[]> {
        const jsonResponse: PatientRbsmr[] = res.body;
        const body: PatientRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PatientRbsmr.
     */
    private convertItemFromServer(patient: PatientRbsmr): PatientRbsmr {
        const copy: PatientRbsmr = Object.assign({}, patient);
        copy.dateEnregistrement = this.dateUtils
            .convertDateTimeFromServer(patient.dateEnregistrement);
        copy.dateVisite = this.dateUtils
            .convertDateTimeFromServer(patient.dateVisite);
        return copy;
    }

    /**
     * Convert a PatientRbsmr to a JSON which can be sent to the server.
     */
    private convert(patient: PatientRbsmr): PatientRbsmr {
        const copy: PatientRbsmr = Object.assign({}, patient);

        copy.dateEnregistrement = this.dateUtils.toDate(patient.dateEnregistrement);

        copy.dateVisite = this.dateUtils.toDate(patient.dateVisite);
        return copy;
    }
}
