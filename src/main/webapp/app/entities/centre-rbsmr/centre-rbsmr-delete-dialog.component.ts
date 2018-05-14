import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CentreRbsmr } from './centre-rbsmr.model';
import { CentreRbsmrPopupService } from './centre-rbsmr-popup.service';
import { CentreRbsmrService } from './centre-rbsmr.service';

@Component({
    selector: 'jhi-centre-rbsmr-delete-dialog',
    templateUrl: './centre-rbsmr-delete-dialog.component.html'
})
export class CentreRbsmrDeleteDialogComponent {

    centre: CentreRbsmr;

    constructor(
        private centreService: CentreRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.centreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'centreListModification',
                content: 'Deleted an centre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-centre-rbsmr-delete-popup',
    template: ''
})
export class CentreRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private centrePopupService: CentreRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.centrePopupService
                .open(CentreRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
