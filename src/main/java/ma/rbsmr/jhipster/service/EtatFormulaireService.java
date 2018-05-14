package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.EtatFormulaireDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing EtatFormulaire.
 */
public interface EtatFormulaireService {

    /**
     * Save a etatFormulaire.
     *
     * @param etatFormulaireDTO the entity to save
     * @return the persisted entity
     */
    EtatFormulaireDTO save(EtatFormulaireDTO etatFormulaireDTO);

    /**
     * Get all the etatFormulaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EtatFormulaireDTO> findAll(Pageable pageable);

    /**
     * Get the "id" etatFormulaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EtatFormulaireDTO findOne(Long id);

    /**
     * Delete the "id" etatFormulaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
