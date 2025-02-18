import React from 'react';
import { Form } from 'react-bootstrap';
import './SeasonSelector.css';

interface SeasonSelectorProps {
  currentSeason: string;
  onSeasonChange: (season: string) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ currentSeason, onSeasonChange }) => {
  // Generate seasons from 2014 to current year
  const currentYear = new Date().getFullYear();
  const seasons = Array.from({ length: currentYear - 2014 + 1 }, (_, index) => {
    const year = currentYear - index;
    return `${year - 1}/${year}`;
  });

  return (
    <Form.Group className="season-selector">
      <Form.Label>Select Season</Form.Label>
      <Form.Select
        value={currentSeason}
        onChange={(e) => onSeasonChange(e.target.value)}
      >
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SeasonSelector;