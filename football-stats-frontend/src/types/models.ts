export interface Country {
  countryId: string;
  countryName: string;
  countryLogo: string;
}

export interface League {
  countryId: string;
  countryName: string;
  leagueId: string;
  leagueName: string;
  leagueSeason: string;
  leagueLogo: string;
  countryLogo: string;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  status: string;
  homeTeam: {
    id: string;
    name: string;
    badge: string;
    scoreHT: number;
    scoreFT: number;
  };
  awayTeam: {
    id: string;
    name: string;
    badge: string;
    scoreHT: number;
    scoreFT: number;
  };
  stadium: string;
  referee: string;
  isLamak: boolean;
  league: {
    id: string;
    name: string;
    year: string;
  };
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  countryName: string;
}

export interface Lamak {
    matchId: number;
    homeTeamName: string;
    awayTeamName: string;
    homeScoreHT: number;
    awayScoreHT: number;
    homeScoreFT: number;
    awayScoreFT: number;
    matchDate: string;
    referee: string;
    season: string;
    leagueName: string;
    countryName: string;
}
