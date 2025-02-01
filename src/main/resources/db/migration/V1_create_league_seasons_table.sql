CREATE TABLE league_seasons (
    league_id BIGINT,
    season_id BIGINT,
    PRIMARY KEY (league_id, season_id),
    FOREIGN KEY (league_id) REFERENCES leagues(id),
    FOREIGN KEY (season_id) REFERENCES seasons(id)
);