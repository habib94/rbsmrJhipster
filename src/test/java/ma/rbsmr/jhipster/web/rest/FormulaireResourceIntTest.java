package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.Formulaire;
import ma.rbsmr.jhipster.repository.FormulaireRepository;
import ma.rbsmr.jhipster.service.FormulaireService;
import ma.rbsmr.jhipster.service.dto.FormulaireDTO;
import ma.rbsmr.jhipster.service.mapper.FormulaireMapper;
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
 * Test class for the FormulaireResource REST controller.
 *
 * @see FormulaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class FormulaireResourceIntTest {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final Integer DEFAULT_INDICE = 1;
    private static final Integer UPDATED_INDICE = 2;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION_ATTRIBUT = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION_ATTRIBUT = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION_VALEUR = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION_VALEUR = "BBBBBBBBBB";

    @Autowired
    private FormulaireRepository formulaireRepository;

    @Autowired
    private FormulaireMapper formulaireMapper;

    @Autowired
    private FormulaireService formulaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormulaireMockMvc;

    private Formulaire formulaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormulaireResource formulaireResource = new FormulaireResource(formulaireService);
        this.restFormulaireMockMvc = MockMvcBuilders.standaloneSetup(formulaireResource)
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
    public static Formulaire createEntity(EntityManager em) {
        Formulaire formulaire = new Formulaire()
            .numero(DEFAULT_NUMERO)
            .indice(DEFAULT_INDICE)
            .code(DEFAULT_CODE)
            .nom(DEFAULT_NOM)
            .conditionAttribut(DEFAULT_CONDITION_ATTRIBUT)
            .conditionValeur(DEFAULT_CONDITION_VALEUR);
        return formulaire;
    }

    @Before
    public void initTest() {
        formulaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormulaire() throws Exception {
        int databaseSizeBeforeCreate = formulaireRepository.findAll().size();

        // Create the Formulaire
        FormulaireDTO formulaireDTO = formulaireMapper.toDto(formulaire);
        restFormulaireMockMvc.perform(post("/api/formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formulaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Formulaire in the database
        List<Formulaire> formulaireList = formulaireRepository.findAll();
        assertThat(formulaireList).hasSize(databaseSizeBeforeCreate + 1);
        Formulaire testFormulaire = formulaireList.get(formulaireList.size() - 1);
        assertThat(testFormulaire.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testFormulaire.getIndice()).isEqualTo(DEFAULT_INDICE);
        assertThat(testFormulaire.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testFormulaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testFormulaire.getConditionAttribut()).isEqualTo(DEFAULT_CONDITION_ATTRIBUT);
        assertThat(testFormulaire.getConditionValeur()).isEqualTo(DEFAULT_CONDITION_VALEUR);
    }

    @Test
    @Transactional
    public void createFormulaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formulaireRepository.findAll().size();

        // Create the Formulaire with an existing ID
        formulaire.setId(1L);
        FormulaireDTO formulaireDTO = formulaireMapper.toDto(formulaire);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormulaireMockMvc.perform(post("/api/formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formulaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Formulaire in the database
        List<Formulaire> formulaireList = formulaireRepository.findAll();
        assertThat(formulaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFormulaires() throws Exception {
        // Initialize the database
        formulaireRepository.saveAndFlush(formulaire);

        // Get all the formulaireList
        restFormulaireMockMvc.perform(get("/api/formulaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formulaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].indice").value(hasItem(DEFAULT_INDICE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].conditionAttribut").value(hasItem(DEFAULT_CONDITION_ATTRIBUT.toString())))
            .andExpect(jsonPath("$.[*].conditionValeur").value(hasItem(DEFAULT_CONDITION_VALEUR.toString())));
    }

    @Test
    @Transactional
    public void getFormulaire() throws Exception {
        // Initialize the database
        formulaireRepository.saveAndFlush(formulaire);

        // Get the formulaire
        restFormulaireMockMvc.perform(get("/api/formulaires/{id}", formulaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formulaire.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.indice").value(DEFAULT_INDICE))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.conditionAttribut").value(DEFAULT_CONDITION_ATTRIBUT.toString()))
            .andExpect(jsonPath("$.conditionValeur").value(DEFAULT_CONDITION_VALEUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFormulaire() throws Exception {
        // Get the formulaire
        restFormulaireMockMvc.perform(get("/api/formulaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormulaire() throws Exception {
        // Initialize the database
        formulaireRepository.saveAndFlush(formulaire);
        int databaseSizeBeforeUpdate = formulaireRepository.findAll().size();

        // Update the formulaire
        Formulaire updatedFormulaire = formulaireRepository.findOne(formulaire.getId());
        // Disconnect from session so that the updates on updatedFormulaire are not directly saved in db
        em.detach(updatedFormulaire);
        updatedFormulaire
            .numero(UPDATED_NUMERO)
            .indice(UPDATED_INDICE)
            .code(UPDATED_CODE)
            .nom(UPDATED_NOM)
            .conditionAttribut(UPDATED_CONDITION_ATTRIBUT)
            .conditionValeur(UPDATED_CONDITION_VALEUR);
        FormulaireDTO formulaireDTO = formulaireMapper.toDto(updatedFormulaire);

        restFormulaireMockMvc.perform(put("/api/formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formulaireDTO)))
            .andExpect(status().isOk());

        // Validate the Formulaire in the database
        List<Formulaire> formulaireList = formulaireRepository.findAll();
        assertThat(formulaireList).hasSize(databaseSizeBeforeUpdate);
        Formulaire testFormulaire = formulaireList.get(formulaireList.size() - 1);
        assertThat(testFormulaire.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testFormulaire.getIndice()).isEqualTo(UPDATED_INDICE);
        assertThat(testFormulaire.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testFormulaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testFormulaire.getConditionAttribut()).isEqualTo(UPDATED_CONDITION_ATTRIBUT);
        assertThat(testFormulaire.getConditionValeur()).isEqualTo(UPDATED_CONDITION_VALEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingFormulaire() throws Exception {
        int databaseSizeBeforeUpdate = formulaireRepository.findAll().size();

        // Create the Formulaire
        FormulaireDTO formulaireDTO = formulaireMapper.toDto(formulaire);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormulaireMockMvc.perform(put("/api/formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formulaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Formulaire in the database
        List<Formulaire> formulaireList = formulaireRepository.findAll();
        assertThat(formulaireList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFormulaire() throws Exception {
        // Initialize the database
        formulaireRepository.saveAndFlush(formulaire);
        int databaseSizeBeforeDelete = formulaireRepository.findAll().size();

        // Get the formulaire
        restFormulaireMockMvc.perform(delete("/api/formulaires/{id}", formulaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Formulaire> formulaireList = formulaireRepository.findAll();
        assertThat(formulaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Formulaire.class);
        Formulaire formulaire1 = new Formulaire();
        formulaire1.setId(1L);
        Formulaire formulaire2 = new Formulaire();
        formulaire2.setId(formulaire1.getId());
        assertThat(formulaire1).isEqualTo(formulaire2);
        formulaire2.setId(2L);
        assertThat(formulaire1).isNotEqualTo(formulaire2);
        formulaire1.setId(null);
        assertThat(formulaire1).isNotEqualTo(formulaire2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormulaireDTO.class);
        FormulaireDTO formulaireDTO1 = new FormulaireDTO();
        formulaireDTO1.setId(1L);
        FormulaireDTO formulaireDTO2 = new FormulaireDTO();
        assertThat(formulaireDTO1).isNotEqualTo(formulaireDTO2);
        formulaireDTO2.setId(formulaireDTO1.getId());
        assertThat(formulaireDTO1).isEqualTo(formulaireDTO2);
        formulaireDTO2.setId(2L);
        assertThat(formulaireDTO1).isNotEqualTo(formulaireDTO2);
        formulaireDTO1.setId(null);
        assertThat(formulaireDTO1).isNotEqualTo(formulaireDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(formulaireMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(formulaireMapper.fromId(null)).isNull();
    }
}
