package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.Formulaire;
import ma.rbsmr.jhipster.service.dto.FormulaireCompletDTO;
import ma.rbsmr.jhipster.service.dto.FormulaireDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Formulaire and its DTO FormulaireDTO.
 */
@Mapper(componentModel = "spring", uses = {QuestionMapper.class})
public interface FormulaireCompletMapper extends EntityMapper<FormulaireCompletDTO, Formulaire> {

    @Mapping(source = "visite.id", target = "visiteId")
    @Mapping(source = "visite.nom", target = "visiteNom")
    @Mapping(source = "templateFormulaire.questions", target = "questions")
    FormulaireCompletDTO toDto(Formulaire formulaire);


    default Formulaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        Formulaire formulaire = new Formulaire();
        formulaire.setId(id);
        return formulaire;
    }
}
