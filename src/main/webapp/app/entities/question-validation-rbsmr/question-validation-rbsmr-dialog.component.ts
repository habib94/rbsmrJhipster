import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionValidationRbsmr } from './question-validation-rbsmr.model';
import { QuestionValidationRbsmrPopupService } from './question-validation-rbsmr-popup.service';
import { QuestionValidationRbsmrService } from './question-validation-rbsmr.service';

@Component({
    selector: 'jhi-question-validation-rbsmr-dialog',
    templateUrl: './question-validation-rbsmr-dialog.component.html'
})
export class QuestionValidationRbsmrDialogComponent implements OnInit {

    questionValidation: QuestionValidationRbsmr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private questionValidationService: QuestionValidationRbsmrService,
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
        if (this.questionValidation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.questionValidationService.update(this.questionValidation));
        } else {
            this.subscribeToSaveResponse(
                this.questionValidationService.create(this.questionValidation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<QuestionValidationRbsmr>>) {
        result.subscribe((res: HttpResponse<QuestionValidationRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: QuestionValidationRbsmr) {
        this.eventManager.broadcast({ name: 'questionValidationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-question-validation-rbsmr-popup',
    template: ''
})
export class QuestionValidationRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionValidationPopupService: QuestionValidationRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.questionValidationPopupService
                    .open(QuestionValidationRbsmrDialogComponent as Component, params['id']);
            } else {
                this.questionValidationPopupService
                    .open(QuestionValidationRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
