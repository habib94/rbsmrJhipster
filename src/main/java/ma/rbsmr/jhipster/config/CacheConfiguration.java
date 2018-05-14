package ma.rbsmr.jhipster.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(ma.rbsmr.jhipster.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Centre.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.DemandeChangement.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Utilisateur.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Utilisateur.class.getName() + ".centres", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Utilisateur.class.getName() + ".demandeChangementsMedecins", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Utilisateur.class.getName() + ".demandeChangementsARCS", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Role.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.EtatFormulaire.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Formulaire.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.TemplateFormulaire.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.TemplateFormulaire.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Patient.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Patient.class.getName() + ".etatFormulaires", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Reponse.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Question.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Question.class.getName() + ".validations", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Question.class.getName() + ".questionsInterieurs", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Visite.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.Visite.class.getName() + ".formulaires", jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.QuestionValidation.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.PatientRemoveAudit.class.getName(), jcacheConfiguration);
            cm.createCache(ma.rbsmr.jhipster.domain.ReponseNewAudit.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
