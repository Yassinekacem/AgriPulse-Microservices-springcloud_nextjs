package tn.itbs.tp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.itbs.tp.models.Alerte;
import tn.itbs.tp.repositories.AlerteRepo;

import java.util.List;

@RestController
@RequestMapping("/api/alertes")
public class AlerteController {

    @Autowired
    private AlerteRepo alerteRepo;

    @GetMapping
    public List<Alerte> getAll() {
        return alerteRepo.findAll();
    }
}
