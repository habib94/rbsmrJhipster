package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.DemandeChangement;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemandeChangement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandeChangementRepository extends JpaRepository<DemandeChangement, Long> {

}
