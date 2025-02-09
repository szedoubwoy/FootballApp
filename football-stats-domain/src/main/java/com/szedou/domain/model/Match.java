package com.szedou.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;

    private Integer homeScoreHT;
    private Integer awayScoreHT;
    private Integer homeScoreFT;
    private Integer awayScoreFT;

    @Column(name = "match_date")
    private LocalDateTime matchDate;

    private String referee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;

    private String season;

    @Formula("(home_score_ht < away_score_ht AND home_score_ft > away_score_ft) OR " +
            "(home_score_ht > away_score_ht AND home_score_ft < away_score_ft)")
    private boolean isLamak;
}