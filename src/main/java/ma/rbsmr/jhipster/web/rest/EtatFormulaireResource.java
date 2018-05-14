package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.EtatFormulaireService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.EtatFormulaireDTO;
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
 * REST controller for managing EtatFormulaire.
 */
@RestController
@RequestMapping("/api")
public class EtatFormulaireResource {

    private final Logger log = LoggerFactory.getLogger(EtatFormulaireResource.class);

    private static final String ENTITY_NAME = "etatFormulaire";

    private final EtatFormulaireService etatFormulaireService;

    public EtatFormulaireResource(EtatFormulaireService etatFormulaireService) {
        this.etatFormulaireService = etatFormulaireService;
    }

    /**
     * POST  /etat-formulaires : Create a new etatFormulaire.
     *
     * @param etatFormulaireDTO the etatFormulaireDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new etatFormulaireDTO, or with status 400 (Bad Request) if the etatFormulaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/etat-formulaires")
    @Timed
    public ResponseEntity<EtatFormulaireDTO> createEtatFormulaire(@RequestBody EtatFormulaireDTO etatFormulaireDTO) throws URISyntaxException {
        log.debug("REST request to save EtatFormulaire : {}", etatFormulaireDTO);
        if (etatFormulaireDTO.getId() != null) {
            throw new BadRequestAlertException("A new etatFormulaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EtatFormulaireDTO result = etatFormulaireService.save(etatFormulaireDTO);
        return ResponseEntity.created(new URI("/api/etat-formulaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /etat-formulaires : Updates an existing etatFormulaire.
     *
     * @param etatFormulaireDTO the etatFormulaireDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated etatFormulaireDTO,
     * or with status 400 (Bad Request) if the etatFormulaireDTO is not valid,
     * or with status 500 (Internal Server Error) if the etatFormulaireDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/etat-formulaires")
    @Timed
    public ResponseEntity<EtatFormulaireDTO> updateEtatFormulaire(@RequestBody EtatFormulaireDTO etatFormulaireDTO) throws URISyntaxException {
        log.debug("REST request to update EtatFormulaire : {}", etatFormulaireDTO);
        if (etatFormulaireDTO.getId() == null) {
            return createEtatFormulaire(etatFormulaireDTO);
        }
        EtatFormulaireDTO result = etatFormulaireService.save(etatFormulaireDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, etatFormulaireDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /etat-formulaires : get all the etatFormulaires.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of etatFormulaires in body
     */
    @GetMapping("/etat-formulaires")
    @Timed
    public ResponseEntity<List<EtatFormulaireDTO>> getAllEtatFormulaires(Pageable pageable) {
        log.debug("REST request to get a page of EtatFormulaires");
        Page<EtatFormulaireDTO> page = etatFormulaireService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/etat-formulaires");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /etat-formulaires/:id : get the "id" etatFormulaire.
     *
     * @param id the id of the etatFormulaireDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the etatFormulaireDTO, or with status 404 (Not Found)
     */
    @GetMapping("/etat-formulaires/{id}")
    @Timed
    public ResponseEntity<EtatFormulaireDTO> getEtatFormulaire(@PathVariable Long id) {
        log.debug("REST request to get EtatFormulaire : {}", id);
        EtatFormulaireDTO etatFormulaireDTO = etatFormulaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(etatFormulaireDTO));
    }

    /**
     * DELETE  /etat-formulaires/:id : delete the "id" etatFormulaire.
     *
     * @param id the id of the etatFormulaireDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/etat-formulaires/{id}")
    @Timed
    public ResponseEntity<Void> deleteEtatFormulaire(@PathVariable Long id) {
        log.debug("REST request to delete EtatFormulaire : {}", id);
        etatFormulaireService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
