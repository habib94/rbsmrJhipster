package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.ReponseService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.ReponseDTO;
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
 * REST controller for managing Reponse.
 */
@RestController
@RequestMapping("/api")
public class ReponseResource {

    private final Logger log = LoggerFactory.getLogger(ReponseResource.class);

    private static final String ENTITY_NAME = "reponse";

    private final ReponseService reponseService;

    public ReponseResource(ReponseService reponseService) {
        this.reponseService = reponseService;
    }

    /**
     * POST  /reponses : Create a new reponse.
     *
     * @param reponseDTO the reponseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reponseDTO, or with status 400 (Bad Request) if the reponse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reponses")
    @Timed
    public ResponseEntity<ReponseDTO> createReponse(@Valid @RequestBody ReponseDTO reponseDTO) throws URISyntaxException {
        log.debug("REST request to save Reponse : {}", reponseDTO);
        if (reponseDTO.getId() != null) {
            throw new BadRequestAlertException("A new reponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReponseDTO result = reponseService.save(reponseDTO);
        return ResponseEntity.created(new URI("/api/reponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reponses : Updates an existing reponse.
     *
     * @param reponseDTO the reponseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reponseDTO,
     * or with status 400 (Bad Request) if the reponseDTO is not valid,
     * or with status 500 (Internal Server Error) if the reponseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reponses")
    @Timed
    public ResponseEntity<ReponseDTO> updateReponse(@Valid @RequestBody ReponseDTO reponseDTO) throws URISyntaxException {
        log.debug("REST request to update Reponse : {}", reponseDTO);
        if (reponseDTO.getId() == null) {
            return createReponse(reponseDTO);
        }
        ReponseDTO result = reponseService.save(reponseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reponseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reponses : get all the reponses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of reponses in body
     */
    @GetMapping("/reponses")
    @Timed
    public ResponseEntity<List<ReponseDTO>> getAllReponses(Pageable pageable) {
        log.debug("REST request to get a page of Reponses");
        Page<ReponseDTO> page = reponseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/reponses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /reponses/:id : get the "id" reponse.
     *
     * @param id the id of the reponseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reponseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/reponses/{id}")
    @Timed
    public ResponseEntity<ReponseDTO> getReponse(@PathVariable Long id) {
        log.debug("REST request to get Reponse : {}", id);
        ReponseDTO reponseDTO = reponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reponseDTO));
    }

    /**
     * DELETE  /reponses/:id : delete the "id" reponse.
     *
     * @param id the id of the reponseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reponses/{id}")
    @Timed
    public ResponseEntity<Void> deleteReponse(@PathVariable Long id) {
        log.debug("REST request to delete Reponse : {}", id);
        reponseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
