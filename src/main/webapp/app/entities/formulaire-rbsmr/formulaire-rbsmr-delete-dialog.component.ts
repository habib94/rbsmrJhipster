import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FormulaireRbsmr } from './formulaire-rbsmr.model';
import { FormulaireRbsmrPopupService } from './formulaire-rbsmr-popup.service';
import { FormulaireRbsmrService } from './formulaire-rbsmr.service';

@Component({
    selector: 'jhi-formulaire-rbsmr-delete-dialog',
    templateUrl: './formulaire-rbsmr-delete-dialog.component.html'
})
export class FormulaireRbsmrDeleteDialogComponent {

    formulaire: FormulaireRbsmr;

    constructor(
        private formulaireService: FormulaireRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formulaireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formulaireListModification',
                content: 'Deleted an formulaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-formulaire-rbsmr-delete-popup',
    template: ''
})
export class FormulaireRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formulairePopupService: FormulaireRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formulairePopupService
                .open(FormulaireRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
