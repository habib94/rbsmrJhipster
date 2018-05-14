package ma.rbsmr.jhipster.web.rest;

import ma.rbsmr.jhipster.RbsmrJhipsterApp;

import ma.rbsmr.jhipster.domain.Visite;
import ma.rbsmr.jhipster.repository.VisiteRepository;
import ma.rbsmr.jhipster.service.VisiteService;
import ma.rbsmr.jhipster.service.dto.VisiteDTO;
import ma.rbsmr.jhipster.service.mapper.VisiteMapper;
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
 * Test class for the VisiteResource REST controller.
 *
 * @see VisiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RbsmrJhipsterApp.class)
public class VisiteResourceIntTest {

    private static final Integer DEFAULT_INDICE = 1;
    private static final Integer UPDATED_INDICE = 2;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_TEMPS = 1;
    private static final Integer UPDATED_TEMPS = 2;

    @Autowired
    private VisiteRepository visiteRepository;

    @Autowired
    private VisiteMapper visiteMapper;

    @Autowired
    private VisiteService visiteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVisiteMockMvc;

    private Visite visite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VisiteResource visiteResource = new VisiteResource(visiteService);
        this.restVisiteMockMvc = MockMvcBuilders.standaloneSetup(visiteResource)
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
    public static Visite createEntity(EntityManager em) {
        Visite visite = new Visite()
            .indice(DEFAULT_INDICE)
            .code(DEFAULT_CODE)
            .nom(DEFAULT_NOM)
            .temps(DEFAULT_TEMPS);
        return visite;
    }

    @Before
    public void initTest() {
        visite = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisite() throws Exception {
        int databaseSizeBeforeCreate = visiteRepository.findAll().size();

        // Create the Visite
        VisiteDTO visiteDTO = visiteMapper.toDto(visite);
        restVisiteMockMvc.perform(post("/api/visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visiteDTO)))
            .andExpect(status().isCreated());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeCreate + 1);
        Visite testVisite = visiteList.get(visiteList.size() - 1);
        assertThat(testVisite.getIndice()).isEqualTo(DEFAULT_INDICE);
        assertThat(testVisite.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testVisite.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testVisite.getTemps()).isEqualTo(DEFAULT_TEMPS);
    }

    @Test
    @Transactional
    public void createVisiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visiteRepository.findAll().size();

        // Create the Visite with an existing ID
        visite.setId(1L);
        VisiteDTO visiteDTO = visiteMapper.toDto(visite);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisiteMockMvc.perform(post("/api/visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visiteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVisites() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        // Get all the visiteList
        restVisiteMockMvc.perform(get("/api/visites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visite.getId().intValue())))
            .andExpect(jsonPath("$.[*].indice").value(hasItem(DEFAULT_INDICE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].temps").value(hasItem(DEFAULT_TEMPS)));
    }

    @Test
    @Transactional
    public void getVisite() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        // Get the visite
        restVisiteMockMvc.perform(get("/api/visites/{id}", visite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(visite.getId().intValue()))
            .andExpect(jsonPath("$.indice").value(DEFAULT_INDICE))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.temps").value(DEFAULT_TEMPS));
    }

    @Test
    @Transactional
    public void getNonExistingVisite() throws Exception {
        // Get the visite
        restVisiteMockMvc.perform(get("/api/visites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisite() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();

        // Update the visite
        Visite updatedVisite = visiteRepository.findOne(visite.getId());
        // Disconnect from session so that the updates on updatedVisite are not directly saved in db
        em.detach(updatedVisite);
        updatedVisite
            .indice(UPDATED_INDICE)
            .code(UPDATED_CODE)
            .nom(UPDATED_NOM)
            .temps(UPDATED_TEMPS);
        VisiteDTO visiteDTO = visiteMapper.toDto(updatedVisite);

        restVisiteMockMvc.perform(put("/api/visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visiteDTO)))
            .andExpect(status().isOk());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
        Visite testVisite = visiteList.get(visiteList.size() - 1);
        assertThat(testVisite.getIndice()).isEqualTo(UPDATED_INDICE);
        assertThat(testVisite.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testVisite.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testVisite.getTemps()).isEqualTo(UPDATED_TEMPS);
    }

    @Test
    @Transactional
    public void updateNonExistingVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();

        // Create the Visite
        VisiteDTO visiteDTO = visiteMapper.toDto(visite);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVisiteMockMvc.perform(put("/api/visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visiteDTO)))
            .andExpect(status().isCreated());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVisite() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);
        int databaseSizeBeforeDelete = visiteRepository.findAll().size();

        // Get the visite
        restVisiteMockMvc.perform(delete("/api/visites/{id}", visite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visite.class);
        Visite visite1 = new Visite();
        visite1.setId(1L);
        Visite visite2 = new Visite();
        visite2.setId(visite1.getId());
        assertThat(visite1).isEqualTo(visite2);
        visite2.setId(2L);
        assertThat(visite1).isNotEqualTo(visite2);
        visite1.setId(null);
        assertThat(visite1).isNotEqualTo(visite2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisiteDTO.class);
        VisiteDTO visiteDTO1 = new VisiteDTO();
        visiteDTO1.setId(1L);
        VisiteDTO visiteDTO2 = new VisiteDTO();
        assertThat(visiteDTO1).isNotEqualTo(visiteDTO2);
        visiteDTO2.setId(visiteDTO1.getId());
        assertThat(visiteDTO1).isEqualTo(visiteDTO2);
        visiteDTO2.setId(2L);
        assertThat(visiteDTO1).isNotEqualTo(visiteDTO2);
        visiteDTO1.setId(null);
        assertThat(visiteDTO1).isNotEqualTo(visiteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(visiteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(visiteMapper.fromId(null)).isNull();
    }
}
