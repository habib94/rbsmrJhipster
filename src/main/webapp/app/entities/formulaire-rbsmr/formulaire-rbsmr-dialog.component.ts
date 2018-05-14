import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormulaireRbsmr } from './formulaire-rbsmr.model';
import { FormulaireRbsmrPopupService } from './formulaire-rbsmr-popup.service';
import { FormulaireRbsmrService } from './formulaire-rbsmr.service';
import { VisiteRbsmr, VisiteRbsmrService } from '../visite-rbsmr';
import { TemplateFormulaireRbsmr, TemplateFormulaireRbsmrService } from '../template-formulaire-rbsmr';

@Component({
    selector: 'jhi-formulaire-rbsmr-dialog',
    templateUrl: './formulaire-rbsmr-dialog.component.html'
})
export class FormulaireRbsmrDialogComponent implements OnInit {

    formulaire: FormulaireRbsmr;
    isSaving: boolean;

    visites: VisiteRbsmr[];

    templateformulaires: TemplateFormulaireRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private formulaireService: FormulaireRbsmrService,
        private visiteService: VisiteRbsmrService,
        private templateFormulaireService: TemplateFormulaireRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.visiteService.query()
            .subscribe((res: HttpResponse<VisiteRbsmr[]>) => { this.visites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.templateFormulaireService.query()
            .subscribe((res: HttpResponse<TemplateFormulaireRbsmr[]>) => { this.templateformulaires = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.formulaire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.formulaireService.update(this.formulaire));
        } else {
            this.subscribeToSaveResponse(
                this.formulaireService.create(this.formulaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FormulaireRbsmr>>) {
        result.subscribe((res: HttpResponse<FormulaireRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FormulaireRbsmr) {
        this.eventManager.broadcast({ name: 'formulaireListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVisiteById(index: number, item: VisiteRbsmr) {
        return item.id;
    }

    trackTemplateFormulaireById(index: number, item: TemplateFormulaireRbsmr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-formulaire-rbsmr-popup',
    template: ''
})
export class FormulaireRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formulairePopupService: FormulaireRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.formulairePopupService
                    .open(FormulaireRbsmrDialogComponent as Component, params['id']);
            } else {
                this.formulairePopupService
                    .open(FormulaireRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
