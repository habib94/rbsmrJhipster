package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.FormulaireDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Formulaire and its DTO FormulaireDTO.
 */
@Mapper(componentModel = "spring", uses = {VisiteMapper.class, TemplateFormulaireMapper.class})
public interface FormulaireMapper extends EntityMapper<FormulaireDTO, Formulaire> {

    @Mapping(source = "visite.id", target = "visiteId")
    @Mapping(source = "visite.nom", target = "visiteNom")
    @Mapping(source = "templateFormulaire.id", target = "templateFormulaireId")
    @Mapping(source = "templateFormulaire.nom", target = "templateFormulaireNom")
    FormulaireDTO toDto(Formulaire formulaire);

    @Mapping(source = "visiteId", target = "visite")
    @Mapping(source = "templateFormulaireId", target = "templateFormulaire")
    Formulaire toEntity(FormulaireDTO formulaireDTO);

    default Formulaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        Formulaire formulaire = new Formulaire();
        formulaire.setId(id);
        return formulaire;
    }
}
