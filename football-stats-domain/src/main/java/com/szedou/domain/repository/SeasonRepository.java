package com.szedou.domain.repository;

import com.szedou.domain.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findByLeaguesId(Long leagueId);
    Optional<Season> findByStartDateBeforeAndEndDateAfter(LocalDate date, LocalDate sameDate);
}