package ma.rbsmr.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Visite entity.
 */
public class VisiteDTO implements Serializable {

    private Long id;

    private Integer indice;

    private String code;

    private String nom;

    private Integer temps;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIndice() {
        return indice;
    }

    public void setIndice(Integer indice) {
        this.indice = indice;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getTemps() {
        return temps;
    }

    public void setTemps(Integer temps) {
        this.temps = temps;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VisiteDTO visiteDTO = (VisiteDTO) o;
        if(visiteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visiteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VisiteDTO{" +
            "id=" + getId() +
            ", indice=" + getIndice() +
            ", code='" + getCode() + "'" +
            ", nom='" + getNom() + "'" +
            ", temps=" + getTemps() +
            "}";
    }
}
