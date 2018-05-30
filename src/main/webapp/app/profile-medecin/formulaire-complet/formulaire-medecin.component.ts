import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import {FormulaireCompletModel} from '../../shared/model/formulaire-complet.model';
import {FormulaireCompletService} from '../../shared/services/formulaire-complet.service';

@Component({
    selector: 'jhi-formulaire-medecin',
    templateUrl: './formulaire-medecin.component.html'
})
export class FormulaireMedecinComponent implements OnInit, OnDestroy {

    routeData: any;
    formulaire: FormulaireCompletModel;
    code: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formulaireCompletService: FormulaireCompletService
    ) {
        this.routeData = this.activatedRoute.params.subscribe((params) => {
             this.code = params.code;
             this.loadPage();
        });
    }

    loadPage() {
        this.formulaireCompletService.find(this.code).subscribe(
            (res: HttpResponse<FormulaireCompletModel>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    private onSuccess(data, headers) {
        this.formulaire = data;
    }
    private onError(error) {
        console.log(error);
    }
}
