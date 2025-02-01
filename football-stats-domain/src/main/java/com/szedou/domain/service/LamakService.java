package com.szedou.domain.service;

import com.szedou.domain.dto.MatchDTO;
import com.szedou.domain.mapper.MatchMapper;
import com.szedou.domain.repository.MatchRepository;
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
public class LamakService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;

    public List<MatchDTO> findLamaksByLeagueAndSeason(Long leagueId, String season) {
        return matchRepository.findLamaksByLeagueAndSeason(leagueId, season)
                .stream()
                .map(matchMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<MatchDTO> findHeadToHeadLamaks(Long teamA, Long teamB) {
        return matchRepository.findHeadToHeadLamaks(teamA, teamB)
                .stream()
                .map(matchMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<MatchDTO> findTeamLamaks(Long teamId) {
        return matchRepository.findLamaksByTeam(teamId)
                .stream()
                .map(matchMapper::toDTO)
                .collect(Collectors.toList());
    }
}
