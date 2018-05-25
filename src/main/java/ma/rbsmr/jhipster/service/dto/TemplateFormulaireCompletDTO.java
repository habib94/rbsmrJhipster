package ma.rbsmr.jhipster.service.dto;


import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the TemplateFormulaire entity.
 */
public class TemplateFormulaireCompletDTO implements Serializable {

    private Long id;

    private String code;

    private String nom;

    private List<QuestionDTO> questions;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TemplateFormulaireCompletDTO templateFormulaireDTO = (TemplateFormulaireCompletDTO) o;
        if(templateFormulaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), templateFormulaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TemplateFormulaireDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", nom='" + getNom() + "'" +
            "}";
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }
}
