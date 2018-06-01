package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.Question;
import ma.rbsmr.jhipster.service.dto.QuestionCompletDTO;
import ma.rbsmr.jhipster.service.dto.QuestionDTO;
import ma.rbsmr.jhipster.service.dto.ReponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Question and its DTO QuestionDTO.
 */
@Mapper(componentModel = "spring", uses = {TemplateFormulaireMapper.class, QuestionValidationMapper.class,ReponseMapper.class})
public interface QuestionCompletMapper extends EntityMapper<QuestionCompletDTO, Question> {

    @Mapping(source = "templateFormulaire.id", target = "templateFormulaireId")
    @Mapping(source = "templateFormulaire.nom", target = "templateFormulaireNom")
    @Mapping(source = "questionExterieur.id", target = "questionExterieurId")
    @Mapping(target = "reponse")
    QuestionCompletDTO toDto(Question question);

    default ReponseDTO fromQuestion(Question question){
        ReponseDTO reponse = new ReponseDTO();
        reponse.setId(100L);
        return reponse;
    }


    default Question fromId(Long id) {
        if (id == null) {
            return null;
        }
        Question question = new Question();
        question.setId(id);
        return question;
    }
}
