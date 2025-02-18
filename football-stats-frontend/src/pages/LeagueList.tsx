import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { footballApi } from '../services/api.ts';
import { League } from '../types/api-types.ts';
import './LeagueList.css';

const LeagueList: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!countryId) return;

      try {
        const data = await footballApi.getLeagues(countryId);
        setLeagues(data);
      } catch (err) {
        setError('Failed to load leagues. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [countryId]);

  if (loading) {
    return (
      <Container>
        <div className="text-center p-4">Loading leagues...</div>
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
    <Container>
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-link"
          onClick={() => navigate('/')}
        >
          ← Back to Countries
        </button>
        <h2 className="mb-0 ms-3">
          {leagues[0]?.countryName || ''} Competitions
        </h2>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {leagues.map(league => (
          <Col key={league.leagueId}>
            <Card
              className="league-card h-100"
              onClick={() => navigate(`/league/${league.leagueId}?season=${league.leagueSeason}`)}
            >
              <Card.Body>
                <div className="league-logo-container mb-3">
                  <img
                    src={league.leagueLogo}
                    alt={`${league.leagueName} logo`}
                    className="league-logo"
                  />
                </div>
                <Card.Title className="text-center">
                  {league.leagueName}
                </Card.Title>
                <div className="text-center text-muted">
                  Season: {league.leagueSeason}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LeagueList;