package com.szedou.domain.service;

import com.szedou.domain.dto.LeagueDTO;
import com.szedou.domain.mapper.LeagueMapper;
import com.szedou.domain.model.League;
import com.szedou.domain.repository.LeagueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LeagueService {
    private final LeagueRepository leagueRepository;
    private final LeagueMapper leagueMapper;

    public List<LeagueDTO> getLeaguesByCountry(Long countryId) {
        return leagueRepository.findByCountryId(countryId)
                .stream()
                .map(leagueMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Add this method for scheduler
    public List<League> getActiveLeagues() {
        return leagueRepository.findAll();
    }
}