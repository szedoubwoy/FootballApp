import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import CountryList from './pages/CountryList';
import LeagueList from './pages/LeagueList';
import LamakList from './pages/LamakList';
import TeamLamaks from './pages/TeamLamaks';
import MatchDetails from './pages/MatchDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:countryId/leagues" element={<LeagueList />} />
          <Route path="/league/:leagueId/lamaks" element={<LamakList />} />
          <Route path="/team/:teamId/lamaks" element={<TeamLamaks />} />
          <Route path="/match/:matchId" element={<MatchDetails />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;