/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { TemplateFormulaireRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr-detail.component';
import { TemplateFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.service';
import { TemplateFormulaireRbsmr } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('TemplateFormulaireRbsmr Management Detail Component', () => {
        let comp: TemplateFormulaireRbsmrDetailComponent;
        let fixture: ComponentFixture<TemplateFormulaireRbsmrDetailComponent>;
        let service: TemplateFormulaireRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [TemplateFormulaireRbsmrDetailComponent],
                providers: [
                    TemplateFormulaireRbsmrService
                ]
            })
            .overrideTemplate(TemplateFormulaireRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateFormulaireRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateFormulaireRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TemplateFormulaireRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.templateFormulaire).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
