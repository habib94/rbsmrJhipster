import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TemplateFormulaireRbsmr } from './template-formulaire-rbsmr.model';
import { TemplateFormulaireRbsmrPopupService } from './template-formulaire-rbsmr-popup.service';
import { TemplateFormulaireRbsmrService } from './template-formulaire-rbsmr.service';

@Component({
    selector: 'jhi-template-formulaire-rbsmr-delete-dialog',
    templateUrl: './template-formulaire-rbsmr-delete-dialog.component.html'
})
export class TemplateFormulaireRbsmrDeleteDialogComponent {

    templateFormulaire: TemplateFormulaireRbsmr;

    constructor(
        private templateFormulaireService: TemplateFormulaireRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.templateFormulaireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'templateFormulaireListModification',
                content: 'Deleted an templateFormulaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-template-formulaire-rbsmr-delete-popup',
    template: ''
})
export class TemplateFormulaireRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private templateFormulairePopupService: TemplateFormulaireRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.templateFormulairePopupService
                .open(TemplateFormulaireRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
