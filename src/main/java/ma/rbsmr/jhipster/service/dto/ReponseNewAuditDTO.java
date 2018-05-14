package ma.rbsmr.jhipster.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ReponseNewAudit entity.
 */
public class ReponseNewAuditDTO implements Serializable {

    private Long id;

    private ZonedDateTime date;

    @Size(max = 1000)
    private String reponseOld;

    @Size(max = 1000)
    private String reponseNew;

    @Size(max = 1000)
    private String raison;

    @Size(max = 200)
    private String raisonFileUrl;

    private Boolean dMOld;

    private Boolean dMNew;

    private String codeQuestion;

    private String codePatient;

    private String type;

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

    public String getReponseOld() {
        return reponseOld;
    }

    public void setReponseOld(String reponseOld) {
        this.reponseOld = reponseOld;
    }

    public String getReponseNew() {
        return reponseNew;
    }

    public void setReponseNew(String reponseNew) {
        this.reponseNew = reponseNew;
    }

    public String getRaison() {
        return raison;
    }

    public void setRaison(String raison) {
        this.raison = raison;
    }

    public String getRaisonFileUrl() {
        return raisonFileUrl;
    }

    public void setRaisonFileUrl(String raisonFileUrl) {
        this.raisonFileUrl = raisonFileUrl;
    }

    public Boolean isdMOld() {
        return dMOld;
    }

    public void setdMOld(Boolean dMOld) {
        this.dMOld = dMOld;
    }

    public Boolean isdMNew() {
        return dMNew;
    }

    public void setdMNew(Boolean dMNew) {
        this.dMNew = dMNew;
    }

    public String getCodeQuestion() {
        return codeQuestion;
    }

    public void setCodeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
    }

    public String getCodePatient() {
        return codePatient;
    }

    public void setCodePatient(String codePatient) {
        this.codePatient = codePatient;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

        ReponseNewAuditDTO reponseNewAuditDTO = (ReponseNewAuditDTO) o;
        if(reponseNewAuditDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reponseNewAuditDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReponseNewAuditDTO{" +
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
