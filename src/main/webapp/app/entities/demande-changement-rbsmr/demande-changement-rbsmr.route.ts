import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DemandeChangementRbsmrComponent } from './demande-changement-rbsmr.component';
import { DemandeChangementRbsmrDetailComponent } from './demande-changement-rbsmr-detail.component';
import { DemandeChangementRbsmrPopupComponent } from './demande-changement-rbsmr-dialog.component';
import { DemandeChangementRbsmrDeletePopupComponent } from './demande-changement-rbsmr-delete-dialog.component';

@Injectable()
export class DemandeChangementRbsmrResolvePagingParams implements Resolve<any> {

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

export const demandeChangementRoute: Routes = [
    {
        path: 'demande-changement-rbsmr',
        component: DemandeChangementRbsmrComponent,
        resolve: {
            'pagingParams': DemandeChangementRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.demandeChangement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demande-changement-rbsmr/:id',
        component: DemandeChangementRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.demandeChangement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demandeChangementPopupRoute: Routes = [
    {
        path: 'demande-changement-rbsmr-new',
        component: DemandeChangementRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.demandeChangement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demande-changement-rbsmr/:id/edit',
        component: DemandeChangementRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.demandeChangement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demande-changement-rbsmr/:id/delete',
        component: DemandeChangementRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.demandeChangement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
