package ma.rbsmr.jhipster.service.dto;


import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Formulaire entity.
 */
public class FormulaireCompletDTO implements Serializable {

    private Long id;

    private Integer numero;

    private Integer indice;

    private String code;

    private String nom;

    private String conditionAttribut;

    private String conditionValeur;

    private Long visiteId;

    private String visiteNom;

    private List<QuestionDTO> questions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
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

    public String getConditionAttribut() {
        return conditionAttribut;
    }

    public void setConditionAttribut(String conditionAttribut) {
        this.conditionAttribut = conditionAttribut;
    }

    public String getConditionValeur() {
        return conditionValeur;
    }

    public void setConditionValeur(String conditionValeur) {
        this.conditionValeur = conditionValeur;
    }

    public Long getVisiteId() {
        return visiteId;
    }

    public void setVisiteId(Long visiteId) {
        this.visiteId = visiteId;
    }

    public String getVisiteNom() {
        return visiteNom;
    }

    public void setVisiteNom(String visiteNom) {
        this.visiteNom = visiteNom;
    }


    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FormulaireCompletDTO formulaireDTO = (FormulaireCompletDTO) o;
        if(formulaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formulaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FormulaireDTO{" +
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
