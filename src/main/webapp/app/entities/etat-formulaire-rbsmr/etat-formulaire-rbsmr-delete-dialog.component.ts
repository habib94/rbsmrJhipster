import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EtatFormulaireRbsmr } from './etat-formulaire-rbsmr.model';
import { EtatFormulaireRbsmrPopupService } from './etat-formulaire-rbsmr-popup.service';
import { EtatFormulaireRbsmrService } from './etat-formulaire-rbsmr.service';

@Component({
    selector: 'jhi-etat-formulaire-rbsmr-delete-dialog',
    templateUrl: './etat-formulaire-rbsmr-delete-dialog.component.html'
})
export class EtatFormulaireRbsmrDeleteDialogComponent {

    etatFormulaire: EtatFormulaireRbsmr;

    constructor(
        private etatFormulaireService: EtatFormulaireRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etatFormulaireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'etatFormulaireListModification',
                content: 'Deleted an etatFormulaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etat-formulaire-rbsmr-delete-popup',
    template: ''
})
export class EtatFormulaireRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etatFormulairePopupService: EtatFormulaireRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.etatFormulairePopupService
                .open(EtatFormulaireRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
