import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CentreRbsmrComponent } from './centre-rbsmr.component';
import { CentreRbsmrDetailComponent } from './centre-rbsmr-detail.component';
import { CentreRbsmrPopupComponent } from './centre-rbsmr-dialog.component';
import { CentreRbsmrDeletePopupComponent } from './centre-rbsmr-delete-dialog.component';

@Injectable()
export class CentreRbsmrResolvePagingParams implements Resolve<any> {

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

export const centreRoute: Routes = [
    {
        path: 'centre-rbsmr',
        component: CentreRbsmrComponent,
        resolve: {
            'pagingParams': CentreRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.centre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'centre-rbsmr/:id',
        component: CentreRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.centre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const centrePopupRoute: Routes = [
    {
        path: 'centre-rbsmr-new',
        component: CentreRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.centre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'centre-rbsmr/:id/edit',
        component: CentreRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.centre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'centre-rbsmr/:id/delete',
        component: CentreRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.centre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
