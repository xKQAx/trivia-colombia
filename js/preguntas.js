/**
 * preguntas.js — Banco de preguntas.
 * Contiene y expone el conjunto de preguntas del trivia.
 */

export const CATEGORIAS = [
  { clave: 'geografia', nombre: 'Geografía', icono: 'mountain' },
  { clave: 'historia', nombre: 'Historia', icono: 'landmark' },
  { clave: 'cultura', nombre: 'Cultura y Tradiciones', icono: 'music' },
  { clave: 'deportes', nombre: 'Deportes', icono: 'trophy' },
  { clave: 'naturaleza', nombre: 'Ciencia y Naturaleza', icono: 'leaf' }
];

export const DIFICULTADES = [
  { clave: 'facil', nombre: 'Fácil', multiplicador: 1 },
  { clave: 'medio', nombre: 'Medio', multiplicador: 1.5 },
  { clave: 'dificil', nombre: 'Difícil', multiplicador: 2 }
];

export const PREGUNTAS = [
  // --- Geografía: fácil ---
  {
    id: 1,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Santander?',
    opciones: ['Cúcuta', 'Bucaramanga', 'Barrancabermeja', 'Socorro'],
    correcta: 1,
    explicacion: 'Bucaramanga es la capital de Santander, conocida como la Ciudad Bonita.'
  },
  {
    id: 2,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital de Colombia?',
    opciones: ['Bogotá', 'Medellín', 'Cali', 'Cartagena'],
    correcta: 0,
    explicacion: 'Bogotá es la capital de la República de Colombia desde el siglo XIX.'
  },
  {
    id: 3,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Con cuántos océanos tiene costa Colombia?',
    opciones: ['Uno', 'Tres', 'Dos', 'Ninguno'],
    correcta: 2,
    explicacion: 'Colombia tiene costas en el océano Atlántico (Caribe) y en el Pacífico.'
  },
  {
    id: 4,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿En qué departamento se encuentra la ciudad de Medellín?',
    opciones: ['Caldas', 'Risaralda', 'Quindío', 'Antioquia'],
    correcta: 3,
    explicacion: 'Medellín es la capital del departamento de Antioquia.'
  },
  {
    id: 5,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento del Valle del Cauca?',
    opciones: ['Cali', 'Palmira', 'Buenaventura', 'Tuluá'],
    correcta: 0,
    explicacion: 'Cali es la capital del Valle del Cauca y principal ciudad del suroccidente.'
  },
  {
    id: 6,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Qué ciudad costera es famosa por su muralla colonial?',
    opciones: ['Santa Marta', 'Barranquilla', 'Cartagena', 'Turbo'],
    correcta: 2,
    explicacion: 'Cartagena de Indias es conocida por su centro amurallado colonial.'
  },
  {
    id: 7,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Atlántico?',
    opciones: ['Cartagena', 'Barranquilla', 'Soledad', 'Sabanalarga'],
    correcta: 1,
    explicacion: 'Barranquilla es la capital del Atlántico y principal puerto del Caribe.'
  },
  {
    id: 8,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿En qué región natural está la mayoría de la Amazonía colombiana?',
    opciones: ['Andina', 'Caribe', 'Pacífica', 'Amazónica'],
    correcta: 3,
    explicacion: 'La región Amazónica concentra la mayor parte de la selva amazónica del país.'
  },
  {
    id: 9,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Bolívar?',
    opciones: ['Sincelejo', 'Montería', 'Cartagena', 'Magangué'],
    correcta: 2,
    explicacion: 'Cartagena es la capital del departamento de Bolívar.'
  },
  {
    id: 10,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Qué cordillera atraviesa gran parte del territorio colombiano?',
    opciones: ['Los Andes', 'Los Alpes', 'El Himalaya', 'Los Apeninos'],
    correcta: 0,
    explicacion: 'La cordillera de los Andes se divide en tres ramales en Colombia.'
  },
  // --- Geografía: medio ---
  {
    id: 11,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal río de Colombia que recorre el país de sur a norte?',
    opciones: ['Río Magdalena', 'Río Cauca', 'Río Amazonas', 'Río Orinoco'],
    correcta: 0,
    explicacion: 'El río Magdalena nace en el Macizo Colombiano y desemboca en el Caribe.'
  },
  {
    id: 12,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el departamento más grande de Colombia por área?',
    opciones: ['Meta', 'Amazonas', 'Vichada', 'Caquetá'],
    correcta: 1,
    explicacion: 'Amazonas es el departamento con mayor extensión territorial del país.'
  },
  {
    id: 13,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿En qué departamento está el desierto de la Tatacoa?',
    opciones: ['Tolima', 'Cesar', 'La Guajira', 'Huila'],
    correcta: 3,
    explicacion: 'El desierto de la Tatacoa se ubica en el departamento del Huila.'
  },
  {
    id: 14,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es la capital del departamento de Nariño?',
    opciones: ['Ipiales', 'Tumaco', 'Pasto', 'Túquerres'],
    correcta: 2,
    explicacion: 'Pasto es la capital de Nariño, en el sur del país.'
  },
  {
    id: 15,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Qué ciudad es capital del departamento de Boyacá?',
    opciones: ['Duitama', 'Tunja', 'Sogamoso', 'Chiquinquirá'],
    correcta: 1,
    explicacion: 'Tunja es la capital del departamento de Boyacá.'
  },
  {
    id: 16,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es la isla más grande del archipiélago de San Andrés?',
    opciones: ['Providencia', 'Santa Catalina', 'Gorgona', 'San Andrés'],
    correcta: 3,
    explicacion: 'San Andrés es la isla principal y más grande de ese archipiélago.'
  },
  {
    id: 17,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Qué departamento colombiano limita con Panamá?',
    opciones: ['Chocó', 'Antioquia', 'Córdoba', 'Norte de Santander'],
    correcta: 0,
    explicacion: 'El Chocó comparte frontera terrestre con Panamá en el Darién.'
  },
  {
    id: 18,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es la capital del departamento del Meta?',
    opciones: ['Yopal', 'Acacías', 'Villavicencio', 'Granada'],
    correcta: 2,
    explicacion: 'Villavicencio es la capital del Meta y puerta de los Llanos Orientales.'
  },
  {
    id: 19,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿En qué departamento nace el río Cauca?',
    opciones: ['Valle del Cauca', 'Antioquia', 'Caldas', 'Cauca'],
    correcta: 3,
    explicacion: 'El río Cauca nace en el Macizo Colombiano, en el departamento del Cauca.'
  },
  {
    id: 20,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es la capital de La Guajira?',
    opciones: ['Maicao', 'Riohacha', 'Uribia', 'Manaure'],
    correcta: 1,
    explicacion: 'Riohacha es la capital del departamento de La Guajira.'
  },
  // --- Geografía: difícil ---
  {
    id: 21,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el punto más septentrional de Colombia continental?',
    opciones: ['Cabo de la Vela', 'Punta Espada', 'Punta Gallinas', 'Bahía Portete'],
    correcta: 2,
    explicacion: 'Punta Gallinas, en La Guajira, es el extremo norte continental del país.'
  },
  {
    id: 22,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿En qué departamento está el parque nacional El Tuparro?',
    opciones: ['Vichada', 'Guainía', 'Vaupés', 'Arauca'],
    correcta: 0,
    explicacion: 'El parque nacional natural El Tuparro se encuentra en el Vichada.'
  },
  {
    id: 23,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es la capital del departamento de Vaupés?',
    opciones: ['Inírida', 'Leticia', 'Puerto Carreño', 'Mitú'],
    correcta: 3,
    explicacion: 'Mitú es la capital del departamento de Vaupés, en la Amazonia.'
  },
  {
    id: 24,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Qué río forma tramos de frontera con Venezuela al oriente?',
    opciones: ['Río Meta', 'Río Orinoco', 'Río Arauca', 'Río Guaviare'],
    correcta: 1,
    explicacion: 'El río Orinoco forma tramos fronterizos entre Colombia y Venezuela.'
  },
  {
    id: 25,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿En qué departamento se ubica la sierra de La Macarena?',
    opciones: ['Meta', 'Guaviare', 'Caquetá', 'Huila'],
    correcta: 0,
    explicacion: 'La sierra de La Macarena está en el departamento del Meta.'
  },
  {
    id: 26,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es la capital del departamento del Guainía?',
    opciones: ['Mitú', 'Puerto Carreño', 'Inírida', 'San José del Guaviare'],
    correcta: 2,
    explicacion: 'Inírida es la capital del departamento del Guainía.'
  },
  {
    id: 27,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Qué paso fronterizo une a Ipiales con Ecuador?',
    opciones: ['Paso de Cúcuta', 'Puente de Rumichaca', 'Paso del Darién', 'Puente de Leticia'],
    correcta: 1,
    explicacion: 'El puente de Rumichaca conecta Ipiales (Colombia) con Tulcán (Ecuador).'
  },
  {
    id: 28,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es la capital del departamento de Arauca?',
    opciones: ['Saravena', 'Tame', 'Fortul', 'Arauca'],
    correcta: 3,
    explicacion: 'La ciudad de Arauca es la capital del departamento homónimo.'
  },
  {
    id: 29,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Qué isla del Pacífico colombiano es parque nacional natural?',
    opciones: ['San Andrés', 'Providencia', 'Gorgona', 'Tierra Bomba'],
    correcta: 2,
    explicacion: 'La isla Gorgona es un parque nacional natural en el Pacífico.'
  },
  {
    id: 30,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es la capital del departamento de Putumayo?',
    opciones: ['Mocoa', 'Puerto Asís', 'Sibundoy', 'Orito'],
    correcta: 0,
    explicacion: 'Mocoa es la capital del departamento de Putumayo.'
  }
];
