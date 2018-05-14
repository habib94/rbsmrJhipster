package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.ReponseNewAudit;
import ma.rbsmr.jhipster.repository.ReponseNewAuditRepository;
import ma.rbsmr.jhipster.service.ReponseNewAuditService;
import ma.rbsmr.jhipster.service.dto.ReponseNewAuditDTO;
import ma.rbsmr.jhipster.service.mapper.ReponseNewAuditMapper;
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
 * Test class for the ReponseNewAuditResource REST controller.
 *
 * @see ReponseNewAuditResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class ReponseNewAuditResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_REPONSE_OLD = "AAAAAAAAAA";
    private static final String UPDATED_REPONSE_OLD = "BBBBBBBBBB";

    private static final String DEFAULT_REPONSE_NEW = "AAAAAAAAAA";
    private static final String UPDATED_REPONSE_NEW = "BBBBBBBBBB";

    private static final String DEFAULT_RAISON = "AAAAAAAAAA";
    private static final String UPDATED_RAISON = "BBBBBBBBBB";

    private static final String DEFAULT_RAISON_FILE_URL = "AAAAAAAAAA";
    private static final String UPDATED_RAISON_FILE_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_D_M_OLD = false;
    private static final Boolean UPDATED_D_M_OLD = true;

    private static final Boolean DEFAULT_D_M_NEW = false;
    private static final Boolean UPDATED_D_M_NEW = true;

    private static final String DEFAULT_CODE_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_CODE_QUESTION = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_PATIENT = "AAAAAAAAAA";
    private static final String UPDATED_CODE_PATIENT = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private ReponseNewAuditRepository reponseNewAuditRepository;

    @Autowired
    private ReponseNewAuditMapper reponseNewAuditMapper;

    @Autowired
    private ReponseNewAuditService reponseNewAuditService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReponseNewAuditMockMvc;

    private ReponseNewAudit reponseNewAudit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReponseNewAuditResource reponseNewAuditResource = new ReponseNewAuditResource(reponseNewAuditService);
        this.restReponseNewAuditMockMvc = MockMvcBuilders.standaloneSetup(reponseNewAuditResource)
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
    public static ReponseNewAudit createEntity(EntityManager em) {
        ReponseNewAudit reponseNewAudit = new ReponseNewAudit()
            .date(DEFAULT_DATE)
            .reponseOld(DEFAULT_REPONSE_OLD)
            .reponseNew(DEFAULT_REPONSE_NEW)
            .raison(DEFAULT_RAISON)
            .raisonFileUrl(DEFAULT_RAISON_FILE_URL)
            .dMOld(DEFAULT_D_M_OLD)
            .dMNew(DEFAULT_D_M_NEW)
            .codeQuestion(DEFAULT_CODE_QUESTION)
            .codePatient(DEFAULT_CODE_PATIENT)
            .type(DEFAULT_TYPE);
        return reponseNewAudit;
    }

    @Before
    public void initTest() {
        reponseNewAudit = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponseNewAudit() throws Exception {
        int databaseSizeBeforeCreate = reponseNewAuditRepository.findAll().size();

        // Create the ReponseNewAudit
        ReponseNewAuditDTO reponseNewAuditDTO = reponseNewAuditMapper.toDto(reponseNewAudit);
        restReponseNewAuditMockMvc.perform(post("/api/reponse-new-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseNewAuditDTO)))
            .andExpect(status().isCreated());

        // Validate the ReponseNewAudit in the database
        List<ReponseNewAudit> reponseNewAuditList = reponseNewAuditRepository.findAll();
        assertThat(reponseNewAuditList).hasSize(databaseSizeBeforeCreate + 1);
        ReponseNewAudit testReponseNewAudit = reponseNewAuditList.get(reponseNewAuditList.size() - 1);
        assertThat(testReponseNewAudit.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testReponseNewAudit.getReponseOld()).isEqualTo(DEFAULT_REPONSE_OLD);
        assertThat(testReponseNewAudit.getReponseNew()).isEqualTo(DEFAULT_REPONSE_NEW);
        assertThat(testReponseNewAudit.getRaison()).isEqualTo(DEFAULT_RAISON);
        assertThat(testReponseNewAudit.getRaisonFileUrl()).isEqualTo(DEFAULT_RAISON_FILE_URL);
        assertThat(testReponseNewAudit.isdMOld()).isEqualTo(DEFAULT_D_M_OLD);
        assertThat(testReponseNewAudit.isdMNew()).isEqualTo(DEFAULT_D_M_NEW);
        assertThat(testReponseNewAudit.getCodeQuestion()).isEqualTo(DEFAULT_CODE_QUESTION);
        assertThat(testReponseNewAudit.getCodePatient()).isEqualTo(DEFAULT_CODE_PATIENT);
        assertThat(testReponseNewAudit.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createReponseNewAuditWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponseNewAuditRepository.findAll().size();

        // Create the ReponseNewAudit with an existing ID
        reponseNewAudit.setId(1L);
        ReponseNewAuditDTO reponseNewAuditDTO = reponseNewAuditMapper.toDto(reponseNewAudit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponseNewAuditMockMvc.perform(post("/api/reponse-new-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseNewAuditDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReponseNewAudit in the database
        List<ReponseNewAudit> reponseNewAuditList = reponseNewAuditRepository.findAll();
        assertThat(reponseNewAuditList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReponseNewAudits() throws Exception {
        // Initialize the database
        reponseNewAuditRepository.saveAndFlush(reponseNewAudit);

        // Get all the reponseNewAuditList
        restReponseNewAuditMockMvc.perform(get("/api/reponse-new-audits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponseNewAudit.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].reponseOld").value(hasItem(DEFAULT_REPONSE_OLD.toString())))
            .andExpect(jsonPath("$.[*].reponseNew").value(hasItem(DEFAULT_REPONSE_NEW.toString())))
            .andExpect(jsonPath("$.[*].raison").value(hasItem(DEFAULT_RAISON.toString())))
            .andExpect(jsonPath("$.[*].raisonFileUrl").value(hasItem(DEFAULT_RAISON_FILE_URL.toString())))
            .andExpect(jsonPath("$.[*].dMOld").value(hasItem(DEFAULT_D_M_OLD.booleanValue())))
            .andExpect(jsonPath("$.[*].dMNew").value(hasItem(DEFAULT_D_M_NEW.booleanValue())))
            .andExpect(jsonPath("$.[*].codeQuestion").value(hasItem(DEFAULT_CODE_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].codePatient").value(hasItem(DEFAULT_CODE_PATIENT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getReponseNewAudit() throws Exception {
        // Initialize the database
        reponseNewAuditRepository.saveAndFlush(reponseNewAudit);

        // Get the reponseNewAudit
        restReponseNewAuditMockMvc.perform(get("/api/reponse-new-audits/{id}", reponseNewAudit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reponseNewAudit.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.reponseOld").value(DEFAULT_REPONSE_OLD.toString()))
            .andExpect(jsonPath("$.reponseNew").value(DEFAULT_REPONSE_NEW.toString()))
            .andExpect(jsonPath("$.raison").value(DEFAULT_RAISON.toString()))
            .andExpect(jsonPath("$.raisonFileUrl").value(DEFAULT_RAISON_FILE_URL.toString()))
            .andExpect(jsonPath("$.dMOld").value(DEFAULT_D_M_OLD.booleanValue()))
            .andExpect(jsonPath("$.dMNew").value(DEFAULT_D_M_NEW.booleanValue()))
            .andExpect(jsonPath("$.codeQuestion").value(DEFAULT_CODE_QUESTION.toString()))
            .andExpect(jsonPath("$.codePatient").value(DEFAULT_CODE_PATIENT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReponseNewAudit() throws Exception {
        // Get the reponseNewAudit
        restReponseNewAuditMockMvc.perform(get("/api/reponse-new-audits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponseNewAudit() throws Exception {
        // Initialize the database
        reponseNewAuditRepository.saveAndFlush(reponseNewAudit);
        int databaseSizeBeforeUpdate = reponseNewAuditRepository.findAll().size();

        // Update the reponseNewAudit
        ReponseNewAudit updatedReponseNewAudit = reponseNewAuditRepository.findOne(reponseNewAudit.getId());
        // Disconnect from session so that the updates on updatedReponseNewAudit are not directly saved in db
        em.detach(updatedReponseNewAudit);
        updatedReponseNewAudit
            .date(UPDATED_DATE)
            .reponseOld(UPDATED_REPONSE_OLD)
            .reponseNew(UPDATED_REPONSE_NEW)
            .raison(UPDATED_RAISON)
            .raisonFileUrl(UPDATED_RAISON_FILE_URL)
            .dMOld(UPDATED_D_M_OLD)
            .dMNew(UPDATED_D_M_NEW)
            .codeQuestion(UPDATED_CODE_QUESTION)
            .codePatient(UPDATED_CODE_PATIENT)
            .type(UPDATED_TYPE);
        ReponseNewAuditDTO reponseNewAuditDTO = reponseNewAuditMapper.toDto(updatedReponseNewAudit);

        restReponseNewAuditMockMvc.perform(put("/api/reponse-new-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseNewAuditDTO)))
            .andExpect(status().isOk());

        // Validate the ReponseNewAudit in the database
        List<ReponseNewAudit> reponseNewAuditList = reponseNewAuditRepository.findAll();
        assertThat(reponseNewAuditList).hasSize(databaseSizeBeforeUpdate);
        ReponseNewAudit testReponseNewAudit = reponseNewAuditList.get(reponseNewAuditList.size() - 1);
        assertThat(testReponseNewAudit.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testReponseNewAudit.getReponseOld()).isEqualTo(UPDATED_REPONSE_OLD);
        assertThat(testReponseNewAudit.getReponseNew()).isEqualTo(UPDATED_REPONSE_NEW);
        assertThat(testReponseNewAudit.getRaison()).isEqualTo(UPDATED_RAISON);
        assertThat(testReponseNewAudit.getRaisonFileUrl()).isEqualTo(UPDATED_RAISON_FILE_URL);
        assertThat(testReponseNewAudit.isdMOld()).isEqualTo(UPDATED_D_M_OLD);
        assertThat(testReponseNewAudit.isdMNew()).isEqualTo(UPDATED_D_M_NEW);
        assertThat(testReponseNewAudit.getCodeQuestion()).isEqualTo(UPDATED_CODE_QUESTION);
        assertThat(testReponseNewAudit.getCodePatient()).isEqualTo(UPDATED_CODE_PATIENT);
        assertThat(testReponseNewAudit.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingReponseNewAudit() throws Exception {
        int databaseSizeBeforeUpdate = reponseNewAuditRepository.findAll().size();

        // Create the ReponseNewAudit
        ReponseNewAuditDTO reponseNewAuditDTO = reponseNewAuditMapper.toDto(reponseNewAudit);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReponseNewAuditMockMvc.perform(put("/api/reponse-new-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseNewAuditDTO)))
            .andExpect(status().isCreated());

        // Validate the ReponseNewAudit in the database
        List<ReponseNewAudit> reponseNewAuditList = reponseNewAuditRepository.findAll();
        assertThat(reponseNewAuditList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReponseNewAudit() throws Exception {
        // Initialize the database
        reponseNewAuditRepository.saveAndFlush(reponseNewAudit);
        int databaseSizeBeforeDelete = reponseNewAuditRepository.findAll().size();

        // Get the reponseNewAudit
        restReponseNewAuditMockMvc.perform(delete("/api/reponse-new-audits/{id}", reponseNewAudit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReponseNewAudit> reponseNewAuditList = reponseNewAuditRepository.findAll();
        assertThat(reponseNewAuditList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReponseNewAudit.class);
        ReponseNewAudit reponseNewAudit1 = new ReponseNewAudit();
        reponseNewAudit1.setId(1L);
        ReponseNewAudit reponseNewAudit2 = new ReponseNewAudit();
        reponseNewAudit2.setId(reponseNewAudit1.getId());
        assertThat(reponseNewAudit1).isEqualTo(reponseNewAudit2);
        reponseNewAudit2.setId(2L);
        assertThat(reponseNewAudit1).isNotEqualTo(reponseNewAudit2);
        reponseNewAudit1.setId(null);
        assertThat(reponseNewAudit1).isNotEqualTo(reponseNewAudit2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReponseNewAuditDTO.class);
        ReponseNewAuditDTO reponseNewAuditDTO1 = new ReponseNewAuditDTO();
        reponseNewAuditDTO1.setId(1L);
        ReponseNewAuditDTO reponseNewAuditDTO2 = new ReponseNewAuditDTO();
        assertThat(reponseNewAuditDTO1).isNotEqualTo(reponseNewAuditDTO2);
        reponseNewAuditDTO2.setId(reponseNewAuditDTO1.getId());
        assertThat(reponseNewAuditDTO1).isEqualTo(reponseNewAuditDTO2);
        reponseNewAuditDTO2.setId(2L);
        assertThat(reponseNewAuditDTO1).isNotEqualTo(reponseNewAuditDTO2);
        reponseNewAuditDTO1.setId(null);
        assertThat(reponseNewAuditDTO1).isNotEqualTo(reponseNewAuditDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(reponseNewAuditMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(reponseNewAuditMapper.fromId(null)).isNull();
    }
}
