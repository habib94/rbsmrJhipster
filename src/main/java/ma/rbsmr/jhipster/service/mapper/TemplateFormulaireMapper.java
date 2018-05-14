package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.TemplateFormulaireDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TemplateFormulaire and its DTO TemplateFormulaireDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TemplateFormulaireMapper extends EntityMapper<TemplateFormulaireDTO, TemplateFormulaire> {


    @Mapping(target = "questions", ignore = true)
    TemplateFormulaire toEntity(TemplateFormulaireDTO templateFormulaireDTO);

    default TemplateFormulaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        TemplateFormulaire templateFormulaire = new TemplateFormulaire();
        templateFormulaire.setId(id);
        return templateFormulaire;
    }
}
