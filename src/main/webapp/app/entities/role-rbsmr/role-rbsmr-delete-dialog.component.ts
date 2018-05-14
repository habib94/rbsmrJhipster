import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleRbsmr } from './role-rbsmr.model';
import { RoleRbsmrPopupService } from './role-rbsmr-popup.service';
import { RoleRbsmrService } from './role-rbsmr.service';

@Component({
    selector: 'jhi-role-rbsmr-delete-dialog',
    templateUrl: './role-rbsmr-delete-dialog.component.html'
})
export class RoleRbsmrDeleteDialogComponent {

    role: RoleRbsmr;

    constructor(
        private roleService: RoleRbsmrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roleListModification',
                content: 'Deleted an role'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-rbsmr-delete-popup',
    template: ''
})
export class RoleRbsmrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RoleRbsmrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rolePopupService
                .open(RoleRbsmrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
