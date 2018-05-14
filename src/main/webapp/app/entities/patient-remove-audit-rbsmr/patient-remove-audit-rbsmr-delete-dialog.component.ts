import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PatientRemoveAuditRbsmr } from './patient-remove-audit-rbsmr.model';
import { PatientRemoveAuditRbsmrPopupService } from './patient-remove-audit-rbsmr-popup.service';
import { PatientRemoveAuditRbsmrService } from './patient-remove-audit-rbsmr.service';

@Component({
    selector: 'jhi-patient-remove-audit-rbsmr-delete-dialog',
    templateUrl: './patient-remove-audit-rbsmr-delete-dialog.component.html'
})
export class PatientRemoveAuditRbsmrDeleteDialogComponent {

    patientRemoveAudit: PatientRemoveAuditRbsmr;

    constructor(
        private patientRemoveAuditService: PatientRemoveAuditRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.patientRemoveAuditService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'patientRemoveAuditListModification',
                content: 'Deleted an patientRemoveAudit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-patient-remove-audit-rbsmr-delete-popup',
    template: ''
})
export class PatientRemoveAuditRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patientRemoveAuditPopupService: PatientRemoveAuditRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.patientRemoveAuditPopupService
                .open(PatientRemoveAuditRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
