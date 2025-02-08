package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MatchDTO {
    private Long id;
    private TeamDTO homeTeam;
    private TeamDTO awayTeam;
    private int homeScoreHT;
    private int awayScoreHT;
    private int homeScoreFT;
    private int awayScoreFT;
    private String matchDate;
    private String referee;
    private String season;
    private boolean isLamak;
}