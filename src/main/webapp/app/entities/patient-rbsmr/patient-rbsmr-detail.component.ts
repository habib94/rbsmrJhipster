import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PatientRbsmr } from './patient-rbsmr.model';
import { PatientRbsmrService } from './patient-rbsmr.service';

@Component({
    selector: 'jhi-patient-rbsmr-detail',
    templateUrl: './patient-rbsmr-detail.component.html'
})
export class PatientRbsmrDetailComponent implements OnInit, OnDestroy {

    patient: PatientRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private patientService: PatientRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPatients();
    }

    load(id) {
        this.patientService.find(id)
            .subscribe((patientResponse: HttpResponse<PatientRbsmr>) => {
                this.patient = patientResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPatients() {
        this.eventSubscriber = this.eventManager.subscribe(
            'patientListModification',
            (response) => this.load(this.patient.id)
        );
    }
}
