import React, { useState } from 'react';
import { CountryList } from '../components/CountryList/CountryList';
import { LeagueList } from '../components/LeagueList/LeagueList';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

    return (
        <div className="home-page">
            <header className="header">
                <h1>Football Stats</h1>
                <p>Select a country to view available leagues</p>
            </header>

            <main className="main-content">
                {!selectedCountryId ? (
                    <CountryList onCountrySelect={setSelectedCountryId} />
                ) : (
                    <div className="league-section">
                        <button
                            className="back-button"
                            onClick={() => setSelectedCountryId(null)}
                        >
                            ← Back to Countries
                        </button>
                        <LeagueList countryId={selectedCountryId} />
                    </div>
                )}
            </main>
        </div>
    );
};