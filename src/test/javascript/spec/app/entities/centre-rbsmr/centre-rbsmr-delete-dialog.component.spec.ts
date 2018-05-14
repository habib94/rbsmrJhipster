/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { CentreRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr-delete-dialog.component';
import { CentreRbsmrService } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr.service';

describe('Component Tests', () => {

    describe('CentreRbsmr Management Delete Component', () => {
        let comp: CentreRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<CentreRbsmrDeleteDialogComponent>;
        let service: CentreRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [CentreRbsmrDeleteDialogComponent],
                providers: [
                    CentreRbsmrService
                ]
            })
            .overrideTemplate(CentreRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CentreRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CentreRbsmrService);
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
