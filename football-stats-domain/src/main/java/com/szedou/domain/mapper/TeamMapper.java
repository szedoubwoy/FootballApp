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
                .country(team.getCountry().getName())
                .league(team.getLeague() != null ? team.getLeague().getName() : null)
                .build();
    }

    public Team toEntity(TeamDTO teamDTO) {
        Team team = new Team();
        team.setId(teamDTO.getId());
        team.setName(teamDTO.getName());
        team.setShortName(teamDTO.getShortName());
        return team;
    }
}