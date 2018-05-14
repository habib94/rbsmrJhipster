import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UtilisateurRbsmr } from './utilisateur-rbsmr.model';
import { UtilisateurRbsmrPopupService } from './utilisateur-rbsmr-popup.service';
import { UtilisateurRbsmrService } from './utilisateur-rbsmr.service';
import { CentreRbsmr, CentreRbsmrService } from '../centre-rbsmr';
import { RoleRbsmr, RoleRbsmrService } from '../role-rbsmr';

@Component({
    selector: 'jhi-utilisateur-rbsmr-dialog',
    templateUrl: './utilisateur-rbsmr-dialog.component.html'
})
export class UtilisateurRbsmrDialogComponent implements OnInit {

    utilisateur: UtilisateurRbsmr;
    isSaving: boolean;

    centres: CentreRbsmr[];

    roles: RoleRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private utilisateurService: UtilisateurRbsmrService,
        private centreService: CentreRbsmrService,
        private roleService: RoleRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.centreService.query()
            .subscribe((res: HttpResponse<CentreRbsmr[]>) => { this.centres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.roleService.query()
            .subscribe((res: HttpResponse<RoleRbsmr[]>) => { this.roles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.utilisateur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.utilisateurService.update(this.utilisateur));
        } else {
            this.subscribeToSaveResponse(
                this.utilisateurService.create(this.utilisateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UtilisateurRbsmr>>) {
        result.subscribe((res: HttpResponse<UtilisateurRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UtilisateurRbsmr) {
        this.eventManager.broadcast({ name: 'utilisateurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCentreById(index: number, item: CentreRbsmr) {
        return item.id;
    }

    trackRoleById(index: number, item: RoleRbsmr) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-utilisateur-rbsmr-popup',
    template: ''
})
export class UtilisateurRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.utilisateurPopupService
                    .open(UtilisateurRbsmrDialogComponent as Component, params['id']);
            } else {
                this.utilisateurPopupService
                    .open(UtilisateurRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
