package tn.itbs.tp.models;

import java.time.Instant;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Alerte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer parcelleId;
    private String type;

    @Column(length = 1000)
    private String message;

    private Instant dateEvent;      // date dans l'event (envoyée par MSSupervision)
    private Instant dateReception;  // date de stockage dans MSNotification
}
