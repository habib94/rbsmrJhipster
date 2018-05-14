import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemandeChangementRbsmr } from './demande-changement-rbsmr.model';
import { DemandeChangementRbsmrPopupService } from './demande-changement-rbsmr-popup.service';
import { DemandeChangementRbsmrService } from './demande-changement-rbsmr.service';

@Component({
    selector: 'jhi-demande-changement-rbsmr-delete-dialog',
    templateUrl: './demande-changement-rbsmr-delete-dialog.component.html'
})
export class DemandeChangementRbsmrDeleteDialogComponent {

    demandeChangement: DemandeChangementRbsmr;

    constructor(
        private demandeChangementService: DemandeChangementRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demandeChangementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demandeChangementListModification',
                content: 'Deleted an demandeChangement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demande-changement-rbsmr-delete-popup',
    template: ''
})
export class DemandeChangementRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demandeChangementPopupService: DemandeChangementRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demandeChangementPopupService
                .open(DemandeChangementRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
