package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.TemplateFormulaireService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.TemplateFormulaireDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TemplateFormulaire.
 */
@RestController
@RequestMapping("/api")
public class TemplateFormulaireResource {

    private final Logger log = LoggerFactory.getLogger(TemplateFormulaireResource.class);

    private static final String ENTITY_NAME = "templateFormulaire";

    private final TemplateFormulaireService templateFormulaireService;

    public TemplateFormulaireResource(TemplateFormulaireService templateFormulaireService) {
        this.templateFormulaireService = templateFormulaireService;
    }

    /**
     * POST  /template-formulaires : Create a new templateFormulaire.
     *
     * @param templateFormulaireDTO the templateFormulaireDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new templateFormulaireDTO, or with status 400 (Bad Request) if the templateFormulaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/template-formulaires")
    @Timed
    public ResponseEntity<TemplateFormulaireDTO> createTemplateFormulaire(@RequestBody TemplateFormulaireDTO templateFormulaireDTO) throws URISyntaxException {
        log.debug("REST request to save TemplateFormulaire : {}", templateFormulaireDTO);
        if (templateFormulaireDTO.getId() != null) {
            throw new BadRequestAlertException("A new templateFormulaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TemplateFormulaireDTO result = templateFormulaireService.save(templateFormulaireDTO);
        return ResponseEntity.created(new URI("/api/template-formulaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /template-formulaires : Updates an existing templateFormulaire.
     *
     * @param templateFormulaireDTO the templateFormulaireDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated templateFormulaireDTO,
     * or with status 400 (Bad Request) if the templateFormulaireDTO is not valid,
     * or with status 500 (Internal Server Error) if the templateFormulaireDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/template-formulaires")
    @Timed
    public ResponseEntity<TemplateFormulaireDTO> updateTemplateFormulaire(@RequestBody TemplateFormulaireDTO templateFormulaireDTO) throws URISyntaxException {
        log.debug("REST request to update TemplateFormulaire : {}", templateFormulaireDTO);
        if (templateFormulaireDTO.getId() == null) {
            return createTemplateFormulaire(templateFormulaireDTO);
        }
        TemplateFormulaireDTO result = templateFormulaireService.save(templateFormulaireDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, templateFormulaireDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /template-formulaires : get all the templateFormulaires.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of templateFormulaires in body
     */
    @GetMapping("/template-formulaires")
    @Timed
    public ResponseEntity<List<TemplateFormulaireDTO>> getAllTemplateFormulaires(Pageable pageable) {
        log.debug("REST request to get a page of TemplateFormulaires");
        Page<TemplateFormulaireDTO> page = templateFormulaireService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/template-formulaires");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /template-formulaires/:id : get the "id" templateFormulaire.
     *
     * @param id the id of the templateFormulaireDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the templateFormulaireDTO, or with status 404 (Not Found)
     */
    @GetMapping("/template-formulaires/{id}")
    @Timed
    public ResponseEntity<TemplateFormulaireDTO> getTemplateFormulaire(@PathVariable Long id) {
        log.debug("REST request to get TemplateFormulaire : {}", id);
        TemplateFormulaireDTO templateFormulaireDTO = templateFormulaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(templateFormulaireDTO));
    }

    /**
     * DELETE  /template-formulaires/:id : delete the "id" templateFormulaire.
     *
     * @param id the id of the templateFormulaireDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/template-formulaires/{id}")
    @Timed
    public ResponseEntity<Void> deleteTemplateFormulaire(@PathVariable Long id) {
        log.debug("REST request to delete TemplateFormulaire : {}", id);
        templateFormulaireService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
