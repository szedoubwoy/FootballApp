package com.szedou.api.controller;

import com.szedou.domain.dto.MatchDTO;
import com.szedou.domain.service.MatchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/matches")
@RequiredArgsConstructor
@Tag(name = "Match Controller", description = "APIs for match and lamak management")
public class MatchController {
    private final MatchService matchService;

    @Operation(summary = "Get Lamaks by league")
    @GetMapping("/leagues/{leagueId}/lamaks")
    public ResponseEntity<List<MatchDTO>> getLamaksByLeague(
            @PathVariable @Positive Long leagueId,
            @RequestParam String season) {
        return ResponseEntity.ok(matchService.getLamaksByLeague(leagueId, season));
    }

    @Operation(summary = "Get Lamaks by team")
    @GetMapping("/teams/{teamId}/lamaks")
    public ResponseEntity<List<MatchDTO>> getTeamLamaks(
            @PathVariable @Positive Long teamId) {
        return ResponseEntity.ok(matchService.getTeamLamaks(teamId));
    }

    @Operation(summary = "Get head-to-head Lamaks")
    @GetMapping("/lamaks/head-to-head")
    public ResponseEntity<List<MatchDTO>> getHeadToHeadLamaks(
            @RequestParam @Positive Long teamA,
            @RequestParam @Positive Long teamB) {
        return ResponseEntity.ok(matchService.getHeadToHeadLamaks(teamA, teamB));
    }
}