/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { UtilisateurRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr-dialog.component';
import { UtilisateurRbsmrService } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.service';
import { UtilisateurRbsmr } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.model';
import { CentreRbsmrService } from '../../../../../../main/webapp/app/entities/centre-rbsmr';
import { RoleRbsmrService } from '../../../../../../main/webapp/app/entities/role-rbsmr';

describe('Component Tests', () => {

    describe('UtilisateurRbsmr Management Dialog Component', () => {
        let comp: UtilisateurRbsmrDialogComponent;
        let fixture: ComponentFixture<UtilisateurRbsmrDialogComponent>;
        let service: UtilisateurRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [UtilisateurRbsmrDialogComponent],
                providers: [
                    CentreRbsmrService,
                    RoleRbsmrService,
                    UtilisateurRbsmrService
                ]
            })
            .overrideTemplate(UtilisateurRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UtilisateurRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.utilisateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'utilisateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UtilisateurRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.utilisateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'utilisateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
