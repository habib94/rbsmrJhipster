import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PatientRemoveAuditRbsmrComponent } from './patient-remove-audit-rbsmr.component';
import { PatientRemoveAuditRbsmrDetailComponent } from './patient-remove-audit-rbsmr-detail.component';
import { PatientRemoveAuditRbsmrPopupComponent } from './patient-remove-audit-rbsmr-dialog.component';
import { PatientRemoveAuditRbsmrDeletePopupComponent } from './patient-remove-audit-rbsmr-delete-dialog.component';

@Injectable()
export class PatientRemoveAuditRbsmrResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const patientRemoveAuditRoute: Routes = [
    {
        path: 'patient-remove-audit-rbsmr',
        component: PatientRemoveAuditRbsmrComponent,
        resolve: {
            'pagingParams': PatientRemoveAuditRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patientRemoveAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'patient-remove-audit-rbsmr/:id',
        component: PatientRemoveAuditRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patientRemoveAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const patientRemoveAuditPopupRoute: Routes = [
    {
        path: 'patient-remove-audit-rbsmr-new',
        component: PatientRemoveAuditRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patientRemoveAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patient-remove-audit-rbsmr/:id/edit',
        component: PatientRemoveAuditRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patientRemoveAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patient-remove-audit-rbsmr/:id/delete',
        component: PatientRemoveAuditRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patientRemoveAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
