/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { QuestionValidationRbsmrComponent } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr/question-validation-rbsmr.component';
import { QuestionValidationRbsmrService } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr/question-validation-rbsmr.service';
import { QuestionValidationRbsmr } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr/question-validation-rbsmr.model';

describe('Component Tests', () => {

    describe('QuestionValidationRbsmr Management Component', () => {
        let comp: QuestionValidationRbsmrComponent;
        let fixture: ComponentFixture<QuestionValidationRbsmrComponent>;
        let service: QuestionValidationRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [QuestionValidationRbsmrComponent],
                providers: [
                    QuestionValidationRbsmrService
                ]
            })
            .overrideTemplate(QuestionValidationRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionValidationRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionValidationRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new QuestionValidationRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.questionValidations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
