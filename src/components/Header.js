import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="App-header">
      <div>
        <Link to="/">auth.patina</Link>
      </div>
    </header>
  );
}
