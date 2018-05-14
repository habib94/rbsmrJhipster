import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReponseNewAuditRbsmr } from './reponse-new-audit-rbsmr.model';
import { ReponseNewAuditRbsmrService } from './reponse-new-audit-rbsmr.service';

@Component({
    selector: 'jhi-reponse-new-audit-rbsmr-detail',
    templateUrl: './reponse-new-audit-rbsmr-detail.component.html'
})
export class ReponseNewAuditRbsmrDetailComponent implements OnInit, OnDestroy {

    reponseNewAudit: ReponseNewAuditRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reponseNewAuditService: ReponseNewAuditRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReponseNewAudits();
    }

    load(id) {
        this.reponseNewAuditService.find(id)
            .subscribe((reponseNewAuditResponse: HttpResponse<ReponseNewAuditRbsmr>) => {
                this.reponseNewAudit = reponseNewAuditResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReponseNewAudits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reponseNewAuditListModification',
            (response) => this.load(this.reponseNewAudit.id)
        );
    }
}
