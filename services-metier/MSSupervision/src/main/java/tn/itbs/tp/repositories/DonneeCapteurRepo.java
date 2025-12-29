package tn.itbs.tp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.itbs.tp.models.DonneeCapteur;

import java.util.List;

public interface DonneeCapteurRepo extends JpaRepository<DonneeCapteur, Integer> {
    List<DonneeCapteur> findByParcelleId(Integer parcelleId);
}
