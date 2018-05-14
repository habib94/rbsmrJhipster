import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FormulaireRbsmr } from './formulaire-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FormulaireRbsmr>;

@Injectable()
export class FormulaireRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/formulaires';

    constructor(private http: HttpClient) { }

    create(formulaire: FormulaireRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(formulaire);
        return this.http.post<FormulaireRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(formulaire: FormulaireRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(formulaire);
        return this.http.put<FormulaireRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FormulaireRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FormulaireRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<FormulaireRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FormulaireRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FormulaireRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FormulaireRbsmr[]>): HttpResponse<FormulaireRbsmr[]> {
        const jsonResponse: FormulaireRbsmr[] = res.body;
        const body: FormulaireRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FormulaireRbsmr.
     */
    private convertItemFromServer(formulaire: FormulaireRbsmr): FormulaireRbsmr {
        const copy: FormulaireRbsmr = Object.assign({}, formulaire);
        return copy;
    }

    /**
     * Convert a FormulaireRbsmr to a JSON which can be sent to the server.
     */
    private convert(formulaire: FormulaireRbsmr): FormulaireRbsmr {
        const copy: FormulaireRbsmr = Object.assign({}, formulaire);
        return copy;
    }
}
