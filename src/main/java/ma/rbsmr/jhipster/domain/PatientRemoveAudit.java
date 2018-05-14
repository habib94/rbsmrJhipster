package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A PatientRemoveAudit.
 */
@Entity
@Table(name = "patient_remove_audit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PatientRemoveAudit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Column(name = "id_patient")
    private Integer idPatient;

    @Column(name = "id_centre")
    private Integer idCentre;

    @Column(name = "jhi_initial")
    private String initial;

    @Size(max = 1000)
    @Column(name = "raison", length = 1000)
    private String raison;

    @ManyToOne
    private Utilisateur arc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public PatientRemoveAudit date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getIdPatient() {
        return idPatient;
    }

    public PatientRemoveAudit idPatient(Integer idPatient) {
        this.idPatient = idPatient;
        return this;
    }

    public void setIdPatient(Integer idPatient) {
        this.idPatient = idPatient;
    }

    public Integer getIdCentre() {
        return idCentre;
    }

    public PatientRemoveAudit idCentre(Integer idCentre) {
        this.idCentre = idCentre;
        return this;
    }

    public void setIdCentre(Integer idCentre) {
        this.idCentre = idCentre;
    }

    public String getInitial() {
        return initial;
    }

    public PatientRemoveAudit initial(String initial) {
        this.initial = initial;
        return this;
    }

    public void setInitial(String initial) {
        this.initial = initial;
    }

    public String getRaison() {
        return raison;
    }

    public PatientRemoveAudit raison(String raison) {
        this.raison = raison;
        return this;
    }

    public void setRaison(String raison) {
        this.raison = raison;
    }

    public Utilisateur getArc() {
        return arc;
    }

    public PatientRemoveAudit arc(Utilisateur utilisateur) {
        this.arc = utilisateur;
        return this;
    }

    public void setArc(Utilisateur utilisateur) {
        this.arc = utilisateur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PatientRemoveAudit patientRemoveAudit = (PatientRemoveAudit) o;
        if (patientRemoveAudit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patientRemoveAudit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatientRemoveAudit{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", idPatient=" + getIdPatient() +
            ", idCentre=" + getIdCentre() +
            ", initial='" + getInitial() + "'" +
            ", raison='" + getRaison() + "'" +
            "}";
    }
}
