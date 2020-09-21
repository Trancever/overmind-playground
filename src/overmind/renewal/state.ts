import { Plan } from '../../types';

type State = {
  plan: Plan | null;
  error: string | null;
};

export const state: State = {
  plan: null,
  error: null,
};
