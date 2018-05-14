/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { QuestionValidationRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr/question-validation-rbsmr-detail.component';
import { QuestionValidationRbsmrService } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr/question-validation-rbsmr.service';
import { QuestionValidationRbsmr } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr/question-validation-rbsmr.model';

describe('Component Tests', () => {

    describe('QuestionValidationRbsmr Management Detail Component', () => {
        let comp: QuestionValidationRbsmrDetailComponent;
        let fixture: ComponentFixture<QuestionValidationRbsmrDetailComponent>;
        let service: QuestionValidationRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [QuestionValidationRbsmrDetailComponent],
                providers: [
                    QuestionValidationRbsmrService
                ]
            })
            .overrideTemplate(QuestionValidationRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionValidationRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionValidationRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new QuestionValidationRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.questionValidation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
