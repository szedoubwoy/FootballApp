package com.szedou.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

import java.util.List;

@Entity
@Table(name = "leagues")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    private String apiId;

    @OneToMany(mappedBy = "league")
    private List<Match> matches;
}