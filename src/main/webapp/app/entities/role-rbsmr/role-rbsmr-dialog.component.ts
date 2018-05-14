import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleRbsmr } from './role-rbsmr.model';
import { RoleRbsmrPopupService } from './role-rbsmr-popup.service';
import { RoleRbsmrService } from './role-rbsmr.service';

@Component({
    selector: 'jhi-role-rbsmr-dialog',
    templateUrl: './role-rbsmr-dialog.component.html'
})
export class RoleRbsmrDialogComponent implements OnInit {

    role: RoleRbsmr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private roleService: RoleRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.role.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roleService.update(this.role));
        } else {
            this.subscribeToSaveResponse(
                this.roleService.create(this.role));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoleRbsmr>>) {
        result.subscribe((res: HttpResponse<RoleRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoleRbsmr) {
        this.eventManager.broadcast({ name: 'roleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-role-rbsmr-popup',
    template: ''
})
export class RoleRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RoleRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rolePopupService
                    .open(RoleRbsmrDialogComponent as Component, params['id']);
            } else {
                this.rolePopupService
                    .open(RoleRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
