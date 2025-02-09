package com.szedou.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchDTO {
    private Long id;
    private TeamDTO homeTeam;
    private TeamDTO awayTeam;
    private int homeScoreHT;
    private int awayScoreHT;
    private int homeScoreFT;
    private int awayScoreFT;
    private LocalDateTime matchDate;
    private String referee;
    private String season;
    private boolean isLamak;
}