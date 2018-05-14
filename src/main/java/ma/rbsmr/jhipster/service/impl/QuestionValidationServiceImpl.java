package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.QuestionValidationService;
import ma.rbsmr.jhipster.domain.QuestionValidation;
import ma.rbsmr.jhipster.repository.QuestionValidationRepository;
import ma.rbsmr.jhipster.service.dto.QuestionValidationDTO;
import ma.rbsmr.jhipster.service.mapper.QuestionValidationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing QuestionValidation.
 */
@Service
@Transactional
public class QuestionValidationServiceImpl implements QuestionValidationService {

    private final Logger log = LoggerFactory.getLogger(QuestionValidationServiceImpl.class);

    private final QuestionValidationRepository questionValidationRepository;

    private final QuestionValidationMapper questionValidationMapper;

    public QuestionValidationServiceImpl(QuestionValidationRepository questionValidationRepository, QuestionValidationMapper questionValidationMapper) {
        this.questionValidationRepository = questionValidationRepository;
        this.questionValidationMapper = questionValidationMapper;
    }

    /**
     * Save a questionValidation.
     *
     * @param questionValidationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public QuestionValidationDTO save(QuestionValidationDTO questionValidationDTO) {
        log.debug("Request to save QuestionValidation : {}", questionValidationDTO);
        QuestionValidation questionValidation = questionValidationMapper.toEntity(questionValidationDTO);
        questionValidation = questionValidationRepository.save(questionValidation);
        return questionValidationMapper.toDto(questionValidation);
    }

    /**
     * Get all the questionValidations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<QuestionValidationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all QuestionValidations");
        return questionValidationRepository.findAll(pageable)
            .map(questionValidationMapper::toDto);
    }

    /**
     * Get one questionValidation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public QuestionValidationDTO findOne(Long id) {
        log.debug("Request to get QuestionValidation : {}", id);
        QuestionValidation questionValidation = questionValidationRepository.findOne(id);
        return questionValidationMapper.toDto(questionValidation);
    }

    /**
     * Delete the questionValidation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuestionValidation : {}", id);
        questionValidationRepository.delete(id);
    }
}
