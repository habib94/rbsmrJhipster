import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionValidationRbsmr } from './question-validation-rbsmr.model';
import { QuestionValidationRbsmrPopupService } from './question-validation-rbsmr-popup.service';
import { QuestionValidationRbsmrService } from './question-validation-rbsmr.service';

@Component({
    selector: 'jhi-question-validation-rbsmr-delete-dialog',
    templateUrl: './question-validation-rbsmr-delete-dialog.component.html'
})
export class QuestionValidationRbsmrDeleteDialogComponent {

    questionValidation: QuestionValidationRbsmr;

    constructor(
        private questionValidationService: QuestionValidationRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.questionValidationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'questionValidationListModification',
                content: 'Deleted an questionValidation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-question-validation-rbsmr-delete-popup',
    template: ''
})
export class QuestionValidationRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionValidationPopupService: QuestionValidationRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.questionValidationPopupService
                .open(QuestionValidationRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
