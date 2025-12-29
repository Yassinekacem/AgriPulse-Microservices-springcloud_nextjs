package tn.itbs.tp.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.itbs.tp.feign.ParcelleFeign;
import tn.itbs.tp.kafka.AlerteEvent;
import tn.itbs.tp.kafka.KafkaProducerService;
import tn.itbs.tp.models.DonneeCapteur;
import tn.itbs.tp.models.DonneeMeteo;
import tn.itbs.tp.models.Parcelle;
import tn.itbs.tp.repositories.DonneeCapteurRepo;
import tn.itbs.tp.repositories.DonneeMeteoRepo;

import java.time.Instant;
import java.util.List;

@Service
public class SupervisionService {

    private final DonneeCapteurRepo capteurRepo;
    private final DonneeMeteoRepo meteoRepo;
    private final ParcelleFeign parcelleFeign;
    private final KafkaProducerService kafkaProducer;

    public SupervisionService(DonneeCapteurRepo capteurRepo,
                              DonneeMeteoRepo meteoRepo,
                              ParcelleFeign parcelleFeign,
                              KafkaProducerService kafkaProducer) {
        this.capteurRepo = capteurRepo;
        this.meteoRepo = meteoRepo;
        this.parcelleFeign = parcelleFeign;
        this.kafkaProducer = kafkaProducer;
    }

    public DonneeCapteur ajouterCapteur(DonneeCapteur d) {
        // Vérif synchrone que la parcelle existe
        Parcelle parcelle = parcelleFeign.getById(d.getParcelleId());
        if (parcelle == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parcelle inexistante");
        }

        d.setId(null);
        if (d.getDate() == null) d.setDate(Instant.now());
        DonneeCapteur saved = capteurRepo.save(d);

        // Détection anomalie (exemple simple)
        if (saved.getValeur() != null && saved.getValeur() < 0) {
            AlerteEvent event = new AlerteEvent();
            event.setParcelleId(saved.getParcelleId());
            event.setType("ANOMALIE_CAPTEUR");
            event.setMessage("Valeur négative détectée pour type=" + saved.getType());
            event.setDate(Instant.now());
            kafkaProducer.envoyerAlerte(event);
        }

        return saved;
    }

    public DonneeMeteo ajouterMeteo(DonneeMeteo d) {
        Parcelle parcelle = parcelleFeign.getById(d.getParcelleId());
        if (parcelle == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parcelle inexistante");
        }

        d.setId(null);
        if (d.getDate() == null) d.setDate(Instant.now());
        return meteoRepo.save(d);
    }

    public List<DonneeCapteur> capteursParParcelle(Integer parcelleId) {
        return capteurRepo.findByParcelleId(parcelleId);
    }

    public List<DonneeMeteo> meteoParParcelle(Integer parcelleId) {
        return meteoRepo.findByParcelleId(parcelleId);
    }
}
