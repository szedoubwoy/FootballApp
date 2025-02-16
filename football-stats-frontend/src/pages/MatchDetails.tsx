import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Table } from 'react-bootstrap';
import * as api from '../services/api.ts';

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState<api.Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchMatchDetails(Number(matchId))
      .then(data => {
        setMatch(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching match details:', error);
        setLoading(false);
      });
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
        <Card.Subtitle className="mb-2 text-muted">{new Date(match.matchDate).toLocaleDateString()}</Card.Subtitle>
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