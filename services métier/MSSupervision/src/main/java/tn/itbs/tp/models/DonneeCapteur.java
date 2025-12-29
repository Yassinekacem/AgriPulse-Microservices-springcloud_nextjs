package tn.itbs.tp.models;

import java.time.Instant;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DonneeCapteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer parcelleId;
    private String type;     // ex: "HUMIDITE_SOL", "PH", "TEMP_SOL"
    private Double valeur;
    private Instant date;
}
