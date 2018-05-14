package ma.rbsmr.jhipster.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the EtatFormulaire entity.
 */
public class EtatFormulaireDTO implements Serializable {

    private Long id;

    private String etat;

    private ZonedDateTime dateValidation;

    private Long formulaireId;

    private Long patientId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public ZonedDateTime getDateValidation() {
        return dateValidation;
    }

    public void setDateValidation(ZonedDateTime dateValidation) {
        this.dateValidation = dateValidation;
    }

    public Long getFormulaireId() {
        return formulaireId;
    }

    public void setFormulaireId(Long formulaireId) {
        this.formulaireId = formulaireId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EtatFormulaireDTO etatFormulaireDTO = (EtatFormulaireDTO) o;
        if(etatFormulaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etatFormulaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EtatFormulaireDTO{" +
            "id=" + getId() +
            ", etat='" + getEtat() + "'" +
            ", dateValidation='" + getDateValidation() + "'" +
            "}";
    }
}
