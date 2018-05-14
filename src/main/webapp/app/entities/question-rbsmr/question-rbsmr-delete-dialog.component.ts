import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionRbsmr } from './question-rbsmr.model';
import { QuestionRbsmrPopupService } from './question-rbsmr-popup.service';
import { QuestionRbsmrService } from './question-rbsmr.service';

@Component({
    selector: 'jhi-question-rbsmr-delete-dialog',
    templateUrl: './question-rbsmr-delete-dialog.component.html'
})
export class QuestionRbsmrDeleteDialogComponent {

    question: QuestionRbsmr;

    constructor(
        private questionService: QuestionRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.questionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'questionListModification',
                content: 'Deleted an question'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-question-rbsmr-delete-popup',
    template: ''
})
export class QuestionRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionPopupService: QuestionRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.questionPopupService
                .open(QuestionRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
