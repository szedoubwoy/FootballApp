import axios from 'axios';
import { Country, League, Match } from '../types/models';
import { ApiCountry, ApiLeague, ApiMatch } from '../types/api-types';

const API_URL = 'https://apiv3.apifootball.com';
const API_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;

// Create axios instance with default params
const apiClient = axios.create({
  baseURL: API_URL,
  params: {
    APIkey: API_KEY
  }
});

// Mapper functions to convert API responses to our domain models
const mapCountry = (apiCountry: ApiCountry): Country => ({
  countryId: apiCountry.country_id,
  countryName: apiCountry.country_name,
  countryLogo: apiCountry.country_logo
});

const mapLeague = (apiLeague: ApiLeague): League => ({
  countryId: apiLeague.country_id,
  countryName: apiLeague.country_name,
  leagueId: apiLeague.league_id,
  leagueName: apiLeague.league_name,
  leagueSeason: apiLeague.league_season,
  leagueLogo: apiLeague.league_logo,
  countryLogo: apiLeague.country_logo
});

const mapMatch = (apiMatch: ApiMatch): Match => ({
  id: apiMatch.match_id,
  date: apiMatch.match_date,
  time: apiMatch.match_time,
  homeTeam: {
    id: apiMatch.match_hometeam_id,
    name: apiMatch.match_hometeam_name,
    scoreHT: parseInt(apiMatch.match_hometeam_halftime_score) || 0,
    scoreFT: parseInt(apiMatch.match_hometeam_score) || 0
  },
  awayTeam: {
    id: apiMatch.match_awayteam_id,
    name: apiMatch.match_awayteam_name,
    scoreHT: parseInt(apiMatch.match_awayteam_halftime_score) || 0,
    scoreFT: parseInt(apiMatch.match_awayteam_score) || 0
  },
  referee: apiMatch.match_referee,
  stadium: apiMatch.match_stadium,
  status: apiMatch.match_status,
  league: {
    id: apiMatch.league_id,
    name: apiMatch.league_name,
    countryId: apiMatch.country_id,
    countryName: apiMatch.country_name
  }
});


export const footballApi = {
  getCountries: async (): Promise<Country[]> => {
      try {
        const response = await apiClient.get<ApiCountry[]>('', {
          params: {
            action: 'get_countries'
          }
        });

        if (Array.isArray(response.data)) {
          return response.data.map(mapCountry);
        }

        throw new Error('Invalid response format');
      } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
      }
    },

 getLeagues: async (countryId?: string): Promise<League[]> => {
     try {
       const response = await apiClient.get<ApiLeague[]>('', {
         params: {
           action: 'get_leagues',
           ...(countryId && { country_id: countryId })
         }
       });

       if (Array.isArray(response.data)) {
         return response.data.map(mapLeague);
       }

       throw new Error('Invalid response format');
     } catch (error) {
       console.error('Error fetching leagues:', error);
       throw error;
     }
   },

  getMatches: async ({
      leagueId,
      from,
      to
    }: {
      leagueId: string;
      from: string;
      to: string;
    }): Promise<ApiMatch[]> => {
      try {
        const response = await apiClient.get('', {
          params: {
            action: 'get_events',
            league_id: leagueId,
            from,
            to
          }
        });

        if (Array.isArray(response.data)) {
          return response.data;
        }

        throw new Error('Invalid response format');
      } catch (error) {
        console.error('Error fetching matches:', error);
        throw error;
      }
    }
};