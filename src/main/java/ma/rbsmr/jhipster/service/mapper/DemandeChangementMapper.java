package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.DemandeChangementDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DemandeChangement and its DTO DemandeChangementDTO.
 */
@Mapper(componentModel = "spring", uses = {UtilisateurMapper.class})
public interface DemandeChangementMapper extends EntityMapper<DemandeChangementDTO, DemandeChangement> {

    @Mapping(source = "medecin.id", target = "medecinId")
    @Mapping(source = "arc.id", target = "arcId")
    DemandeChangementDTO toDto(DemandeChangement demandeChangement);

    @Mapping(source = "medecinId", target = "medecin")
    @Mapping(source = "arcId", target = "arc")
    DemandeChangement toEntity(DemandeChangementDTO demandeChangementDTO);

    default DemandeChangement fromId(Long id) {
        if (id == null) {
            return null;
        }
        DemandeChangement demandeChangement = new DemandeChangement();
        demandeChangement.setId(id);
        return demandeChangement;
    }
}
