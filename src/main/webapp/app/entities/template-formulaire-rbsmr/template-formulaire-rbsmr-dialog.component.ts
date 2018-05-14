import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TemplateFormulaireRbsmr } from './template-formulaire-rbsmr.model';
import { TemplateFormulaireRbsmrPopupService } from './template-formulaire-rbsmr-popup.service';
import { TemplateFormulaireRbsmrService } from './template-formulaire-rbsmr.service';

@Component({
    selector: 'jhi-template-formulaire-rbsmr-dialog',
    templateUrl: './template-formulaire-rbsmr-dialog.component.html'
})
export class TemplateFormulaireRbsmrDialogComponent implements OnInit {

    templateFormulaire: TemplateFormulaireRbsmr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private templateFormulaireService: TemplateFormulaireRbsmrService,
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
        if (this.templateFormulaire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.templateFormulaireService.update(this.templateFormulaire));
        } else {
            this.subscribeToSaveResponse(
                this.templateFormulaireService.create(this.templateFormulaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TemplateFormulaireRbsmr>>) {
        result.subscribe((res: HttpResponse<TemplateFormulaireRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TemplateFormulaireRbsmr) {
        this.eventManager.broadcast({ name: 'templateFormulaireListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-template-formulaire-rbsmr-popup',
    template: ''
})
export class TemplateFormulaireRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private templateFormulairePopupService: TemplateFormulaireRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.templateFormulairePopupService
                    .open(TemplateFormulaireRbsmrDialogComponent as Component, params['id']);
            } else {
                this.templateFormulairePopupService
                    .open(TemplateFormulaireRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
