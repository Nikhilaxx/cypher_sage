import React, { useState, useEffect } from 'react';

const fetchTournaments = async () => {
  return [
    { id: 1, match: 'Team A vs Team B', tournament: 'Champions League' },
    { id: 2, match: 'Team C vs Team D', tournament: 'World Cup' },
  ];
};

const fetchUpcomingMatches = async () => {
  return [
    { id: 1, match: 'Team E vs Team F', date: '2024-10-20' },
    { id: 2, match: 'Team G vs Team H', date: '2024-10-22' },
  ];
};

const HomePage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const loadTournaments = async () => {
      const tournamentsData = await fetchTournaments();
      setTournaments(tournamentsData);
    };

    const loadUpcomingMatches = async () => {
      const matchesData = await fetchUpcomingMatches();
      setUpcomingMatches(matchesData);
    };

    loadTournaments();
    loadUpcomingMatches();
  }, []);
  
  return (
    <div className="bg-gray-800 text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Cricket Tournaments</h1>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Current Tournaments</h2>
        <ul className="space-y-4">
          {tournaments.map(t => (
            <li key={t.id} className="bg-gray-700 p-4 rounded-md shadow-lg">
              <strong className="text-xl">{t.match}</strong> - {t.tournament}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Upcoming Matches</h2>
        <ul className="space-y-4">
          {upcomingMatches.map(m => (
            <li key={m.id} className="bg-gray-700 p-4 rounded-md shadow-lg flex justify-between items-center">
              <span className="text-xl">{m.match} - {m.date}</span>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Register</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
