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
  },
  // --- Cultura: fácil ---
  {
    id: 61,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cuál es el baile típico más representativo de la región Caribe colombiana?',
    opciones: ['Bambuco', 'Joropo', 'Cumbia', 'Pasillo'],
    correcta: 2,
    explicacion: 'La cumbia es uno de los ritmos y bailes emblemáticos del Caribe colombiano.'
  },
  {
    id: 62,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué escritor colombiano recibió el Premio Nobel de Literatura?',
    opciones: ['Gabriel García Márquez', 'Álvaro Mutis', 'Fernando Vallejo', 'Rafael Pombo'],
    correcta: 0,
    explicacion: 'Gabriel García Márquez obtuvo el Nobel de Literatura en 1982.'
  },
  {
    id: 63,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué arepa se asocia tradicionalmente con la costa Caribe?',
    opciones: ['Arepa de chócolo', 'Arepa boyacense', 'Arepa de mote', 'Arepa de huevo'],
    correcta: 3,
    explicacion: 'La arepa de huevo es un típico frito de la cocina costeña colombiana.'
  },
  {
    id: 64,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué sombrero típico es símbolo cultural de Colombia?',
    opciones: ['Sombrero charro', 'Sombrero vueltiao', 'Boina vasca', 'Panamá clásico'],
    correcta: 1,
    explicacion: 'El sombrero vueltiao, de origen zenú, es un símbolo cultural nacional.'
  },
  {
    id: 65,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué ritmo llanero es típico de la Orinoquía colombiana?',
    opciones: ['Vallenato', 'Bambuco', 'Currulao', 'Joropo'],
    correcta: 3,
    explicacion: 'El joropo es el baile y la música característicos de los Llanos.'
  },
  {
    id: 66,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cuál es el plato típico antioqueño con frijoles, arroz y carne?',
    opciones: ['Ajiaco', 'Bandeja paisa', 'Sancocho', 'Lechona'],
    correcta: 1,
    explicacion: 'La bandeja paisa es el plato más representativo de la cocina antioqueña.'
  },
  {
    id: 67,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué instrumento de percusión es esencial en el vallenato?',
    opciones: ['Tambora', 'Marimba', 'Caja vallenata', 'Bongó'],
    correcta: 2,
    explicacion: 'La caja, junto al acordeón y la guacharaca, define el vallenato.'
  },
  {
    id: 68,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué novela famosa escribió Gabriel García Márquez?',
    opciones: ['Cien años de soledad', 'La vorágine', 'María', 'La tejedora de coronas'],
    correcta: 0,
    explicacion: 'Cien años de soledad es la novela más conocida de García Márquez.'
  },
  {
    id: 69,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué carnaval de Nariño es famoso por carrozas y comparsas?',
    opciones: ['Feria de las Flores', 'Carnaval de Negros y Blancos', 'Festival Vallenato', 'Fiesta del Mar'],
    correcta: 1,
    explicacion: 'El Carnaval de Negros y Blancos de Pasto es Patrimonio de la Humanidad.'
  },
  {
    id: 70,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué personaje del folclor cafetero promociona el café colombiano?',
    opciones: ['El Dorado', 'La Madremonte', 'El Mohán', 'Juan Valdez'],
    correcta: 3,
    explicacion: 'Juan Valdez es el personaje emblemático de la Federación Nacional de Cafeteros.'
  },
  // --- Cultura: medio ---
  {
    id: 71,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué ciudad colombiana tiene un carnaval declarado Patrimonio de la UNESCO?',
    opciones: ['Barranquilla', 'Cali', 'Medellín', 'Manizales'],
    correcta: 0,
    explicacion: 'El Carnaval de Barranquilla es Patrimonio Cultural Inmaterial de la Humanidad.'
  },
  {
    id: 72,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué pintora antioqueña es pionera del arte moderno en Colombia?',
    opciones: ['Lucy Tejada', 'Emma Reyes', 'Débora Arango', 'Doris Salcedo'],
    correcta: 2,
    explicacion: 'Débora Arango es una figura pionera del arte moderno colombiano.'
  },
  {
    id: 73,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué ritmo del Pacífico usa la marimba de chonta?',
    opciones: ['Bambuco', 'Currulao', 'Pasillo', 'Torbellino'],
    correcta: 1,
    explicacion: 'El currulao es un ritmo del Pacífico asociado a la marimba de chonta.'
  },
  {
    id: 74,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué sopa bogotana lleva pollo, papa y guascas?',
    opciones: ['Sancocho', 'Mondongo', 'Changua', 'Ajiaco'],
    correcta: 3,
    explicacion: 'El ajiaco santafereño lleva pollo, papas y guascas.'
  },
  {
    id: 75,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se celebra la Feria de las Flores?',
    opciones: ['Bogotá', 'Cali', 'Medellín', 'Pereira'],
    correcta: 2,
    explicacion: 'La Feria de las Flores es la fiesta más emblemática de Medellín.'
  },
  {
    id: 76,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué pueblo antioqueño es famoso por sus zócalos coloridos?',
    opciones: ['Guatapé', 'Villa de Leyva', 'Barichara', 'Salento'],
    correcta: 0,
    explicacion: 'Guatapé es conocido por sus zócalos adornados y el Peñol cercano.'
  },
  {
    id: 77,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué género de la Costa Atlántica usa acordeón, caja y guacharaca?',
    opciones: ['Cumbia', 'Porro', 'Merecumbé', 'Vallenato'],
    correcta: 3,
    explicacion: 'El vallenato se interpreta tradicionalmente con acordeón, caja y guacharaca.'
  },
  {
    id: 78,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Quién es el artista colombiano famoso por sus figuras voluminosas?',
    opciones: ['Alejandro Obregón', 'Fernando Botero', 'Edgar Negret', 'Luis Alberto Acuña'],
    correcta: 1,
    explicacion: 'Fernando Botero es conocido mundialmente por el boterismo y sus volúmenes.'
  },
  {
    id: 79,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué baile andino es típico del interior montañoso colombiano?',
    opciones: ['Bambuco', 'Cumbia', 'Mapalé', 'Champeta'],
    correcta: 0,
    explicacion: 'El bambuco es un baile tradicional de la región Andina colombiana.'
  },
  {
    id: 80,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué gran festival de teatro se realiza periódicamente en Bogotá?',
    opciones: ['Festival de Cannes', 'Festival de Edimburgo', 'Festival Iberoamericano de Teatro', 'Festival de Aviñón'],
    correcta: 2,
    explicacion: 'El Festival Iberoamericano de Teatro de Bogotá es un evento cultural mayor.'
  },
  // --- Cultura: difícil ---
  {
    id: 81,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué poeta modernista escribió Nocturno III?',
    opciones: ['Rafael Pombo', 'Porfirio Barba Jacob', 'Guillermo Valencia', 'José Asunción Silva'],
    correcta: 3,
    explicacion: 'José Asunción Silva es autor del célebre Nocturno III.'
  },
  {
    id: 82,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué técnica artesanal nariñense usa resina vegetal sobre madera?',
    opciones: ['Tejido zenú', 'Barniz de Pasto', 'Sombrero aguadeño', 'Cerámica de Ráquira'],
    correcta: 1,
    explicacion: 'El barniz de Pasto es una técnica artesanal reconocida del sur de Colombia.'
  },
  {
    id: 83,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué acordeonero es figura clásica del vallenato del siglo XX?',
    opciones: ['Alejo Durán', 'Carlos Vives', 'Juanes', 'Shakira'],
    correcta: 0,
    explicacion: 'Alejo Durán es una de las grandes figuras clásicas del vallenato.'
  },
  {
    id: 84,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿En qué municipio del Magdalena se ubica la leyenda del Hombre Caimán?',
    opciones: ['Santa Marta', 'Ciénaga', 'Plato', 'El Banco'],
    correcta: 2,
    explicacion: 'La leyenda del Hombre Caimán se asocia al municipio de Plato.'
  },
  {
    id: 85,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué obra de Jorge Isaacs es un clásico del romanticismo colombiano?',
    opciones: ['La vorágine', 'María', 'El carnero', 'Manuela'],
    correcta: 1,
    explicacion: 'María, de Jorge Isaacs, es un clásico del romanticismo en Colombia.'
  },
  {
    id: 86,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué pueblo indígena es conocido por sus mochilas tejidas coloridas?',
    opciones: ['Embera', 'Nasa', 'Ticuna', 'Wayuu'],
    correcta: 3,
    explicacion: 'El pueblo wayuu es reconocido por sus mochilas tejidas a mano.'
  },
  {
    id: 87,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué ritmo afrocaribeño de la Costa se baila con gran energía?',
    opciones: ['Pasillo', 'Bambuco', 'Mapalé', 'Torbellino'],
    correcta: 2,
    explicacion: 'El mapalé es un ritmo y baile afrocaribeño de la Costa Caribe.'
  },
  {
    id: 88,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué escritor escribió La vorágine, novela de la selva?',
    opciones: ['José Eustasio Rivera', 'Germán Espinosa', 'León de Greiff', 'Tomás Carrasquilla'],
    correcta: 0,
    explicacion: 'José Eustasio Rivera es el autor de La vorágine.'
  },
  {
    id: 89,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué ciudad es sede del Festival de la Leyenda Vallenata?',
    opciones: ['Santa Marta', 'Riohacha', 'Sincelejo', 'Valledupar'],
    correcta: 3,
    explicacion: 'El Festival de la Leyenda Vallenata se celebra en Valledupar.'
  },
  {
    id: 90,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué técnica orfebre es típica de Santa Cruz de Mompox?',
    opciones: ['Talla en piedra', 'Filigrana en plata', 'Cerámica negra', 'Orfebrería en platino'],
    correcta: 1,
    explicacion: 'Mompox es famosa por su filigrana en plata de tradición colonial.'
  },
  // --- Deportes: fácil ---
  {
    id: 91,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cuál es el deporte más popular en Colombia?',
    opciones: ['Ciclismo', 'Béisbol', 'Baloncesto', 'Fútbol'],
    correcta: 3,
    explicacion: 'El fútbol es el deporte con mayor afición y seguimiento en Colombia.'
  },
  {
    id: 92,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cómo se conoce popularmente al futbolista Carlos Valderrama?',
    opciones: ['El Crack', 'El Pibe', 'El Tunelero', 'El Crack Paisa'],
    correcta: 1,
    explicacion: 'Carlos Valderrama es conocido como El Pibe.'
  },
  {
    id: 93,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué ciudad está el estadio Nemesio Camacho El Campín?',
    opciones: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'],
    correcta: 0,
    explicacion: 'El Campín es el estadio más emblemático de Bogotá.'
  },
  {
    id: 94,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué color usa tradicionalmente la camiseta de la selección Colombia?',
    opciones: ['Rojo', 'Azul', 'Amarillo', 'Verde'],
    correcta: 2,
    explicacion: 'La camiseta titular tradicional de Colombia es amarilla.'
  },
  {
    id: 95,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué equipo de Medellín es conocido como El Verde?',
    opciones: ['Atlético Nacional', 'Millonarios', 'América de Cali', 'Junior'],
    correcta: 0,
    explicacion: 'Atlético Nacional es conocido como El Verde o El Verdolaga.'
  },
  {
    id: 96,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué deporte destacó Mariana Pajón en Juegos Olímpicos?',
    opciones: ['Natación', 'Atletismo', 'BMX', 'Gimnasia'],
    correcta: 2,
    explicacion: 'Mariana Pajón es medallista olímpica colombiana en BMX.'
  },
  {
    id: 97,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué arquero colombiano es famoso por la patada de escorpión?',
    opciones: ['Óscar Córdoba', 'Faryd Mondragón', 'David Ospina', 'René Higuita'],
    correcta: 3,
    explicacion: 'René Higuita popularizó la atajada conocida como el escorpión.'
  },
  {
    id: 98,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué ciudad es sede del estadio Metropolitano Roberto Meléndez?',
    opciones: ['Cartagena', 'Barranquilla', 'Santa Marta', 'Sincelejo'],
    correcta: 1,
    explicacion: 'El Metropolitano es el principal estadio de Barranquilla.'
  },
  {
    id: 99,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué club bogotano es conocido como Los Embajadores?',
    opciones: ['Santa Fe', 'Envigado', 'Millonarios', 'Fortaleza'],
    correcta: 2,
    explicacion: 'Millonarios Fútbol Club es conocido como Los Embajadores.'
  },
  {
    id: 100,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué deporte se asocia a la clásica Vuelta a Colombia?',
    opciones: ['Ciclismo', 'Motocross', 'Atletismo', 'Remo'],
    correcta: 0,
    explicacion: 'La Vuelta a Colombia es una competencia clásica de ciclismo.'
  },
  // --- Deportes: medio ---
  {
    id: 101,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué ciclista colombiano ganó el Tour de Francia 2019?',
    opciones: ['Nairo Quintana', 'Egan Bernal', 'Rigoberto Urán', 'Esteban Chaves'],
    correcta: 1,
    explicacion: 'Egan Bernal se coronó campeón del Tour de Francia en 2019.'
  },
  {
    id: 102,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿En qué año Colombia fue sede de la Copa América?',
    opciones: ['1990', '1994', '1998', '2001'],
    correcta: 3,
    explicacion: 'Colombia organizó la Copa América de 2001 y además la ganó.'
  },
  {
    id: 103,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué atleta ganó oro olímpico en triple salto en Río 2016?',
    opciones: ['Sandra Arenas', 'Yulimar Rojas', 'Caterine Ibargüen', 'Ximena Restrepo'],
    correcta: 2,
    explicacion: 'Caterine Ibargüen obtuvo el oro olímpico en triple salto en 2016.'
  },
  {
    id: 104,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué piloto colombiano compitió en Fórmula 1 e IndyCar?',
    opciones: ['Juan Pablo Montoya', 'Roberto Guerrero', 'Carlos Muñoz', 'Gustavo Yacamán'],
    correcta: 0,
    explicacion: 'Juan Pablo Montoya destacó en Fórmula 1, IndyCar y otras categorías.'
  },
  {
    id: 105,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué ciclista colombiano ganó el Giro de Italia en 2014?',
    opciones: ['Egan Bernal', 'Rigoberto Urán', 'Lucho Herrera', 'Nairo Quintana'],
    correcta: 3,
    explicacion: 'Nairo Quintana ganó el Giro de Italia en 2014.'
  },
  {
    id: 106,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué boxeador colombiano fue campeón mundial ligero welter?',
    opciones: ['Rodrigo Valdés', 'Kid Pambelé', 'Miguel Happy Lora', 'Fidel Bassa'],
    correcta: 1,
    explicacion: 'Antonio Cervantes, Kid Pambelé, fue campeón mundial de boxeo.'
  },
  {
    id: 107,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué club caleño es conocido como Los Diablos Rojos?',
    opciones: ['América de Cali', 'Deportivo Cali', 'Once Caldas', 'Junior'],
    correcta: 0,
    explicacion: 'América de Cali es apodado Los Diablos Rojos.'
  },
  {
    id: 108,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿En qué deporte olímpico destacó Óscar Figueroa con oro en Río 2016?',
    opciones: ['Judo', 'Boxeo', 'Halterofilia', 'Lucha'],
    correcta: 2,
    explicacion: 'Óscar Figueroa ganó oro olímpico en halterofilia en 2016.'
  },
  {
    id: 109,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué estadio de Medellín comparten Nacional y Medellín?',
    opciones: ['El Campín', 'Atanasio Girardot', 'Pascual Guerrero', 'Palogrande'],
    correcta: 1,
    explicacion: 'El Atanasio Girardot es el estadio principal de Medellín.'
  },
  {
    id: 110,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué futbolista colombiano brilló en el Napoli italiano en los 90?',
    opciones: ['Iván Valenciano', 'Arnoldo Iguarán', 'Willington Ortiz', 'Faustino Asprilla'],
    correcta: 3,
    explicacion: 'Faustino Asprilla tuvo una etapa destacada en el Napoli.'
  },
  // --- Deportes: difícil ---
  {
    id: 111,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué ciclista colombiano ganó la Vuelta a España en 1987?',
    opciones: ['Lucho Herrera', 'Fabio Parra', 'Martín Emilio Cochise', 'Santiago Botero'],
    correcta: 0,
    explicacion: 'Luis Lucho Herrera ganó la Vuelta a España en 1987.'
  },
  {
    id: 112,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué municipio nació el boxeador Kid Pambelé?',
    opciones: ['Cartagena', 'Barranquilla', 'San Juan de Nepomuceno', 'Sincelejo'],
    correcta: 2,
    explicacion: 'Antonio Cervantes nació en San Juan de Nepomuceno, Bolívar.'
  },
  {
    id: 113,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué club ganó la Copa Libertadores en 1989?',
    opciones: ['Millonarios', 'América de Cali', 'Junior', 'Atlético Nacional'],
    correcta: 3,
    explicacion: 'Atlético Nacional conquistó la Copa Libertadores en 1989.'
  },
  {
    id: 114,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué atleta colombiana ganó bronce en 400 metros en Barcelona 1992?',
    opciones: ['Caterine Ibargüen', 'Ximena Restrepo', 'Sandra Arenas', 'Norma Enriqueta Basilio'],
    correcta: 1,
    explicacion: 'Ximena Restrepo obtuvo bronce olímpico en 400 metros en 1992.'
  },
  {
    id: 115,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué equipo de Manizales es conocido como El Blanco?',
    opciones: ['Deportivo Pereira', 'Once Caldas', 'Envigado', 'Fortaleza'],
    correcta: 1,
    explicacion: 'Once Caldas, de Manizales, es conocido como El Blanco.'
  },
  {
    id: 116,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué ciclista fue pionero colombiano en el ciclismo europeo de ruta?',
    opciones: ['Nairo Quintana', 'Egan Bernal', 'Lucho Herrera', 'Martín Emilio Cochise'],
    correcta: 3,
    explicacion: 'Martín Emilio Cochise Rodríguez fue pionero del ciclismo colombiano en Europa.'
  },
  {
    id: 117,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué año Once Caldas ganó la Copa Libertadores?',
    opciones: ['2001', '2004', '2002', '2005'],
    correcta: 1,
    explicacion: 'Once Caldas se coronó campeón de la Copa Libertadores en 2004.'
  },
  {
    id: 118,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué patinadora colombiana fue campeona mundial de velocidad?',
    opciones: ['Cecilia Baena', 'Clara Hughes', 'Ellen van Dijk', 'Andrea Jaramillo'],
    correcta: 0,
    explicacion: 'Cecilia Baena es una destacada campeona mundial de patinaje.'
  },
  {
    id: 119,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué estadio es el principal escenario futbolístico de Cali?',
    opciones: ['Atanasio Girardot', 'El Campín', 'Metropolitano', 'Pascual Guerrero'],
    correcta: 3,
    explicacion: 'El estadio Olímpico Pascual Guerrero es el principal de Cali.'
  },
  {
    id: 120,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Quién fue máximo goleador histórico de la selección antes de Falcao?',
    opciones: ['Carlos Bacca', 'James Rodríguez', 'Arnoldo Iguarán', 'Freddy Rincón'],
    correcta: 2,
    explicacion: 'Arnoldo Iguarán fue el máximo goleador histórico antes de Falcao.'
  },
];
