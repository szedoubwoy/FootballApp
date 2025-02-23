import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { footballApi } from '../services/api.ts';
import { ApiMatch } from '../types/api-types.ts';
import SeasonSelector from '../components/SeasonSelector/SeasonSelector.tsx';
import { formatDateTime } from '../utils/dateFormatter.ts';
import './LeagueView.css';

const LeagueView: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<ApiMatch[]>([]);
  const [leagueName, setLeagueName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState(() => {
    const year = new Date().getFullYear();
    return `${year-1}/${year}`;
  });

  useEffect(() => {
    const fetchMatches = async () => {
      if (!leagueId) return;

      setLoading(true);
      try {
        const [startYear] = currentSeason.split('/');
        const from = `${startYear}-07-01`;
        const to = `${parseInt(startYear) + 1}-06-30`;

        const data = await footballApi.getMatches({
          leagueId,
          from,
          to
        });

        // Set league name from the first match that has league information
        const firstMatchWithLeague = data.find(match => match.league_name);
        if (firstMatchWithLeague) {
          setLeagueName(firstMatchWithLeague.league_name);
        }

        const lamaks = data.filter(match => {
          if (!match.match_hometeam_halftime_score || !match.match_awayteam_halftime_score ||
              !match.match_hometeam_ft_score || !match.match_awayteam_ft_score) {
            return false;
          }

          const homeWinningHT = parseInt(match.match_hometeam_halftime_score) >
                               parseInt(match.match_awayteam_halftime_score);
          const awayWinningFT = parseInt(match.match_awayteam_ft_score) >
                               parseInt(match.match_hometeam_ft_score);

          const awayWinningHT = parseInt(match.match_awayteam_halftime_score) >
                               parseInt(match.match_hometeam_halftime_score);
          const homeWinningFT = parseInt(match.match_hometeam_ft_score) >
                               parseInt(match.match_awayteam_ft_score);

          return (homeWinningHT && awayWinningFT) || (awayWinningHT && homeWinningFT);
        });

        setMatches(lamaks);
      } catch (err) {
        setError('Failed to load matches. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [leagueId, currentSeason]);

  const formatRound = (match: ApiMatch) => {
    if (match.match_round) {
      return `Round ${match.match_round}`;
    }

    const roundNumber = parseInt(match.fk_stage_key);
    if (!isNaN(roundNumber) && roundNumber > 0 && roundNumber <= 50) {
      return `Round ${roundNumber}`;
    }

    return match.stage_name || '';
  };

  const handleSeasonChange = (season: string) => {
    setCurrentSeason(season);
  };

  const navigateToMatch = (matchId: string) => {
    navigate(`/match/${matchId}`);
  };

  const navigateToTeam = (teamId: string) => {
    navigate(`/team/${teamId}`);
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center p-4">Loading matches...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="league-view">
      <div className="league-header mb-4">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-link"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div className="ms-3">
            <h2 className="mb-0">{leagueName}</h2>
            <div className="league-subtitle">Lamak Matches • {currentSeason}</div>
          </div>
        </div>
        <SeasonSelector
          currentSeason={currentSeason}
          onSeasonChange={handleSeasonChange}
        />
      </div>

      {matches.length === 0 ? (
        <Alert variant="info">No Lamak matches found for this season.</Alert>
      ) : (
        <Row xs={1} className="g-4">
          {matches.map((match) => (
            <Col key={match.match_id}>
              <Card
                className="match-card"
                onClick={() => navigateToMatch(match.match_id)}
              >
                <Card.Body>
                  <div className="match-header">
                    <div className="match-info">
                      <div className="match-date">
                        {formatDateTime(match.match_date, match.match_time)}
                      </div>
                      {formatRound(match) && (
                        <div className="match-round">
                          {formatRound(match)}
                        </div>
                      )}
                    </div>
                    <Badge bg={
                      match.match_status === 'Finished' ? 'success' :
                      match.match_status === 'Cancelled' ? 'danger' :
                      'info'
                    }>
                      {match.match_status}
                    </Badge>
                  </div>

                  <div className="match-teams">
                    <div className="team home">
                      <img
                        src={match.team_home_badge}
                        alt={match.match_hometeam_name}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToTeam(match.match_hometeam_id);
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-team.png';
                        }}
                      />
                      <span>{match.match_hometeam_name}</span>
                    </div>
                    <div className="match-scores">
                      <div className="score ht">
                        HT: {match.match_hometeam_halftime_score} - {match.match_awayteam_halftime_score}
                      </div>
                      <div className="score ft">
                        FT: {match.match_hometeam_ft_score} - {match.match_awayteam_ft_score}
                      </div>
                    </div>
                    <div className="team away">
                      <img
                        src={match.team_away_badge}
                        alt={match.match_awayteam_name}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToTeam(match.match_awayteam_id);
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-team.png';
                        }}
                      />
                      <span>{match.match_awayteam_name}</span>
                    </div>
                  </div>

                  <div className="match-details">
                    {match.match_stadium && (
                      <div className="venue-info">
                        <span className="stadium">🏟️ {match.match_stadium}</span>
                      </div>
                    )}
                    {match.match_referee && (
                      <div className="referee-info">
                        <span className="referee">👨‍⚖️ Referee: {match.match_referee}</span>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default LeagueView;