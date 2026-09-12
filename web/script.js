// Kaun Banega Arabpati - Web Quiz Game
// Accounts, scores, and history are stored in this browser's localStorage only.
// NOTE: password storage here uses a simple hash for basic obfuscation, NOT
// real cryptographic security. Do not reuse an important password here.

// Prize ladder matching the real KBC (Kaun Banega Crorepati) show's classic amounts.
const PRIZES = [
  "1,000", "2,000", "3,000", "5,000", "10,000",
  "20,000", "40,000", "80,000", "1,60,000", "3,20,000",
  "6,40,000", "12,50,000", "25,00,000", "50,00,000", "1,00,00,000"
];

const SAFE_LEVELS = new Set([5, 10]); // guaranteed checkpoints, matching the real show
const LETTERS = ["A", "B", "C", "D"];
const TIME_PER_QUESTION = 20; // seconds

// ---------- Question pools, grouped by category then difficulty ----------
const CATEGORIES = {
  general: {
    label: "General Knowledge",
    pools: {
      easy: [
        { q: "How many days are there in a leap year?", options: ["364", "365", "366", "367"], correct: 2 },
        { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
        { q: "What is the freezing point of water in Celsius?", options: ["0\u00b0C", "10\u00b0C", "32\u00b0C", "-10\u00b0C"], correct: 0 },
        { q: "Which animal is known as the 'Ship of the Desert'?", options: ["Horse", "Camel", "Elephant", "Goat"], correct: 1 },
        { q: "How many players are there in a cricket team?", options: ["9", "10", "11", "12"], correct: 2 },
        { q: "Which gas do plants absorb from the air for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
        { q: "What is the capital city of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correct: 2 },
        { q: "Which of these is a primary color?", options: ["Green", "Purple", "Orange", "Blue"], correct: 3 },
        { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "Which fruit is known for keeping the doctor away?", options: ["Banana", "Apple", "Grapes", "Mango"], correct: 1 },
        { q: "What do bees produce?", options: ["Milk", "Silk", "Honey", "Wax only"], correct: 2 },
        { q: "Which shape has three sides?", options: ["Square", "Triangle", "Circle", "Pentagon"], correct: 1 },
        { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
        { q: "Which instrument is used to tell time?", options: ["Thermometer", "Clock", "Barometer", "Compass"], correct: 1 },
        { q: "How many legs does a spider have?", options: ["6", "8", "10", "4"], correct: 1 },
        { q: "Which shape has four equal sides?", options: ["Rectangle", "Square", "Triangle", "Circle"], correct: 1 },
        { q: "What do we call frozen water?", options: ["Steam", "Ice", "Fog", "Frost"], correct: 1 },
        { q: "How many hours are there in a day?", options: ["12", "20", "24", "30"], correct: 2 },
        { q: "Which is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], correct: 2 },
        { q: "What color do you get by mixing blue and yellow?", options: ["Purple", "Green", "Orange", "Pink"], correct: 1 },
        { q: "Which animal is often called man's best friend?", options: ["Cat", "Dog", "Horse", "Parrot"], correct: 1 },
        { q: "How many minutes are there in an hour?", options: ["30", "45", "60", "90"], correct: 2 },
        { q: "What is the opposite of hot?", options: ["Warm", "Cold", "Dry", "Wet"], correct: 1 },
        { q: "Which season typically comes right after winter?", options: ["Summer", "Autumn", "Spring", "Monsoon"], correct: 2 },
        { q: "How many wheels does a standard bicycle have?", options: ["1", "2", "3", "4"], correct: 1 },
        { q: "Which of these is a citrus fruit?", options: ["Banana", "Orange", "Mango", "Grapes"], correct: 1 },
        { q: "Which meal do people typically eat in the morning?", options: ["Lunch", "Dinner", "Breakfast", "Supper"], correct: 2 },
        { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1 },
        { q: "What is the capital city of France?", options: ["Lyon", "Marseille", "Paris", "Nice"], correct: 2 },
        { q: "Which ocean is the smallest in the world?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 3 },
        { q: "What do you call a baby dog?", options: ["Kitten", "Puppy", "Cub", "Foal"], correct: 1 },
        { q: "Which is the tallest animal in the world?", options: ["Elephant", "Giraffe", "Horse", "Camel"], correct: 1 },
        { q: "How many colors are traditionally listed in a rainbow?", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "What is the main language spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "Italian"], correct: 1 },
        { q: "Which of these is a vegetable, not a fruit?", options: ["Apple", "Carrot", "Mango", "Banana"], correct: 1 },
        { q: "What do we call the star at the center of our solar system?", options: ["Polaris", "The Sun", "Sirius", "The Moon"], correct: 1 },
        { q: "How many days does February have in a normal (non-leap) year?", options: ["27", "28", "29", "30"], correct: 1 },
        { q: "Which shape is a standard stop sign?", options: ["Hexagon", "Octagon", "Pentagon", "Square"], correct: 1 },
        { q: "Which is the fastest land animal?", options: ["Lion", "Cheetah", "Horse", "Greyhound"], correct: 1 }
      ],
      medium: [
        { q: "Who wrote the play 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"], correct: 1 },
        { q: "What is the chemical symbol for Gold?", options: ["Gd", "Go", "Au", "Ag"], correct: 2 },
        { q: "Which country gifted the Statue of Liberty to the USA?", options: ["Spain", "France", "Italy", "England"], correct: 1 },
        { q: "What is the powerhouse of the cell called?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"], correct: 2 },
        { q: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
        { q: "In which year did the first man land on the Moon?", options: ["1965", "1969", "1972", "1959"], correct: 1 },
        { q: "What does 'www' stand for in a website address?", options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], correct: 0 },
        { q: "Which is the smallest planet in our solar system?", options: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
        { q: "Who painted the Mona Lisa?", options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
        { q: "Which organ in the human body produces insulin?", options: ["Liver", "Pancreas", "Kidney", "Heart"], correct: 1 },
        { q: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Ringgit"], correct: 2 },
        { q: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], correct: 3 },
        { q: "Which country has the most natural lakes in the world?", options: ["USA", "Canada", "Russia", "Finland"], correct: 1 },
        { q: "What is the study of earthquakes called?", options: ["Seismology", "Meteorology", "Geology", "Volcanology"], correct: 0 },
        { q: "Which gas makes up the largest portion of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 2 },
        { q: "Who was the first person to fly solo across the Atlantic Ocean?", options: ["Amelia Earhart", "Charles Lindbergh", "Wright Brothers", "Chuck Yeager"], correct: 1 },
        { q: "Which planet is known for having the most prominent rings?", options: ["Jupiter", "Uranus", "Saturn", "Neptune"], correct: 2 },
        { q: "What is the tallest mountain in the world (measured from sea level)?", options: ["K2", "Mount Everest", "Kangchenjunga", "Mont Blanc"], correct: 1 },
        { q: "Which country is home to the ancient city of Machu Picchu?", options: ["Mexico", "Peru", "Chile", "Bolivia"], correct: 1 },
        { q: "What is the main ingredient used to make bread?", options: ["Rice", "Flour", "Sugar", "Corn"], correct: 1 },
        { q: "Which musical instrument has strings and is played with a bow?", options: ["Guitar", "Violin", "Piano", "Flute"], correct: 1 },
        { q: "What is the name of the process by which caterpillars become butterflies?", options: ["Hibernation", "Metamorphosis", "Photosynthesis", "Germination"], correct: 1 },
        { q: "Which country consists of over 17,000 islands in Southeast Asia?", options: ["Philippines", "Indonesia", "Malaysia", "Thailand"], correct: 1 },
        { q: "What is the largest internal organ in the human body?", options: ["Heart", "Lungs", "Liver", "Brain"], correct: 2 },
        { q: "Which explorer is credited with the first circumnavigation of the globe (his expedition completed it)?", options: ["Vasco da Gama", "Ferdinand Magellan", "James Cook", "Christopher Columbus"], correct: 1 },
        { q: "What is the standard unit used to measure atmospheric pressure?", options: ["Newton", "Pascal", "Joule", "Watt"], correct: 1 },
        { q: "Which desert is the largest hot desert in the world?", options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Thar Desert"], correct: 2 },
        { q: "Which of these is NOT one of the five oceans?", options: ["Arctic Ocean", "Southern Ocean", "Caribbean Ocean", "Indian Ocean"], correct: 2 },
        { q: "What is the term for a word that means the same as another word?", options: ["Antonym", "Synonym", "Homonym", "Acronym"], correct: 1 },
        { q: "Which country is famous for inventing pizza in its modern form?", options: ["France", "Greece", "Italy", "Spain"], correct: 2 },
        { q: "What is the SI unit of electric current?", options: ["Volt", "Watt", "Ampere", "Ohm"], correct: 2 },
        { q: "Which bird is known for its inability to fly but is a very fast runner?", options: ["Penguin", "Ostrich", "Kiwi", "Peacock"], correct: 1 },
        { q: "What natural disaster is measured using the Richter scale?", options: ["Hurricanes", "Earthquakes", "Floods", "Tornadoes"], correct: 1 },
        { q: "Which continent is the Sahara Desert located on?", options: ["Asia", "Australia", "Africa", "South America"], correct: 2 },
        { q: "What do you call a group of lions?", options: ["A pack", "A pride", "A herd", "A flock"], correct: 1 },
        { q: "Which planet takes approximately 365 days to orbit the Sun?", options: ["Mars", "Venus", "Earth", "Mercury"], correct: 2 },
        { q: "What is the chemical symbol for Sodium?", options: ["So", "Sd", "Na", "S"], correct: 2 },
        { q: "Which famous structure in Paris was completed in 1889?", options: ["Notre Dame", "The Louvre", "Eiffel Tower", "Arc de Triomphe"], correct: 2 },
        { q: "What is the largest species of big cat in the world?", options: ["Lion", "Tiger", "Jaguar", "Leopard"], correct: 1 }
      ],
      hard: [
        { q: "Which scientist proposed the theory of general relativity?", options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"], correct: 2 },
        { q: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], correct: 2 },
        { q: "Which country was formerly known as Persia?", options: ["Iraq", "Iran", "Turkey", "Syria"], correct: 1 },
        { q: "What is the term for a word that reads the same backward as forward?", options: ["Synonym", "Acronym", "Palindrome", "Homophone"], correct: 2 },
        { q: "Which element has the atomic number 1?", options: ["Helium", "Oxygen", "Carbon", "Hydrogen"], correct: 3 },
        { q: "Who was the first woman to win a Nobel Prize?", options: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace", "Dorothy Hodgkin"], correct: 1 },
        { q: "What is the smallest bone in the human body?", options: ["Femur", "Stapes", "Radius", "Fibula"], correct: 1 },
        { q: "Which ancient wonder of the world stood in Alexandria, Egypt?", options: ["Colossus of Rhodes", "Hanging Gardens", "Lighthouse of Alexandria", "Great Pyramid"], correct: 2 },
        { q: "In computing, what does 'HTTP' stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Type Protocol", "Home Tool Transfer Protocol"], correct: 0 },
        { q: "Which mountain range separates Europe from Asia?", options: ["Andes", "Himalayas", "Alps", "Ural Mountains"], correct: 3 },
        { q: "Who developed the theory of evolution by natural selection?", options: ["Gregor Mendel", "Charles Darwin", "Alfred Wallace", "Carl Linnaeus"], correct: 1 },
        { q: "What is the collective name for a group of crows?", options: ["A murder", "A flock", "A pack", "A herd"], correct: 0 },
        { q: "Which country has the longest coastline in the world?", options: ["Australia", "Russia", "Canada", "Indonesia"], correct: 2 },
        { q: "What is the rarest blood type in humans?", options: ["O negative", "AB negative", "B negative", "A negative"], correct: 1 },
        { q: "Which language has the most native speakers in the world?", options: ["English", "Spanish", "Hindi", "Mandarin Chinese"], correct: 3 },
        { q: "What is the name of the closest galaxy to the Milky Way?", options: ["Triangulum Galaxy", "Andromeda Galaxy", "Whirlpool Galaxy", "Sombrero Galaxy"], correct: 1 },
        { q: "Which country has the most time zones in the world?", options: ["Russia", "USA", "France", "China"], correct: 2 },
        { q: "What is the deepest known point in the Earth's oceans called?", options: ["Puerto Rico Trench", "Mariana Trench", "Java Trench", "Tonga Trench"], correct: 1 },
        { q: "Which metal is liquid at room temperature?", options: ["Lead", "Mercury", "Tin", "Zinc"], correct: 1 },
        { q: "What is the currency used in the majority of the European Union?", options: ["Pound", "Franc", "Euro", "Mark"], correct: 2 },
        { q: "Which planet has the shortest day (fastest rotation) in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 2 },
        { q: "What is the name for a triangle with all three sides of different lengths?", options: ["Equilateral", "Isosceles", "Scalene", "Obtuse"], correct: 2 },
        { q: "Which country has the longest official land border in the world?", options: ["Russia", "China", "Canada", "Brazil"], correct: 1 },
        { q: "What is the term for an animal that is active mainly at night?", options: ["Diurnal", "Nocturnal", "Crepuscular", "Hibernal"], correct: 1 },
        { q: "Which vitamin is essential for blood clotting?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], correct: 3 },
        { q: "What is the world's largest coral reef system called?", options: ["Red Sea Reef", "Great Barrier Reef", "Belize Barrier Reef", "Florida Reef"], correct: 1 },
        { q: "Which is the driest continent on Earth?", options: ["Africa", "Australia", "Antarctica", "Asia"], correct: 2 },
        { q: "What is the process called when a solid changes directly into a gas without becoming liquid?", options: ["Evaporation", "Condensation", "Sublimation", "Deposition"], correct: 2 },
        { q: "Which country has the highest population in the world as of recent estimates?", options: ["China", "India", "USA", "Indonesia"], correct: 1 },
        { q: "What is the largest desert in the world, including cold deserts?", options: ["Sahara Desert", "Arabian Desert", "Antarctic Desert", "Gobi Desert"], correct: 2 },
        { q: "Which element is the most abundant in the Earth's crust?", options: ["Iron", "Silicon", "Oxygen", "Aluminium"], correct: 2 },
        { q: "What is the term for the imaginary line at zero degrees longitude?", options: ["Equator", "Tropic of Cancer", "Prime Meridian", "International Date Line"], correct: 2 },
        { q: "Which organ system is responsible for producing hormones in the body?", options: ["Nervous system", "Endocrine system", "Skeletal system", "Digestive system"], correct: 1 },
        { q: "What is the name of the largest moon of Saturn?", options: ["Europa", "Titan", "Ganymede", "Callisto"], correct: 1 },
        { q: "Which country was the first to grant women the right to vote nationally?", options: ["United Kingdom", "United States", "New Zealand", "France"], correct: 2 },
        { q: "What is the hardest known naturally occurring substance after diamond?", options: ["Quartz", "Corundum", "Topaz", "Graphite"], correct: 1 },
        { q: "Which body of water separates the United Kingdom from mainland Europe?", options: ["Irish Sea", "North Sea", "English Channel", "Bay of Biscay"], correct: 2 },
        { q: "What term describes a year that is NOT a leap year despite being divisible by 4?", options: ["Century year not divisible by 400", "Any odd year", "Any year ending in 0", "There is no such exception"], correct: 0 },
        { q: "Which is the only mammal capable of true, sustained flight?", options: ["Flying squirrel", "Bat", "Sugar glider", "Colugo"], correct: 1 }
      ]
    }
  },

  science: {
    label: "Science",
    pools: {
      easy: [
        { q: "What planet do we live on?", options: ["Mars", "Earth", "Venus", "Jupiter"], correct: 1 },
        { q: "What is H2O more commonly known as?", options: ["Salt", "Water", "Oxygen", "Sugar"], correct: 1 },
        { q: "Which sense do you use to see?", options: ["Hearing", "Touch", "Sight", "Smell"], correct: 2 },
        { q: "What force pulls objects toward the Earth?", options: ["Magnetism", "Gravity", "Friction", "Tension"], correct: 1 },
        { q: "Which part of a plant absorbs water from the soil?", options: ["Leaves", "Roots", "Flowers", "Stem"], correct: 1 },
        { q: "Approximately how many bones are in an adult human body?", options: ["106", "206", "306", "406"], correct: 1 },
        { q: "What is the boiling point of water in Celsius?", options: ["50\u00b0C", "75\u00b0C", "100\u00b0C", "150\u00b0C"], correct: 2 },
        { q: "Which organ pumps blood through the body?", options: ["Lungs", "Liver", "Heart", "Kidney"], correct: 2 },
        { q: "What do we call animals that eat only plants?", options: ["Carnivores", "Herbivores", "Omnivores", "Predators"], correct: 1 },
        { q: "Which state of matter has no fixed shape or volume?", options: ["Solid", "Liquid", "Gas", "Plasma only"], correct: 2 },
        { q: "What do we call an animal that eats both plants and meat?", options: ["Herbivore", "Carnivore", "Omnivore", "Decomposer"], correct: 2 },
        { q: "Which part of the eye controls how much light enters?", options: ["Retina", "Pupil", "Cornea", "Lens"], correct: 1 },
        { q: "What gas do plants release during photosynthesis?", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correct: 2 },
        { q: "Which simple machine is a see-saw an example of?", options: ["Pulley", "Lever", "Wheel and axle", "Wedge"], correct: 1 },
        { q: "What do we call water in its solid form?", options: ["Steam", "Vapor", "Ice", "Mist"], correct: 2 },
        { q: "Which sense organ do we use to smell?", options: ["Eyes", "Nose", "Ears", "Tongue"], correct: 1 },
        { q: "What is the process called when water turns into vapor?", options: ["Freezing", "Melting", "Evaporation", "Condensation"], correct: 2 },
        { q: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correct: 2 },
        { q: "What do you call baby frogs before they grow legs?", options: ["Larvae", "Tadpoles", "Nymphs", "Pupae"], correct: 1 },
        { q: "Which of these is a source of renewable energy?", options: ["Coal", "Natural Gas", "Solar Power", "Petroleum"], correct: 2 },
        { q: "What is the main gas that humans need to breathe in to survive?", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"], correct: 2 },
        { q: "Which body part pumps blood to the rest of the body?", options: ["Lungs", "Heart", "Liver", "Stomach"], correct: 1 },
        { q: "What do magnets attract?", options: ["Wood", "Plastic", "Iron and steel", "Glass"], correct: 2 },
        { q: "Which of these is NOT a mammal?", options: ["Whale", "Bat", "Snake", "Dolphin"], correct: 2 },
        { q: "What do we call the natural satellite that orbits the Earth?", options: ["The Sun", "Mars", "The Moon", "A comet"], correct: 2 },
        { q: "Which season has the longest days in the Northern Hemisphere?", options: ["Winter", "Spring", "Summer", "Autumn"], correct: 2 },
        { q: "What do plants use to make their own food?", options: ["Soil only", "Sunlight, water, and carbon dioxide", "Oxygen only", "Water only"], correct: 1 },
        { q: "Which part of a tree carries water up from the roots?", options: ["Leaves", "Bark", "Stem/trunk", "Flowers"], correct: 2 },
        { q: "What is the study of living things called?", options: ["Geology", "Biology", "Chemistry", "Physics"], correct: 1 },
        { q: "Which of these animals lays eggs?", options: ["Dog", "Cat", "Chicken", "Cow"], correct: 2 },
        { q: "What do we call the layer of gases surrounding the Earth?", options: ["Crust", "Atmosphere", "Core", "Mantle"], correct: 1 },
        { q: "Which of these is a form of energy?", options: ["Rock", "Heat", "Water bottle", "Chair"], correct: 1 },
        { q: "What do bees collect from flowers to make honey?", options: ["Pollen", "Nectar", "Leaves", "Seeds"], correct: 1 },
        { q: "Which instrument is used to measure temperature?", options: ["Barometer", "Thermometer", "Speedometer", "Odometer"], correct: 1 },
        { q: "What do we call animals without a backbone?", options: ["Vertebrates", "Invertebrates", "Mammals", "Reptiles"], correct: 1 },
        { q: "Which gas is used by humans to inflate life-saving air bags and party balloons alike (a lighter-than-air gas)?", options: ["Oxygen", "Helium", "Carbon Dioxide", "Nitrogen"], correct: 1 },
        { q: "What is the center of an atom called?", options: ["Electron", "Nucleus", "Proton shell", "Orbit"], correct: 1 },
        { q: "Which of these produces its own light?", options: ["The Moon", "A mirror", "The Sun", "A planet"], correct: 2 },
        { q: "What do we call a scientist who studies weather?", options: ["Biologist", "Meteorologist", "Geologist", "Astronomer"], correct: 1 }
      ],
      medium: [
        { q: "What is the chemical formula for table salt?", options: ["NaCl", "H2O", "CO2", "KCl"], correct: 0 },
        { q: "What is the process by which plants make food using sunlight?", options: ["Respiration", "Photosynthesis", "Digestion", "Evaporation"], correct: 1 },
        { q: "Which blood cells help fight infection?", options: ["Red blood cells", "Platelets", "White blood cells", "Plasma cells"], correct: 2 },
        { q: "What is the unit of electrical resistance?", options: ["Volt", "Watt", "Ohm", "Ampere"], correct: 2 },
        { q: "Which gas do humans breathe out?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 },
        { q: "What is the closest star to Earth?", options: ["Proxima Centauri", "The Sun", "Sirius", "Polaris"], correct: 1 },
        { q: "Which scientist is famous for the law of gravity involving a falling apple?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], correct: 1 },
        { q: "What is the pH value of pure water?", options: ["3", "5", "7", "9"], correct: 2 },
        { q: "Which organ filters blood to produce urine?", options: ["Liver", "Lungs", "Kidneys", "Stomach"], correct: 2 },
        { q: "Which planet is famous for its prominent ring system?", options: ["Mars", "Saturn", "Mercury", "Neptune"], correct: 1 },
        { q: "What is the powerhouse of the cell, responsible for producing energy?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], correct: 1 },
        { q: "Which type of rock is formed from cooled lava or magma?", options: ["Sedimentary", "Metamorphic", "Igneous", "Mineral"], correct: 2 },
        { q: "What is the term for the distance light travels in one year?", options: ["Light second", "Astronomical Unit", "Light year", "Parsec"], correct: 2 },
        { q: "Which part of the human brain controls balance and coordination?", options: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"], correct: 1 },
        { q: "What is the process called where a caterpillar transforms into a butterfly?", options: ["Germination", "Metamorphosis", "Pollination", "Fertilization"], correct: 1 },
        { q: "Which gas is most responsible for the greenhouse effect on Earth?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
        { q: "What do we call the force that opposes motion between two surfaces?", options: ["Gravity", "Friction", "Tension", "Momentum"], correct: 1 },
        { q: "Which blood vessels carry blood away from the heart?", options: ["Veins", "Arteries", "Capillaries", "Venules"], correct: 1 },
        { q: "What is the chemical formula for carbon dioxide?", options: ["CO", "CO2", "C2O", "CO3"], correct: 1 },
        { q: "Which of these scientists developed the periodic table of elements?", options: ["Antoine Lavoisier", "Dmitri Mendeleev", "John Dalton", "Marie Curie"], correct: 1 },
        { q: "What is the main function of red blood cells?", options: ["Fight infection", "Clot blood", "Carry oxygen", "Digest food"], correct: 2 },
        { q: "Which planet has a day longer than its year?", options: ["Mars", "Venus", "Mercury", "Jupiter"], correct: 1 },
        { q: "What is the term for animals that hibernate during winter?", options: ["Nocturnal", "Diurnal", "Hibernators", "Migratory"], correct: 2 },
        { q: "Which layer of the Earth is the thin, outermost layer we live on?", options: ["Core", "Mantle", "Crust", "Lithosphere only"], correct: 2 },
        { q: "What is the unit used to measure the loudness of sound?", options: ["Hertz", "Decibel", "Watt", "Joule"], correct: 1 },
        { q: "Which vitamin is mainly obtained from sunlight exposure on skin?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], correct: 2 },
        { q: "What is the term for the study of the stars, planets, and outer space?", options: ["Geology", "Astronomy", "Meteorology", "Ecology"], correct: 1 },
        { q: "Which acid is commonly found in the human stomach to aid digestion?", options: ["Sulfuric acid", "Hydrochloric acid", "Citric acid", "Acetic acid"], correct: 1 },
        { q: "What does an ECG (electrocardiogram) measure?", options: ["Brain activity", "Heart activity", "Lung capacity", "Blood pressure"], correct: 1 },
        { q: "Which of these is the correct order of the water cycle stage after evaporation?", options: ["Precipitation", "Condensation", "Collection", "Sublimation"], correct: 1 },
        { q: "What is the name for a substance that speeds up a chemical reaction without being consumed?", options: ["Reactant", "Catalyst", "Solvent", "Compound"], correct: 1 },
        { q: "Which planet is often called Earth's 'twin' due to its similar size?", options: ["Mars", "Venus", "Mercury", "Neptune"], correct: 1 },
        { q: "What do we call organisms that make their own food using sunlight?", options: ["Heterotrophs", "Autotrophs", "Decomposers", "Parasites"], correct: 1 },
        { q: "Which part of a plant cell is responsible for photosynthesis?", options: ["Nucleus", "Chloroplast", "Vacuole", "Cell wall"], correct: 1 },
        { q: "What is the medical term for high blood pressure?", options: ["Hypotension", "Hypertension", "Arrhythmia", "Anemia"], correct: 1 },
        { q: "Which of Newton's laws states that every action has an equal and opposite reaction?", options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"], correct: 2 },
        { q: "What is the boiling point of water at sea level in Fahrenheit?", options: ["100\u00b0F", "180\u00b0F", "212\u00b0F", "32\u00b0F"], correct: 2 },
        { q: "Which organ is primarily responsible for filtering toxins from the blood?", options: ["Heart", "Liver", "Lungs", "Spleen"], correct: 1 },
        { q: "What is the name of the galaxy that contains our solar system?", options: ["Andromeda", "Triangulum", "Milky Way", "Whirlpool"], correct: 2 }
      ],
      hard: [
        { q: "Approximately what is the speed of light in a vacuum?", options: ["30,000 km/s", "300,000 km/s", "3,000,000 km/s", "3,000 km/s"], correct: 1 },
        { q: "Which subatomic particle carries a negative electric charge?", options: ["Proton", "Neutron", "Electron", "Photon"], correct: 2 },
        { q: "What is the scientific study of fossils called?", options: ["Paleontology", "Archaeology", "Geology", "Biology"], correct: 0 },
        { q: "A deficiency of which vitamin causes scurvy?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], correct: 2 },
        { q: "DNA is short for which of these?", options: ["Deoxyribonucleic acid", "Dinucleic acid", "Diribose acid", "Deoxyribose amine"], correct: 0 },
        { q: "Which noble gas is commonly used in party balloons because it's lighter than air?", options: ["Neon", "Argon", "Helium", "Xenon"], correct: 2 },
        { q: "What is the SI unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], correct: 1 },
        { q: "What is the chemical symbol for the element Iron?", options: ["Ir", "In", "Fe", "Fr"], correct: 2 },
        { q: "Which cell organelle is responsible for protein synthesis?", options: ["Golgi apparatus", "Ribosome", "Lysosome", "Vacuole"], correct: 1 },
        { q: "Which law states that energy cannot be created or destroyed, only transformed?", options: ["Law of Gravity", "Law of Conservation of Energy", "Newton's Third Law", "Law of Inertia"], correct: 1 },
        { q: "What is the name of the process by which stars produce energy?", options: ["Nuclear fission", "Nuclear fusion", "Combustion", "Radioactive decay"], correct: 1 },
        { q: "Which particle in an atom has no electric charge?", options: ["Proton", "Electron", "Neutron", "Ion"], correct: 2 },
        { q: "What is the term for the smallest unit of a chemical element?", options: ["Molecule", "Atom", "Compound", "Ion"], correct: 1 },
        { q: "Which scientist is credited with formulating the three laws of motion?", options: ["Galileo Galilei", "Isaac Newton", "Albert Einstein", "Johannes Kepler"], correct: 1 },
        { q: "What is the name of the theoretical boundary around a black hole from which nothing can escape?", options: ["Photon sphere", "Event horizon", "Singularity", "Accretion disk"], correct: 1 },
        { q: "Which blood type is considered the universal donor?", options: ["AB positive", "O negative", "A positive", "B negative"], correct: 1 },
        { q: "What is the study of heredity and genetic variation called?", options: ["Genetics", "Physiology", "Anatomy", "Embryology"], correct: 0 },
        { q: "Which gas layer in the atmosphere protects Earth from harmful UV radiation?", options: ["Troposphere", "Ozone layer", "Ionosphere", "Exosphere"], correct: 1 },
        { q: "What is the chemical name for the compound commonly known as baking soda?", options: ["Sodium chloride", "Sodium bicarbonate", "Sodium hydroxide", "Calcium carbonate"], correct: 1 },
        { q: "Which unit is used to measure radioactivity?", options: ["Becquerel", "Newton", "Pascal", "Tesla"], correct: 0 },
        { q: "What is the name of the process by which plants lose water vapor through their leaves?", options: ["Respiration", "Transpiration", "Osmosis", "Diffusion"], correct: 1 },
        { q: "Which planet in our solar system has the strongest winds recorded?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], correct: 2 },
        { q: "What is the term for a compound made of only carbon and hydrogen atoms?", options: ["Carbohydrate", "Hydrocarbon", "Amino acid", "Protein"], correct: 1 },
        { q: "Which scientist proposed the heliocentric model of the solar system?", options: ["Ptolemy", "Nicolaus Copernicus", "Tycho Brahe", "Aristotle"], correct: 1 },
        { q: "What is the name of the enzyme in saliva that begins the digestion of starch?", options: ["Pepsin", "Amylase", "Lipase", "Trypsin"], correct: 1 },
        { q: "Which type of electromagnetic radiation has the shortest wavelength?", options: ["Radio waves", "Infrared", "Gamma rays", "Visible light"], correct: 2 },
        { q: "What is the name for the phenomenon where light bends when passing between different media?", options: ["Reflection", "Refraction", "Diffraction", "Dispersion"], correct: 1 },
        { q: "Which part of the human ear is responsible for maintaining balance?", options: ["Cochlea", "Eardrum", "Vestibular system", "Auditory nerve"], correct: 2 },
        { q: "What is the name of the largest bone in the human body?", options: ["Tibia", "Femur", "Humerus", "Fibula"], correct: 1 },
        { q: "Which element has the chemical symbol 'Au'?", options: ["Silver", "Aluminium", "Gold", "Argon"], correct: 2 },
        { q: "What is the term for two or more atoms bonded together chemically?", options: ["Mixture", "Molecule", "Solution", "Suspension"], correct: 1 },
        { q: "Which of these is considered a greenhouse gas contributing to global warming?", options: ["Nitrogen", "Methane", "Oxygen", "Argon"], correct: 1 },
        { q: "What is the name of the process where white blood cells engulf pathogens?", options: ["Phagocytosis", "Osmosis", "Diffusion", "Endocytosis only"], correct: 0 },
        { q: "Which scientist is known for discovering penicillin?", options: ["Louis Pasteur", "Alexander Fleming", "Robert Koch", "Edward Jenner"], correct: 1 },
        { q: "What is the term used for the average distance between the Earth and the Sun?", options: ["Light year", "Astronomical Unit", "Parsec", "Kilometer"], correct: 1 },
        { q: "Which of these has the highest melting point?", options: ["Ice", "Iron", "Tungsten", "Aluminium"], correct: 2 },
        { q: "What is the main function of the mitochondria in a cell?", options: ["Store genetic material", "Produce energy (ATP)", "Control the cell", "Digest waste"], correct: 1 },
        { q: "Which theory explains the origin and expansion of the universe?", options: ["String Theory", "Big Bang Theory", "Steady State Theory", "Quantum Theory"], correct: 1 },
        { q: "What is the name of the process by which nitrogen from the atmosphere is converted into a usable form for plants?", options: ["Photosynthesis", "Nitrogen fixation", "Respiration", "Decomposition"], correct: 1 }
      ]
    }
  },

  history: {
    label: "History",
    pools: {
      easy: [
        { q: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
        { q: "In which year did World War II end?", options: ["1943", "1945", "1947", "1950"], correct: 1 },
        { q: "Which ancient civilization built the pyramids of Giza?", options: ["Romans", "Greeks", "Egyptians", "Persians"], correct: 2 },
        { q: "Who is known as the Father of the Nation in India?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"], correct: 1 },
        { q: "Which American war was fought between the North and South regions?", options: ["Revolutionary War", "The Civil War", "War of 1812", "Mexican-American War"], correct: 1 },
        { q: "Who is credited with reaching America in 1492?", options: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "Marco Polo"], correct: 2 },
        { q: "Which country was ruled by the Pharaohs?", options: ["Greece", "Egypt", "Rome", "Persia"], correct: 1 },
        { q: "Which famous ship sank in 1912 after hitting an iceberg?", options: ["Lusitania", "Titanic", "Bismarck", "Britannic"], correct: 1 },
        { q: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], correct: 2 },
        { q: "Which empire was famously ruled by Julius Caesar?", options: ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"], correct: 1 },
        { q: "Who was the British Prime Minister during most of World War II?", options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"], correct: 1 },
        { q: "Which country was Adolf Hitler born in?", options: ["Germany", "Austria", "Poland", "Switzerland"], correct: 1 },
        { q: "Who was the famous queen of ancient Egypt known for her relationships with Julius Caesar and Mark Antony?", options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Ankhesenamun"], correct: 1 },
        { q: "In which country did the Great Wall get built to protect against invasions?", options: ["Japan", "China", "Mongolia", "Korea"], correct: 1 },
        { q: "Which document, signed in 1215, limited the power of the English king?", options: ["Bill of Rights", "Magna Carta", "Treaty of Paris", "Declaration of Independence"], correct: 1 },
        { q: "Who was the leader of India's non-violent independence movement?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Bhagat Singh", "Subhas Chandra Bose"], correct: 1 },
        { q: "Which war was fought between 1914 and 1918?", options: ["World War I", "World War II", "The Cold War", "The Korean War"], correct: 0 },
        { q: "Who was the first emperor of a unified China?", options: ["Qin Shi Huang", "Kublai Khan", "Sun Yat-sen", "Genghis Khan"], correct: 0 },
        { q: "Which country did the Vikings originate from?", options: ["Germany", "Scandinavia", "Scotland", "Russia"], correct: 1 },
        { q: "Who was the famous explorer who discovered a sea route to India by sailing around Africa?", options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Marco Polo"], correct: 1 },
        { q: "Which country fought against Britain in the American Revolutionary War?", options: ["America (the colonies)", "France", "Spain", "Germany"], correct: 0 },
        { q: "Who was the ancient Greek philosopher who taught Alexander the Great?", options: ["Socrates", "Plato", "Aristotle", "Homer"], correct: 2 },
        { q: "Which famous wall was built to divide East and West Berlin?", options: ["The Great Wall", "The Berlin Wall", "Hadrian's Wall", "The Atlantic Wall"], correct: 1 },
        { q: "Who was the first man-made satellite launched into space by, in 1957?", options: ["USA", "Soviet Union", "China", "United Kingdom"], correct: 1 },
        { q: "Which ancient civilization is credited with inventing the wheel?", options: ["Egyptians", "Sumerians", "Greeks", "Romans"], correct: 1 },
        { q: "Who was the king of England during the signing of the Magna Carta?", options: ["King Henry VIII", "King John", "King Richard I", "King Edward I"], correct: 1 },
        { q: "Which country was the first to send a human into space?", options: ["USA", "Soviet Union", "China", "France"], correct: 1 },
        { q: "Who was the leader of the Soviet Union during World War II?", options: ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Leon Trotsky"], correct: 1 },
        { q: "Which war is also known as 'The War Between the States' in America?", options: ["Revolutionary War", "Civil War", "War of 1812", "Spanish-American War"], correct: 1 },
        { q: "Who built the Taj Mahal in India?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"], correct: 1 },
        { q: "Which ancient wonder of the world was a giant statue in Greece?", options: ["Colossus of Rhodes", "Great Pyramid", "Hanging Gardens", "Lighthouse of Alexandria"], correct: 0 },
        { q: "Who was the first woman to fly solo across the Atlantic Ocean?", options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"], correct: 0 },
        { q: "Which country was ruled by emperors and empresses and had a Forbidden City?", options: ["Japan", "China", "Korea", "Thailand"], correct: 1 },
        { q: "Who was assassinated in 1865, shortly after the American Civil War ended?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "Andrew Jackson"], correct: 1 },
        { q: "Which explorer is credited with 'discovering' the Americas for Spain in 1492?", options: ["Ferdinand Magellan", "Christopher Columbus", "Amerigo Vespucci", "Hernan Cortes"], correct: 1 },
        { q: "Who was the famous Mongol leader who built one of the largest empires in history?", options: ["Kublai Khan", "Genghis Khan", "Timur", "Attila the Hun"], correct: 1 },
        { q: "Which country was divided into East and West after World War II?", options: ["France", "Germany", "Italy", "Spain"], correct: 1 },
        { q: "Who was the first President of independent India?", options: ["Jawaharlal Nehru", "Rajendra Prasad", "Sardar Patel", "Mahatma Gandhi"], correct: 1 },
        { q: "Which ancient city was famously destroyed by the eruption of Mount Vesuvius?", options: ["Athens", "Pompeii", "Sparta", "Carthage"], correct: 1 }
      ],
      medium: [
        { q: "Which European city was divided by a wall until 1989?", options: ["Paris", "Berlin", "Vienna", "Prague"], correct: 1 },
        { q: "Who is credited as the primary author of the US Declaration of Independence?", options: ["Benjamin Franklin", "Thomas Jefferson", "John Adams", "James Madison"], correct: 1 },
        { q: "The assassination of which figure helped trigger World War I?", options: ["Kaiser Wilhelm II", "Archduke Franz Ferdinand", "Tsar Nicholas II", "King Edward VII"], correct: 1 },
        { q: "Which historic trade route connected China to Europe?", options: ["The Amber Road", "The Silk Road", "The Spice Route", "The Incense Route"], correct: 1 },
        { q: "Who was the Queen of England during the Victorian Era?", options: ["Queen Elizabeth I", "Queen Victoria", "Queen Anne", "Queen Mary"], correct: 1 },
        { q: "Who led Nazi Germany during World War II?", options: ["Otto von Bismarck", "Adolf Hitler", "Heinrich Himmler", "Paul von Hindenburg"], correct: 1 },
        { q: "The Magna Carta limited the power of which figure?", options: ["The Pope", "The King", "Parliament", "The Church"], correct: 1 },
        { q: "Which revolution began in France in 1789?", options: ["Industrial Revolution", "The French Revolution", "The Glorious Revolution", "Russian Revolution"], correct: 1 },
        { q: "Who was the first Emperor of Rome?", options: ["Julius Caesar", "Nero", "Augustus", "Constantine"], correct: 2 },
        { q: "Which country was formerly known as Ceylon?", options: ["Sri Lanka", "Myanmar", "Bangladesh", "Nepal"], correct: 0 },
        { q: "Who was the Egyptian pharaoh whose tomb was famously discovered nearly intact in 1922?", options: ["Ramesses II", "Tutankhamun", "Akhenaten", "Khufu"], correct: 1 },
        { q: "Which country was the birthplace of the Renaissance in the 14th century?", options: ["France", "Italy", "Spain", "Germany"], correct: 1 },
        { q: "Who was the leader of the Cuban Revolution and later President of Cuba?", options: ["Che Guevara", "Fidel Castro", "Raul Castro", "Fulgencio Batista"], correct: 1 },
        { q: "Which empire was ruled by Suleiman the Magnificent at its peak?", options: ["Persian Empire", "Ottoman Empire", "Mughal Empire", "Byzantine Empire"], correct: 1 },
        { q: "Who was the German chancellor who unified Germany in 1871?", options: ["Otto von Bismarck", "Kaiser Wilhelm I", "Kaiser Wilhelm II", "Konrad Adenauer"], correct: 0 },
        { q: "Which war saw the use of the first atomic bombs in 1945?", options: ["World War I", "World War II", "The Korean War", "The Vietnam War"], correct: 1 },
        { q: "Who was the Indian leader assassinated in 1948, shortly after independence?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhas Chandra Bose"], correct: 1 },
        { q: "Which country experienced the Cultural Revolution under Mao Zedong?", options: ["Japan", "China", "Vietnam", "North Korea"], correct: 1 },
        { q: "Who was the queen known as the 'Virgin Queen' of England?", options: ["Queen Victoria", "Queen Elizabeth I", "Queen Mary I", "Queen Anne"], correct: 1 },
        { q: "Which event in 1929 triggered the Great Depression?", options: ["World War I", "The Wall Street Crash", "The Dust Bowl", "The Treaty of Versailles"], correct: 1 },
        { q: "Who was the first Roman emperor to convert to Christianity?", options: ["Augustus", "Nero", "Constantine", "Julius Caesar"], correct: 2 },
        { q: "Which country was the origin of the Bolshevik Revolution in 1917?", options: ["Germany", "Russia", "Poland", "Hungary"], correct: 1 },
        { q: "Who was the British monarch during the loss of the American colonies?", options: ["King George III", "King George II", "King William III", "Queen Anne"], correct: 0 },
        { q: "Which ancient empire built Machu Picchu in Peru?", options: ["Aztec Empire", "Inca Empire", "Maya Empire", "Olmec Empire"], correct: 1 },
        { q: "Who led the Long March in Chinese communist history?", options: ["Chiang Kai-shek", "Mao Zedong", "Zhou Enlai", "Deng Xiaoping"], correct: 1 },
        { q: "Which treaty divided the newly discovered lands between Spain and Portugal in 1494?", options: ["Treaty of Tordesillas", "Treaty of Versailles", "Treaty of Paris", "Treaty of Utrecht"], correct: 0 },
        { q: "Who was the first Prime Minister of independent India?", options: ["Sardar Patel", "Jawaharlal Nehru", "Lal Bahadur Shastri", "Rajendra Prasad"], correct: 1 },
        { q: "Which war ended with the unification of Italy in the 19th century?", options: ["The Italian Wars of Independence", "The Napoleonic Wars", "The Franco-Prussian War", "World War I"], correct: 0 },
        { q: "Who was the Aztec emperor at the time of the Spanish conquest led by Hernan Cortes?", options: ["Montezuma II", "Atahualpa", "Cuauhtemoc", "Nezahualcoyotl"], correct: 0 },
        { q: "Which country was the first to industrialize during the Industrial Revolution?", options: ["Germany", "United Kingdom", "France", "United States"], correct: 1 },
        { q: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?", options: ["Joseph Stalin", "Nikita Khrushchev", "Leonid Brezhnev", "Mikhail Gorbachev"], correct: 1 },
        { q: "Which ancient Greek city-state was known for its military discipline?", options: ["Athens", "Sparta", "Corinth", "Thebes"], correct: 1 },
        { q: "Who was the last emperor of China?", options: ["Guangxu", "Puyi", "Kangxi", "Qianlong"], correct: 1 },
        { q: "Which country was partitioned in 1947 to create India and Pakistan?", options: ["British India", "Ottoman Empire", "French Indochina", "Dutch East Indies"], correct: 0 },
        { q: "Who was the general who led Carthage's forces across the Alps to fight Rome?", options: ["Hasdrubal", "Hannibal", "Hamilcar", "Mago"], correct: 1 },
        { q: "Which country did Napoleon Bonaparte lead as Emperor?", options: ["Spain", "France", "Italy", "Austria"], correct: 1 },
        { q: "Who was the American president during the Louisiana Purchase?", options: ["George Washington", "Thomas Jefferson", "James Madison", "John Adams"], correct: 1 },
        { q: "Which dynasty ruled Russia until the 1917 revolution?", options: ["Habsburg Dynasty", "Romanov Dynasty", "Bourbon Dynasty", "Windsor Dynasty"], correct: 1 },
        { q: "Who was the explorer who led the first expedition to circumnavigate the globe, though he died before completing it?", options: ["Vasco da Gama", "Ferdinand Magellan", "James Cook", "Francis Drake"], correct: 1 }
      ],
      hard: [
        { q: "Which treaty formally ended World War I?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Ghent"], correct: 1 },
        { q: "Who was the first female Prime Minister of the United Kingdom?", options: ["Theresa May", "Margaret Thatcher", "Angela Merkel", "Indira Gandhi"], correct: 1 },
        { q: "Which battle marked Napoleon's final defeat?", options: ["Battle of Trafalgar", "Battle of Austerlitz", "Battle of Waterloo", "Battle of Leipzig"], correct: 2 },
        { q: "Which dynasty commissioned the construction of the Taj Mahal?", options: ["Maurya Dynasty", "Mughal Dynasty", "Gupta Dynasty", "Chola Dynasty"], correct: 1 },
        { q: "Who was the last Tsar of Russia?", options: ["Alexander III", "Nicholas II", "Peter the Great", "Ivan the Terrible"], correct: 1 },
        { q: "Which ancient wonder was said to be located in Babylon?", options: ["The Great Sphinx", "Hanging Gardens of Babylon", "Colossus of Rhodes", "Temple of Artemis"], correct: 1 },
        { q: "Which country was divided into North and South after World War II, leading to a major war in the 1950s?", options: ["Vietnam", "Korea", "Germany", "China"], correct: 1 },
        { q: "Who was the philosopher and tutor of Alexander the Great?", options: ["Socrates", "Plato", "Aristotle", "Pythagoras"], correct: 2 },
        { q: "Which proclamation moved to end slavery in the Confederate states during the US Civil War?", options: ["Bill of Rights", "Emancipation Proclamation", "Gettysburg Address", "Monroe Doctrine"], correct: 1 },
        { q: "Which ancient script helped scholars decipher Egyptian hieroglyphs?", options: ["Cuneiform Tablet", "Rosetta Stone", "Dead Sea Scrolls", "Behistun Inscription"], correct: 1 },
        { q: "Which peace treaty ended the Thirty Years' War in 1648?", options: ["Treaty of Westphalia", "Treaty of Utrecht", "Treaty of Versailles", "Treaty of Tordesillas"], correct: 0 },
        { q: "Who was the Byzantine emperor who codified Roman law into the Corpus Juris Civilis?", options: ["Constantine", "Justinian I", "Theodosius", "Heraclius"], correct: 1 },
        { q: "Which battle in 1066 resulted in the Norman conquest of England?", options: ["Battle of Hastings", "Battle of Agincourt", "Battle of Bosworth", "Battle of Bannockburn"], correct: 0 },
        { q: "Who was the female pharaoh who ruled Egypt and dressed in traditional male pharaoh attire?", options: ["Nefertiti", "Hatshepsut", "Cleopatra", "Nefertari"], correct: 1 },
        { q: "Which empire was the Silk Road primarily used to connect China to?", options: ["The Roman Empire and beyond", "The Aztec Empire", "The Inca Empire", "The Zulu Kingdom"], correct: 0 },
        { q: "Who led the successful slave revolt that led to Haiti's independence?", options: ["Toussaint Louverture", "Simon Bolivar", "Jose de San Martin", "Nat Turner"], correct: 0 },
        { q: "Which dynasty is credited with building the Great Wall of China in its most famous form?", options: ["Han Dynasty", "Ming Dynasty", "Tang Dynasty", "Qin Dynasty"], correct: 1 },
        { q: "Who was the Ottoman sultan who conquered Constantinople in 1453?", options: ["Suleiman the Magnificent", "Mehmed II", "Selim I", "Bayezid I"], correct: 1 },
        { q: "Which war is considered the first 'total war' involving industrialized nations on a massive scale?", options: ["The Napoleonic Wars", "World War I", "The Crimean War", "The Franco-Prussian War"], correct: 1 },
        { q: "Who was the philosopher-king of Rome known for his writings 'Meditations'?", options: ["Nero", "Marcus Aurelius", "Trajan", "Hadrian"], correct: 1 },
        { q: "Which empire's fall in 476 CE is traditionally used to mark the end of ancient history in Europe?", options: ["The Byzantine Empire", "The Western Roman Empire", "The Persian Empire", "The Han Empire"], correct: 1 },
        { q: "Who was the queen of France executed during the French Revolution?", options: ["Marie de Medici", "Marie Antoinette", "Catherine de Medici", "Anne of Austria"], correct: 1 },
        { q: "Which ancient Mesopotamian king is known for one of the earliest written law codes?", options: ["Sargon of Akkad", "Hammurabi", "Nebuchadnezzar II", "Ashurbanipal"], correct: 1 },
        { q: "Who was the leader of the Zulu Kingdom who built it into a powerful military state?", options: ["Cetshwayo", "Shaka Zulu", "Dingane", "Mpande"], correct: 1 },
        { q: "Which war resulted in the unification of Germany under Prussian leadership in 1871?", options: ["The Franco-Prussian War", "The Seven Years' War", "The Napoleonic Wars", "World War I"], correct: 0 },
        { q: "Who was the last Pharaoh of Egypt before it became a Roman province?", options: ["Cleopatra VII", "Ptolemy XIII", "Nefertiti", "Arsinoe IV"], correct: 0 },
        { q: "Which revolution in 1848 spread across many European countries demanding reform?", options: ["The Springtime of Nations", "The Glorious Revolution", "The Bolshevik Revolution", "The Industrial Revolution"], correct: 0 },
        { q: "Who was the Carthaginian general famous for using war elephants to cross the Alps?", options: ["Hamilcar Barca", "Hannibal Barca", "Hasdrubal Barca", "Mago Barca"], correct: 1 },
        { q: "Which ancient civilization built the city of Angkor and its famous temple complex?", options: ["Khmer Empire", "Srivijaya Empire", "Champa Kingdom", "Majapahit Empire"], correct: 0 },
        { q: "Who was the first Holy Roman Emperor, crowned in 800 CE?", options: ["Otto I", "Charlemagne", "Frederick Barbarossa", "Charles V"], correct: 1 },
        { q: "Which war was fought largely over the Schleswig-Holstein Question in the 1860s?", options: ["The Austro-Prussian War", "The Second Schleswig War", "The Franco-Prussian War", "The Crimean War"], correct: 1 },
        { q: "Who was the Inca emperor captured by Francisco Pizarro in 1532?", options: ["Huayna Capac", "Atahualpa", "Manco Inca", "Tupac Amaru"], correct: 1 },
        { q: "Which treaty ended the Mexican-American War in 1848?", options: ["Treaty of Guadalupe Hidalgo", "Treaty of Paris", "Treaty of Ghent", "Adams-Onis Treaty"], correct: 0 },
        { q: "Who was the founder of the Mughal Empire in India?", options: ["Akbar", "Babur", "Humayun", "Shah Jahan"], correct: 1 },
        { q: "Which ancient wonder of the world was a giant lighthouse in Egypt?", options: ["Lighthouse of Alexandria", "Colossus of Rhodes", "Temple of Artemis", "Statue of Zeus"], correct: 0 },
        { q: "Who was the Chinese admiral who led major maritime voyages in the early 15th century?", options: ["Zheng He", "Li Shimin", "Kublai Khan", "Sun Tzu"], correct: 0 },
        { q: "Which war between Athens and Sparta lasted from 431 to 404 BCE?", options: ["The Persian Wars", "The Peloponnesian War", "The Trojan War", "The Punic Wars"], correct: 1 },
        { q: "Who was the queen who ruled the Kingdom of Kush and led resistance against Rome?", options: ["Amanirenas", "Nefertiti", "Hatshepsut", "Cleopatra"], correct: 0 },
        { q: "Which agreement in 1947 partitioned British India into two independent nations?", options: ["The Mountbatten Plan", "The Cripps Mission", "The Simon Commission", "The Cabinet Mission Plan"], correct: 0 }
      ]
    }
  },

  entertainment: {
    label: "Entertainment",
    pools: {
      easy: [
        { q: "Which superhero is known as the 'Man of Steel'?", options: ["Batman", "Superman", "Flash", "Aquaman"], correct: 1 },
        { q: "Which famous mouse is a classic Disney character?", options: ["Jerry", "Mickey Mouse", "Stuart Little", "Speedy Gonzales"], correct: 1 },
        { q: "Which musical instrument typically has 88 keys?", options: ["Guitar", "Violin", "Piano", "Flute"], correct: 2 },
        { q: "Which sport uses a bat, a ball, and 11 players per side?", options: ["Baseball", "Cricket", "Hockey", "Rugby"], correct: 1 },
        { q: "Which book series features a young wizard named Harry?", options: ["Narnia", "Harry Potter", "Percy Jackson", "The Hobbit"], correct: 1 },
        { q: "What do we call a group of musicians performing together?", options: ["A choir", "A band", "An ensemble cast", "A troupe"], correct: 1 },
        { q: "Which country's film industry is nicknamed 'Bollywood'?", options: ["Pakistan", "India", "Bangladesh", "Nepal"], correct: 1 },
        { q: "Which board game involves buying properties and paying rent?", options: ["Scrabble", "Monopoly", "Clue", "Risk"], correct: 1 },
        { q: "Which fictional detective is famous for living at 221B Baker Street?", options: ["Hercule Poirot", "Sherlock Holmes", "Sam Spade", "Nancy Drew"], correct: 1 },
        { q: "What is the name of the wizarding school in the Harry Potter series?", options: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"], correct: 2 },
        { q: "Which sport is played at Wimbledon?", options: ["Cricket", "Tennis", "Golf", "Badminton"], correct: 1 },
        { q: "Which animated film features a lion cub named Simba?", options: ["Madagascar", "The Lion King", "Zootopia", "Tarzan"], correct: 1 },
        { q: "Which movie features a house being lifted by thousands of balloons?", options: ["Up", "Inside Out", "Coco", "Brave"], correct: 0 },
        { q: "Which sport is known as the 'king of sports' and played in the FIFA World Cup?", options: ["Basketball", "Football (Soccer)", "Rugby", "Cricket"], correct: 1 },
        { q: "Which superhero is famously associated with a spider?", options: ["Batman", "Spider-Man", "Iron Man", "Superman"], correct: 1 },
        { q: "Which children's show features a big purple dinosaur?", options: ["Sesame Street", "Barney & Friends", "Dora the Explorer", "Blue's Clues"], correct: 1 },
        { q: "Which card game uses cards numbered Uno, Dos, Tres in its instructions?", options: ["Poker", "Uno", "Bridge", "Rummy"], correct: 1 },
        { q: "Which of these is a popular dance form originating in India?", options: ["Ballet", "Bharatanatyam", "Tango", "Salsa"], correct: 1 },
        { q: "Which movie franchise features a young wizard's rival named Draco Malfoy?", options: ["Percy Jackson", "Harry Potter", "Narnia", "Twilight"], correct: 1 },
        { q: "Which musical instrument is commonly played by strumming or plucking its strings?", options: ["Drum", "Guitar", "Trumpet", "Flute"], correct: 1 },
        { q: "Which is a popular sport played on ice with skates and a puck?", options: ["Ice hockey", "Curling", "Figure skating", "Bobsled"], correct: 0 },
        { q: "Which Pixar movie is about toys that come to life?", options: ["Cars", "Toy Story", "Up", "Finding Nemo"], correct: 1 },
        { q: "Which of these is a classic building-block toy brand?", options: ["Lego", "Barbie", "Hot Wheels", "Play-Doh"], correct: 0 },
        { q: "Which sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], correct: 1 },
        { q: "Which movie features a clownfish searching for his lost son?", options: ["Shark Tale", "Finding Nemo", "Moana", "The Little Mermaid"], correct: 1 },
        { q: "Which classic board game involves solving a murder mystery?", options: ["Monopoly", "Clue", "Risk", "Sorry!"], correct: 1 },
        { q: "Which sport is played at the Masters Tournament?", options: ["Tennis", "Golf", "Cricket", "Swimming"], correct: 1 },
        { q: "Which Disney princess has long magical hair?", options: ["Cinderella", "Rapunzel", "Belle", "Snow White"], correct: 1 },
        { q: "Which musical group is known as the 'Fab Four'?", options: ["The Rolling Stones", "The Beatles", "Queen", "ABBA"], correct: 1 },
        { q: "Which sport involves throwing darts at a circular target?", options: ["Archery", "Darts", "Bowling", "Billiards"], correct: 1 },
        { q: "Which animated character is a yellow sponge who lives in a pineapple under the sea?", options: ["Patrick Star", "SpongeBob SquarePants", "Squidward", "Mr. Krabs"], correct: 1 },
        { q: "Which sport is played with a shuttlecock over a net using rackets, popular in Asia?", options: ["Table Tennis", "Badminton", "Squash", "Tennis"], correct: 1 },
        { q: "Which fictional character lives in a hobbit-hole in 'The Lord of the Rings'?", options: ["Gandalf", "Frodo Baggins", "Legolas", "Aragorn"], correct: 1 },
        { q: "Which movie tells the story of a rat who wants to become a chef in Paris?", options: ["Ratatouille", "Cars", "Up", "Brave"], correct: 0 },
        { q: "Which sport do the Olympics feature that involves diving into a pool?", options: ["Swimming diving", "Synchronized swimming", "Water polo", "Rowing"], correct: 0 },
        { q: "Which classic toy is a spinning disc thrown between players?", options: ["Frisbee", "Yo-yo", "Boomerang", "Hula hoop"], correct: 0 },
        { q: "Which movie series features a boy who discovers he is a demigod?", options: ["Harry Potter", "Percy Jackson", "Narnia", "Eragon"], correct: 1 },
        { q: "Which sport is associated with the term 'home run'?", options: ["Cricket", "Baseball", "Softball only", "Rounders only"], correct: 1 }
      ],
      medium: [
        { q: "Which actor is best known for playing Iron Man in the Marvel films?", options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"], correct: 2 },
        { q: "Which film won the very first Academy Award for Best Picture?", options: ["Wings", "Casablanca", "Gone with the Wind", "It Happened One Night"], correct: 0 },
        { q: "Which band released the album 'Abbey Road'?", options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"], correct: 1 },
        { q: "Which video game franchise features a plumber named Mario?", options: ["Sonic", "Super Mario", "Zelda", "Donkey Kong"], correct: 1 },
        { q: "Which country hosts the annual Cannes Film Festival?", options: ["Italy", "France", "Spain", "Monaco"], correct: 1 },
        { q: "Which TV fantasy show is known for the phrase 'Winter is Coming'?", options: ["The Witcher", "Game of Thrones", "Vikings", "House of the Dragon"], correct: 1 },
        { q: "Which composer is well known for the scores of 'Jaws' and 'Star Wars'?", options: ["Hans Zimmer", "John Williams", "Danny Elfman", "James Horner"], correct: 1 },
        { q: "Which streaming service originally produced the show 'Stranger Things'?", options: ["Hulu", "Amazon Prime", "Netflix", "Disney+"], correct: 2 },
        { q: "Which of these films is a commonly cited highest-grossing movie of all time?", options: ["Titanic", "Avatar", "The Avengers", "Jurassic Park"], correct: 1 },
        { q: "Which instrument was Ludwig van Beethoven most famous for composing for?", options: ["Violin", "Piano", "Cello", "Flute"], correct: 1 },
        { q: "Which actor played the character of Jack Sparrow in 'Pirates of the Caribbean'?", options: ["Orlando Bloom", "Johnny Depp", "Geoffrey Rush", "Javier Bardem"], correct: 1 },
        { q: "Which animated studio created 'Frozen' and 'Moana'?", options: ["Pixar", "Walt Disney Animation Studios", "DreamWorks", "Studio Ghibli"], correct: 1 },
        { q: "Which sport is Serena Williams famous for?", options: ["Golf", "Tennis", "Swimming", "Athletics"], correct: 1 },
        { q: "Which band is known for the song 'Bohemian Rhapsody'?", options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"], correct: 1 },
        { q: "Which film series is based on books by J.R.R. Tolkien?", options: ["The Chronicles of Narnia", "The Lord of the Rings", "Harry Potter", "Percy Jackson"], correct: 1 },
        { q: "Which country won the FIFA World Cup in 2018?", options: ["Germany", "Brazil", "France", "Argentina"], correct: 2 },
        { q: "Which artist painted 'Starry Night'?", options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dali"], correct: 1 },
        { q: "Which video game series features the character Link and Princess Zelda?", options: ["Super Mario", "The Legend of Zelda", "Metroid", "Kirby"], correct: 1 },
        { q: "Which musical featured songs like 'Defying Gravity', based on the novel about the Wicked Witch of the West?", options: ["Hamilton", "Wicked", "Les Miserables", "The Lion King"], correct: 1 },
        { q: "Which basketball player is known by the nickname 'King James'?", options: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Stephen Curry"], correct: 1 },
        { q: "Which movie won the Academy Award for Best Picture in 2020 (a South Korean film)?", options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"], correct: 1 },
        { q: "Which classic novel by Harper Lee deals with racial injustice in the American South?", options: ["The Great Gatsby", "To Kill a Mockingbird", "Of Mice and Men", "The Catcher in the Rye"], correct: 1 },
        { q: "Which singer is known as the 'Queen of Pop'?", options: ["Whitney Houston", "Madonna", "Celine Dion", "Mariah Carey"], correct: 1 },
        { q: "Which sport is associated with the Ryder Cup?", options: ["Tennis", "Golf", "Cricket", "Rugby"], correct: 1 },
        { q: "Which anime franchise features a boy who wants to become the Pirate King?", options: ["Naruto", "One Piece", "Dragon Ball", "Bleach"], correct: 1 },
        { q: "Which director is known for films like 'Jaws', 'E.T.', and 'Jurassic Park'?", options: ["George Lucas", "Steven Spielberg", "James Cameron", "Martin Scorsese"], correct: 1 },
        { q: "Which country's national football team is nicknamed the 'Samba Boys'?", options: ["Argentina", "Brazil", "Portugal", "Spain"], correct: 1 },
        { q: "Which musical instrument does a typical orchestra conductor use to lead the group?", options: ["A violin", "A baton", "A microphone", "A piano"], correct: 1 },
        { q: "Which TV series features dragons and follows the phrase 'Valar Morghulis'?", options: ["The Witcher", "Game of Thrones", "Vikings", "The Last Kingdom"], correct: 1 },
        { q: "Which actress played Hermione Granger in the Harry Potter films?", options: ["Bonnie Wright", "Emma Watson", "Evanna Lynch", "Katie Leung"], correct: 1 },
        { q: "Which sport is played in the tournament called 'The Ashes'?", options: ["Rugby", "Cricket", "Football", "Tennis"], correct: 1 },
        { q: "Which movie features the song 'My Heart Will Go On' by Celine Dion?", options: ["The Titanic", "Titanic", "Pearl Harbor", "The Notebook"], correct: 1 },
        { q: "Which fictional British spy is famous for the phrase 'shaken, not stirred'?", options: ["Sherlock Holmes", "James Bond", "Jason Bourne", "Ethan Hunt"], correct: 1 },
        { q: "Which sport does the term 'love' refer to a score of zero?", options: ["Badminton", "Tennis", "Squash", "Table Tennis"], correct: 1 },
        { q: "Which K-pop group is known for the hit song 'Dynamite'?", options: ["BLACKPINK", "BTS", "EXO", "TWICE"], correct: 1 },
        { q: "Which movie is famous for the line 'May the Force be with you'?", options: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Interstellar"], correct: 1 },
        { q: "Which sport features events like the 100m sprint and the marathon?", options: ["Swimming", "Athletics (Track and Field)", "Gymnastics", "Cycling"], correct: 1 },
        { q: "Which composer wrote 'The Four Seasons'?", options: ["Johann Sebastian Bach", "Antonio Vivaldi", "Wolfgang Amadeus Mozart", "Franz Joseph Haydn"], correct: 1 },
        { q: "Which movie franchise includes characters Iron Man, Thor, and Captain America together?", options: ["DC Extended Universe", "Marvel Cinematic Universe", "X-Men Universe", "Star Wars Universe"], correct: 1 }
      ],
      hard: [
        { q: "Which actor has officially played James Bond the most times in the film series?", options: ["Sean Connery", "Roger Moore", "Pierce Brosnan", "Daniel Craig"], correct: 1 },
        { q: "Which film won the Academy Award for Best Picture in 1995 (for the 1994 film year)?", options: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "Braveheart"], correct: 1 },
        { q: "Who wrote the novel that 'The Godfather' film was based on?", options: ["Mario Puzo", "Mark Twain", "Ernest Hemingway", "Truman Capote"], correct: 0 },
        { q: "Which composer wrote the famous 'Ode to Joy'?", options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"], correct: 1 },
        { q: "Which musician is widely known as the 'King of Pop'?", options: ["Elvis Presley", "Prince", "Michael Jackson", "James Brown"], correct: 2 },
        { q: "Which 1975 film is often considered the first modern summer blockbuster?", options: ["Star Wars", "Jaws", "Rocky", "Close Encounters of the Third Kind"], correct: 1 },
        { q: "Who painted the ceiling of the Sistine Chapel?", options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], correct: 2 },
        { q: "Which author wrote the novel 'Pride and Prejudice'?", options: ["Emily Bront\u00eb", "Jane Austen", "Charlotte Bront\u00eb", "Mary Shelley"], correct: 1 },
        { q: "The violin belongs to which family of orchestral instruments?", options: ["Brass", "Woodwind", "Strings", "Percussion"], correct: 2 },
        { q: "Which country is the origin of the paper-folding art form origami?", options: ["China", "Japan", "Korea", "Thailand"], correct: 1 },
        { q: "Which director is known for the 'Dollars Trilogy' of Western films starring Clint Eastwood?", options: ["Sergio Leone", "Sam Peckinpah", "John Ford", "Howard Hawks"], correct: 0 },
        { q: "Which classical composer continued composing even after becoming completely deaf?", options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"], correct: 1 },
        { q: "Which film is widely regarded as the first feature-length animated movie in color?", options: ["Fantasia", "Snow White and the Seven Dwarfs", "Pinocchio", "Bambi"], correct: 1 },
        { q: "Which author created the fictional detective Hercule Poirot?", options: ["Arthur Conan Doyle", "Agatha Christie", "Raymond Chandler", "Dorothy L. Sayers"], correct: 1 },
        { q: "Which musician composed the opera 'The Marriage of Figaro'?", options: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Giuseppe Verdi", "Richard Wagner"], correct: 1 },
        { q: "Which film director is known for pioneering the use of extended long takes, as in '1917'?", options: ["Christopher Nolan", "Sam Mendes", "Denis Villeneuve", "Alfonso Cuaron"], correct: 1 },
        { q: "Which ballet, composed by Tchaikovsky, tells the story of a girl who receives a nutcracker doll?", options: ["Swan Lake", "The Nutcracker", "Sleeping Beauty", "Giselle"], correct: 1 },
        { q: "Which novelist wrote 'One Hundred Years of Solitude'?", options: ["Gabriel Garcia Marquez", "Mario Vargas Llosa", "Jorge Luis Borges", "Pablo Neruda"], correct: 0 },
        { q: "Which silent film star was famous for his 'Tramp' character?", options: ["Buster Keaton", "Charlie Chaplin", "Harold Lloyd", "Fatty Arbuckle"], correct: 1 },
        { q: "Which composer's Ninth Symphony features the choral 'Ode to Joy' in its final movement?", options: ["Johannes Brahms", "Ludwig van Beethoven", "Franz Schubert", "Gustav Mahler"], correct: 1 },
        { q: "Which playwright wrote 'A Streetcar Named Desire'?", options: ["Arthur Miller", "Tennessee Williams", "Eugene O'Neill", "Edward Albee"], correct: 1 },
        { q: "Which film was the first to be shown publicly with synchronized sound in 1927?", options: ["The Jazz Singer", "Metropolis", "Sunrise", "Wings"], correct: 0 },
        { q: "Which sculptor created the statue of David that stands in Florence?", options: ["Donatello", "Michelangelo", "Bernini", "Raphael"], correct: 1 },
        { q: "Which author wrote the dystopian novel '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], correct: 1 },
        { q: "Which opera composer is known for 'The Ring Cycle'?", options: ["Giuseppe Verdi", "Richard Wagner", "Giacomo Puccini", "Georges Bizet"], correct: 1 },
        { q: "Which choreographer is known for founding the Martha Graham Dance Company style of modern dance?", options: ["Martha Graham", "Isadora Duncan", "George Balanchine", "Merce Cunningham"], correct: 0 },
        { q: "Which film composer wrote the scores for 'The Godfather' films?", options: ["John Williams", "Nino Rota", "Ennio Morricone", "Bernard Herrmann"], correct: 1 },
        { q: "Which playwright is credited with writing 'Hamlet' and 'Macbeth'?", options: ["Christopher Marlowe", "William Shakespeare", "Ben Jonson", "John Webster"], correct: 1 },
        { q: "Which artist is famous for the technique of dripping paint, associated with abstract expressionism?", options: ["Mark Rothko", "Jackson Pollock", "Willem de Kooning", "Franz Kline"], correct: 1 },
        { q: "Which early Hollywood filmmaker is known for the controversial 1915 film 'The Birth of a Nation'?", options: ["D.W. Griffith", "Cecil B. DeMille", "Mack Sennett", "Thomas Edison"], correct: 0 },
        { q: "Which composer wrote 'The Planets' orchestral suite?", options: ["Gustav Holst", "Edward Elgar", "Ralph Vaughan Williams", "Benjamin Britten"], correct: 0 },
        { q: "Which novelist is known for writing 'War and Peace'?", options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"], correct: 1 },
        { q: "Which architect designed the Sagrada Familia in Barcelona?", options: ["Antoni Gaudi", "Le Corbusier", "Santiago Calatrava", "Rafael Guastavino"], correct: 0 },
        { q: "Which early film genre did Georges Melies pioneer with 'A Trip to the Moon'?", options: ["Documentary", "Science fiction fantasy", "Western", "Film noir"], correct: 1 },
        { q: "Which composer wrote the ballet 'The Rite of Spring', which caused a riot at its premiere?", options: ["Sergei Prokofiev", "Igor Stravinsky", "Dmitri Shostakovich", "Sergei Rachmaninoff"], correct: 1 },
        { q: "Which author created the fictional character Sherlock Holmes?", options: ["Agatha Christie", "Arthur Conan Doyle", "Wilkie Collins", "G.K. Chesterton"], correct: 1 },
        { q: "Which film movement, originating in France in the late 1950s, emphasized experimental techniques?", options: ["German Expressionism", "French New Wave", "Italian Neorealism", "Soviet Montage"], correct: 1 },
        { q: "Which composer is known for 'The Well-Tempered Clavier'?", options: ["Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "George Frideric Handel", "Antonio Vivaldi"], correct: 1 },
        { q: "Which poet wrote the epic poem 'Paradise Lost'?", options: ["John Milton", "William Wordsworth", "Lord Byron", "Percy Bysshe Shelley"], correct: 0 }
      ]
    }
  }
};

// ---------- Language / i18n ----------
// NOTE: only the interface text is translated. Quiz questions stay in English
// in every language, since accurately translating hundreds of trivia
// questions is out of scope here and mistranslated trivia would hurt more
// than it helps.
const TRANSLATIONS = {
  en: {
    subtitle: "Who Wants To Be A Billionaire?",
    tabLogin: "Log In",
    tabRegister: "Register",
    username: "Username",
    password: "Password",
    logIn: "Log In",
    chooseUsername: "Choose a Username",
    choosePassword: "Choose a Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    authNote: "Accounts are saved on this browser only.",
    welcomeBack: "Welcome back, ",
    playGame: "Play Game",
    leaderboard: "Leaderboard",
    myDashboard: "My Dashboard",
    voiceNarration: "Voice narration",
    installApp: "Install App",
    logOut: "Log Out",
    chooseCategory: "Choose a Category",
    back: "\u2190 Back",
    questionLabel: "Question",
    prizeLabel: "Prize:",
    timeLabel: "Time:",
    loadingQuestion: "Loading question...",
    askAudience: "Ask Audience",
    phoneFriend: "Phone a Friend",
    quitWalkAway: "Quit & Walk Away",
    prizeLadder: "Prize Ladder",
    playAgain: "Play Again",
    home: "Home",
    rank: "Rank",
    player: "Player",
    bestPrize: "Best Prize",
    gamesPlayed: "Games Played",
    noGamesYet: "No games played yet. Be the first!",
    progressChart: "Progress Over Recent Games",
    recentGames: "Recent Games",
    noGamesPlayedYou: "You haven't played any games yet."
  },
  hi: {
    subtitle: "\u0915\u094c\u0928 \u092c\u0928\u0947\u0917\u093e \u0905\u0930\u092c\u092a\u0924\u093f?",
    tabLogin: "\u0932\u0949\u0917 \u0907\u0928",
    tabRegister: "\u0930\u091c\u093f\u0938\u094d\u091f\u0930",
    username: "\u092f\u0942\u095b\u0930\u0928\u0947\u092e",
    password: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921",
    logIn: "\u0932\u0949\u0917 \u0907\u0928",
    chooseUsername: "\u092f\u0942\u095b\u0930\u0928\u0947\u092e \u091a\u0941\u0928\u0947\u0902",
    choosePassword: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u091a\u0941\u0928\u0947\u0902",
    confirmPassword: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0915\u0940 \u092a\u0941\u0937\u094d\u091f\u093f \u0915\u0930\u0947\u0902",
    createAccount: "\u0916\u093e\u0924\u093e \u092c\u0928\u093e\u090f\u0902",
    authNote: "\u0916\u093e\u0924\u0947 \u0915\u0947\u0935\u0932 \u0907\u0938 \u092c\u094d\u0930\u093e\u0909\u095b\u0930 \u092e\u0947\u0902 \u0938\u0939\u0947\u091c\u0947 \u091c\u093e\u0924\u0947 \u0939\u0948\u0902\u0964",
    welcomeBack: "\u0935\u093e\u092a\u0938\u0940 \u092a\u0930 \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948, ",
    playGame: "\u0916\u0947\u0932 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
    leaderboard: "\u0932\u0940\u0921\u0930\u092c\u094b\u0930\u094d\u0921",
    myDashboard: "\u092e\u0947\u0930\u093e \u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921",
    voiceNarration: "\u0906\u0935\u093e\u095b \u0935\u093f\u0935\u0930\u0923",
    installApp: "\u0910\u092a \u0907\u0902\u0938\u094d\u091f\u0949\u0932 \u0915\u0930\u0947\u0902",
    logOut: "\u0932\u0949\u0917 \u0906\u0909\u091f",
    chooseCategory: "\u0936\u094d\u0930\u0947\u0923\u0940 \u091a\u0941\u0928\u0947\u0902",
    back: "\u2190 \u0935\u093e\u092a\u0938",
    questionLabel: "\u092a\u094d\u0930\u0936\u094d\u0928",
    prizeLabel: "\u0907\u0928\u093e\u092e:",
    timeLabel: "\u0938\u092e\u092f:",
    loadingQuestion: "\u092a\u094d\u0930\u0936\u094d\u0928 \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...",
    askAudience: "\u0926\u0930\u094d\u0936\u0915\u094b\u0902 \u0938\u0947 \u092a\u0942\u091b\u0947\u0902",
    phoneFriend: "\u092b\u094b\u0928 \u0905 \u092b\u094d\u0930\u0947\u0902\u0921",
    quitWalkAway: "\u091b\u094b\u0921\u093c\u0947\u0902 \u0914\u0930 \u091c\u093e\u090f\u0902",
    prizeLadder: "\u092a\u0941\u0930\u0938\u094d\u0915\u093e\u0930 \u0938\u0940\u0922\u093c\u0940",
    playAgain: "\u092b\u093f\u0930 \u0916\u0947\u0932\u0947\u0902",
    home: "\u0939\u094b\u092e",
    rank: "\u0930\u0948\u0902\u0915",
    player: "\u0916\u093f\u0932\u093e\u0921\u093c\u0940",
    bestPrize: "\u0938\u0930\u094d\u0935\u0936\u094d\u0930\u0947\u0937\u094d\u0920 \u0907\u0928\u093e\u092e",
    gamesPlayed: "\u0916\u0947\u0932\u0947 \u0917\u090f \u0916\u0947\u0932",
    noGamesYet: "\u0905\u092d\u0940 \u0924\u0915 \u0915\u094b\u0908 \u0916\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u0947\u0932\u093e \u0917\u092f\u093e\u0964 \u092a\u0939\u0932\u0947 \u092c\u0928\u0947\u0902!",
    progressChart: "\u0939\u093e\u0932\u093f\u092f\u093e \u0916\u0947\u0932\u094b\u0902 \u092e\u0947\u0902 \u092a\u094d\u0930\u0917\u0924\u093f",
    recentGames: "\u0939\u093e\u0932 \u0915\u0947 \u0916\u0947\u0932",
    noGamesPlayedYou: "\u0906\u092a\u0928\u0947 \u0905\u092d\u0940 \u0924\u0915 \u0915\u094b\u0908 \u0916\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u0947\u0932\u093e \u0939\u0948\u0964"
  },
  ur: {
    subtitle: "\u06a9\u0648\u0646 \u0628\u0646\u0650\u06af\u0627 \u0627\u0631\u0628 \u067e\u062a\u06cc\u061f",
    tabLogin: "\u0644\u0627\u06af \u0625\u0646",
    tabRegister: "\u0631\u062c\u0633\u0679\u0631",
    username: "\u06cc\u0648\u0632\u0631 \u0646\u06cc\u0645",
    password: "\u067e\u0627\u0633 \u0648\u0631\u0688",
    logIn: "\u0644\u0627\u06af \u0625\u0646",
    chooseUsername: "\u06cc\u0648\u0632\u0631 \u0646\u06cc\u0645 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba",
    choosePassword: "\u067e\u0627\u0633 \u0648\u0631\u0688 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba",
    confirmPassword: "\u067e\u0627\u0633 \u0648\u0631\u0688 \u06a9\u06cc \u062a\u0635\u062f\u06cc\u0642 \u06a9\u0631\u06cc\u06ba",
    createAccount: "\u0627\u06a9\u0627\u0624\u0646\u0679 \u0628\u0646\u0627\u0626\u06cc\u06ba",
    authNote: "\u0627\u06a9\u0627\u0624\u0646\u0679\u0633 \u0635\u0631\u0641 \u0627\u0633 \u0628\u0631\u0627\u0624\u0632\u0631 \u067e\u0631 \u0645\u062d\u0641\u0648\u0638 \u06c1\u0648\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4",
    welcomeBack: "\u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f, ",
    playGame: "\u06af\u06cc\u0645 \u06a9\u06be\u06cc\u0644\u06cc\u06ba",
    leaderboard: "\u0644\u06cc\u0688\u0631 \u0628\u0648\u0631\u0688",
    myDashboard: "\u0645\u06cc\u0631\u0627 \u0688\u06cc\u0634 \u0628\u0648\u0631\u0688",
    voiceNarration: "\u0622\u0648\u0627\u0632\u06cc \u0628\u06cc\u0627\u0646\u06cc\u06c1",
    installApp: "\u0627\u06cc\u067e \u0627\u0646\u0633\u0679\u0627\u0644 \u06a9\u0631\u06cc\u06ba",
    logOut: "\u0644\u0627\u06af \u0622\u0624\u0679",
    chooseCategory: "\u0632\u0645\u0631\u06c1 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba",
    back: "\u0648\u0627\u067e\u0633 \u2192",
    questionLabel: "\u0633\u0648\u0627\u0644",
    prizeLabel: "\u0627\u0646\u0639\u0627\u0645:",
    timeLabel: "\u0648\u0642\u062a:",
    loadingQuestion: "\u0633\u0648\u0627\u0644 \u0644\u0648\u0688 \u06c1\u0648 \u0631\u06c1\u0627 \u06c1\u06d2...",
    askAudience: "\u0633\u0627\u0645\u0639\u06cc\u0646 \u0633\u06d2 \u067e\u0648\u0686\u06be\u06cc\u06ba",
    phoneFriend: "\u062f\u0648\u0633\u062a \u06a9\u0648 \u0641\u0648\u0646 \u06a9\u0631\u06cc\u06ba",
    quitWalkAway: "\u0686\u06be\u0648\u0691 \u06a9\u0631 \u062c\u0627\u0626\u06cc\u06ba",
    prizeLadder: "\u0627\u0646\u0639\u0627\u0645\u0627\u062a \u06a9\u06cc \u0633\u06cc\u0691\u06be\u06cc",
    playAgain: "\u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u06be\u06cc\u0644\u06cc\u06ba",
    home: "\u06c1\u0648\u0645",
    rank: "\u0631\u06cc\u0646\u06a9",
    player: "\u06a9\u06be\u0644\u0627\u0691\u06cc",
    bestPrize: "\u0628\u06c1\u062a\u0631\u06cc\u0646 \u0627\u0646\u0639\u0627\u0645",
    gamesPlayed: "\u06a9\u06be\u06cc\u0644\u06d2 \u06af\u0626\u06d2 \u06af\u06cc\u0645\u0632",
    noGamesYet: "\u0627\u0628 \u062a\u06a9 \u06a9\u0648\u0626\u06cc \u06af\u06cc\u0645 \u0646\u06c1\u06cc\u06ba \u06a9\u06be\u06cc\u0644\u0627 \u06af\u06cc\u0627\u06d4 \u067e\u06c1\u0644\u06d2 \u0628\u0646\u06cc\u06ba!",
    progressChart: "حالیہ گیمز میں پیش رفت",
    recentGames: "حالیہ گیمز",
    noGamesPlayedYou: "آپ نے ابھی تک کوئی گیم نہیں کھیلا۔"
  }
};

let currentLang = "en";

function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = "en";
  currentLang = lang;
  localStorage.setItem("kbap_lang", lang);

  const dict = TRANSLATIONS[lang];
  document.querySelectorAll("[data-i18n]").forEach(elNode => {
    const key = elNode.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      // Preserve any nested child elements (like the username span) by only
      // replacing the node's own text, not its element children.
      const childNodes = [...elNode.childNodes];
      const hasElementChild = childNodes.some(n => n.nodeType === 1);
      if (hasElementChild) {
        // Replace only the first text node (the translatable label part)
        const firstText = childNodes.find(n => n.nodeType === 3);
        if (firstText) firstText.textContent = dict[key];
        else elNode.insertBefore(document.createTextNode(dict[key]), elNode.firstChild);
      } else {
        elNode.textContent = dict[key];
      }
    }
  });

  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// ---------- PWA: service worker + install prompt ----------
// NOTE: service workers only register over http(s), not the file:// protocol.
// If you're just double-clicking index.html, this will silently no-op -
// serve the folder with a local web server (or deploy it) to get offline support.
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}

let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  const installBtn = document.getElementById("install-app-btn");
  if (installBtn) installBtn.classList.remove("hidden");
});


const USERS_KEY = "kbap_users";
const SESSION_KEY = "kbap_session";

function simpleHash(str) {
  // Not cryptographically secure - just basic obfuscation for a local-only demo.
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return "h" + Math.abs(hash).toString(16);
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(username) {
  localStorage.setItem(SESSION_KEY, username);
}

function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function createNewUserRecord() {
  return {
    passwordHash: "",
    createdAt: Date.now(),
    stats: {
      gamesPlayed: 0,
      bestPrizeIndex: -1, // index into PRIZES, -1 = none yet
      history: [] // { date, category, correctCount, prizeWon, prizeIndex }
    }
  };
}

// ---------- App / game state ----------
let QUESTIONS = [];
let currentCategoryKey = null;
let state = {};
let timerInterval = null;

function resetGameState() {
  state = {
    currentIndex: 0,
    lastSafePrize: "0",
    hiddenOptions: [],
    lifelines: { fiftyFifty: true, askAudience: true, phoneFriend: true },
    answered: false,
    correctCount: 0,
    difficultyLevel: 0,
    usedQuestionTexts: new Set(),
    lifelineUsedThisQuestion: false
  };
}

// ---------- DOM references ----------
const screens = {
  auth: document.getElementById("auth-screen"),
  home: document.getElementById("home-screen"),
  category: document.getElementById("category-screen"),
  game: document.getElementById("game-screen"),
  result: document.getElementById("result-screen"),
  leaderboard: document.getElementById("leaderboard-screen"),
  dashboard: document.getElementById("dashboard-screen")
};

const el = {
  qIndex: document.getElementById("q-index"),
  qTotal: document.getElementById("q-total"),
  qPrize: document.getElementById("q-prize"),
  qTimer: document.getElementById("q-timer"),
  timerBarFill: document.getElementById("timer-bar-fill"),
  questionText: document.getElementById("question-text"),
  optionsGrid: document.getElementById("options-grid"),
  ladderList: document.getElementById("ladder-list"),
  lifelineOutput: document.getElementById("lifeline-output"),
  resultTitle: document.getElementById("result-title"),
  resultMessage: document.getElementById("result-message"),
  lifeline5050: document.getElementById("lifeline-5050"),
  lifelinePoll: document.getElementById("lifeline-poll"),
  lifelinePhone: document.getElementById("lifeline-phone"),
  homeUsername: document.getElementById("home-username"),
  categoryGrid: document.getElementById("category-grid"),
  leaderboardBody: document.getElementById("leaderboard-body"),
  leaderboardEmpty: document.getElementById("leaderboard-empty"),
  dashboardStats: document.getElementById("dashboard-stats"),
  dashboardHistory: document.getElementById("dashboard-history"),
  dashboardEmpty: document.getElementById("dashboard-empty")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ---------- Auth ----------
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");
  errorEl.textContent = "";

  const users = loadUsers();
  const record = users[username];
  if (!record || record.passwordHash !== simpleHash(password)) {
    errorEl.textContent = "Incorrect username or password.";
    return;
  }
  setSession(username);
  goHome();
}

function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-password-confirm").value;
  const errorEl = document.getElementById("register-error");
  errorEl.textContent = "";

  if (username.length < 3) {
    errorEl.textContent = "Username must be at least 3 characters.";
    return;
  }
  if (password.length < 4) {
    errorEl.textContent = "Password must be at least 4 characters.";
    return;
  }
  if (password !== confirm) {
    errorEl.textContent = "Passwords do not match.";
    return;
  }

  const users = loadUsers();
  if (users[username]) {
    errorEl.textContent = "That username is already taken.";
    return;
  }

  const record = createNewUserRecord();
  record.passwordHash = simpleHash(password);
  users[username] = record;
  saveUsers(users);
  setSession(username);
  goHome();
}

function handleLogout() {
  clearSession();
  document.getElementById("login-form").reset();
  document.getElementById("register-form").reset();
  showScreen("auth");
  typeWelcomeTagline();
}

function goHome() {
  const username = getSession();
  el.homeUsername.textContent = username;
  showScreen("home");
  clearInterval(funFactInterval);
}

const MIXED_KEY = "mixed";
const MIXED_LABEL = "Mixed (All Categories)";

// Returns {easy, medium, hard} pools for a category key. For the special
// "mixed" key, combines every real category's pools together.
function getPoolsForCategory(categoryKey) {
  if (categoryKey === MIXED_KEY) {
    return {
      easy: Object.values(CATEGORIES).flatMap(c => c.pools.easy),
      medium: Object.values(CATEGORIES).flatMap(c => c.pools.medium),
      hard: Object.values(CATEGORIES).flatMap(c => c.pools.hard)
    };
  }
  return CATEGORIES[categoryKey].pools;
}

function getCategoryLabel(categoryKey) {
  if (categoryKey === MIXED_KEY) return MIXED_LABEL;
  return CATEGORIES[categoryKey].label;
}

// ---------- Category screen ----------
function renderCategoryGrid() {
  el.categoryGrid.innerHTML = "";

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const total = cat.pools.easy.length + cat.pools.medium.length + cat.pools.hard.length;
    const card = document.createElement("button");
    card.className = "category-card";
    card.innerHTML = `<span class="cat-name">${cat.label}</span><span class="cat-count">${total} questions</span>`;
    card.addEventListener("click", () => {
      currentCategoryKey = key;
      startGame();
    });
    el.categoryGrid.appendChild(card);
  });

  // "Mixed" pulls from every category, like the real KBC show mixing subjects.
  const mixedPools = getPoolsForCategory(MIXED_KEY);
  const mixedTotal = mixedPools.easy.length + mixedPools.medium.length + mixedPools.hard.length;
  const mixedCard = document.createElement("button");
  mixedCard.className = "category-card category-card-mixed";
  mixedCard.innerHTML = `<span class="cat-name">${MIXED_LABEL}</span><span class="cat-count">${mixedTotal} questions</span>`;
  mixedCard.addEventListener("click", () => {
    currentCategoryKey = MIXED_KEY;
    startGame();
  });
  el.categoryGrid.appendChild(mixedCard);
}

// ---------- Question building (adaptive difficulty) ----------
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const TIERS = ["easy", "medium", "hard"];

// Picks one unused question, preferring the given difficulty level (0=easy,1=medium,2=hard),
// falling back to neighboring tiers if that tier's pool is exhausted.
function pickAdaptiveQuestion(categoryKey, level, usedTexts) {
  const pools = getPoolsForCategory(categoryKey);
  const order = [level, level + 1, level - 1, level + 2, level - 2]
    .filter(l => l >= 0 && l <= 2);

  for (const l of order) {
    const tierName = TIERS[l];
    const candidates = pools[tierName].filter(item => !usedTexts.has(item.q));
    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      usedTexts.add(pick.q);
      return pick;
    }
  }
  return null; // pool fully exhausted (shouldn't normally happen)
}

// Difficulty adjusts based on how the previous question went:
// correct with no lifeline used -> steps up; correct but needed a lifeline -> stays level.
function adjustDifficulty(wasCorrect, usedLifeline) {
  if (wasCorrect && !usedLifeline) {
    state.difficultyLevel = Math.min(2, state.difficultyLevel + 1);
  }
}

// ---------- Ladder ----------
function buildLadder() {
  el.ladderList.innerHTML = "";
  QUESTIONS.forEach((q, i) => {
    const li = document.createElement("li");
    li.dataset.index = i;
    li.innerHTML = `<span>Q${i + 1}</span><span>Rs. ${q.prize}</span>`;
    if (SAFE_LEVELS.has(i + 1)) li.classList.add("safe");
    el.ladderList.appendChild(li);
  });
}

function updateLadder() {
  [...el.ladderList.children].forEach((li, i) => {
    li.classList.toggle("current", i === state.currentIndex);
    li.classList.toggle("passed", i < state.currentIndex);
  });
}

// ---------- Game flow ----------
function startGame() {
  QUESTIONS = PRIZES.map(prize => ({ prize })); // content filled in lazily, adaptively
  resetGameState();
  el.qTotal.textContent = QUESTIONS.length;
  buildLadder();
  showScreen("game");
  renderQuestion();
}

function renderQuestion() {
  // Lazily pick this question's content based on current adaptive difficulty level.
  if (!QUESTIONS[state.currentIndex].q) {
    const picked = pickAdaptiveQuestion(currentCategoryKey, state.difficultyLevel, state.usedQuestionTexts);
    if (picked) {
      QUESTIONS[state.currentIndex].q = picked.q;
      QUESTIONS[state.currentIndex].options = picked.options;
      QUESTIONS[state.currentIndex].correct = picked.correct;
    }
  }

  const q = QUESTIONS[state.currentIndex];
  state.answered = false;
  state.hiddenOptions = [];
  state.lifelineUsedThisQuestion = false;
  el.lifelineOutput.textContent = "";

  el.qIndex.textContent = state.currentIndex + 1;
  el.qPrize.textContent = q.prize;
  el.questionText.textContent = q.q;

  // Restart the CSS reveal animations (they don't replay automatically since
  // these are the same DOM elements being reused, just with new text/content).
  const questionBox = document.querySelector(".question-box");
  el.questionText.classList.remove("reveal");
  questionBox.classList.remove("reveal");
  el.qPrize.classList.remove("pulse");
  void el.questionText.offsetWidth; // force reflow so the animation restarts
  el.questionText.classList.add("reveal");
  questionBox.classList.add("reveal");
  el.qPrize.classList.add("pulse");
  playQuestionRevealSound();

  el.optionsGrid.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.index = i;
    btn.innerHTML = `<span class="opt-label">${LETTERS[i]}</span>${escapeHtml(opt)}`;
    btn.addEventListener("click", () => onAnswerSelected(i));
    el.optionsGrid.appendChild(btn);
  });

  updateLadder();
  updateLifelineButtons();
  startTimer();
  speak(q.q);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function updateLifelineButtons() {
  el.lifeline5050.disabled = !state.lifelines.fiftyFifty;
  el.lifelinePoll.disabled = !state.lifelines.askAudience;
  el.lifelinePhone.disabled = !state.lifelines.phoneFriend;
}

// ---------- Timer ----------
function timerTick() {
  state.timeRemaining--;
  el.qTimer.textContent = Math.max(state.timeRemaining, 0);
  const pct = Math.max((state.timeRemaining / TIME_PER_QUESTION) * 100, 0);
  el.timerBarFill.style.width = pct + "%";
  if (state.timeRemaining <= 5) {
    el.timerBarFill.classList.add("low");
    el.qTimer.closest(".timer-item").classList.add("low");
  }

  if (state.timeRemaining <= 0) {
    clearInterval(timerInterval);
    if (!state.answered) handleTimeout();
  }
}

function startTimer() {
  clearInterval(timerInterval);
  state.timeRemaining = TIME_PER_QUESTION;
  el.qTimer.textContent = state.timeRemaining;
  el.timerBarFill.style.width = "100%";
  el.timerBarFill.classList.remove("low");
  el.qTimer.closest(".timer-item").classList.remove("low");

  timerInterval = setInterval(timerTick, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Pauses the countdown without resetting it (used during Phone a Friend's "call").
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Resumes counting down from wherever state.timeRemaining left off.
function resumeTimer() {
  if (state.answered) return;
  clearInterval(timerInterval);
  timerInterval = setInterval(timerTick, 1000);
}

// ---------- Sound effects (Web Audio API - synthesized, no audio files needed) ----------
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = "sine", startDelay = 0, gainValue = 0.15) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = gainValue;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const startTime = ctx.currentTime + startDelay;
  osc.start(startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.stop(startTime + duration);
}

function playCorrectSound() {
  playTone(523.25, 0.15, "sine", 0);
  playTone(659.25, 0.15, "sine", 0.12);
  playTone(783.99, 0.25, "sine", 0.24);
}

// A short rising "whoosh" sting when a new question drops in, like a show intro.
function playQuestionRevealSound() {
  playTone(300, 0.12, "sine", 0, 0.08);
  playTone(450, 0.12, "sine", 0.07, 0.08);
  playTone(600, 0.18, "sine", 0.14, 0.09);
}

// A low pulsing "drumroll" tension tone, played during the pause before an
// answer is revealed as correct/wrong - like the real show's suspense beat.
function playSuspenseSound() {
  playTone(110, 0.1, "square", 0, 0.05);
  playTone(110, 0.1, "square", 0.22, 0.05);
  playTone(110, 0.1, "square", 0.44, 0.05);
  playTone(110, 0.1, "square", 0.66, 0.05);
}

function playWrongSound() {
  playTone(200, 0.3, "sawtooth", 0, 0.12);
  playTone(150, 0.4, "sawtooth", 0.1, 0.12);
}

function playWinSound() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, 0.35, "triangle", i * 0.15, 0.14));
}

function playTickSound() {
  playTone(880, 0.05, "square", 0, 0.05);
}

// ---------- Voice narration (Web Speech API) ----------
let voiceEnabled = true;

function speak(text) {
  if (!voiceEnabled || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    // speech synthesis unsupported or blocked - fail silently
  }
}

// ---------- Virtual host commentary ----------
const HOST_CORRECT_LINES = [
  "Yes! That's absolutely right!",
  "Correct! You're on fire!",
  "That's the one! Well played.",
  "Nailed it! Keep going.",
  "Excellent! You knew that cold.",
  "Right again! Impressive.",
  "That's it! You're unstoppable."
];

const HOST_WRONG_LINES = [
  "Ohh, so close, but that's not it.",
  "Unlucky! That wasn't the answer.",
  "Not quite — tough break there.",
  "Ohh no, that's incorrect.",
  "That one got away from you."
];

const HOST_MILESTONE_LINES = [
  "That's a guaranteed prize now — nobody can take that away from you!",
  "Checkpoint secured! You're building something special here.",
  "That locks in your safety net. Fantastic!"
];

const HOST_WIN_LINES = [
  "Unbelievable! You are officially an Arab-pati!",
  "What a performance! You've won it all!",
  "History has been made. Congratulations, champion!"
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let hostTypeTimeout = null;
function showHostCommentary(text) {
  const hostEl = document.getElementById("host-commentary");
  if (!hostEl) return;
  clearTimeout(hostTypeTimeout);
  hostEl.classList.remove("show");
  void hostEl.offsetWidth; // restart CSS animation
  hostEl.classList.add("show");
  hostEl.textContent = "";

  let i = 0;
  function typeNext() {
    hostEl.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      hostTypeTimeout = setTimeout(typeNext, 18);
    }
  }
  typeNext();
}

// ---------- Confetti (vanilla canvas, no external library) ----------
function launchConfetti(durationMs = 2200) {
  let canvas = document.getElementById("confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return; // canvas 2D context unavailable in this environment

  const colors = ["#d4af37", "#f2d585", "#f1efe6", "#3fa34d", "#e67e22"];
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    size: 5 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10
  }));

  const start = performance.now();
  function frame(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (now - start < durationMs) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(frame);
}


function handleTimeout() {
  if (state.answered) return;
  state.answered = true;
  const q = QUESTIONS[state.currentIndex];
  const buttons = [...el.optionsGrid.children];
  buttons.forEach(b => (b.disabled = true));
  buttons[q.correct].classList.add("correct");
  el.lifelineOutput.innerHTML = "<strong>Time's up!</strong> No answer was selected.";
  playWrongSound();
  showHostCommentary("Time's up! The clock beat you on that one.");
  setTimeout(() => endGame(false, state.lastSafePrize, q), 1400);
}

function onAnswerSelected(index) {
  if (state.answered) return;
  state.answered = true;
  stopTimer();

  const q = QUESTIONS[state.currentIndex];
  const buttons = [...el.optionsGrid.children];
  buttons.forEach(b => (b.disabled = true));

  // Phase 1: lock in the chosen answer and build suspense, like the real show.
  buttons[index].classList.add("locked-in");
  showHostCommentary("Locking that in...");
  playSuspenseSound();

  const isCorrect = index === q.correct;

  setTimeout(() => {
    // Phase 2: reveal correct/wrong.
    buttons[index].classList.remove("locked-in");
    buttons[q.correct].classList.add("correct");
    if (index !== q.correct) {
      buttons[index].classList.add("wrong");
    }

    if (isCorrect) {
      playCorrectSound();
      showHostCommentary(randomFrom(HOST_CORRECT_LINES));
    } else {
      playWrongSound();
      showHostCommentary(randomFrom(HOST_WRONG_LINES));
    }

    proceedAfterReveal(isCorrect, index, q);
  }, 1300);
}

function proceedAfterReveal(isCorrect, index, q) {
  setTimeout(() => {
    if (isCorrect) {
      state.correctCount++;
      adjustDifficulty(true, state.lifelineUsedThisQuestion);
      const hitCheckpoint = SAFE_LEVELS.has(state.currentIndex + 1);
      if (hitCheckpoint) {
        state.lastSafePrize = q.prize;
        launchConfetti(1800);
        showHostCommentary(randomFrom(HOST_MILESTONE_LINES));
      }
      if (state.currentIndex === QUESTIONS.length - 1) {
        endGame(true, q.prize);
      } else {
        state.currentIndex++;
        renderQuestion();
      }
    } else {
      endGame(false, state.lastSafePrize, q);
    }
  }, 1400);
}

function endGame(won, prize, missedQuestion) {
  stopTimer();
  showScreen("result");

  const prizeIndex = PRIZES.indexOf(prize);
  recordGameResult({
    category: getCategoryLabel(currentCategoryKey),
    correctCount: state.correctCount,
    prizeWon: prize,
    prizeIndex: prizeIndex
  });

  if (won) {
    el.resultTitle.textContent = "You are an Arab-pati!";
    el.resultMessage.textContent = `Congratulations! You answered every question and won Rs. ${prize}.`;
    playWinSound();
    launchConfetti(3200);
    showHostCommentary(randomFrom(HOST_WIN_LINES));
    speak("Congratulations! You are an Arab-pati!");
  } else if (missedQuestion) {
    el.resultTitle.textContent = "Game Over";
    el.resultMessage.textContent =
      `Wrong answer. The correct answer was "${missedQuestion.options[missedQuestion.correct]}". ` +
      `You leave with Rs. ${prize}.`;
  } else {
    el.resultTitle.textContent = "You walked away";
    el.resultMessage.textContent = `You leave with Rs. ${prize}.`;
  }
}

function recordGameResult({ category, correctCount, prizeWon, prizeIndex }) {
  const username = getSession();
  if (!username) return;
  const users = loadUsers();
  const record = users[username];
  if (!record) return;

  record.stats.gamesPlayed++;
  if (prizeIndex > record.stats.bestPrizeIndex) {
    record.stats.bestPrizeIndex = prizeIndex;
  }
  record.stats.history.unshift({
    date: new Date().toISOString(),
    category,
    correctCount,
    prizeWon,
    prizeIndex
  });
  record.stats.history = record.stats.history.slice(0, 20); // keep last 20

  users[username] = record;
  saveUsers(users);
}

// ---------- Lifelines ----------
function useFiftyFifty() {
  if (!state.lifelines.fiftyFifty || state.answered) return;
  state.lifelines.fiftyFifty = false;
  state.lifelineUsedThisQuestion = true;

  const q = QUESTIONS[state.currentIndex];
  const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.correct);
  shuffle(wrongIndices);
  state.hiddenOptions = wrongIndices.slice(0, 2);

  state.hiddenOptions.forEach(i => {
    el.optionsGrid.children[i].classList.add("hidden-option");
    el.optionsGrid.children[i].disabled = true;
  });

  el.lifelineOutput.innerHTML = "<strong>50-50 used:</strong> two incorrect options removed.";
  updateLifelineButtons();
}

function useAskAudience() {
  if (!state.lifelines.askAudience || state.answered) return;
  state.lifelines.askAudience = false;
  state.lifelineUsedThisQuestion = true;

  const q = QUESTIONS[state.currentIndex];
  const pct = simulatePoll(q, state.hiddenOptions);

  const lines = pct
    .map((p, i) => (state.hiddenOptions.includes(i) ? null : `${LETTERS[i]}: ${p}%`))
    .filter(Boolean)
    .join(" &nbsp;&nbsp; ");

  el.lifelineOutput.innerHTML = `<strong>Audience Poll:</strong> ${lines}`;
  updateLifelineButtons();
}

function usePhoneFriend() {
  if (!state.lifelines.phoneFriend || state.answered) return;
  state.lifelines.phoneFriend = false;
  state.lifelineUsedThisQuestion = true;

  pauseTimer();
  el.lifelineOutput.innerHTML = "<strong>Calling your friend...</strong> please wait.";
  const phoneBtn = document.getElementById("lifeline-phone");
  if (phoneBtn) phoneBtn.disabled = true;

  const q = QUESTIONS[state.currentIndex];
  const candidates = [0, 1, 2, 3].filter(i => !state.hiddenOptions.includes(i));
  let suggestion;
  if (Math.random() < 0.75) {
    suggestion = q.correct;
  } else {
    const wrongCandidates = candidates.filter(i => i !== q.correct);
    suggestion = wrongCandidates.length
      ? wrongCandidates[Math.floor(Math.random() * wrongCandidates.length)]
      : q.correct;
  }

  // Simulate the call taking a few seconds - timer stays paused the whole time.
  setTimeout(() => {
    if (state.answered) return; // player answered some other way while "on the phone"
    el.lifelineOutput.innerHTML =
      `<strong>Phone a Friend:</strong> "I'm pretty sure it's ${LETTERS[suggestion]}, ` +
      `${escapeHtml(q.options[suggestion])}."`;
    updateLifelineButtons();
    resumeTimer();
  }, 4000);
}

function simulatePoll(q, hidden) {
  const pct = [0, 0, 0, 0];
  let remaining = 100;
  const correctShare = 40 + Math.floor(Math.random() * 30); // 40-69%
  pct[q.correct] = correctShare;
  remaining -= correctShare;

  const others = [0, 1, 2, 3].filter(i => i !== q.correct && !hidden.includes(i));
  others.forEach((idx, pos) => {
    const isLast = pos === others.length - 1;
    const share = isLast ? remaining : Math.floor(Math.random() * (remaining + 1));
    pct[idx] = share;
    remaining -= share;
  });
  return pct;
}

function quitGame() {
  if (state.answered) return;
  endGame(false, state.lastSafePrize);
}

// ---------- Leaderboard ----------
function renderLeaderboard() {
  const users = loadUsers();
  const currentUsername = getSession();
  const rows = Object.entries(users)
    .filter(([, record]) => record.stats.gamesPlayed > 0)
    .map(([username, record]) => ({
      username,
      bestPrizeIndex: record.stats.bestPrizeIndex,
      bestPrize: record.stats.bestPrizeIndex >= 0 ? PRIZES[record.stats.bestPrizeIndex] : "0",
      gamesPlayed: record.stats.gamesPlayed
    }))
    .sort((a, b) => b.bestPrizeIndex - a.bestPrizeIndex);

  el.leaderboardBody.innerHTML = "";
  if (rows.length === 0) {
    el.leaderboardEmpty.classList.remove("hidden");
    return;
  }
  el.leaderboardEmpty.classList.add("hidden");

  rows.forEach((row, i) => {
    const tr = document.createElement("tr");
    if (row.username === currentUsername) tr.classList.add("current-user");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(row.username)}</td>
      <td>Rs. ${row.bestPrize}</td>
      <td>${row.gamesPlayed}</td>
    `;
    el.leaderboardBody.appendChild(tr);
  });
}

// ---------- Dashboard ----------
function renderDashboard() {
  const username = getSession();
  const users = loadUsers();
  const record = users[username];
  if (!record) return;

  const bestPrize = record.stats.bestPrizeIndex >= 0 ? PRIZES[record.stats.bestPrizeIndex] : "0";

  el.dashboardStats.innerHTML = `
    <div class="dashboard-stat"><span class="stat-value">${record.stats.gamesPlayed}</span><span class="stat-label">Games Played</span></div>
    <div class="dashboard-stat"><span class="stat-value">Rs. ${bestPrize}</span><span class="stat-label">Best Prize</span></div>
    <div class="dashboard-stat"><span class="stat-value">${record.stats.history.length}</span><span class="stat-label">Recent Games Shown</span></div>
  `;

  drawDashboardChart(record.stats.history);

  el.dashboardHistory.innerHTML = "";
  if (record.stats.history.length === 0) {
    el.dashboardEmpty.classList.remove("hidden");
    return;
  }
  el.dashboardEmpty.classList.add("hidden");

  record.stats.history.forEach(entry => {
    const li = document.createElement("li");
    const date = new Date(entry.date).toLocaleDateString();
    li.innerHTML = `<span>${escapeHtml(entry.category)} &mdash; ${entry.correctCount}/15 correct</span><span>Rs. ${entry.prizeWon} &middot; ${date}</span>`;
    el.dashboardHistory.appendChild(li);
  });
}

// Draws a simple bar chart of prize-index reached per recent game (oldest to newest, left to right).
// No external chart library - kept dependency-free so it works offline in the PWA.
function drawDashboardChart(history) {
  const canvas = document.getElementById("dashboard-chart");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return; // canvas 2D context unavailable in this environment
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (!history || history.length === 0) {
    ctx.fillStyle = "#a8b0d8";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Play a few games to see your progress here.", w / 2, h / 2);
    return;
  }

  const games = [...history].reverse().slice(-12); // oldest to newest, last 12
  const maxIndex = PRIZES.length - 1;
  const padding = 30;
  const chartW = w - padding * 2;
  const chartH = h - padding * 2;
  const barGap = 8;
  const barWidth = Math.max(6, chartW / games.length - barGap);

  // axis line
  ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
  ctx.beginPath();
  ctx.moveTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();

  games.forEach((game, i) => {
    const value = Math.max(0, game.prizeIndex + 1); // +1 so index 0 still shows a small bar
    const barH = (value / (maxIndex + 1)) * chartH;
    const x = padding + i * (barWidth + barGap);
    const y = h - padding - barH;

    ctx.fillStyle = "#d4af37";
    ctx.fillRect(x, y, barWidth, barH);
  });

  ctx.fillStyle = "#a8b0d8";
  ctx.font = "11px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Oldest", padding, h - 8);
  ctx.textAlign = "right";
  ctx.fillText("Newest", w - padding, h - 8);
}

// ---------- Wire up events ----------
document.getElementById("tab-login").addEventListener("click", () => {
  document.getElementById("tab-login").classList.add("active");
  document.getElementById("tab-register").classList.remove("active");
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("register-form").classList.add("hidden");
});

document.getElementById("tab-register").addEventListener("click", () => {
  document.getElementById("tab-register").classList.add("active");
  document.getElementById("tab-login").classList.remove("active");
  document.getElementById("register-form").classList.remove("hidden");
  document.getElementById("login-form").classList.add("hidden");
});

document.getElementById("login-form").addEventListener("submit", handleLogin);
document.getElementById("register-form").addEventListener("submit", handleRegister);
document.getElementById("logout-btn").addEventListener("click", handleLogout);

const voiceToggleCheckbox = document.getElementById("voice-toggle-checkbox");
if (voiceToggleCheckbox) {
  voiceToggleCheckbox.addEventListener("change", () => {
    voiceEnabled = voiceToggleCheckbox.checked;
    if (!voiceEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });
}

document.getElementById("go-play-btn").addEventListener("click", () => {
  renderCategoryGrid();
  showScreen("category");
});
document.getElementById("category-back-btn").addEventListener("click", goHome);

document.getElementById("go-leaderboard-btn").addEventListener("click", () => {
  renderLeaderboard();
  showScreen("leaderboard");
});
document.getElementById("leaderboard-back-btn").addEventListener("click", goHome);

document.getElementById("go-dashboard-btn").addEventListener("click", () => {
  renderDashboard();
  showScreen("dashboard");
});
document.getElementById("dashboard-back-btn").addEventListener("click", goHome);

document.getElementById("play-again-btn").addEventListener("click", () => {
  renderCategoryGrid();
  showScreen("category");
});
document.getElementById("result-home-btn").addEventListener("click", goHome);

document.getElementById("lifeline-5050").addEventListener("click", useFiftyFifty);
document.getElementById("lifeline-poll").addEventListener("click", useAskAudience);
document.getElementById("lifeline-phone").addEventListener("click", usePhoneFriend);
document.getElementById("quit-btn").addEventListener("click", quitGame);

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
    if (document.getElementById("auth-screen").classList.contains("active")) {
      typeWelcomeTagline();
    }
  });
});

const installAppBtn = document.getElementById("install-app-btn");
if (installAppBtn) {
  installAppBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installAppBtn.classList.add("hidden");
  });
}

// ---------- Welcome tagline typewriter (auth screen) ----------
const WELCOME_TAGLINES = {
  en: "Welcome to the ultimate quiz challenge!",
  hi: "\u0905\u0902\u0924\u093f\u092e \u0915\u094d\u0935\u093f\u091c\u093c \u091a\u0941\u0928\u094c\u0924\u0940 \u092e\u0947\u0902 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948!",
  ur: "\u0628\u06c1\u062a\u0631\u06cc\u0646 \u06a9\u0648\u0626\u0632 \u0686\u06cc\u0644\u0646\u062c \u0645\u06cc\u06ba \u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f!"
};

const FUN_FACTS = {
  en: [
    "Did you know? The real KBC show has aired since the year 2000.",
    "Tip: Use your lifelines wisely - you only get one of each per game!",
    "The higher you climb, the harder the questions get.",
    "Adaptive difficulty means fast, clean answers unlock tougher questions.",
    "Try the 'Mixed' category for a true KBC-style subject shuffle."
  ],
  hi: [
    "\u0915\u094d\u092f\u093e \u0906\u092a \u091c\u093e\u0928\u0924\u0947 \u0939\u0948\u0902? \u0905\u0938\u0932\u0940 KBC \u0936\u094b \u0938\u093e\u0932 2000 \u0938\u0947 \u092a\u094d\u0930\u0938\u093e\u0930\u093f\u0924 \u0939\u094b \u0930\u0939\u093e \u0939\u0948\u0964",
    "\u0938\u0941\u091d\u093e\u0935: \u0905\u092a\u0928\u0947 \u0932\u093e\u0907\u092b\u0932\u093e\u0907\u0902\u0938 \u0938\u092e\u091d\u0926\u093e\u0930\u0940 \u0938\u0947 \u0907\u0938\u094d\u0924\u0947\u092e\u093e\u0932 \u0915\u0930\u0947\u0902!",
    "\u091c\u093f\u0924\u0928\u093e \u0910\u0902\u091a\u0947 \u091c\u093e\u090f\u0902\u0917\u0947, \u0938\u0935\u093e\u0932 \u0909\u0924\u0928\u0947 \u0939\u0940 \u092e\u0941\u0936\u094d\u0915\u093f\u0932 \u0939\u094b\u0902\u0917\u0947\u0964",
    "'\u092e\u093f\u0915\u094d\u0938\u0921' \u0936\u094d\u0930\u0947\u0923\u0940 \u091c\u0930\u0942\u0930 \u0906\u091c\u092e\u093e\u090f\u0902\u0964"
  ],
  ur: [
    "\u06a9\u06cc\u0627 \u0622\u067e \u062c\u0627\u0646\u062a\u06d2 \u06c1\u06cc\u06ba\u061f \u0627\u0635\u0644\u06cc KBC \u0634\u0648 \u0633\u0646 2000 \u0633\u06d2 \u0646\u0634\u0631 \u06c1\u0648 \u0631\u06c1\u0627 \u06c1\u06d2\u06d4",
    "\u062a\u062c\u0648\u06cc\u0632: \u0627\u067e\u0646\u06d2 \u0644\u0627\u0626\u0641 \u0644\u0627\u0626\u0646\u0632 \u0633\u0645\u062c\u06be \u062f\u0627\u0631\u06cc \u0633\u06d2 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u06cc\u06ba!",
    "\u062c\u062a\u0646\u0627 \u0627\u0648\u067e\u0631 \u062c\u0627\u0626\u06cc\u06ba \u06af\u06d2\u060c \u0633\u0648\u0627\u0644 \u0627\u062a\u0646\u06d2 \u06c1\u06cc \u0645\u0634\u06a9\u0644 \u06c1\u0648\u06ba \u06af\u06d2\u06d4"
  ]
};

let taglineTypeTimeout = null;
let funFactInterval = null;

function playTaglineChime() {
  playTone(659.25, 0.2, "sine", 0, 0.07);
  playTone(880, 0.3, "sine", 0.1, 0.08);
}

function startFunFactRotation() {
  const factEl = document.getElementById("fun-fact");
  if (!factEl) return;
  clearInterval(funFactInterval);

  const facts = FUN_FACTS[currentLang] || FUN_FACTS.en;
  let index = 0;

  function showFact() {
    factEl.classList.remove("show");
    setTimeout(() => {
      factEl.textContent = facts[index % facts.length];
      factEl.classList.add("show");
      index++;
    }, 400);
  }

  showFact();
  funFactInterval = setInterval(showFact, 4500);
}

function typeWelcomeTagline() {
  const textEl = document.getElementById("welcome-tagline-text");
  if (!textEl) return;
  clearTimeout(taglineTypeTimeout);
  const text = WELCOME_TAGLINES[currentLang] || WELCOME_TAGLINES.en;
  textEl.textContent = "";

  let i = 0;
  function typeNext() {
    textEl.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      taglineTypeTimeout = setTimeout(typeNext, 45);
    } else {
      playTaglineChime();
      startFunFactRotation();
    }
  }
  taglineTypeTimeout = setTimeout(typeNext, 700); // wait for title entrance to finish first
}

// ---------- Startup ----------
(function init() {
  const savedLang = localStorage.getItem("kbap_lang") || "en";
  applyLanguage(savedLang);

  const session = getSession();
  if (session) {
    const users = loadUsers();
    if (users[session]) {
      goHome();
      return;
    }
  }
  showScreen("auth");
  typeWelcomeTagline();
})();