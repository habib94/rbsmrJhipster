import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TemplateFormulaireRbsmr } from './template-formulaire-rbsmr.model';
import { TemplateFormulaireRbsmrService } from './template-formulaire-rbsmr.service';

@Component({
    selector: 'jhi-template-formulaire-rbsmr-detail',
    templateUrl: './template-formulaire-rbsmr-detail.component.html'
})
export class TemplateFormulaireRbsmrDetailComponent implements OnInit, OnDestroy {

    templateFormulaire: TemplateFormulaireRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private templateFormulaireService: TemplateFormulaireRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTemplateFormulaires();
    }

    load(id) {
        this.templateFormulaireService.find(id)
            .subscribe((templateFormulaireResponse: HttpResponse<TemplateFormulaireRbsmr>) => {
                this.templateFormulaire = templateFormulaireResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTemplateFormulaires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'templateFormulaireListModification',
            (response) => this.load(this.templateFormulaire.id)
        );
    }
}
