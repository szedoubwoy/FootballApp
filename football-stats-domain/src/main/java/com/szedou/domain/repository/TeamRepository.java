package com.szedou.domain.repository;

import com.szedou.domain.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByName(String name);
    List<Team> findByCountryId(Long countryId);
    List<Team> findByLeagueId(Long leagueId);
}