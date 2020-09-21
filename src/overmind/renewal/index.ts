import { Statechart, statechart } from 'overmind-statechart';
import * as effects from './effects';
import * as actions from './actions';
import { state } from './state';

const config = {
  state,
  actions,
  effects,
};

const renewalChart: Statechart<
  typeof config,
  {
    IDLE: void;
    RENEWING_PLAN: void;
    RENEWAL_SUCCEDED: void;
    RENEWAL_FAILED: void;
    ADDING_BEYOND: void;
    ADDING_BEYOND_SUCCEDED: void;
    ADDING_BEYOND_FAILED: void;
  }
> = {
  initial: 'IDLE',
  states: {
    IDLE: {
      on: {
        renewPlan: 'RENEWING_PLAN',
      },
    },
    RENEWING_PLAN: {
      on: {
        resolveRenewPlan: 'RENEWAL_SUCCEDED',
        resolveRenewalPlanWithBeyond: null,
        rejectRenewPlan: 'RENEWAL_FAILED',
        addBeyond: 'ADDING_BEYOND',
      },
    },
    RENEWAL_SUCCEDED: {
      on: {
        addBeyond: 'ADDING_BEYOND',
      },
    },
    RENEWAL_FAILED: {
      on: {
        reset: 'IDLE',
      },
    },
    ADDING_BEYOND: {
      on: {
        resolveAddBeyond: 'ADDING_BEYOND_SUCCEDED',
        rejectAddBeyond: 'ADDING_BEYOND_FAILED',
      },
    },
    ADDING_BEYOND_SUCCEDED: {
      on: {
        reset: 'IDLE',
      },
    },
    ADDING_BEYOND_FAILED: {
      on: {
        reset: 'IDLE',
      },
    },
  },
};

export default statechart(config, renewalChart);
