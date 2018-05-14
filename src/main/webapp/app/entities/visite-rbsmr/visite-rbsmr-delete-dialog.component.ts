import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VisiteRbsmr } from './visite-rbsmr.model';
import { VisiteRbsmrPopupService } from './visite-rbsmr-popup.service';
import { VisiteRbsmrService } from './visite-rbsmr.service';

@Component({
    selector: 'jhi-visite-rbsmr-delete-dialog',
    templateUrl: './visite-rbsmr-delete-dialog.component.html'
})
export class VisiteRbsmrDeleteDialogComponent {

    visite: VisiteRbsmr;

    constructor(
        private visiteService: VisiteRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.visiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'visiteListModification',
                content: 'Deleted an visite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-visite-rbsmr-delete-popup',
    template: ''
})
export class VisiteRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: VisiteRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.visitePopupService
                .open(VisiteRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
