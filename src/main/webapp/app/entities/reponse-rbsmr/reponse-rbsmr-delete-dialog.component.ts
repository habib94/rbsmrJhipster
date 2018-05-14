import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReponseRbsmr } from './reponse-rbsmr.model';
import { ReponseRbsmrPopupService } from './reponse-rbsmr-popup.service';
import { ReponseRbsmrService } from './reponse-rbsmr.service';

@Component({
    selector: 'jhi-reponse-rbsmr-delete-dialog',
    templateUrl: './reponse-rbsmr-delete-dialog.component.html'
})
export class ReponseRbsmrDeleteDialogComponent {

    reponse: ReponseRbsmr;

    constructor(
        private reponseService: ReponseRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reponseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reponseListModification',
                content: 'Deleted an reponse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reponse-rbsmr-delete-popup',
    template: ''
})
export class ReponseRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reponsePopupService: ReponseRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reponsePopupService
                .open(ReponseRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
