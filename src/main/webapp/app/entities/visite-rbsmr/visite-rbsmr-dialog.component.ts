import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VisiteRbsmr } from './visite-rbsmr.model';
import { VisiteRbsmrPopupService } from './visite-rbsmr-popup.service';
import { VisiteRbsmrService } from './visite-rbsmr.service';

@Component({
    selector: 'jhi-visite-rbsmr-dialog',
    templateUrl: './visite-rbsmr-dialog.component.html'
})
export class VisiteRbsmrDialogComponent implements OnInit {

    visite: VisiteRbsmr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private visiteService: VisiteRbsmrService,
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
        if (this.visite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.visiteService.update(this.visite));
        } else {
            this.subscribeToSaveResponse(
                this.visiteService.create(this.visite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VisiteRbsmr>>) {
        result.subscribe((res: HttpResponse<VisiteRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VisiteRbsmr) {
        this.eventManager.broadcast({ name: 'visiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-visite-rbsmr-popup',
    template: ''
})
export class VisiteRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: VisiteRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.visitePopupService
                    .open(VisiteRbsmrDialogComponent as Component, params['id']);
            } else {
                this.visitePopupService
                    .open(VisiteRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
