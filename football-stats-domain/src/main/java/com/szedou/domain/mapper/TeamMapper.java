package com.szedou.domain.mapper;

import com.szedou.domain.dto.TeamDTO;
import com.szedou.domain.model.Team;

public class TeamMapper {
    public TeamDTO toDTO(Team team) {
        return TeamDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .shortName(team.getShortName())
                .countryName(team.getCountry().getName())
                .build();
    }
}