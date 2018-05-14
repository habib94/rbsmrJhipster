import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TemplateFormulaireRbsmr } from './template-formulaire-rbsmr.model';
import { TemplateFormulaireRbsmrService } from './template-formulaire-rbsmr.service';

@Injectable()
export class TemplateFormulaireRbsmrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private templateFormulaireService: TemplateFormulaireRbsmrService

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
                this.templateFormulaireService.find(id)
                    .subscribe((templateFormulaireResponse: HttpResponse<TemplateFormulaireRbsmr>) => {
                        const templateFormulaire: TemplateFormulaireRbsmr = templateFormulaireResponse.body;
                        this.ngbModalRef = this.templateFormulaireModalRef(component, templateFormulaire);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.templateFormulaireModalRef(component, new TemplateFormulaireRbsmr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    templateFormulaireModalRef(component: Component, templateFormulaire: TemplateFormulaireRbsmr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.templateFormulaire = templateFormulaire;
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
