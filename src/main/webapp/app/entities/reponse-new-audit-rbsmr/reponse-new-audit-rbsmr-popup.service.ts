import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReponseNewAuditRbsmr } from './reponse-new-audit-rbsmr.model';
import { ReponseNewAuditRbsmrService } from './reponse-new-audit-rbsmr.service';

@Injectable()
export class ReponseNewAuditRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reponseNewAuditService: ReponseNewAuditRbsmrService

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
                this.reponseNewAuditService.find(id)
                    .subscribe((reponseNewAuditResponse: HttpResponse<ReponseNewAuditRbsmr>) => {
                        const reponseNewAudit: ReponseNewAuditRbsmr = reponseNewAuditResponse.body;
                        reponseNewAudit.date = this.datePipe
                            .transform(reponseNewAudit.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.reponseNewAuditModalRef(component, reponseNewAudit);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reponseNewAuditModalRef(component, new ReponseNewAuditRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reponseNewAuditModalRef(component: Component, reponseNewAudit: ReponseNewAuditRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reponseNewAudit = reponseNewAudit;
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
