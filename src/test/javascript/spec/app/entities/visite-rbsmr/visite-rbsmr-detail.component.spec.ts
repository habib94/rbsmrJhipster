/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { VisiteRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr-detail.component';
import { VisiteRbsmrService } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr.service';
import { VisiteRbsmr } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr.model';

describe('Component Tests', () => {

    describe('VisiteRbsmr Management Detail Component', () => {
        let comp: VisiteRbsmrDetailComponent;
        let fixture: ComponentFixture<VisiteRbsmrDetailComponent>;
        let service: VisiteRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [VisiteRbsmrDetailComponent],
                providers: [
                    VisiteRbsmrService
                ]
            })
            .overrideTemplate(VisiteRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VisiteRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VisiteRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.visite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
