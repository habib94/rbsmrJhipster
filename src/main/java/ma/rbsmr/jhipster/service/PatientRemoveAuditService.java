package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.PatientRemoveAuditDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PatientRemoveAudit.
 */
public interface PatientRemoveAuditService {

    /**
     * Save a patientRemoveAudit.
     *
     * @param patientRemoveAuditDTO the entity to save
     * @return the persisted entity
     */
    PatientRemoveAuditDTO save(PatientRemoveAuditDTO patientRemoveAuditDTO);

    /**
     * Get all the patientRemoveAudits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PatientRemoveAuditDTO> findAll(Pageable pageable);

    /**
     * Get the "id" patientRemoveAudit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PatientRemoveAuditDTO findOne(Long id);

    /**
     * Delete the "id" patientRemoveAudit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
