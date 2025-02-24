import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Pagination } from 'react-bootstrap';
import { footballApi } from '../services/api.ts';
import { ApiMatch, ApiTeamDetails } from '../types/api-types.ts';
import { formatDateTime } from '../utils/dateFormatter.ts';
import './TeamDetails.css';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<ApiTeamDetails | null>(null);
  const [matches, setMatches] = useState<ApiMatch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!teamId) return;

      setLoading(true);
      try {
        const teamData = await footballApi.getTeamDetails(teamId);
        setTeam(teamData);

        const lamakMatches = await footballApi.getTeamLamakMatches(teamId);
        setMatches(lamakMatches);

        setTotalPages(Math.ceil(lamakMatches.length / 10));
      } catch (err) {
        setError('Failed to load team details. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center p-4">Loading team details...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center p-4 text-danger">{error}</div>
      </Container>
    );
  }

  const paginatedMatches = matches.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <Container className="team-details">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <Card className="team-header mb-4">
        <Card.Body>
          <div className="team-info">
            <img
              src={team?.team_badge}
              alt={team?.team_name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-team.png';
              }}
            />
            <div className="team-details">
              <h2>{team?.team_name}</h2>
              <p>{team?.team_country}</p>
              <p>Coach: {team?.coach_name}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <h3>Lamak Matches</h3>
      <Row xs={1} className="g-4">
        {paginatedMatches.map((match) => (
          <Col key={match.match_id}>
            <Card
              className="match-card"
              onClick={() => navigate(`/match/${match.match_id}`)}
            >
              <Card.Body>
                <div className="match-header">
                  <div className="match-info">
                    <div className="match-date">
                      {formatDateTime(match.match_date, match.match_time)}
                    </div>
                    <div className="match-round">
                      Round {match.match_round}
                    </div>
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

      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default TeamDetails;