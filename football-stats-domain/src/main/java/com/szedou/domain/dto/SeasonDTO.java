package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class SeasonDTO {
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
}