import React, { useEffect, useState } from 'react';
import { League } from '../../types/models';
import { footballApi } from '../../services/api';
import './LeagueList.css';

interface LeagueListProps {
    countryId: number;
}

export const LeagueList: React.FC<LeagueListProps> = ({ countryId }) => {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeagues = async () => {
            setLoading(true);
            try {
                const response = await footballApi.getLeaguesByCountry(countryId);
                setLeagues(response.data);
            } catch (err) {
                setError('Failed to load leagues');
                console.error('Error fetching leagues:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagues();
    }, [countryId]);

    if (loading) return <div className="loading">Loading leagues...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="league-list">
            {leagues.map((league) => (
                <div key={league.id} className="league-card">
                    <h4 className="league-name">{league.name}</h4>
                    <span className="league-type">{league.type}</span>
                </div>
            ))}
        </div>
    );
};