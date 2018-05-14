import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReponseRbsmr } from './reponse-rbsmr.model';
import { ReponseRbsmrPopupService } from './reponse-rbsmr-popup.service';
import { ReponseRbsmrService } from './reponse-rbsmr.service';
import { PatientRbsmr, PatientRbsmrService } from '../patient-rbsmr';
import { QuestionRbsmr, QuestionRbsmrService } from '../question-rbsmr';

@Component({
    selector: 'jhi-reponse-rbsmr-dialog',
    templateUrl: './reponse-rbsmr-dialog.component.html'
})
export class ReponseRbsmrDialogComponent implements OnInit {

    reponse: ReponseRbsmr;
    isSaving: boolean;

    patients: PatientRbsmr[];

    questions: QuestionRbsmr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reponseService: ReponseRbsmrService,
        private patientService: PatientRbsmrService,
        private questionService: QuestionRbsmrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.patientService.query()
            .subscribe((res: HttpResponse<PatientRbsmr[]>) => { this.patients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.questionService.query()
            .subscribe((res: HttpResponse<QuestionRbsmr[]>) => { this.questions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reponse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reponseService.update(this.reponse));
        } else {
            this.subscribeToSaveResponse(
                this.reponseService.create(this.reponse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReponseRbsmr>>) {
        result.subscribe((res: HttpResponse<ReponseRbsmr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReponseRbsmr) {
        this.eventManager.broadcast({ name: 'reponseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPatientById(index: number, item: PatientRbsmr) {
        return item.id;
    }

    trackQuestionById(index: number, item: QuestionRbsmr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-reponse-rbsmr-popup',
    template: ''
})
export class ReponseRbsmrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reponsePopupService: ReponseRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reponsePopupService
                    .open(ReponseRbsmrDialogComponent as Component, params['id']);
            } else {
                this.reponsePopupService
                    .open(ReponseRbsmrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
