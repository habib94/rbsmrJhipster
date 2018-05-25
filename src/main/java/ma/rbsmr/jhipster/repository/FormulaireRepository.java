package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.Formulaire;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Formulaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormulaireRepository extends JpaRepository<Formulaire, Long> {

    Formulaire findOneByCode(String code);
}
