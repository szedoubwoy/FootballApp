import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchCountries()
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Select Country</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {countries.map(country => (
          <Col key={country.id}>
            <Card
              onClick={() => navigate(`/country/${country.id}/leagues`)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Title>{country.name}</Card.Title>
                {country.flagUrl && (
                  <Card.Img
                    src={country.flagUrl}
                    alt={country.name}
                    style={{ maxHeight: '32px', objectFit: 'contain' }}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CountryList;