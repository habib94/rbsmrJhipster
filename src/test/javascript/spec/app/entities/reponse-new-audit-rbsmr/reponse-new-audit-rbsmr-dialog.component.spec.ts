/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseNewAuditRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr-dialog.component';
import { ReponseNewAuditRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.service';
import { ReponseNewAuditRbsmr } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.model';
import { UtilisateurRbsmrService } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr';

describe('Component Tests', () => {

    describe('ReponseNewAuditRbsmr Management Dialog Component', () => {
        let comp: ReponseNewAuditRbsmrDialogComponent;
        let fixture: ComponentFixture<ReponseNewAuditRbsmrDialogComponent>;
        let service: ReponseNewAuditRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseNewAuditRbsmrDialogComponent],
                providers: [
                    UtilisateurRbsmrService,
                    ReponseNewAuditRbsmrService
                ]
            })
            .overrideTemplate(ReponseNewAuditRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseNewAuditRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseNewAuditRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReponseNewAuditRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reponseNewAudit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reponseNewAuditListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReponseNewAuditRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reponseNewAudit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reponseNewAuditListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
