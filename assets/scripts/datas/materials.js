const masterDataMaterials = [
  {
    id: 1,
    name: "Sekam Padi Mentah",
    name_en: "Raw Rice Husk",
    name_id: "Sekam Padi Mentah",
    portion: 0,
    description: "Sekam padi mentah merupakan limbah penggilingan padi yang ringan, kaya silika, lambat terurai, dan sering digunakan untuk meningkatkan drainase serta aerasi media tanam karena struktur berporinya yang tinggi.",
    sifats: [
      { id: 1, name: "retention", value: 4 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 10 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 0.4, "unit": "percent" },
        { id: 2, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 0.3, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [
      { id: 1, "symbol": "SiO2", name: "Silikon Dioksida", name_en: "Silica", name_id: "Silikon Dioksida", value: 18, "unit": "%" }
    ],
    organic_components: [
      { id: 1, name: "Selulosa", name_en: "Cellulose", name_id: "Selulosa" },
      { id: 2, name: "Lignin", name_en: "Lignin", name_id: "Lignin" }
    ],
    kegunaan: [
      "Meningkatkan drainase dan aerasi media tanam",
      "Mengurangi pemadatan tanah",
      "Alternatif murah pengganti perlite"
    ],
    references: [
      { sumber: "Physical Properties and Chemical Composition of the Rice Husk and Dust, 2016", url: "http://www.orientjchem.org/vol32no6/physical-properties-and-chemical-composition-of-the-rice-husk-and-dust/" },
      { sumber: "Effects of Rice Husk and Rice Husk Charcoal on Soil Physicochemical Properties, 2017", url: "https://www.researchgate.net/publication/319860172_Effects_of_Rice_Husk_and_Rice_Husk_Charcoal_on_Soil_Physicochemical_Properties_Rice_Growth_and_Yield" }
    ]
  },
  {
    id: 2,
    name: "Sekam Padi Mentah (Fermentasi)",
    name_en: "Fermented Rice Husk",
    name_id: "Sekam Padi Mentah (Fermentasi)",
    portion: 0,
    description: "Sekam padi yang difermentasi dengan EM4 atau mikroba lokal untuk mengurangi silika bebas, meningkatkan kandungan hara organik, dan mempercepat dekomposisi sehingga lebih ramah bagi akar tanaman.",
    sifats: [
      { id: 1, name: "retention", value: 6 },
      { id: 2, name: "drainage", value: 7 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 6.0 },
      { id: 5, name: "cec", value: 20 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 1.2, "unit": "percent" },
        { id: 2, name: "Phosphorus", name_id: "Fosfor", "symbol": "P", value: 0.5, "unit": "percent" },
        { id: 3, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 0.8, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [
      { id: 1, "symbol": "SiO2", name: "Silikon Dioksida", name_en: "Silica", name_id: "Silikon Dioksida", value: 14, "unit": "%" }
    ],
    organic_components: [
      { id: 1, name: "Asam Humat", name_en: "Humic Acid", name_id: "Asam Humat" },
      { id: 2, name: "Asam Fulvat", name_en: "Fulvic Acid", name_id: "Asam Fulvat" }
    ],
    kegunaan: [
      "Meningkatkan populasi mikroba menguntungkan",
      "Sumber hara organik lambat lepas",
      "Memperbaiki struktur tanah liat"
    ],
    references: [
      { sumber: "Exploration of Rice Husk Compost as an Alternate Organic Manure, 2018", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5858427/" }
    ]
  },
  {
    id: 3,
    name: "Sekam Padi Mentah (Oven)",
    name_en: "Oven-Dried Rice Husk",
    name_id: "Sekam Padi Mentah (Oven)",
    portion: 0,
    description: "Sekam padi mentah yang dikeringkan oven untuk mengurangi kadar air hingga <10%, mencegah pertumbuhan jamur, dan meningkatkan stabilitas penyimpanan tanpa mengubah sifat dasar sekam mentah.",
    sifats: [
      { id: 1, name: "retention", value: 4 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 6.8 },
      { id: 5, name: "cec", value: 12 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 0.4, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [
      { id: 1, "symbol": "SiO2", name: "Silikon Dioksida", name_en: "Silica", name_id: "Silikon Dioksida", value: 19, "unit": "%" }
    ],
    organic_components: [
      { id: 1, name: "Selulosa", name_en: "Cellulose", name_id: "Selulosa" },
      { id: 2, name: "Lignin", name_en: "Lignin", name_id: "Lignin" }
    ],
    kegunaan: [
      "Mencegah jamur pada media tanam",
      "Drainase tinggi untuk tanaman epifit"
    ],
    references: [
      { sumber: "Rice Husk Research: From Environmental Pollutant to a Promising Source, 2021", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8348607/" }
    ]
  },
  {
    id: 4,
    name: "Arang Sekam Padi",
    name_en: "Rice Husk Charcoal",
    name_id: "Arang Sekam Padi",
    portion: 0,
    description: "Biochar dari pirolisis sekam padi, sangat porus, alkali, kaya silika, meningkatkan CEC dan retensi hara jangka panjang serta memperbaiki tanah asam.",
    sifats: [
      { id: 1, name: "retention", value: 7 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 10 },
      { id: 4, name: "ph", value: 8.5 },
      { id: 5, name: "cec", value: 30 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 0.6, "unit": "percent" },
        { id: 2, name: "Calcium", name_id: "Kalsium", "symbol": "Ca", value: 0.4, "unit": "percent" }
      ],
      mikro: [
        { id: 1, name: "Silicon", name_id: "Silikon", "symbol": "Si", value: 0.2, "unit": "percent" }
      ]
    },
    minerals: [
      { id: 1, "symbol": "SiO2", name: "Silikon Dioksida", name_en: "Silica", name_id: "Silikon Dioksida", value: 90, "unit": "%" }
    ],
    organic_components: [],
    kegunaan: [
      "Meningkatkan pH tanah asam",
      "Retensi hara jangka panjang",
      "Adsorpsi racun tanah",
      "Meningkatkan aerasi"
    ],
    references: [
      { sumber: "Review on Rice Husk Biochar as an Adsorbent, 2023", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10096505/" },
      { sumber: "Rice Husk Biochar for Rice Based Cropping System in Acid Soil, 2010", url: "https://www.researchgate.net/publication/41940835_Rice_Husk_Biochar_for_Rice_Based_Cropping_System_in_Acid_Soil_1_The_Characteristics_of_Rice_Husk_Biochar_and_Its_Influence_on_the_Properties_of_Acid_Sulfate_Soils_and_Rice_Growth_in_West_Kalimantan_In" }
    ]
  },
  {
    id: 5,
    name: "Humus Daun Bambu (Fermentasi)",
    name_en: "Fermented Bamboo Leaf Humus",
    name_id: "Humus Daun Bambu (Fermentasi)",
    portion: 0,
    description: "Humus hasil fermentasi daun bambu yang kaya bahan organik, meningkatkan struktur tanah, aktivitas mikroba, dan kesuburan organik.",
    sifats: [
      { id: 1, name: "retention", value: 8 },
      { id: 2, name: "drainage", value: 5 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 80 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 2.0, "unit": "percent" },
        { id: 2, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 1.5, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Bahan Humat", name_en: "Humic Substances", name_id: "Bahan Humat" }
    ],
    kegunaan: [
      "Meningkatkan kesuburan organik",
      "Memperbaiki struktur tanah liat"
    ],
    references: [
      { sumber: "Benefits of Using Compost in Your Garden, Planet Natural", url: "https://www.planetnatural.com/composting-101/soil-science/compost-soil/" }
    ]
  },
  {
    id: 6,
    name: "Humus Daun Kaliandra (Fermentasi)",
    name_en: "Fermented Calliandra Leaf Humus",
    name_id: "Humus Daun Kaliandra (Fermentasi)",
    portion: 0,
    description: "Humus dari daun kaliandra (tanaman legum) yang difermentasi, kaya nitrogen alami dan bahan humat.",
    sifats: [
      { id: 1, name: "retention", value: 8 },
      { id: 2, name: "drainage", value: 5 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 6.8 },
      { id: 5, name: "cec", value: 90 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 3.5, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Asam Humat", name_en: "Humic Acid", name_id: "Asam Humat" }
    ],
    kegunaan: [
      "Fiksasi nitrogen alami",
      "Pupuk hijau berkualitas tinggi"
    ],
    references: [
      { sumber: "Influence of Leaf Litter and Humus Composition on the Development of Black Spruce Seedlings, 2022", url: "https://www.mdpi.com/1999-4907/13/11/1832" }
    ]
  },
  {
    id: 7,
    name: "Humus Andam (Fermentasi)",
    name_en: "Fermented Andam Leaf Humus",
    name_id: "Humus Andam (Fermentasi)",
    portion: 0,
    description: "Humus fermentasi dari daun andam (tanaman lokal Indonesia), kaya bahan humat dan meningkatkan penyerapan hara.",
    sifats: [
      { id: 1, name: "retention", value: 8 },
      { id: 2, name: "drainage", value: 5 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 85 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 2.5, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Asam Fulvat", name_en: "Fulvic Acid", name_id: "Asam Fulvat" }
    ],
    kegunaan: [
      "Stimulasi pertumbuhan akar",
      "Meningkatkan penyerapan hara"
    ],
    references: [
      { sumber: "Humus: Why Is Humus Important?, Holganix", url: "https://www.holganix.com/blog/humus-why-is-humus-important-how-do-you-increase-soil-humus-content" }
    ]
  },
  {
    id: 8,
    name: "Akar Pakis Cacah (Oven)",
    name_en: "Oven-Dried Chopped Fern Root",
    name_id: "Akar Pakis Cacah (Oven)",
    portion: 0,
    description: "Akar pakis pohon yang dicacah dan dikeringkan oven, media klasik untuk anggrek epifit, sangat tahan lama dengan aerasi dan drainase optimal.",
    sifats: [
      { id: 1, name: "retention", value: 7 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 9 },
      { id: 4, name: "ph", value: 5.5 },
      { id: 5, name: "cec", value: 20 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Serat Organik", name_en: "Organic Fiber", name_id: "Serat Organik" }
    ],
    kegunaan: [
      "Media utama anggrek epifit",
      "Tahan lama 5-10 tahun",
      "Aerasi dan drainase tinggi"
    ],
    references: [
      { sumber: "Tree Fern Fibre – Soil Ninja", url: "https://www.soil.ninja/products/tree-fern-fibre" }
    ]
  },
  {
    id: 9,
    name: "Biji Kapuk (Oven)",
    name_en: "Oven-Dried Kapok Seed",
    name_id: "Biji Kapuk (Oven)",
    portion: 0,
    description: "Biji kapuk dari Ceiba pentandra yang dikeringkan oven, ringan, digunakan sebagai media aerasi alami mirip perlite.",
    sifats: [
      { id: 1, name: "retention", value: 3 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 6.0 },
      { id: 5, name: "cec", value: 5 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Serat Kapuk", name_en: "Kapok Fiber", name_id: "Serat Kapuk" }
    ],
    kegunaan: [
      "Media ringan untuk semai",
      "Pengganti perlite alami"
    ],
    references: [
      { sumber: "Ceiba pentandra - Wikipedia", url: "https://en.wikipedia.org/wiki/Ceiba_pentandra" }
    ]
  },
  {
    id: 10,
    name: "Cocopeat (Fermentasi)",
    name_en: "Fermented Cocopeat",
    name_id: "Cocopeat (Fermentasi)",
    portion: 0,
    description: "Cocopeat yang difermentasi/lavasi untuk menghilangkan garam berlebih, netral, retensi air sangat tinggi, cocok untuk hidroponik dan campuran media.",
    sifats: [
      { id: 1, name: "retention", value: 9 },
      { id: 2, name: "drainage", value: 6 },
      { id: 3, name: "porosity", value: 7 },
      { id: 4, name: "ph", value: 6.0 },
      { id: 5, name: "cec", value: 60 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 0.5, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Lignin", name_en: "Lignin", name_id: "Lignin" }
    ],
    kegunaan: [
      "Retensi air tinggi untuk hidroponik",
      "Bebas patogen setelah fermentasi"
    ],
    references: [
      { sumber: "Chemical and Physical Characteristics of Cocopeat-Based Media Mixtures, 2009", url: "https://thescipub.com/pdf/ajabssp.2009.63.71.pdf" }
    ]
  },
  {
    id: 11,
    name: "Cocofiber",
    name_en: "Coconut Coir Fiber",
    name_id: "Cocofiber",
    portion: 0,
    description: "Serat sabut kelapa kasar, meningkatkan struktur dan aerasi media tanam.",
    sifats: [
      { id: 1, name: "retention", value: 5 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 9 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 40 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Serat", name_en: "Fiber", name_id: "Serat" }
    ],
    kegunaan: [
      "Meningkatkan struktur media",
      "Drainase tinggi untuk akar sensitif"
    ],
    references: [
      { sumber: "What is coconut coir?, Herbs at Home", url: "https://herbsathome.co/what-is-coconut-coir/" }
    ]
  },
  {
    id: 12,
    name: "Perlite",
    name_en: "Perlite",
    name_id: "Perlite",
    portion: 0,
    description: "Batuan vulkanik yang dipanaskan hingga mengembang, inert, ringan, meningkatkan aerasi dan drainase.",
    sifats: [
      { id: 1, name: "retention", value: 2 },
      { id: 2, name: "drainage", value: 10 },
      { id: 3, name: "porosity", value: 10 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 1 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Aerasi tinggi",
      "Mencegah pemadatan media"
    ],
    references: [
      { sumber: "Assessment of perlite, expanded clay and pumice, ScienceDirect, 2019", url: "https://www.sciencedirect.com/science/article/abs/pii/S0304423819303358" }
    ]
  },
  {
    id: 13,
    name: "Pasir Malang",
    name_en: "Malang Sand",
    name_id: "Pasir Malang",
    portion: 0,
    description: "Pasir vulkanik dari Malang, berpori, drainase tinggi, sering digunakan pada media bonsai.",
    sifats: [
      { id: 1, name: "retention", value: 1 },
      { id: 2, name: "drainage", value: 10 },
      { id: 3, name: "porosity", value: 5 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 5 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [
      { id: 1, "symbol": "SiO2", name: "Silikon Dioksida", name_en: "Silica", name_id: "Silikon Dioksida", value: 70, "unit": "%" }
    ],
    organic_components: [],
    kegunaan: [
      "Drainase ekstrem untuk bonsai / kaktus"
    ],
    references: [
      { sumber: "Pumice vs Perlite: Which of the Two Is Better, Evergreen Seeds", url: "https://www.evergreenseeds.com/pumice-vs-perlite/" }
    ]
  },
  {
    id: 14,
    name: "Vermiculite",
    name_en: "Vermiculite",
    name_id: "Vermiculite",
    portion: 0,
    description: "Mineral yang dipanaskan mengembang, retensi air tinggi, CEC sedang, sering dicampur perlite untuk semai.",
    sifats: [
      { id: 1, name: "retention", value: 9 },
      { id: 2, name: "drainage", value: 4 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 100 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Magnesium", name_id: "Magnesium", "symbol": "Mg", value: 0.5, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Retensi air untuk semai / benih",
      "Campuran dengan perlite"
    ],
    references: [
      { sumber: "Vermiculite’s strong buffer capacity, PMC, 2013", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3835622/" }
    ]
  },
  {
    id: 15,
    name: "Zeolit",
    name_en: "Zeolite",
    name_id: "Zeolit",
    portion: 0,
    description: "Mineral vulkanik dengan CEC sangat tinggi, adsorpsi amonia, retensi hara luar biasa.",
    sifats: [
      { id: 1, name: "retention", value: 6 },
      { id: 2, name: "drainage", value: 7 },
      { id: 3, name: "porosity", value: 7 },
      { id: 4, name: "ph", value: 7.5 },
      { id: 5, name: "cec", value: 150 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [
      { id: 1, "symbol": "Al2O3", name: "Alumina", name_en: "Alumina", name_id: "Alumina", value: 12, "unit": "%" }
    ],
    organic_components: [],
    kegunaan: [
      "Retensi hara sangat tinggi",
      "Detoksifikasi tanah"
    ],
    references: [
      { sumber: "Zeolite as main substrate component, Bonsai Nut", url: "https://www.bonsainut.com/threads/zeolite-as-main-substrate-component.58069/" }
    ]
  },
  {
    id: 16,
    name: "Top Soil",
    name_en: "Topsoil",
    name_id: "Top Soil",
    portion: 0,
    description: "Lapisan tanah atas alami yang kaya bahan organik dan mikroba, basis media tanam umum.",
    sifats: [
      { id: 1, name: "retention", value: 7 },
      { id: 2, name: "drainage", value: 6 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 20 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 0.2, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Bahan Organik", name_en: "Organic Matter", name_id: "Bahan Organik" }
    ],
    kegunaan: [
      "Basis nutrisi alami",
      "Meningkatkan aktivitas biologis"
    ],
    references: []
  },
  {
    id: 17,
    name: "Pupuk Kandang Kambing (Fermentasi)",
    name_en: "Fermented Goat Manure",
    name_id: "Pupuk Kandang Kambing (Fermentasi)",
    portion: 0,
    description: "Pupuk kandang kambing yang difermentasi, kaya NPK, pH netral, meningkatkan kesuburan dan struktur tanah.",
    sifats: [
      { id: 1, name: "retention", value: 8 },
      { id: 2, name: "drainage", value: 5 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 7.5 },
      { id: 5, name: "cec", value: 50 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 2.0, "unit": "percent" },
        { id: 2, name: "Phosphorus", name_id: "Fosfor", "symbol": "P", value: 1.0, "unit": "percent" },
        { id: 3, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 2.5, "unit": "percent" }
      ],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Bahan Organik", name_en: "Organic Matter", name_id: "Bahan Organik" }
    ],
    kegunaan: [
      "Pupuk organik lengkap",
      "Meningkatkan aktivitas biologis tanah"
    ],
    references: [
      { sumber: "Goat Manure - an overview, ScienceDirect", url: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/goat-manure" }
    ]
  },
  {
    id: 18,
    name: "Vermicompost (Kascing)",
    name_en: "Vermicompost",
    name_id: "Vermicompost (Kascing)",
    portion: 0,
    description: "Kascing dari cacing tanah, kaya nutrisi, enzim, hormon tumbuh, dan mikroba menguntungkan.",
    sifats: [
      { id: 1, name: "retention", value: 8 },
      { id: 2, name: "drainage", value: 6 },
      { id: 3, name: "porosity", value: 7 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 100 }
    ],
    nutrients: {
      makro: [
        { id: 1, name: "Nitrogen", name_id: "Nitrogen", "symbol": "N", value: 2.0, "unit": "percent" },
        { id: 2, name: "Phosphorus", name_id: "Fosfor", "symbol": "P", value: 1.5, "unit": "percent" },
        { id: 3, name: "Potassium", name_id: "Kalium", "symbol": "K", value: 1.5, "unit": "percent" }
      ],
      mikro: [
        { id: 1, name: "Iron", name_id: "Besi", "symbol": "Fe", value: 0.2, "unit": "percent" },
        { id: 2, name: "Zinc", name_id: "Seng", "symbol": "Zn", value: 0.05, "unit": "percent" }
      ]
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Asam Humat", name_en: "Humic Acid", name_id: "Asam Humat" }
    ],
    kegunaan: [
      "Pupuk organik premium",
      "Meningkatkan resistensi penyakit"
    ],
    references: [
      { sumber: "Analysis of Micro and Macro Nutrient Levels in Compost and Vermicompost, Acta Scientific", url: "https://www.actascientific.com/ASNH/pdf/ASNH-05-0814.pdf" }
    ]
  },
  {
    id: 19,
    name: "Arang Kayu",
    name_en: "Wood Charcoal",
    name_id: "Arang Kayu",
    portion: 0,
    description: "Biochar dari kayu, pori tinggi, meningkatkan CEC dan sequestrasi karbon.",
    sifats: [
      { id: 1, name: "retention", value: 7 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 9 },
      { id: 4, name: "ph", value: 8.0 },
      { id: 5, name: "cec", value: 30 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Pembenah tanah jangka panjang",
      "Sequestrasi karbon"
    ],
    references: [
      { sumber: "Biochar Production and Characteristics, PMC", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10821463/" }
    ]
  },
  {
    id: 20,
    name: "Rockwool",
    name_en: "Rockwool",
    name_id: "Rockwool",
    portion: 0,
    description: "Serat batuan basalt inert, pori tinggi, digunakan luas pada hidroponik.",
    sifats: [
      { id: 1, name: "retention", value: 8 },
      { id: 2, name: "drainage", value: 7 },
      { id: 3, name: "porosity", value: 9 },
      { id: 4, name: "ph", value: 7.5 },
      { id: 5, name: "cec", value: 0 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Media hidroponik stabil",
      "Aerasi dan retensi seimbang"
    ],
    references: [
      { sumber: "Assessment of perlite, expanded clay and pumice, ScienceDirect", url: "https://www.sciencedirect.com/science/article/abs/pii/S0304423819303358" }
    ]
  },
  {
    id: 21,
    name: "Kerikil",
    name_en: "Gravel",
    name_id: "Kerikil",
    portion: 0,
    description: "Kerikil alami untuk lapisan drainase bawah pot atau hidroponik.",
    sifats: [
      { id: 1, name: "retention", value: 1 },
      { id: 2, name: "drainage", value: 10 },
      { id: 3, name: "porosity", value: 4 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 0 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Lapisan drainase bawah pot",
      "Mencegah genangan"
    ],
    references: []
  },
  {
    id: 22,
    name: "Pasir Sungai",
    name_en: "River Sand",
    name_id: "Pasir Sungai",
    portion: 0,
    description: "Pasir sungai bersih untuk meningkatkan drainase pada media tanam.",
    sifats: [
      { id: 1, name: "retention", value: 2 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 5 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 5 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [
      { id: 1, "symbol": "SiO2", name: "Silikon Dioksida", name_en: "Silica", name_id: "Silikon Dioksida", value: 80, "unit": "%" }
    ],
    organic_components: [],
    kegunaan: [
      "Meningkatkan drainase tanah liat"
    ],
    references: []
  },
  {
    id: 23,
    name: "Hydroton",
    name_en: "Hydroton",
    name_id: "Hydroton",
    portion: 0,
    description: "Clay pebbles yang dipanaskan, inert, drainase tinggi, populer di hidroponik.",
    sifats: [
      { id: 1, name: "retention", value: 4 },
      { id: 2, name: "drainage", value: 10 },
      { id: 3, name: "porosity", value: 10 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 10 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Media hidroponik / aquaponik",
      "Drainase dan aerasi ekstrem"
    ],
    references: [
      { sumber: "Assessment of perlite, expanded clay and pumice, ScienceDirect", url: "https://www.sciencedirect.com/science/article/abs/pii/S0304423819303358" }
    ]
  },
  {
    id: 24,
    name: "Spagnum Peat Moss",
    name_en: "Sphagnum Peat Moss",
    name_id: "Spagnum Peat Moss",
    portion: 0,
    description: "Peat moss dari lumut sphagnum yang terdekomposisi, asam, retensi air sangat tinggi, untuk tanaman acid-loving.",
    sifats: [
      { id: 1, name: "retention", value: 10 },
      { id: 2, name: "drainage", value: 3 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 4.0 },
      { id: 5, name: "cec", value: 120 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Bahan Humat", name_en: "Humic Substances", name_id: "Bahan Humat" }
    ],
    kegunaan: [
      "Media acid-loving plants",
      "Retensi air ekstrem"
    ],
    references: [
      { sumber: "Sphagnum Moss vs Peat Moss, Gardening Chores", url: "https://www.gardeningchores.com/sphagnum-moss-vs-peat-moss/" }
    ]
  },
  {
    id: 25,
    name: "Biochar",
    name_en: "Biochar",
    name_id: "Biochar",
    portion: 0,
    description: "Biochar umum dari berbagai biomassa, meningkatkan CEC, porositas, dan sequestrasi karbon.",
    sifats: [
      { id: 1, name: "retention", value: 7 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 9 },
      { id: 4, name: "ph", value: 8.0 },
      { id: 5, name: "cec", value: 30 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Pembenah tanah permanen",
      "Adsorpsi polutan"
    ],
    references: [
      { sumber: "Biochar Production and Characteristics, PMC", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10821463/" }
    ]
  },
  {
    id: 26,
    name: "Pumice",
    name_en: "Pumice",
    name_id: "Pumice",
    portion: 0,
    description: "Batuan vulkanik ringan berpori tinggi, drainase dan aerasi baik, tahan lama.",
    sifats: [
      { id: 1, name: "retention", value: 4 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 9 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 10 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Aerasi tinggi",
      "Tahan lama untuk bonsai"
    ],
    references: [
      { sumber: "Perlite vs Pumice, Ohio Tropics", url: "https://www.ohiotropics.com/2022/04/28/perlite-vs-pumice-pros-cons-of-both-in-potting-mix/" }
    ]
  },
  {
    id: 27,
    name: "Akadama",
    name_en: "Akadama",
    name_id: "Akadama",
    portion: 0,
    description: "Tanah liat vulkanik Jepang khusus bonsai, retensi air baik, CEC sedang, pecah seiring waktu.",
    sifats: [
      { id: 1, name: "retention", value: 6 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 7 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 30 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Media bonsai klasik",
      "Retensi hara sedang"
    ],
    references: [
      { sumber: "Akadama - Wikipedia", url: "https://en.wikipedia.org/wiki/Akadama" }
    ]
  },
  {
    id: 28,
    name: "Peat Moss",
    name_en: "Peat Moss",
    name_id: "Peat Moss",
    portion: 0,
    description: "Gambut dari lumut sphagnum, asam, retensi air tinggi, untuk tanaman acid-loving.",
    sifats: [
      { id: 1, name: "retention", value: 10 },
      { id: 2, name: "drainage", value: 3 },
      { id: 3, name: "porosity", value: 6 },
      { id: 4, name: "ph", value: 4.0 },
      { id: 5, name: "cec", value: 120 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Bahan Humat", name_en: "Humic Substances", name_id: "Bahan Humat" }
    ],
    kegunaan: [
      "Media acid-loving",
      "Retensi air ekstrem"
    ],
    references: [
      { sumber: "Sphagnum Peat Moss vs Sphagnum Moss, Sandia Seed", url: "https://www.sandiaseed.com/blogs/news/sphagnum-moss-vs-peat-moss" }
    ]
  },
  {
    id: 29,
    name: "Kulit Kayu Pinus",
    name_en: "Pine Bark",
    name_id: "Kulit Kayu Pinus",
    portion: 0,
    description: "Kulit kayu pinus kompos, meningkatkan aerasi, drainase, dan struktur media.",
    sifats: [
      { id: 1, name: "retention", value: 6 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 5.5 },
      { id: 5, name: "cec", value: 40 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Lignin", name_en: "Lignin", name_id: "Lignin" }
    ],
    kegunaan: [
      "Meningkatkan aerasi",
      "Media anggrek / bonsai"
    ],
    references: [
      { sumber: "Air Porosity and Water-Holding Ability of Media Components, Sun Gro", url: "https://www.sungro.com/air-porosity-and-water-holding-ability-of-media-components/" }
    ]
  },
  {
    id: 30,
    name: "Sphagnum Moss",
    name_en: "Sphagnum Moss",
    name_id: "Sphagnum Moss",
    portion: 0,
    description: "Lumut sphagnum hidup/kering, netral, retensi air tinggi, antibakteri alami.",
    sifats: [
      { id: 1, name: "retention", value: 10 },
      { id: 2, name: "drainage", value: 4 },
      { id: 3, name: "porosity", value: 7 },
      { id: 4, name: "ph", value: 6.0 },
      { id: 5, name: "cec", value: 80 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [
      { id: 1, name: "Polisakarida", name_en: "Polysaccharides", name_id: "Polisakarida" }
    ],
    kegunaan: [
      "Media anggrek / epifit",
      "Antibakteri alami"
    ],
    references: [
      { sumber: "Sphagnum Moss: What It Is and How to Use It, The Spruce", url: "https://www.thespruce.com/what-is-sphagnum-moss-5093678" }
    ]
  },
  {
    id: 31,
    name: "Hydrogel",
    name_en: "Hydrogel",
    name_id: "Hydrogel",
    portion: 0,
    description: "Polimer superabsorben, menahan air hingga ratusan kali beratnya.",
    sifats: [
      { id: 1, name: "retention", value: 10 },
      { id: 2, name: "drainage", value: 2 },
      { id: 3, name: "porosity", value: 3 },
      { id: 4, name: "ph", value: 7.0 },
      { id: 5, name: "cec", value: 0 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Mengurangi frekuensi penyiraman",
      "Cadangan air di tanah kering"
    ],
    references: []
  },
  {
    id: 32,
    name: "Kanuma Soil",
    name_en: "Kanuma Soil",
    name_id: "Kanuma Soil",
    portion: 0,
    description: "Tanah vulkanik asam Jepang untuk azalea dan tanaman acid-loving.",
    sifats: [
      { id: 1, name: "retention", value: 7 },
      { id: 2, name: "drainage", value: 8 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 4.5 },
      { id: 5, name: "cec", value: 25 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Media azalea / rhododendron",
      "pH asam alami"
    ],
    references: [
      { sumber: "Soil Matters: Exploring the Foundation of Bonsai Health, Bonsai Plaza", url: "https://www.bonsaiplaza.com/en/blogs/bonsai-care-guide/soil-matters-exploring-the-foundation-of-bonsai-he" }
    ]
  },
  {
    id: 33,
    name: "Keiseki Soil",
    name_en: "Keiseki Soil",
    name_id: "Keiseki Soil",
    portion: 0,
    description: "Tanah vulkanik Jepang mirip akadama, drainase baik untuk bonsai conifer.",
    sifats: [
      { id: 1, name: "retention", value: 5 },
      { id: 2, name: "drainage", value: 9 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 6.5 },
      { id: 5, name: "cec", value: 20 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Media conifer bonsai",
      "Drainase tinggi"
    ],
    references: []
  },
  {
    id: 34,
    name: "Kokudo Soil",
    name_en: "Kokudo Soil",
    name_id: "Kokudo Soil",
    portion: 0,
    description: "Tanah vulkanik Jepang keras, drainase sangat baik, untuk bonsai matang.",
    sifats: [
      { id: 1, name: "retention", value: 4 },
      { id: 2, name: "drainage", value: 10 },
      { id: 3, name: "porosity", value: 8 },
      { id: 4, name: "ph", value: 6.8 },
      { id: 5, name: "cec", value: 15 }
    ],
    nutrients: {
      makro: [],
      mikro: []
    },
    minerals: [],
    organic_components: [],
    kegunaan: [
      "Media bonsai dewasa",
      "Drainase ekstrem"
    ],
    references: []
  }
];