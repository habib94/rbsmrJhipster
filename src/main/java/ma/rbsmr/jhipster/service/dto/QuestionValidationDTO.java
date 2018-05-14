package ma.rbsmr.jhipster.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the QuestionValidation entity.
 */
public class QuestionValidationDTO implements Serializable {

    private Long id;

    private String type;

    private String val;

    private Double minVal;

    private Double maxVal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVal() {
        return val;
    }

    public void setVal(String val) {
        this.val = val;
    }

    public Double getMinVal() {
        return minVal;
    }

    public void setMinVal(Double minVal) {
        this.minVal = minVal;
    }

    public Double getMaxVal() {
        return maxVal;
    }

    public void setMaxVal(Double maxVal) {
        this.maxVal = maxVal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionValidationDTO questionValidationDTO = (QuestionValidationDTO) o;
        if(questionValidationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionValidationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionValidationDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", val='" + getVal() + "'" +
            ", minVal=" + getMinVal() +
            ", maxVal=" + getMaxVal() +
            "}";
    }
}
