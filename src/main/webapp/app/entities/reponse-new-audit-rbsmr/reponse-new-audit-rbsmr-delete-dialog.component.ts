import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReponseNewAuditRbsmr } from './reponse-new-audit-rbsmr.model';
import { ReponseNewAuditRbsmrPopupService } from './reponse-new-audit-rbsmr-popup.service';
import { ReponseNewAuditRbsmrService } from './reponse-new-audit-rbsmr.service';

@Component({
    selector: 'jhi-reponse-new-audit-rbsmr-delete-dialog',
    templateUrl: './reponse-new-audit-rbsmr-delete-dialog.component.html'
})
export class ReponseNewAuditRbsmrDeleteDialogComponent {

    reponseNewAudit: ReponseNewAuditRbsmr;

    constructor(
        private reponseNewAuditService: ReponseNewAuditRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reponseNewAuditService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reponseNewAuditListModification',
                content: 'Deleted an reponseNewAudit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reponse-new-audit-rbsmr-delete-popup',
    template: ''
})
export class ReponseNewAuditRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reponseNewAuditPopupService: ReponseNewAuditRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reponseNewAuditPopupService
                .open(ReponseNewAuditRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
