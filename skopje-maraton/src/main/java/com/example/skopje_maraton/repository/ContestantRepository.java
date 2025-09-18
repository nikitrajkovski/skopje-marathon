package com.example.skopje_maraton.repository;

import com.example.skopje_maraton.model.Contestant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContestantRepository extends JpaRepository<Contestant, Long> {
    Optional<Contestant> findByEmail(String email);
    Optional<Contestant> findByRegistrationNum(String registrationNum);
    List<Contestant> findByStartingNumIsNotNull();
}
