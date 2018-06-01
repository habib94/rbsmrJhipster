import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { createRequestOption } from '../../shared';
import {FormulaireCompletModel} from '../model/formulaire-complet.model';

export type EntityResponseType = HttpResponse<FormulaireCompletModel>;

@Injectable()
export class FormulaireCompletService {

    private resourceUrl =  SERVER_API_URL + 'api/formulaires/complet';

    constructor(private http: HttpClient) { }

    find(code: string): Observable<EntityResponseType> {
        return this.http.get<FormulaireCompletModel>(`${this.resourceUrl}/${code}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FormulaireCompletModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FormulaireRbsmr.
     */
    private convertItemFromServer(formulaire: FormulaireCompletModel): FormulaireCompletModel {
        const copy: FormulaireCompletModel = Object.assign({}, formulaire);
        return copy;
    }

}
