package tn.itbs.tp.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.itbs.tp.models.Parcelle;

@FeignClient(name = "MSExploitations", url = "http://localhost:9096/api/parcelles")
public interface ParcelleFeign {

    @GetMapping("/{id}")
    Parcelle getById(@PathVariable("id") int id);
}
