package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeagueDTO {
    private Long id;
    private String name;
    private String country;
    private String apiId;
}