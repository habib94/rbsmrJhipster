package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.PatientRemoveAuditDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PatientRemoveAudit and its DTO PatientRemoveAuditDTO.
 */
@Mapper(componentModel = "spring", uses = {UtilisateurMapper.class})
public interface PatientRemoveAuditMapper extends EntityMapper<PatientRemoveAuditDTO, PatientRemoveAudit> {

    @Mapping(source = "arc.id", target = "arcId")
    PatientRemoveAuditDTO toDto(PatientRemoveAudit patientRemoveAudit);

    @Mapping(source = "arcId", target = "arc")
    PatientRemoveAudit toEntity(PatientRemoveAuditDTO patientRemoveAuditDTO);

    default PatientRemoveAudit fromId(Long id) {
        if (id == null) {
            return null;
        }
        PatientRemoveAudit patientRemoveAudit = new PatientRemoveAudit();
        patientRemoveAudit.setId(id);
        return patientRemoveAudit;
    }
}
