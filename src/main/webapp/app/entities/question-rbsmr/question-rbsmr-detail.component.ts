import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionRbsmr } from './question-rbsmr.model';
import { QuestionRbsmrService } from './question-rbsmr.service';

@Component({
    selector: 'jhi-question-rbsmr-detail',
    templateUrl: './question-rbsmr-detail.component.html'
})
export class QuestionRbsmrDetailComponent implements OnInit, OnDestroy {

    question: QuestionRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private questionService: QuestionRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuestions();
    }

    load(id) {
        this.questionService.find(id)
            .subscribe((questionResponse: HttpResponse<QuestionRbsmr>) => {
                this.question = questionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuestions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'questionListModification',
            (response) => this.load(this.question.id)
        );
    }
}
