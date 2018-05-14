package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.TemplateFormulaire;
import ma.rbsmr.jhipster.repository.TemplateFormulaireRepository;
import ma.rbsmr.jhipster.service.TemplateFormulaireService;
import ma.rbsmr.jhipster.service.dto.TemplateFormulaireDTO;
import ma.rbsmr.jhipster.service.mapper.TemplateFormulaireMapper;
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
 * Test class for the TemplateFormulaireResource REST controller.
 *
 * @see TemplateFormulaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class TemplateFormulaireResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private TemplateFormulaireRepository templateFormulaireRepository;

    @Autowired
    private TemplateFormulaireMapper templateFormulaireMapper;

    @Autowired
    private TemplateFormulaireService templateFormulaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTemplateFormulaireMockMvc;

    private TemplateFormulaire templateFormulaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TemplateFormulaireResource templateFormulaireResource = new TemplateFormulaireResource(templateFormulaireService);
        this.restTemplateFormulaireMockMvc = MockMvcBuilders.standaloneSetup(templateFormulaireResource)
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
    public static TemplateFormulaire createEntity(EntityManager em) {
        TemplateFormulaire templateFormulaire = new TemplateFormulaire()
            .code(DEFAULT_CODE)
            .nom(DEFAULT_NOM);
        return templateFormulaire;
    }

    @Before
    public void initTest() {
        templateFormulaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createTemplateFormulaire() throws Exception {
        int databaseSizeBeforeCreate = templateFormulaireRepository.findAll().size();

        // Create the TemplateFormulaire
        TemplateFormulaireDTO templateFormulaireDTO = templateFormulaireMapper.toDto(templateFormulaire);
        restTemplateFormulaireMockMvc.perform(post("/api/template-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateFormulaireDTO)))
            .andExpect(status().isCreated());

        // Validate the TemplateFormulaire in the database
        List<TemplateFormulaire> templateFormulaireList = templateFormulaireRepository.findAll();
        assertThat(templateFormulaireList).hasSize(databaseSizeBeforeCreate + 1);
        TemplateFormulaire testTemplateFormulaire = templateFormulaireList.get(templateFormulaireList.size() - 1);
        assertThat(testTemplateFormulaire.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTemplateFormulaire.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createTemplateFormulaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = templateFormulaireRepository.findAll().size();

        // Create the TemplateFormulaire with an existing ID
        templateFormulaire.setId(1L);
        TemplateFormulaireDTO templateFormulaireDTO = templateFormulaireMapper.toDto(templateFormulaire);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemplateFormulaireMockMvc.perform(post("/api/template-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateFormulaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TemplateFormulaire in the database
        List<TemplateFormulaire> templateFormulaireList = templateFormulaireRepository.findAll();
        assertThat(templateFormulaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTemplateFormulaires() throws Exception {
        // Initialize the database
        templateFormulaireRepository.saveAndFlush(templateFormulaire);

        // Get all the templateFormulaireList
        restTemplateFormulaireMockMvc.perform(get("/api/template-formulaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(templateFormulaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getTemplateFormulaire() throws Exception {
        // Initialize the database
        templateFormulaireRepository.saveAndFlush(templateFormulaire);

        // Get the templateFormulaire
        restTemplateFormulaireMockMvc.perform(get("/api/template-formulaires/{id}", templateFormulaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(templateFormulaire.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTemplateFormulaire() throws Exception {
        // Get the templateFormulaire
        restTemplateFormulaireMockMvc.perform(get("/api/template-formulaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTemplateFormulaire() throws Exception {
        // Initialize the database
        templateFormulaireRepository.saveAndFlush(templateFormulaire);
        int databaseSizeBeforeUpdate = templateFormulaireRepository.findAll().size();

        // Update the templateFormulaire
        TemplateFormulaire updatedTemplateFormulaire = templateFormulaireRepository.findOne(templateFormulaire.getId());
        // Disconnect from session so that the updates on updatedTemplateFormulaire are not directly saved in db
        em.detach(updatedTemplateFormulaire);
        updatedTemplateFormulaire
            .code(UPDATED_CODE)
            .nom(UPDATED_NOM);
        TemplateFormulaireDTO templateFormulaireDTO = templateFormulaireMapper.toDto(updatedTemplateFormulaire);

        restTemplateFormulaireMockMvc.perform(put("/api/template-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateFormulaireDTO)))
            .andExpect(status().isOk());

        // Validate the TemplateFormulaire in the database
        List<TemplateFormulaire> templateFormulaireList = templateFormulaireRepository.findAll();
        assertThat(templateFormulaireList).hasSize(databaseSizeBeforeUpdate);
        TemplateFormulaire testTemplateFormulaire = templateFormulaireList.get(templateFormulaireList.size() - 1);
        assertThat(testTemplateFormulaire.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTemplateFormulaire.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingTemplateFormulaire() throws Exception {
        int databaseSizeBeforeUpdate = templateFormulaireRepository.findAll().size();

        // Create the TemplateFormulaire
        TemplateFormulaireDTO templateFormulaireDTO = templateFormulaireMapper.toDto(templateFormulaire);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTemplateFormulaireMockMvc.perform(put("/api/template-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateFormulaireDTO)))
            .andExpect(status().isCreated());

        // Validate the TemplateFormulaire in the database
        List<TemplateFormulaire> templateFormulaireList = templateFormulaireRepository.findAll();
        assertThat(templateFormulaireList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTemplateFormulaire() throws Exception {
        // Initialize the database
        templateFormulaireRepository.saveAndFlush(templateFormulaire);
        int databaseSizeBeforeDelete = templateFormulaireRepository.findAll().size();

        // Get the templateFormulaire
        restTemplateFormulaireMockMvc.perform(delete("/api/template-formulaires/{id}", templateFormulaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TemplateFormulaire> templateFormulaireList = templateFormulaireRepository.findAll();
        assertThat(templateFormulaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateFormulaire.class);
        TemplateFormulaire templateFormulaire1 = new TemplateFormulaire();
        templateFormulaire1.setId(1L);
        TemplateFormulaire templateFormulaire2 = new TemplateFormulaire();
        templateFormulaire2.setId(templateFormulaire1.getId());
        assertThat(templateFormulaire1).isEqualTo(templateFormulaire2);
        templateFormulaire2.setId(2L);
        assertThat(templateFormulaire1).isNotEqualTo(templateFormulaire2);
        templateFormulaire1.setId(null);
        assertThat(templateFormulaire1).isNotEqualTo(templateFormulaire2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateFormulaireDTO.class);
        TemplateFormulaireDTO templateFormulaireDTO1 = new TemplateFormulaireDTO();
        templateFormulaireDTO1.setId(1L);
        TemplateFormulaireDTO templateFormulaireDTO2 = new TemplateFormulaireDTO();
        assertThat(templateFormulaireDTO1).isNotEqualTo(templateFormulaireDTO2);
        templateFormulaireDTO2.setId(templateFormulaireDTO1.getId());
        assertThat(templateFormulaireDTO1).isEqualTo(templateFormulaireDTO2);
        templateFormulaireDTO2.setId(2L);
        assertThat(templateFormulaireDTO1).isNotEqualTo(templateFormulaireDTO2);
        templateFormulaireDTO1.setId(null);
        assertThat(templateFormulaireDTO1).isNotEqualTo(templateFormulaireDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(templateFormulaireMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(templateFormulaireMapper.fromId(null)).isNull();
    }
}
