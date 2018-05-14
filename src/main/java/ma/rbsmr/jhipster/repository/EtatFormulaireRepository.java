package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.EtatFormulaire;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EtatFormulaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtatFormulaireRepository extends JpaRepository<EtatFormulaire, Long> {

}
