package ma.rbsmr.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 25)
    @Column(name = "nom", length = 25)
    private String nom;

    @Size(max = 25)
    @Column(name = "prenom", length = 25)
    private String prenom;

    @Size(max = 60)
    @Column(name = "email", length = 60)
    private String email;

    @Size(min = 10, max = 15)
    @Column(name = "tel", length = 15)
    private String tel;

    @Size(max = 100)
    @Column(name = "identificateur", length = 100)
    private String identificateur;

    @Size(max = 300)
    @Column(name = "motdepasse", length = 300)
    private String motdepasse;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToOne
    private Centre centre;

    @ManyToOne
    private Role role;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "utilisateur_centres",
               joinColumns = @JoinColumn(name="utilisateurs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="centres_id", referencedColumnName="id"))
    private Set<Centre> centres = new HashSet<>();

    @OneToMany(mappedBy = "medecin")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DemandeChangement> demandeChangementsMedecins = new HashSet<>();

    @OneToMany(mappedBy = "arc")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DemandeChangement> demandeChangementsARCS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Utilisateur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Utilisateur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public Utilisateur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public Utilisateur tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getIdentificateur() {
        return identificateur;
    }

    public Utilisateur identificateur(String identificateur) {
        this.identificateur = identificateur;
        return this;
    }

    public void setIdentificateur(String identificateur) {
        this.identificateur = identificateur;
    }

    public String getMotdepasse() {
        return motdepasse;
    }

    public Utilisateur motdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
        return this;
    }

    public void setMotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }

    public Boolean isIsNew() {
        return isNew;
    }

    public Utilisateur isNew(Boolean isNew) {
        this.isNew = isNew;
        return this;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Utilisateur isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Centre getCentre() {
        return centre;
    }

    public Utilisateur centre(Centre centre) {
        this.centre = centre;
        return this;
    }

    public void setCentre(Centre centre) {
        this.centre = centre;
    }

    public Role getRole() {
        return role;
    }

    public Utilisateur role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Centre> getCentres() {
        return centres;
    }

    public Utilisateur centres(Set<Centre> centres) {
        this.centres = centres;
        return this;
    }

    public Utilisateur addCentres(Centre centre) {
        this.centres.add(centre);
        return this;
    }

    public Utilisateur removeCentres(Centre centre) {
        this.centres.remove(centre);
        return this;
    }

    public void setCentres(Set<Centre> centres) {
        this.centres = centres;
    }

    public Set<DemandeChangement> getDemandeChangementsMedecins() {
        return demandeChangementsMedecins;
    }

    public Utilisateur demandeChangementsMedecins(Set<DemandeChangement> demandeChangements) {
        this.demandeChangementsMedecins = demandeChangements;
        return this;
    }

    public Utilisateur addDemandeChangementsMedecin(DemandeChangement demandeChangement) {
        this.demandeChangementsMedecins.add(demandeChangement);
        demandeChangement.setMedecin(this);
        return this;
    }

    public Utilisateur removeDemandeChangementsMedecin(DemandeChangement demandeChangement) {
        this.demandeChangementsMedecins.remove(demandeChangement);
        demandeChangement.setMedecin(null);
        return this;
    }

    public void setDemandeChangementsMedecins(Set<DemandeChangement> demandeChangements) {
        this.demandeChangementsMedecins = demandeChangements;
    }

    public Set<DemandeChangement> getDemandeChangementsARCS() {
        return demandeChangementsARCS;
    }

    public Utilisateur demandeChangementsARCS(Set<DemandeChangement> demandeChangements) {
        this.demandeChangementsARCS = demandeChangements;
        return this;
    }

    public Utilisateur addDemandeChangementsARC(DemandeChangement demandeChangement) {
        this.demandeChangementsARCS.add(demandeChangement);
        demandeChangement.setArc(this);
        return this;
    }

    public Utilisateur removeDemandeChangementsARC(DemandeChangement demandeChangement) {
        this.demandeChangementsARCS.remove(demandeChangement);
        demandeChangement.setArc(null);
        return this;
    }

    public void setDemandeChangementsARCS(Set<DemandeChangement> demandeChangements) {
        this.demandeChangementsARCS = demandeChangements;
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
        Utilisateur utilisateur = (Utilisateur) o;
        if (utilisateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), utilisateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
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
