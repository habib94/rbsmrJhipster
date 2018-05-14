package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.VisiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Visite and its DTO VisiteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VisiteMapper extends EntityMapper<VisiteDTO, Visite> {


    @Mapping(target = "formulaires", ignore = true)
    Visite toEntity(VisiteDTO visiteDTO);

    default Visite fromId(Long id) {
        if (id == null) {
            return null;
        }
        Visite visite = new Visite();
        visite.setId(id);
        return visite;
    }
}
