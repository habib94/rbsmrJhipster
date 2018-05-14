import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { QuestionRbsmr } from './question-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<QuestionRbsmr>;

@Injectable()
export class QuestionRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/questions';

    constructor(private http: HttpClient) { }

    create(question: QuestionRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(question);
        return this.http.post<QuestionRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(question: QuestionRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(question);
        return this.http.put<QuestionRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<QuestionRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<QuestionRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<QuestionRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<QuestionRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: QuestionRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<QuestionRbsmr[]>): HttpResponse<QuestionRbsmr[]> {
        const jsonResponse: QuestionRbsmr[] = res.body;
        const body: QuestionRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to QuestionRbsmr.
     */
    private convertItemFromServer(question: QuestionRbsmr): QuestionRbsmr {
        const copy: QuestionRbsmr = Object.assign({}, question);
        return copy;
    }

    /**
     * Convert a QuestionRbsmr to a JSON which can be sent to the server.
     */
    private convert(question: QuestionRbsmr): QuestionRbsmr {
        const copy: QuestionRbsmr = Object.assign({}, question);
        return copy;
    }
}
