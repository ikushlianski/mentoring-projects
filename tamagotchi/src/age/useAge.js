import {useState} from 'react';

import {DEFAULT_AGE, HOW_OFTEN_AGE_INCREMENTS_MS} from './constants';

export const useAge = () => {
  const [age, setAge] = useState(DEFAULT_AGE)

  setInterval(() => {
    setAge(prev => prev + 1)
  }, HOW_OFTEN_AGE_INCREMENTS_MS)

  return age
}
