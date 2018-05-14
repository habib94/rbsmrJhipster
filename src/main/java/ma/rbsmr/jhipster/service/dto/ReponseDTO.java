package ma.rbsmr.jhipster.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Reponse entity.
 */
public class ReponseDTO implements Serializable {

    private Long id;

    @Size(max = 10000)
    private String reponse;

    private Boolean dM;

    private Long patientId;

    private Long questionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

    public Boolean isdM() {
        return dM;
    }

    public void setdM(Boolean dM) {
        this.dM = dM;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReponseDTO reponseDTO = (ReponseDTO) o;
        if(reponseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reponseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReponseDTO{" +
            "id=" + getId() +
            ", reponse='" + getReponse() + "'" +
            ", dM='" + isdM() + "'" +
            "}";
    }
}
