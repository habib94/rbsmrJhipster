import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CentreRbsmr } from './centre-rbsmr.model';
import { CentreRbsmrService } from './centre-rbsmr.service';

@Component({
    selector: 'jhi-centre-rbsmr-detail',
    templateUrl: './centre-rbsmr-detail.component.html'
})
export class CentreRbsmrDetailComponent implements OnInit, OnDestroy {

    centre: CentreRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private centreService: CentreRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCentres();
    }

    load(id) {
        this.centreService.find(id)
            .subscribe((centreResponse: HttpResponse<CentreRbsmr>) => {
                this.centre = centreResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCentres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'centreListModification',
            (response) => this.load(this.centre.id)
        );
    }
}
