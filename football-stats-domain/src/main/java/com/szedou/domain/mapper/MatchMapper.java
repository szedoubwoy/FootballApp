package com.szedou.domain.mapper;

import com.szedou.domain.dto.MatchDTO;
import com.szedou.domain.model.Match;
import com.szedou.domain.model.Team;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MatchMapper {

    public MatchDTO toDTO(Match match) {
        return MatchDTO.builder()
                .id(match.getId())
                .homeTeam(TeamDTO.builder()
                        .id(match.getHomeTeam().getId())
                        .name(match.getHomeTeam().getName())
                        .shortName(match.getHomeTeam().getShortName())
                        .country(match.getHomeTeam().getCountry().getName())
                        .build())
                .awayTeam(TeamDTO.builder()
                        .id(match.getAwayTeam().getId())
                        .name(match.getAwayTeam().getName())
                        .shortName(match.getAwayTeam().getShortName())
                        .country(match.getAwayTeam().getCountry().getName())
                        .build())
                .homeScoreHT(match.getHomeScoreHT())
                .awayScoreHT(match.getAwayScoreHT())
                .homeScoreFT(match.getHomeScoreFT())
                .awayScoreFT(match.getAwayScoreFT())
                .matchDate(match.getMatchDate().toString())
                .referee(match.getReferee())
                .season(match.getSeason())
                .isLamak(match.isLamak())
                .build();
    }

    public Match toEntity(MatchDTO matchDTO) {
        Match match = new Match();
        match.setId(matchDTO.getId());
        match.setHomeTeam(new Team());
        match.getHomeTeam().setId(matchDTO.getHomeTeam().getId());
        match.setAwayTeam(new Team());
        match.getAwayTeam().setId(matchDTO.getAwayTeam().getId());
        match.setHomeScoreHT(matchDTO.getHomeScoreHT());
        match.setAwayScoreHT(matchDTO.getAwayScoreHT());
        match.setHomeScoreFT(matchDTO.getHomeScoreFT());
        match.setAwayScoreFT(matchDTO.getAwayScoreFT());
        match.setMatchDate(LocalDateTime.parse(matchDTO.getMatchDate()));
        match.setReferee(matchDTO.getReferee());
        match.setSeason(matchDTO.getSeason());
        match.setLamak(matchDTO.isLamak());
        return match;
    }
}