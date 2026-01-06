package tn.itbs.tp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.itbs.tp.models.DonneeCapteur;
import tn.itbs.tp.models.DonneeMeteo;
import tn.itbs.tp.services.SupervisionService;

import java.util.List;

@RestController
@RequestMapping("/api/supervision")
public class SupervisionController {

    @Autowired
    private SupervisionService service;

    @PostMapping("/capteurs")
    public Object addCapteur(@RequestBody DonneeCapteur d) {
        return service.ajouterCapteur(d);
    }

    @PostMapping("/meteo")
    public Object addMeteo(@RequestBody DonneeMeteo d) {
        return service.ajouterMeteo(d);
    }

    @GetMapping("/capteurs/parcelle/{parcelleId}")
    public List<DonneeCapteur> capteurs(@PathVariable Integer parcelleId) {
        return service.capteursParParcelle(parcelleId);
    }

    @GetMapping("/meteo/parcelle/{parcelleId}")
    public List<DonneeMeteo> meteo(@PathVariable Integer parcelleId) {
        return service.meteoParParcelle(parcelleId);
    }
}
