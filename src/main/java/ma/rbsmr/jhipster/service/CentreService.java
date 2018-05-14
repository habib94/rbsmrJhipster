package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.CentreDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Centre.
 */
public interface CentreService {

    /**
     * Save a centre.
     *
     * @param centreDTO the entity to save
     * @return the persisted entity
     */
    CentreDTO save(CentreDTO centreDTO);

    /**
     * Get all the centres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CentreDTO> findAll(Pageable pageable);

    /**
     * Get the "id" centre.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CentreDTO findOne(Long id);

    /**
     * Delete the "id" centre.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
