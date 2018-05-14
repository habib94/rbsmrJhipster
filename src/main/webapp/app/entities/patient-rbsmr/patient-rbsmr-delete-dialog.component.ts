import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PatientRbsmr } from './patient-rbsmr.model';
import { PatientRbsmrPopupService } from './patient-rbsmr-popup.service';
import { PatientRbsmrService } from './patient-rbsmr.service';

@Component({
    selector: 'jhi-patient-rbsmr-delete-dialog',
    templateUrl: './patient-rbsmr-delete-dialog.component.html'
})
export class PatientRbsmrDeleteDialogComponent {

    patient: PatientRbsmr;

    constructor(
        private patientService: PatientRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.patientService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'patientListModification',
                content: 'Deleted an patient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-patient-rbsmr-delete-popup',
    template: ''
})
export class PatientRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patientPopupService: PatientRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.patientPopupService
                .open(PatientRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
