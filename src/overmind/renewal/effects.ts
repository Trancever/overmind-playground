import { Plan } from '../../types';

export function renewPlan(plan?: Plan) {
  return new Promise<Plan>((resolve, reject) => {
    setTimeout(() => {
      if (plan) {
        resolve(plan);
      }
      reject();
    }, 1000);
  });
}

export function addBeyond(success?: boolean) {
  return new Promise<Plan>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve();
      }
      reject();
    }, 1000);
  });
}
