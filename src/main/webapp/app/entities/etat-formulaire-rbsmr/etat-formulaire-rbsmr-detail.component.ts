import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EtatFormulaireRbsmr } from './etat-formulaire-rbsmr.model';
import { EtatFormulaireRbsmrService } from './etat-formulaire-rbsmr.service';

@Component({
    selector: 'jhi-etat-formulaire-rbsmr-detail',
    templateUrl: './etat-formulaire-rbsmr-detail.component.html'
})
export class EtatFormulaireRbsmrDetailComponent implements OnInit, OnDestroy {

    etatFormulaire: EtatFormulaireRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private etatFormulaireService: EtatFormulaireRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEtatFormulaires();
    }

    load(id) {
        this.etatFormulaireService.find(id)
            .subscribe((etatFormulaireResponse: HttpResponse<EtatFormulaireRbsmr>) => {
                this.etatFormulaire = etatFormulaireResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEtatFormulaires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'etatFormulaireListModification',
            (response) => this.load(this.etatFormulaire.id)
        );
    }
}
