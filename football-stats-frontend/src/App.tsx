import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation.tsx';
import CountryList from './pages/CountryList.tsx';
import LeagueList from './pages/LeagueList.tsx';
import LamakList from './pages/LamakList.tsx';
// import TeamLamaks from './pages/TeamLamaks.tsx';
import MatchDetails from './pages/MatchDetails.tsx';
import LeagueView from './pages/LeagueView.tsx';
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
          <Route path="/match/:matchId" element={<MatchDetails />} />
          <Route path="/league/:leagueId" element={<LeagueView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;