import { AsyncAction, Action } from 'overmind';
import { Plan } from '../../types';

export const renewPlan: AsyncAction<{
  plan: Plan;
  withBeyond: boolean;
}> = async ({ state, effects, actions }, { plan, withBeyond }) => {
  try {
    await effects.renewPlan(plan);
    state.plan = plan;
    if (withBeyond) {
      actions.resolveRenewalPlanWithBeyond();
    } else {
      actions.resolveRenewPlan();
    }
  } catch (error) {
    actions.rejectRenewPlan('Error while renewing plan');
  }
};

export const resolveRenewPlan: Action = () => {};

export const resolveRenewalPlanWithBeyond: Action = ({ actions }) => {
  actions.addBeyond(true);
};

export const rejectRenewPlan: Action<string> = ({ state }, error) => {
  state.error = error;
};

export const addBeyond: AsyncAction<boolean | undefined> = async (
  { effects, actions },
  success,
) => {
  try {
    await effects.addBeyond(success);
    actions.resolveAddBeyond();
  } catch (error) {
    actions.rejectAddBeyond('Error while adding beyond');
  }
};

export const resolveAddBeyond: Action = () => {};

export const rejectAddBeyond: Action<string> = ({ state }, error) => {
  state.error = error;
};

export const reset: Action = ({ state }) => {
  state.error = null;
  state.plan = null;
};
