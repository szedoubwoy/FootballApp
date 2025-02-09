package com.szedou.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeasonDTO {
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
}