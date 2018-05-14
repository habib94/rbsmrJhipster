import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FormulaireRbsmr } from './formulaire-rbsmr.model';
import { FormulaireRbsmrService } from './formulaire-rbsmr.service';

@Component({
    selector: 'jhi-formulaire-rbsmr-detail',
    templateUrl: './formulaire-rbsmr-detail.component.html'
})
export class FormulaireRbsmrDetailComponent implements OnInit, OnDestroy {

    formulaire: FormulaireRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private formulaireService: FormulaireRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormulaires();
    }

    load(id) {
        this.formulaireService.find(id)
            .subscribe((formulaireResponse: HttpResponse<FormulaireRbsmr>) => {
                this.formulaire = formulaireResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormulaires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formulaireListModification',
            (response) => this.load(this.formulaire.id)
        );
    }
}
