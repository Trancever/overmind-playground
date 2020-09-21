import React from 'react';
import './App.css';

import { useActions, useState } from './overmind/index';

function App() {
  const [isBeyondSelected, setIsBeyondSelected] = React.useState(false);
  const actions = useActions();
  const state = useState();

  const showLoadingIndicator =
    state.matches({
      RENEWING_PLAN: true,
    }) ||
    state.matches({
      ADDING_BEYOND: true,
    });

  const hasCompletedRenewal =
    state.matches({
      RENEWAL_SUCCEDED: true,
    }) ||
    state.matches({
      ADDING_BEYOND_SUCCEDED: true,
    });

  const renewalFailed = state.matches({
    RENEWAL_FAILED: true,
  });

  const beyondFailed = state.matches({
    ADDING_BEYOND_FAILED: true,
  });

  if (hasCompletedRenewal) {
    return (
      <div
        className="App"
        style={{ maxWidth: '1024px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <h1>Renewal completed</h1>
      </div>
    );
  }

  if (renewalFailed || beyondFailed) {
    return (
      <div
        className="App"
        style={{ maxWidth: '1024px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <h1>Sorry</h1>
        <h2>
          An issue occured when trying to{' '}
          {renewalFailed ? 'renew your plan' : 'add the beyond addon'}
        </h2>
      </div>
    );
  }

  return (
    <div
      className="App"
      style={{ maxWidth: '1024px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <h1>Tariff Page</h1>
      {showLoadingIndicator ? <div className="loader" /> : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <button onClick={() => setIsBeyondSelected(!isBeyondSelected)}>
            {isBeyondSelected ? 'Remove Beyond' : 'Add Beyond'}
          </button>
        </div>
        <div>
          <h2>Your plan: 2 year fixed</h2>
          {isBeyondSelected ? <h3>Beyond - $6 each month</h3> : null}
        </div>
      </div>
      <button
        onClick={() => {
          actions.renewPlan({
            plan: { planName: '2 year fixed' },
            withBeyond: isBeyondSelected,
          });
        }}
      >
        Renew plan
      </button>
    </div>
  );
}

export default App;
