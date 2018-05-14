/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { VisiteRbsmrComponent } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr.component';
import { VisiteRbsmrService } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr.service';
import { VisiteRbsmr } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr.model';

describe('Component Tests', () => {

    describe('VisiteRbsmr Management Component', () => {
        let comp: VisiteRbsmrComponent;
        let fixture: ComponentFixture<VisiteRbsmrComponent>;
        let service: VisiteRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [VisiteRbsmrComponent],
                providers: [
                    VisiteRbsmrService
                ]
            })
            .overrideTemplate(VisiteRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VisiteRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VisiteRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.visites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
