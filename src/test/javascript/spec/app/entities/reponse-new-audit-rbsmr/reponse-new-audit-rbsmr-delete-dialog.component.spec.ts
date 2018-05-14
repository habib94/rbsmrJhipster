/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseNewAuditRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr-delete-dialog.component';
import { ReponseNewAuditRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.service';

describe('Component Tests', () => {

    describe('ReponseNewAuditRbsmr Management Delete Component', () => {
        let comp: ReponseNewAuditRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<ReponseNewAuditRbsmrDeleteDialogComponent>;
        let service: ReponseNewAuditRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseNewAuditRbsmrDeleteDialogComponent],
                providers: [
                    ReponseNewAuditRbsmrService
                ]
            })
            .overrideTemplate(ReponseNewAuditRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseNewAuditRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseNewAuditRbsmrService);
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
