import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PatientRbsmrComponent } from './patient-rbsmr.component';
import { PatientRbsmrDetailComponent } from './patient-rbsmr-detail.component';
import { PatientRbsmrPopupComponent } from './patient-rbsmr-dialog.component';
import { PatientRbsmrDeletePopupComponent } from './patient-rbsmr-delete-dialog.component';

@Injectable()
export class PatientRbsmrResolvePagingParams implements Resolve<any> {

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

export const patientRoute: Routes = [
    {
        path: 'patient-rbsmr',
        component: PatientRbsmrComponent,
        resolve: {
            'pagingParams': PatientRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'patient-rbsmr/:id',
        component: PatientRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const patientPopupRoute: Routes = [
    {
        path: 'patient-rbsmr-new',
        component: PatientRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patient-rbsmr/:id/edit',
        component: PatientRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patient-rbsmr/:id/delete',
        component: PatientRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
