package ma.rbsmr.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ma.rbsmr.jhipster.domain.enumeration.TypeQuestion;

/**
 * A DTO for the Question entity.
 */
public class QuestionDTO implements Serializable {

    private Long id;

    private Integer indice;

    private String codeQuestion;

    private TypeQuestion type;

    private String ennonce;

    private Boolean dm;

    private String choix;

    private String titre;

    private String addon;

    private String warning;

    private Boolean pourTable;

    private Integer ceil;

    private String conditionsAffichage;

    private Long templateFormulaireId;

    private String templateFormulaireNom;

    private Long questionExterieurId;

    private Set<QuestionValidationDTO> validations = new HashSet<>();

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

    public String getCodeQuestion() {
        return codeQuestion;
    }

    public void setCodeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
    }

    public TypeQuestion getType() {
        return type;
    }

    public void setType(TypeQuestion type) {
        this.type = type;
    }

    public String getEnnonce() {
        return ennonce;
    }

    public void setEnnonce(String ennonce) {
        this.ennonce = ennonce;
    }

    public Boolean isDm() {
        return dm;
    }

    public void setDm(Boolean dm) {
        this.dm = dm;
    }

    public String getChoix() {
        return choix;
    }

    public void setChoix(String choix) {
        this.choix = choix;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAddon() {
        return addon;
    }

    public void setAddon(String addon) {
        this.addon = addon;
    }

    public String getWarning() {
        return warning;
    }

    public void setWarning(String warning) {
        this.warning = warning;
    }

    public Boolean isPourTable() {
        return pourTable;
    }

    public void setPourTable(Boolean pourTable) {
        this.pourTable = pourTable;
    }

    public Integer getCeil() {
        return ceil;
    }

    public void setCeil(Integer ceil) {
        this.ceil = ceil;
    }

    public String getConditionsAffichage() {
        return conditionsAffichage;
    }

    public void setConditionsAffichage(String conditionsAffichage) {
        this.conditionsAffichage = conditionsAffichage;
    }

    public Long getTemplateFormulaireId() {
        return templateFormulaireId;
    }

    public void setTemplateFormulaireId(Long templateFormulaireId) {
        this.templateFormulaireId = templateFormulaireId;
    }

    public String getTemplateFormulaireNom() {
        return templateFormulaireNom;
    }

    public void setTemplateFormulaireNom(String templateFormulaireNom) {
        this.templateFormulaireNom = templateFormulaireNom;
    }

    public Long getQuestionExterieurId() {
        return questionExterieurId;
    }

    public void setQuestionExterieurId(Long questionId) {
        this.questionExterieurId = questionId;
    }

    public Set<QuestionValidationDTO> getValidations() {
        return validations;
    }

    public void setValidations(Set<QuestionValidationDTO> questionValidations) {
        this.validations = questionValidations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionDTO questionDTO = (QuestionDTO) o;
        if(questionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
            "id=" + getId() +
            ", indice=" + getIndice() +
            ", codeQuestion='" + getCodeQuestion() + "'" +
            ", type='" + getType() + "'" +
            ", ennonce='" + getEnnonce() + "'" +
            ", dm='" + isDm() + "'" +
            ", choix='" + getChoix() + "'" +
            ", titre='" + getTitre() + "'" +
            ", addon='" + getAddon() + "'" +
            ", warning='" + getWarning() + "'" +
            ", pourTable='" + isPourTable() + "'" +
            ", ceil=" + getCeil() +
            ", conditionsAffichage='" + getConditionsAffichage() + "'" +
            "}";
    }
}
