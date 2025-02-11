CREATE TABLE matches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    home_team_id BIGINT,
    away_team_id BIGINT,
    league_id BIGINT,
    home_score_ht INT,
    away_score_ht INT,
    home_score_ft INT,
    away_score_ft INT,
    match_date DATETIME,
    referee VARCHAR(255),
    season VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id),
    FOREIGN KEY (league_id) REFERENCES leagues(id)
);