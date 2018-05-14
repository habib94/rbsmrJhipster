import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UtilisateurRbsmr } from './utilisateur-rbsmr.model';
import { UtilisateurRbsmrService } from './utilisateur-rbsmr.service';

@Component({
    selector: 'jhi-utilisateur-rbsmr-detail',
    templateUrl: './utilisateur-rbsmr-detail.component.html'
})
export class UtilisateurRbsmrDetailComponent implements OnInit, OnDestroy {

    utilisateur: UtilisateurRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private utilisateurService: UtilisateurRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUtilisateurs();
    }

    load(id) {
        this.utilisateurService.find(id)
            .subscribe((utilisateurResponse: HttpResponse<UtilisateurRbsmr>) => {
                this.utilisateur = utilisateurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUtilisateurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'utilisateurListModification',
            (response) => this.load(this.utilisateur.id)
        );
    }
}
