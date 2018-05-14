package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.Question;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Question entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("select distinct question from Question question left join fetch question.validations")
    List<Question> findAllWithEagerRelationships();

    @Query("select question from Question question left join fetch question.validations where question.id =:id")
    Question findOneWithEagerRelationships(@Param("id") Long id);

}
