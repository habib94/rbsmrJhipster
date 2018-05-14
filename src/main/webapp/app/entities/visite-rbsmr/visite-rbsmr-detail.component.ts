import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VisiteRbsmr } from './visite-rbsmr.model';
import { VisiteRbsmrService } from './visite-rbsmr.service';

@Component({
    selector: 'jhi-visite-rbsmr-detail',
    templateUrl: './visite-rbsmr-detail.component.html'
})
export class VisiteRbsmrDetailComponent implements OnInit, OnDestroy {

    visite: VisiteRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private visiteService: VisiteRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVisites();
    }

    load(id) {
        this.visiteService.find(id)
            .subscribe((visiteResponse: HttpResponse<VisiteRbsmr>) => {
                this.visite = visiteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVisites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'visiteListModification',
            (response) => this.load(this.visite.id)
        );
    }
}
