import React from 'react';
import { Link } from 'react-router-dom';

function about() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
  return <h1>This is the About Page</h1>;
}

export default about;
