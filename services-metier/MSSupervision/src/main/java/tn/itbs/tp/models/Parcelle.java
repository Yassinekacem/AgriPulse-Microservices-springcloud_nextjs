package tn.itbs.tp.models;

import lombok.Data;

@Data
public class Parcelle {
    private Integer id;
    private String culture;
    private Double surface;
    private String etat;
}
