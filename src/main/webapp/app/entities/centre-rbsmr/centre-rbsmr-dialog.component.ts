import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CentreRbsmr } from './centre-rbsmr.model';
import { CentreRbsmrPopupService } from './centre-rbsmr-popup.service';
import { CentreRbsmrService } from './centre-rbsmr.service';

@Component({
    selector: 'jhi-centre-rbsmr-dialog',
    templateUrl: './centre-rbsmr-dialog.component.html'
})
export class CentreRbsmrDialogComponent implements OnInit {

    centre: CentreRbsmr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private centreService: CentreRbsmrService,
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
        if (this.centre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.centreService.update(this.centre));
        } else {
            this.subscribeToSaveResponse(
                this.centreService.create(this.centre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CentreRbsmr>>) {
        result.subscribe((res: HttpResponse<CentreRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CentreRbsmr) {
        this.eventManager.broadcast({ name: 'centreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-centre-rbsmr-popup',
    template: ''
})
export class CentreRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private centrePopupService: CentreRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.centrePopupService
                    .open(CentreRbsmrDialogComponent as Component, params['id']);
            } else {
                this.centrePopupService
                    .open(CentreRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
