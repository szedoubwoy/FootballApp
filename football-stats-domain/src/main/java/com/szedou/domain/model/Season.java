package com.szedou.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.Set;


@Entity
@Table(name = "seasons")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g., "2023/24"

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToMany
    @JoinTable(
            name = "league_seasons",
            joinColumns = @JoinColumn(name = "season_id"),
            inverseJoinColumns = @JoinColumn(name = "league_id")
    )
    private Set<League> leagues;
}