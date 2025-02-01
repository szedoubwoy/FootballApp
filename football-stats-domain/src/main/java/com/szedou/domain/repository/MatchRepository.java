package com.szedou.domain.repository;

import com.szedou.domain.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    @Query("SELECT m FROM Match m WHERE m.isLamak = true AND m.league.id = :leagueId AND m.season = :season")
    List<Match> findLamaksByLeagueAndSeason(Long leagueId, String season);

    @Query("SELECT m FROM Match m WHERE m.isLamak = true AND " +
            "(m.homeTeam.id = :teamId OR m.awayTeam.id = :teamId)")
    List<Match> findLamaksByTeam(Long teamId);

    @Query("SELECT m FROM Match m WHERE m.isLamak = true AND " +
            "((m.homeTeam.id = :teamA AND m.awayTeam.id = :teamB) OR " +
            "(m.homeTeam.id = :teamB AND m.awayTeam.id = :teamA))")
    List<Match> findHeadToHeadLamaks(Long teamA, Long teamB);
    List<Match> findBySeasonOrderByMatchDateDesc(String season);
    List<Match> findByLeagueIdAndSeasonOrderByMatchDateDesc(Long leagueId, String season);
}