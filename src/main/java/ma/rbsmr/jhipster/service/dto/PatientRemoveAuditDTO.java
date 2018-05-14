package ma.rbsmr.jhipster.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the PatientRemoveAudit entity.
 */
public class PatientRemoveAuditDTO implements Serializable {

    private Long id;

    private ZonedDateTime date;

    private Integer idPatient;

    private Integer idCentre;

    private String initial;

    @Size(max = 1000)
    private String raison;

    private Long arcId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getIdPatient() {
        return idPatient;
    }

    public void setIdPatient(Integer idPatient) {
        this.idPatient = idPatient;
    }

    public Integer getIdCentre() {
        return idCentre;
    }

    public void setIdCentre(Integer idCentre) {
        this.idCentre = idCentre;
    }

    public String getInitial() {
        return initial;
    }

    public void setInitial(String initial) {
        this.initial = initial;
    }

    public String getRaison() {
        return raison;
    }

    public void setRaison(String raison) {
        this.raison = raison;
    }

    public Long getArcId() {
        return arcId;
    }

    public void setArcId(Long utilisateurId) {
        this.arcId = utilisateurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PatientRemoveAuditDTO patientRemoveAuditDTO = (PatientRemoveAuditDTO) o;
        if(patientRemoveAuditDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patientRemoveAuditDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatientRemoveAuditDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", idPatient=" + getIdPatient() +
            ", idCentre=" + getIdCentre() +
            ", initial='" + getInitial() + "'" +
            ", raison='" + getRaison() + "'" +
            "}";
    }
}
