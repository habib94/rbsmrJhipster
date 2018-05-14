/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { PatientRemoveAuditRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr-dialog.component';
import { PatientRemoveAuditRbsmrService } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.service';
import { PatientRemoveAuditRbsmr } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.model';
import { UtilisateurRbsmrService } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr';

describe('Component Tests', () => {

    describe('PatientRemoveAuditRbsmr Management Dialog Component', () => {
        let comp: PatientRemoveAuditRbsmrDialogComponent;
        let fixture: ComponentFixture<PatientRemoveAuditRbsmrDialogComponent>;
        let service: PatientRemoveAuditRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [PatientRemoveAuditRbsmrDialogComponent],
                providers: [
                    UtilisateurRbsmrService,
                    PatientRemoveAuditRbsmrService
                ]
            })
            .overrideTemplate(PatientRemoveAuditRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatientRemoveAuditRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientRemoveAuditRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PatientRemoveAuditRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.patientRemoveAudit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'patientRemoveAuditListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PatientRemoveAuditRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.patientRemoveAudit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'patientRemoveAuditListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
