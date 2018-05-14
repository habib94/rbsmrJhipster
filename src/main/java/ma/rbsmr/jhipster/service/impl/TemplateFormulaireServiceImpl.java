package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.TemplateFormulaireService;
import ma.rbsmr.jhipster.domain.TemplateFormulaire;
import ma.rbsmr.jhipster.repository.TemplateFormulaireRepository;
import ma.rbsmr.jhipster.service.dto.TemplateFormulaireDTO;
import ma.rbsmr.jhipster.service.mapper.TemplateFormulaireMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing TemplateFormulaire.
 */
@Service
@Transactional
public class TemplateFormulaireServiceImpl implements TemplateFormulaireService {

    private final Logger log = LoggerFactory.getLogger(TemplateFormulaireServiceImpl.class);

    private final TemplateFormulaireRepository templateFormulaireRepository;

    private final TemplateFormulaireMapper templateFormulaireMapper;

    public TemplateFormulaireServiceImpl(TemplateFormulaireRepository templateFormulaireRepository, TemplateFormulaireMapper templateFormulaireMapper) {
        this.templateFormulaireRepository = templateFormulaireRepository;
        this.templateFormulaireMapper = templateFormulaireMapper;
    }

    /**
     * Save a templateFormulaire.
     *
     * @param templateFormulaireDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TemplateFormulaireDTO save(TemplateFormulaireDTO templateFormulaireDTO) {
        log.debug("Request to save TemplateFormulaire : {}", templateFormulaireDTO);
        TemplateFormulaire templateFormulaire = templateFormulaireMapper.toEntity(templateFormulaireDTO);
        templateFormulaire = templateFormulaireRepository.save(templateFormulaire);
        return templateFormulaireMapper.toDto(templateFormulaire);
    }

    /**
     * Get all the templateFormulaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TemplateFormulaireDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TemplateFormulaires");
        return templateFormulaireRepository.findAll(pageable)
            .map(templateFormulaireMapper::toDto);
    }

    /**
     * Get one templateFormulaire by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TemplateFormulaireDTO findOne(Long id) {
        log.debug("Request to get TemplateFormulaire : {}", id);
        TemplateFormulaire templateFormulaire = templateFormulaireRepository.findOne(id);
        return templateFormulaireMapper.toDto(templateFormulaire);
    }

    /**
     * Delete the templateFormulaire by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TemplateFormulaire : {}", id);
        templateFormulaireRepository.delete(id);
    }
}
