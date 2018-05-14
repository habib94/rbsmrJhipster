package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.EtatFormulaire;
import ma.rbsmr.jhipster.repository.EtatFormulaireRepository;
import ma.rbsmr.jhipster.service.EtatFormulaireService;
import ma.rbsmr.jhipster.service.dto.EtatFormulaireDTO;
import ma.rbsmr.jhipster.service.mapper.EtatFormulaireMapper;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static ma.rbsmr.jhipster.web.rest.TestUtil.sameInstant;
import static ma.rbsmr.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EtatFormulaireResource REST controller.
 *
 * @see EtatFormulaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class EtatFormulaireResourceIntTest {

    private static final String DEFAULT_ETAT = "AAAAAAAAAA";
    private static final String UPDATED_ETAT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_VALIDATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_VALIDATION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private EtatFormulaireRepository etatFormulaireRepository;

    @Autowired
    private EtatFormulaireMapper etatFormulaireMapper;

    @Autowired
    private EtatFormulaireService etatFormulaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEtatFormulaireMockMvc;

    private EtatFormulaire etatFormulaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtatFormulaireResource etatFormulaireResource = new EtatFormulaireResource(etatFormulaireService);
        this.restEtatFormulaireMockMvc = MockMvcBuilders.standaloneSetup(etatFormulaireResource)
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
    public static EtatFormulaire createEntity(EntityManager em) {
        EtatFormulaire etatFormulaire = new EtatFormulaire()
            .etat(DEFAULT_ETAT)
            .dateValidation(DEFAULT_DATE_VALIDATION);
        return etatFormulaire;
    }

    @Before
    public void initTest() {
        etatFormulaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtatFormulaire() throws Exception {
        int databaseSizeBeforeCreate = etatFormulaireRepository.findAll().size();

        // Create the EtatFormulaire
        EtatFormulaireDTO etatFormulaireDTO = etatFormulaireMapper.toDto(etatFormulaire);
        restEtatFormulaireMockMvc.perform(post("/api/etat-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatFormulaireDTO)))
            .andExpect(status().isCreated());

        // Validate the EtatFormulaire in the database
        List<EtatFormulaire> etatFormulaireList = etatFormulaireRepository.findAll();
        assertThat(etatFormulaireList).hasSize(databaseSizeBeforeCreate + 1);
        EtatFormulaire testEtatFormulaire = etatFormulaireList.get(etatFormulaireList.size() - 1);
        assertThat(testEtatFormulaire.getEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testEtatFormulaire.getDateValidation()).isEqualTo(DEFAULT_DATE_VALIDATION);
    }

    @Test
    @Transactional
    public void createEtatFormulaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etatFormulaireRepository.findAll().size();

        // Create the EtatFormulaire with an existing ID
        etatFormulaire.setId(1L);
        EtatFormulaireDTO etatFormulaireDTO = etatFormulaireMapper.toDto(etatFormulaire);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtatFormulaireMockMvc.perform(post("/api/etat-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatFormulaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EtatFormulaire in the database
        List<EtatFormulaire> etatFormulaireList = etatFormulaireRepository.findAll();
        assertThat(etatFormulaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEtatFormulaires() throws Exception {
        // Initialize the database
        etatFormulaireRepository.saveAndFlush(etatFormulaire);

        // Get all the etatFormulaireList
        restEtatFormulaireMockMvc.perform(get("/api/etat-formulaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etatFormulaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.toString())))
            .andExpect(jsonPath("$.[*].dateValidation").value(hasItem(sameInstant(DEFAULT_DATE_VALIDATION))));
    }

    @Test
    @Transactional
    public void getEtatFormulaire() throws Exception {
        // Initialize the database
        etatFormulaireRepository.saveAndFlush(etatFormulaire);

        // Get the etatFormulaire
        restEtatFormulaireMockMvc.perform(get("/api/etat-formulaires/{id}", etatFormulaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etatFormulaire.getId().intValue()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.toString()))
            .andExpect(jsonPath("$.dateValidation").value(sameInstant(DEFAULT_DATE_VALIDATION)));
    }

    @Test
    @Transactional
    public void getNonExistingEtatFormulaire() throws Exception {
        // Get the etatFormulaire
        restEtatFormulaireMockMvc.perform(get("/api/etat-formulaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtatFormulaire() throws Exception {
        // Initialize the database
        etatFormulaireRepository.saveAndFlush(etatFormulaire);
        int databaseSizeBeforeUpdate = etatFormulaireRepository.findAll().size();

        // Update the etatFormulaire
        EtatFormulaire updatedEtatFormulaire = etatFormulaireRepository.findOne(etatFormulaire.getId());
        // Disconnect from session so that the updates on updatedEtatFormulaire are not directly saved in db
        em.detach(updatedEtatFormulaire);
        updatedEtatFormulaire
            .etat(UPDATED_ETAT)
            .dateValidation(UPDATED_DATE_VALIDATION);
        EtatFormulaireDTO etatFormulaireDTO = etatFormulaireMapper.toDto(updatedEtatFormulaire);

        restEtatFormulaireMockMvc.perform(put("/api/etat-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatFormulaireDTO)))
            .andExpect(status().isOk());

        // Validate the EtatFormulaire in the database
        List<EtatFormulaire> etatFormulaireList = etatFormulaireRepository.findAll();
        assertThat(etatFormulaireList).hasSize(databaseSizeBeforeUpdate);
        EtatFormulaire testEtatFormulaire = etatFormulaireList.get(etatFormulaireList.size() - 1);
        assertThat(testEtatFormulaire.getEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testEtatFormulaire.getDateValidation()).isEqualTo(UPDATED_DATE_VALIDATION);
    }

    @Test
    @Transactional
    public void updateNonExistingEtatFormulaire() throws Exception {
        int databaseSizeBeforeUpdate = etatFormulaireRepository.findAll().size();

        // Create the EtatFormulaire
        EtatFormulaireDTO etatFormulaireDTO = etatFormulaireMapper.toDto(etatFormulaire);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEtatFormulaireMockMvc.perform(put("/api/etat-formulaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatFormulaireDTO)))
            .andExpect(status().isCreated());

        // Validate the EtatFormulaire in the database
        List<EtatFormulaire> etatFormulaireList = etatFormulaireRepository.findAll();
        assertThat(etatFormulaireList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEtatFormulaire() throws Exception {
        // Initialize the database
        etatFormulaireRepository.saveAndFlush(etatFormulaire);
        int databaseSizeBeforeDelete = etatFormulaireRepository.findAll().size();

        // Get the etatFormulaire
        restEtatFormulaireMockMvc.perform(delete("/api/etat-formulaires/{id}", etatFormulaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EtatFormulaire> etatFormulaireList = etatFormulaireRepository.findAll();
        assertThat(etatFormulaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtatFormulaire.class);
        EtatFormulaire etatFormulaire1 = new EtatFormulaire();
        etatFormulaire1.setId(1L);
        EtatFormulaire etatFormulaire2 = new EtatFormulaire();
        etatFormulaire2.setId(etatFormulaire1.getId());
        assertThat(etatFormulaire1).isEqualTo(etatFormulaire2);
        etatFormulaire2.setId(2L);
        assertThat(etatFormulaire1).isNotEqualTo(etatFormulaire2);
        etatFormulaire1.setId(null);
        assertThat(etatFormulaire1).isNotEqualTo(etatFormulaire2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtatFormulaireDTO.class);
        EtatFormulaireDTO etatFormulaireDTO1 = new EtatFormulaireDTO();
        etatFormulaireDTO1.setId(1L);
        EtatFormulaireDTO etatFormulaireDTO2 = new EtatFormulaireDTO();
        assertThat(etatFormulaireDTO1).isNotEqualTo(etatFormulaireDTO2);
        etatFormulaireDTO2.setId(etatFormulaireDTO1.getId());
        assertThat(etatFormulaireDTO1).isEqualTo(etatFormulaireDTO2);
        etatFormulaireDTO2.setId(2L);
        assertThat(etatFormulaireDTO1).isNotEqualTo(etatFormulaireDTO2);
        etatFormulaireDTO1.setId(null);
        assertThat(etatFormulaireDTO1).isNotEqualTo(etatFormulaireDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(etatFormulaireMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(etatFormulaireMapper.fromId(null)).isNull();
    }
}
