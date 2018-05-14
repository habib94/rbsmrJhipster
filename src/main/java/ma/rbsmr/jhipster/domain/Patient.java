package ma.rbsmr.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_initial")
    private String initial;

    @Column(name = "date_enregistrement")
    private ZonedDateTime dateEnregistrement;

    @Column(name = "date_visite")
    private ZonedDateTime dateVisite;

    @Column(name = "biotherapie")
    private String biotherapie;

    @Column(name = "sexe")
    private String sexe;

    @ManyToOne
    private Utilisateur medecin;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EtatFormulaire> etatFormulaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitial() {
        return initial;
    }

    public Patient initial(String initial) {
        this.initial = initial;
        return this;
    }

    public void setInitial(String initial) {
        this.initial = initial;
    }

    public ZonedDateTime getDateEnregistrement() {
        return dateEnregistrement;
    }

    public Patient dateEnregistrement(ZonedDateTime dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
        return this;
    }

    public void setDateEnregistrement(ZonedDateTime dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
    }

    public ZonedDateTime getDateVisite() {
        return dateVisite;
    }

    public Patient dateVisite(ZonedDateTime dateVisite) {
        this.dateVisite = dateVisite;
        return this;
    }

    public void setDateVisite(ZonedDateTime dateVisite) {
        this.dateVisite = dateVisite;
    }

    public String getBiotherapie() {
        return biotherapie;
    }

    public Patient biotherapie(String biotherapie) {
        this.biotherapie = biotherapie;
        return this;
    }

    public void setBiotherapie(String biotherapie) {
        this.biotherapie = biotherapie;
    }

    public String getSexe() {
        return sexe;
    }

    public Patient sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Utilisateur getMedecin() {
        return medecin;
    }

    public Patient medecin(Utilisateur utilisateur) {
        this.medecin = utilisateur;
        return this;
    }

    public void setMedecin(Utilisateur utilisateur) {
        this.medecin = utilisateur;
    }

    public Set<EtatFormulaire> getEtatFormulaires() {
        return etatFormulaires;
    }

    public Patient etatFormulaires(Set<EtatFormulaire> etatFormulaires) {
        this.etatFormulaires = etatFormulaires;
        return this;
    }

    public Patient addEtatFormulaires(EtatFormulaire etatFormulaire) {
        this.etatFormulaires.add(etatFormulaire);
        etatFormulaire.setPatient(this);
        return this;
    }

    public Patient removeEtatFormulaires(EtatFormulaire etatFormulaire) {
        this.etatFormulaires.remove(etatFormulaire);
        etatFormulaire.setPatient(null);
        return this;
    }

    public void setEtatFormulaires(Set<EtatFormulaire> etatFormulaires) {
        this.etatFormulaires = etatFormulaires;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", initial='" + getInitial() + "'" +
            ", dateEnregistrement='" + getDateEnregistrement() + "'" +
            ", dateVisite='" + getDateVisite() + "'" +
            ", biotherapie='" + getBiotherapie() + "'" +
            ", sexe='" + getSexe() + "'" +
            "}";
    }
}
