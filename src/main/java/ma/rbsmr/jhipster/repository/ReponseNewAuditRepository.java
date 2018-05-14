package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.ReponseNewAudit;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReponseNewAudit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReponseNewAuditRepository extends JpaRepository<ReponseNewAudit, Long> {

}
