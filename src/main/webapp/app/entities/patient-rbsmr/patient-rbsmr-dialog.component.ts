import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PatientRbsmr } from './patient-rbsmr.model';
import { PatientRbsmrPopupService } from './patient-rbsmr-popup.service';
import { PatientRbsmrService } from './patient-rbsmr.service';
import { UtilisateurRbsmr, UtilisateurRbsmrService } from '../utilisateur-rbsmr';

@Component({
    selector: 'jhi-patient-rbsmr-dialog',
    templateUrl: './patient-rbsmr-dialog.component.html'
})
export class PatientRbsmrDialogComponent implements OnInit {

    patient: PatientRbsmr;
    isSaving: boolean;

    utilisateurs: UtilisateurRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private patientService: PatientRbsmrService,
        private utilisateurService: UtilisateurRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.utilisateurService.query()
            .subscribe((res: HttpResponse<UtilisateurRbsmr[]>) => { this.utilisateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.patient.id !== undefined) {
            this.subscribeToSaveResponse(
                this.patientService.update(this.patient));
        } else {
            this.subscribeToSaveResponse(
                this.patientService.create(this.patient));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PatientRbsmr>>) {
        result.subscribe((res: HttpResponse<PatientRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PatientRbsmr) {
        this.eventManager.broadcast({ name: 'patientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUtilisateurById(index: number, item: UtilisateurRbsmr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-patient-rbsmr-popup',
    template: ''
})
export class PatientRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patientPopupService: PatientRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.patientPopupService
                    .open(PatientRbsmrDialogComponent as Component, params['id']);
            } else {
                this.patientPopupService
                    .open(PatientRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
