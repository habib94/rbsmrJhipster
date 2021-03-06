/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { EtatFormulaireRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr-delete-dialog.component';
import { EtatFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr.service';

describe('Component Tests', () => {

    describe('EtatFormulaireRbsmr Management Delete Component', () => {
        let comp: EtatFormulaireRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<EtatFormulaireRbsmrDeleteDialogComponent>;
        let service: EtatFormulaireRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [EtatFormulaireRbsmrDeleteDialogComponent],
                providers: [
                    EtatFormulaireRbsmrService
                ]
            })
            .overrideTemplate(EtatFormulaireRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatFormulaireRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatFormulaireRbsmrService);
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
