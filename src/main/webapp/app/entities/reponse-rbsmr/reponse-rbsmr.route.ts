import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReponseRbsmrComponent } from './reponse-rbsmr.component';
import { ReponseRbsmrDetailComponent } from './reponse-rbsmr-detail.component';
import { ReponseRbsmrPopupComponent } from './reponse-rbsmr-dialog.component';
import { ReponseRbsmrDeletePopupComponent } from './reponse-rbsmr-delete-dialog.component';

@Injectable()
export class ReponseRbsmrResolvePagingParams implements Resolve<any> {

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

export const reponseRoute: Routes = [
    {
        path: 'reponse-rbsmr',
        component: ReponseRbsmrComponent,
        resolve: {
            'pagingParams': ReponseRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reponse-rbsmr/:id',
        component: ReponseRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reponsePopupRoute: Routes = [
    {
        path: 'reponse-rbsmr-new',
        component: ReponseRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reponse-rbsmr/:id/edit',
        component: ReponseRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reponse-rbsmr/:id/delete',
        component: ReponseRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
