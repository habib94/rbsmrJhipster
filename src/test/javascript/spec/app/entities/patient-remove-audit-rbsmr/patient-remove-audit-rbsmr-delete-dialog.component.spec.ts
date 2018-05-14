/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { PatientRemoveAuditRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr-delete-dialog.component';
import { PatientRemoveAuditRbsmrService } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.service';

describe('Component Tests', () => {

    describe('PatientRemoveAuditRbsmr Management Delete Component', () => {
        let comp: PatientRemoveAuditRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<PatientRemoveAuditRbsmrDeleteDialogComponent>;
        let service: PatientRemoveAuditRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [PatientRemoveAuditRbsmrDeleteDialogComponent],
                providers: [
                    PatientRemoveAuditRbsmrService
                ]
            })
            .overrideTemplate(PatientRemoveAuditRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatientRemoveAuditRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientRemoveAuditRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
