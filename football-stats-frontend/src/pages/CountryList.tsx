import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { footballApi } from '../services/api.ts';
import { Country } from '../types/api-types.ts';
import './CountryList.css';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await footballApi.getCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="text-center p-4">Loading countries...</div>
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
      <h2 className="text-center my-4">Select Country</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {countries.map(country => (
          <Col key={country.countryId}>
            <Card
              className="country-card h-100"
              onClick={() => navigate(`/country/${country.countryId}/leagues`)}
            >
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="country-flag-container mb-3">
                  <img
                    src={country.countryLogo}
                    alt={`${country.countryName} flag`}
                    className="country-flag"
                  />
                </div>
                <Card.Title className="text-center">{country.countryName}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CountryList;