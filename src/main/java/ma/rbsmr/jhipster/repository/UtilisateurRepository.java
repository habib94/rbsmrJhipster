package ma.rbsmr.jhipster.repository;

import ma.rbsmr.jhipster.domain.Utilisateur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Utilisateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    @Query("select distinct utilisateur from Utilisateur utilisateur left join fetch utilisateur.centres")
    List<Utilisateur> findAllWithEagerRelationships();

    @Query("select utilisateur from Utilisateur utilisateur left join fetch utilisateur.centres where utilisateur.id =:id")
    Utilisateur findOneWithEagerRelationships(@Param("id") Long id);

}
