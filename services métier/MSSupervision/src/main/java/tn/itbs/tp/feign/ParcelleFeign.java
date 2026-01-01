package tn.itbs.tp.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.itbs.tp.models.Parcelle;

@FeignClient(name = "MSExploitations")
public interface ParcelleFeign {

  @GetMapping("/api/parcelles/{id}")
  Parcelle getById(@PathVariable("id") int id);
}

