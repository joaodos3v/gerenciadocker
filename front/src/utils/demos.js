import random from 'faker/lib/random';
import { getColor } from 'utils/colors';

const MONTHS = ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'];




export const randomNum = (min = 0, max = 1000) => {
  return random().number({ min, max });
};






export const getBarData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Pré-Implantação',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(250, 1000),
          randomNum(250, 1000),
          randomNum(250, 1000),
          randomNum(250, 1000),
          randomNum(250, 1000),
          randomNum(250, 1000),
          randomNum(250, 1000),
        ],
        ...moreData,
      },
      {
        label: 'Pós-Implantação',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(50, 300),
          randomNum(50, 300),
          randomNum(50, 300),
          randomNum(50, 300),
          randomNum(50, 300),
          randomNum(50, 300),
          randomNum(50, 300),
        ],
        ...moreData2,
      },
    ],
  };
};






export const getLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Antes do software',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(0, 75),
          randomNum(0, 75),
          randomNum(0, 75),
          randomNum(0, 75),
          randomNum(0, 75),
          randomNum(0, 75),
          randomNum(0, 75),
        ],
        ...moreData,
      },
      {
        label: 'Depois do software',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(50, 100),
          randomNum(50, 100),
          randomNum(50, 100),
          randomNum(50, 100),
          randomNum(50, 100),
          randomNum(50, 100),
          randomNum(50, 100),
        ],
        ...moreData2,
      },
    ],
  };
};
