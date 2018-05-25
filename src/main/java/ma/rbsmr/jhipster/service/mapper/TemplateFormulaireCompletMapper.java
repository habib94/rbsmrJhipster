package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.TemplateFormulaire;
import ma.rbsmr.jhipster.service.dto.TemplateFormulaireCompletDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity TemplateFormulaire and its DTO TemplateFormulaireDTO.
 */
@Mapper(componentModel = "spring", uses = {QuestionMapper.class})
public interface TemplateFormulaireCompletMapper extends EntityMapper<TemplateFormulaireCompletDTO, TemplateFormulaire> {



    default TemplateFormulaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        TemplateFormulaire templateFormulaire = new TemplateFormulaire();
        templateFormulaire.setId(id);
        return templateFormulaire;
    }
}
