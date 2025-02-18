package com.szedou.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LamakDTO {
    private Long matchId;
    private String homeTeamName;
    private String awayTeamName;
    private Integer homeScoreHT;
    private Integer awayScoreHT;
    private Integer homeScoreFT;
    private Integer awayScoreFT;
    private LocalDateTime matchDate;
    private String referee;
    private String season;
    private String leagueName;
    private String countryName;
}