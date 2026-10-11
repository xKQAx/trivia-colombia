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
  },
  // --- Historia: fácil ---
  {
    id: 31,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué año se firmó el Acta de Independencia de Colombia?',
    opciones: ['1810', '1819', '1821', '1830'],
    correcta: 0,
    explicacion: 'El 20 de julio de 1810 se firmó el Acta de Independencia en Bogotá.'
  },
  {
    id: 32,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién es conocido como el Libertador de América?',
    opciones: ['Francisco de Paula Santander', 'Antonio Nariño', 'Simón Bolívar', 'José María Córdoba'],
    correcta: 2,
    explicacion: 'Simón Bolívar lideró campañas independentistas en varios países andinos.'
  },
  {
    id: 33,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué batalla consolidó la independencia de la Nueva Granada en 1819?',
    opciones: ['Batalla de Carabobo', 'Batalla de Boyacá', 'Batalla de Ayacucho', 'Batalla del Pantano'],
    correcta: 1,
    explicacion: 'La batalla de Boyacá, el 7 de agosto de 1819, fue decisiva para la independencia.'
  },
  {
    id: 34,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién es llamado el Hombre de las Leyes en Colombia?',
    opciones: ['Simón Bolívar', 'Camilo Torres', 'Antonio Nariño', 'Francisco de Paula Santander'],
    correcta: 3,
    explicacion: 'Francisco de Paula Santander es recordado como el Hombre de las Leyes.'
  },
  {
    id: 35,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué ciudad fue sede del Grito de Independencia del 20 de julio?',
    opciones: ['Cartagena', 'Santa Fe de Bogotá', 'Tunja', 'Cartago'],
    correcta: 1,
    explicacion: 'Los hechos del 20 de julio de 1810 ocurrieron en Santa Fe de Bogotá.'
  },
  {
    id: 36,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué país europeo colonizó el territorio de la actual Colombia?',
    opciones: ['Portugal', 'Francia', 'Inglaterra', 'España'],
    correcta: 3,
    explicacion: 'España colonizó gran parte del territorio que hoy es Colombia.'
  },
  {
    id: 37,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Cómo se llamó la república fundada tras la campaña de 1819?',
    opciones: ['Gran Colombia', 'Nueva Granada', 'República de Colombia', 'Virreinato'],
    correcta: 0,
    explicacion: 'Tras 1819 se consolidó la Gran Colombia, que unía varios territorios.'
  },
  {
    id: 38,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién tradujo al español los Derechos del Hombre y del Ciudadano?',
    opciones: ['Bolívar', 'Santander', 'Antonio Nariño', 'Policarpa Salavarrieta'],
    correcta: 2,
    explicacion: 'Antonio Nariño tradujo y difundió los Derechos del Hombre en la Nueva Granada.'
  },
  {
    id: 39,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué heroína independentista es conocida como La Pola?',
    opciones: ['Manuelita Sáenz', 'Antonia Santos', 'Josefa Acevedo', 'Policarpa Salavarrieta'],
    correcta: 3,
    explicacion: 'Policarpa Salavarrieta, La Pola, fue una espía y mártir de la independencia.'
  },
  {
    id: 40,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué siglo ocurrieron los primeros viajes de Colón al Caribe?',
    opciones: ['Siglo XIV', 'Siglo XV', 'Siglo XVI', 'Siglo XVII'],
    correcta: 1,
    explicacion: 'Los viajes de Colón al Caribe ocurrieron a finales del siglo XV.'
  },
  // --- Historia: medio ---
  {
    id: 41,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año se disolvió la Gran Colombia?',
    opciones: ['1819', '1821', '1830', '1886'],
    correcta: 2,
    explicacion: 'La Gran Colombia se disolvió en 1830 tras crisis políticas internas.'
  },
  {
    id: 42,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué constitución adoptó Colombia en 1991?',
    opciones: ['Constitución de 1886', 'Constitución de 1863', 'Acta de 1810', 'Constitución de 1991'],
    correcta: 3,
    explicacion: 'La Constitución Política de 1991 es la carta magna vigente en Colombia.'
  },
  {
    id: 43,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Quién lideró la Campaña Libertadora desde los Llanos en 1819?',
    opciones: ['Simón Bolívar', 'Antonio José de Sucre', 'José Antonio Páez', 'Francisco Miranda'],
    correcta: 0,
    explicacion: 'Simón Bolívar cruzó los Andes desde los Llanos en la campaña de 1819.'
  },
  {
    id: 44,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué nombre recibió el país entre 1831 y 1858 aproximadamente?',
    opciones: ['Gran Colombia', 'Estados Unidos de Colombia', 'República de Nueva Granada', 'Virreinato'],
    correcta: 2,
    explicacion: 'Tras la disolución de la Gran Colombia surgió la República de Nueva Granada.'
  },
  {
    id: 45,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se promulgó la Constitución de 1886?',
    opciones: ['Medellín', 'Bogotá', 'Cartagena', 'Cali'],
    correcta: 1,
    explicacion: 'La Constitución de 1886 fue promulgada en Bogotá y rigió por un siglo.'
  },
  {
    id: 46,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué conflicto civil de inicios del siglo XX enfrentó a liberales y conservadores?',
    opciones: ['Guerra de los Mil Días', 'Guerra Civil Española', 'Guerra del Pacífico', 'Guerra de Secesión'],
    correcta: 0,
    explicacion: 'La Guerra de los Mil Días (1899-1902) fue un conflicto entre partidos tradicionales.'
  },
  {
    id: 47,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año se separó Panamá de Colombia?',
    opciones: ['1899', '1910', '1903', '1921'],
    correcta: 2,
    explicacion: 'Panamá se separó de Colombia en 1903.'
  },
  {
    id: 48,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Quién fue el primer presidente de la Gran Colombia?',
    opciones: ['Santander', 'Nariño', 'Sucre', 'Simón Bolívar'],
    correcta: 3,
    explicacion: 'Simón Bolívar fue el primer presidente de la Gran Colombia.'
  },
  {
    id: 49,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué hecho del 9 de abril de 1948 desencadenó El Bogotazo?',
    opciones: ['El asesinato de Gaitán', 'La toma de Cartagena', 'La batalla de Boyacá', 'La separación de Panamá'],
    correcta: 0,
    explicacion: 'El asesinato de Jorge Eliécer Gaitán el 9 de abril de 1948 originó El Bogotazo.'
  },
  {
    id: 50,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué cultura prehispánica construyó Ciudad Perdida en la Sierra Nevada?',
    opciones: ['Muisca', 'Tayrona', 'Quimbaya', 'Zenú'],
    correcta: 1,
    explicacion: 'Ciudad Perdida (Teyuna) fue construida por la cultura tayrona.'
  },
  // --- Historia: difícil ---
  {
    id: 51,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año se creó el Virreinato de la Nueva Granada?',
    opciones: ['1492', '1810', '1717', '1830'],
    correcta: 2,
    explicacion: 'El Virreinato de la Nueva Granada se estableció en 1717.'
  },
  {
    id: 52,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué tratado de 1928 trató la soberanía sobre San Andrés con Nicaragua?',
    opciones: ['Tratado Esguerra-Bárcenas', 'Tratado de Tordesillas', 'Pacto de Bogotá', 'Tratado de Guadalupe'],
    correcta: 0,
    explicacion: 'El tratado Esguerra-Bárcenas de 1928 abordó la soberanía sobre San Andrés.'
  },
  {
    id: 53,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año se adoptó la Constitución que rigió hasta 1991?',
    opciones: ['1810', '1863', '1830', '1886'],
    correcta: 3,
    explicacion: 'La Constitución de 1886 rigió hasta la Asamblea Constituyente de 1991.'
  },
  {
    id: 54,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué villa se inició la Revolución de los Comuneros en 1781?',
    opciones: ['Tunja', 'El Socorro', 'Zipaquirá', 'Cartagena'],
    correcta: 1,
    explicacion: 'La Revolución de los Comuneros comenzó en la villa del Socorro.'
  },
  {
    id: 55,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué batalla de 1819 abrió el paso hacia Santa Fe tras el páramo?',
    opciones: ['Batalla de Ayacucho', 'Batalla de Carabobo', 'Batalla de Junín', 'Batalla del Pantano de Vargas'],
    correcta: 3,
    explicacion: 'La batalla del Pantano de Vargas (1819) precedió a la de Boyacá.'
  },
  {
    id: 56,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año se reunió el Congreso de Cúcuta?',
    opciones: ['1819', '1821', '1830', '1810'],
    correcta: 1,
    explicacion: 'El Congreso de Cúcuta de 1821 organizó constitucionalmente la Gran Colombia.'
  },
  {
    id: 57,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Quién fue una figura central de la Revolución de los Comuneros en 1781?',
    opciones: ['Antonio Nariño', 'Simón Bolívar', 'José Antonio Galán', 'Camilo Torres'],
    correcta: 2,
    explicacion: 'José Antonio Galán fue una figura central de la Revolución de los Comuneros.'
  },
  {
    id: 58,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué nombre tuvo Colombia entre 1863 y 1886?',
    opciones: ['Gran Colombia', 'Nueva Granada', 'Virreinato', 'Estados Unidos de Colombia'],
    correcta: 3,
    explicacion: 'Entre 1863 y 1886 el país se llamó Estados Unidos de Colombia.'
  },
  {
    id: 59,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué siglo se abrió el Canal del Dique hacia el Magdalena?',
    opciones: ['Siglo XVI', 'Siglo XVII', 'Siglo XIX', 'Siglo XX'],
    correcta: 1,
    explicacion: 'El Canal del Dique se abrió en el siglo XVII para comunicar Cartagena con el Magdalena.'
  },
  {
    id: 60,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué presidente impulsó la Regeneración a finales del siglo XIX?',
    opciones: ['Rafael Núñez', 'Tomás Cipriano de Mosquera', 'Alfonso López', 'Carlos Lleras'],
    correcta: 0,
    explicacion: 'Rafael Núñez impulsó la Regeneración y la Constitución de 1886.'
  }
];
