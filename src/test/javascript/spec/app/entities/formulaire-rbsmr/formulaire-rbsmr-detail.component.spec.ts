/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { FormulaireRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr-detail.component';
import { FormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.service';
import { FormulaireRbsmr } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('FormulaireRbsmr Management Detail Component', () => {
        let comp: FormulaireRbsmrDetailComponent;
        let fixture: ComponentFixture<FormulaireRbsmrDetailComponent>;
        let service: FormulaireRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [FormulaireRbsmrDetailComponent],
                providers: [
                    FormulaireRbsmrService
                ]
            })
            .overrideTemplate(FormulaireRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormulaireRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormulaireRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FormulaireRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.formulaire).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
