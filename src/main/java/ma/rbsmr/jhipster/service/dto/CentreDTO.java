package ma.rbsmr.jhipster.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Centre entity.
 */
public class CentreDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 25)
    private String nom;

    @NotNull
    @Size(min = 2, max = 100)
    private String adresse;

    @NotNull
    @Size(min = 10, max = 15)
    private String tel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CentreDTO centreDTO = (CentreDTO) o;
        if(centreDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), centreDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CentreDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", tel='" + getTel() + "'" +
            "}";
    }
}
