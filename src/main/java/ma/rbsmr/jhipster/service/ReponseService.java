package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.ReponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Reponse.
 */
public interface ReponseService {

    /**
     * Save a reponse.
     *
     * @param reponseDTO the entity to save
     * @return the persisted entity
     */
    ReponseDTO save(ReponseDTO reponseDTO);

    /**
     * Get all the reponses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ReponseDTO> findAll(Pageable pageable);

    /**
     * Get the "id" reponse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ReponseDTO findOne(Long id);

    /**
     * Delete the "id" reponse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
