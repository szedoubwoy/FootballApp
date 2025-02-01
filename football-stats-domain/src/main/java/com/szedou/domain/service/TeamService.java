package com.szedou.domain.service;

import com.szedou.domain.dto.TeamDTO;
import com.szedou.domain.exception.ResourceNotFoundException;
import com.szedou.domain.mapper.TeamMapper;
import com.szedou.domain.repository.TeamRepository;
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
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    public List<TeamDTO> getTeamsByCountry(Long countryId) {
        return teamRepository.findByCountryId(countryId)
                .stream()
                .map(teamMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TeamDTO getTeamById(Long id) {
        return teamRepository.findById(id)
                .map(teamMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
    }
}