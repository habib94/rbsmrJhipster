import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DemandeChangementRbsmr } from './demande-changement-rbsmr.model';
import { DemandeChangementRbsmrService } from './demande-changement-rbsmr.service';

@Component({
    selector: 'jhi-demande-changement-rbsmr-detail',
    templateUrl: './demande-changement-rbsmr-detail.component.html'
})
export class DemandeChangementRbsmrDetailComponent implements OnInit, OnDestroy {

    demandeChangement: DemandeChangementRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private demandeChangementService: DemandeChangementRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemandeChangements();
    }

    load(id) {
        this.demandeChangementService.find(id)
            .subscribe((demandeChangementResponse: HttpResponse<DemandeChangementRbsmr>) => {
                this.demandeChangement = demandeChangementResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemandeChangements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demandeChangementListModification',
            (response) => this.load(this.demandeChangement.id)
        );
    }
}
