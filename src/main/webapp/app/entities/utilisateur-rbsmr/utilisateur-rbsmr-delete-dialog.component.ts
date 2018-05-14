import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UtilisateurRbsmr } from './utilisateur-rbsmr.model';
import { UtilisateurRbsmrPopupService } from './utilisateur-rbsmr-popup.service';
import { UtilisateurRbsmrService } from './utilisateur-rbsmr.service';

@Component({
    selector: 'jhi-utilisateur-rbsmr-delete-dialog',
    templateUrl: './utilisateur-rbsmr-delete-dialog.component.html'
})
export class UtilisateurRbsmrDeleteDialogComponent {

    utilisateur: UtilisateurRbsmr;

    constructor(
        private utilisateurService: UtilisateurRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilisateurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'utilisateurListModification',
                content: 'Deleted an utilisateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utilisateur-rbsmr-delete-popup',
    template: ''
})
export class UtilisateurRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.utilisateurPopupService
                .open(UtilisateurRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
