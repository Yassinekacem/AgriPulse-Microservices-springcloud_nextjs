package tn.itbs.tp.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tn.itbs.tp.models.Alerte;
import tn.itbs.tp.services.AlerteService;

@Slf4j
@Service
public class AlerteConsumer {

    private final AlerteService alerteService;

    public AlerteConsumer(AlerteService alerteService) {
        this.alerteService = alerteService;
    }

    @KafkaListener(topics = "alertes.supervision", groupId = "ms-notification-group")
    public void consommer(AlerteEvent event) {
        Alerte saved = alerteService.enregistrer(event);
        log.warn("🔔 Alerte reçue et sauvegardée: id={}, parcelleId={}, type={}",
                saved.getId(), saved.getParcelleId(), saved.getType());
    }
}
