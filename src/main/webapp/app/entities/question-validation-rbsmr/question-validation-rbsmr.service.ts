import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { QuestionValidationRbsmr } from './question-validation-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<QuestionValidationRbsmr>;

@Injectable()
export class QuestionValidationRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/question-validations';

    constructor(private http: HttpClient) { }

    create(questionValidation: QuestionValidationRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(questionValidation);
        return this.http.post<QuestionValidationRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(questionValidation: QuestionValidationRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(questionValidation);
        return this.http.put<QuestionValidationRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<QuestionValidationRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<QuestionValidationRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<QuestionValidationRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<QuestionValidationRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: QuestionValidationRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<QuestionValidationRbsmr[]>): HttpResponse<QuestionValidationRbsmr[]> {
        const jsonResponse: QuestionValidationRbsmr[] = res.body;
        const body: QuestionValidationRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to QuestionValidationRbsmr.
     */
    private convertItemFromServer(questionValidation: QuestionValidationRbsmr): QuestionValidationRbsmr {
        const copy: QuestionValidationRbsmr = Object.assign({}, questionValidation);
        return copy;
    }

    /**
     * Convert a QuestionValidationRbsmr to a JSON which can be sent to the server.
     */
    private convert(questionValidation: QuestionValidationRbsmr): QuestionValidationRbsmr {
        const copy: QuestionValidationRbsmr = Object.assign({}, questionValidation);
        return copy;
    }
}
