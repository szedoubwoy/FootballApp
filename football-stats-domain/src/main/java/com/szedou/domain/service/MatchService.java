package com.szedou.domain.service;

import com.szedou.domain.dto.MatchDTO;
import com.szedou.domain.mapper.MatchMapper;
import com.szedou.domain.model.Match;
import com.szedou.domain.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;

    @Transactional(readOnly = true)
    public List<MatchDTO> getLamaksByLeague(Long leagueId, String season) {
        return matchRepository.findLamaksByLeagueAndSeason(leagueId, season)
                .stream()
                .map(matchMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MatchDTO> getTeamLamaks(Long teamId) {
        return matchRepository.findLamaksByTeam(teamId)
                .stream()
                .map(matchMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MatchDTO> getHeadToHeadLamaks(Long teamA, Long teamB) {
        return matchRepository.findHeadToHeadLamaks(teamA, teamB)
                .stream()
                .map(matchMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MatchDTO getLamakDetails(Long matchId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new IllegalArgumentException("Match not found with id: " + matchId));
        return matchMapper.toDTO(match);
    }

    @Transactional
    public void saveMatches(List<Match> matches) {
        log.info("Saving {} matches", matches.size());
        matchRepository.saveAll(matches);
    }
}