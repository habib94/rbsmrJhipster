package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.QuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Question and its DTO QuestionDTO.
 */
@Mapper(componentModel = "spring", uses = {TemplateFormulaireMapper.class, QuestionValidationMapper.class})
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {

    @Mapping(source = "templateFormulaire.id", target = "templateFormulaireId")
    @Mapping(source = "templateFormulaire.nom", target = "templateFormulaireNom")
    @Mapping(source = "questionExterieur.id", target = "questionExterieurId")
    QuestionDTO toDto(Question question);

    @Mapping(source = "templateFormulaireId", target = "templateFormulaire")
    @Mapping(source = "questionExterieurId", target = "questionExterieur")
    @Mapping(target = "questionsInterieurs", ignore = true)
    Question toEntity(QuestionDTO questionDTO);

    default Question fromId(Long id) {
        if (id == null) {
            return null;
        }
        Question question = new Question();
        question.setId(id);
        return question;
    }
}
