package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.FormulaireCompletDTO;
import ma.rbsmr.jhipster.service.dto.FormulaireDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Formulaire.
 */
public interface FormulaireService {

    /**
     * Save a formulaire.
     *
     * @param formulaireDTO the entity to save
     * @return the persisted entity
     */
    FormulaireDTO save(FormulaireDTO formulaireDTO);

    /**
     * Get all the formulaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FormulaireDTO> findAll(Pageable pageable);

    /**
     * Get the "id" formulaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FormulaireDTO findOne(Long id);

    /**
     * Get the "id" formulaire.
     *
     * @param code the id of the entity
     * @return the entity
     */
    FormulaireCompletDTO findOneByCode(String code);

    /**
     * Delete the "id" formulaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
