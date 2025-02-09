package com.szedou.domain.mapper;

import com.szedou.domain.dto.LeagueDTO;
import com.szedou.domain.model.League;
import org.springframework.stereotype.Component;

@Component
public class LeagueMapper {

    public LeagueDTO toDTO(League league) {
        return LeagueDTO.builder()
                .id(league.getId())
                .name(league.getName())
                .country(league.getCountry().getName())
                .apiId(league.getApiId())
                .build();
    }

    public League toEntity(LeagueDTO leagueDTO) {
        League league = new League();
        league.setId(leagueDTO.getId());
        league.setName(leagueDTO.getName());
        // Set other fields as necessary
        return league;
    }
}