import {
  MdVerifiedUser,
  MdWarning
} from 'react-icons/md';

/**
 *  == EXEMPLO DE ARRAY VISUAL DE "MÁQUINAS" ==
 * 
 *  => DEFINIÇÕES:
 *    + O ícone "MdVerifiedUser" deve ser usado quando um container está OK pelo adaptive
 *    + O ícone "MdLightbulbOutline" nas demais situações
 */
export const machines = [

  /** EXEMPLO DE CONTAINER [NEUTRO] */
  {
    // Visuais
    bgColor: 'success',
    icon: MdVerifiedUser,
    inverse: false,

    // Da API
    name: 'Ubuntu 16.04',
    status: 'Funcionando',  // STATUS DO ADAPTIVE (se quiser, pode trocar pra 0 e 1, mas vai precisar alterar a view)
    message: 'Informações localizadas',
    progress: [
      {
        label: "CPU",
        value: "90%",
        percentage: "90",
        color: "danger" // < 75 = success || > = danger
      },
      {
        label: "RAM",
        value: "1024MB",
        percentage: "70",
        color: "success" // < 75 = success || > = danger
      },
    ]
  },

  /** EXEMPLO DE CONTAINER [COM FALHA] */
  {
    // Visuais
    bgColor: 'danger',
    icon: MdWarning,
    inverse: false,

    // Da API
    name: 'Postgres',
    status: 'Com Falha',  // STATUS DO ADAPTIVE (se quiser, pode trocar pra 0 e 1, mas vai precisar alterar a view)
    message: 'Informações localizadas',
    progress: [
      {
        label: "CPU",
        value: "90%",
        percentage: "90",
        color: "danger" // < 75 = success || > = danger
      },
      {
        label: "RAM",
        value: "1024MB",
        percentage: "70",
        color: "success" // < 75 = success || > = danger
      },
    ]
  },

  /** EXEMPLO DE CONTAINER [PERFEITO] */
  {
    // Visuais
    bgColor: 'success',
    icon: MdVerifiedUser,
    inverse: false,

    // Da API
    name: 'MySQL',
    status: 'Funcionando',  // STATUS DO ADAPTIVE (se quiser, pode trocar pra 0 e 1, mas vai precisar alterar a view)
    message: 'Informações localizadas',
    progress: [
      {
        label: "CPU",
        value: "45%",
        percentage: "45",
        color: "success" // < 75 = success || > = danger
      },
      {
        label: "RAM",
        value: "512MB",
        percentage: "15",
        color: "success" // < 75 = success || > = danger
      },
    ]
  },
];

export const numberWidgetsData = [
  { color: 'primary' },
  { color: 'secondary' },
  { color: 'success' },
  { color: 'info' },
  { color: 'warning' },
  { color: 'danger' },
  { color: 'light' },
  { color: 'dark' },
];
