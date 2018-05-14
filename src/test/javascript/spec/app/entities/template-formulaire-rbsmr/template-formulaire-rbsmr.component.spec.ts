/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { TemplateFormulaireRbsmrComponent } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.component';
import { TemplateFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.service';
import { TemplateFormulaireRbsmr } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr/template-formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('TemplateFormulaireRbsmr Management Component', () => {
        let comp: TemplateFormulaireRbsmrComponent;
        let fixture: ComponentFixture<TemplateFormulaireRbsmrComponent>;
        let service: TemplateFormulaireRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [TemplateFormulaireRbsmrComponent],
                providers: [
                    TemplateFormulaireRbsmrService
                ]
            })
            .overrideTemplate(TemplateFormulaireRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateFormulaireRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateFormulaireRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TemplateFormulaireRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.templateFormulaires[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
