const masterDataSifats = [
  {
    id: 1,
    name: "retention",
    symbol: "retention",
    label: "Retensi",
    label_sub: "Retensi Air",
    style: "fa-tint",
    unit: "",
    description: "Kemampuan media mengalirkan air berlebih setelah penyiraman. Drainase yang baik mencegah genangan air dan busuk akar.",
    description_short: "Kemampuan media menahan air.",
    analysis: [
      {
        id: 1,
        cmd: "greater_than",
        value: 7,
        status: "warning",
        style: "fa-exclamation-triangle",
        title: "Retensi air tinggi.",
        title_desc: "Media ini memiliki kemampuan menahan air yang tinggi.",
        data: [
          "Media tetap lembab untuk waktu yang lama.",
          "Frekuensi penyiraman dapat dikurangi.",
          "Risiko pembusukan akar jika drainase tidak cukup."
        ]
      },
      {
        id: 2,
        cmd: "less_than",
        value: 3,
        status: "info",
        style: "fa-info-circle",
        title: "Retensi air rendah.",
        title_desc: "Media ini cepat kering setelah penyiraman.",
        data: [
          "Frekuensi penyiraman perlu lebih sering.",
          "Risiko dehidrasi pada tanaman.",
          "Nutrisi mudah tercuci keluar dari media."
        ]
      },
      {
        id: 3,
        cmd: "standard",
        value: null,
        status: "success",
        style: "fa-check-circle",
        title: "Retensi air optimal.",
        title_desc: "Media ini memiliki keseimbangan retensi air yang baik.",
        data: [
          "Media dapat menahan air cukup untuk beberapa hari.",
          "Akar mendapatkan oksigen yang cukup.",
          "Risiko pembusukan akar minimal."
        ]
      }
    ],
    pros_cons: {
      pros: [
        "Retensi air optimal untuk tanaman."
      ],
      cons: [
        "Retensi air tidak optimal untuk tanaman."
      ]
    },
    recommendation: [
      {
        id: 1,
        case: "greater_than",
        title_sub: "",
        data: []
      },
      {
        id: 2,
        case: "netral",
        title_sub: "",
        data: []
      },
      {
        id: 3,
        case: "less_than",
        title_sub: "Rekomendasi untuk Retensi Air Rendah :",
        data: [
          "Tambahkan bahan dengan retensi air tinggi seperti cocopeat atau vermiculite.",
          "Frekuensi penyiraman perlu lebih sering.",
          "Gunakan pot dengan drainase terbatas untuk mengurangi kehilangan air.",
          "Pertimbangkan penggunaan hidrogel untuk meningkatkan retensi air."
        ]
      }
    ]
  },
  {
    id: 2,
    name: "drainage",
    symbol: "drainage",
    label: "Drainase",
    label_sub: "Drainase",
    style: "fa-water",
    unit: "",
    description: "Kemampuan media mengalirkan air berlebih setelah penyiraman. Drainase yang baik mencegah genangan air dan busuk akar.",
    description_short: "Kemampuan media mengalirkan air.",
    analysis: [
      {
        id: 1,
        cmd: "greater_than",
        value: 7,
        status: "info",
        style: "fa-info-circle",
        title: "Drainase sangat cepat.",
        title_desc: "Media akan cepat kering setelah penyiraman.",
        data: [
          "Frekuensi penyiraman perlu sangat sering.",
          "Nutrisi mudah tercuci sebelum diserap akar.",
          "Media tidak stabil, mudah longsor."
        ]
      },
      {
        id: 2,
        cmd: "less_than",
        value: 3,
        status: "warning",
        style: "fa-exclamation-triangle",
        title: "Drainase rendah.",
        title_desc: "Air mungkin menggenang di dasar pot.",
        data: [
          "Risiko tinggi untuk pembusukan akar.",
          "Akar kekurangan oksigen.",
          "Garam mineral menumpuk di media."
        ]
      },
      {
        id: 3,
        cmd: "standard",
        value: null,
        status: "success",
        style: "fa-check-circle",
        title: "Drainase optimal.",
        title_desc: "Media ini memiliki drainase yang baik.",
        data: [
          "Air berlebih dapat mengalir dengan baik.",
          "Media tetap lembab tanpa tergenang.",
          "Akar mendapatkan aerasi yang cukup."
        ]
      }
    ],
    pros_cons: {
      pros: [
        "Drainase baik, mencegah genangan air."
      ],
      cons: [
        "Drainase perlu disesuaikan untuk tanaman."
      ]
    },
    recommendation: [
      {
        id: 1,
        case: "greater_than",
        title_sub: "",
        data: []
      },
      {
        id: 2,
        case: "netral",
        title_sub: "",
        data: []
      },
      {
        id: 3,
        case: "less_than",
        title_sub: "Rekomendasi untuk Drainase Rendah :",
        data: [
          "Tambahkan bahan dengan drainase tinggi seperti pasir malang atau perlit.",
          "Pastikan pot memiliki lubang drainase yang cukup.",
          "Gunakan lapisan drainase di dasar pot (kerikil, arang).",
          "Kurangi frekuensi penyiraman untuk mencegah genangan."
        ]
      }
    ]
  },
  {
    id: 3,
    name: "porosity",
    symbol: "porosity",
    label: "Porositas",
    label_sub: "Porositas",
    style: "fa-wind",
    unit: "",
    description: "Persentase ruang kosong dalam media yang dapat diisi air atau udara. Porositas tinggi = lebih banyak ruang untuk akar bernapas.",
    description_short: "Ruang udara dalam media.",
    analysis: [
      {
        id: 1,
        cmd: "greater_than",
        value: 8.5,
        status: "info",
        style: "fa-info-circle",
        title: "Porositas sangat tinggi.",
        title_desc: "Media mungkin terlalu ringan.",
        data: [
          "Media tidak dapat menopang tanaman dengan baik.",
          "Retensi air rendah, cepat kering.",
          "Nutrisi mudah tercuci."
        ]
      },
      {
        id: 2,
        cmd: "less_than",
        value: 5,
        status: "warning",
        style: "fa-exclamation-triangle",
        title: "Porositas rendah.",
        title_desc: "Media terlalu padat.",
        data: [
          "Media terlalu padat, menghambat perkembangan akar.",
          "Akar kekurangan oksigen untuk respirasi.",
          "Air tidak merata dalam media."
        ]
      },
      {
        id: 3,
        cmd: "standard",
        value: null,
        status: "success",
        style: "fa-check-circle",
        title: "Porositas optimal.",
        title_desc: "Media ini memiliki porositas yang baik.",
        data: [
          "Ruang udara cukup untuk respirasi akar.",
          "Media ringan namun stabil.",
          "Air dan nutrisi tersebar merata."
        ]
      }
    ],
    pros_cons: {
      pros: [
        "Porositas ideal untuk aerasi akar."
      ],
      cons: [
        "Porositas tidak ideal untuk aerasi akar."
      ]
    },
    recommendation: [
      {
        id: 1,
        case: "greater_than",
        title_sub: "",
        data: []
      },
      {
        id: 2,
        case: "netral",
        title_sub: "",
        data: []
      },
      {
        id: 3,
        case: "less_than",
        title_sub: "",
        data: []
      }
    ]
  },
  {
    id: 4,
    name: "ph",
    symbol: "ph",
    label: "pH",
    label_sub: "Tingkat Keasaman (pH)",
    style: "fa-flask",
    unit: "ph",
    description: "Tingkat keasaman atau kebasaan media. pH mempengaruhi ketersediaan nutrisi untuk tanaman.",
    description_short: "",
    analysis: [
      {
        id: 1,
        cmd: "greater_than",
        value: 7.5,
        status: "warning",
        style: "fa-exclamation-triangle",
        title: "pH terlalu basa.",
        title_desc: "pH optimal untuk kebanyakan tanaman adalah 5.5-6.5.",
        data: [
          "Ketersediaan besi, mangan, seng, dan tembaga menurun.",
          "Fosfor terikat dengan kalsium menjadi tidak tersedia.",
          "Beberapa nutrisi mikro menjadi tidak dapat diserap."
        ]
      },
      {
        id: 2,
        cmd: "less_than",
        value: 5.0,
        status: "warning",
        style: "fa-exclamation-triangle",
        title: "pH terlalu asam.",
        title_desc: "pH optimal untuk kebanyakan tanaman adalah 5.5-6.5.",
        data: [
          "Toksisitas aluminium dan mangan meningkat.",
          "Ketersediaan fosfor, kalsium, dan magnesium menurun.",
          "Aktivitas mikroorganisme menguntungkan terhambat."
        ]
      },
      {
        id: 3,
        cmd: "standard",
        value: "5.5 & 6.5",
        status: "success",
        style: "fa-check-circle",
        title: "pH optimal untuk tanaman.",
        title_desc: "Sesuai untuk penyerapan nutrisi maksimal.",
        data: [
          "Semua nutrisi makro dan mikro tersedia optimal.",
          "Aktivitas mikroorganisme menguntungkan maksimal.",
          "Toksisitas logam berat minimal."
        ]
      },
      {
        id: 4,
        cmd: "standard_acceptable",
        value: null,
        status: "success",
        style: "fa-info-circle",
        title: "pH dalam batas dapat diterima.",
        title_desc: "Tetapi lebih baik dioptimalkan ke rentang 5.5-6.5.",
        data: []
      }
    ],
    pros_cons: {
      pros: [
        "pH optimal untuk penyerapan nutrisi."
      ],
      cons: [
        "pH perlu disesuaikan untuk penyerapan nutrisi optimal."
      ]
    },
    recommendation: [
      {
        id: 1,
        case: "greater_than",
        title_sub: "Rekomendasi untuk pH Basa :",
        data: [
          "Tambahkan belerang atau bahan organik asam untuk menurunkan pH.",
          "Gunakan pupuk yang bersifat asam seperti amonium sulfat.",
          "Pertimbangkan untuk menambahkan gambut atau bahan organik asam lainnya.",
          "Pantau pH secara berkala dan sesuaikan dengan kebutuhan tanaman."
        ]
      },
      {
        id: 2,
        case: "netral",
        title_sub: "",
        data: []
      },
      {
        id: 3,
        case: "less_than",
        title_sub: "Rekomendasi untuk pH Asam :",
        data: [
          "Tambahkan kapur dolomit untuk menaikkan pH.",
          "Kurangi bahan organik yang bersifat asam seperti gambut.",
          "Pertimbangkan untuk menambahkan arang sekam yang bersifat basa.",
          "Pantau pH secara berkala dan sesuaikan dengan kebutuhan tanaman."
        ]
      }
    ]
  },
  {
    id: 5,
    name: "cec",
    symbol: "cec",
    label: "CEC",
    label_sub: "Kapasitas Tukar Kation (CEC)",
    style: "fa-exchange-alt",
    unit: "meq/100g",
    description: "Kemampuan media menahan dan melepaskan kation nutrisi (K, Ca, Mg, NH4). CEC tinggi = kemampuan menyimpan nutrisi lebih baik.",
    description_short: "",
    analysis: [
      {
        id: 1,
        cmd: "greater_than",
        value: 50,
        status: "info",
        style: "fa-info-circle",
        title: "CEC tinggi.",
        title_desc: "Media dapat menyimpan banyak nutrisi.",
        data: [
          "Nutrisi tersimpan dengan baik dalam media.",
          "Frekuensi pemupukan dapat dikurangi.",
          "Risiko pencucian nutrisi minimal."
        ]
      },
      {
        id: 2,
        cmd: "less_than",
        value: 10,
        status: "warning",
        style: "fa-exclamation-triangle",
        title: "CEC rendah.",
        title_desc: "Kemampuan menyimpan nutrisi terbatas.",
        data: [
          "Kemampuan menyimpan nutrisi sangat terbatas.",
          "Pemupukan perlu dilakukan lebih sering dengan dosis rendah.",
          "Nutrisi mudah tercuci oleh air penyiraman."
        ]
      },
      {
        id: 3,
        cmd: "standard",
        value: "20 && 40",
        status: "success",
        style: "fa-check-circle",
        title: "CEC optimal.",
        title_desc: "Media ini memiliki kemampuan menyimpan nutrisi yang baik.",
        data: [
          "Kemampuan menyimpan nutrisi cukup untuk 2-4 minggu.",
          "Nutrisi tersedia secara bertahap sesuai kebutuhan tanaman.",
          "Risiko defisiensi atau kelebihan nutrisi rendah."
        ]
      },
      {
        id: 4,
        cmd: "standard_acceptable",
        value: null,
        status: "primary",
        style: "fa-info-circle",
        title: "CEC dalam batas dapat diterima.",
        title_desc: "Tetapi lebih baik dioptimalkan ke rentang 20-40 meq/100g.",
        data: []
      }
    ],
    pros_cons: {
      pros: [
        "Kemampuan menyimpan nutrisi cukup."
      ],
      cons: [
        "Kemampuan menyimpan nutrisi perlu dioptimalkan."
      ]
    },
    recommendation: [
      {
        id: 1,
        case: "greater_than",
        title_sub: "",
        data: []
      },
      {
        id: 2,
        case: "netral",
        title_sub: "",
        data: []
      },
      {
        id: 3,
        case: "less_than",
        title_sub: "Rekomendasi untuk CEC Rendah :",
        data: [
          "Tambahkan bahan dengan CEC tinggi seperti vermiculite, zeolit, atau biochar.",
          "Pupuk lebih sering dengan dosis rendah untuk mengkompensasi pencucian nutrisi.",
          "Pertimbangkan penggunaan pupuk slow-release.",
          "Tambahkan bahan organik untuk meningkatkan kapasitas menahan nutrisi."
        ]
      }
    ]
  }
];