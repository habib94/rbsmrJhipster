package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.DemandeChangement;
import ma.rbsmr.jhipster.repository.DemandeChangementRepository;
import ma.rbsmr.jhipster.service.DemandeChangementService;
import ma.rbsmr.jhipster.service.dto.DemandeChangementDTO;
import ma.rbsmr.jhipster.service.mapper.DemandeChangementMapper;
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

import ma.rbsmr.jhipster.domain.enumeration.EtatDemandeChangement;
/**
 * Test class for the DemandeChangementResource REST controller.
 *
 * @see DemandeChangementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class DemandeChangementResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    private static final String DEFAULT_REPONSE = "AAAAAAAAAA";
    private static final String UPDATED_REPONSE = "BBBBBBBBBB";

    private static final EtatDemandeChangement DEFAULT_ETAT = EtatDemandeChangement.NOUVELLE;
    private static final EtatDemandeChangement UPDATED_ETAT = EtatDemandeChangement.ENVOYEE;

    private static final String DEFAULT_LIEN = "AAAAAAAAAA";
    private static final String UPDATED_LIEN = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_CODE_QUESTION = "BBBBBBBBBB";

    @Autowired
    private DemandeChangementRepository demandeChangementRepository;

    @Autowired
    private DemandeChangementMapper demandeChangementMapper;

    @Autowired
    private DemandeChangementService demandeChangementService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemandeChangementMockMvc;

    private DemandeChangement demandeChangement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemandeChangementResource demandeChangementResource = new DemandeChangementResource(demandeChangementService);
        this.restDemandeChangementMockMvc = MockMvcBuilders.standaloneSetup(demandeChangementResource)
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
    public static DemandeChangement createEntity(EntityManager em) {
        DemandeChangement demandeChangement = new DemandeChangement()
            .date(DEFAULT_DATE)
            .contenu(DEFAULT_CONTENU)
            .reponse(DEFAULT_REPONSE)
            .etat(DEFAULT_ETAT)
            .lien(DEFAULT_LIEN)
            .codeQuestion(DEFAULT_CODE_QUESTION);
        return demandeChangement;
    }

    @Before
    public void initTest() {
        demandeChangement = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemandeChangement() throws Exception {
        int databaseSizeBeforeCreate = demandeChangementRepository.findAll().size();

        // Create the DemandeChangement
        DemandeChangementDTO demandeChangementDTO = demandeChangementMapper.toDto(demandeChangement);
        restDemandeChangementMockMvc.perform(post("/api/demande-changements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeChangementDTO)))
            .andExpect(status().isCreated());

        // Validate the DemandeChangement in the database
        List<DemandeChangement> demandeChangementList = demandeChangementRepository.findAll();
        assertThat(demandeChangementList).hasSize(databaseSizeBeforeCreate + 1);
        DemandeChangement testDemandeChangement = demandeChangementList.get(demandeChangementList.size() - 1);
        assertThat(testDemandeChangement.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testDemandeChangement.getContenu()).isEqualTo(DEFAULT_CONTENU);
        assertThat(testDemandeChangement.getReponse()).isEqualTo(DEFAULT_REPONSE);
        assertThat(testDemandeChangement.getEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testDemandeChangement.getLien()).isEqualTo(DEFAULT_LIEN);
        assertThat(testDemandeChangement.getCodeQuestion()).isEqualTo(DEFAULT_CODE_QUESTION);
    }

    @Test
    @Transactional
    public void createDemandeChangementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demandeChangementRepository.findAll().size();

        // Create the DemandeChangement with an existing ID
        demandeChangement.setId(1L);
        DemandeChangementDTO demandeChangementDTO = demandeChangementMapper.toDto(demandeChangement);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemandeChangementMockMvc.perform(post("/api/demande-changements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeChangementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DemandeChangement in the database
        List<DemandeChangement> demandeChangementList = demandeChangementRepository.findAll();
        assertThat(demandeChangementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkContenuIsRequired() throws Exception {
        int databaseSizeBeforeTest = demandeChangementRepository.findAll().size();
        // set the field null
        demandeChangement.setContenu(null);

        // Create the DemandeChangement, which fails.
        DemandeChangementDTO demandeChangementDTO = demandeChangementMapper.toDto(demandeChangement);

        restDemandeChangementMockMvc.perform(post("/api/demande-changements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeChangementDTO)))
            .andExpect(status().isBadRequest());

        List<DemandeChangement> demandeChangementList = demandeChangementRepository.findAll();
        assertThat(demandeChangementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemandeChangements() throws Exception {
        // Initialize the database
        demandeChangementRepository.saveAndFlush(demandeChangement);

        // Get all the demandeChangementList
        restDemandeChangementMockMvc.perform(get("/api/demande-changements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demandeChangement.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU.toString())))
            .andExpect(jsonPath("$.[*].reponse").value(hasItem(DEFAULT_REPONSE.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.toString())))
            .andExpect(jsonPath("$.[*].lien").value(hasItem(DEFAULT_LIEN.toString())))
            .andExpect(jsonPath("$.[*].codeQuestion").value(hasItem(DEFAULT_CODE_QUESTION.toString())));
    }

    @Test
    @Transactional
    public void getDemandeChangement() throws Exception {
        // Initialize the database
        demandeChangementRepository.saveAndFlush(demandeChangement);

        // Get the demandeChangement
        restDemandeChangementMockMvc.perform(get("/api/demande-changements/{id}", demandeChangement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demandeChangement.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU.toString()))
            .andExpect(jsonPath("$.reponse").value(DEFAULT_REPONSE.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.toString()))
            .andExpect(jsonPath("$.lien").value(DEFAULT_LIEN.toString()))
            .andExpect(jsonPath("$.codeQuestion").value(DEFAULT_CODE_QUESTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemandeChangement() throws Exception {
        // Get the demandeChangement
        restDemandeChangementMockMvc.perform(get("/api/demande-changements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemandeChangement() throws Exception {
        // Initialize the database
        demandeChangementRepository.saveAndFlush(demandeChangement);
        int databaseSizeBeforeUpdate = demandeChangementRepository.findAll().size();

        // Update the demandeChangement
        DemandeChangement updatedDemandeChangement = demandeChangementRepository.findOne(demandeChangement.getId());
        // Disconnect from session so that the updates on updatedDemandeChangement are not directly saved in db
        em.detach(updatedDemandeChangement);
        updatedDemandeChangement
            .date(UPDATED_DATE)
            .contenu(UPDATED_CONTENU)
            .reponse(UPDATED_REPONSE)
            .etat(UPDATED_ETAT)
            .lien(UPDATED_LIEN)
            .codeQuestion(UPDATED_CODE_QUESTION);
        DemandeChangementDTO demandeChangementDTO = demandeChangementMapper.toDto(updatedDemandeChangement);

        restDemandeChangementMockMvc.perform(put("/api/demande-changements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeChangementDTO)))
            .andExpect(status().isOk());

        // Validate the DemandeChangement in the database
        List<DemandeChangement> demandeChangementList = demandeChangementRepository.findAll();
        assertThat(demandeChangementList).hasSize(databaseSizeBeforeUpdate);
        DemandeChangement testDemandeChangement = demandeChangementList.get(demandeChangementList.size() - 1);
        assertThat(testDemandeChangement.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testDemandeChangement.getContenu()).isEqualTo(UPDATED_CONTENU);
        assertThat(testDemandeChangement.getReponse()).isEqualTo(UPDATED_REPONSE);
        assertThat(testDemandeChangement.getEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testDemandeChangement.getLien()).isEqualTo(UPDATED_LIEN);
        assertThat(testDemandeChangement.getCodeQuestion()).isEqualTo(UPDATED_CODE_QUESTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDemandeChangement() throws Exception {
        int databaseSizeBeforeUpdate = demandeChangementRepository.findAll().size();

        // Create the DemandeChangement
        DemandeChangementDTO demandeChangementDTO = demandeChangementMapper.toDto(demandeChangement);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemandeChangementMockMvc.perform(put("/api/demande-changements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeChangementDTO)))
            .andExpect(status().isCreated());

        // Validate the DemandeChangement in the database
        List<DemandeChangement> demandeChangementList = demandeChangementRepository.findAll();
        assertThat(demandeChangementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemandeChangement() throws Exception {
        // Initialize the database
        demandeChangementRepository.saveAndFlush(demandeChangement);
        int databaseSizeBeforeDelete = demandeChangementRepository.findAll().size();

        // Get the demandeChangement
        restDemandeChangementMockMvc.perform(delete("/api/demande-changements/{id}", demandeChangement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemandeChangement> demandeChangementList = demandeChangementRepository.findAll();
        assertThat(demandeChangementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemandeChangement.class);
        DemandeChangement demandeChangement1 = new DemandeChangement();
        demandeChangement1.setId(1L);
        DemandeChangement demandeChangement2 = new DemandeChangement();
        demandeChangement2.setId(demandeChangement1.getId());
        assertThat(demandeChangement1).isEqualTo(demandeChangement2);
        demandeChangement2.setId(2L);
        assertThat(demandeChangement1).isNotEqualTo(demandeChangement2);
        demandeChangement1.setId(null);
        assertThat(demandeChangement1).isNotEqualTo(demandeChangement2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemandeChangementDTO.class);
        DemandeChangementDTO demandeChangementDTO1 = new DemandeChangementDTO();
        demandeChangementDTO1.setId(1L);
        DemandeChangementDTO demandeChangementDTO2 = new DemandeChangementDTO();
        assertThat(demandeChangementDTO1).isNotEqualTo(demandeChangementDTO2);
        demandeChangementDTO2.setId(demandeChangementDTO1.getId());
        assertThat(demandeChangementDTO1).isEqualTo(demandeChangementDTO2);
        demandeChangementDTO2.setId(2L);
        assertThat(demandeChangementDTO1).isNotEqualTo(demandeChangementDTO2);
        demandeChangementDTO1.setId(null);
        assertThat(demandeChangementDTO1).isNotEqualTo(demandeChangementDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(demandeChangementMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(demandeChangementMapper.fromId(null)).isNull();
    }
}
