package ma.rbsmr.jhipster.service;

import ma.rbsmr.jhipster.service.dto.TemplateFormulaireDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing TemplateFormulaire.
 */
public interface TemplateFormulaireService {

    /**
     * Save a templateFormulaire.
     *
     * @param templateFormulaireDTO the entity to save
     * @return the persisted entity
     */
    TemplateFormulaireDTO save(TemplateFormulaireDTO templateFormulaireDTO);

    /**
     * Get all the templateFormulaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TemplateFormulaireDTO> findAll(Pageable pageable);

    /**
     * Get the "id" templateFormulaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TemplateFormulaireDTO findOne(Long id);

    /**
     * Delete the "id" templateFormulaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
