import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PatientRbsmr } from './patient-rbsmr.model';
import { PatientRbsmrService } from './patient-rbsmr.service';

@Injectable()
export class PatientRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private patientService: PatientRbsmrService

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
                this.patientService.find(id)
                    .subscribe((patientResponse: HttpResponse<PatientRbsmr>) => {
                        const patient: PatientRbsmr = patientResponse.body;
                        patient.dateEnregistrement = this.datePipe
                            .transform(patient.dateEnregistrement, 'yyyy-MM-ddTHH:mm:ss');
                        patient.dateVisite = this.datePipe
                            .transform(patient.dateVisite, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.patientModalRef(component, patient);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.patientModalRef(component, new PatientRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    patientModalRef(component: Component, patient: PatientRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.patient = patient;
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
