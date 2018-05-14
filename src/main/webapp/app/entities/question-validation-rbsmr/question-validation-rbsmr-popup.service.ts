import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { QuestionValidationRbsmr } from './question-validation-rbsmr.model';
import { QuestionValidationRbsmrService } from './question-validation-rbsmr.service';

@Injectable()
export class QuestionValidationRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private questionValidationService: QuestionValidationRbsmrService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.questionValidationService.find(id)
                    .subscribe((questionValidationResponse: HttpResponse<QuestionValidationRbsmr>) => {
                        const questionValidation: QuestionValidationRbsmr = questionValidationResponse.body;
                        this.ngbModalRef = this.questionValidationModalRef(component, questionValidation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.questionValidationModalRef(component, new QuestionValidationRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    questionValidationModalRef(component: Component, questionValidation: QuestionValidationRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.questionValidation = questionValidation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
