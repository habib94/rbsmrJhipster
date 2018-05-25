package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.FormulaireService;
import ma.rbsmr.jhipster.service.dto.FormulaireCompletDTO;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.FormulaireDTO;
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
 * REST controller for managing Formulaire.
 */
@RestController
@RequestMapping("/api")
public class FormulaireResource {

    private final Logger log = LoggerFactory.getLogger(FormulaireResource.class);

    private static final String ENTITY_NAME = "formulaire";

    private final FormulaireService formulaireService;

    public FormulaireResource(FormulaireService formulaireService) {
        this.formulaireService = formulaireService;
    }

    /**
     * POST  /formulaires : Create a new formulaire.
     *
     * @param formulaireDTO the formulaireDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formulaireDTO, or with status 400 (Bad Request) if the formulaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formulaires")
    @Timed
    public ResponseEntity<FormulaireDTO> createFormulaire(@RequestBody FormulaireDTO formulaireDTO) throws URISyntaxException {
        log.debug("REST request to save Formulaire : {}", formulaireDTO);
        if (formulaireDTO.getId() != null) {
            throw new BadRequestAlertException("A new formulaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormulaireDTO result = formulaireService.save(formulaireDTO);
        return ResponseEntity.created(new URI("/api/formulaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formulaires : Updates an existing formulaire.
     *
     * @param formulaireDTO the formulaireDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formulaireDTO,
     * or with status 400 (Bad Request) if the formulaireDTO is not valid,
     * or with status 500 (Internal Server Error) if the formulaireDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formulaires")
    @Timed
    public ResponseEntity<FormulaireDTO> updateFormulaire(@RequestBody FormulaireDTO formulaireDTO) throws URISyntaxException {
        log.debug("REST request to update Formulaire : {}", formulaireDTO);
        if (formulaireDTO.getId() == null) {
            return createFormulaire(formulaireDTO);
        }
        FormulaireDTO result = formulaireService.save(formulaireDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formulaireDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formulaires : get all the formulaires.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of formulaires in body
     */
    @GetMapping("/formulaires")
    @Timed
    public ResponseEntity<List<FormulaireDTO>> getAllFormulaires(Pageable pageable) {
        log.debug("REST request to get a page of Formulaires");
        Page<FormulaireDTO> page = formulaireService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/formulaires");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /formulaires/:id : get the "id" formulaire.
     *
     * @param code the id of the formulaireDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formulaireDTO, or with status 404 (Not Found)
     */
    @GetMapping("/formulaires/{code}")
    @Timed
    public ResponseEntity<FormulaireCompletDTO> getFormulaire(@PathVariable String code) {
        log.debug("REST request to get Formulaire : {}", code);
        FormulaireCompletDTO formulaireDTO = formulaireService.findOneByCode(code);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formulaireDTO));
    }

    /**
     * DELETE  /formulaires/:id : delete the "id" formulaire.
     *
     * @param id the id of the formulaireDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formulaires/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormulaire(@PathVariable Long id) {
        log.debug("REST request to delete Formulaire : {}", id);
        formulaireService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
