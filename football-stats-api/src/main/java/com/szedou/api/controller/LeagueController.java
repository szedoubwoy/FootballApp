package com.szedou.api.controller;
import com.szedou.domain.dto.LeagueDTO;
import com.szedou.domain.service.LeagueService;
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
@RequestMapping("/api/v1/leagues")
@RequiredArgsConstructor
@Tag(name = "League Controller", description = "APIs for league management")
public class LeagueController {
    private final LeagueService leagueService;

    @Operation(summary = "Get leagues by country")
    @GetMapping("/country/{countryId}")
    public ResponseEntity<List<LeagueDTO>> getLeaguesByCountry(
            @PathVariable @Positive Long countryId) {
        return ResponseEntity.ok(leagueService.getLeaguesByCountry(countryId));
    }
}