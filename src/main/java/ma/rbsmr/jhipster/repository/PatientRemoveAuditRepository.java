package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.PatientRemoveAudit;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PatientRemoveAudit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatientRemoveAuditRepository extends JpaRepository<PatientRemoveAudit, Long> {

}
