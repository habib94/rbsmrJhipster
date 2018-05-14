/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { CentreRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr-detail.component';
import { CentreRbsmrService } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr.service';
import { CentreRbsmr } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr.model';

describe('Component Tests', () => {

    describe('CentreRbsmr Management Detail Component', () => {
        let comp: CentreRbsmrDetailComponent;
        let fixture: ComponentFixture<CentreRbsmrDetailComponent>;
        let service: CentreRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [CentreRbsmrDetailComponent],
                providers: [
                    CentreRbsmrService
                ]
            })
            .overrideTemplate(CentreRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CentreRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CentreRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CentreRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.centre).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
