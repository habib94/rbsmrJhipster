/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { UtilisateurRbsmrComponent } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.component';
import { UtilisateurRbsmrService } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.service';
import { UtilisateurRbsmr } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.model';

describe('Component Tests', () => {

    describe('UtilisateurRbsmr Management Component', () => {
        let comp: UtilisateurRbsmrComponent;
        let fixture: ComponentFixture<UtilisateurRbsmrComponent>;
        let service: UtilisateurRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [UtilisateurRbsmrComponent],
                providers: [
                    UtilisateurRbsmrService
                ]
            })
            .overrideTemplate(UtilisateurRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UtilisateurRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.utilisateurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
