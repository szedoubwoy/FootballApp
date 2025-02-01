package com.szedou.domain.repository;

import com.szedou.domain.model.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    List<League> findByCountryId(Long countryId);
    Optional<League> findByApiId(String apiId);
    List<League> findByCountryIdOrderByName(Long countryId);
    boolean existsByApiId(String apiId);

}