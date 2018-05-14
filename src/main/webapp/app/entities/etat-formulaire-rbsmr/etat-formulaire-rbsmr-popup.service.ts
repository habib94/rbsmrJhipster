import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EtatFormulaireRbsmr } from './etat-formulaire-rbsmr.model';
import { EtatFormulaireRbsmrService } from './etat-formulaire-rbsmr.service';

@Injectable()
export class EtatFormulaireRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private etatFormulaireService: EtatFormulaireRbsmrService

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
                this.etatFormulaireService.find(id)
                    .subscribe((etatFormulaireResponse: HttpResponse<EtatFormulaireRbsmr>) => {
                        const etatFormulaire: EtatFormulaireRbsmr = etatFormulaireResponse.body;
                        etatFormulaire.dateValidation = this.datePipe
                            .transform(etatFormulaire.dateValidation, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.etatFormulaireModalRef(component, etatFormulaire);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.etatFormulaireModalRef(component, new EtatFormulaireRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    etatFormulaireModalRef(component: Component, etatFormulaire: EtatFormulaireRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.etatFormulaire = etatFormulaire;
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
