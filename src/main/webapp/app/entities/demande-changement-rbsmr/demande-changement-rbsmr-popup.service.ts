import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DemandeChangementRbsmr } from './demande-changement-rbsmr.model';
import { DemandeChangementRbsmrService } from './demande-changement-rbsmr.service';

@Injectable()
export class DemandeChangementRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private demandeChangementService: DemandeChangementRbsmrService

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
                this.demandeChangementService.find(id)
                    .subscribe((demandeChangementResponse: HttpResponse<DemandeChangementRbsmr>) => {
                        const demandeChangement: DemandeChangementRbsmr = demandeChangementResponse.body;
                        demandeChangement.date = this.datePipe
                            .transform(demandeChangement.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.demandeChangementModalRef(component, demandeChangement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.demandeChangementModalRef(component, new DemandeChangementRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    demandeChangementModalRef(component: Component, demandeChangement: DemandeChangementRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.demandeChangement = demandeChangement;
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
