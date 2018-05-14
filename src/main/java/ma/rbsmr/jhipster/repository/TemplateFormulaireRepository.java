package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.TemplateFormulaire;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TemplateFormulaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TemplateFormulaireRepository extends JpaRepository<TemplateFormulaire, Long> {

}
