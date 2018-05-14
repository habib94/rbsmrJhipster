package ma.rbsmr.jhipster.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Utilisateur entity.
 */
public class UtilisateurDTO implements Serializable {

    private Long id;

    @Size(max = 25)
    private String nom;

    @Size(max = 25)
    private String prenom;

    @Size(max = 60)
    private String email;

    @Size(min = 10, max = 15)
    private String tel;

    @Size(max = 100)
    private String identificateur;

    @Size(max = 300)
    private String motdepasse;

    private Boolean isNew;

    private Boolean isActive;

    private Long centreId;

    private String centreNom;

    private Long roleId;

    private Set<CentreDTO> centres = new HashSet<>();

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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getIdentificateur() {
        return identificateur;
    }

    public void setIdentificateur(String identificateur) {
        this.identificateur = identificateur;
    }

    public String getMotdepasse() {
        return motdepasse;
    }

    public void setMotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }

    public Boolean isIsNew() {
        return isNew;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Long getCentreId() {
        return centreId;
    }

    public void setCentreId(Long centreId) {
        this.centreId = centreId;
    }

    public String getCentreNom() {
        return centreNom;
    }

    public void setCentreNom(String centreNom) {
        this.centreNom = centreNom;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Set<CentreDTO> getCentres() {
        return centres;
    }

    public void setCentres(Set<CentreDTO> centres) {
        this.centres = centres;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UtilisateurDTO utilisateurDTO = (UtilisateurDTO) o;
        if(utilisateurDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), utilisateurDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UtilisateurDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", email='" + getEmail() + "'" +
            ", tel='" + getTel() + "'" +
            ", identificateur='" + getIdentificateur() + "'" +
            ", motdepasse='" + getMotdepasse() + "'" +
            ", isNew='" + isIsNew() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
