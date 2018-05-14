package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.Question;
import ma.rbsmr.jhipster.repository.QuestionRepository;
import ma.rbsmr.jhipster.service.QuestionService;
import ma.rbsmr.jhipster.service.dto.QuestionDTO;
import ma.rbsmr.jhipster.service.mapper.QuestionMapper;
import ma.rbsmr.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static ma.rbsmr.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ma.rbsmr.jhipster.domain.enumeration.TypeQuestion;
/**
 * Test class for the QuestionResource REST controller.
 *
 * @see QuestionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class QuestionResourceIntTest {

    private static final Integer DEFAULT_INDICE = 1;
    private static final Integer UPDATED_INDICE = 2;

    private static final String DEFAULT_CODE_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_CODE_QUESTION = "BBBBBBBBBB";

    private static final TypeQuestion DEFAULT_TYPE = TypeQuestion.BOOLEAN;
    private static final TypeQuestion UPDATED_TYPE = TypeQuestion.CHOIX_HOR;

    private static final String DEFAULT_ENNONCE = "AAAAAAAAAA";
    private static final String UPDATED_ENNONCE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DM = false;
    private static final Boolean UPDATED_DM = true;

    private static final String DEFAULT_CHOIX = "AAAAAAAAAA";
    private static final String UPDATED_CHOIX = "BBBBBBBBBB";

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDON = "AAAAAAAAAA";
    private static final String UPDATED_ADDON = "BBBBBBBBBB";

    private static final String DEFAULT_WARNING = "AAAAAAAAAA";
    private static final String UPDATED_WARNING = "BBBBBBBBBB";

    private static final Boolean DEFAULT_POUR_TABLE = false;
    private static final Boolean UPDATED_POUR_TABLE = true;

    private static final Integer DEFAULT_CEIL = 1;
    private static final Integer UPDATED_CEIL = 2;

    private static final String DEFAULT_CONDITIONS_AFFICHAGE = "AAAAAAAAAA";
    private static final String UPDATED_CONDITIONS_AFFICHAGE = "BBBBBBBBBB";

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionMapper questionMapper;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuestionMockMvc;

    private Question question;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionResource questionResource = new QuestionResource(questionService);
        this.restQuestionMockMvc = MockMvcBuilders.standaloneSetup(questionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Question createEntity(EntityManager em) {
        Question question = new Question()
            .indice(DEFAULT_INDICE)
            .codeQuestion(DEFAULT_CODE_QUESTION)
            .type(DEFAULT_TYPE)
            .ennonce(DEFAULT_ENNONCE)
            .dm(DEFAULT_DM)
            .choix(DEFAULT_CHOIX)
            .titre(DEFAULT_TITRE)
            .addon(DEFAULT_ADDON)
            .warning(DEFAULT_WARNING)
            .pourTable(DEFAULT_POUR_TABLE)
            .ceil(DEFAULT_CEIL)
            .conditionsAffichage(DEFAULT_CONDITIONS_AFFICHAGE);
        return question;
    }

    @Before
    public void initTest() {
        question = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestion() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question
        QuestionDTO questionDTO = questionMapper.toDto(question);
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate + 1);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getIndice()).isEqualTo(DEFAULT_INDICE);
        assertThat(testQuestion.getCodeQuestion()).isEqualTo(DEFAULT_CODE_QUESTION);
        assertThat(testQuestion.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testQuestion.getEnnonce()).isEqualTo(DEFAULT_ENNONCE);
        assertThat(testQuestion.isDm()).isEqualTo(DEFAULT_DM);
        assertThat(testQuestion.getChoix()).isEqualTo(DEFAULT_CHOIX);
        assertThat(testQuestion.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testQuestion.getAddon()).isEqualTo(DEFAULT_ADDON);
        assertThat(testQuestion.getWarning()).isEqualTo(DEFAULT_WARNING);
        assertThat(testQuestion.isPourTable()).isEqualTo(DEFAULT_POUR_TABLE);
        assertThat(testQuestion.getCeil()).isEqualTo(DEFAULT_CEIL);
        assertThat(testQuestion.getConditionsAffichage()).isEqualTo(DEFAULT_CONDITIONS_AFFICHAGE);
    }

    @Test
    @Transactional
    public void createQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question with an existing ID
        question.setId(1L);
        QuestionDTO questionDTO = questionMapper.toDto(question);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllQuestions() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId().intValue())))
            .andExpect(jsonPath("$.[*].indice").value(hasItem(DEFAULT_INDICE)))
            .andExpect(jsonPath("$.[*].codeQuestion").value(hasItem(DEFAULT_CODE_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].ennonce").value(hasItem(DEFAULT_ENNONCE.toString())))
            .andExpect(jsonPath("$.[*].dm").value(hasItem(DEFAULT_DM.booleanValue())))
            .andExpect(jsonPath("$.[*].choix").value(hasItem(DEFAULT_CHOIX.toString())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].addon").value(hasItem(DEFAULT_ADDON.toString())))
            .andExpect(jsonPath("$.[*].warning").value(hasItem(DEFAULT_WARNING.toString())))
            .andExpect(jsonPath("$.[*].pourTable").value(hasItem(DEFAULT_POUR_TABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].ceil").value(hasItem(DEFAULT_CEIL)))
            .andExpect(jsonPath("$.[*].conditionsAffichage").value(hasItem(DEFAULT_CONDITIONS_AFFICHAGE.toString())));
    }

    @Test
    @Transactional
    public void getQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", question.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(question.getId().intValue()))
            .andExpect(jsonPath("$.indice").value(DEFAULT_INDICE))
            .andExpect(jsonPath("$.codeQuestion").value(DEFAULT_CODE_QUESTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.ennonce").value(DEFAULT_ENNONCE.toString()))
            .andExpect(jsonPath("$.dm").value(DEFAULT_DM.booleanValue()))
            .andExpect(jsonPath("$.choix").value(DEFAULT_CHOIX.toString()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.addon").value(DEFAULT_ADDON.toString()))
            .andExpect(jsonPath("$.warning").value(DEFAULT_WARNING.toString()))
            .andExpect(jsonPath("$.pourTable").value(DEFAULT_POUR_TABLE.booleanValue()))
            .andExpect(jsonPath("$.ceil").value(DEFAULT_CEIL))
            .andExpect(jsonPath("$.conditionsAffichage").value(DEFAULT_CONDITIONS_AFFICHAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestion() throws Exception {
        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Update the question
        Question updatedQuestion = questionRepository.findOne(question.getId());
        // Disconnect from session so that the updates on updatedQuestion are not directly saved in db
        em.detach(updatedQuestion);
        updatedQuestion
            .indice(UPDATED_INDICE)
            .codeQuestion(UPDATED_CODE_QUESTION)
            .type(UPDATED_TYPE)
            .ennonce(UPDATED_ENNONCE)
            .dm(UPDATED_DM)
            .choix(UPDATED_CHOIX)
            .titre(UPDATED_TITRE)
            .addon(UPDATED_ADDON)
            .warning(UPDATED_WARNING)
            .pourTable(UPDATED_POUR_TABLE)
            .ceil(UPDATED_CEIL)
            .conditionsAffichage(UPDATED_CONDITIONS_AFFICHAGE);
        QuestionDTO questionDTO = questionMapper.toDto(updatedQuestion);

        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isOk());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getIndice()).isEqualTo(UPDATED_INDICE);
        assertThat(testQuestion.getCodeQuestion()).isEqualTo(UPDATED_CODE_QUESTION);
        assertThat(testQuestion.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testQuestion.getEnnonce()).isEqualTo(UPDATED_ENNONCE);
        assertThat(testQuestion.isDm()).isEqualTo(UPDATED_DM);
        assertThat(testQuestion.getChoix()).isEqualTo(UPDATED_CHOIX);
        assertThat(testQuestion.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testQuestion.getAddon()).isEqualTo(UPDATED_ADDON);
        assertThat(testQuestion.getWarning()).isEqualTo(UPDATED_WARNING);
        assertThat(testQuestion.isPourTable()).isEqualTo(UPDATED_POUR_TABLE);
        assertThat(testQuestion.getCeil()).isEqualTo(UPDATED_CEIL);
        assertThat(testQuestion.getConditionsAffichage()).isEqualTo(UPDATED_CONDITIONS_AFFICHAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestion() throws Exception {
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Create the Question
        QuestionDTO questionDTO = questionMapper.toDto(question);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);
        int databaseSizeBeforeDelete = questionRepository.findAll().size();

        // Get the question
        restQuestionMockMvc.perform(delete("/api/questions/{id}", question.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Question.class);
        Question question1 = new Question();
        question1.setId(1L);
        Question question2 = new Question();
        question2.setId(question1.getId());
        assertThat(question1).isEqualTo(question2);
        question2.setId(2L);
        assertThat(question1).isNotEqualTo(question2);
        question1.setId(null);
        assertThat(question1).isNotEqualTo(question2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionDTO.class);
        QuestionDTO questionDTO1 = new QuestionDTO();
        questionDTO1.setId(1L);
        QuestionDTO questionDTO2 = new QuestionDTO();
        assertThat(questionDTO1).isNotEqualTo(questionDTO2);
        questionDTO2.setId(questionDTO1.getId());
        assertThat(questionDTO1).isEqualTo(questionDTO2);
        questionDTO2.setId(2L);
        assertThat(questionDTO1).isNotEqualTo(questionDTO2);
        questionDTO1.setId(null);
        assertThat(questionDTO1).isNotEqualTo(questionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(questionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(questionMapper.fromId(null)).isNull();
    }
}
