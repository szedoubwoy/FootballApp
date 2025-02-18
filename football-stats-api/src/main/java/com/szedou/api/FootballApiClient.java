package com.szedou.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.szedou.common.exception.ApiClientException;
import com.szedou.domain.model.Country;
import com.szedou.domain.model.League;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class FootballApiClient {
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public FootballApiClient(
            @Value("${football.api.url}") String apiUrl,
            @Value("${football.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("APIkey", apiKey)
                .build();

        this.objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule());
    }

    public List<Country> fetchAvailableCountries() {
        log.info("Fetching available countries");
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("action", "get_countries")
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .map(this::parseCountries)
                    .block();
        } catch (Exception e) {
            log.error("Error fetching countries", e);
            throw new ApiClientException("Failed to fetch countries", e);
        }
    }

    public List<League> fetchLeaguesByCountry(String countryId) {
        log.info("Fetching leagues for country {}", countryId);
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("action", "get_leagues")
                            .queryParam("country_id", countryId)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .map(this::parseLeagues)
                    .block();
        } catch (Exception e) {
            log.error("Error fetching leagues for country {}", countryId, e);
            throw new ApiClientException("Failed to fetch leagues", e);
        }
    }

    private List<Country> parseCountries(String response) {
        try {
            return objectMapper.readValue(response,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, Country.class));
        } catch (Exception e) {
            throw new ApiClientException("Failed to parse countries response", e);
        }
    }

    private List<League> parseLeagues(String response) {
        try {
            return objectMapper.readValue(response,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, League.class));
        } catch (Exception e) {
            throw new ApiClientException("Failed to parse leagues response", e);
        }
    }
}