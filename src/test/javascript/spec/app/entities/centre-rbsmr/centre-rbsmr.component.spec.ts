/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { CentreRbsmrComponent } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr.component';
import { CentreRbsmrService } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr.service';
import { CentreRbsmr } from '../../../../../../main/webapp/app/entities/centre-rbsmr/centre-rbsmr.model';

describe('Component Tests', () => {

    describe('CentreRbsmr Management Component', () => {
        let comp: CentreRbsmrComponent;
        let fixture: ComponentFixture<CentreRbsmrComponent>;
        let service: CentreRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [CentreRbsmrComponent],
                providers: [
                    CentreRbsmrService
                ]
            })
            .overrideTemplate(CentreRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CentreRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CentreRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CentreRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.centres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
