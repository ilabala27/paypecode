import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export function Country() {
  const count = useSelector((state: any) => state.system.value)
    return (
      <>
        <main>
          <h2>Who are we?</h2>
          <p>
            That feels like an existential question, don't you
            think? {count}
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }
  