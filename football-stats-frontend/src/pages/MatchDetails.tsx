import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { footballApi } from '../services/api.ts';
import { Match } from '../types/models';

const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      if (!matchId) return;

      try {
        const data = await footballApi.getMatchDetails(Number(matchId));
        setMatch(data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{match.homeTeam.name} vs {match.awayTeam.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(match.matchDate).toLocaleDateString()}
        </Card.Subtitle>
        <Row>
          <Col>
            <Table>
              <tbody>
                <tr>
                  <td>Half Time Score</td>
                  <td>{match.homeScoreHT} - {match.awayScoreHT}</td>
                </tr>
                <tr>
                  <td>Full Time Score</td>
                  <td>{match.homeScoreFT} - {match.awayScoreFT}</td>
                </tr>
                <tr>
                  <td>Season</td>
                  <td>{match.season}</td>
                </tr>
                <tr>
                  <td>Referee</td>
                  <td>{match.referee}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MatchDetails;