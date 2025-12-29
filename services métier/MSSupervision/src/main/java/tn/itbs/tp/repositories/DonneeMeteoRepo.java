package tn.itbs.tp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.itbs.tp.models.DonneeMeteo;

import java.util.List;

public interface DonneeMeteoRepo extends JpaRepository<DonneeMeteo, Integer> {
    List<DonneeMeteo> findByParcelleId(Integer parcelleId);
}
