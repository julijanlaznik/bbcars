
import { Car } from '../types';

export const cars: Car[] = [
  {
    id: 'porsche-911-gt3',
    brand: 'Porsche',
    model: '911 GT3 (992)',
    year: 2023,
    bodyType: 'Coupe',
    inServiceFrom: '03/2023',
    price: '6 490 000 Kč',
    km: '1 200 km',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=100&w=2400',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=100&w=2400',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=100&w=2400',
      'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&q=100&w=2400',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=100&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=100&w=1200',
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=100&w=800'
    ],
    exteriorImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=100&w=1200'
    ],
    engineCapacity: '3 996 ccm',
    powerKw: '375 kW',
    drivetrain: '2x4 (RWD)',
    detailedDescription: {
      CZ: [
        "Atmosférický motor 4.0L Boxer s omezovačem v 9 000 ot/min",
        "7stupňová dvouspojková převodovka PDK se zkrácenými převody",
        "Aerodynamický paket Swan-neck se zvýšeným přítlakem o 50 %",
        "Přední náprava s dvojitými příčnými rameny odvozená od RSR",
        "Karbon-keramické brzdy (PCCB) se žlutými třmeny",
        "Skořepinová sedadla z CFRP potažená Race-Tex tkaninou",
        "Paket Chrono včetně přípravy pro Laptrigger",
        "Systém natáčení zadní nápravy pro maximální agilitu"
      ],
      EN: [
        "Naturally aspirated 4.0L Flat-6 engine with 9,000 RPM redline",
        "7-speed PDK dual-clutch transmission with short ratios",
        "Swan-neck rear wing with 50% increased downforce",
        "Double-wishbone front suspension derived from the RSR",
        "Porsche Ceramic Composite Brakes (PCCB) with yellow calipers",
        "Full bucket seats in CFRP with Race-Tex upholstery",
        "Chrono Package including laptrigger preparation",
        "Rear-axle steering system for maximum agility"
      ]
    },
    emotionalHeadline: { CZ: 'Technická specifikace vozu', EN: 'Technical specification' },
    story: { CZ: 'Vůz v perfektním technickém stavu, po prvním majiteli.', EN: 'Vehicle in perfect technical condition, single owner.' },
    specs: { engine: '4.0L Flat-6', power: '510 HP', transmission: '7-speed PDK', fuel: 'Benzín' },
    equipment: ["4zónová klimatizace", "360 kamera", "Vzduchové odpružení", "Carbon Exterior Pack"]
  },
  {
    id: 'ferrari-296-gtb',
    brand: 'Ferrari',
    model: '296 GTB Assetto Fiorano',
    year: 2024,
    bodyType: 'Coupe',
    inServiceFrom: '05/2024',
    price: '9 250 000 Kč',
    km: '300 km',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=100&w=2400',
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=100&w=2400'
    ],
    interiorImages: [],
    exteriorImages: [],
    engineCapacity: '2 992 ccm',
    powerKw: '610 kW',
    drivetrain: 'RWD (Hybrid)',
    detailedDescription: {
      CZ: [
        "V6 motor o objemu 3,0 litru s úhlem rozevření 120°",
        "Integrovaný elektromotor o výkonu 122 kW",
        "Paket Assetto Fiorano pro snížení hmotnosti",
        "Adaptivní tlumiče Multimatic optimalizované pro okruh",
        "Prvky z uhlíkových vláken v interiéru i exteriéru",
        "Digitální palubní deska s haptickou odezvou",
        "Pneumatiky Michelin Pilot Sport Cup 2R",
        "Speciální lakování z historického katalogu Ferrari"
      ],
      EN: [
        "3.0L V6 engine with 120° bank angle",
        "Integrated electric motor with 122 kW output",
        "Assetto Fiorano weight-reduction package",
        "Multimatic adaptive dampers optimized for track use",
        "Carbon fiber elements throughout interior and exterior",
        "Digital cockpit with haptic feedback",
        "Michelin Pilot Sport Cup 2R tires",
        "Special livery from the historical Ferrari catalog"
      ]
    },
    emotionalHeadline: { CZ: 'Budoucnost Maranella', EN: 'The future of Maranello' },
    story: { CZ: 'Nejnovější hybridní supersport.', EN: 'The latest hybrid supercar.' },
    specs: { engine: '3.0L V6 Hybrid', power: '830 HP', transmission: '8-speed DCT', fuel: 'Hybrid' },
    equipment: ["Assetto Fiorano", "Carbon Ceramic Brakes", "Telemetry", "Lifter"]
  },
  {
    id: 'bentley-continental-gt',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    year: 2023,
    bodyType: 'Coupe',
    inServiceFrom: '11/2023',
    price: '7 890 000 Kč',
    km: '2 500 km',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=100&w=2400',
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=100&w=2400'
    ],
    interiorImages: [],
    exteriorImages: [],
    engineCapacity: '5 950 ccm',
    powerKw: '485 kW',
    drivetrain: 'AWD',
    detailedDescription: {
      CZ: [
        "Motor W12 o objemu 6,0 litru s dvojitým přeplňováním",
        "Natáčení všech kol pro lepší ovladatelnost",
        "Interiér Mulliner Driving Specification s prošíváním kosočtverců",
        "Bentley Dynamic Ride (48V aktivní stabilizátory)",
        "Otočný displej Bentley Rotating Display",
        "Audio systém Naim pro Bentley s 18 reproduktory",
        "Paket Blackline pro exteriér",
        "Sedadla s masáží, chlazením a vyhříváním"
      ],
      EN: [
        "6.0L W12 twin-turbocharged engine",
        "All-wheel steering for enhanced maneuverability",
        "Mulliner Driving Specification with diamond quilting",
        "Bentley Dynamic Ride (48V active anti-roll bars)",
        "Bentley Rotating Display",
        "Naim for Bentley 18-speaker audio system",
        "Blackline specification for exterior",
        "Massaging, cooled, and heated seating"
      ]
    },
    emotionalHeadline: { CZ: 'Definice luxusu', EN: 'The definition of luxury' },
    story: { CZ: 'Ultimátní cestovní koráb.', EN: 'The ultimate grand tourer.' },
    specs: { engine: '6.0L W12 TSI', power: '659 HP', transmission: '8-speed DCT', fuel: 'Benzín' },
    equipment: ["Mulliner Spec", "Naim Audio", "Night Vision", "Rotating Display"]
  },
  {
    id: 'lamborghini-huracan',
    brand: 'Lamborghini',
    model: 'Huracán Tecnica',
    year: 2024,
    bodyType: 'Coupe',
    inServiceFrom: '02/2024',
    price: '8 100 000 Kč',
    km: '850 km',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=100&w=2400',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=100&w=2400'
    ],
    interiorImages: [],
    exteriorImages: [],
    engineCapacity: '5 204 ccm',
    powerKw: '470 kW',
    drivetrain: 'RWD',
    detailedDescription: {
      CZ: [
        "Atmosférický motor V10 o objemu 5,2 litru",
        "Specifický design zadního kapoty z uhlíkových vláken",
        "Systém LDVI (Lamborghini Dinamica Veicolo Integrata)",
        "Vylepšená aerodynamika s o 35 % vyšším přítlakem",
        "Brzdový systém CCB s optimalizovaným chlazením",
        "Lehká skořepinová sedadla s Alcantarou",
        "Systém zvedání přední nápravy (Lifter)",
        "Zadní náhon (RWD) pro puristický zážitek"
      ],
      EN: [
        "Naturally aspirated 5.2L V10 engine",
        "Specific rear carbon fiber engine hood design",
        "Lamborghini Dinamica Veicolo Integrata (LDVI) system",
        "Enhanced aerodynamics with 35% more downforce",
        "CCB braking system with optimized cooling",
        "Lightweight bucket seats in Alcantara",
        "Front axle lift system",
        "Rear-wheel drive (RWD) for a purist experience"
      ]
    },
    emotionalHeadline: { CZ: 'Atmosférický orchestr', EN: 'Naturally aspirated orchestra' },
    story: { CZ: 'Poslední evoluce motoru V10.', EN: 'The final evolution of the V10.' },
    specs: { engine: '5.2L V10', power: '640 HP', transmission: '7-speed LDF', fuel: 'Benzín' },
    equipment: ["Rear Wheel Steering", "Carbon Fiber Seats", "Ceramic Brakes"]
  },
  {
    id: 'mercedes-g63-amg',
    brand: 'Mercedes-Benz',
    model: 'G 63 AMG Magno',
    year: 2024,
    bodyType: 'SUV',
    inServiceFrom: '01/2024',
    price: '5 850 000 Kč',
    km: '500 km',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1600',
    images: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1600'
    ],
    interiorImages: [],
    exteriorImages: [],
    engineCapacity: '3 982 ccm',
    powerKw: '430 kW',
    drivetrain: '4x4',
    detailedDescription: {
      CZ: [
        "Ručně skládaný motor V8 Biturbo o výkonu 585 koní",
        "Matný lak Magno z programu G Manufaktur",
        "Interiér Superior Line s kůží Nappa",
        "Výfukový systém AMG Performance s klapkami",
        "22palcová kovaná kola AMG v černé barvě",
        "Audio systém Burmester Surround Sound",
        "Sada Night Package II (černé doplňky)",
        "Multibeam LED světlomety"
      ],
      EN: [
        "Handcrafted V8 Biturbo engine with 585 HP",
        "Magno matte finish from G Manufaktur program",
        "Superior Line interior with Nappa leather",
        "AMG Performance exhaust system with valves",
        "22-inch AMG forged wheels in black",
        "Burmester Surround Sound system",
        "Night Package II (black accents)",
        "Multibeam LED headlights"
      ]
    },
    emotionalHeadline: { CZ: 'Ikona terénu', EN: 'Icon of the road' },
    story: { CZ: 'Vůz v limitovaném provedení Magno.', EN: 'Vehicle in Magno limited edition.' },
    specs: { engine: '4.0L V8 Biturbo', power: '585 HP', transmission: 'AMG 9G', fuel: 'Benzín' },
    equipment: ["360 kamera", "Nappa kůže", "Burmester Audio", "Night Package"]
  },
  {
    id: 'bmw-m4-comp',
    brand: 'BMW',
    model: 'M4 Competition xDrive',
    year: 2024,
    bodyType: 'Coupe',
    inServiceFrom: '04/2024',
    price: '3 250 000 Kč',
    km: '1 500 km',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=100&w=2400',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=100&w=2400'
    ],
    interiorImages: [],
    exteriorImages: [],
    engineCapacity: '2 993 ccm',
    powerKw: '390 kW',
    drivetrain: '4x4',
    detailedDescription: {
      CZ: [
        "Šestiválcový motor M TwinPower Turbo o výkonu 530 k",
        "Inteligentní pohon všech kol M xDrive s možností 2WD",
        "Karbonová skořepinová sedadla M Carbon",
        "M Drive Professional včetně Drift Analyzeru",
        "BMW Laserlight s modrými akcenty",
        "Karbonový exteriérový paket M Carbon",
        "M Shadowline světlomety s černým podkladem",
        "Harman Kardon Surround Sound systém"
      ],
      EN: [
        "M TwinPower Turbo six-cylinder engine with 530 HP",
        "M xDrive intelligent AWD with 2WD mode",
        "M Carbon bucket seats",
        "M Drive Professional including Drift Analyzer",
        "BMW Laserlight with blue accents",
        "M Carbon exterior package",
        "M Shadowline headlights with black base",
        "Harman Kardon Surround Sound system"
      ]
    },
    emotionalHeadline: { CZ: 'Čirá radost', EN: 'Pure joy' },
    story: { CZ: 'Nová M4 s pohonem všech kol.', EN: 'New M4 with all-wheel drive.' },
    specs: { engine: '3.0L S58', power: '530 HP', transmission: '8-speed M', fuel: 'Benzín' },
    equipment: ["Carbon Pack", "Laserlight", "M Seats", "Adaptive Suspension"]
  }
];
