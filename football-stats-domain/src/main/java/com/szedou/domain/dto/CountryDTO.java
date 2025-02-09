package com.szedou.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountryDTO {
    private Long id;
    private String name;
    private String code;
    private String flagUrl;
    private List<LeagueDTO> leagues;
}