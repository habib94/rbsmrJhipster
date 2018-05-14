package ma.rbsmr.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ma.rbsmr.jhipster.domain.enumeration.TypeQuestion;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "indice")
    private Integer indice;

    @Column(name = "code_question")
    private String codeQuestion;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypeQuestion type;

    @Column(name = "ennonce")
    private String ennonce;

    @Column(name = "dm")
    private Boolean dm;

    @Column(name = "choix")
    private String choix;

    @Column(name = "titre")
    private String titre;

    @Column(name = "addon")
    private String addon;

    @Column(name = "warning")
    private String warning;

    @Column(name = "pour_table")
    private Boolean pourTable;

    @Column(name = "ceil")
    private Integer ceil;

    @Column(name = "conditions_affichage")
    private String conditionsAffichage;

    @ManyToOne
    private TemplateFormulaire templateFormulaire;

    @ManyToOne
    private Question questionExterieur;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "question_validations",
               joinColumns = @JoinColumn(name="questions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="validations_id", referencedColumnName="id"))
    private Set<QuestionValidation> validations = new HashSet<>();

    @OneToMany(mappedBy = "questionExterieur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Question> questionsInterieurs = new HashSet<>();

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

    public Question indice(Integer indice) {
        this.indice = indice;
        return this;
    }

    public void setIndice(Integer indice) {
        this.indice = indice;
    }

    public String getCodeQuestion() {
        return codeQuestion;
    }

    public Question codeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
        return this;
    }

    public void setCodeQuestion(String codeQuestion) {
        this.codeQuestion = codeQuestion;
    }

    public TypeQuestion getType() {
        return type;
    }

    public Question type(TypeQuestion type) {
        this.type = type;
        return this;
    }

    public void setType(TypeQuestion type) {
        this.type = type;
    }

    public String getEnnonce() {
        return ennonce;
    }

    public Question ennonce(String ennonce) {
        this.ennonce = ennonce;
        return this;
    }

    public void setEnnonce(String ennonce) {
        this.ennonce = ennonce;
    }

    public Boolean isDm() {
        return dm;
    }

    public Question dm(Boolean dm) {
        this.dm = dm;
        return this;
    }

    public void setDm(Boolean dm) {
        this.dm = dm;
    }

    public String getChoix() {
        return choix;
    }

    public Question choix(String choix) {
        this.choix = choix;
        return this;
    }

    public void setChoix(String choix) {
        this.choix = choix;
    }

    public String getTitre() {
        return titre;
    }

    public Question titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAddon() {
        return addon;
    }

    public Question addon(String addon) {
        this.addon = addon;
        return this;
    }

    public void setAddon(String addon) {
        this.addon = addon;
    }

    public String getWarning() {
        return warning;
    }

    public Question warning(String warning) {
        this.warning = warning;
        return this;
    }

    public void setWarning(String warning) {
        this.warning = warning;
    }

    public Boolean isPourTable() {
        return pourTable;
    }

    public Question pourTable(Boolean pourTable) {
        this.pourTable = pourTable;
        return this;
    }

    public void setPourTable(Boolean pourTable) {
        this.pourTable = pourTable;
    }

    public Integer getCeil() {
        return ceil;
    }

    public Question ceil(Integer ceil) {
        this.ceil = ceil;
        return this;
    }

    public void setCeil(Integer ceil) {
        this.ceil = ceil;
    }

    public String getConditionsAffichage() {
        return conditionsAffichage;
    }

    public Question conditionsAffichage(String conditionsAffichage) {
        this.conditionsAffichage = conditionsAffichage;
        return this;
    }

    public void setConditionsAffichage(String conditionsAffichage) {
        this.conditionsAffichage = conditionsAffichage;
    }

    public TemplateFormulaire getTemplateFormulaire() {
        return templateFormulaire;
    }

    public Question templateFormulaire(TemplateFormulaire templateFormulaire) {
        this.templateFormulaire = templateFormulaire;
        return this;
    }

    public void setTemplateFormulaire(TemplateFormulaire templateFormulaire) {
        this.templateFormulaire = templateFormulaire;
    }

    public Question getQuestionExterieur() {
        return questionExterieur;
    }

    public Question questionExterieur(Question question) {
        this.questionExterieur = question;
        return this;
    }

    public void setQuestionExterieur(Question question) {
        this.questionExterieur = question;
    }

    public Set<QuestionValidation> getValidations() {
        return validations;
    }

    public Question validations(Set<QuestionValidation> questionValidations) {
        this.validations = questionValidations;
        return this;
    }

    public Question addValidations(QuestionValidation questionValidation) {
        this.validations.add(questionValidation);
        return this;
    }

    public Question removeValidations(QuestionValidation questionValidation) {
        this.validations.remove(questionValidation);
        return this;
    }

    public void setValidations(Set<QuestionValidation> questionValidations) {
        this.validations = questionValidations;
    }

    public Set<Question> getQuestionsInterieurs() {
        return questionsInterieurs;
    }

    public Question questionsInterieurs(Set<Question> questions) {
        this.questionsInterieurs = questions;
        return this;
    }

    public Question addQuestionsInterieurs(Question question) {
        this.questionsInterieurs.add(question);
        question.setQuestionExterieur(this);
        return this;
    }

    public Question removeQuestionsInterieurs(Question question) {
        this.questionsInterieurs.remove(question);
        question.setQuestionExterieur(null);
        return this;
    }

    public void setQuestionsInterieurs(Set<Question> questions) {
        this.questionsInterieurs = questions;
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
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
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
