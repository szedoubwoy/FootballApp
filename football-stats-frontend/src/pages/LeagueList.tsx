import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

interface League {
  id: number;
  name: string;
  countryName: string;
}

const LeagueList = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const { countryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(`/api/v1/countries/${countryId}/leagues`);
        setLeagues(response.data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [countryId]);

  return (
    <div>
      <h2 className="mb-4">Select League</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {leagues.map(league => (
            <Col key={league.id}>
              <Card
                onClick={() => navigate(`/league/${league.id}/lamaks`)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <Card.Title>{league.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {league.countryName}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default LeagueList;