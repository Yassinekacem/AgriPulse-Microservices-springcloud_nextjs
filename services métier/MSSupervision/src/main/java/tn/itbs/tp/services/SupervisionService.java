package tn.itbs.tp.services;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.itbs.tp.feign.ParcelleFeign;
import tn.itbs.tp.kafka.AlerteEvent;
import tn.itbs.tp.kafka.KafkaProducerService;
import tn.itbs.tp.models.DonneeCapteur;
import tn.itbs.tp.models.DonneeMeteo;
import tn.itbs.tp.models.MessageResponse;
import tn.itbs.tp.models.Parcelle;
import tn.itbs.tp.repositories.DonneeCapteurRepo;
import tn.itbs.tp.repositories.DonneeMeteoRepo;

import java.time.Instant;
import java.util.List;

@Service
public class SupervisionService {

    @Autowired
    private DonneeCapteurRepo capteurRepo;

    @Autowired
    private DonneeMeteoRepo meteoRepo;

    @Autowired
    private ParcelleFeign parcelleFeign;

    @Autowired
    private KafkaProducerService kafkaProducer;

    public Object ajouterCapteur(DonneeCapteur d) {
        Parcelle parcelle = getParcelleOuNull(d.getParcelleId());
        if (parcelle == null) {
            return new MessageResponse("Parcelle inexistante avec id=" + d.getParcelleId());
        }

        d.setId(null);
        if (d.getDate() == null) {
            d.setDate(Instant.now());
        }

        DonneeCapteur saved = capteurRepo.save(d);

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

    public Object ajouterMeteo(DonneeMeteo d) {
        Parcelle parcelle = getParcelleOuNull(d.getParcelleId());
        if (parcelle == null) {
            return new MessageResponse("Parcelle inexistante avec id=" + d.getParcelleId());
        }

        d.setId(null);
        if (d.getDate() == null) {
            d.setDate(Instant.now());
        }

        return meteoRepo.save(d);
    }

    public List<DonneeCapteur> capteursParParcelle(Integer parcelleId) {
        return capteurRepo.findByParcelleId(parcelleId);
    }

    public List<DonneeMeteo> meteoParParcelle(Integer parcelleId) {
        return meteoRepo.findByParcelleId(parcelleId);
    }

    private Parcelle getParcelleOuNull(Integer parcelleId) {
        try {
            return parcelleFeign.getById(parcelleId);
        } catch (FeignException.NotFound ex) {
            return null;
        } catch (FeignException ex) {
            return null;
        }
    }
}
