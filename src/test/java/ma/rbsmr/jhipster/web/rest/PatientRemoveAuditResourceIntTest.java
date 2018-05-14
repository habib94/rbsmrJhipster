package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.PatientRemoveAudit;
import ma.rbsmr.jhipster.repository.PatientRemoveAuditRepository;
import ma.rbsmr.jhipster.service.PatientRemoveAuditService;
import ma.rbsmr.jhipster.service.dto.PatientRemoveAuditDTO;
import ma.rbsmr.jhipster.service.mapper.PatientRemoveAuditMapper;
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
 * Test class for the PatientRemoveAuditResource REST controller.
 *
 * @see PatientRemoveAuditResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class PatientRemoveAuditResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_ID_PATIENT = 1;
    private static final Integer UPDATED_ID_PATIENT = 2;

    private static final Integer DEFAULT_ID_CENTRE = 1;
    private static final Integer UPDATED_ID_CENTRE = 2;

    private static final String DEFAULT_INITIAL = "AAAAAAAAAA";
    private static final String UPDATED_INITIAL = "BBBBBBBBBB";

    private static final String DEFAULT_RAISON = "AAAAAAAAAA";
    private static final String UPDATED_RAISON = "BBBBBBBBBB";

    @Autowired
    private PatientRemoveAuditRepository patientRemoveAuditRepository;

    @Autowired
    private PatientRemoveAuditMapper patientRemoveAuditMapper;

    @Autowired
    private PatientRemoveAuditService patientRemoveAuditService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPatientRemoveAuditMockMvc;

    private PatientRemoveAudit patientRemoveAudit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PatientRemoveAuditResource patientRemoveAuditResource = new PatientRemoveAuditResource(patientRemoveAuditService);
        this.restPatientRemoveAuditMockMvc = MockMvcBuilders.standaloneSetup(patientRemoveAuditResource)
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
    public static PatientRemoveAudit createEntity(EntityManager em) {
        PatientRemoveAudit patientRemoveAudit = new PatientRemoveAudit()
            .date(DEFAULT_DATE)
            .idPatient(DEFAULT_ID_PATIENT)
            .idCentre(DEFAULT_ID_CENTRE)
            .initial(DEFAULT_INITIAL)
            .raison(DEFAULT_RAISON);
        return patientRemoveAudit;
    }

    @Before
    public void initTest() {
        patientRemoveAudit = createEntity(em);
    }

    @Test
    @Transactional
    public void createPatientRemoveAudit() throws Exception {
        int databaseSizeBeforeCreate = patientRemoveAuditRepository.findAll().size();

        // Create the PatientRemoveAudit
        PatientRemoveAuditDTO patientRemoveAuditDTO = patientRemoveAuditMapper.toDto(patientRemoveAudit);
        restPatientRemoveAuditMockMvc.perform(post("/api/patient-remove-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientRemoveAuditDTO)))
            .andExpect(status().isCreated());

        // Validate the PatientRemoveAudit in the database
        List<PatientRemoveAudit> patientRemoveAuditList = patientRemoveAuditRepository.findAll();
        assertThat(patientRemoveAuditList).hasSize(databaseSizeBeforeCreate + 1);
        PatientRemoveAudit testPatientRemoveAudit = patientRemoveAuditList.get(patientRemoveAuditList.size() - 1);
        assertThat(testPatientRemoveAudit.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPatientRemoveAudit.getIdPatient()).isEqualTo(DEFAULT_ID_PATIENT);
        assertThat(testPatientRemoveAudit.getIdCentre()).isEqualTo(DEFAULT_ID_CENTRE);
        assertThat(testPatientRemoveAudit.getInitial()).isEqualTo(DEFAULT_INITIAL);
        assertThat(testPatientRemoveAudit.getRaison()).isEqualTo(DEFAULT_RAISON);
    }

    @Test
    @Transactional
    public void createPatientRemoveAuditWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = patientRemoveAuditRepository.findAll().size();

        // Create the PatientRemoveAudit with an existing ID
        patientRemoveAudit.setId(1L);
        PatientRemoveAuditDTO patientRemoveAuditDTO = patientRemoveAuditMapper.toDto(patientRemoveAudit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatientRemoveAuditMockMvc.perform(post("/api/patient-remove-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientRemoveAuditDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PatientRemoveAudit in the database
        List<PatientRemoveAudit> patientRemoveAuditList = patientRemoveAuditRepository.findAll();
        assertThat(patientRemoveAuditList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPatientRemoveAudits() throws Exception {
        // Initialize the database
        patientRemoveAuditRepository.saveAndFlush(patientRemoveAudit);

        // Get all the patientRemoveAuditList
        restPatientRemoveAuditMockMvc.perform(get("/api/patient-remove-audits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patientRemoveAudit.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].idPatient").value(hasItem(DEFAULT_ID_PATIENT)))
            .andExpect(jsonPath("$.[*].idCentre").value(hasItem(DEFAULT_ID_CENTRE)))
            .andExpect(jsonPath("$.[*].initial").value(hasItem(DEFAULT_INITIAL.toString())))
            .andExpect(jsonPath("$.[*].raison").value(hasItem(DEFAULT_RAISON.toString())));
    }

    @Test
    @Transactional
    public void getPatientRemoveAudit() throws Exception {
        // Initialize the database
        patientRemoveAuditRepository.saveAndFlush(patientRemoveAudit);

        // Get the patientRemoveAudit
        restPatientRemoveAuditMockMvc.perform(get("/api/patient-remove-audits/{id}", patientRemoveAudit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(patientRemoveAudit.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.idPatient").value(DEFAULT_ID_PATIENT))
            .andExpect(jsonPath("$.idCentre").value(DEFAULT_ID_CENTRE))
            .andExpect(jsonPath("$.initial").value(DEFAULT_INITIAL.toString()))
            .andExpect(jsonPath("$.raison").value(DEFAULT_RAISON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPatientRemoveAudit() throws Exception {
        // Get the patientRemoveAudit
        restPatientRemoveAuditMockMvc.perform(get("/api/patient-remove-audits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePatientRemoveAudit() throws Exception {
        // Initialize the database
        patientRemoveAuditRepository.saveAndFlush(patientRemoveAudit);
        int databaseSizeBeforeUpdate = patientRemoveAuditRepository.findAll().size();

        // Update the patientRemoveAudit
        PatientRemoveAudit updatedPatientRemoveAudit = patientRemoveAuditRepository.findOne(patientRemoveAudit.getId());
        // Disconnect from session so that the updates on updatedPatientRemoveAudit are not directly saved in db
        em.detach(updatedPatientRemoveAudit);
        updatedPatientRemoveAudit
            .date(UPDATED_DATE)
            .idPatient(UPDATED_ID_PATIENT)
            .idCentre(UPDATED_ID_CENTRE)
            .initial(UPDATED_INITIAL)
            .raison(UPDATED_RAISON);
        PatientRemoveAuditDTO patientRemoveAuditDTO = patientRemoveAuditMapper.toDto(updatedPatientRemoveAudit);

        restPatientRemoveAuditMockMvc.perform(put("/api/patient-remove-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientRemoveAuditDTO)))
            .andExpect(status().isOk());

        // Validate the PatientRemoveAudit in the database
        List<PatientRemoveAudit> patientRemoveAuditList = patientRemoveAuditRepository.findAll();
        assertThat(patientRemoveAuditList).hasSize(databaseSizeBeforeUpdate);
        PatientRemoveAudit testPatientRemoveAudit = patientRemoveAuditList.get(patientRemoveAuditList.size() - 1);
        assertThat(testPatientRemoveAudit.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPatientRemoveAudit.getIdPatient()).isEqualTo(UPDATED_ID_PATIENT);
        assertThat(testPatientRemoveAudit.getIdCentre()).isEqualTo(UPDATED_ID_CENTRE);
        assertThat(testPatientRemoveAudit.getInitial()).isEqualTo(UPDATED_INITIAL);
        assertThat(testPatientRemoveAudit.getRaison()).isEqualTo(UPDATED_RAISON);
    }

    @Test
    @Transactional
    public void updateNonExistingPatientRemoveAudit() throws Exception {
        int databaseSizeBeforeUpdate = patientRemoveAuditRepository.findAll().size();

        // Create the PatientRemoveAudit
        PatientRemoveAuditDTO patientRemoveAuditDTO = patientRemoveAuditMapper.toDto(patientRemoveAudit);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPatientRemoveAuditMockMvc.perform(put("/api/patient-remove-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientRemoveAuditDTO)))
            .andExpect(status().isCreated());

        // Validate the PatientRemoveAudit in the database
        List<PatientRemoveAudit> patientRemoveAuditList = patientRemoveAuditRepository.findAll();
        assertThat(patientRemoveAuditList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePatientRemoveAudit() throws Exception {
        // Initialize the database
        patientRemoveAuditRepository.saveAndFlush(patientRemoveAudit);
        int databaseSizeBeforeDelete = patientRemoveAuditRepository.findAll().size();

        // Get the patientRemoveAudit
        restPatientRemoveAuditMockMvc.perform(delete("/api/patient-remove-audits/{id}", patientRemoveAudit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PatientRemoveAudit> patientRemoveAuditList = patientRemoveAuditRepository.findAll();
        assertThat(patientRemoveAuditList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PatientRemoveAudit.class);
        PatientRemoveAudit patientRemoveAudit1 = new PatientRemoveAudit();
        patientRemoveAudit1.setId(1L);
        PatientRemoveAudit patientRemoveAudit2 = new PatientRemoveAudit();
        patientRemoveAudit2.setId(patientRemoveAudit1.getId());
        assertThat(patientRemoveAudit1).isEqualTo(patientRemoveAudit2);
        patientRemoveAudit2.setId(2L);
        assertThat(patientRemoveAudit1).isNotEqualTo(patientRemoveAudit2);
        patientRemoveAudit1.setId(null);
        assertThat(patientRemoveAudit1).isNotEqualTo(patientRemoveAudit2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PatientRemoveAuditDTO.class);
        PatientRemoveAuditDTO patientRemoveAuditDTO1 = new PatientRemoveAuditDTO();
        patientRemoveAuditDTO1.setId(1L);
        PatientRemoveAuditDTO patientRemoveAuditDTO2 = new PatientRemoveAuditDTO();
        assertThat(patientRemoveAuditDTO1).isNotEqualTo(patientRemoveAuditDTO2);
        patientRemoveAuditDTO2.setId(patientRemoveAuditDTO1.getId());
        assertThat(patientRemoveAuditDTO1).isEqualTo(patientRemoveAuditDTO2);
        patientRemoveAuditDTO2.setId(2L);
        assertThat(patientRemoveAuditDTO1).isNotEqualTo(patientRemoveAuditDTO2);
        patientRemoveAuditDTO1.setId(null);
        assertThat(patientRemoveAuditDTO1).isNotEqualTo(patientRemoveAuditDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(patientRemoveAuditMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(patientRemoveAuditMapper.fromId(null)).isNull();
    }
}
