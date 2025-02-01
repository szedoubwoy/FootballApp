package com.szedou.api.controller;

import com.szedou.domain.dto.SeasonDTO;
import com.szedou.domain.service.SeasonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seasons")
@RequiredArgsConstructor
@Tag(name = "Season Controller", description = "APIs for season management")
public class SeasonController {
    private final SeasonService seasonService;

    @Operation(summary = "Get all seasons")
    @GetMapping
    public ResponseEntity<List<SeasonDTO>> getAllSeasons() {
        return ResponseEntity.ok(seasonService.getAllSeasons());
    }

    @Operation(summary = "Get season by ID")
    @GetMapping("/{id}")
    public ResponseEntity<SeasonDTO> getSeasonById(
            @PathVariable @Positive Long id) {
        return ResponseEntity.ok(seasonService.getSeasonById(id));
    }

    @Operation(summary = "Get seasons by league")
    @GetMapping("/league/{leagueId}")
    public ResponseEntity<List<SeasonDTO>> getSeasonsByLeague(
            @PathVariable @Positive Long leagueId) {
        return ResponseEntity.ok(seasonService.getSeasonsByLeague(leagueId));
    }

    @Operation(summary = "Get current season")
    @GetMapping("/current")
    public ResponseEntity<SeasonDTO> getCurrentSeason() {
        return ResponseEntity.ok(seasonService.getCurrentSeason());
    }
}