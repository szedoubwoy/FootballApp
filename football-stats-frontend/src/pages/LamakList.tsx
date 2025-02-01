import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Lamak {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScoreHT: number;
  awayScoreHT: number;
  homeScoreFT: number;
  awayScoreFT: number;
  date: string;
  season: string;
}

const LamakList = () => {
  const [lamaks, setLamaks] = useState<Lamak[]>([]);
  const [selectedSeason, setSelectedSeason] = useState('2023/24');
  const { leagueId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLamaks = async () => {
      try {
        const response = await axios.get(
          `/api/leagues/${leagueId}/lamaks?season=${selectedSeason}`
        );
        setLamaks(response.data);
      } catch (error) {
        console.error('Error fetching lamaks:', error);
      }
    };

    fetchLamaks();
  }, [leagueId, selectedSeason]);

  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            <option value="2023/24">2023/24</option>
            <option value="2022/23">2022/23</option>
            <option value="2021/22">2021/22</option>
            {/* Add more seasons */}
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Half Time</th>
            <th>Full Time</th>
          </tr>
        </thead>
        <tbody>
          {lamaks.map(lamak => (
            <tr
              key={lamak.id}
              onClick={() => navigate(`/match/${lamak.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>{new Date(lamak.date).toLocaleDateString()}</td>
              <td>{lamak.homeTeam}</td>
              <td>{lamak.awayTeam}</td>
              <td>{lamak.homeScoreHT} - {lamak.awayScoreHT}</td>
              <td>{lamak.homeScoreFT} - {lamak.awayScoreFT}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default LamakList;