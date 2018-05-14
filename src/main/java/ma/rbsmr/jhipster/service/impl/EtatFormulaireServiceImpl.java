package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.EtatFormulaireService;
import ma.rbsmr.jhipster.domain.EtatFormulaire;
import ma.rbsmr.jhipster.repository.EtatFormulaireRepository;
import ma.rbsmr.jhipster.service.dto.EtatFormulaireDTO;
import ma.rbsmr.jhipster.service.mapper.EtatFormulaireMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing EtatFormulaire.
 */
@Service
@Transactional
public class EtatFormulaireServiceImpl implements EtatFormulaireService {

    private final Logger log = LoggerFactory.getLogger(EtatFormulaireServiceImpl.class);

    private final EtatFormulaireRepository etatFormulaireRepository;

    private final EtatFormulaireMapper etatFormulaireMapper;

    public EtatFormulaireServiceImpl(EtatFormulaireRepository etatFormulaireRepository, EtatFormulaireMapper etatFormulaireMapper) {
        this.etatFormulaireRepository = etatFormulaireRepository;
        this.etatFormulaireMapper = etatFormulaireMapper;
    }

    /**
     * Save a etatFormulaire.
     *
     * @param etatFormulaireDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EtatFormulaireDTO save(EtatFormulaireDTO etatFormulaireDTO) {
        log.debug("Request to save EtatFormulaire : {}", etatFormulaireDTO);
        EtatFormulaire etatFormulaire = etatFormulaireMapper.toEntity(etatFormulaireDTO);
        etatFormulaire = etatFormulaireRepository.save(etatFormulaire);
        return etatFormulaireMapper.toDto(etatFormulaire);
    }

    /**
     * Get all the etatFormulaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EtatFormulaireDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EtatFormulaires");
        return etatFormulaireRepository.findAll(pageable)
            .map(etatFormulaireMapper::toDto);
    }

    /**
     * Get one etatFormulaire by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EtatFormulaireDTO findOne(Long id) {
        log.debug("Request to get EtatFormulaire : {}", id);
        EtatFormulaire etatFormulaire = etatFormulaireRepository.findOne(id);
        return etatFormulaireMapper.toDto(etatFormulaire);
    }

    /**
     * Delete the etatFormulaire by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EtatFormulaire : {}", id);
        etatFormulaireRepository.delete(id);
    }
}
