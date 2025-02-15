import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1'
});

export interface Country {
  id: number;
  name: string;
  flagUrl?: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScoreHT: number;
  awayScoreHT: number;
  homeScoreFT: number;
  awayScoreFT: number;
  matchDate: string;
  referee: string;
  season: string;
  isLamak: boolean;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  countryName: string;
}

export interface League {
  id: number;
  name: string;
  countryName: string;
  apiId: string;
}

export const fetchCountries = () => api.get<Country[]>('/countries').then(res => res.data);
export const fetchLeagues = (countryId: number) => api.get(`/countries/${countryId}/leagues`).then(res => res.data);
export const fetchLamaks = (leagueId: number, season: string) =>
  api.get(`/leagues/${leagueId}/lamaks`, { params: { season }}).then(res => res.data);
export const fetchMatchDetails = (matchId: number) =>
  api.get(`/matches/${matchId}`).then(res => res.data);