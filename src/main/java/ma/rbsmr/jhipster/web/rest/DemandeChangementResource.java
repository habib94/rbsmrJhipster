package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.DemandeChangementService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.DemandeChangementDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DemandeChangement.
 */
@RestController
@RequestMapping("/api")
public class DemandeChangementResource {

    private final Logger log = LoggerFactory.getLogger(DemandeChangementResource.class);

    private static final String ENTITY_NAME = "demandeChangement";

    private final DemandeChangementService demandeChangementService;

    public DemandeChangementResource(DemandeChangementService demandeChangementService) {
        this.demandeChangementService = demandeChangementService;
    }

    /**
     * POST  /demande-changements : Create a new demandeChangement.
     *
     * @param demandeChangementDTO the demandeChangementDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demandeChangementDTO, or with status 400 (Bad Request) if the demandeChangement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demande-changements")
    @Timed
    public ResponseEntity<DemandeChangementDTO> createDemandeChangement(@Valid @RequestBody DemandeChangementDTO demandeChangementDTO) throws URISyntaxException {
        log.debug("REST request to save DemandeChangement : {}", demandeChangementDTO);
        if (demandeChangementDTO.getId() != null) {
            throw new BadRequestAlertException("A new demandeChangement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemandeChangementDTO result = demandeChangementService.save(demandeChangementDTO);
        return ResponseEntity.created(new URI("/api/demande-changements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demande-changements : Updates an existing demandeChangement.
     *
     * @param demandeChangementDTO the demandeChangementDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demandeChangementDTO,
     * or with status 400 (Bad Request) if the demandeChangementDTO is not valid,
     * or with status 500 (Internal Server Error) if the demandeChangementDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demande-changements")
    @Timed
    public ResponseEntity<DemandeChangementDTO> updateDemandeChangement(@Valid @RequestBody DemandeChangementDTO demandeChangementDTO) throws URISyntaxException {
        log.debug("REST request to update DemandeChangement : {}", demandeChangementDTO);
        if (demandeChangementDTO.getId() == null) {
            return createDemandeChangement(demandeChangementDTO);
        }
        DemandeChangementDTO result = demandeChangementService.save(demandeChangementDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demandeChangementDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demande-changements : get all the demandeChangements.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of demandeChangements in body
     */
    @GetMapping("/demande-changements")
    @Timed
    public ResponseEntity<List<DemandeChangementDTO>> getAllDemandeChangements(Pageable pageable) {
        log.debug("REST request to get a page of DemandeChangements");
        Page<DemandeChangementDTO> page = demandeChangementService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/demande-changements");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /demande-changements/:id : get the "id" demandeChangement.
     *
     * @param id the id of the demandeChangementDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demandeChangementDTO, or with status 404 (Not Found)
     */
    @GetMapping("/demande-changements/{id}")
    @Timed
    public ResponseEntity<DemandeChangementDTO> getDemandeChangement(@PathVariable Long id) {
        log.debug("REST request to get DemandeChangement : {}", id);
        DemandeChangementDTO demandeChangementDTO = demandeChangementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demandeChangementDTO));
    }

    /**
     * DELETE  /demande-changements/:id : delete the "id" demandeChangement.
     *
     * @param id the id of the demandeChangementDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demande-changements/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemandeChangement(@PathVariable Long id) {
        log.debug("REST request to delete DemandeChangement : {}", id);
        demandeChangementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
