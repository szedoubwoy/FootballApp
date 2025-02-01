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
}