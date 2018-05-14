package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.FormulaireService;
import ma.rbsmr.jhipster.domain.Formulaire;
import ma.rbsmr.jhipster.repository.FormulaireRepository;
import ma.rbsmr.jhipster.service.dto.FormulaireDTO;
import ma.rbsmr.jhipster.service.mapper.FormulaireMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Formulaire.
 */
@Service
@Transactional
public class FormulaireServiceImpl implements FormulaireService {

    private final Logger log = LoggerFactory.getLogger(FormulaireServiceImpl.class);

    private final FormulaireRepository formulaireRepository;

    private final FormulaireMapper formulaireMapper;

    public FormulaireServiceImpl(FormulaireRepository formulaireRepository, FormulaireMapper formulaireMapper) {
        this.formulaireRepository = formulaireRepository;
        this.formulaireMapper = formulaireMapper;
    }

    /**
     * Save a formulaire.
     *
     * @param formulaireDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FormulaireDTO save(FormulaireDTO formulaireDTO) {
        log.debug("Request to save Formulaire : {}", formulaireDTO);
        Formulaire formulaire = formulaireMapper.toEntity(formulaireDTO);
        formulaire = formulaireRepository.save(formulaire);
        return formulaireMapper.toDto(formulaire);
    }

    /**
     * Get all the formulaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FormulaireDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Formulaires");
        return formulaireRepository.findAll(pageable)
            .map(formulaireMapper::toDto);
    }

    /**
     * Get one formulaire by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FormulaireDTO findOne(Long id) {
        log.debug("Request to get Formulaire : {}", id);
        Formulaire formulaire = formulaireRepository.findOne(id);
        return formulaireMapper.toDto(formulaire);
    }

    /**
     * Delete the formulaire by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formulaire : {}", id);
        formulaireRepository.delete(id);
    }
}
