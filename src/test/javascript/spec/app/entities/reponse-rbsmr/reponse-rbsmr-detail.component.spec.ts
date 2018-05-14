/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr-detail.component';
import { ReponseRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr.service';
import { ReponseRbsmr } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr.model';

describe('Component Tests', () => {

    describe('ReponseRbsmr Management Detail Component', () => {
        let comp: ReponseRbsmrDetailComponent;
        let fixture: ComponentFixture<ReponseRbsmrDetailComponent>;
        let service: ReponseRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseRbsmrDetailComponent],
                providers: [
                    ReponseRbsmrService
                ]
            })
            .overrideTemplate(ReponseRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReponseRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reponse).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
