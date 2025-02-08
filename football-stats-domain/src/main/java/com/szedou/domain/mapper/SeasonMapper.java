package com.szedou.domain.mapper;

import com.szedou.domain.dto.SeasonDTO;
import com.szedou.domain.model.Season;
import org.springframework.stereotype.Component;

@Component
public class SeasonMapper {

    public SeasonDTO toDTO(Season season) {
        return SeasonDTO.builder()
                .id(season.getId())
                .name(season.getName())
                .startDate(season.getStartDate())
                .endDate(season.getEndDate())
                .build();
    }

    public Season toEntity(SeasonDTO seasonDTO) {
        Season season = new Season();
        season.setId(seasonDTO.getId());
        season.setName(seasonDTO.getName());
        season.setStartDate(seasonDTO.getStartDate());
        season.setEndDate(seasonDTO.getEndDate());
        // Set other fields as necessary
        return season;
    }
}