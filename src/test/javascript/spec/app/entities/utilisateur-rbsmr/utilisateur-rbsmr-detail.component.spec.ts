/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { UtilisateurRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr-detail.component';
import { UtilisateurRbsmrService } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.service';
import { UtilisateurRbsmr } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.model';

describe('Component Tests', () => {

    describe('UtilisateurRbsmr Management Detail Component', () => {
        let comp: UtilisateurRbsmrDetailComponent;
        let fixture: ComponentFixture<UtilisateurRbsmrDetailComponent>;
        let service: UtilisateurRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [UtilisateurRbsmrDetailComponent],
                providers: [
                    UtilisateurRbsmrService
                ]
            })
            .overrideTemplate(UtilisateurRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UtilisateurRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.utilisateur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
