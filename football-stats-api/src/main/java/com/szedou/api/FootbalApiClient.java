package com.szedou.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.szedou.common.exception.ApiClientException;
import com.szedou.domain.model.Match;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;

@Service
@Slf4j
public class FootballApiClient {
    private final WebClient webClient;

    public FootballApiClient(
            @Value("${football.api.url}") String apiUrl,
            @Value("${football.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("APIkey", apiKey)
                .build();
        ObjectMapper objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule());
    }

    public List<Match> fetchMatchesByLeague(String leagueId, String season) {
        log.info("Fetching matches for league {} season {}", leagueId, season);
        try {
            String response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/")
                            .queryParam("action", "get_events")
                            .queryParam("league_id", leagueId)
                            .queryParam("from", season + "-07-01")
                            .queryParam("to", (Integer.parseInt(season) + 1) + "-06-30")
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseMatches(response);
        } catch (Exception e) {
            log.error("Error fetching matches", e);
            throw new ApiClientException("Failed to fetch matches", e);
        }
    }

    private List<Match> parseMatches(String response) {
        // Implementation of response parsing
    }
}