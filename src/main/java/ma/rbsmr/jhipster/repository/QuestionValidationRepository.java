package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.QuestionValidation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the QuestionValidation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionValidationRepository extends JpaRepository<QuestionValidation, Long> {

}
