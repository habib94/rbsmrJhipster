package ma.rbsmr.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Formulaire.
 */
@Entity
@Table(name = "formulaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formulaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "indice")
    private Integer indice;

    @Column(name = "code")
    private String code;

    @Column(name = "nom")
    private String nom;

    @Column(name = "condition_attribut")
    private String conditionAttribut;

    @Column(name = "condition_valeur")
    private String conditionValeur;

    @ManyToOne
    private Visite visite;

    @ManyToOne
    private TemplateFormulaire templateFormulaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Formulaire numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Integer getIndice() {
        return indice;
    }

    public Formulaire indice(Integer indice) {
        this.indice = indice;
        return this;
    }

    public void setIndice(Integer indice) {
        this.indice = indice;
    }

    public String getCode() {
        return code;
    }

    public Formulaire code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public Formulaire nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getConditionAttribut() {
        return conditionAttribut;
    }

    public Formulaire conditionAttribut(String conditionAttribut) {
        this.conditionAttribut = conditionAttribut;
        return this;
    }

    public void setConditionAttribut(String conditionAttribut) {
        this.conditionAttribut = conditionAttribut;
    }

    public String getConditionValeur() {
        return conditionValeur;
    }

    public Formulaire conditionValeur(String conditionValeur) {
        this.conditionValeur = conditionValeur;
        return this;
    }

    public void setConditionValeur(String conditionValeur) {
        this.conditionValeur = conditionValeur;
    }

    public Visite getVisite() {
        return visite;
    }

    public Formulaire visite(Visite visite) {
        this.visite = visite;
        return this;
    }

    public void setVisite(Visite visite) {
        this.visite = visite;
    }

    public TemplateFormulaire getTemplateFormulaire() {
        return templateFormulaire;
    }

    public Formulaire templateFormulaire(TemplateFormulaire templateFormulaire) {
        this.templateFormulaire = templateFormulaire;
        return this;
    }

    public void setTemplateFormulaire(TemplateFormulaire templateFormulaire) {
        this.templateFormulaire = templateFormulaire;
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
        Formulaire formulaire = (Formulaire) o;
        if (formulaire.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formulaire.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formulaire{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", indice=" + getIndice() +
            ", code='" + getCode() + "'" +
            ", nom='" + getNom() + "'" +
            ", conditionAttribut='" + getConditionAttribut() + "'" +
            ", conditionValeur='" + getConditionValeur() + "'" +
            "}";
    }
}
