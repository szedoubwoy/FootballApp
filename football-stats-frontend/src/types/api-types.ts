export interface ApiCountry {
  country_id: string;
  country_name: string;
  country_logo: string;
}

export interface ApiLeague {
  country_id: string;
  country_name: string;
  league_id: string;
  league_name: string;
  league_season: string;
  league_logo: string;
  country_logo: string;
}

export interface ApiMatch {
  match_id: string;
  country_id: string;
  country_name: string;
  league_id: string;
  league_name: string;
  match_date: string;
  match_status: string;
  match_time: string;
  match_hometeam_id: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_awayteam_name: string;
  match_awayteam_id: string;
  match_awayteam_score: string;
  match_hometeam_halftime_score: string;
  match_awayteam_halftime_score: string;
  match_hometeam_ft_score: string;
  match_awayteam_ft_score: string;
  match_stadium?: string;
  match_referee?: string;
  team_home_badge: string;
  team_away_badge: string;
  league_logo: string;
  country_logo: string;
  league_year: string;
  match_round?: string;
  fk_stage_key: string;
  stage_name?: string;
}

export interface ApiGoalscorer {
  time: string;
  home_scorer: string;
  away_scorer: string;
  score: string;
  home_assist: string;
  away_assist: string;
  score_info_time: string;
}

export interface ApiCountry {
  country_id: string;
  country_name: string;
  country_logo: string;
}

export interface ApiStatistic {
  type: string;
  home: string;
  away: string;
}

export interface ApiCard {
  time: string;
  home_fault: string;
  away_fault: string;
  card: string;
  info: string;
  score_info_time: string;
}

export interface ApiSubstitution {
  time: string;
  substitution: string;
}

export interface ApiStatistic {
  type: string;
  home: string;
  away: string;
}

export interface ApiLineupPlayer {
  lineup_player: string;
  lineup_number: string;
  lineup_position: string;
  player_key: string;
}

export interface ApiTeamLineup {
  starting_lineups: ApiLineupPlayer[];
  substitutes: ApiLineupPlayer[];
  coach: ApiLineupPlayer[];
}

export interface ApiHeadToHead {
  firstTeam_VS_secondTeam: ApiMatch[];
  firstTeam_lastResults: ApiMatch[];
  secondTeam_lastResults: ApiMatch[];
}