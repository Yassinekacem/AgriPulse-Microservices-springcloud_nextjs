package tn.itbs.tp.kafka;

import java.time.Instant;
import lombok.Data;

@Data
public class AlerteEvent {
    private Integer parcelleId;
    private String type;
    private String message;
    private Instant date;
}
