import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EtatFormulaireRbsmr } from './etat-formulaire-rbsmr.model';
import { EtatFormulaireRbsmrPopupService } from './etat-formulaire-rbsmr-popup.service';
import { EtatFormulaireRbsmrService } from './etat-formulaire-rbsmr.service';
import { FormulaireRbsmr, FormulaireRbsmrService } from '../formulaire-rbsmr';
import { PatientRbsmr, PatientRbsmrService } from '../patient-rbsmr';

@Component({
    selector: 'jhi-etat-formulaire-rbsmr-dialog',
    templateUrl: './etat-formulaire-rbsmr-dialog.component.html'
})
export class EtatFormulaireRbsmrDialogComponent implements OnInit {

    etatFormulaire: EtatFormulaireRbsmr;
    isSaving: boolean;

    formulaires: FormulaireRbsmr[];

    patients: PatientRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private etatFormulaireService: EtatFormulaireRbsmrService,
        private formulaireService: FormulaireRbsmrService,
        private patientService: PatientRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formulaireService.query()
            .subscribe((res: HttpResponse<FormulaireRbsmr[]>) => { this.formulaires = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.patientService.query()
            .subscribe((res: HttpResponse<PatientRbsmr[]>) => { this.patients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.etatFormulaire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.etatFormulaireService.update(this.etatFormulaire));
        } else {
            this.subscribeToSaveResponse(
                this.etatFormulaireService.create(this.etatFormulaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EtatFormulaireRbsmr>>) {
        result.subscribe((res: HttpResponse<EtatFormulaireRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EtatFormulaireRbsmr) {
        this.eventManager.broadcast({ name: 'etatFormulaireListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormulaireById(index: number, item: FormulaireRbsmr) {
        return item.id;
    }

    trackPatientById(index: number, item: PatientRbsmr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-etat-formulaire-rbsmr-popup',
    template: ''
})
export class EtatFormulaireRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etatFormulairePopupService: EtatFormulaireRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.etatFormulairePopupService
                    .open(EtatFormulaireRbsmrDialogComponent as Component, params['id']);
            } else {
                this.etatFormulairePopupService
                    .open(EtatFormulaireRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
