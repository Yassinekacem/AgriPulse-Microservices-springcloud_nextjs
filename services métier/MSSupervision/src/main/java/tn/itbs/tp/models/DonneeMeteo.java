package tn.itbs.tp.models;

import java.time.Instant;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DonneeMeteo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer parcelleId;
    private Double temperature;
    private Double humiditeAir;
    private Double pluviometrie;
    private Instant date;
}
