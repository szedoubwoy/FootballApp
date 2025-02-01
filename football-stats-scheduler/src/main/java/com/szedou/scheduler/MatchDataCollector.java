package com.szedou.scheduler;

import com.szedou.api.FootballApiClient;
import com.szedou.domain.model.League;
import com.szedou.domain.model.Match;
import com.szedou.domain.service.LeagueService;
import com.szedou.domain.service.MatchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@EnableScheduling
@Slf4j
@RequiredArgsConstructor
public class MatchDataCollector {
    private final FootballApiClient footballApiClient;
    private final MatchService matchService;
    private final LeagueService leagueService;

    @Scheduled(cron = "0 0 3 * * *") // Runs at 3 AM every day
    public void collectDailyMatches() {
        log.info("Starting daily match collection");
        try {
            List<League> activeLeagues = leagueService.getActiveLeagues();
            String currentSeason = getCurrentSeason();

            for (League league : activeLeagues) {
                try {
                    List<Match> matches = footballApiClient.fetchMatchesByLeague(
                            league.getApiId(),
                            currentSeason
                    );
                    matchService.saveMatches(matches);
                    log.info("Successfully collected {} matches for league {}",
                            matches.size(), league.getName());
                } catch (Exception e) {
                    log.error("Error collecting matches for league {}: {}",
                            league.getName(), e.getMessage(), e);
                }
            }
        } catch (Exception e) {
            log.error("Error in daily match collection: {}", e.getMessage(), e);
        }
    }

    private String getCurrentSeason() {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        return now.getMonthValue() >= 7 ? String.valueOf(year) : String.valueOf(year - 1);
    }
}