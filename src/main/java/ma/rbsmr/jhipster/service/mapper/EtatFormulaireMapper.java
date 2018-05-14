package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.EtatFormulaireDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EtatFormulaire and its DTO EtatFormulaireDTO.
 */
@Mapper(componentModel = "spring", uses = {FormulaireMapper.class, PatientMapper.class})
public interface EtatFormulaireMapper extends EntityMapper<EtatFormulaireDTO, EtatFormulaire> {

    @Mapping(source = "formulaire.id", target = "formulaireId")
    @Mapping(source = "patient.id", target = "patientId")
    EtatFormulaireDTO toDto(EtatFormulaire etatFormulaire);

    @Mapping(source = "formulaireId", target = "formulaire")
    @Mapping(source = "patientId", target = "patient")
    EtatFormulaire toEntity(EtatFormulaireDTO etatFormulaireDTO);

    default EtatFormulaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        EtatFormulaire etatFormulaire = new EtatFormulaire();
        etatFormulaire.setId(id);
        return etatFormulaire;
    }
}
