package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.CentreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Centre and its DTO CentreDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CentreMapper extends EntityMapper<CentreDTO, Centre> {



    default Centre fromId(Long id) {
        if (id == null) {
            return null;
        }
        Centre centre = new Centre();
        centre.setId(id);
        return centre;
    }
}
