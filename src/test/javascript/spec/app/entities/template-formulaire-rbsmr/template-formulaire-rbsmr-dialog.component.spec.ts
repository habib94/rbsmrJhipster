/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { TemplateFormulaireRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr-dialog.component';
import { TemplateFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.service';
import { TemplateFormulaireRbsmr } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('TemplateFormulaireRbsmr Management Dialog Component', () => {
        let comp: TemplateFormulaireRbsmrDialogComponent;
        let fixture: ComponentFixture<TemplateFormulaireRbsmrDialogComponent>;
        let service: TemplateFormulaireRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [TemplateFormulaireRbsmrDialogComponent],
                providers: [
                    TemplateFormulaireRbsmrService
                ]
            })
            .overrideTemplate(TemplateFormulaireRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateFormulaireRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateFormulaireRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TemplateFormulaireRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.templateFormulaire = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'templateFormulaireListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TemplateFormulaireRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.templateFormulaire = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'templateFormulaireListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
