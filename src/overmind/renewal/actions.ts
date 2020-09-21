import { AsyncAction, Action } from 'overmind';
import { Plan } from '../../types';

export const renewPlan: AsyncAction<{
  plan: Plan;
  withBeyond: boolean;
  success?: boolean;
}> = async (
  { state, effects, actions },
  { plan, withBeyond, success = true },
) => {
  try {
    await effects.renewPlan(plan);
    state.plan = plan;
    if (withBeyond) {
      actions.resolveRenewalPlanWithBeyond(success);
    } else {
      actions.resolveRenewPlan();
    }
  } catch (error) {
    actions.rejectRenewPlan('Error while renewing plan');
  }
};

export const resolveRenewPlan: Action = () => {};

export const resolveRenewalPlanWithBeyond: Action<boolean> = (
  { actions },
  success,
) => {
  actions.addBeyond(success);
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
