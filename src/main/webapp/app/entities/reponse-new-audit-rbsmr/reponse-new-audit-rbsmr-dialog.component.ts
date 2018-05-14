import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReponseNewAuditRbsmr } from './reponse-new-audit-rbsmr.model';
import { ReponseNewAuditRbsmrPopupService } from './reponse-new-audit-rbsmr-popup.service';
import { ReponseNewAuditRbsmrService } from './reponse-new-audit-rbsmr.service';
import { UtilisateurRbsmr, UtilisateurRbsmrService } from '../utilisateur-rbsmr';

@Component({
    selector: 'jhi-reponse-new-audit-rbsmr-dialog',
    templateUrl: './reponse-new-audit-rbsmr-dialog.component.html'
})
export class ReponseNewAuditRbsmrDialogComponent implements OnInit {

    reponseNewAudit: ReponseNewAuditRbsmr;
    isSaving: boolean;

    utilisateurs: UtilisateurRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reponseNewAuditService: ReponseNewAuditRbsmrService,
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
        if (this.reponseNewAudit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reponseNewAuditService.update(this.reponseNewAudit));
        } else {
            this.subscribeToSaveResponse(
                this.reponseNewAuditService.create(this.reponseNewAudit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReponseNewAuditRbsmr>>) {
        result.subscribe((res: HttpResponse<ReponseNewAuditRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReponseNewAuditRbsmr) {
        this.eventManager.broadcast({ name: 'reponseNewAuditListModification', content: 'OK'});
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
    selector: 'jhi-reponse-new-audit-rbsmr-popup',
    template: ''
})
export class ReponseNewAuditRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reponseNewAuditPopupService: ReponseNewAuditRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reponseNewAuditPopupService
                    .open(ReponseNewAuditRbsmrDialogComponent as Component, params['id']);
            } else {
                this.reponseNewAuditPopupService
                    .open(ReponseNewAuditRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
