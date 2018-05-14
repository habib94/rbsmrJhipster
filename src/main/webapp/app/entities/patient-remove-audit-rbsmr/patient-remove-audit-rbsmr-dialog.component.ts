import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PatientRemoveAuditRbsmr } from './patient-remove-audit-rbsmr.model';
import { PatientRemoveAuditRbsmrPopupService } from './patient-remove-audit-rbsmr-popup.service';
import { PatientRemoveAuditRbsmrService } from './patient-remove-audit-rbsmr.service';
import { UtilisateurRbsmr, UtilisateurRbsmrService } from '../utilisateur-rbsmr';

@Component({
    selector: 'jhi-patient-remove-audit-rbsmr-dialog',
    templateUrl: './patient-remove-audit-rbsmr-dialog.component.html'
})
export class PatientRemoveAuditRbsmrDialogComponent implements OnInit {

    patientRemoveAudit: PatientRemoveAuditRbsmr;
    isSaving: boolean;

    utilisateurs: UtilisateurRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private patientRemoveAuditService: PatientRemoveAuditRbsmrService,
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
        if (this.patientRemoveAudit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.patientRemoveAuditService.update(this.patientRemoveAudit));
        } else {
            this.subscribeToSaveResponse(
                this.patientRemoveAuditService.create(this.patientRemoveAudit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PatientRemoveAuditRbsmr>>) {
        result.subscribe((res: HttpResponse<PatientRemoveAuditRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PatientRemoveAuditRbsmr) {
        this.eventManager.broadcast({ name: 'patientRemoveAuditListModification', content: 'OK'});
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
    selector: 'jhi-patient-remove-audit-rbsmr-popup',
    template: ''
})
export class PatientRemoveAuditRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patientRemoveAuditPopupService: PatientRemoveAuditRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.patientRemoveAuditPopupService
                    .open(PatientRemoveAuditRbsmrDialogComponent as Component, params['id']);
            } else {
                this.patientRemoveAuditPopupService
                    .open(PatientRemoveAuditRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
