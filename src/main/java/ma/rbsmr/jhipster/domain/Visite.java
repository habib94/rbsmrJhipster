package ma.rbsmr.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Visite.
 */
@Entity
@Table(name = "visite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "indice")
    private Integer indice;

    @Column(name = "code")
    private String code;

    @Column(name = "nom")
    private String nom;

    @Column(name = "temps")
    private Integer temps;

    @OneToMany(mappedBy = "visite")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Formulaire> formulaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIndice() {
        return indice;
    }

    public Visite indice(Integer indice) {
        this.indice = indice;
        return this;
    }

    public void setIndice(Integer indice) {
        this.indice = indice;
    }

    public String getCode() {
        return code;
    }

    public Visite code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public Visite nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getTemps() {
        return temps;
    }

    public Visite temps(Integer temps) {
        this.temps = temps;
        return this;
    }

    public void setTemps(Integer temps) {
        this.temps = temps;
    }

    public Set<Formulaire> getFormulaires() {
        return formulaires;
    }

    public Visite formulaires(Set<Formulaire> formulaires) {
        this.formulaires = formulaires;
        return this;
    }

    public Visite addFormulaires(Formulaire formulaire) {
        this.formulaires.add(formulaire);
        formulaire.setVisite(this);
        return this;
    }

    public Visite removeFormulaires(Formulaire formulaire) {
        this.formulaires.remove(formulaire);
        formulaire.setVisite(null);
        return this;
    }

    public void setFormulaires(Set<Formulaire> formulaires) {
        this.formulaires = formulaires;
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
        Visite visite = (Visite) o;
        if (visite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visite{" +
            "id=" + getId() +
            ", indice=" + getIndice() +
            ", code='" + getCode() + "'" +
            ", nom='" + getNom() + "'" +
            ", temps=" + getTemps() +
            "}";
    }
}
