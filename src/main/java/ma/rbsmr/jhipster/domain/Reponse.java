package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Reponse.
 */
@Entity
@Table(name = "reponse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 10000)
    @Column(name = "reponse", length = 10000)
    private String reponse;

    @Column(name = "d_m")
    private Boolean dM;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReponse() {
        return reponse;
    }

    public Reponse reponse(String reponse) {
        this.reponse = reponse;
        return this;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

    public Boolean isdM() {
        return dM;
    }

    public Reponse dM(Boolean dM) {
        this.dM = dM;
        return this;
    }

    public void setdM(Boolean dM) {
        this.dM = dM;
    }

    public Patient getPatient() {
        return patient;
    }

    public Reponse patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Question getQuestion() {
        return question;
    }

    public Reponse question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
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
        Reponse reponse = (Reponse) o;
        if (reponse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reponse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reponse{" +
            "id=" + getId() +
            ", reponse='" + getReponse() + "'" +
            ", dM='" + isdM() + "'" +
            "}";
    }
}
