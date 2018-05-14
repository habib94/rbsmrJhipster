package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A EtatFormulaire.
 */
@Entity
@Table(name = "etat_formulaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EtatFormulaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "etat")
    private String etat;

    @Column(name = "date_validation")
    private ZonedDateTime dateValidation;

    @ManyToOne
    private Formulaire formulaire;

    @ManyToOne
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEtat() {
        return etat;
    }

    public EtatFormulaire etat(String etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public ZonedDateTime getDateValidation() {
        return dateValidation;
    }

    public EtatFormulaire dateValidation(ZonedDateTime dateValidation) {
        this.dateValidation = dateValidation;
        return this;
    }

    public void setDateValidation(ZonedDateTime dateValidation) {
        this.dateValidation = dateValidation;
    }

    public Formulaire getFormulaire() {
        return formulaire;
    }

    public EtatFormulaire formulaire(Formulaire formulaire) {
        this.formulaire = formulaire;
        return this;
    }

    public void setFormulaire(Formulaire formulaire) {
        this.formulaire = formulaire;
    }

    public Patient getPatient() {
        return patient;
    }

    public EtatFormulaire patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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
        EtatFormulaire etatFormulaire = (EtatFormulaire) o;
        if (etatFormulaire.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etatFormulaire.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EtatFormulaire{" +
            "id=" + getId() +
            ", etat='" + getEtat() + "'" +
            ", dateValidation='" + getDateValidation() + "'" +
            "}";
    }
}
