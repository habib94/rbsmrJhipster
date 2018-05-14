package ma.rbsmr.jhipster.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Patient entity.
 */
public class PatientDTO implements Serializable {

    private Long id;

    private String initial;

    private ZonedDateTime dateEnregistrement;

    private ZonedDateTime dateVisite;

    private String biotherapie;

    private String sexe;

    private Long medecinId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitial() {
        return initial;
    }

    public void setInitial(String initial) {
        this.initial = initial;
    }

    public ZonedDateTime getDateEnregistrement() {
        return dateEnregistrement;
    }

    public void setDateEnregistrement(ZonedDateTime dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
    }

    public ZonedDateTime getDateVisite() {
        return dateVisite;
    }

    public void setDateVisite(ZonedDateTime dateVisite) {
        this.dateVisite = dateVisite;
    }

    public String getBiotherapie() {
        return biotherapie;
    }

    public void setBiotherapie(String biotherapie) {
        this.biotherapie = biotherapie;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Long getMedecinId() {
        return medecinId;
    }

    public void setMedecinId(Long utilisateurId) {
        this.medecinId = utilisateurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PatientDTO patientDTO = (PatientDTO) o;
        if(patientDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patientDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatientDTO{" +
            "id=" + getId() +
            ", initial='" + getInitial() + "'" +
            ", dateEnregistrement='" + getDateEnregistrement() + "'" +
            ", dateVisite='" + getDateVisite() + "'" +
            ", biotherapie='" + getBiotherapie() + "'" +
            ", sexe='" + getSexe() + "'" +
            "}";
    }
}
