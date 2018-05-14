package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.CentreService;
import ma.rbsmr.jhipster.domain.Centre;
import ma.rbsmr.jhipster.repository.CentreRepository;
import ma.rbsmr.jhipster.service.dto.CentreDTO;
import ma.rbsmr.jhipster.service.mapper.CentreMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Centre.
 */
@Service
@Transactional
public class CentreServiceImpl implements CentreService {

    private final Logger log = LoggerFactory.getLogger(CentreServiceImpl.class);

    private final CentreRepository centreRepository;

    private final CentreMapper centreMapper;

    public CentreServiceImpl(CentreRepository centreRepository, CentreMapper centreMapper) {
        this.centreRepository = centreRepository;
        this.centreMapper = centreMapper;
    }

    /**
     * Save a centre.
     *
     * @param centreDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CentreDTO save(CentreDTO centreDTO) {
        log.debug("Request to save Centre : {}", centreDTO);
        Centre centre = centreMapper.toEntity(centreDTO);
        centre = centreRepository.save(centre);
        return centreMapper.toDto(centre);
    }

    /**
     * Get all the centres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CentreDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Centres");
        return centreRepository.findAll(pageable)
            .map(centreMapper::toDto);
    }

    /**
     * Get one centre by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CentreDTO findOne(Long id) {
        log.debug("Request to get Centre : {}", id);
        Centre centre = centreRepository.findOne(id);
        return centreMapper.toDto(centre);
    }

    /**
     * Delete the centre by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Centre : {}", id);
        centreRepository.delete(id);
    }
}
