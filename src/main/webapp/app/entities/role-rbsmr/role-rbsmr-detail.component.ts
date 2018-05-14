import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoleRbsmr } from './role-rbsmr.model';
import { RoleRbsmrService } from './role-rbsmr.service';

@Component({
    selector: 'jhi-role-rbsmr-detail',
    templateUrl: './role-rbsmr-detail.component.html'
})
export class RoleRbsmrDetailComponent implements OnInit, OnDestroy {

    role: RoleRbsmr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roleService: RoleRbsmrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoles();
    }

    load(id) {
        this.roleService.find(id)
            .subscribe((roleResponse: HttpResponse<RoleRbsmr>) => {
                this.role = roleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roleListModification',
            (response) => this.load(this.role.id)
        );
    }
}
