package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CountryDTO {
    private Long id;
    private String name;
    private String code;
    private String flagUrl;
    private List<LeagueDTO> leagues;
}