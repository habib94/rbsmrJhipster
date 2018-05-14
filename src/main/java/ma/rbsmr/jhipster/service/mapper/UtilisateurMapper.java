package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.UtilisateurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Utilisateur and its DTO UtilisateurDTO.
 */
@Mapper(componentModel = "spring", uses = {CentreMapper.class, RoleMapper.class})
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {

    @Mapping(source = "centre.id", target = "centreId")
    @Mapping(source = "centre.nom", target = "centreNom")
    @Mapping(source = "role.id", target = "roleId")
    UtilisateurDTO toDto(Utilisateur utilisateur);

    @Mapping(source = "centreId", target = "centre")
    @Mapping(source = "roleId", target = "role")
    @Mapping(target = "demandeChangementsMedecins", ignore = true)
    @Mapping(target = "demandeChangementsARCS", ignore = true)
    Utilisateur toEntity(UtilisateurDTO utilisateurDTO);

    default Utilisateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(id);
        return utilisateur;
    }
}
