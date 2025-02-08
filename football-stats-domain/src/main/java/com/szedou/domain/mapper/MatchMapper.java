package com.szedou.domain.mapper;

import com.szedou.domain.dto.MatchDTO;
import com.szedou.domain.model.Match;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MatchMapper {

    private final TeamMapper teamMapper;

    public MatchDTO toDTO(Match match) {
        return MatchDTO.builder()
                .id(match.getId())
                .homeTeam(teamMapper.toDTO(match.getHomeTeam()))
                .awayTeam(teamMapper.toDTO(match.getAwayTeam()))
                .homeScoreHT(match.getHomeScoreHT())
                .awayScoreHT(match.getAwayScoreHT())
                .homeScoreFT(match.getHomeScoreFT())
                .awayScoreFT(match.getAwayScoreFT())
                .matchDate(match.getMatchDate())
                .referee(match.getReferee())
                .season(match.getSeason())
                .isLamak(match.isLamak())
                .build();
    }

    public Match toEntity(MatchDTO matchDTO) {
        Match match = new Match();
        match.setId(matchDTO.getId());
        match.setHomeTeam(teamMapper.toEntity(matchDTO.getHomeTeam()));
        match.setAwayTeam(teamMapper.toEntity(matchDTO.getAwayTeam()));
        match.setHomeScoreHT(matchDTO.getHomeScoreHT());
        match.setAwayScoreHT(matchDTO.getAwayScoreHT());
        match.setHomeScoreFT(matchDTO.getHomeScoreFT());
        match.setAwayScoreFT(matchDTO.getAwayScoreFT());
        match.setMatchDate(matchDTO.getMatchDate());
        match.setReferee(matchDTO.getReferee());
        match.setSeason(matchDTO.getSeason());
        match.setLamak(matchDTO.isLamak());
        return match;
    }
}