package ma.rbsmr.jhipster.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ma.rbsmr.jhipster.domain.enumeration.EtatDemandeChangement;

/**
 * A DTO for the DemandeChangement entity.
 */
public class DemandeChangementDTO implements Serializable {

    private Long id;

    private ZonedDateTime date;

    @NotNull
    @Size(min = 2, max = 3000)
    private String contenu;

    @Size(min = 2, max = 3000)
    private String reponse;

    private EtatDemandeChangement etat;

    @Size(max = 100)
    private String lien;

    @Size(max = 100)
    private String codeQuestion;

    private Long medecinId;

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

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

    public EtatDemandeChangement getEtat() {
        return etat;
    }

    public void setEtat(EtatDemandeChangement etat) {
        this.etat = etat;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public String getCodeQuestion() {
        return codeQuestion;
    }

    public void setCodeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
    }

    public Long getMedecinId() {
        return medecinId;
    }

    public void setMedecinId(Long utilisateurId) {
        this.medecinId = utilisateurId;
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

        DemandeChangementDTO demandeChangementDTO = (DemandeChangementDTO) o;
        if(demandeChangementDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demandeChangementDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemandeChangementDTO{" +
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
