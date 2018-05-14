import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UtilisateurRbsmrComponent } from './utilisateur-rbsmr.component';
import { UtilisateurRbsmrDetailComponent } from './utilisateur-rbsmr-detail.component';
import { UtilisateurRbsmrPopupComponent } from './utilisateur-rbsmr-dialog.component';
import { UtilisateurRbsmrDeletePopupComponent } from './utilisateur-rbsmr-delete-dialog.component';

@Injectable()
export class UtilisateurRbsmrResolvePagingParams implements Resolve<any> {

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

export const utilisateurRoute: Routes = [
    {
        path: 'utilisateur-rbsmr',
        component: UtilisateurRbsmrComponent,
        resolve: {
            'pagingParams': UtilisateurRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'utilisateur-rbsmr/:id',
        component: UtilisateurRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilisateurPopupRoute: Routes = [
    {
        path: 'utilisateur-rbsmr-new',
        component: UtilisateurRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utilisateur-rbsmr/:id/edit',
        component: UtilisateurRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utilisateur-rbsmr/:id/delete',
        component: UtilisateurRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
