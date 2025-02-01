package com.szedou.domain.service;

import com.szedou.domain.dto.SeasonDTO;
import com.szedou.domain.exception.ResourceNotFoundException;
import com.szedou.domain.mapper.SeasonMapper;
import com.szedou.domain.repository.SeasonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SeasonService {
    private final SeasonRepository seasonRepository;
    private final SeasonMapper seasonMapper;

    public List<SeasonDTO> getAllSeasons() {
        return seasonRepository.findAll().stream()
                .map(seasonMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SeasonDTO getSeasonById(Long id) {
        return seasonRepository.findById(id)
                .map(seasonMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Season not found"));
    }

    public List<SeasonDTO> getSeasonsByLeague(Long leagueId) {
        return seasonRepository.findByLeaguesId(leagueId).stream()
                .map(seasonMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SeasonDTO getCurrentSeason() {
        LocalDate now = LocalDate.now();
        return seasonRepository.findByStartDateBeforeAndEndDateAfter(now, now)
                .map(seasonMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Current season not found"));
    }
}