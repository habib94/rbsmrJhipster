package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.DemandeChangementDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing DemandeChangement.
 */
public interface DemandeChangementService {

    /**
     * Save a demandeChangement.
     *
     * @param demandeChangementDTO the entity to save
     * @return the persisted entity
     */
    DemandeChangementDTO save(DemandeChangementDTO demandeChangementDTO);

    /**
     * Get all the demandeChangements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DemandeChangementDTO> findAll(Pageable pageable);

    /**
     * Get the "id" demandeChangement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DemandeChangementDTO findOne(Long id);

    /**
     * Delete the "id" demandeChangement.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
