import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReponseNewAuditRbsmrComponent } from './reponse-new-audit-rbsmr.component';
import { ReponseNewAuditRbsmrDetailComponent } from './reponse-new-audit-rbsmr-detail.component';
import { ReponseNewAuditRbsmrPopupComponent } from './reponse-new-audit-rbsmr-dialog.component';
import { ReponseNewAuditRbsmrDeletePopupComponent } from './reponse-new-audit-rbsmr-delete-dialog.component';

@Injectable()
export class ReponseNewAuditRbsmrResolvePagingParams implements Resolve<any> {

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

export const reponseNewAuditRoute: Routes = [
    {
        path: 'reponse-new-audit-rbsmr',
        component: ReponseNewAuditRbsmrComponent,
        resolve: {
            'pagingParams': ReponseNewAuditRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponseNewAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reponse-new-audit-rbsmr/:id',
        component: ReponseNewAuditRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponseNewAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reponseNewAuditPopupRoute: Routes = [
    {
        path: 'reponse-new-audit-rbsmr-new',
        component: ReponseNewAuditRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponseNewAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reponse-new-audit-rbsmr/:id/edit',
        component: ReponseNewAuditRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponseNewAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reponse-new-audit-rbsmr/:id/delete',
        component: ReponseNewAuditRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponseNewAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
