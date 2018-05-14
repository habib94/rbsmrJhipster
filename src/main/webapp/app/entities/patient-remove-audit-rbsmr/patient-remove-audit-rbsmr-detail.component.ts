import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PatientRemoveAuditRbsmr } from './patient-remove-audit-rbsmr.model';
import { PatientRemoveAuditRbsmrService } from './patient-remove-audit-rbsmr.service';

@Component({
    selector: 'jhi-patient-remove-audit-rbsmr-detail',
    templateUrl: './patient-remove-audit-rbsmr-detail.component.html'
})
export class PatientRemoveAuditRbsmrDetailComponent implements OnInit, OnDestroy {

    patientRemoveAudit: PatientRemoveAuditRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private patientRemoveAuditService: PatientRemoveAuditRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPatientRemoveAudits();
    }

    load(id) {
        this.patientRemoveAuditService.find(id)
            .subscribe((patientRemoveAuditResponse: HttpResponse<PatientRemoveAuditRbsmr>) => {
                this.patientRemoveAudit = patientRemoveAuditResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPatientRemoveAudits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'patientRemoveAuditListModification',
            (response) => this.load(this.patientRemoveAudit.id)
        );
    }
}
