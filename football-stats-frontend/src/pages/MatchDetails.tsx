import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Tabs, Tab } from 'react-bootstrap';
import { footballApi } from '../services/api.ts';
import { ApiMatch, ApiHeadToHead } from '../types/api-types.ts';
import { formatDateTime } from '../utils/dateFormatter.ts';
import './MatchDetails.css';

const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<ApiMatch | null>(null);
  const [h2h, setH2h] = useState<ApiHeadToHead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!matchId) return;

      setLoading(true);
      try {
        const matchData = await footballApi.getMatchDetails(matchId);
        setMatch(matchData);

        // Fetch H2H data
        const h2hData = await footballApi.getHeadToHead(
          matchData.match_hometeam_id,
          matchData.match_awayteam_id
        );
        setH2h(h2hData);
      } catch (err) {
        setError('Failed to load match details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [matchId]);

 const navigateToTeam = (teamId: string) => {
    navigate(`/team/${teamId}`);
  };

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

  if (loading) return <div className="text-center p-4">Loading match details...</div>;
  if (error || !match) return <div className="text-center p-4 text-danger">{error}</div>;

  const renderGoals = () => (
    <div className="goals-section">
      <h4>Goals</h4>
      <div className="timeline">
        {match.goalscorer.map((goal, index) => (
          <div key={index} className="timeline-item">
            <div className="time">{goal.time}'</div>
            <div className="content">
              {goal.home_scorer ? (
                <div className="home-goal">
                  ⚽ {goal.home_scorer}
                  {goal.home_assist && <span className="assist">assist: {goal.home_assist}</span>}
                </div>
              ) : (
                <div className="away-goal">
                  ⚽ {goal.away_scorer}
                  {goal.away_assist && <span className="assist">assist: {goal.away_assist}</span>}
                </div>
              )}
              <div className="score">{goal.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="statistics-section">
      <h4>Match Statistics</h4>
      <Table striped>
        <tbody>
          {match.statistics.map((stat, index) => (
            <tr key={index}>
              <td className="text-end">{stat.home}</td>
              <td className="text-center">{stat.type}</td>
              <td>{stat.away}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const renderLineups = () => (
    <div className="lineups-section">
      <Row>
        <Col md={6}>
          <h5>{match.match_hometeam_name}</h5>
          <div className="starting-eleven">
            <h6>Starting XI</h6>
            {match.lineup.home.starting_lineups.map((player, index) => (
              <div key={index} className="player">
                <span className="number">{player.lineup_number}</span>
                <span className="name">{player.lineup_player}</span>
              </div>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <h5>{match.match_awayteam_name}</h5>
          <div className="starting-eleven">
            <h6>Starting XI</h6>
            {match.lineup.away.starting_lineups.map((player, index) => (
              <div key={index} className="player">
                <span className="number">{player.lineup_number}</span>
                <span className="name">{player.lineup_player}</span>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderH2H = () => (
    <div className="h2h-section">
      <h4>Head to Head Lamak Matches</h4>
      {h2h?.firstTeam_VS_secondTeam
        .filter(h2hMatch => {
          const homeWinningHT = parseInt(h2hMatch.match_hometeam_halftime_score) >
                               parseInt(h2hMatch.match_awayteam_halftime_score);
          const awayWinningFT = parseInt(h2hMatch.match_awayteam_score) >
                               parseInt(h2hMatch.match_hometeam_score);
          const awayWinningHT = parseInt(h2hMatch.match_awayteam_halftime_score) >
                               parseInt(h2hMatch.match_hometeam_halftime_score);
          const homeWinningFT = parseInt(h2hMatch.match_hometeam_score) >
                               parseInt(h2hMatch.match_awayteam_score);

          return (homeWinningHT && awayWinningFT) || (awayWinningHT && homeWinningFT);
        })
        .map(h2hMatch => (
          <Card key={h2hMatch.match_id} className="mb-3 h2h-match">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="team">
                  <img src={h2hMatch.team_home_badge} alt={h2hMatch.match_hometeam_name} />
                  <span>{h2hMatch.match_hometeam_name}</span>
                </div>
                <div className="scores">
                  <div className="ht">HT: {h2hMatch.match_hometeam_halftime_score} - {h2hMatch.match_awayteam_halftime_score}</div>
                  <div className="ft">FT: {h2hMatch.match_hometeam_score} - {h2hMatch.match_awayteam_score}</div>
                </div>
                <div className="team">
                  <img src={h2hMatch.team_away_badge} alt={h2hMatch.match_awayteam_name} />
                  <span>{h2hMatch.match_awayteam_name}</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <small>{formatDateTime(h2hMatch.match_date, h2hMatch.match_time)}</small>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );

  return (
      <Container className="match-details">
        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <Card className="match-header-match-details mb-4">
          <Card.Body>
            <div className="match-meta">
              <div className="meta-left">
                <Badge bg={
                  match.match_status === 'Finished' ? 'success' :
                  match.match_status === 'Cancelled' ? 'danger' :
                  'info'
                }>
                  {match.match_status}
                </Badge>
                {formatRound(match) && (
                  <span className="match-round ms-2">
                    {formatRound(match)}
                  </span>
                )}
              </div>
              <div className="meta-right">
                <span className="league-name">
                  {match.league_name} • {match.league_year}
                </span>
              </div>
            </div>

            <div className="teams-score">
              <div className="team home">
                <img
                  src={match.team_home_badge}
                  alt={match.match_hometeam_name}
                  onClick={() => navigateToTeam(match.match_hometeam_id)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-team.png';
                  }}
                />
                <h3>{match.match_hometeam_name}</h3>
              </div>
              <div className="score">
                <div className="final-score">
                  {match.match_hometeam_score} - {match.match_awayteam_score}
                </div>
                <div className="ht-score">
                  HT: {match.match_hometeam_halftime_score} - {match.match_awayteam_halftime_score}
                </div>
              </div>
              <div className="team away">
                <img
                  src={match.team_away_badge}
                  alt={match.match_awayteam_name}
                  onClick={() => navigateToTeam(match.match_awayteam_id)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-team.png';
                  }}
                />
                <h3>{match.match_awayteam_name}</h3>
              </div>
            </div>

            <div className="match-info">
              <div className="match-datetime">
                {formatDateTime(match.match_date, match.match_time)}
              </div>
              {match.match_stadium && (
                <div className="match-stadium">
                  🏟️ {match.match_stadium}
                </div>
              )}
              {match.match_referee && (
                <div className="match-referee">
                  👨‍⚖️ Referee: {match.match_referee}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

      <Tabs defaultActiveKey="goals" className="mb-4">
        <Tab eventKey="goals" title="Goals">
          {renderGoals()}
        </Tab>
        <Tab eventKey="h2h" title="H2H Lamaks">
          {renderH2H()}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MatchDetails;