package tn.itbs.tp.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, AlerteEvent> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, AlerteEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void envoyerAlerte(AlerteEvent event) {
        kafkaTemplate.send("alertes.supervision", event.getParcelleId().toString(), event);
    }
}
