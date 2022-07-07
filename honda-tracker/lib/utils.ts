import { Lambdas } from './types';

export const mergeLambdas = (lambdaList: Lambdas[]): Lambdas =>
  lambdaList.reduce((acc, lambdasMap) => {
    const entries = lambdasMap.entries();

    for (const [key, value] of entries) {
      acc.set(key, value);
    }

    return acc;
  }, new Map());
