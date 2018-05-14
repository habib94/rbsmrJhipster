import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemandeChangementRbsmr } from './demande-changement-rbsmr.model';
import { DemandeChangementRbsmrPopupService } from './demande-changement-rbsmr-popup.service';
import { DemandeChangementRbsmrService } from './demande-changement-rbsmr.service';
import { UtilisateurRbsmr, UtilisateurRbsmrService } from '../utilisateur-rbsmr';

@Component({
    selector: 'jhi-demande-changement-rbsmr-dialog',
    templateUrl: './demande-changement-rbsmr-dialog.component.html'
})
export class DemandeChangementRbsmrDialogComponent implements OnInit {

    demandeChangement: DemandeChangementRbsmr;
    isSaving: boolean;

    utilisateurs: UtilisateurRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private demandeChangementService: DemandeChangementRbsmrService,
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
        if (this.demandeChangement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demandeChangementService.update(this.demandeChangement));
        } else {
            this.subscribeToSaveResponse(
                this.demandeChangementService.create(this.demandeChangement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DemandeChangementRbsmr>>) {
        result.subscribe((res: HttpResponse<DemandeChangementRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DemandeChangementRbsmr) {
        this.eventManager.broadcast({ name: 'demandeChangementListModification', content: 'OK'});
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
    selector: 'jhi-demande-changement-rbsmr-popup',
    template: ''
})
export class DemandeChangementRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demandeChangementPopupService: DemandeChangementRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demandeChangementPopupService
                    .open(DemandeChangementRbsmrDialogComponent as Component, params['id']);
            } else {
                this.demandeChangementPopupService
                    .open(DemandeChangementRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
