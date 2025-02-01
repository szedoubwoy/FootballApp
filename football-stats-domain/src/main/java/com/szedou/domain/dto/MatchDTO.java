package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MatchDTO {
    private Long id;
    private TeamDTO homeTeam;
    private TeamDTO awayTeam;
    private Integer homeScoreHT;
    private Integer awayScoreHT;
    private Integer homeScoreFT;
    private Integer awayScoreFT;
    private LocalDateTime matchDate;
    private String referee;
    private String season;
    private boolean isLamak;
}