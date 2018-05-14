import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VisiteRbsmrComponent } from './visite-rbsmr.component';
import { VisiteRbsmrDetailComponent } from './visite-rbsmr-detail.component';
import { VisiteRbsmrPopupComponent } from './visite-rbsmr-dialog.component';
import { VisiteRbsmrDeletePopupComponent } from './visite-rbsmr-delete-dialog.component';

@Injectable()
export class VisiteRbsmrResolvePagingParams implements Resolve<any> {

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

export const visiteRoute: Routes = [
    {
        path: 'visite-rbsmr',
        component: VisiteRbsmrComponent,
        resolve: {
            'pagingParams': VisiteRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'visite-rbsmr/:id',
        component: VisiteRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const visitePopupRoute: Routes = [
    {
        path: 'visite-rbsmr-new',
        component: VisiteRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visite-rbsmr/:id/edit',
        component: VisiteRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visite-rbsmr/:id/delete',
        component: VisiteRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
