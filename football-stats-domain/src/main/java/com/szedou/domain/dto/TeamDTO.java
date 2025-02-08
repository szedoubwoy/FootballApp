package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamDTO {
    private Long id;
    private String name;
    private String shortName;
    private String country;
}