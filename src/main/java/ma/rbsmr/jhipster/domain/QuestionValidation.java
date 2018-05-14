package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A QuestionValidation.
 */
@Entity
@Table(name = "question_validation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QuestionValidation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "val")
    private String val;

    @Column(name = "min_val")
    private Double minVal;

    @Column(name = "max_val")
    private Double maxVal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public QuestionValidation type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVal() {
        return val;
    }

    public QuestionValidation val(String val) {
        this.val = val;
        return this;
    }

    public void setVal(String val) {
        this.val = val;
    }

    public Double getMinVal() {
        return minVal;
    }

    public QuestionValidation minVal(Double minVal) {
        this.minVal = minVal;
        return this;
    }

    public void setMinVal(Double minVal) {
        this.minVal = minVal;
    }

    public Double getMaxVal() {
        return maxVal;
    }

    public QuestionValidation maxVal(Double maxVal) {
        this.maxVal = maxVal;
        return this;
    }

    public void setMaxVal(Double maxVal) {
        this.maxVal = maxVal;
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
        QuestionValidation questionValidation = (QuestionValidation) o;
        if (questionValidation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionValidation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionValidation{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", val='" + getVal() + "'" +
            ", minVal=" + getMinVal() +
            ", maxVal=" + getMaxVal() +
            "}";
    }
}
