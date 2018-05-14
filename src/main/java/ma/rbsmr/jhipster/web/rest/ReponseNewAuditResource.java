package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.ReponseNewAuditService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.ReponseNewAuditDTO;
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
 * REST controller for managing ReponseNewAudit.
 */
@RestController
@RequestMapping("/api")
public class ReponseNewAuditResource {

    private final Logger log = LoggerFactory.getLogger(ReponseNewAuditResource.class);

    private static final String ENTITY_NAME = "reponseNewAudit";

    private final ReponseNewAuditService reponseNewAuditService;

    public ReponseNewAuditResource(ReponseNewAuditService reponseNewAuditService) {
        this.reponseNewAuditService = reponseNewAuditService;
    }

    /**
     * POST  /reponse-new-audits : Create a new reponseNewAudit.
     *
     * @param reponseNewAuditDTO the reponseNewAuditDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reponseNewAuditDTO, or with status 400 (Bad Request) if the reponseNewAudit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reponse-new-audits")
    @Timed
    public ResponseEntity<ReponseNewAuditDTO> createReponseNewAudit(@Valid @RequestBody ReponseNewAuditDTO reponseNewAuditDTO) throws URISyntaxException {
        log.debug("REST request to save ReponseNewAudit : {}", reponseNewAuditDTO);
        if (reponseNewAuditDTO.getId() != null) {
            throw new BadRequestAlertException("A new reponseNewAudit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReponseNewAuditDTO result = reponseNewAuditService.save(reponseNewAuditDTO);
        return ResponseEntity.created(new URI("/api/reponse-new-audits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reponse-new-audits : Updates an existing reponseNewAudit.
     *
     * @param reponseNewAuditDTO the reponseNewAuditDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reponseNewAuditDTO,
     * or with status 400 (Bad Request) if the reponseNewAuditDTO is not valid,
     * or with status 500 (Internal Server Error) if the reponseNewAuditDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reponse-new-audits")
    @Timed
    public ResponseEntity<ReponseNewAuditDTO> updateReponseNewAudit(@Valid @RequestBody ReponseNewAuditDTO reponseNewAuditDTO) throws URISyntaxException {
        log.debug("REST request to update ReponseNewAudit : {}", reponseNewAuditDTO);
        if (reponseNewAuditDTO.getId() == null) {
            return createReponseNewAudit(reponseNewAuditDTO);
        }
        ReponseNewAuditDTO result = reponseNewAuditService.save(reponseNewAuditDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reponseNewAuditDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reponse-new-audits : get all the reponseNewAudits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of reponseNewAudits in body
     */
    @GetMapping("/reponse-new-audits")
    @Timed
    public ResponseEntity<List<ReponseNewAuditDTO>> getAllReponseNewAudits(Pageable pageable) {
        log.debug("REST request to get a page of ReponseNewAudits");
        Page<ReponseNewAuditDTO> page = reponseNewAuditService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/reponse-new-audits");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /reponse-new-audits/:id : get the "id" reponseNewAudit.
     *
     * @param id the id of the reponseNewAuditDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reponseNewAuditDTO, or with status 404 (Not Found)
     */
    @GetMapping("/reponse-new-audits/{id}")
    @Timed
    public ResponseEntity<ReponseNewAuditDTO> getReponseNewAudit(@PathVariable Long id) {
        log.debug("REST request to get ReponseNewAudit : {}", id);
        ReponseNewAuditDTO reponseNewAuditDTO = reponseNewAuditService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reponseNewAuditDTO));
    }

    /**
     * DELETE  /reponse-new-audits/:id : delete the "id" reponseNewAudit.
     *
     * @param id the id of the reponseNewAuditDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reponse-new-audits/{id}")
    @Timed
    public ResponseEntity<Void> deleteReponseNewAudit(@PathVariable Long id) {
        log.debug("REST request to delete ReponseNewAudit : {}", id);
        reponseNewAuditService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
