import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { footballApi } from '../services/api.ts';
import { ApiMatch } from '../types/api-types.ts';
import SeasonSelector from '../components/SeasonSelector/SeasonSelector.tsx';
import { formatDateTime } from '../utils/dateFormatter.ts';
import './LeagueView.css';

const LeagueView: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [matches, setMatches] = useState<ApiMatch[]>([]);
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
        // Calculate date range for the selected season
        const [startYear] = currentSeason.split('/');
        const from = `${startYear}-07-01`;
        const to = `${parseInt(startYear) + 1}-06-30`;

        const data = await footballApi.getMatches({
          leagueId,
          from,
          to
        });

        // Filter Lamaks (team winning at HT but losing at FT)
        const lamaks = data.filter(match => {
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

  const handleSeasonChange = (season: string) => {
    setCurrentSeason(season);
  };

  if (loading) {
    return <div className="text-center p-4">Loading matches...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

   return (
     <Container className="league-view">
       <div className="d-flex justify-content-between align-items-center mb-4">
         <h2>Lamak Matches</h2>
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
               <Card className="match-card">
                 <Card.Body>
                   <div className="match-header">
                     <div className="match-date">
                       {formatDateTime(match.match_date, match.match_time)}
                     </div>
                     <Badge bg="info">{match.match_status}</Badge>
                   </div>

                   {/* Rest of the match card content remains the same */}
                   <div className="match-teams">
                     <div className="team home">
                       <img
                         src={match.team_home_badge}
                         alt={match.match_hometeam_name}
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
                       />
                       <span>{match.match_awayteam_name}</span>
                     </div>
                   </div>

                   {(match.match_stadium || match.match_referee) && (
                     <div className="match-details">
                       <small>
                         {match.match_stadium && `🏟️ ${match.match_stadium}`}
                         {match.match_stadium && match.match_referee && ' | '}
                         {match.match_referee && `👨‍⚖️ ${match.match_referee}`}
                       </small>
                     </div>
                   )}
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