package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.QuestionValidationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing QuestionValidation.
 */
public interface QuestionValidationService {

    /**
     * Save a questionValidation.
     *
     * @param questionValidationDTO the entity to save
     * @return the persisted entity
     */
    QuestionValidationDTO save(QuestionValidationDTO questionValidationDTO);

    /**
     * Get all the questionValidations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<QuestionValidationDTO> findAll(Pageable pageable);

    /**
     * Get the "id" questionValidation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    QuestionValidationDTO findOne(Long id);

    /**
     * Delete the "id" questionValidation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
