ALTER TABLE teams
ADD COLUMN league_id BIGINT,
ADD CONSTRAINT fk_team_league FOREIGN KEY (league_id) REFERENCES leagues(id);