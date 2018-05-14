package ma.rbsmr.jhipster.service.mapper;

import ma.rbsmr.jhipster.domain.*;
import ma.rbsmr.jhipster.service.dto.ReponseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Reponse and its DTO ReponseDTO.
 */
@Mapper(componentModel = "spring", uses = {PatientMapper.class, QuestionMapper.class})
public interface ReponseMapper extends EntityMapper<ReponseDTO, Reponse> {

    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "question.id", target = "questionId")
    ReponseDTO toDto(Reponse reponse);

    @Mapping(source = "patientId", target = "patient")
    @Mapping(source = "questionId", target = "question")
    Reponse toEntity(ReponseDTO reponseDTO);

    default Reponse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reponse reponse = new Reponse();
        reponse.setId(id);
        return reponse;
    }
}
