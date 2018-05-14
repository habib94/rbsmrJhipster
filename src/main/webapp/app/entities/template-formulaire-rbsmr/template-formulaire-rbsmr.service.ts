import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TemplateFormulaireRbsmr } from './template-formulaire-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TemplateFormulaireRbsmr>;

@Injectable()
export class TemplateFormulaireRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/template-formulaires';

    constructor(private http: HttpClient) { }

    create(templateFormulaire: TemplateFormulaireRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(templateFormulaire);
        return this.http.post<TemplateFormulaireRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(templateFormulaire: TemplateFormulaireRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(templateFormulaire);
        return this.http.put<TemplateFormulaireRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TemplateFormulaireRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TemplateFormulaireRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<TemplateFormulaireRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TemplateFormulaireRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TemplateFormulaireRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TemplateFormulaireRbsmr[]>): HttpResponse<TemplateFormulaireRbsmr[]> {
        const jsonResponse: TemplateFormulaireRbsmr[] = res.body;
        const body: TemplateFormulaireRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TemplateFormulaireRbsmr.
     */
    private convertItemFromServer(templateFormulaire: TemplateFormulaireRbsmr): TemplateFormulaireRbsmr {
        const copy: TemplateFormulaireRbsmr = Object.assign({}, templateFormulaire);
        return copy;
    }

    /**
     * Convert a TemplateFormulaireRbsmr to a JSON which can be sent to the server.
     */
    private convert(templateFormulaire: TemplateFormulaireRbsmr): TemplateFormulaireRbsmr {
        const copy: TemplateFormulaireRbsmr = Object.assign({}, templateFormulaire);
        return copy;
    }
}
