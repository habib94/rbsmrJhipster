package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ReponseNewAudit.
 */
@Entity
@Table(name = "reponse_new_audit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReponseNewAudit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Size(max = 1000)
    @Column(name = "reponse_old", length = 1000)
    private String reponseOld;

    @Size(max = 1000)
    @Column(name = "reponse_new", length = 1000)
    private String reponseNew;

    @Size(max = 1000)
    @Column(name = "raison", length = 1000)
    private String raison;

    @Size(max = 200)
    @Column(name = "raison_file_url", length = 200)
    private String raisonFileUrl;

    @Column(name = "d_m_old")
    private Boolean dMOld;

    @Column(name = "d_m_new")
    private Boolean dMNew;

    @Column(name = "code_question")
    private String codeQuestion;

    @Column(name = "code_patient")
    private String codePatient;

    @Column(name = "jhi_type")
    private String type;

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

    public ReponseNewAudit date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getReponseOld() {
        return reponseOld;
    }

    public ReponseNewAudit reponseOld(String reponseOld) {
        this.reponseOld = reponseOld;
        return this;
    }

    public void setReponseOld(String reponseOld) {
        this.reponseOld = reponseOld;
    }

    public String getReponseNew() {
        return reponseNew;
    }

    public ReponseNewAudit reponseNew(String reponseNew) {
        this.reponseNew = reponseNew;
        return this;
    }

    public void setReponseNew(String reponseNew) {
        this.reponseNew = reponseNew;
    }

    public String getRaison() {
        return raison;
    }

    public ReponseNewAudit raison(String raison) {
        this.raison = raison;
        return this;
    }

    public void setRaison(String raison) {
        this.raison = raison;
    }

    public String getRaisonFileUrl() {
        return raisonFileUrl;
    }

    public ReponseNewAudit raisonFileUrl(String raisonFileUrl) {
        this.raisonFileUrl = raisonFileUrl;
        return this;
    }

    public void setRaisonFileUrl(String raisonFileUrl) {
        this.raisonFileUrl = raisonFileUrl;
    }

    public Boolean isdMOld() {
        return dMOld;
    }

    public ReponseNewAudit dMOld(Boolean dMOld) {
        this.dMOld = dMOld;
        return this;
    }

    public void setdMOld(Boolean dMOld) {
        this.dMOld = dMOld;
    }

    public Boolean isdMNew() {
        return dMNew;
    }

    public ReponseNewAudit dMNew(Boolean dMNew) {
        this.dMNew = dMNew;
        return this;
    }

    public void setdMNew(Boolean dMNew) {
        this.dMNew = dMNew;
    }

    public String getCodeQuestion() {
        return codeQuestion;
    }

    public ReponseNewAudit codeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
        return this;
    }

    public void setCodeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
    }

    public String getCodePatient() {
        return codePatient;
    }

    public ReponseNewAudit codePatient(String codePatient) {
        this.codePatient = codePatient;
        return this;
    }

    public void setCodePatient(String codePatient) {
        this.codePatient = codePatient;
    }

    public String getType() {
        return type;
    }

    public ReponseNewAudit type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Utilisateur getArc() {
        return arc;
    }

    public ReponseNewAudit arc(Utilisateur utilisateur) {
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
        ReponseNewAudit reponseNewAudit = (ReponseNewAudit) o;
        if (reponseNewAudit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reponseNewAudit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReponseNewAudit{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", reponseOld='" + getReponseOld() + "'" +
            ", reponseNew='" + getReponseNew() + "'" +
            ", raison='" + getRaison() + "'" +
            ", raisonFileUrl='" + getRaisonFileUrl() + "'" +
            ", dMOld='" + isdMOld() + "'" +
            ", dMNew='" + isdMNew() + "'" +
            ", codeQuestion='" + getCodeQuestion() + "'" +
            ", codePatient='" + getCodePatient() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
