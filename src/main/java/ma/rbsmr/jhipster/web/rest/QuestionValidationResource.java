package ma.rbsmr.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.rbsmr.jhipster.service.QuestionValidationService;
import ma.rbsmr.jhipster.web.rest.errors.BadRequestAlertException;
import ma.rbsmr.jhipster.web.rest.util.HeaderUtil;
import ma.rbsmr.jhipster.web.rest.util.PaginationUtil;
import ma.rbsmr.jhipster.service.dto.QuestionValidationDTO;
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
 * REST controller for managing QuestionValidation.
 */
@RestController
@RequestMapping("/api")
public class QuestionValidationResource {

    private final Logger log = LoggerFactory.getLogger(QuestionValidationResource.class);

    private static final String ENTITY_NAME = "questionValidation";

    private final QuestionValidationService questionValidationService;

    public QuestionValidationResource(QuestionValidationService questionValidationService) {
        this.questionValidationService = questionValidationService;
    }

    /**
     * POST  /question-validations : Create a new questionValidation.
     *
     * @param questionValidationDTO the questionValidationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new questionValidationDTO, or with status 400 (Bad Request) if the questionValidation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/question-validations")
    @Timed
    public ResponseEntity<QuestionValidationDTO> createQuestionValidation(@RequestBody QuestionValidationDTO questionValidationDTO) throws URISyntaxException {
        log.debug("REST request to save QuestionValidation : {}", questionValidationDTO);
        if (questionValidationDTO.getId() != null) {
            throw new BadRequestAlertException("A new questionValidation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuestionValidationDTO result = questionValidationService.save(questionValidationDTO);
        return ResponseEntity.created(new URI("/api/question-validations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /question-validations : Updates an existing questionValidation.
     *
     * @param questionValidationDTO the questionValidationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated questionValidationDTO,
     * or with status 400 (Bad Request) if the questionValidationDTO is not valid,
     * or with status 500 (Internal Server Error) if the questionValidationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/question-validations")
    @Timed
    public ResponseEntity<QuestionValidationDTO> updateQuestionValidation(@RequestBody QuestionValidationDTO questionValidationDTO) throws URISyntaxException {
        log.debug("REST request to update QuestionValidation : {}", questionValidationDTO);
        if (questionValidationDTO.getId() == null) {
            return createQuestionValidation(questionValidationDTO);
        }
        QuestionValidationDTO result = questionValidationService.save(questionValidationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, questionValidationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /question-validations : get all the questionValidations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of questionValidations in body
     */
    @GetMapping("/question-validations")
    @Timed
    public ResponseEntity<List<QuestionValidationDTO>> getAllQuestionValidations(Pageable pageable) {
        log.debug("REST request to get a page of QuestionValidations");
        Page<QuestionValidationDTO> page = questionValidationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/question-validations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /question-validations/:id : get the "id" questionValidation.
     *
     * @param id the id of the questionValidationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the questionValidationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/question-validations/{id}")
    @Timed
    public ResponseEntity<QuestionValidationDTO> getQuestionValidation(@PathVariable Long id) {
        log.debug("REST request to get QuestionValidation : {}", id);
        QuestionValidationDTO questionValidationDTO = questionValidationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(questionValidationDTO));
    }

    /**
     * DELETE  /question-validations/:id : delete the "id" questionValidation.
     *
     * @param id the id of the questionValidationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/question-validations/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuestionValidation(@PathVariable Long id) {
        log.debug("REST request to delete QuestionValidation : {}", id);
        questionValidationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
