import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EtatFormulaireRbsmr } from './etat-formulaire-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EtatFormulaireRbsmr>;

@Injectable()
export class EtatFormulaireRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/etat-formulaires';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(etatFormulaire: EtatFormulaireRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(etatFormulaire);
        return this.http.post<EtatFormulaireRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(etatFormulaire: EtatFormulaireRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(etatFormulaire);
        return this.http.put<EtatFormulaireRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EtatFormulaireRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EtatFormulaireRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<EtatFormulaireRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EtatFormulaireRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EtatFormulaireRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EtatFormulaireRbsmr[]>): HttpResponse<EtatFormulaireRbsmr[]> {
        const jsonResponse: EtatFormulaireRbsmr[] = res.body;
        const body: EtatFormulaireRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EtatFormulaireRbsmr.
     */
    private convertItemFromServer(etatFormulaire: EtatFormulaireRbsmr): EtatFormulaireRbsmr {
        const copy: EtatFormulaireRbsmr = Object.assign({}, etatFormulaire);
        copy.dateValidation = this.dateUtils
            .convertDateTimeFromServer(etatFormulaire.dateValidation);
        return copy;
    }

    /**
     * Convert a EtatFormulaireRbsmr to a JSON which can be sent to the server.
     */
    private convert(etatFormulaire: EtatFormulaireRbsmr): EtatFormulaireRbsmr {
        const copy: EtatFormulaireRbsmr = Object.assign({}, etatFormulaire);

        copy.dateValidation = this.dateUtils.toDate(etatFormulaire.dateValidation);
        return copy;
    }
}
