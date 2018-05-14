import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PatientRemoveAuditRbsmr } from './patient-remove-audit-rbsmr.model';
import { PatientRemoveAuditRbsmrService } from './patient-remove-audit-rbsmr.service';

@Injectable()
export class PatientRemoveAuditRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private patientRemoveAuditService: PatientRemoveAuditRbsmrService

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
                this.patientRemoveAuditService.find(id)
                    .subscribe((patientRemoveAuditResponse: HttpResponse<PatientRemoveAuditRbsmr>) => {
                        const patientRemoveAudit: PatientRemoveAuditRbsmr = patientRemoveAuditResponse.body;
                        patientRemoveAudit.date = this.datePipe
                            .transform(patientRemoveAudit.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.patientRemoveAuditModalRef(component, patientRemoveAudit);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.patientRemoveAuditModalRef(component, new PatientRemoveAuditRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    patientRemoveAuditModalRef(component: Component, patientRemoveAudit: PatientRemoveAuditRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.patientRemoveAudit = patientRemoveAudit;
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
