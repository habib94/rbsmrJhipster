package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.QuestionValidationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity QuestionValidation and its DTO QuestionValidationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface QuestionValidationMapper extends EntityMapper<QuestionValidationDTO, QuestionValidation> {



    default QuestionValidation fromId(Long id) {
        if (id == null) {
            return null;
        }
        QuestionValidation questionValidation = new QuestionValidation();
        questionValidation.setId(id);
        return questionValidation;
    }
}
