$(document).ready(function() {
    // Data bahan baku dari file JSON yang diberikan
    const defaultMaterials = [
        { id: 1, name: "Sekam Padi Mentah", portion: 0, retention: 32.0, drainage: 68.0, porosity: 76.0, ph: 6.7, cec: 8.5, nutrient_N_percent: 0.50, nutrient_P_percent: 0.08, nutrient_K_percent: 0.15, nutrient_Ca_percent: 0.10, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.06, nutrient_Fe_ppm: 180, nutrient_Mn_ppm: 750, nutrient_Zn_ppm: 12, nutrient_Cu_ppm: 4, nutrient_B_ppm: 7, nutrient_Si_percent: 12.5, nutrient_Mo_ppm: 0.2, description: "Kulit biji padi tanpa pengolahan. Sangat ringan dengan bulk density 0.09-0.15 g/cm³. Berfungsi utama untuk meningkatkan porositas dan aerasi. Rasio C/N tinggi (50-60:1) sehingga lambat terdekomposisi. Retensi air rendah namun drainase sangat baik. Mengandung silika tinggi (SiO2 87-97%) yang bermanfaat untuk kekuatan dinding sel tanaman dan resistensi terhadap cekaman biotik/abiotik." },
        { id: 2, name: "Sekam Padi Mentah (Fermentasi)", portion: 0, retention: 48.0, drainage: 52.0, porosity: 78.0, ph: 6.4, cec: 16.5, nutrient_N_percent: 0.85, nutrient_P_percent: 0.18, nutrient_K_percent: 0.35, nutrient_Ca_percent: 0.22, nutrient_Mg_percent: 0.18, nutrient_S_percent: 0.12, nutrient_Fe_ppm: 280, nutrient_Mn_ppm: 820, nutrient_Zn_ppm: 25, nutrient_Cu_ppm: 8, nutrient_B_ppm: 12, nutrient_Si_percent: 11.2, nutrient_Mo_ppm: 0.5, description: "Sekam mentah yang melalui dekomposisi aerobik/anaerobik dengan mikroorganisme selama 4-8 minggu. Proses fermentasi menurunkan rasio C/N menjadi 25-35:1, meningkatkan bioavailabilitas nutrisi, dan menstabilkan bahan organik. Mengandung asam organik, enzim, dan metabolit mikroba yang bermanfaat. Struktur fisik lebih stabil dibanding sekam mentah. Silika tetap tinggi dengan bioavailabilitas lebih baik." },
        { id: 3, name: "Sekam Padi Mentah (Oven)", portion: 0, retention: 35.0, drainage: 65.0, porosity: 77.0, ph: 6.9, cec: 9.0, nutrient_N_percent: 0.48, nutrient_P_percent: 0.08, nutrient_K_percent: 0.14, nutrient_Ca_percent: 0.10, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.06, nutrient_Fe_ppm: 175, nutrient_Mn_ppm: 745, nutrient_Zn_ppm: 12, nutrient_Cu_ppm: 4, nutrient_B_ppm: 7, nutrient_Si_percent: 12.8, nutrient_Mo_ppm: 0.2, description: "Sekam mentah yang disterilisasi melalui pemanasan kering 80-120°C selama 2-4 jam. Proses ini efektif membunuh patogen fungal (jamur), bakteri, dan telur nematoda tanpa mengubah komposisi kimia secara signifikan. Struktur fisik dan kandungan silika tetap terjaga. Cocok untuk persemaian dan kultur jaringan yang memerlukan media steril." },
        { id: 4, name: "Arang Sekam Padi", portion: 0, retention: 52.0, drainage: 48.0, porosity: 83.0, ph: 8.2, cec: 42.0, nutrient_N_percent: 0.32, nutrient_P_percent: 0.15, nutrient_K_percent: 0.63, nutrient_Ca_percent: 0.28, nutrient_Mg_percent: 0.18, nutrient_S_percent: 0.08, nutrient_Fe_ppm: 420, nutrient_Mn_ppm: 380, nutrient_Zn_ppm: 35, nutrient_Cu_ppm: 12, nutrient_B_ppm: 18, nutrient_Si_percent: 16.8, nutrient_Mo_ppm: 0.8, description: "Biochar dari pirolisis sekam pada suhu 350-550°C dalam kondisi oksigen terbatas. Memiliki luas permukaan spesifik 150-300 m²/g dengan struktur microporous. KTK tinggi karena gugus fungsi permukaan (karboksil, hidroksil, fenol). pH alkalis karena kandungan abu dan karbonat. Sangat stabil terhadap dekomposisi (waktu paruh >100 tahun). Silika terkonsentrasi menjadi SiO2 kristal. Dapat menyerap dan melepas nutrisi secara lambat." },
        { id: 5, name: "Humus Daun Bambu (Fermentasi)", portion: 0, retention: 65.0, drainage: 35.0, porosity: 68.0, ph: 6.0, cec: 28.0, nutrient_N_percent: 1.45, nutrient_P_percent: 0.28, nutrient_K_percent: 0.85, nutrient_Ca_percent: 1.15, nutrient_Mg_percent: 0.52, nutrient_S_percent: 0.18, nutrient_Fe_ppm: 1200, nutrient_Mn_ppm: 450, nutrient_Zn_ppm: 55, nutrient_Cu_ppm: 18, nutrient_B_ppm: 28, nutrient_Si_percent: 4.8, nutrient_Mo_ppm: 1.5, description: "Serasah daun bambu (Bambusa spp., Phyllostachys spp.) yang terdekomposisi sempurna (humifikasi) selama 6-12 bulan. Bambu adalah akumulator silika dengan kandungan 4-8% berat kering. Rasio C/N matang 15-20:1. Mengandung lignin terdekomposisi yang membentuk humus stabil. Tekstur remah, struktur granular, kemampuan menahan air baik. Aktivitas mikroba tinggi. Silika dalam bentuk phytoliths dan amorphous yang bioavailable." },
        { id: 6, name: "Humus Daun Kaliandra (Fermentasi)", portion: 0, retention: 68.0, drainage: 32.0, porosity: 72.0, ph: 5.9, cec: 32.0, nutrient_N_percent: 2.65, nutrient_P_percent: 0.42, nutrient_K_percent: 1.15, nutrient_Ca_percent: 1.35, nutrient_Mg_percent: 0.65, nutrient_S_percent: 0.28, nutrient_Fe_ppm: 1350, nutrient_Mn_ppm: 480, nutrient_Zn_ppm: 68, nutrient_Cu_ppm: 22, nutrient_B_ppm: 35, nutrient_Si_percent: 1.2, nutrient_Mo_ppm: 2.8, description: "Kompos matang dari Calliandra calothyrsus, legum pohon dengan kandungan protein daun 20-25%. Sebagai leguminosa, kaya nitrogen hasil fiksasi N₂ atmosfer oleh bakteri Rhizobium. Rasio C/N rendah (12-18:1) sehingga cepat mineralisasi. Mengandung alkaloid dan tanin rendah pasca dekomposisi. Molibdenum tinggi karena esensial untuk enzim nitrogenase dalam fiksasi nitrogen. Tekstur halus, berwarna coklat gelap hingga hitam." },
        { id: 7, name: "Humus Andam (Fermentasi)", portion: 0, retention: 67.0, drainage: 33.0, porosity: 71.0, ph: 5.5, cec: 34.0, nutrient_N_percent: 1.62, nutrient_P_percent: 0.22, nutrient_K_percent: 0.68, nutrient_Ca_percent: 0.92, nutrient_Mg_percent: 0.45, nutrient_S_percent: 0.16, nutrient_Fe_ppm: 1050, nutrient_Mn_ppm: 320, nutrient_Zn_ppm: 45, nutrient_Cu_ppm: 14, nutrient_B_ppm: 22, nutrient_Si_percent: 3.5, nutrient_Mo_ppm: 1.2, description: "Humus dari paku resam (Gleichenia linearis/Dicranopteris linearis), tumbuhan pioner di tanah masam. Serasah kaya akan lignin dan selulosa dengan rasio C/N awal tinggi (40-60:1), setelah dekomposisi sempurna menjadi 18-25:1. Mengandung senyawa fenolik dan tanin yang memberikan sifat asam. Struktur humus sangat gembur dan aerasi baik. Kandungan silika sedang dari akumulasi phytoliths. Cocok untuk tanaman acidophilic." },
        { id: 8, name: "Akar Pakis Cacah (Oven)", portion: 0, retention: 55.0, drainage: 45.0, porosity: 73.0, ph: 5.8, cec: 18.0, nutrient_N_percent: 0.35, nutrient_P_percent: 0.08, nutrient_K_percent: 0.42, nutrient_Ca_percent: 0.15, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.06, nutrient_Fe_ppm: 180, nutrient_Mn_ppm: 65, nutrient_Zn_ppm: 12, nutrient_Cu_ppm: 5, nutrient_B_ppm: 6, nutrient_Si_percent: 1.8, nutrient_Mo_ppm: 0.6, description: "Potongan rizoma dan akar adventif pakis pohon (Cyathea/Dicksonia) yang disterilisasi. Struktur anatomi unik dengan jaringan aerenkim dan sklerenkim yang memberikan kekuatan dan porositas. Rasio C/N tinggi (>50:1) membuat sangat lambat terdekomposisi (>5 tahun). Kemampuan kapiler untuk menahan dan mendistribusikan air secara merata. Sterilisasi oven mencegah propagasi spora pakis. Sifat asam lemah, cocok untuk epifit seperti anggrek." },
        { id: 9, name: "Biji Kapuk / Klenteng (Oven)", portion: 0, retention: 28.0, drainage: 72.0, porosity: 52.0, ph: 6.3, cec: 12.0, nutrient_N_percent: 0.95, nutrient_P_percent: 0.38, nutrient_K_percent: 0.58, nutrient_Ca_percent: 0.28, nutrient_Mg_percent: 0.22, nutrient_S_percent: 0.15, nutrient_Fe_ppm: 65, nutrient_Mn_ppm: 28, nutrient_Zn_ppm: 18, nutrient_Cu_ppm: 7, nutrient_B_ppm: 12, nutrient_Si_percent: 0.5, nutrient_Mo_ppm: 0.4, description: "Biji Ceiba pentandra yang disterilisasi. Ukuran 4-8 mm, berbentuk oval dengan kulit keras. Fungsi utama sebagai agregat untuk meningkatkan drainase dan mencegah pemadatan. Kandungan minyak nabati 20-25% yang perlahan terdekomposisi menjadi asam lemak. Protein 15-20% yang melepas nitrogen secara lambat. Sterilisasi menghilangkan viabilitas benih dan potensi patogen. Tahan lama dalam media (2-3 tahun)." },
        { id: 10, name: "Cocopeat (Fermentasi)", portion: 0, retention: 78.0, drainage: 22.0, porosity: 93.0, ph: 5.8, cec: 38.0, nutrient_N_percent: 0.62, nutrient_P_percent: 0.12, nutrient_K_percent: 1.85, nutrient_Ca_percent: 0.52, nutrient_Mg_percent: 0.38, nutrient_S_percent: 0.15, nutrient_Fe_ppm: 95, nutrient_Mn_ppm: 22, nutrient_Zn_ppm: 10, nutrient_Cu_ppm: 8, nutrient_B_ppm: 6, nutrient_Si_percent: 2.8, nutrient_Mo_ppm: 0.8, description: "Mesokarp sabut kelapa yang digiling halus dan difermentasi 3-6 bulan untuk mengurangi tanin, polifenol, dan EC tinggi. Daya serap air 8-10 kali berat kering. Struktur lignoselulosa dengan rasio C/N 80-120:1 membuat sangat lambat terdekomposisi. Kandungan K tinggi namun Na dan Cl harus <500 ppm melalui washing/buffering. Porositas udara 10-15%, air tersedia 60-70%. pH buffering capacity baik. Perlu supplementasi Ca-Mg untuk menyeimbangkan K tinggi." },
        { id: 11, name: "Cocofiber", portion: 0, retention: 40.0, drainage: 60.0, porosity: 78.0, ph: 6.0, cec: 22.0, nutrient_N_percent: 0.28, nutrient_P_percent: 0.08, nutrient_K_percent: 1.15, nutrient_Ca_percent: 0.25, nutrient_Mg_percent: 0.18, nutrient_S_percent: 0.08, nutrient_Fe_ppm: 52, nutrient_Mn_ppm: 15, nutrient_Zn_ppm: 7, nutrient_Cu_ppm: 6, nutrient_B_ppm: 4, nutrient_Si_percent: 2.2, nutrient_Mo_ppm: 0.5, description: "Serat kasar dari sabut kelapa dengan panjang 5-30 cm. Komposisi: lignin 45%, selulosa 30%, hemiselulosa 20%. Diameter serat 100-450 μm menciptakan makropori untuk aerasi. Tidak menyerap air sebanyak cocopeat, fungsi utama structural support dan air space. Bulk density 0.06-0.12 g/cm³. Rasio C/N sangat tinggi (>100:1) sehingga dekomposisi sangat lambat (>3 tahun). Air filled porosity rendah (20-30%), udara 50-60%." },
        { id: 12, name: "Perlite", portion: 0, retention: 32.0, drainage: 68.0, porosity: 88.0, ph: 7.0, cec: 1.5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, nutrient_Si_percent: 73.0, nutrient_Mo_ppm: 0, description: "Gelas vulkanik aluminosilikat (SiO2 70-75%, Al2O3 12-15%) yang dipanaskan 870-1100°C hingga ekspansi 4-20 kali volume. Struktur closed-cell dengan bulk density 0.03-0.15 g/cm³ (grade dependent). Partikel size 1-6 mm. Steril, pH netral, chemically inert. Total porosity tinggi namun sebagian besar udara (air-filled 60-70%). Konduktivitas termal rendah, isolasi akar. Tidak mengandung nutrisi namun silika surface dapat adsorpsi ion minimal. Sangat stabil, tidak terdekomposisi." },
        { id: 13, name: "Pasir Malang", portion: 0, retention: 22.0, drainage: 78.0, porosity: 48.0, ph: 6.8, cec: 5.0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.15, nutrient_Ca_percent: 0.35, nutrient_Mg_percent: 0.18, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 850, nutrient_Mn_ppm: 125, nutrient_Zn_ppm: 8, nutrient_Cu_ppm: 3, nutrient_B_ppm: 2, nutrient_Si_percent: 48.5, nutrient_Mo_ppm: 0.3, description: "Pasir vulkanik andesitik dari endapan lahar/tephra Gunung Bromo-Semeru. Komposisi: plagioklas, piroksen, magnetit, gelas vulkanik. Ukuran butir 0.5-2 mm (pasir sedang-kasar). Bentuk angular meningkatkan interlocking dan stabilitas struktur. Bulk density 1.4-1.6 g/cm³ memberikan anchorage akar. Drainase sangat cepat, WHC rendah. Mengandung mineral weatherable yang lambat melepas Ca, Mg, Fe, K. Perlu pencucian untuk menurunkan pH awal dan salt." },
        { id: 14, name: "Vermiculite", portion: 0, retention: 68.0, drainage: 32.0, porosity: 86.0, ph: 6.8, cec: 110.0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 3.8, nutrient_Ca_percent: 1.4, nutrient_Mg_percent: 6.5, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 350, nutrient_Mn_ppm: 35, nutrient_Zn_ppm: 8, nutrient_Cu_ppm: 3, nutrient_B_ppm: 3, nutrient_Si_percent: 42.0, nutrient_Mo_ppm: 1.2, description: "Mineral phyllosilicate (Mg,Fe,Al)3(Al,Si)4O10(OH)2·4H2O yang di-exfoliate pada 870-980°C, ekspansi hingga 8-20 kali. Struktur accordion-like layer dengan interlayer space menyerap air dan kation. KTK sangat tinggi (100-150 cmol/kg) karena isomorfik substitusi dan tepi partikel. WHC 200-300% volume. Bulk density 0.06-0.15 g/cm³. Melepas K-Mg secara lambat dari weathering. Buffer pH baik. Grade 2-4 (medium-coarse) optimal untuk media tanam." },
        { id: 15, name: "Zeolit", portion: 0, retention: 42.0, drainage: 58.0, porosity: 62.0, ph: 7.2, cec: 135.0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 2.5, nutrient_Ca_percent: 3.2, nutrient_Mg_percent: 0.8, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 180, nutrient_Mn_ppm: 25, nutrient_Zn_ppm: 8, nutrient_Cu_ppm: 2, nutrient_B_ppm: 2, nutrient_Si_percent: 65.5, nutrient_Mo_ppm: 1.5, description: "Tektosilikat kristal microporous (klinoptilolit, mordenit) dengan framework 3D dan channel/cavity diameter 0.3-1.0 nm. Formula umum: Mx/n[(AlO2)x(SiO2)y]·zH2O. KTK 120-180 cmol/kg dari exchangeable cations (Ca²⁺, Mg²⁺, K⁺, Na⁺). Selektivitas tinggi untuk NH4⁺ mencegah N-leaching. Dapat menyerap hingga 60% berat air dalam micropores. Melepas nutrisi slow-release melalui ion exchange. Bulk density 0.8-1.1 g/cm³. Efektif sebagai amendment 5-15% volume." },
        { id: 16, name: "Top Soil", portion: 0, retention: 48.0, drainage: 52.0, porosity: 52.0, ph: 6.2, cec: 18.0, nutrient_N_percent: 0.22, nutrient_P_percent: 0.12, nutrient_K_percent: 0.35, nutrient_Ca_percent: 0.85, nutrient_Mg_percent: 0.32, nutrient_S_percent: 0.08, nutrient_Fe_ppm: 650, nutrient_Mn_ppm: 145, nutrient_Zn_ppm: 42, nutrient_Cu_ppm: 15, nutrient_B_ppm: 18, nutrient_Si_percent: 28.5, nutrient_Mo_ppm: 2.2, description: "Horizon A tanah mineral (0-20 cm kedalaman) tipe lempung berpasir (sandy loam) dengan komposisi: 50-70% pasir, 10-25% lempung, 10-25% debu. Bahan organik 2-5%. Struktur granular hingga subangular blocky. Bulk density 1.1-1.4 g/cm³. Mengandung kompleks mineral-humus, biota tanah (bakteri 10⁸-10⁹, fungi 10⁵-10⁶, aktinomisetes per gram), dan nutrisi residual. Permeabilitas moderat 1-5 cm/jam. Sifat sangat bervariasi: pH, tekstur, kesuburan tergantung origin dan manajemen." },
        { id: 17, name: "Pupuk Kandang Kambing (Fermentasi)", portion: 0, retention: 62.0, drainage: 38.0, porosity: 67.0, ph: 7.5, cec: 52.0, nutrient_N_percent: 2.1, nutrient_P_percent: 0.65, nutrient_K_percent: 1.8, nutrient_Ca_percent: 1.75, nutrient_Mg_percent: 0.58, nutrient_S_percent: 0.42, nutrient_Fe_ppm: 1650, nutrient_Mn_ppm: 380, nutrient_Zn_ppm: 215, nutrient_Cu_ppm: 45, nutrient_B_ppm: 48, nutrient_Si_percent: 0.8, nutrient_Mo_ppm: 3.5, description: "Kotoran kambing terkompos sempurna (curing 2-4 bulan). Bentuk pellet kecil 0.5-1 cm, kering (MC <30%), C/N ratio 15-20:1. Kandungan bahan organik 35-45%. Mengandung N-organik (60%), NH4-N (20%), NO3-N (20%). P dalam bentuk organik dan apatit, K mudah larut. Populasi mikroba: Bacillus, Actinomycetes, Trichoderma, PGPR. Mengandung asam humat 8-12%, fulvat 4-6%. Molibdenum tinggi karena konsentrasi dari pakan leguminosa. pH alkalis dari urea terdekomposisi." },
        { id: 18, name: "Vermicompost (Kascing)", portion: 0, retention: 72.0, drainage: 28.0, porosity: 76.0, ph: 7.0, cec: 75.0, nutrient_N_percent: 1.55, nutrient_P_percent: 1.05, nutrient_K_percent: 1.35, nutrient_Ca_percent: 2.25, nutrient_Mg_percent: 0.68, nutrient_S_percent: 0.52, nutrient_Fe_ppm: 2200, nutrient_Mn_ppm: 520, nutrient_Zn_ppm: 265, nutrient_Cu_ppm: 55, nutrient_B_ppm: 35, nutrient_Si_percent: 1.5, nutrient_Mo_ppm: 4.2, description: "Kotoran cacing tanah (Lumbricus rubellus, Eisenia fetida) hasil vermikomposting 60-90 hari. Proses pencernaan cacing menghasilkan: agregat stabil (water stable aggregates >80%), humus terpolimerisasi, mucus coating. Mengandung NPK terlarut tinggi, enzim (protease, lipase, cellulase, chitinase), hormon pertumbuhan (IAA, GA, cytokinin), asam humat 15-20%, asam fulvat 8-12%. Populasi mikroba 10¹⁰-10¹¹ CFU/g. KTK tinggi dari kompleks organo-mineral. Struktur granular <2mm, tekstur halus seperti kopi bubuk. Bioavailabilitas nutrisi sangat tinggi." },
        { id: 19, name: "Arang Kayu", portion: 0, retention: 28.0, drainage: 72.0, porosity: 82.0, ph: 8.8, cec: 25.0, nutrient_N_percent: 0.15, nutrient_P_percent: 0.08, nutrient_K_percent: 0.95, nutrient_Ca_percent: 0.85, nutrient_Mg_percent: 0.28, nutrient_S_percent: 0.06, nutrient_Fe_ppm: 520, nutrient_Mn_ppm: 240, nutrient_Zn_ppm: 32, nutrient_Cu_ppm: 10, nutrient_B_ppm: 18, nutrient_Si_percent: 0.6, nutrient_Mo_ppm: 0.6, description: "Biochar dari pirolisis kayu keras (hardwood) pada 400-600°C. Komposisi: karbon terfiksasi 60-80%, abu 2-10%, volatil <20%. Luas permukaan spesifik 200-400 m²/g, micropores (<2nm) dan mesopores (2-50nm). Struktur aromatik kondensasi tinggi (H/C ratio <0.6) memberikan recalcitrance. KTK berkembang dari oksidasi permukaan (carboxyl, phenolic, lactonic groups). pH sangat alkalis dari K₂CO₃, CaCO₃, MgCO₃ dalam abu. Dapat adsorpsi logam berat, pestisida, allelopati. Habitat mikroba dan mikoriza." },
        { id: 20, name: "Rockwool", portion: 0, retention: 77.0, drainage: 23.0, porosity: 96.0, ph: 7.2, cec: 0.5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, nutrient_Si_percent: 43.0, nutrient_Mo_ppm: 0, description: "Serat mineral dari basalt-diabase-limestone yang dilelehkan 1500-1600°C lalu di-spin. Diameter serat 2-7 μm, panjang variatif membentuk mat/slab. Bulk density 0.03-0.08 g/cm³. Total porosity 95-97%: air tersedia 50-60%, air mudah tersedia 30-40%, udara 30-40%. Steril, inert secara kimiawi. WHC sangat tinggi karena kapiler antar-serat. pH buffer minimal. Drainase baik mencegah asfixia. Digunakan hidroponik, propagasi. Tidak terbiodegradasi. Perlu conditioning dengan Ca-NO₃ buffer sebelum tanam." },
        { id: 21, name: "Kerikil", portion: 0, retention: 3.0, drainage: 97.0, porosity: 42.0, ph: 7.3, cec: 0.5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, nutrient_Si_percent: 38.0, nutrient_Mo_ppm: 0, description: "Agregat kasar (gravel) ukuran 5-20 mm dari batuan beku (granit, andesit) atau sedimen (kuarsa). Bentuk rounded hingga angular. Bulk density 1.5-1.8 g/cm³. Total porosity 35-45% hanya makropori antar-partikel. Tidak menahan air (WHC <5%). Fungsi: drainage layer di dasar kontainer mencegah waterlogging dan clogging, pemberat media mencegah tipping, aerasi. Chemically inert, tidak weathering. Dapat dicuci dan digunakan kembali. Komposisi mineralogi bervariasi, dominan SiO₂." },
        { id: 22, name: "Pasir Sungai", portion: 0, retention: 12.0, drainage: 88.0, porosity: 43.0, ph: 7.1, cec: 1.5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 15, nutrient_Mn_ppm: 5, nutrient_Zn_ppm: 2, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, nutrient_Si_percent: 85.0, nutrient_Mo_ppm: 0, description: "Agregat halus hasil erosi dan transportasi fluvial. Komposisi dominan kuarsa (SiO₂) 70-95%, feldspars, micas. Ukuran 0.05-2 mm (fine-coarse sand), bentuk rounded karena abrasi. Bulk density 1.4-1.6 g/cm³. Porositas hanya makropori, drainase sangat cepat, WHC minimal. Tidak memiliki KTK signifikan. Fungsi: memperbaiki struktur fisik media, mencegah kompaksi, meningkatkan aerasi, pemberat. HARUS dicuci bersih menghilangkan lumpur, clay, dan salt terlarut. Steril, inert, pH netral." },
        { id: 23, name: "Hydroton", portion: 0, retention: 42.0, drainage: 58.0, porosity: 78.0, ph: 6.9, cec: 3.0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, nutrient_Si_percent: 58.0, nutrient_Mo_ppm: 0, description: "LECA (Lightweight Expanded Clay Aggregate) dari clay/shale dipanaskan 1100-1200°C. Diameter 8-16 mm, bentuk spherical. Struktur: cortex keras impermeabel, interior porous dengan closed cells. Bulk density 0.25-0.45 g/cm³. Air tertahan dalam pori internal dan surface film. Porosity internal 80%, total porosity media 70-80%. Drainase excellent, aerasi tinggi. pH netral setelah conditioning (soak 24 jam dengan pH 5.5 untuk buffer initial alkalis). Dapat dicuci dan digunakan kembali berkali-kali. Ideal untuk hidroponik dan drainase kultur." },
        { id: 24, name: "Spagnum Peat Moss", portion: 0, retention: 88.0, drainage: 12.0, porosity: 92.0, ph: 3.8, cec: 105.0, nutrient_N_percent: 0.9, nutrient_P_percent: 0.05, nutrient_K_percent: 0.08, nutrient_Ca_percent: 0.15, nutrient_Mg_percent: 0.08, nutrient_S_percent: 0.18, nutrient_Fe_ppm: 65, nutrient_Mn_ppm: 25, nutrient_Zn_ppm: 6, nutrient_Cu_ppm: 2, nutrient_B_ppm: 2, nutrient_Si_percent: 0.3, nutrient_Mo_ppm: 0.3, description: "Sphagnum moss (S. palustre, S. magellanicum) terdekomposisi parsial dari bog anaerobic (2000-8000 tahun). Komposisi: selulosa 40-50%, hemiselulosa 10-15%, lignin 10-15%, humus 20-30%. Struktur hyaline cells menyerap air 15-30x berat kering. WHC 1000-1500%. Bulk density 0.06-0.12 g/cm³. KTK tinggi dari gugus carboxyl (-COOH) dan phenolic. pH sangat asam dari asam organik (galakturonat) dan H⁺ exchange. Mengandung sphagnan (polysaccharide antimikroba). Miskin nutrisi, perlu fertilisasi dan liming (dolomit 3-5 kg/m³)." },
        { id: 25, name: "Biochar", portion: 0, retention: 68.0, drainage: 32.0, porosity: 84.0, ph: 8.5, cec: 55.0, nutrient_N_percent: 0.25, nutrient_P_percent: 0.18, nutrient_K_percent: 1.25, nutrient_Ca_percent: 1.15, nutrient_Mg_percent: 0.42, nutrient_S_percent: 0.12, nutrient_Fe_ppm: 620, nutrient_Mn_ppm: 350, nutrient_Zn_ppm: 48, nutrient_Cu_ppm: 18, nutrient_B_ppm: 28, nutrient_Si_percent: 2.8, nutrient_Mo_ppm: 1.8, description: "Biomass carbonized 350-700°C dalam pyrolysis. Sumber: wood, crop residue, manure. Komposisi: C 50-90%, O 5-30%, H 2-6%, N 0.1-3%, ash 1-40% (tergantung feedstock dan temperature). Surface area 100-600 m²/g, micropores dominan. Aromaticity tinggi (aromatic C >60%). KTK berkembang saat aging dari surface oxidation. pH alkalis dari carbonates, oxides (CaO, MgO, K₂O). Meningkatkan WHC, aerasi, aktivitas mikroba. Adsorpsi allelopati, logam berat. Persistence tinggi (mean residence time 100-1000 tahun). Application rate 5-20% v/v." },
        { id: 26, name: "Pumice", portion: 0, retention: 35.0, drainage: 65.0, porosity: 82.0, ph: 7.0, cec: 2.5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.08, nutrient_Ca_percent: 0.15, nutrient_Mg_percent: 0.05, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 65, nutrient_Mn_ppm: 12, nutrient_Zn_ppm: 3, nutrient_Cu_ppm: 1, nutrient_B_ppm: 2, nutrient_Si_percent: 72.0, nutrient_Mo_ppm: 0.2, description: "Batuan vulkanik rhyolitic glass (SiO₂ 65-75%, Al₂O₃ 12-15%) terbentuk dari rapid cooling lava bergas. Struktur vesicular dengan interconnected pores 60-85% volume. Ukuran 2-10 mm. Bulk density 0.4-0.9 g/cm³. Vesicles menahan air dalam thin film, tapi drainase cepat. Sangat porous untuk aerasi. Keras, tidak mudah hancur (Mohs hardness 5-6). Weathering sangat lambat melepas trace elements. pH netral. Tidak mengembang/menyusut. Sangat stabil, dapat digunakan berkali-kali. Excellent untuk succulents, cacti, epiphytes." },
        { id: 27, name: "Akadama", portion: 0, retention: 45.0, drainage: 55.0, porosity: 58.0, ph: 6.5, cec: 12.0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.15, nutrient_Ca_percent: 0.25, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 180, nutrient_Mn_ppm: 32, nutrient_Zn_ppm: 10, nutrient_Cu_ppm: 4, nutrient_B_ppm: 3, nutrient_Si_percent: 52.0, nutrient_Mo_ppm: 0.4, description: "Tanah liat vulkanik terlapuk (volcanic ash → clay mineral) dari Kanuma, Jepang. Komposisi: allophane, imogolite, halloysite (clay minerals). Di-kiln firing 800-900°C membentuk hard granules 1-6 mm. Struktur microporous dengan WHC 40-50%. Bulk density 0.8-1.0 g/cm³. KTK moderate dari clay minerals. pH slightly acidic. Warna orange-red dari Fe-oxides. Struktural stability baik, tahan crushing. Drainase excellent sambil retain moisture. Gradual breakdown (2-3 tahun) melepas mineral. Premium grade untuk bonsai, succulents. Mahal dan perlu reimport." },
        { id: 28, name: "Peat Moss", portion: 0, retention: 83.0, drainage: 17.0, porosity: 89.0, ph: 3.6, cec: 100.0, nutrient_N_percent: 1.0, nutrient_P_percent: 0.06, nutrient_K_percent: 0.10, nutrient_Ca_percent: 0.20, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.14, nutrient_Fe_ppm: 55, nutrient_Mn_ppm: 22, nutrient_Zn_ppm: 5, nutrient_Cu_ppm: 2, nutrient_B_ppm: 2, nutrient_Si_percent: 0.4, nutrient_Mo_ppm: 0.2, description: "Bahan organik dari dekomposisi vegetasi rawa (sedges, reeds, mosses) dalam kondisi waterlogged anaerobic selama ribuan tahun. Berbeda dari Sphagnum peat. Komposisi: humus, selulosa, hemiselulosa terdekomposisi. Degree of decomposition H4-H7 von Post scale. WHC 700-1200%. Bulk density 0.08-0.15 g/cm³. KTK tinggi dari gugus fungsi asam. pH sangat asam (H⁺ saturation >70%). Warna coklat gelap-hitam. Perlu liming 2-4 kg dolomit/m³ dan supplementasi nutrisi. Shrinkage-swelling moderate. Slow decomposition (C/N 20-50:1)." },
        { id: 29, name: "Kulit Kayu Pinus", portion: 0, retention: 38.0, drainage: 62.0, porosity: 76.0, ph: 4.8, cec: 10.0, nutrient_N_percent: 0.35, nutrient_P_percent: 0.04, nutrient_K_percent: 0.18, nutrient_Ca_percent: 0.20, nutrient_Mg_percent: 0.10, nutrient_S_percent: 0.04, nutrient_Fe_ppm: 95, nutrient_Mn_ppm: 42, nutrient_Zn_ppm: 15, nutrient_Cu_ppm: 5, nutrient_B_ppm: 4, nutrient_Si_percent: 0.3, nutrient_Mo_ppm: 0.2, description: "Bark Pinus merkusii/radiata aged/composted 6-12 bulan, size 5-20 mm. Komposisi: lignin 40-50%, cellulose 20-25%, extractives (terpenes, phenolics, tannins) 5-15%. C/N ratio 80-120:1 fresh, 40-60:1 aged. Bulk density 0.15-0.30 g/cm³. Struktur chunky menciptakan large air space (30-40%). WHC moderate. pH asam dari phenolic acids dan tannins. Slow decomposition (3-5 tahun). Perlu nitrogen supplementasi. Aging mengurangi phytotoxic compounds. Mengandung natural antimicrobials. Excellent untuk orchids, acidophilic plants, containerized ornamentals." },
        { id: 30, name: "Sphagnum Moss", portion: 0, retention: 93.0, drainage: 7.0, porosity: 94.0, ph: 4.0, cec: 110.0, nutrient_N_percent: 0.6, nutrient_P_percent: 0.04, nutrient_K_percent: 0.05, nutrient_Ca_percent: 0.12, nutrient_Mg_percent: 0.06, nutrient_S_percent: 0.08, nutrient_Fe_ppm: 38, nutrient_Mn_ppm: 15, nutrient_Zn_ppm: 4, nutrient_Cu_ppm: 1, nutrient_B_ppm: 1, nutrient_Si_percent: 0.2, nutrient_Mo_ppm: 0.1, description: "Living atau fresh-dried Sphagnum moss (S. cristatum, S. papillosum) tanpa dekomposisi. Struktur unik: photosynthetic cells + large hyaline cells (dead, hollow) dengan pores untuk water storage. WHC hingga 2000% berat kering. Bulk density 0.01-0.04 g/cm³. Sphagnan (polysaccharide) memberikan sifat antimicrobial dan fungicidal. pH sangat asam dari cation exchange (H⁺ release). Sangat miskin nutrisi. Air-filled porosity tinggi tapi oxygen diffusion baik. Ideal untuk propagasi, orchid mounting, terrarium. Renewable tapi perlu harvesting sustainable." },
        { id: 31, name: "Hydrogel", portion: 0, retention: 96.0, drainage: 4.0, porosity: 97.0, ph: 6.8, cec: 0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, nutrient_Si_percent: 0.0, nutrient_Mo_ppm: 0.0, description: "Superabsorbent polymer (SAP) cross-linked polyacrylamide atau polyacrylate. Dry granules 0.5-2 mm mengembang hingga 150-400x volume saat menyerap air. Struktur 3D network dengan hydrophilic groups (-COOH, -OH, -NH₂). Water absorption capacity tergantung ionic strength solution (400x di distilled water, 50-100x di nutrient solution). Release air secara perlahan saat media mengering (matric potential gradient). Chemically inert, no CEC. Durability 3-5 tahun dalam media, gradual degradation dari UV, microbes. Application rate 0.1-0.3% w/w. Reduce watering frequency 30-50%. Tidak mengandung nutrisi apapun." },
        { id: 32, name: "Kanuma Soil", portion: 0, retention: 58.0, drainage: 42.0, porosity: 75.0, ph: 5.2, cec: 15.0, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.18, nutrient_Ca_percent: 0.32, nutrient_Mg_percent: 0.15, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 280, nutrient_Mn_ppm: 45, nutrient_Zn_ppm: 12, nutrient_Cu_ppm: 5, nutrient_B_ppm: 4, nutrient_Si_percent: 55.0, nutrient_Mo_ppm: 0.5, description: "Material vulkanik granular berwarna kuning pucat dari Kanuma, Tochigi Prefecture, Jepang. Terbentuk dari weathered pumice volcanic ash hasil erupsi Mt. Akagi 30.000-40.000 tahun lalu, ditambang dari kedalaman 2-3 meter. Komposisi mineral: SiO₂ (silika) 50-60%, Al₂O₃ (alumina) 20-25%, Fe₂O₃ (iron oxide) 8-12%, dengan trace CaO, MgO. Struktur unik: outer shell keras dengan soft porous core, bulk density 0.4-0.7 g/cm³. pH sangat asam (4.5-5.5) ideal untuk tanaman ericaceous (azalea, camellia, gardenia). Water holding capacity tinggi (dapat menyerap >100% beratnya) namun drainage excellent karena struktur microporous. Akar dapat penetrasi langsung ke dalam granule menciptakan fibrous root system. Tidak mengandung bahan organik, steril, dan miskin nutrisi sehingga memerlukan fertilisasi rutin. Sangat ringan (seperti popcorn), dapat float saat penyiraman awal. Breakdown gradual dalam 2-3 tahun. Silicon content sangat tinggi (>50%) bermanfaat untuk strengthening cell walls dan stress resistance. CEC moderate memungkinkan nutrient retention dari pupuk. Excellent untuk bonsai acidophilic, orchid terrestrial, dan kultur khusus yang memerlukan media asam, porous, dan well-drained." }
    ];
    
    let materials = [...defaultMaterials];
    let composition = [];
    let selectedMaterial = null;
    let mediaVolume = 0;
    
    // Inisialisasi aplikasi
    function initApp() {
        renderDropdownMaterials();
        updateTotalPortion();
        loadCompositionsFromStorage();
        
        // Event listeners
        $('#reset-composition').click(resetComposition);
        $('#run-simulation').click(runSimulation);
        $('#reset-simulation').click(resetSimulation);
        $('#save-composition').click(saveComposition);
        $('#view-saved').click(viewSavedCompositions);
        $('#export-simulation').click(exportSimulation);
        $('#import-composition').click(importComposition);
        $('#export-composition').click(exportComposition);
        $('#add-selected-material').click(addSelectedMaterialToComposition);
        
        // Dropdown event listeners
        $('#materialDropdownButton').click(toggleDropdown);
        
        // Close dropdown when clicking outside
        $(document).click(function(e) {
            if (!$(e.target).closest('.material-dropdown').length) {
                $('#materialDropdownMenu').removeClass('show');
            }
        });
        
        // Modal event listeners
        $('#modalClose, #modalCloseBtn').click(function() {
            hideModal($('#messageModal'));
        });
        
        $('#savedModalClose, #savedModalCloseBtn').click(function() {
            hideModal($('#savedModal'));
        });
        
        $('#importCompositionModalClose, #importCompositionModalCloseBtn').click(function() {
            hideModal($('#importCompositionModal'));
        });
        
        $('#importCompositionConfirm').click(importCompositionFromFile);
        
        // Custom alert, prompt, confirm listeners
        $('#alertConfirm, #alertClose').click(function() {
            hideCustomAlert();
        });
        
        $('#promptConfirm').click(function() {
            const value = $('#promptInput').val();
            if (window.promptCallback) {
                window.promptCallback(value);
                window.promptCallback = null;
            }
            hideCustomPrompt();
        });
        
        $('#promptCancel, #promptClose').click(function() {
            if (window.promptCallback) {
                window.promptCallback(null);
                window.promptCallback = null;
            }
            hideCustomPrompt();
        });
        
        $('#confirmYes').click(function() {
            if (window.confirmCallback) {
                window.confirmCallback(true);
                window.confirmCallback = null;
            }
            hideCustomConfirm();
        });
        
        $('#confirmNo, #confirmClose').click(function() {
            if (window.confirmCallback) {
                window.confirmCallback(false);
                window.confirmCallback = null;
            }
            hideCustomConfirm();
        });

        // Toast event listener
        $('#toastClose').click(function() {
            hideToast();
        });

        // Ripple effect untuk tombol
        $('.btn').on('click', function(e) {
            createRipple(e, $(this));
        });

        // Event listener untuk tombol reset semua bagian
        $('#reset-portions').click(function() {
            composition.forEach(item => {
                item.portion = 0;
            });
            renderComposition();
            updateTotalPortion();
            showSnackbar('Semua bagian berhasil direset ke 0');
        });

        ensurePlantAnimation();

        setInterval(() => {
            const plantGroup = document.querySelector('.plant-group');
            if (plantGroup) {
                const animation = plantGroup.style.animation;
                plantGroup.style.animation = 'none';
                setTimeout(() => {
                    plantGroup.style.animation = animation;
                }, 10);
            }
        }, 30000);
    }

    // Fungsi untuk membuat efek ripple pada tombol
    function createRipple(event, $element) {
        const $ripple = $('<span class="ripple"></span>');
        
        const diameter = Math.max($element.outerWidth(), $element.outerHeight());
        const radius = diameter / 2;
        
        const x = event.pageX - $element.offset().left - radius;
        const y = event.pageY - $element.offset().top - radius;
        
        $ripple.css({
            width: diameter,
            height: diameter,
            top: y,
            left: x
        });
        
        $element.append($ripple);
        
        setTimeout(function() {
            $ripple.remove();
        }, 600);
    }
    
    // Tampilkan modal dengan animasi
    function showModal(modal) {
        modal.show();
        setTimeout(function() {
            modal.find('.modal-content').addClass('modal-show');
        }, 10);
    }
    
    // Sembunyikan modal dengan animasi
    function hideModal(modal) {
        modal.find('.modal-content').removeClass('modal-show');
        setTimeout(function() {
            modal.hide();
        }, 300);
    }

    // Tampilkan loading spinner
    function showLoading() {
        $('#loadingSpinner').show();
    }

    // Sembunyikan loading spinner
    function hideLoading() {
        $('#loadingSpinner').hide();
    }

    // Tampilkan snackbar
    function showSnackbar(message) {
        const snackbar = $('#snackbar');
        snackbar.text(message);
        snackbar.addClass('show');
        
        setTimeout(function() {
            snackbar.removeClass('show');
        }, 3000);
    }

    // Tampilkan toast
    function showToast(title, message) {
        const toast = $('#toast');
        $('#toastTitle').text(title);
        $('#toastMessage').text(message);
        toast.addClass('show');
        
        setTimeout(function() {
            hideToast();
        }, 5000);
    }

    // Sembunyikan toast
    function hideToast() {
        $('#toast').removeClass('show');
    }
    
    // Tampilkan custom alert
    function showCustomAlert(title, message) {
        $('#alertTitle').text(title);
        $('#alertMessage').text(message);
        $('#customAlert').addClass('show');
    }
    
    // Sembunyikan custom alert
    function hideCustomAlert() {
        $('#customAlert').removeClass('show');
    }
    
    // Tampilkan custom prompt
    function showCustomPrompt(title, message, callback) {
        $('#promptTitle').text(title);
        $('#promptMessage').text(message);
        $('#promptInput').val('');
        window.promptCallback = callback;
        $('#customPrompt').addClass('show');
        $('#promptInput').focus();
    }
    
    // Sembunyikan custom prompt
    function hideCustomPrompt() {
        $('#customPrompt').removeClass('show');
    }
    
    // Tampilkan custom confirm
    function showCustomConfirm(title, message, callback) {
        $('#confirmTitle').text(title);
        $('#confirmMessage').text(message);
        window.confirmCallback = callback;
        $('#customConfirm').addClass('show');
    }
    
    // Sembunyikan custom confirm
    function hideCustomConfirm() {
        $('#customConfirm').removeClass('show');
    }
    
    // Tampilkan modal pesan (untuk kompatibilitas)
    function showMessage(title, message) {
        $('#modalTitle').text(title);
        $('#modalMessage').text(message);
        showModal($('#messageModal'));
    }
    
    // Render dropdown bahan baku
    function renderDropdownMaterials() {
        const container = $('#materialDropdownMenu');
        container.empty();
        
        materials.forEach(material => {
            const item = $('<div>').addClass('dropdown-item')
                .attr('data-id', material.id)
                .click(() => selectMaterial(material));
            
            const name = $('<div>').addClass('material-name').text(material.name);
            
            // Properti dalam satu baris
            const details = $('<div>').addClass('material-details');
            
            // Retensi
            details.append($('<span>').addClass('material-detail').append(
                $('<i>').addClass('fas fa-tint'),
                $('<span>').text(material.retention + '%')
            ));
            
            // Drainase
            details.append($('<span>').addClass('material-detail').append(
                $('<i>').addClass('fas fa-water'),
                $('<span>').text(material.drainage + '%')
            ));
            
            // Porositas
            details.append($('<span>').addClass('material-detail').append(
                $('<i>').addClass('fas fa-wind'),
                $('<span>').text(material.porosity + '%')
            ));
            
            // pH
            details.append($('<span>').addClass('material-detail').append(
                $('<i>').addClass('fas fa-flask'),
                $('<span>').text('pH:' + material.ph)
            ));
            
            // CEC
            details.append($('<span>').addClass('material-detail').append(
                $('<i>').addClass('fas fa-exchange-alt'),
                $('<span>').text('CEC:' + material.cec)
            ));
            
            item.append(name, details);
            container.append(item);
        });
    }
    
    // Toggle dropdown
    function toggleDropdown() {
        $('#materialDropdownMenu').toggleClass('show');
    }
    
    // Pilih bahan dari dropdown
    function selectMaterial(material) {
        selectedMaterial = material;
        $('#selected-material-text').text(material.name);
        $('#materialDropdownMenu').removeClass('show');
    }
    
    // Tambah bahan yang dipilih ke komposisi
    function addSelectedMaterialToComposition() {
        if (!selectedMaterial) {
            showCustomAlert('Peringatan', 'Pilih bahan terlebih dahulu.');
            return;
        }
        
        // Cek apakah bahan sudah ada di komposisi berdasarkan NAMA (bukan ID)
        const existing = composition.find(item => item.name === selectedMaterial.name);
        
        if (existing) {
            showCustomAlert('Peringatan', 'Bahan ' + selectedMaterial.name + ' sudah ada dalam komposisi.');
            return;
        }
        
        // Jika belum ada, tambahkan dengan bagian default 0
        composition.push({
            ...selectedMaterial,
            portion: 0
        });

        renderComposition();
        updateTotalPortion();
        showSnackbar('Bahan ' + selectedMaterial.name + ' berhasil ditambahkan ke komposisi');
        
        // Reset pilihan
        selectedMaterial = null;
        $('#selected-material-text').text('Pilih Bahan Baku');
    }
    
    // Render komposisi dengan desain tabel yang diperbaiki
    function renderComposition() {
        const container = $('#composition-list');
        container.empty();
        
        if (composition.length === 0) {
            container.append($('<p>').addClass('text-center text-muted p-4').text('Tambahkan bahan dari dropdown di atas untuk memulai'));
            return;
        }
        
        // Buat tabel dengan desain yang diperbaiki
        const table = $('<table>').addClass('composition-table-improved');
        const thead = $('<thead>');
        const tbody = $('<tbody>');
        
        // Baris header
        const headerRow = $('<tr>');
        headerRow.append($('<th width="3%">').text('NO'));
        headerRow.append($('<th width="52%">').text('BAHAN'));
        headerRow.append($('<th width="10%">').text('BAGIAN'));
        headerRow.append($('<th width="16%">').text('SIFAT'));
        headerRow.append($('<th width="16%">').text('NUTRISI'));
        headerRow.append($('<th width="3%">').text('AKSI'));
        thead.append(headerRow);
        table.append(thead);
        
        // Isi tabel
        composition.forEach((item, index) => {
            // Baris utama untuk bahan
            const mainRow = $('<tr>').addClass('material-row');
            
            // Nomor
            mainRow.append($('<td>').addClass('text-center').text(index + 1));
            
            // Nama bahan
            mainRow.append($('<td>').addClass('material-name').text(item.name));
            
            // Input bagian
            const portionInput = $('<input>').attr({
                type: 'number',
                min: '0',
                step: '0.1',
                value: item.portion,
                class: 'portion-input'
            }).on('input', function() {
                item.portion = parseFloat($(this).val()) || 0;
                updateTotalPortion();
            });
            
            mainRow.append($('<td>').addClass('text-center').append(portionInput));
            
            // Sifat (dalam satu sel, tapi kita buat dalam bentuk list)
            const properties = $('<div>').addClass('properties-list');
            
            // Retensi dengan tooltip
            properties.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<i>').addClass('fas fa-tint'),
                    $('<span>').addClass('tooltip-text').text('Retensi Air (%) - Kemampuan media menahan air')
                ),
                $('<span>').addClass('property-value').text(item.retention.toFixed(1) + '%')
            ));
            
            // Drainase dengan tooltip
            properties.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<i>').addClass('fas fa-water'),
                    $('<span>').addClass('tooltip-text').text('Drainase (%) - Kemampuan media mengalirkan air')
                ),
                $('<span>').addClass('property-value').text(item.drainage.toFixed(1) + '%')
            ));
            
            // Porositas dengan tooltip
            properties.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<i>').addClass('fas fa-wind'),
                    $('<span>').addClass('tooltip-text').text('Porositas (%) - Ruang udara dalam media')
                ),
                $('<span>').addClass('property-value').text(item.porosity.toFixed(1) + '%')
            ));
            
            // pH dengan tooltip
            properties.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<i>').addClass('fas fa-flask'),
                    $('<span>').addClass('tooltip-text').text('Tingkat keasaman (pH)')
                ),
                $('<span>').addClass('property-value').text(item.ph.toFixed(1))
            ));
            
            // CEC dengan tooltip
            properties.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<i>').addClass('fas fa-exchange-alt'),
                    $('<span>').addClass('tooltip-text').text('Kapasitas Tukar Kation (CEC) : meq/100g')
                ),
                $('<span>').addClass('property-value').text(item.cec.toFixed(1) + ' ')
            ));
            
            mainRow.append($('<td>').addClass('text-right').append(properties));
            
            // Nutrisi (dalam satu sel, tapi kita buat dalam bentuk list)
            const nutrients = $('<div>').addClass('nutrients-list');
            
            // Nitrogen
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Nitrogen'),
                    $('<span>').addClass('nutrient-value').text('N')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_N_percent.toFixed(2) + '%')
            ));
            
            // Fosfor
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Fosfor'),
                    $('<span>').addClass('nutrient-value').text('P')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_P_percent.toFixed(2) + '%')
            ));
            
            // Kalium
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Kalium'),
                    $('<span>').addClass('nutrient-value').text('K')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_K_percent.toFixed(2) + '%')
            ));

            // Silikon
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Silikon'),
                    $('<span>').addClass('nutrient-value').text('Si')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Si_percent.toFixed(2) + ' %')
            ));
            
            // Kalsium
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Kalsium'),
                    $('<span>').addClass('nutrient-value').text('Ca')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Ca_percent.toFixed(2) + '%')
            ));
            
            // Magnesium
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Magnesium'),
                    $('<span>').addClass('nutrient-value').text('Mg')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Mg_percent.toFixed(2) + '%')
            ));
            
            // Belerang
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Belerang'),
                    $('<span>').addClass('nutrient-value').text('S')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_S_percent.toFixed(2) + '%')
            ));
            
            // Besi
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Besi'),
                    $('<span>').addClass('nutrient-value').text('Fe')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Fe_ppm + ' ppm')
            ));
            
            // Mangan
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Mangan'),
                    $('<span>').addClass('nutrient-value').text('Mn')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Mn_ppm + ' ppm')
            ));
            
            // Seng
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Seng'),
                    $('<span>').addClass('nutrient-value').text('Zn')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Zn_ppm + ' ppm')
            ));
            
            // Tembaga
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Tembaga'),
                    $('<span>').addClass('nutrient-value').text('Cu')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Cu_ppm + ' ppm')
            ));
            
            // Boron
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Boron'),
                    $('<span>').addClass('nutrient-value').text('B')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_B_ppm + ' ppm')
            ));

            // Molibdenum
            nutrients.append($('<div>').addClass('property-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('tooltip-text').text('Molibdenum'),
                    $('<span>').addClass('nutrient-value').text('Mo')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Mo_ppm + ' ppm')
            ));

            mainRow.append($('<td>').addClass('text-right').append(nutrients));
            
            // Tombol hapus
            const deleteButton = $('<button>').addClass('delete-btn')
                .html('<i class="fas fa-trash"></i>')
                .attr('title', 'Hapus dari komposisi')
                .click(() => {
                    composition.splice(index, 1);
                    renderComposition();
                    updateTotalPortion();
                    showSnackbar('Bahan berhasil dihapus dari komposisi');
                });
            
            mainRow.append($('<td>').addClass('action-cell').append(deleteButton));
            
            tbody.append(mainRow);
        });

        table.append(tbody);
        container.append(table);
    }
    
    // Update total bagian (bukan persentase)
    function updateTotalPortion() {
        const total = composition.reduce((sum, item) => sum + item.portion, 0);
        $('#total-percentage').text(total.toFixed(1));
    }
    
    // Reset komposisi
    function resetComposition() {
        if (composition.length > 0) {
            composition = [];
            renderComposition();
            updateTotalPortion();
            showSnackbar('Komposisi berhasil direset');
        } else {
            composition = [];
            renderComposition();
            updateTotalPortion();
        }
    }
    
    // Jalankan simulasi dengan animasi penyiraman yang lebih menarik
    function runSimulation() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tambahkan bahan ke komposisi terlebih dahulu.');
            return;
        }
        
        // Cek total bagian sebelum simulasi
        const totalPortion = composition.reduce((sum, item) => sum + item.portion, 0);
        if (totalPortion === 0) {
            showCustomAlert('Peringatan', 'Total bagian tidak boleh 0. Atur bagian untuk setiap bahan.');
            return;
        }
        
        // Tampilkan loading
        showLoading();
        
        // Simulasikan proses loading
        setTimeout(function() {
            // Hitung volume pot dan media
            const diameter = parseFloat($('#pot-diameter').val());
            const height = parseFloat($('#pot-height').val());
            const mediaPercentage = parseFloat($('#media-percentage').val());
            
            const potVolume = Math.PI * Math.pow(diameter/2, 2) * height;
            mediaVolume = potVolume * (mediaPercentage / 100);
            
            // Filter bahan dengan bagian 0
            const validComposition = composition.filter(item => item.portion > 0);
            
            // Hitung properti rata-rata media berdasarkan bagian
            let avgRetention = 0;
            let avgDrainage = 0;
            let avgPorosity = 0;
            let avgPH = 0;
            let avgCEC = 0;
            
            validComposition.forEach(item => {
                // Hitung persentase berdasarkan bagian untuk perhitungan rata-rata tertimbang
                const percentage = totalPortion > 0 ? (item.portion / totalPortion) * 100 : 0;
                const weight = percentage / 100;
                avgRetention += item.retention * weight;
                avgDrainage += item.drainage * weight;
                avgPorosity += item.porosity * weight;
                avgPH += item.ph * weight;
                avgCEC += item.cec * weight;
            });
            
            // Tampilkan properti media
            $('#avg-retention').text(avgRetention.toFixed(1) + '%');
            $('#avg-drainage').text(avgDrainage.toFixed(1) + '%');
            $('#avg-porosity').text(avgPorosity.toFixed(1) + '%');
            $('#avg-ph').text(avgPH.toFixed(1));
            $('#avg-cec').text(avgCEC.toFixed(1) + ' meq/100g');
            
            $('#media-properties').show();
            
            // Simulasi penyiraman
            const waterVolume = parseFloat($('#water-volume-input').val());
            const wateringDuration = parseFloat($('#watering-duration-input').val());
            
            const poreSpaceVolume = mediaVolume * (avgPorosity / 100);
            const maxWaterRetention = poreSpaceVolume * (avgRetention / 100);
            const retainedWater = Math.min(waterVolume, maxWaterRetention);
            const absorbedWater = retainedWater * 0.7; // Asumsi 70% air terserap
            const drainedWater = waterVolume - retainedWater;

            const absorbedPercentage = (absorbedWater / waterVolume) * 100;
            
            // Hitung persentase kebasahan media
            const mediaWetnessPercentage = (retainedWater / maxWaterRetention) * 100;

            // Tampilkan informasi tambahan di Hasil Simulasi
            $('#water-volume').text(waterVolume + ' mL');
            $('#watering-duration').text(wateringDuration + ' detik');
            $('#pot-volume').text(potVolume.toFixed(2) + ' mL');
            
            // Tampilkan hasil
            $('#media-volume').text(mediaVolume.toFixed(2) + ' mL');
            $('#retained-water-value').text(retainedWater.toFixed(2) + ' mL');
            $('#absorbed-water-percentage').text(absorbedPercentage.toFixed(1) + '%');
            $('#drained-water-value').text(drainedWater.toFixed(2) + ' mL');
            
            // Tampilkan persentase kebasahan media
            $('#media-wetness').text(mediaWetnessPercentage.toFixed(1) + '%');

            // Animasi level air di pot
            const waterLevelHeight = (retainedWater / maxWaterRetention) * 65;
            $('#water-level-enhanced').css('height', waterLevelHeight + '%');
            
            // Animasi media komposisi
            animateMediaCompositionEnhanced(validComposition, totalPortion);
            
            // Animasi penyiraman yang lebih menarik
            const wateringAnimation = $('#watering-animation-enhanced');
            wateringAnimation.css('height', '30%');
            
            // Tambahkan efek tetesan air
            const waterDrops = $('<div>').addClass('water-drops');
            for (let i = 0; i < 20; i++) {
                const drop = $('<div>').addClass('water-drop');
                drop.css({
                    left: Math.random() * 90 + 5 + '%',
                    animationDelay: (Math.random() * 1.5) + 's',
                    width: (Math.random() * 4 + 4) + 'px',
                    height: (Math.random() * 4 + 4) + 'px'
                });
                waterDrops.append(drop);
            }
            wateringAnimation.empty().append(waterDrops);
            
            setTimeout(function() {
                wateringAnimation.css('height', '0%');
    
                // Tambahkan efek riak air setelah penyiraman
                for (let i = 0; i < 3; i++) {
                    setTimeout(function() {
                        const ripple = $('<div>').addClass('water-ripple');
                        $('.pot-body-enhanced').append(ripple);
                        
                        setTimeout(function() {
                            ripple.remove();
                        }, 1500);
                    }, i * 300);
                }
                
                // Animasi drainase jika ada air yang keluar
                if (drainedWater > 0) {
                    animateDrainageEnhanced(drainedWater, maxWaterRetention);
                }
            }, 1000);
            
            // Tampilkan hasil simulasi
            $('#simulation-result').slideDown();
            
            // Tampilkan analisis
            generateAnalysis(avgRetention, avgDrainage, avgPorosity, avgCEC, avgPH, retainedWater, drainedWater, mediaVolume, totalPortion);
            $('#analysis-card').slideDown();
            
            // Sembunyikan loading
            hideLoading();
            
            showToast('Simulasi Selesai', 'Simulasi penyiraman berhasil dijalankan');
        }, 1500);
    }
    
    // Animasi media komposisi yang ditingkatkan
    function animateMediaCompositionEnhanced(composition, totalPortion) {
        const container = $('#media-composition-enhanced');
        container.empty();
        
        // Hitung tinggi media berdasarkan persentase media dalam pot
        const mediaPercentage = parseFloat($('#media-percentage').val());
        const mediaHeight = (mediaPercentage / 100) * 65; // 65% adalah tinggi maksimal media dalam pot
        
        container.css('height', mediaHeight + '%');
        
        // Buat layer untuk setiap bahan berdasarkan proporsinya
        let accumulatedHeight = 0;
        
        composition.forEach(item => {
            const percentage = (item.portion / totalPortion) * 100;
            const layerHeight = (percentage / 100) * mediaHeight;
            
            const layer = $('<div>').addClass('media-layer-enhanced');
            layer.css({
                bottom: accumulatedHeight + '%',
                height: layerHeight + '%',
                backgroundColor: getMaterialColor(item.name),
                opacity: 0.8
            });
            
            container.append(layer);
            accumulatedHeight += layerHeight;
        });
    }
    
    // Animasi drainase yang ditingkatkan
    function animateDrainageEnhanced(drainedWater, maxWaterRetention) {
        const drainageAnimation = $('#drainage-animation-enhanced');
        const drainageHeight = (drainedWater / maxWaterRetention) * 10; // Tinggi drainase relatif
        
        drainageAnimation.css('height', drainageHeight + '%');
        
        // Tambahkan efek tetesan drainase
        const drainageDrops = $('<div>').addClass('drainage-drops');
        for (let i = 0; i < 10; i++) {
            const drop = $('<div>').addClass('drainage-drop');
            drop.css({
                left: Math.random() * 90 + 5 + '%',
                animationDelay: (Math.random() * 1) + 's'
            });
            drainageDrops.append(drop);
        }
        drainageAnimation.empty().append(drainageDrops);
        
        setTimeout(function() {
            drainageAnimation.css('height', '0%');
        }, 2000);
    }
    
    // Fungsi untuk mendapatkan warna berdasarkan nama bahan
    function getMaterialColor(materialName) {
        const colorMap = {
            "Sekam Padi Mentah": "#D2B48C",
            "Sekam Padi Mentah (Fermentasi)": "#C19A6B",
            "Sekam Padi Mentah (Oven)": "#DEB887",
            "Arang Sekam Padi": "#36454F",
            "Humus Daun Bambu (Fermentasi)": "#8B4513",
            "Humus Daun Kaliandra (Fermentasi)": "#654321",
            "Humus Andam (Fermentasi)": "#5D4037",
            "Akar Pakis Cacah (Oven)": "#8B7355",
            "Biji Kapuk / Klenteng (Oven)": "#F5DEB3",
            "Cocopeat (Fermentasi)": "#A0522D",
            "Cocofiber": "#DEB887",
            "Perlite": "#F5F5F5",
            "Pasir Malang": "#C2B280",
            "Vermiculite": "#E6D690",
            "Zeolit": "#708090",
            "Top Soil": "#8B4513",
            "Pupuk Kandang Kambing (Fermentasi)": "#654321",
            "Vermicompost (Kascing)": "#5D4037",
            "Arang Kayu": "#2F4F4F",
            "Rockwool": "#D3D3D3",
            "Kerikil": "#A9A9A9",
            "Pasir Sungai": "#C2B280",
            "Hydroton": "#696969",
            "Spagnum Peat Moss": "#8B7355",
            "Biochar": "#2F4F4F",
            "Pumice": "#A9A9A9",
            "Akadama": "#8B4513",
            "Peat Moss": "#2F4F4F",
            "Kulit Kayu Pinus": "#5D4037",
            "Sphagnum Moss": "#DEB887",
            "Hydrogel": "#F5DEB3"
        };
        
        return colorMap[materialName] || "#8B4513"; // Warna default
    }
    
    // Generate analisis dan rekomendasi
    function generateAnalysis(retention, drainage, porosity, cec, ph, retainedWater, drainedWater, mediaVolume, totalPortion) {
        const analysisContent = $('#analysis-content');
        analysisContent.empty();
        
        let analysisHTML = '<div class="mb-3">';
        analysisHTML += '<h6><i class="fas fa-chart-line me-2"></i>Analisis Media Tanam</h6>';
        analysisHTML += '<p>Berikut adalah analisis detail mengenai komposisi media Anda:</p>';
        analysisHTML += '</div>';
        
        // Detail Komposisi Media - dengan ikon dan tooltip
        analysisHTML += '<div class="composition-details">';
        analysisHTML += '<h6><i class="fas fa-list me-2"></i>Detail Komposisi Media</h6>';
        analysisHTML += '<p>Total Volume Media: <strong>' + mediaVolume.toFixed(2) + ' mL</strong></p>';
        analysisHTML += '<table class="composition-detail-table-improved">';
        analysisHTML += '<thead><tr>';
        analysisHTML += '<th width="3%">NO</th>';
        analysisHTML += '<th width="45%">BAHAN</th>';
        analysisHTML += '<th width="2%">BAGIAN</th>';
        analysisHTML += '<th width="12%">VOLUME</th>';
        analysisHTML += '<th width="18%">SIFAT</th>';
        analysisHTML += '<th width="20%">NUTRISI</th>';
        analysisHTML += '</tr></thead>';
        analysisHTML += '<tbody>';
        
        composition.forEach((item, index) => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? ((item.portion / totalPortion) * 100).toFixed(2) : 0;
                const itemVolume = mediaVolume * (percentage / 100);
                
                // Baris utama untuk bahan
                analysisHTML += '<tr class="material-row">';
                analysisHTML += '<td class="text-center"><span class="property-value">' + (index + 1) + '</span></td>';
                analysisHTML += '<td><span class="property-value">' + item.name + '</span></td>';
                analysisHTML += '<td class="text-center"><span class="property-value">' + item.portion + '</span></td>';
                analysisHTML += '<td class="text-right"><span class="property-value">' + itemVolume.toFixed(2) + ' mL<br>' + percentage + '%</span></td>';
                
                // Sifat
                analysisHTML += '<td class="text-right">';
                analysisHTML += '<div class="properties-list">';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><i class="fas fa-tint"></i><span class="tooltip-text">Retensi Air (%)</span></div><span class="property-value">' + item.retention.toFixed(1) + '%</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><i class="fas fa-water"></i><span class="tooltip-text">Drainase (%)</span></div><span class="property-value">' + item.drainage.toFixed(1) + '%</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><i class="fas fa-wind"></i><span class="tooltip-text">Porositas (%)</span></div><span class="property-value">' + item.porosity.toFixed(1) + '%</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><i class="fas fa-flask"></i><span class="tooltip-text">Tingkat keasaman (pH)</span></div><span class="property-value">' + item.ph.toFixed(1) + '</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><i class="fas fa-exchange-alt"></i><span class="tooltip-text">Kapasitas Tukar Kation (CEC) : meq/100g</span></div><span class="property-value">' + item.cec.toFixed(1) + ' </span></div>';
                analysisHTML += '</div>';
                analysisHTML += '</td>';

                // Nutrisi
                analysisHTML += '<td class="text-right">';
                analysisHTML += '<div class="nutrients-list">';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Nitrogen</span><span class="nutrient-value">N</span></div><span class="nutrient-value">' + item.nutrient_N_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Fosfor</span><span class="nutrient-value">P</span></div><span class="nutrient-value">' + item.nutrient_P_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Kalium</span><span class="nutrient-value">K</span></div><span class="nutrient-value">' + item.nutrient_K_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Silikon</span><span class="nutrient-value">Si</span></div><span class="nutrient-value">' + item.nutrient_Si_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Kalsium</span><span class="nutrient-value">Ca</span></div><span class="nutrient-value">' + item.nutrient_Ca_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Magnesium</span><span class="nutrient-value">Mg</span></div><span class="nutrient-value">' + item.nutrient_Mg_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Belerang</span><span class="nutrient-value">S</span></div><span class="nutrient-value">' + item.nutrient_S_percent.toFixed(2) + '% </span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Besi</span><span class="nutrient-value">Fe</span></div><span class="nutrient-value">' + item.nutrient_Fe_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Mangan</span><span class="nutrient-value">Mn</span></div><span class="nutrient-value">' + item.nutrient_Mn_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Seng</span><span class="nutrient-value">Zn</span></div><span class="nutrient-value">' + item.nutrient_Zn_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Tembaga</span><span class="nutrient-value">Cu</span></div><span class="nutrient-value">' + item.nutrient_Cu_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Boron</span><span class="nutrient-value">B</span></div><span class="nutrient-value">' + item.nutrient_B_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="property-item"><div class="icon-tooltip"><span class="tooltip-text">Molibdenum</span><span class="nutrient-value">Mo</span></div><span class="nutrient-value">' + item.nutrient_Mo_ppm + ' ppm</span></div>';

                analysisHTML += '</div>';
                analysisHTML += '</td>';
                analysisHTML += '</tr>';
            }
        });
        
        analysisHTML += '</tbody>';
        analysisHTML += '</table>';
        analysisHTML += '</div>';
        analysisHTML += '<div>&nbsp;</div>';
        
        // Analisis berdasarkan jurnal dan riset tanaman
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-tint me-2"></i>Retensi Air: ' + retention.toFixed(1) + '%</h6>';
        
        if (retention > 70) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Retensi air tinggi.</strong> Media ini memiliki kemampuan menahan air yang tinggi.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media tetap lembab untuk waktu yang lama</li>';
            analysisHTML += '<li>Frekuensi penyiraman dapat dikurangi</li>';
            analysisHTML += '<li>Risiko pembusukan akar jika drainase tidak cukup</li>';
            analysisHTML += '</ul>';
        } else if (retention < 30) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Retensi air rendah.</strong> Media ini cepat kering setelah penyiraman.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Frekuensi penyiraman perlu lebih sering</li>';
            analysisHTML += '<li>Risiko dehidrasi pada tanaman</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci keluar dari media</li>';
            analysisHTML += '</ul>';
        } else {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Retensi air optimal.</strong> Media ini memiliki keseimbangan retensi air yang baik.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media dapat menahan air cukup untuk beberapa hari</li>';
            analysisHTML += '<li>Akar mendapatkan oksigen yang cukup</li>';
            analysisHTML += '<li>Risiko pembusukan akar minimal</li>';
            analysisHTML += '</ul>';
        }
        
        analysisHTML += '<p><strong>Penjelasan Retensi Air:</strong> Kemampuan media menahan air setelah penyiraman dan drainase. Retensi yang tepat mencegah kekeringan tanpa menyebabkan genangan air.</p>';
        analysisHTML += '</div>';
        
        // Analisis Drainase
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-water me-2"></i>Drainase: ' + drainage.toFixed(1) + '%</h6>';
        
        if (drainage < 30) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Drainase rendah.</strong> Air mungkin menggenang di dasar pot.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Risiko tinggi untuk pembusukan akar</li>';
            analysisHTML += '<li>Akar kekurangan oksigen</li>';
            analysisHTML += '<li>Garam mineral menumpuk di media</li>';
            analysisHTML += '</ul>';
        } else if (drainage > 70) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Drainase sangat cepat.</strong> Media akan cepat kering setelah penyiraman.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Frekuensi penyiraman perlu sangat sering</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci sebelum diserap akar</li>';
            analysisHTML += '<li>Media tidak stabil, mudah longsor</li>';
            analysisHTML += '</ul>';
        } else {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Drainase optimal.</strong> Media ini memiliki drainase yang baik.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Air berlebih dapat mengalir dengan baik</li>';
            analysisHTML += '<li>Media tetap lembab tanpa tergenang</li>';
            analysisHTML += '<li>Akar mendapatkan aerasi yang cukup</li>';
            analysisHTML += '</ul>';
        }
        
        analysisHTML += '<p><strong>Penjelasan Drainase:</strong> Kemampuan media mengalirkan air berlebih setelah penyiraman. Drainase yang baik mencegah genangan air dan busuk akar.</p>';
        analysisHTML += '</div>';
        
        // Analisis Porositas
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-wind me-2"></i>Porositas: ' + porosity.toFixed(1) + '%</h6>';
        
        if (porosity < 50) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Porositas rendah.</strong> Media terlalu padat.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media terlalu padat, menghambat perkembangan akar</li>';
            analysisHTML += '<li>Akar kekurangan oksigen untuk respirasi</li>';
            analysisHTML += '<li>Air tidak merata dalam media</li>';
            analysisHTML += '</ul>';
        } else if (porosity > 85) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Porositas sangat tinggi.</strong> Media mungkin terlalu ringan.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media tidak dapat menopang tanaman dengan baik</li>';
            analysisHTML += '<li>Retensi air rendah, cepat kering</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci</li>';
            analysisHTML += '</ul>';
        } else {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Porositas optimal.</strong> Media ini memiliki porositas yang baik.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Ruang udara cukup untuk respirasi akar</li>';
            analysisHTML += '<li>Media ringan namun stabil</li>';
            analysisHTML += '<li>Air dan nutrisi tersebar merata</li>';
            analysisHTML += '</ul>';
        }
        
        analysisHTML += '<p><strong>Penjelasan Porositas:</strong> Persentase ruang kosong dalam media yang dapat diisi air atau udara. Porositas tinggi = lebih banyak ruang untuk akar bernapas.</p>';
        analysisHTML += '</div>';
        
        // Analisis pH
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-flask me-2"></i>Tingkat Keasaman (pH): ' + ph.toFixed(1) + '</h6>';
        
        if (ph < 5.0) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>pH terlalu asam.</strong> pH optimal untuk kebanyakan tanaman adalah 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Toksisitas aluminium dan mangan meningkat</li>';
            analysisHTML += '<li>Ketersediaan fosfor, kalsium, dan magnesium menurun</li>';
            analysisHTML += '<li>Aktivitas mikroorganisme menguntungkan terhambat</li>';
            analysisHTML += '</ul>';
        } else if (ph > 7.5) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>pH terlalu basa.</strong> pH optimal untuk kebanyakan tanaman adalah 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Ketersediaan besi, mangan, seng, dan tembaga menurun</li>';
            analysisHTML += '<li>Fosfor terikat dengan kalsium menjadi tidak tersedia</li>';
            analysisHTML += '<li>Beberapa nutrisi mikro menjadi tidak dapat diserap</li>';
            analysisHTML += '</ul>';
        } else if (ph >= 5.5 && ph <= 6.5) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>pH optimal untuk tanaman.</strong> Sesuai untuk penyerapan nutrisi maksimal.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Semua nutrisi makro dan mikro tersedia optimal</li>';
            analysisHTML += '<li>Aktivitas mikroorganisme menguntungkan maksimal</li>';
            analysisHTML += '<li>Toksisitas logam berat minimal</li>';
            analysisHTML += '</ul>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>pH dalam batas dapat diterima.</strong> Tetapi lebih baik dioptimalkan ke rentang 5.5-6.5.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan pH:</strong> Tingkat keasaman atau kebasaan media. pH mempengaruhi ketersediaan nutrisi untuk tanaman.</p>';
        analysisHTML += '</div>';
        
        // Analisis CEC
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-exchange-alt me-2"></i>Kapasitas Tukar Kation (CEC): ' + cec.toFixed(1) + ' meq/100g</h6>';
        
        if (cec < 10) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>CEC rendah.</strong> Kemampuan menyimpan nutrisi terbatas.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi sangat terbatas</li>';
            analysisHTML += '<li>Pemupukan perlu dilakukan lebih sering dengan dosis rendah</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci oleh air penyiraman</li>';
            analysisHTML += '</ul>';
        } else if (cec > 50) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>CEC tinggi.</strong> Media dapat menyimpan banyak nutrisi.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Nutrisi tersimpan dengan baik dalam media</li>';
            analysisHTML += '<li>Frekuensi pemupukan dapat dikurangi</li>';
            analysisHTML += '<li>Risiko pencucian nutrisi minimal</li>';
            analysisHTML += '</ul>';
        } else if (cec >= 20 && cec <= 40) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>CEC optimal.</strong> Media ini memiliki kemampuan menyimpan nutrisi yang baik.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi cukup untuk 2-4 minggu</li>';
            analysisHTML += '<li>Nutrisi tersedia secara bertahap sesuai kebutuhan tanaman</li>';
            analysisHTML += '<li>Risiko defisiensi atau kelebihan nutrisi rendah</li>';
            analysisHTML += '</ul>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>CEC dalam batas dapat diterima.</strong> Tetapi lebih baik dioptimalkan ke rentang 20-40 meq/100g.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan CEC:</strong> Kemampuan media menahan dan melepaskan kation nutrisi (K, Ca, Mg, NH4). CEC tinggi = kemampuan menyimpan nutrisi lebih baik.</p>';
        analysisHTML += '</div>';
        
        // Analisis Kandungan dan Kegunaan
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-leaf me-2"></i>Kandungan dan Kegunaan Media</h6>';
        analysisHTML += '<p>Media tanam ini mengandung berbagai nutrisi dan bahan organik yang bermanfaat untuk tanaman:</p>';
        analysisHTML += '<ul>';
        
        // Analisis kandungan berdasarkan komposisi
        let totalOrganicMatter = 0;
        let totalNitrogen = 0;
        let totalPhosphorus = 0;
        let totalPotassium = 0;
        let totalCalcium = 0;
        let totalMagnesium = 0;
        let totalSulfur = 0;
        let totalIron = 0;
        let totalManganese = 0;
        let totalZinc = 0;
        let totalCopper = 0;
        let totalBoron = 0;
        let totalSilicon = 0;
        let totalMolybdenum = 0;
        
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? (item.portion / totalPortion) : 0;
                totalNitrogen += item.nutrient_N_percent * percentage;
                totalPhosphorus += item.nutrient_P_percent * percentage;
                totalPotassium += item.nutrient_K_percent * percentage;
                totalCalcium += item.nutrient_Ca_percent * percentage;
                totalMagnesium += item.nutrient_Mg_percent * percentage;
                totalSulfur += item.nutrient_S_percent * percentage;
                totalIron += item.nutrient_Fe_ppm * percentage;
                totalManganese += item.nutrient_Mn_ppm * percentage;
                totalZinc += item.nutrient_Zn_ppm * percentage;
                totalCopper += item.nutrient_Cu_ppm * percentage;
                totalBoron += item.nutrient_B_ppm * percentage;
                totalSilicon += item.nutrient_Si_percent * percentage;
                totalMolybdenum += item.nutrient_Mo_ppm * percentage;
            }
        });
        
        analysisHTML += '<li><strong>Nitrogen (N):</strong> ' + totalNitrogen.toFixed(2) + '% - Esensial untuk pertumbuhan daun dan batang</li>';
        analysisHTML += '<li><strong>Fosfor (P):</strong> ' + totalPhosphorus.toFixed(2) + '% - Penting untuk perkembangan akar dan pembungaan</li>';
        analysisHTML += '<li><strong>Kalium (K):</strong> ' + totalPotassium.toFixed(2) + '% - Meningkatkan ketahanan penyakit dan transportasi nutrisi</li>';
        analysisHTML += '<li><strong>Silikon (Si):</strong> ' + totalSilicon.toFixed(0) + ' % - Dapat memperkuat dinding sel, meningkatkan ketahanan terhadap hama dan penyakit, serta membantu tanaman menghadapi stres lingkungan seperti kekeringan dan logam berat</li>';
        analysisHTML += '<li><strong>Kalsium (Ca):</strong> ' + totalCalcium.toFixed(2) + '% - Memperkuat dinding sel dan sistem perakaran</li>';
        analysisHTML += '<li><strong>Magnesium (Mg):</strong> ' + totalMagnesium.toFixed(2) + '% - Komponen klorofil untuk fotosintesis</li>';
        analysisHTML += '<li><strong>Sulfur (S):</strong> ' + totalSulfur.toFixed(2) + '% - Penting untuk sintesis protein dan enzim</li>';
        analysisHTML += '<li><strong>Besi (Fe):</strong> ' + totalIron.toFixed(0) + ' ppm - Esensial untuk pembentukan klorofil</li>';
        analysisHTML += '<li><strong>Mangan (Mn):</strong> ' + totalManganese.toFixed(0) + ' ppm - Berperan dalam fotosintesis dan metabolisme nitrogen</li>';
        analysisHTML += '<li><strong>Zinc (Zn):</strong> ' + totalZinc.toFixed(0) + ' ppm - Penting untuk sintesis hormon pertumbuhan</li>';
        analysisHTML += '<li><strong>Tembaga (Cu):</strong> ' + totalCopper.toFixed(0) + ' ppm - Berperan dalam metabolisme karbohidrat dan protein</li>';
        analysisHTML += '<li><strong>Boron (B):</strong> ' + totalBoron.toFixed(0) + ' ppm - Penting untuk pembelahan sel dan perkembangan bunga</li>';
        analysisHTML += '<li><strong>Molibdenum (Mo):</strong> ' + totalMolybdenum.toFixed(0) + ' ppm - Berfungsi untuk mengikat nitrogen dari udara dan membantu mengolah nitrat menjadi amonium yang kemudian digunakan untuk membuat protein dan asam amino</li>';
        
        analysisHTML += '</ul>';
        analysisHTML += '<p><strong>Masa Pakai Media:</strong> Berdasarkan komposisi, media ini diperkirakan bertahan 12-18 bulan sebelum perlu diganti. Bahan organik akan terdekomposisi secara bertahap, mengurangi porositas dan meningkatkan kepadatan media.</p>';
        analysisHTML += '</div>';
        
        // Pro dan Kontra
        analysisHTML += '<div class="pros-cons">';
        analysisHTML += '<div class="pros">';
        analysisHTML += '<h6><i class="fas fa-thumbs-up me-2"></i>Kelebihan</h6>';
        analysisHTML += '<ul>';
        
        if (retention >= 40 && retention <= 60) {
            analysisHTML += '<li>Retensi air optimal untuk tanaman</li>';
        }
        if (drainage >= 40 && drainage <= 60) {
            analysisHTML += '<li>Drainase baik, mencegah genangan air</li>';
        }
        if (porosity >= 60 && porosity <= 80) {
            analysisHTML += '<li>Porositas ideal untuk aerasi akar</li>';
        }
        if (ph >= 5.5 && ph <= 6.5) {
            analysisHTML += '<li>pH optimal untuk penyerapan nutrisi</li>';
        }
        if (cec >= 20 && cec <= 40) {
            analysisHTML += '<li>Kemampuan menyimpan nutrisi cukup</li>';
        }
        if (totalNitrogen > 1.0) {
            analysisHTML += '<li>Kandungan nitrogen tinggi untuk pertumbuhan daun</li>';
        }
        if (totalPotassium > 1.0) {
            analysisHTML += '<li>Kandungan kalium tinggi untuk ketahanan penyakit</li>';
        }
        
        analysisHTML += '<li>Komposisi seimbang untuk pertumbuhan tanaman</li>';
        analysisHTML += '<li>Mengandung berbagai mikronutrien esensial</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        analysisHTML += '<div class="cons">';
        analysisHTML += '<h6><i class="fas fa-thumbs-down me-2"></i>Kekurangan</h6>';
        analysisHTML += '<ul>';
        
        if (retention < 40 || retention > 60) {
            analysisHTML += '<li>Retensi air tidak optimal untuk tanaman</li>';
        }
        if (drainage < 40 || drainage > 60) {
            analysisHTML += '<li>Drainase perlu disesuaikan untuk tanaman</li>';
        }
        if (porosity < 60 || porosity > 80) {
            analysisHTML += '<li>Porositas tidak ideal untuk aerasi akar</li>';
        }
        if (ph < 5.5 || ph > 6.5) {
            analysisHTML += '<li>pH perlu disesuaikan untuk penyerapan nutrisi optimal</li>';
        }
        if (cec < 20 || cec > 40) {
            analysisHTML += '<li>Kemampuan menyimpan nutrisi perlu dioptimalkan</li>';
        }
        if (totalNitrogen < 0.5) {
            analysisHTML += '<li>Kandungan nitrogen rendah untuk pertumbuhan optimal</li>';
        }
        if (totalPhosphorus < 0.2) {
            analysisHTML += '<li>Kandungan fosfor rendah untuk perkembangan akar</li>';
        }
        
        analysisHTML += '<li>Perlu pemantauan rutin untuk kondisi media</li>';
        analysisHTML += '<li>Beberapa bahan organik akan terdekomposisi seiring waktu</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        analysisHTML += '</div>';
        analysisHTML += '<div>&nbsp;</div>';
        
        // Rekomendasi berdasarkan jurnal dan riset
        analysisHTML += '<div class="recommendations">';
        analysisHTML += '<h6><i class="fas fa-clipboard-check me-2"></i>Rekomendasi Berdasarkan Jurnal dan Riset</h6>';
        
        // Rekomendasi berdasarkan karakteristik media
        if (retention < 40) {
            analysisHTML += '<div class="recommendation-item">';
            analysisHTML += '<p><i class="fas fa-lightbulb me-2"></i><strong>Rekomendasi untuk Retensi Air Rendah:</strong></p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Tambahkan bahan dengan retensi air tinggi seperti cocopeat atau vermiculite</li>';
            analysisHTML += '<li>Frekuensi penyiraman perlu lebih sering</li>';
            analysisHTML += '<li>Gunakan pot dengan drainase terbatas untuk mengurangi kehilangan air</li>';
            analysisHTML += '<li>Pertimbangkan penggunaan hidrogel untuk meningkatkan retensi air</li>';
            analysisHTML += '</ul>';
            analysisHTML += '</div>';
        }
        
        if (drainage < 40) {
            analysisHTML += '<div class="recommendation-item">';
            analysisHTML += '<p><i class="fas fa-lightbulb me-2"></i><strong>Rekomendasi untuk Drainase Rendah:</strong></p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Tambahkan bahan dengan drainase tinggi seperti pasir malang atau perlit</li>';
            analysisHTML += '<li>Pastikan pot memiliki lubang drainase yang cukup</li>';
            analysisHTML += '<li>Gunakan lapisan drainase di dasar pot (kerikil, arang)</li>';
            analysisHTML += '<li>Kurangi frekuensi penyiraman untuk mencegah genangan</li>';
            analysisHTML += '</ul>';
            analysisHTML += '</div>';
        }
        
        if (ph < 5.5) {
            analysisHTML += '<div class="recommendation-item">';
            analysisHTML += '<p><i class="fas fa-lightbulb me-2"></i><strong>Rekomendasi untuk pH Asam:</strong></p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Tambahkan kapur dolomit untuk menaikkan pH</li>';
            analysisHTML += '<li>Kurangi bahan organik yang bersifat asam seperti gambut</li>';
            analysisHTML += '<li>Pertimbangkan untuk menambahkan arang sekam yang bersifat basa</li>';
            analysisHTML += '<li>Pantau pH secara berkala dan sesuaikan dengan kebutuhan tanaman</li>';
            analysisHTML += '</ul>';
            analysisHTML += '</div>';
        }
        
        if (ph > 7.0) {
            analysisHTML += '<div class="recommendation-item">';
            analysisHTML += '<p><i class="fas fa-lightbulb me-2"></i><strong>Rekomendasi untuk pH Basa:</strong></p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Tambahkan belerang atau bahan organik asam untuk menurunkan pH</li>';
            analysisHTML += '<li>Gunakan pupuk yang bersifat asam seperti amonium sulfat</li>';
            analysisHTML += '<li>Pertimbangkan untuk menambahkan gambut atau bahan organik asam lainnya</li>';
            analysisHTML += '<li>Pantau pH secara berkala dan sesuaikan dengan kebutuhan tanaman</li>';
            analysisHTML += '</ul>';
            analysisHTML += '</div>';
        }
        
        if (cec < 20) {
            analysisHTML += '<div class="recommendation-item">';
            analysisHTML += '<p><i class="fas fa-lightbulb me-2"></i><strong>Rekomendasi untuk CEC Rendah:</strong></p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Tambahkan bahan dengan CEC tinggi seperti vermiculite, zeolit, atau biochar</li>';
            analysisHTML += '<li>Pupuk lebih sering dengan dosis rendah untuk mengkompensasi pencucian nutrisi</li>';
            analysisHTML += '<li>Pertimbangkan penggunaan pupuk slow-release</li>';
            analysisHTML += '<li>Tambahkan bahan organik untuk meningkatkan kapasitas menahan nutrisi</li>';
            analysisHTML += '</ul>';
            analysisHTML += '</div>';
        }
        
        // Rekomendasi umum berdasarkan jurnal tanaman
        analysisHTML += '<div class="recommendation-item">';
        analysisHTML += '<p><i class="fas fa-lightbulb me-2"></i><strong>Rekomendasi Umum Berdasarkan Jurnal Tanaman:</strong></p>';
        analysisHTML += '<ul>';
        analysisHTML += '<li>Media tanam ideal untuk tanaman umum memiliki porositas 60-80%, retensi air 40-60%, dan drainase 40-60%</li>';
        analysisHTML += '<li>pH optimal untuk penyerapan nutrisi adalah 5.5-6.5 untuk sebagian besar tanaman</li>';
        analysisHTML += '<li>Kapasitas Tukar Kation (CEC) optimal adalah 20-40 meq/100g untuk media tanam</li>';
        analysisHTML += '<li>Gunakan campuran bahan organik dan anorganik untuk menyeimbangkan sifat fisik dan kimia media</li>';
        analysisHTML += '<li>Pemantauan rutin kondisi media sangat penting untuk kesehatan tanaman jangka panjang</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        analysisHTML += '</div>';
        
        analysisContent.html(analysisHTML);
    }
    
    // Reset simulasi
    function resetSimulation() {
        $('#water-volume-input').val(1000);
        $('#watering-duration-input').val(20);
        $('#simulation-result').hide();
        $('#media-properties').hide();
        $('#analysis-card').hide();
        $('#water-level-enhanced').css('height', '0%');
        $('#media-composition-enhanced').empty();
        showSnackbar('Simulasi berhasil direset');
    }
    
    // Simpan komposisi
    function saveComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk disimpan.');
            return;
        }
        
        showCustomPrompt('Simpan Komposisi', 'Masukkan nama untuk komposisi ini:', function(name) {
            if (!name) {
                showCustomAlert('Peringatan', 'Nama komposisi tidak boleh kosong.');
                return;
            }
            
            const savedCompositions = getSavedCompositions();
            
            // Simpan hanya nama dan portion untuk menghemat storage
            const simplifiedComposition = composition.map(item => ({
                name: item.name,
                portion: item.portion
            }));
            
            const newComposition = {
                id: Date.now(),
                name: name,
                date: new Date().toLocaleDateString('id-ID'),
                composition: simplifiedComposition
            };
            
            savedCompositions.push(newComposition);
            localStorage.setItem('savedCompositions', JSON.stringify(savedCompositions));
            
            showSnackbar('Komposisi berhasil disimpan');
        });
    }
    
    // Lihat komposisi tersimpan
    function viewSavedCompositions() {
        const savedCompositions = getSavedCompositions();
        const container = $('#savedCompositionsList');
        container.empty();
        
        if (savedCompositions.length === 0) {
            container.append($('<p>').addClass('text-center text-muted p-4').text('Belum ada komposisi tersimpan'));
            return;
        }
        
        // Urutkan komposisi berdasarkan nama (case-insensitive)
        savedCompositions.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        
        savedCompositions.forEach(comp => {
            const item = $('<div>').addClass('saved-composition-item');
            
            const info = $('<div>').addClass('saved-composition-info');
            info.append($('<h6>').text(comp.name));
            info.append($('<span>').addClass('saved-date').text(comp.date));
            
            const actions = $('<div>').addClass('saved-composition-actions');
            
            const loadBtn = $('<button>').addClass('btn btn-sm btn-primary me-1')
                .html('<i class="fas fa-upload"></i>')
                .attr('title', 'Load komposisi')
                .click(() => {
                    // Load komposisi: cari data lengkap dari defaultMaterials berdasarkan nama
                    composition = [];
                    comp.composition.forEach(savedItem => {
                        const material = defaultMaterials.find(m => m.name === savedItem.name);
                        if (material) {
                            composition.push({
                                ...material,
                                portion: savedItem.portion
                            });
                        }
                    });
                    renderComposition();
                    updateTotalPortion();
                    hideModal($('#savedModal'));
                    showSnackbar('Komposisi berhasil dimuat');
                });
            
            const deleteBtn = $('<button>').addClass('btn btn-sm btn-outline-danger')
                .html('<i class="fas fa-trash"></i>')
                .attr('title', 'Hapus komposisi')
                .click(() => {
                    showCustomConfirm('Konfirmasi Hapus', 'Apakah Anda yakin ingin menghapus komposisi ini?', function(confirmed) {
                        if (confirmed) {
                            const updatedCompositions = savedCompositions.filter(c => c.id !== comp.id);
                            localStorage.setItem('savedCompositions', JSON.stringify(updatedCompositions));
                            viewSavedCompositions();
                            showSnackbar('Komposisi berhasil dihapus');
                        }
                    });
                });
            
            actions.append(loadBtn, deleteBtn);
            item.append(info, actions);
            container.append(item);
        });
        
        showModal($('#savedModal'));
    }
    
    // Dapatkan komposisi tersimpan dari localStorage
    function getSavedCompositions() {
        const saved = localStorage.getItem('savedCompositions');
        return saved ? JSON.parse(saved) : [];
    }
    
    // Load komposisi dari localStorage saat inisialisasi
    function loadCompositionsFromStorage() {
        // Tidak ada yang perlu dilakukan di sini karena kita hanya menggunakan savedCompositions untuk tampilan
    }
    
    // Import komposisi
    function importComposition() {
        showModal($('#importCompositionModal'));
    }
    
    // Import komposisi dari file
    function importCompositionFromFile() {
        const fileInput = $('#importCompositionFile')[0];
        
        if (!fileInput.files.length) {
            showCustomAlert('Peringatan', 'Pilih file terlebih dahulu.');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!Array.isArray(data)) {
                    showCustomAlert('Error', 'Format file tidak valid. File harus berupa array komposisi.');
                    return;
                }
                
                // Map data import menjadi data lengkap dari defaultMaterials
                composition = [];
                data.forEach(item => {
                    const material = defaultMaterials.find(m => m.name === item.name);
                    if (material) {
                        composition.push({
                            ...material,
                            portion: item.portion
                        });
                    }
                });
                
                renderComposition();
                updateTotalPortion();
                hideModal($('#importCompositionModal'));
                showSnackbar('Komposisi berhasil diimport');
            } catch (error) {
                showCustomAlert('Error', 'Terjadi kesalahan saat membaca file: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }
    
    // Export komposisi ke file JSON
    function exportComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk diexport.');
            return;
        }
        
        // Simpan hanya nama dan portion untuk file export
        const simplifiedComposition = composition.map(item => ({
            name: item.name,
            portion: item.portion
        }));
        
        const dataStr = JSON.stringify(simplifiedComposition, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'komposisi_media_tanam.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showSnackbar('Komposisi berhasil diexport');
    }
    
    // Export hasil simulasi ke file teks
    function exportSimulation() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada data simulasi untuk diexport.');
            return;
        }
        
        // Kumpulkan semua informasi untuk diexport
        let content = 'HASIL SIMULASI PENYIRAMAN MEDIA TANAM\n';
        content += '========================================\n\n';
        
        // Informasi ukuran pot
        content += 'INFORMASI UKURAN POT\n';
        content += '--------------------\n';
        content += 'Diameter Pot: ' + $('#pot-diameter').val() + ' cm\n';
        content += 'Tinggi Pot: ' + $('#pot-height').val() + ' cm\n';
        content += 'Media dalam Pot: ' + $('#media-percentage').val() + '%\n\n';
        
        // Informasi komposisi media tanam
        content += 'INFORMASI KOMPOSISI MEDIA TANAM\n';
        content += '------------------------------\n';
        content += 'Total Bagian: ' + $('#total-percentage').text() + '\n\n';
        
        composition.forEach(item => {
            if (item.portion > 0) {
                content += '- ' + item.name + ': ' + item.portion + ' bagian\n';
            }
        });
        content += '\n';
        
        // Informasi hasil simulasi
        content += 'HASIL SIMULASI\n';
        content += '--------------\n';
        content += 'Volume Air yang Digunakan: ' + $('#water-volume').text() + '\n';
        content += 'Durasi Penyiraman: ' + $('#watering-duration').text() + '\n';
        content += 'Volume Pot: ' + $('#pot-volume').text() + '\n';
        content += 'Volume Media: ' + $('#media-volume').text() + '\n';
        content += 'Air yang Tertahan di Media: ' + $('#retained-water-value').text() + '\n';
        content += 'Air yang Terserap Media: ' + $('#absorbed-water-percentage').text() + '\n';
        content += 'Air yang Mengalir Keluar: ' + $('#drained-water-value').text() + '\n';
        content += 'Kebasahan Media: ' + $('#media-wetness').text() + '\n\n';
        
        // Informasi analisis media & rekomendasi
        content += 'ANALISIS MEDIA & REKOMENDASI\n';
        content += '============================\n\n';
        
        // Ambil konten dari analisis
        const analysisContent = $('#analysis-content').clone();
        
        // Hapus elemen HTML yang tidak perlu
        analysisContent.find('.icon-tooltip, .tooltip-text, i').remove();
        
        // Ambil teks dari setiap bagian
        const sections = analysisContent.find('h6, p, ul, li, div');
        
        sections.each(function() {
            const $this = $(this);
            const text = $this.text().trim();
            
            if (text && $this.is('h6')) {
                content += '\n' + text.toUpperCase() + '\n';
                content += '-'.repeat(text.length) + '\n';
            } else if (text && ($this.is('p') || $this.is('li'))) {
                content += text + '\n';
            }
        });
        
        // Buat file teks
        const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'hasil_simulasi.txt');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        showSnackbar('Hasil simulasi berhasil diexport');
    }
    
    
    // Pastikan animasi tanaman selalu berjalan
    function ensurePlantAnimation() {
        const plantGroup = document.querySelector('.plant-group');
        if (plantGroup) {
            plantGroup.style.animationPlayState = 'running';
        }
    }

    // Jalankan inisialisasi aplikasi
    initApp();
});
