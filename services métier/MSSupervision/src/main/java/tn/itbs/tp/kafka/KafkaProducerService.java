package tn.itbs.tp.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, AlerteEvent> kafkaTemplate;

    public void envoyerAlerte(AlerteEvent event) {
        kafkaTemplate.send("alertes.supervision", event.getParcelleId().toString(), event);
    }
}
