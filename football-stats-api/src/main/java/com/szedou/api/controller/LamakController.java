package com.szedou.api.controller;

import com.szedou.domain.dto.MatchDTO;
import com.szedou.domain.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LamakController {
    private final MatchService matchService;

    @GetMapping("/leagues/{leagueId}/lamaks")
    public ResponseEntity<List<MatchDTO>> getLamaksByLeague(
            @PathVariable Long leagueId,
            @RequestParam String season) {
        return ResponseEntity.ok(matchService.getLamaksByLeague(leagueId, season));
    }

    @GetMapping("/teams/{teamId}/lamaks")
    public ResponseEntity<List<MatchDTO>> getTeamLamaks(
            @PathVariable Long teamId) {
        return ResponseEntity.ok(matchService.getTeamLamaks(teamId));
    }
}