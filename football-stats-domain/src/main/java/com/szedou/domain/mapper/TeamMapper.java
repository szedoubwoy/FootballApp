package com.szedou.domain.mapper;

import com.szedou.domain.dto.TeamDTO;
import com.szedou.domain.model.Team;
import org.springframework.stereotype.Component;

@Component
public class TeamMapper {
    public TeamDTO toDTO(Team team) {
        return TeamDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .shortName(team.getShortName())
                .countryName(team.getCountry().getName())
                .build();
    }

    public Team toEntity(TeamDTO teamDTO) {
        Team team = new Team();
        team.setId(teamDTO.getId());
        team.setName(teamDTO.getName());
        team.setShortName(teamDTO.getShortName());
        // Set other fields as necessary
        return team;
    }
}