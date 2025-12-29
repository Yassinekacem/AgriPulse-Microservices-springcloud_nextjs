package tn.itbs.tp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.itbs.tp.models.Alerte;

public interface AlerteRepo extends JpaRepository<Alerte, Long> {
}
