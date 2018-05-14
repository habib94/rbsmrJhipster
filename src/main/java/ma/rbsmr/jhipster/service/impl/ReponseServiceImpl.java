package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.ReponseService;
import ma.rbsmr.jhipster.domain.Reponse;
import ma.rbsmr.jhipster.repository.ReponseRepository;
import ma.rbsmr.jhipster.service.dto.ReponseDTO;
import ma.rbsmr.jhipster.service.mapper.ReponseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Reponse.
 */
@Service
@Transactional
public class ReponseServiceImpl implements ReponseService {

    private final Logger log = LoggerFactory.getLogger(ReponseServiceImpl.class);

    private final ReponseRepository reponseRepository;

    private final ReponseMapper reponseMapper;

    public ReponseServiceImpl(ReponseRepository reponseRepository, ReponseMapper reponseMapper) {
        this.reponseRepository = reponseRepository;
        this.reponseMapper = reponseMapper;
    }

    /**
     * Save a reponse.
     *
     * @param reponseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ReponseDTO save(ReponseDTO reponseDTO) {
        log.debug("Request to save Reponse : {}", reponseDTO);
        Reponse reponse = reponseMapper.toEntity(reponseDTO);
        reponse = reponseRepository.save(reponse);
        return reponseMapper.toDto(reponse);
    }

    /**
     * Get all the reponses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReponseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Reponses");
        return reponseRepository.findAll(pageable)
            .map(reponseMapper::toDto);
    }

    /**
     * Get one reponse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ReponseDTO findOne(Long id) {
        log.debug("Request to get Reponse : {}", id);
        Reponse reponse = reponseRepository.findOne(id);
        return reponseMapper.toDto(reponse);
    }

    /**
     * Delete the reponse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reponse : {}", id);
        reponseRepository.delete(id);
    }
}
