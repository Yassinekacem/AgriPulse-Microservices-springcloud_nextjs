package tn.itbs.tp.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.itbs.tp.kafka.AlerteEvent;
import tn.itbs.tp.models.Alerte;
import tn.itbs.tp.repositories.AlerteRepo;

@Service
public class AlerteService {

    @Autowired
    private AlerteRepo alerteRepo;

    public Alerte enregistrer(AlerteEvent event) {
        Alerte a = new Alerte();
        a.setParcelleId(event.getParcelleId());
        a.setType(event.getType());
        a.setMessage(event.getMessage());
        a.setDateEvent(event.getDate());
        a.setDateReception(Instant.now());
        return alerteRepo.save(a);
    }
}
