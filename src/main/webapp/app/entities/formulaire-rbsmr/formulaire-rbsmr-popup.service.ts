import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FormulaireRbsmr } from './formulaire-rbsmr.model';
import { FormulaireRbsmrService } from './formulaire-rbsmr.service';

@Injectable()
export class FormulaireRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private formulaireService: FormulaireRbsmrService

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
                this.formulaireService.find(id)
                    .subscribe((formulaireResponse: HttpResponse<FormulaireRbsmr>) => {
                        const formulaire: FormulaireRbsmr = formulaireResponse.body;
                        this.ngbModalRef = this.formulaireModalRef(component, formulaire);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.formulaireModalRef(component, new FormulaireRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    formulaireModalRef(component: Component, formulaire: FormulaireRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.formulaire = formulaire;
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
