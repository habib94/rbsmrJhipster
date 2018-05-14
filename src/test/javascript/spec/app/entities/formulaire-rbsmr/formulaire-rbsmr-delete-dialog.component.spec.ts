/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { FormulaireRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr-delete-dialog.component';
import { FormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.service';

describe('Component Tests', () => {

    describe('FormulaireRbsmr Management Delete Component', () => {
        let comp: FormulaireRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<FormulaireRbsmrDeleteDialogComponent>;
        let service: FormulaireRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [FormulaireRbsmrDeleteDialogComponent],
                providers: [
                    FormulaireRbsmrService
                ]
            })
            .overrideTemplate(FormulaireRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormulaireRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormulaireRbsmrService);
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
