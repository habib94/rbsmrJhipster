package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.VisiteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Visite.
 */
public interface VisiteService {

    /**
     * Save a visite.
     *
     * @param visiteDTO the entity to save
     * @return the persisted entity
     */
    VisiteDTO save(VisiteDTO visiteDTO);

    /**
     * Get all the visites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VisiteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" visite.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VisiteDTO findOne(Long id);

    /**
     * Delete the "id" visite.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
