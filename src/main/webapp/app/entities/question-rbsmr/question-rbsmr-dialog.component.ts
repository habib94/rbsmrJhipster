import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuestionRbsmr } from './question-rbsmr.model';
import { QuestionRbsmrPopupService } from './question-rbsmr-popup.service';
import { QuestionRbsmrService } from './question-rbsmr.service';
import { TemplateFormulaireRbsmr, TemplateFormulaireRbsmrService } from '../template-formulaire-rbsmr';
import { QuestionValidationRbsmr, QuestionValidationRbsmrService } from '../question-validation-rbsmr';

@Component({
    selector: 'jhi-question-rbsmr-dialog',
    templateUrl: './question-rbsmr-dialog.component.html'
})
export class QuestionRbsmrDialogComponent implements OnInit {

    question: QuestionRbsmr;
    isSaving: boolean;

    templateformulaires: TemplateFormulaireRbsmr[];

    questions: QuestionRbsmr[];

    questionvalidations: QuestionValidationRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private questionService: QuestionRbsmrService,
        private templateFormulaireService: TemplateFormulaireRbsmrService,
        private questionValidationService: QuestionValidationRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.templateFormulaireService.query()
            .subscribe((res: HttpResponse<TemplateFormulaireRbsmr[]>) => { this.templateformulaires = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.questionService.query()
            .subscribe((res: HttpResponse<QuestionRbsmr[]>) => { this.questions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.questionValidationService.query()
            .subscribe((res: HttpResponse<QuestionValidationRbsmr[]>) => { this.questionvalidations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.question.id !== undefined) {
            this.subscribeToSaveResponse(
                this.questionService.update(this.question));
        } else {
            this.subscribeToSaveResponse(
                this.questionService.create(this.question));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<QuestionRbsmr>>) {
        result.subscribe((res: HttpResponse<QuestionRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: QuestionRbsmr) {
        this.eventManager.broadcast({ name: 'questionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTemplateFormulaireById(index: number, item: TemplateFormulaireRbsmr) {
        return item.id;
    }

    trackQuestionById(index: number, item: QuestionRbsmr) {
        return item.id;
    }

    trackQuestionValidationById(index: number, item: QuestionValidationRbsmr) {
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
    selector: 'jhi-question-rbsmr-popup',
    template: ''
})
export class QuestionRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionPopupService: QuestionRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.questionPopupService
                    .open(QuestionRbsmrDialogComponent as Component, params['id']);
            } else {
                this.questionPopupService
                    .open(QuestionRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
