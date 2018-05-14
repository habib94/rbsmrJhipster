package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.UtilisateurDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Utilisateur.
 */
public interface UtilisateurService {

    /**
     * Save a utilisateur.
     *
     * @param utilisateurDTO the entity to save
     * @return the persisted entity
     */
    UtilisateurDTO save(UtilisateurDTO utilisateurDTO);

    /**
     * Get all the utilisateurs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UtilisateurDTO> findAll(Pageable pageable);

    /**
     * Get the "id" utilisateur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UtilisateurDTO findOne(Long id);

    /**
     * Delete the "id" utilisateur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
