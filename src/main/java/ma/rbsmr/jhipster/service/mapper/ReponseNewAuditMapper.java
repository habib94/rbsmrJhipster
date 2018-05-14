package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.ReponseNewAuditDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ReponseNewAudit and its DTO ReponseNewAuditDTO.
 */
@Mapper(componentModel = "spring", uses = {UtilisateurMapper.class})
public interface ReponseNewAuditMapper extends EntityMapper<ReponseNewAuditDTO, ReponseNewAudit> {

    @Mapping(source = "arc.id", target = "arcId")
    ReponseNewAuditDTO toDto(ReponseNewAudit reponseNewAudit);

    @Mapping(source = "arcId", target = "arc")
    ReponseNewAudit toEntity(ReponseNewAuditDTO reponseNewAuditDTO);

    default ReponseNewAudit fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReponseNewAudit reponseNewAudit = new ReponseNewAudit();
        reponseNewAudit.setId(id);
        return reponseNewAudit;
    }
}
