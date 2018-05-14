package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.PatientRemoveAuditService;
import ma.rbsmr.jhipster.domain.PatientRemoveAudit;
import ma.rbsmr.jhipster.repository.PatientRemoveAuditRepository;
import ma.rbsmr.jhipster.service.dto.PatientRemoveAuditDTO;
import ma.rbsmr.jhipster.service.mapper.PatientRemoveAuditMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PatientRemoveAudit.
 */
@Service
@Transactional
public class PatientRemoveAuditServiceImpl implements PatientRemoveAuditService {

    private final Logger log = LoggerFactory.getLogger(PatientRemoveAuditServiceImpl.class);

    private final PatientRemoveAuditRepository patientRemoveAuditRepository;

    private final PatientRemoveAuditMapper patientRemoveAuditMapper;

    public PatientRemoveAuditServiceImpl(PatientRemoveAuditRepository patientRemoveAuditRepository, PatientRemoveAuditMapper patientRemoveAuditMapper) {
        this.patientRemoveAuditRepository = patientRemoveAuditRepository;
        this.patientRemoveAuditMapper = patientRemoveAuditMapper;
    }

    /**
     * Save a patientRemoveAudit.
     *
     * @param patientRemoveAuditDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PatientRemoveAuditDTO save(PatientRemoveAuditDTO patientRemoveAuditDTO) {
        log.debug("Request to save PatientRemoveAudit : {}", patientRemoveAuditDTO);
        PatientRemoveAudit patientRemoveAudit = patientRemoveAuditMapper.toEntity(patientRemoveAuditDTO);
        patientRemoveAudit = patientRemoveAuditRepository.save(patientRemoveAudit);
        return patientRemoveAuditMapper.toDto(patientRemoveAudit);
    }

    /**
     * Get all the patientRemoveAudits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PatientRemoveAuditDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PatientRemoveAudits");
        return patientRemoveAuditRepository.findAll(pageable)
            .map(patientRemoveAuditMapper::toDto);
    }

    /**
     * Get one patientRemoveAudit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PatientRemoveAuditDTO findOne(Long id) {
        log.debug("Request to get PatientRemoveAudit : {}", id);
        PatientRemoveAudit patientRemoveAudit = patientRemoveAuditRepository.findOne(id);
        return patientRemoveAuditMapper.toDto(patientRemoveAudit);
    }

    /**
     * Delete the patientRemoveAudit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PatientRemoveAudit : {}", id);
        patientRemoveAuditRepository.delete(id);
    }
}
