package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.PatientRemoveAuditService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.PatientRemoveAuditDTO;
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
 * REST controller for managing PatientRemoveAudit.
 */
@RestController
@RequestMapping("/api")
public class PatientRemoveAuditResource {

    private final Logger log = LoggerFactory.getLogger(PatientRemoveAuditResource.class);

    private static final String ENTITY_NAME = "patientRemoveAudit";

    private final PatientRemoveAuditService patientRemoveAuditService;

    public PatientRemoveAuditResource(PatientRemoveAuditService patientRemoveAuditService) {
        this.patientRemoveAuditService = patientRemoveAuditService;
    }

    /**
     * POST  /patient-remove-audits : Create a new patientRemoveAudit.
     *
     * @param patientRemoveAuditDTO the patientRemoveAuditDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new patientRemoveAuditDTO, or with status 400 (Bad Request) if the patientRemoveAudit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/patient-remove-audits")
    @Timed
    public ResponseEntity<PatientRemoveAuditDTO> createPatientRemoveAudit(@Valid @RequestBody PatientRemoveAuditDTO patientRemoveAuditDTO) throws URISyntaxException {
        log.debug("REST request to save PatientRemoveAudit : {}", patientRemoveAuditDTO);
        if (patientRemoveAuditDTO.getId() != null) {
            throw new BadRequestAlertException("A new patientRemoveAudit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PatientRemoveAuditDTO result = patientRemoveAuditService.save(patientRemoveAuditDTO);
        return ResponseEntity.created(new URI("/api/patient-remove-audits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /patient-remove-audits : Updates an existing patientRemoveAudit.
     *
     * @param patientRemoveAuditDTO the patientRemoveAuditDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated patientRemoveAuditDTO,
     * or with status 400 (Bad Request) if the patientRemoveAuditDTO is not valid,
     * or with status 500 (Internal Server Error) if the patientRemoveAuditDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/patient-remove-audits")
    @Timed
    public ResponseEntity<PatientRemoveAuditDTO> updatePatientRemoveAudit(@Valid @RequestBody PatientRemoveAuditDTO patientRemoveAuditDTO) throws URISyntaxException {
        log.debug("REST request to update PatientRemoveAudit : {}", patientRemoveAuditDTO);
        if (patientRemoveAuditDTO.getId() == null) {
            return createPatientRemoveAudit(patientRemoveAuditDTO);
        }
        PatientRemoveAuditDTO result = patientRemoveAuditService.save(patientRemoveAuditDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, patientRemoveAuditDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /patient-remove-audits : get all the patientRemoveAudits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of patientRemoveAudits in body
     */
    @GetMapping("/patient-remove-audits")
    @Timed
    public ResponseEntity<List<PatientRemoveAuditDTO>> getAllPatientRemoveAudits(Pageable pageable) {
        log.debug("REST request to get a page of PatientRemoveAudits");
        Page<PatientRemoveAuditDTO> page = patientRemoveAuditService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/patient-remove-audits");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /patient-remove-audits/:id : get the "id" patientRemoveAudit.
     *
     * @param id the id of the patientRemoveAuditDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patientRemoveAuditDTO, or with status 404 (Not Found)
     */
    @GetMapping("/patient-remove-audits/{id}")
    @Timed
    public ResponseEntity<PatientRemoveAuditDTO> getPatientRemoveAudit(@PathVariable Long id) {
        log.debug("REST request to get PatientRemoveAudit : {}", id);
        PatientRemoveAuditDTO patientRemoveAuditDTO = patientRemoveAuditService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(patientRemoveAuditDTO));
    }

    /**
     * DELETE  /patient-remove-audits/:id : delete the "id" patientRemoveAudit.
     *
     * @param id the id of the patientRemoveAuditDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/patient-remove-audits/{id}")
    @Timed
    public ResponseEntity<Void> deletePatientRemoveAudit(@PathVariable Long id) {
        log.debug("REST request to delete PatientRemoveAudit : {}", id);
        patientRemoveAuditService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
