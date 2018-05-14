import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionValidationRbsmr } from './question-validation-rbsmr.model';
import { QuestionValidationRbsmrService } from './question-validation-rbsmr.service';

@Component({
    selector: 'jhi-question-validation-rbsmr-detail',
    templateUrl: './question-validation-rbsmr-detail.component.html'
})
export class QuestionValidationRbsmrDetailComponent implements OnInit, OnDestroy {

    questionValidation: QuestionValidationRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private questionValidationService: QuestionValidationRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuestionValidations();
    }

    load(id) {
        this.questionValidationService.find(id)
            .subscribe((questionValidationResponse: HttpResponse<QuestionValidationRbsmr>) => {
                this.questionValidation = questionValidationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuestionValidations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'questionValidationListModification',
            (response) => this.load(this.questionValidation.id)
        );
    }
}
