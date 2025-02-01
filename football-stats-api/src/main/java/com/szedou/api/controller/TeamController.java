package com.szedou.api.controller;

import com.szedou.domain.dto.TeamDTO;
import com.szedou.domain.service.TeamService;
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
@RequestMapping("/api/v1/teams")
@RequiredArgsConstructor
@Tag(name = "Team Controller", description = "APIs for team management")
public class TeamController {
    private final TeamService teamService;

    @Operation(summary = "Get all teams by country")
    @GetMapping("/country/{countryId}")
    public ResponseEntity<List<TeamDTO>> getTeamsByCountry(
            @PathVariable @Positive Long countryId) {
        return ResponseEntity.ok(teamService.getTeamsByCountry(countryId));
    }

    @Operation(summary = "Get team by ID")
    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeamById(
            @PathVariable @Positive Long id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }
}