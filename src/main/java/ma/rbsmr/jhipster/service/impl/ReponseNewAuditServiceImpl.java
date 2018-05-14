package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.ReponseNewAuditService;
import ma.rbsmr.jhipster.domain.ReponseNewAudit;
import ma.rbsmr.jhipster.repository.ReponseNewAuditRepository;
import ma.rbsmr.jhipster.service.dto.ReponseNewAuditDTO;
import ma.rbsmr.jhipster.service.mapper.ReponseNewAuditMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ReponseNewAudit.
 */
@Service
@Transactional
public class ReponseNewAuditServiceImpl implements ReponseNewAuditService {

    private final Logger log = LoggerFactory.getLogger(ReponseNewAuditServiceImpl.class);

    private final ReponseNewAuditRepository reponseNewAuditRepository;

    private final ReponseNewAuditMapper reponseNewAuditMapper;

    public ReponseNewAuditServiceImpl(ReponseNewAuditRepository reponseNewAuditRepository, ReponseNewAuditMapper reponseNewAuditMapper) {
        this.reponseNewAuditRepository = reponseNewAuditRepository;
        this.reponseNewAuditMapper = reponseNewAuditMapper;
    }

    /**
     * Save a reponseNewAudit.
     *
     * @param reponseNewAuditDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ReponseNewAuditDTO save(ReponseNewAuditDTO reponseNewAuditDTO) {
        log.debug("Request to save ReponseNewAudit : {}", reponseNewAuditDTO);
        ReponseNewAudit reponseNewAudit = reponseNewAuditMapper.toEntity(reponseNewAuditDTO);
        reponseNewAudit = reponseNewAuditRepository.save(reponseNewAudit);
        return reponseNewAuditMapper.toDto(reponseNewAudit);
    }

    /**
     * Get all the reponseNewAudits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReponseNewAuditDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ReponseNewAudits");
        return reponseNewAuditRepository.findAll(pageable)
            .map(reponseNewAuditMapper::toDto);
    }

    /**
     * Get one reponseNewAudit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ReponseNewAuditDTO findOne(Long id) {
        log.debug("Request to get ReponseNewAudit : {}", id);
        ReponseNewAudit reponseNewAudit = reponseNewAuditRepository.findOne(id);
        return reponseNewAuditMapper.toDto(reponseNewAudit);
    }

    /**
     * Delete the reponseNewAudit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReponseNewAudit : {}", id);
        reponseNewAuditRepository.delete(id);
    }
}
