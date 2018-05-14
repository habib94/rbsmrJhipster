package ma.rbsmr.jhipster.service.impl;

import ma.rbsmr.jhipster.service.DemandeChangementService;
import ma.rbsmr.jhipster.domain.DemandeChangement;
import ma.rbsmr.jhipster.repository.DemandeChangementRepository;
import ma.rbsmr.jhipster.service.dto.DemandeChangementDTO;
import ma.rbsmr.jhipster.service.mapper.DemandeChangementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing DemandeChangement.
 */
@Service
@Transactional
public class DemandeChangementServiceImpl implements DemandeChangementService {

    private final Logger log = LoggerFactory.getLogger(DemandeChangementServiceImpl.class);

    private final DemandeChangementRepository demandeChangementRepository;

    private final DemandeChangementMapper demandeChangementMapper;

    public DemandeChangementServiceImpl(DemandeChangementRepository demandeChangementRepository, DemandeChangementMapper demandeChangementMapper) {
        this.demandeChangementRepository = demandeChangementRepository;
        this.demandeChangementMapper = demandeChangementMapper;
    }

    /**
     * Save a demandeChangement.
     *
     * @param demandeChangementDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DemandeChangementDTO save(DemandeChangementDTO demandeChangementDTO) {
        log.debug("Request to save DemandeChangement : {}", demandeChangementDTO);
        DemandeChangement demandeChangement = demandeChangementMapper.toEntity(demandeChangementDTO);
        demandeChangement = demandeChangementRepository.save(demandeChangement);
        return demandeChangementMapper.toDto(demandeChangement);
    }

    /**
     * Get all the demandeChangements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DemandeChangementDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DemandeChangements");
        return demandeChangementRepository.findAll(pageable)
            .map(demandeChangementMapper::toDto);
    }

    /**
     * Get one demandeChangement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DemandeChangementDTO findOne(Long id) {
        log.debug("Request to get DemandeChangement : {}", id);
        DemandeChangement demandeChangement = demandeChangementRepository.findOne(id);
        return demandeChangementMapper.toDto(demandeChangement);
    }

    /**
     * Delete the demandeChangement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DemandeChangement : {}", id);
        demandeChangementRepository.delete(id);
    }
}
