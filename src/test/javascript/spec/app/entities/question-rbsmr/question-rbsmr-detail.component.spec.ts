/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { QuestionRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr-detail.component';
import { QuestionRbsmrService } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.service';
import { QuestionRbsmr } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.model';

describe('Component Tests', () => {

    describe('QuestionRbsmr Management Detail Component', () => {
        let comp: QuestionRbsmrDetailComponent;
        let fixture: ComponentFixture<QuestionRbsmrDetailComponent>;
        let service: QuestionRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [QuestionRbsmrDetailComponent],
                providers: [
                    QuestionRbsmrService
                ]
            })
            .overrideTemplate(QuestionRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new QuestionRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.question).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
