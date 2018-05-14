/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { QuestionRbsmrComponent } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.component';
import { QuestionRbsmrService } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.service';
import { QuestionRbsmr } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.model';

describe('Component Tests', () => {

    describe('QuestionRbsmr Management Component', () => {
        let comp: QuestionRbsmrComponent;
        let fixture: ComponentFixture<QuestionRbsmrComponent>;
        let service: QuestionRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [QuestionRbsmrComponent],
                providers: [
                    QuestionRbsmrService
                ]
            })
            .overrideTemplate(QuestionRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new QuestionRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.questions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
