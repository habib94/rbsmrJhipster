package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.ReponseNewAuditDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ReponseNewAudit.
 */
public interface ReponseNewAuditService {

    /**
     * Save a reponseNewAudit.
     *
     * @param reponseNewAuditDTO the entity to save
     * @return the persisted entity
     */
    ReponseNewAuditDTO save(ReponseNewAuditDTO reponseNewAuditDTO);

    /**
     * Get all the reponseNewAudits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ReponseNewAuditDTO> findAll(Pageable pageable);

    /**
     * Get the "id" reponseNewAudit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ReponseNewAuditDTO findOne(Long id);

    /**
     * Delete the "id" reponseNewAudit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
