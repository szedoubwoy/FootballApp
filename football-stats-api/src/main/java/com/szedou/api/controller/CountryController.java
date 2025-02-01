package com.szedou.api.controller;

import com.szedou.domain.dto.CountryDTO;
import com.szedou.domain.service.CountryService;
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
@RequestMapping("/api/v1/countries")
@RequiredArgsConstructor
@Tag(name = "Country Controller", description = "APIs for country management")
public class CountryController {
    private final CountryService countryService;

    @Operation(summary = "Get all countries")
    @GetMapping
    public ResponseEntity<List<CountryDTO>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @Operation(summary = "Get country by ID")
    @GetMapping("/{id}")
    public ResponseEntity<CountryDTO> getCountryById(
            @PathVariable @Positive Long id) {
        return ResponseEntity.ok(countryService.getCountryById(id));
    }
}