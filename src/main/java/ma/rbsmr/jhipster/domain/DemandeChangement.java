package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import ma.rbsmr.jhipster.domain.enumeration.EtatDemandeChangement;

/**
 * A DemandeChangement.
 */
@Entity
@Table(name = "demande_changement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DemandeChangement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @NotNull
    @Size(min = 2, max = 3000)
    @Column(name = "contenu", length = 3000, nullable = false)
    private String contenu;

    @Size(min = 2, max = 3000)
    @Column(name = "reponse", length = 3000)
    private String reponse;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat")
    private EtatDemandeChangement etat;

    @Size(max = 100)
    @Column(name = "lien", length = 100)
    private String lien;

    @Size(max = 100)
    @Column(name = "code_question", length = 100)
    private String codeQuestion;

    @ManyToOne
    private Utilisateur medecin;

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

    public DemandeChangement date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getContenu() {
        return contenu;
    }

    public DemandeChangement contenu(String contenu) {
        this.contenu = contenu;
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public String getReponse() {
        return reponse;
    }

    public DemandeChangement reponse(String reponse) {
        this.reponse = reponse;
        return this;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

    public EtatDemandeChangement getEtat() {
        return etat;
    }

    public DemandeChangement etat(EtatDemandeChangement etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(EtatDemandeChangement etat) {
        this.etat = etat;
    }

    public String getLien() {
        return lien;
    }

    public DemandeChangement lien(String lien) {
        this.lien = lien;
        return this;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public String getCodeQuestion() {
        return codeQuestion;
    }

    public DemandeChangement codeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
        return this;
    }

    public void setCodeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
    }

    public Utilisateur getMedecin() {
        return medecin;
    }

    public DemandeChangement medecin(Utilisateur utilisateur) {
        this.medecin = utilisateur;
        return this;
    }

    public void setMedecin(Utilisateur utilisateur) {
        this.medecin = utilisateur;
    }

    public Utilisateur getArc() {
        return arc;
    }

    public DemandeChangement arc(Utilisateur utilisateur) {
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
        DemandeChangement demandeChangement = (DemandeChangement) o;
        if (demandeChangement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demandeChangement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemandeChangement{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", contenu='" + getContenu() + "'" +
            ", reponse='" + getReponse() + "'" +
            ", etat='" + getEtat() + "'" +
            ", lien='" + getLien() + "'" +
            ", codeQuestion='" + getCodeQuestion() + "'" +
            "}";
    }
}
