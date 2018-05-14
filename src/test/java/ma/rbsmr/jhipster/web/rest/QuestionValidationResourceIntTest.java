package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.QuestionValidation;
import ma.rbsmr.jhipster.repository.QuestionValidationRepository;
import ma.rbsmr.jhipster.service.QuestionValidationService;
import ma.rbsmr.jhipster.service.dto.QuestionValidationDTO;
import ma.rbsmr.jhipster.service.mapper.QuestionValidationMapper;
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

/**
 * Test class for the QuestionValidationResource REST controller.
 *
 * @see QuestionValidationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class QuestionValidationResourceIntTest {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_VAL = "AAAAAAAAAA";
    private static final String UPDATED_VAL = "BBBBBBBBBB";

    private static final Double DEFAULT_MIN_VAL = 1D;
    private static final Double UPDATED_MIN_VAL = 2D;

    private static final Double DEFAULT_MAX_VAL = 1D;
    private static final Double UPDATED_MAX_VAL = 2D;

    @Autowired
    private QuestionValidationRepository questionValidationRepository;

    @Autowired
    private QuestionValidationMapper questionValidationMapper;

    @Autowired
    private QuestionValidationService questionValidationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuestionValidationMockMvc;

    private QuestionValidation questionValidation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionValidationResource questionValidationResource = new QuestionValidationResource(questionValidationService);
        this.restQuestionValidationMockMvc = MockMvcBuilders.standaloneSetup(questionValidationResource)
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
    public static QuestionValidation createEntity(EntityManager em) {
        QuestionValidation questionValidation = new QuestionValidation()
            .type(DEFAULT_TYPE)
            .val(DEFAULT_VAL)
            .minVal(DEFAULT_MIN_VAL)
            .maxVal(DEFAULT_MAX_VAL);
        return questionValidation;
    }

    @Before
    public void initTest() {
        questionValidation = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestionValidation() throws Exception {
        int databaseSizeBeforeCreate = questionValidationRepository.findAll().size();

        // Create the QuestionValidation
        QuestionValidationDTO questionValidationDTO = questionValidationMapper.toDto(questionValidation);
        restQuestionValidationMockMvc.perform(post("/api/question-validations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionValidationDTO)))
            .andExpect(status().isCreated());

        // Validate the QuestionValidation in the database
        List<QuestionValidation> questionValidationList = questionValidationRepository.findAll();
        assertThat(questionValidationList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionValidation testQuestionValidation = questionValidationList.get(questionValidationList.size() - 1);
        assertThat(testQuestionValidation.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testQuestionValidation.getVal()).isEqualTo(DEFAULT_VAL);
        assertThat(testQuestionValidation.getMinVal()).isEqualTo(DEFAULT_MIN_VAL);
        assertThat(testQuestionValidation.getMaxVal()).isEqualTo(DEFAULT_MAX_VAL);
    }

    @Test
    @Transactional
    public void createQuestionValidationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionValidationRepository.findAll().size();

        // Create the QuestionValidation with an existing ID
        questionValidation.setId(1L);
        QuestionValidationDTO questionValidationDTO = questionValidationMapper.toDto(questionValidation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionValidationMockMvc.perform(post("/api/question-validations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionValidationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionValidation in the database
        List<QuestionValidation> questionValidationList = questionValidationRepository.findAll();
        assertThat(questionValidationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllQuestionValidations() throws Exception {
        // Initialize the database
        questionValidationRepository.saveAndFlush(questionValidation);

        // Get all the questionValidationList
        restQuestionValidationMockMvc.perform(get("/api/question-validations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionValidation.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].val").value(hasItem(DEFAULT_VAL.toString())))
            .andExpect(jsonPath("$.[*].minVal").value(hasItem(DEFAULT_MIN_VAL.doubleValue())))
            .andExpect(jsonPath("$.[*].maxVal").value(hasItem(DEFAULT_MAX_VAL.doubleValue())));
    }

    @Test
    @Transactional
    public void getQuestionValidation() throws Exception {
        // Initialize the database
        questionValidationRepository.saveAndFlush(questionValidation);

        // Get the questionValidation
        restQuestionValidationMockMvc.perform(get("/api/question-validations/{id}", questionValidation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(questionValidation.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.val").value(DEFAULT_VAL.toString()))
            .andExpect(jsonPath("$.minVal").value(DEFAULT_MIN_VAL.doubleValue()))
            .andExpect(jsonPath("$.maxVal").value(DEFAULT_MAX_VAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestionValidation() throws Exception {
        // Get the questionValidation
        restQuestionValidationMockMvc.perform(get("/api/question-validations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestionValidation() throws Exception {
        // Initialize the database
        questionValidationRepository.saveAndFlush(questionValidation);
        int databaseSizeBeforeUpdate = questionValidationRepository.findAll().size();

        // Update the questionValidation
        QuestionValidation updatedQuestionValidation = questionValidationRepository.findOne(questionValidation.getId());
        // Disconnect from session so that the updates on updatedQuestionValidation are not directly saved in db
        em.detach(updatedQuestionValidation);
        updatedQuestionValidation
            .type(UPDATED_TYPE)
            .val(UPDATED_VAL)
            .minVal(UPDATED_MIN_VAL)
            .maxVal(UPDATED_MAX_VAL);
        QuestionValidationDTO questionValidationDTO = questionValidationMapper.toDto(updatedQuestionValidation);

        restQuestionValidationMockMvc.perform(put("/api/question-validations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionValidationDTO)))
            .andExpect(status().isOk());

        // Validate the QuestionValidation in the database
        List<QuestionValidation> questionValidationList = questionValidationRepository.findAll();
        assertThat(questionValidationList).hasSize(databaseSizeBeforeUpdate);
        QuestionValidation testQuestionValidation = questionValidationList.get(questionValidationList.size() - 1);
        assertThat(testQuestionValidation.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testQuestionValidation.getVal()).isEqualTo(UPDATED_VAL);
        assertThat(testQuestionValidation.getMinVal()).isEqualTo(UPDATED_MIN_VAL);
        assertThat(testQuestionValidation.getMaxVal()).isEqualTo(UPDATED_MAX_VAL);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestionValidation() throws Exception {
        int databaseSizeBeforeUpdate = questionValidationRepository.findAll().size();

        // Create the QuestionValidation
        QuestionValidationDTO questionValidationDTO = questionValidationMapper.toDto(questionValidation);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restQuestionValidationMockMvc.perform(put("/api/question-validations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionValidationDTO)))
            .andExpect(status().isCreated());

        // Validate the QuestionValidation in the database
        List<QuestionValidation> questionValidationList = questionValidationRepository.findAll();
        assertThat(questionValidationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteQuestionValidation() throws Exception {
        // Initialize the database
        questionValidationRepository.saveAndFlush(questionValidation);
        int databaseSizeBeforeDelete = questionValidationRepository.findAll().size();

        // Get the questionValidation
        restQuestionValidationMockMvc.perform(delete("/api/question-validations/{id}", questionValidation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<QuestionValidation> questionValidationList = questionValidationRepository.findAll();
        assertThat(questionValidationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionValidation.class);
        QuestionValidation questionValidation1 = new QuestionValidation();
        questionValidation1.setId(1L);
        QuestionValidation questionValidation2 = new QuestionValidation();
        questionValidation2.setId(questionValidation1.getId());
        assertThat(questionValidation1).isEqualTo(questionValidation2);
        questionValidation2.setId(2L);
        assertThat(questionValidation1).isNotEqualTo(questionValidation2);
        questionValidation1.setId(null);
        assertThat(questionValidation1).isNotEqualTo(questionValidation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionValidationDTO.class);
        QuestionValidationDTO questionValidationDTO1 = new QuestionValidationDTO();
        questionValidationDTO1.setId(1L);
        QuestionValidationDTO questionValidationDTO2 = new QuestionValidationDTO();
        assertThat(questionValidationDTO1).isNotEqualTo(questionValidationDTO2);
        questionValidationDTO2.setId(questionValidationDTO1.getId());
        assertThat(questionValidationDTO1).isEqualTo(questionValidationDTO2);
        questionValidationDTO2.setId(2L);
        assertThat(questionValidationDTO1).isNotEqualTo(questionValidationDTO2);
        questionValidationDTO1.setId(null);
        assertThat(questionValidationDTO1).isNotEqualTo(questionValidationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(questionValidationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(questionValidationMapper.fromId(null)).isNull();
    }
}
