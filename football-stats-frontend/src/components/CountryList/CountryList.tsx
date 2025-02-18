import React, { useEffect, useState } from 'react';
import { Country } from '../../types/models';
import { footballApi } from '../../services/api.ts';
import './CountryList.css';

export const CountryList: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await footballApi.getCountries();
                setCountries(response.data);
            } catch (err) {
                setError('Failed to load countries');
                console.error('Error fetching countries:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    if (loading) return <div className="loading">Loading countries...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="country-grid">
            {countries.map((country) => (
                <div key={country.id} className="country-card">
                    <img
                        src={country.flagUrl}
                        alt={`${country.name} flag`}
                        className="country-flag"
                    />
                    <h3 className="country-name">{country.name}</h3>
                </div>
            ))}
        </div>
    );
};