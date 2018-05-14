import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoleRbsmr } from './role-rbsmr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoleRbsmr>;

@Injectable()
export class RoleRbsmrService {

    private resourceUrl =  SERVER_API_URL + 'api/roles';

    constructor(private http: HttpClient) { }

    create(role: RoleRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(role);
        return this.http.post<RoleRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(role: RoleRbsmr): Observable<EntityResponseType> {
        const copy = this.convert(role);
        return this.http.put<RoleRbsmr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoleRbsmr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoleRbsmr[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoleRbsmr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoleRbsmr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoleRbsmr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoleRbsmr[]>): HttpResponse<RoleRbsmr[]> {
        const jsonResponse: RoleRbsmr[] = res.body;
        const body: RoleRbsmr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoleRbsmr.
     */
    private convertItemFromServer(role: RoleRbsmr): RoleRbsmr {
        const copy: RoleRbsmr = Object.assign({}, role);
        return copy;
    }

    /**
     * Convert a RoleRbsmr to a JSON which can be sent to the server.
     */
    private convert(role: RoleRbsmr): RoleRbsmr {
        const copy: RoleRbsmr = Object.assign({}, role);
        return copy;
    }
}
