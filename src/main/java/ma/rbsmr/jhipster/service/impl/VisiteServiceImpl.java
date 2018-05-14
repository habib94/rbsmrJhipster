package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.VisiteService;
import ma.rbsmr.jhipster.domain.Visite;
import ma.rbsmr.jhipster.repository.VisiteRepository;
import ma.rbsmr.jhipster.service.dto.VisiteDTO;
import ma.rbsmr.jhipster.service.mapper.VisiteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Visite.
 */
@Service
@Transactional
public class VisiteServiceImpl implements VisiteService {

    private final Logger log = LoggerFactory.getLogger(VisiteServiceImpl.class);

    private final VisiteRepository visiteRepository;

    private final VisiteMapper visiteMapper;

    public VisiteServiceImpl(VisiteRepository visiteRepository, VisiteMapper visiteMapper) {
        this.visiteRepository = visiteRepository;
        this.visiteMapper = visiteMapper;
    }

    /**
     * Save a visite.
     *
     * @param visiteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VisiteDTO save(VisiteDTO visiteDTO) {
        log.debug("Request to save Visite : {}", visiteDTO);
        Visite visite = visiteMapper.toEntity(visiteDTO);
        visite = visiteRepository.save(visite);
        return visiteMapper.toDto(visite);
    }

    /**
     * Get all the visites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VisiteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Visites");
        return visiteRepository.findAll(pageable)
            .map(visiteMapper::toDto);
    }

    /**
     * Get one visite by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VisiteDTO findOne(Long id) {
        log.debug("Request to get Visite : {}", id);
        Visite visite = visiteRepository.findOne(id);
        return visiteMapper.toDto(visite);
    }

    /**
     * Delete the visite by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Visite : {}", id);
        visiteRepository.delete(id);
    }
}
