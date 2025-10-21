$(document).ready(function() {
    // Data bahan baku dari file JSON yang diberikan
    const defaultMaterials = [
        { id: 1, name: "Sekam Padi Mentah", portion: 0, retention: 35.3, drainage: 64.7, porosity: 77.0, ph: 6.8, cec: 10, nutrient_N_percent: 0.45, nutrient_P_percent: 0.15, nutrient_K_percent: 0.6, nutrient_Ca_percent: 0.1, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.08, nutrient_Fe_ppm: 200, nutrient_Mn_ppm: 800, nutrient_Zn_ppm: 15, nutrient_Cu_ppm: 5, nutrient_B_ppm: 8, description: "Kulit biji padi tanpa pengolahan. Sangat ringan, berfungsi utama untuk meningkatkan porositas dan aerasi. Cepat lapuk dan berisiko membawa patogen. Retensi air rendah dan drainase sangat tinggi." },
        { id: 2, name: "Sekam Padi Mentah (Fermentasi)", portion: 0, retention: 50, drainage: 50, porosity: 80.0, ph: 6.5, cec: 18, nutrient_N_percent: 0.6, nutrient_P_percent: 0.2, nutrient_K_percent: 0.7, nutrient_Ca_percent: 0.15, nutrient_Mg_percent: 0.18, nutrient_S_percent: 0.1, nutrient_Fe_ppm: 250, nutrient_Mn_ppm: 850, nutrient_Zn_ppm: 20, nutrient_Cu_ppm: 7, nutrient_B_ppm: 10, description: "Sekam mentah yang telah melalui proses dekomposisi oleh mikroorganisme. Proses ini menstabilkan bahan, mengurangi risiko patogen, dan membuat beberapa unsur hara lebih tersedia. Sifat fisik sedikit membaik dibandingkan sekam mentah." },
        { id: 3, name: "Sekam Padi Mentah (Oven)", portion: 0, retention: 40, drainage: 60, porosity: 82.0, ph: 7.0, cec: 12, nutrient_N_percent: 0.4, nutrient_P_percent: 0.15, nutrient_K_percent: 0.6, nutrient_Ca_percent: 0.1, nutrient_Mg_percent: 0.12, nutrient_S_percent: 0.08, nutrient_Fe_ppm: 200, nutrient_Mn_ppm: 800, nutrient_Zn_ppm: 15, nutrient_Cu_ppm: 5, nutrient_B_ppm: 8, description: "Sekam mentah yang dipanaskan dalam oven untuk sterilisasi. Proses ini membunuh patogen jamur dan bakteri. Sifat fisik dan kimianya tidak banyak berubah dari sekam mentah, namun menjadi lebih steril." },
        { id: 4, name: "Arang Sekam Padi", portion: 0, retention: 54.1, drainage: 45.9, porosity: 85.0, ph: 7.8, cec: 45.8, nutrient_N_percent: 0.1, nutrient_P_percent: 0.35, nutrient_K_percent: 1.5, nutrient_Ca_percent: 0.2, nutrient_Mg_percent: 0.15, nutrient_S_percent: 0.12, nutrient_Fe_ppm: 300, nutrient_Mn_ppm: 500, nutrient_Zn_ppm: 30, nutrient_Cu_ppm: 10, nutrient_B_ppm: 20, description: "Sekam padi yang dibakar secara tidak sempurna (pirolisis). Sangat porous, steril, dan tidak mudah lapuk. Sangat baik untuk drainase dan aerasi. pH cenderung basa/alkalis. Memiliki KTK yang baik dan kaya akan Kalium dan Silika." },
        { id: 5, name: "Humus Daun Bambu (Fermentasi)", portion: 0, retention: 62, drainage: 38, porosity: 65, ph: 6.2, cec: 25, nutrient_N_percent: 1.2, nutrient_P_percent: 0.4, nutrient_K_percent: 0.8, nutrient_Ca_percent: 1.0, nutrient_Mg_percent: 0.5, nutrient_S_percent: 0.2, nutrient_Fe_ppm: 1000, nutrient_Mn_ppm: 400, nutrient_Zn_ppm: 50, nutrient_Cu_ppm: 15, nutrient_B_ppm: 25, description: "Hasil dekomposisi serasah daun bambu. Kaya akan Silika (Si) yang memperkuat sel tanaman. Memiliki struktur yang gembur, retensi air baik, dan kaya akan mikroorganisme yang bermanfaat bagi tanah." },
        { id: 6, name: "Humus Daun Kaliandra (Fermentasi)", portion: 0, retention: 65, drainage: 35, porosity: 70, ph: 5.8, cec: 28, nutrient_N_percent: 2.8, nutrient_P_percent: 0.5, nutrient_K_percent: 1.0, nutrient_Ca_percent: 1.2, nutrient_Mg_percent: 0.6, nutrient_S_percent: 0.25, nutrient_Fe_ppm: 1200, nutrient_Mn_ppm: 450, nutrient_Zn_ppm: 60, nutrient_Cu_ppm: 20, nutrient_B_ppm: 30, description: "Humus dari daun Calliandra calothyrsus, sejenis legum. Karena sifatnya sebagai legum, humus ini cenderung kaya akan Nitrogen. Sangat baik sebagai komponen penyubur media tanam." },
        { id: 7, name: "Humus Andam (Fermentasi)", portion: 0, retention: 65, drainage: 35, porosity: 70, ph: 5.7, cec: 30, nutrient_N_percent: 1.5, nutrient_P_percent: 0.3, nutrient_K_percent: 0.6, nutrient_Ca_percent: 0.8, nutrient_Mg_percent: 0.4, nutrient_S_percent: 0.18, nutrient_Fe_ppm: 900, nutrient_Mn_ppm: 300, nutrient_Zn_ppm: 40, nutrient_Cu_ppm: 12, nutrient_B_ppm: 20, description: "Humus yang berasal dari dekomposisi serasah daun dan ranting dari tanaman paku-pakuan hutan (Gleichenia linearis). Memiliki struktur yang sangat baik, gembur, dan kaya bahan organik, namun cenderung lebih asam." },
        { id: 8, name: "Akar Pakis Cacah (Oven)", portion: 0, retention: 58.0, drainage: 42.0, porosity: 75, ph: 5.5, cec: 20, nutrient_N_percent: 0.2, nutrient_P_percent: 0.05, nutrient_K_percent: 0.3, nutrient_Ca_percent: 0.1, nutrient_Mg_percent: 0.08, nutrient_S_percent: 0.05, nutrient_Fe_ppm: 150, nutrient_Mn_ppm: 50, nutrient_Zn_ppm: 10, nutrient_Cu_ppm: 4, nutrient_B_ppm: 5, description: "Potongan akar dari tanaman paku tiang. Strukturnya stabil, tidak mudah lapuk, serta memiliki aerasi dan drainase yang sangat baik sambil tetap mampu menahan kelembaban. Proses oven bertujuan untuk sterilisasi." },
        { id: 9, name: "Biji Kapuk / Klenteng (Oven)", portion: 0, retention: 30, drainage: 70, porosity: 55, ph: 6.1, cec: 15, nutrient_N_percent: 0.7, nutrient_P_percent: 0.3, nutrient_K_percent: 0.5, nutrient_Ca_percent: 0.2, nutrient_Mg_percent: 0.2, nutrient_S_percent: 0.1, nutrient_Fe_ppm: 50, nutrient_Mn_ppm: 20, nutrient_Zn_ppm: 15, nutrient_Cu_ppm: 5, nutrient_B_ppm: 10, description: "Biji dari buah kapuk. Berfungsi sebagai bahan penambah porositas dan drainase. Cukup ringan namun tidak menahan banyak air. Kandungan nutrisinya rendah." },
        { id: 10, name: "Cocopeat (Fermentasi)", portion: 0, retention: 80.0, drainage: 20.0, porosity: 94.0, ph: 6.0, cec: 40, nutrient_N_percent: 0.5, nutrient_P_percent: 0.1, nutrient_K_percent: 1.2, nutrient_Ca_percent: 0.4, nutrient_Mg_percent: 0.3, nutrient_S_percent: 0.1, nutrient_Fe_ppm: 80, nutrient_Mn_ppm: 15, nutrient_Zn_ppm: 8, nutrient_Cu_ppm: 20, nutrient_B_ppm: 5, description: "Sabut kelapa giling halus. Daya serap air sangat tinggi. Porositas juga sangat baik. Perlu diwaspadai kandungan tanin dan garam (NaCl) yang tinggi jika tidak diolah dengan baik (pencucian/buffering). Fermentasi membantu mengurangi zat tanin." },
        { id: 11, name: "Cocofiber", portion: 0, retention: 42.0, drainage: 58.0, porosity: 80, ph: 5.8, cec: 25, nutrient_N_percent: 0.2, nutrient_P_percent: 0.05, nutrient_K_percent: 0.8, nutrient_Ca_percent: 0.2, nutrient_Mg_percent: 0.15, nutrient_S_percent: 0.05, nutrient_Fe_ppm: 40, nutrient_Mn_ppm: 10, nutrient_Zn_ppm: 5, nutrient_Cu_ppm: 10, nutrient_B_ppm: 3, description: "Serat kasar dari sabut kelapa. Berbeda dengan cocopeat, cocofiber tidak menahan banyak air. Fungsinya adalah menciptakan rongga udara besar dalam media, sangat baik untuk aerasi dan drainase." },
        { id: 12, name: "Perlite", portion: 0, retention: 35.0, drainage: 65.0, porosity: 90, ph: 7.2, cec: 1.5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, description: "Batuan silika vulkanik yang dipanaskan hingga mengembang. Sangat ringan, steril, dan pH netral. Tidak menyumbang unsur hara. Fungsinya murni untuk meningkatkan aerasi dan drainase media tanam secara signifikan." },
        { id: 13, name: "Pasir Malang", portion: 0, retention: 25.4, drainage: 74.6, porosity: 50, ph: 6.9, cec: 7.3, nutrient_N_percent: 0.0, nutrient_P_percent: 0.01, nutrient_K_percent: 0.02, nutrient_Ca_percent: 0.1, nutrient_Mg_percent: 0.05, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 50, nutrient_Mn_ppm: 10, nutrient_Zn_ppm: 2, nutrient_Cu_ppm: 1, nutrient_B_ppm: 1, description: "Berasal dari lahar atau magma gunung berapi. Partikelnya tajam dan sangat porous. Fungsi utamanya adalah memberatkan media, menciptakan drainase yang sangat baik, dan mencegah media menjadi padat. Steril dan miskin hara." },
        { id: 14, name: "Vermiculite", portion: 0, retention: 65.0, drainage: 35.0, porosity: 85, ph: 7.0, cec: 120, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 2.5, nutrient_Ca_percent: 1.0, nutrient_Mg_percent: 5.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 200, nutrient_Mn_ppm: 20, nutrient_Zn_ppm: 5, nutrient_Cu_ppm: 2, nutrient_B_ppm: 2, description: "Mineral mika yang dipanaskan hingga mengembang. Mampu menyerap air dan nutrisi dalam jumlah besar (retensi tinggi) dan melepaskannya secara perlahan. Memiliki KTK yang sangat tinggi. Baik untuk menjaga kelembaban dan nutrisi." },
        { id: 15, name: "Zeolit", portion: 0, retention: 40.0, drainage: 60.0, porosity: 60, ph: 7.5, cec: 150, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 1.8, nutrient_Ca_percent: 2.5, nutrient_Mg_percent: 0.5, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 100, nutrient_Mn_ppm: 15, nutrient_Zn_ppm: 5, nutrient_Cu_ppm: 1, nutrient_B_ppm: 1, description: "Mineral aluminosilikat dengan struktur berongga. Memiliki KTK sangat tinggi, mampu menyerap dan melepaskan kation (hara) dan air secara perlahan. Juga dapat mengikat amonia dan logam berat. Baik sebagai 'slow-release fertilizer' alami." },
        { id: 16, name: "Top Soil", portion: 0, retention: 45, drainage: 55, porosity: 50, ph: 6.5, cec: 15, nutrient_N_percent: 0.15, nutrient_P_percent: 0.06, nutrient_K_percent: 0.2, nutrient_Ca_percent: 0.5, nutrient_Mg_percent: 0.2, nutrient_S_percent: 0.05, nutrient_Fe_ppm: 500, nutrient_Mn_ppm: 100, nutrient_Zn_ppm: 30, nutrient_Cu_ppm: 10, nutrient_B_ppm: 15, description: "Lapisan tanah atas, umumnya jenis lempung berpasir. Sifatnya sangat bervariasi tergantung lokasi. Digunakan sebagai 'badan' media tanam. Cenderung padat jika tidak dicampur dengan bahan lain, namun merupakan sumber hara mikro yang beragam." },
        { id: 17, name: "Pupuk Kandang Kambing (Fermentasi)", portion: 0, retention: 60, drainage: 40, porosity: 65, ph: 7.2, cec: 55, nutrient_N_percent: 2.5, nutrient_P_percent: 0.8, nutrient_K_percent: 2.2, nutrient_Ca_percent: 1.5, nutrient_Mg_percent: 0.6, nutrient_S_percent: 0.4, nutrient_Fe_ppm: 1500, nutrient_Mn_ppm: 350, nutrient_Zn_ppm: 200, nutrient_Cu_ppm: 40, nutrient_B_ppm: 45, description: "Kotoran kambing yang telah terdekomposisi sempurna (matang). Berbentuk granul, cenderung kering. Merupakan sumber hara makro (terutama N dan K) dan mikro yang sangat baik. Memperbaiki struktur tanah dan aktivitas mikroba." },
        { id: 18, name: "Vermicompost (Kascing)", portion: 0, retention: 70.0, drainage: 30.0, porosity: 75, ph: 6.8, cec: 80, nutrient_N_percent: 1.8, nutrient_P_percent: 1.2, nutrient_K_percent: 1.5, nutrient_Ca_percent: 2.0, nutrient_Mg_percent: 0.7, nutrient_S_percent: 0.5, nutrient_Fe_ppm: 2000, nutrient_Mn_ppm: 500, nutrient_Zn_ppm: 250, nutrient_Cu_ppm: 50, nutrient_B_ppm: 30, description: "Pupuk organik hasil pencernaan cacing tanah. Memiliki tekstur remah yang sangat baik, kaya akan hara siap serap, enzim, dan hormon pertumbuhan. Dianggap sebagai salah satu pupuk organik terbaik untuk kesuburan tanah." },
        { id: 19, name: "Arang Kayu", portion: 0, retention: 25, drainage: 75, porosity: 80, ph: 8.5, cec: 20, nutrient_N_percent: 0.05, nutrient_P_percent: 0.1, nutrient_K_percent: 0.8, nutrient_Ca_percent: 0.5, nutrient_Mg_percent: 0.2, nutrient_S_percent: 0.05, nutrient_Fe_ppm: 400, nutrient_Mn_ppm: 200, nutrient_Zn_ppm: 25, nutrient_Cu_ppm: 8, nutrient_B_ppm: 15, description: "Potongan kayu yang dibakar dengan proses pirolisis. Sangat porous dan stabil (tidak lapuk). Meningkatkan aerasi dan drainase secara drastis. pH sangat basa, perlu diperhatikan penggunaannya. Sumber Kalium yang baik." },
        { id: 20, name: "Rockwool", portion: 0, retention: 80.0, drainage: 20.0, porosity: 95, ph: 7.0, cec: 5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, description: "Bahan anorganik terbuat dari batuan basalt yang dilelehkan dan disentrifugal menjadi serat. Kapasitas menahan air dan udara sangat tinggi. Steril dan inert (tidak mengandung hara). Umum digunakan untuk persemaian dan hidroponik." },
        { id: 21, name: "Kerikil", portion: 0, retention: 5, drainage: 95, porosity: 40, ph: 7.1, cec: 1, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, description: "Batuan kecil (agregat kasar). Tidak menahan air dan hara sama sekali. Fungsinya murni untuk drainase, sebagai lapisan dasar pot untuk mencegah penyumbatan lubang drainase, atau sebagai pemberat media." },
        { id: 22, name: "Pasir Sungai", portion: 0, retention: 15.0, drainage: 85.0, porosity: 45, ph: 7.0, cec: 2, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 10, nutrient_Mn_ppm: 2, nutrient_Zn_ppm: 1, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, description: "Agregat halus dari sungai. Sangat baik untuk meningkatkan drainase dan mencegah pemadatan media. Retensi air dan KTK sangat rendah. Harus dicuci bersih untuk menghilangkan lumpur dan garam potensial." },
        { id: 23, name: "Hydroton", portion: 0, retention: 45, drainage: 55, porosity: 80, ph: 7.0, cec: 5, nutrient_N_percent: 0.0, nutrient_P_percent: 0.0, nutrient_K_percent: 0.0, nutrient_Ca_percent: 0.0, nutrient_Mg_percent: 0.0, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 0, nutrient_Mn_ppm: 0, nutrient_Zn_ppm: 0, nutrient_Cu_ppm: 0, nutrient_B_ppm: 0, description: "Lempung yang dibakar dalam bentuk pelet bulat (LECA - Lightweight Expanded Clay Aggregate). Ringan, porous, dan pH netral. Dapat menahan air di dalam strukturnya sambil menyediakan aerasi yang baik di antara pelet. Dapat digunakan kembali." },
        { id: 24, name: "Spagnum Peat Moss", portion: 0, retention: 90.0, drainage: 10.0, porosity: 90, ph: 4.0, cec: 110, nutrient_N_percent: 0.8, nutrient_P_percent: 0.1, nutrient_K_percent: 0.15, nutrient_Ca_percent: 0.2, nutrient_Mg_percent: 0.1, nutrient_S_percent: 0.2, nutrient_Fe_ppm: 50, nutrient_Mn_ppm: 20, nutrient_Zn_ppm: 5, nutrient_Cu_ppm: 2, nutrient_B_ppm: 1, description: "Bahan organik dari dekomposisi lumut Sphagnum. Daya tahan airnya luar biasa. Sangat asam (pH rendah), sehingga sering perlu ditambahkan kapur (dolomit). Miskin unsur hara namun kondisioner media yang sangat baik." },
        { id: 25, name: "Biochar", portion: 0, retention: 70, drainage: 30, porosity: 85, ph: 8.0, cec: 50, nutrient_N_percent: 0.1, nutrient_P_percent: 0.2, nutrient_K_percent: 1.0, nutrient_Ca_percent: 0.8, nutrient_Mg_percent: 0.3, nutrient_S_percent: 0.1, nutrient_Fe_ppm: 500, nutrient_Mn_ppm: 300, nutrient_Zn_ppm: 40, nutrient_Cu_ppm: 15, nutrient_B_ppm: 25, description: "Istilah umum untuk arang dari biomassa yang digunakan sebagai amandemen tanah. Sifatnya sangat mirip arang sekam atau arang kayu. Sangat porous, KTK tinggi, pH basa, dan stabil. Sangat baik untuk 'rumah' mikroba dan menahan hara." },
        { id: 26, name: "Pumice", portion: 0, retention: 38, drainage: 62, porosity: 80, ph: 7.2, cec: 4, nutrient_N_percent: 0.0, nutrient_P_percent: 0.01, nutrient_K_percent: 0.05, nutrient_Ca_percent: 0.1, nutrient_Mg_percent: 0.02, nutrient_S_percent: 0.0, nutrient_Fe_ppm: 40, nutrient_Mn_ppm: 8, nutrient_Zn_ppm: 2, nutrient_Cu_ppm: 1, nutrient_B_ppm: 1, description: "Batu apung, batuan vulkanik ringan yang terbentuk dari lava berbuih. Strukturnya sangat berpori, memberikan aerasi dan drainase yang sangat baik. Tidak menyerap banyak air di permukaannya tetapi menahannya di dalam pori-pori. Sangat awet." }
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
        
        // Cek apakah bahan sudah ada di komposisi
        const existing = composition.find(item => item.id === selectedMaterial.id);
        
        if (existing) {
            showCustomAlert('Peringatan', 'Bahan ini sudah ada dalam komposisi.');
            return;
        }
        
        // Jika belum ada, tambahkan dengan bagian default 0
        composition.push({
            id: selectedMaterial.id,
            name: selectedMaterial.name,
            retention: selectedMaterial.retention,
            drainage: selectedMaterial.drainage,
            porosity: selectedMaterial.porosity,
            ph: selectedMaterial.ph,
            cec: selectedMaterial.cec,
            nutrient_N_percent: selectedMaterial.nutrient_N_percent,
            nutrient_P_percent: selectedMaterial.nutrient_P_percent,
            nutrient_K_percent: selectedMaterial.nutrient_K_percent,
            nutrient_Ca_percent: selectedMaterial.nutrient_Ca_percent,
            nutrient_Mg_percent: selectedMaterial.nutrient_Mg_percent,
            nutrient_S_percent: selectedMaterial.nutrient_S_percent,
            nutrient_Fe_ppm: selectedMaterial.nutrient_Fe_ppm,
            nutrient_Mn_ppm: selectedMaterial.nutrient_Mn_ppm,
            nutrient_Zn_ppm: selectedMaterial.nutrient_Zn_ppm,
            nutrient_Cu_ppm: selectedMaterial.nutrient_Cu_ppm,
            nutrient_B_ppm: selectedMaterial.nutrient_B_ppm,
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
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    // $('<i>').addClass('fas fa-atom'),
                    // $('<span>').addClass('tooltip-text').text('Nitrogen (N)')
                    $('<span>').addClass('nutrient-value').text('Nitrogen')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_N_percent + '%')
            ));
            
            // Fosfor
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Fosfor')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_P_percent + '%')
            ));
            
            // Kalium
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Kalium')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_K_percent + '%')
            ));
            
            // Kalsium
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Kalsium')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Ca_percent + '%')
            ));
            
            // Magnesium
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Magnesium')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Mg_percent + '%')
            ));
            
            // Belerang
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Belerang')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_S_percent + '%')
            ));
            
            // Besi
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Besi')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Fe_ppm + ' ppm')
            ));
            
            // Mangan
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Mangan')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Mn_ppm + ' ppm')
            ));
            
            // Seng
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Seng')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Zn_ppm + ' ppm')
            ));
            
            // Tembaga
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Tembaga')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_Cu_ppm + ' ppm')
            ));
            
            // Boron
            nutrients.append($('<div>').addClass('nutrient-item').append(
                $('<div>').addClass('icon-tooltip').append(
                    $('<span>').addClass('nutrient-value').text('Boron')
                ),
                $('<span>').addClass('nutrient-value').text(item.nutrient_B_ppm + ' ppm')
            ));
            
            mainRow.append($('<td>').addClass('text-right').append(nutrients));
            
            // Tombol hapus
            const deleteButton = $('<button>').addClass('delete-btn')
                .html('<i class="fas fa-times"></i>')
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
            "Pumice": "#A9A9A9"
        };
        
        return colorMap[materialName] || "#8B4513"; // Warna default
    }
    
    // Generate analisis dan rekomendasi berdasarkan riset Aglaonema
    function generateAnalysis(retention, drainage, porosity, cec, ph, retainedWater, drainedWater, mediaVolume, totalPortion) {
        const analysisContent = $('#analysis-content');
        analysisContent.empty();
        
        let analysisHTML = '<div class="mb-3">';
        analysisHTML += '<h6><i class="fas fa-chart-line me-2"></i>Analisis Media Tanam Aglaonema Berdasarkan Riset</h6>';
        analysisHTML += '<p>Berdasarkan penelitian tentang media tanam Aglaonema, berikut adalah analisis detail mengenai komposisi media Anda:</p>';
        analysisHTML += '</div>';
        
        // Detail Komposisi Media - dengan ikon dan tooltip
        analysisHTML += '<div class="composition-details">';
        analysisHTML += '<h6><i class="fas fa-list me-2"></i>Detail Komposisi Media</h6>';
        analysisHTML += '<p>Total Volume Media: <strong>' + mediaVolume.toFixed(2) + ' mL</strong></p>';
        analysisHTML += '<table class="composition-detail-table-improved">';
        analysisHTML += '<thead><tr>';
        analysisHTML += '<th width="3%">NO</th>';
        analysisHTML += '<th width="48%">BAHAN</th>';
        analysisHTML += '<th width="3%">BAGIAN</th>';
        analysisHTML += '<th width="12%">VOLUME</th>';
        analysisHTML += '<th width="15%">SIFAT</th>';
        analysisHTML += '<th width="19%">NUTRISI</th>';
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
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Nitrogen</div><span class="nutrient-value">' + item.nutrient_N_percent + '%</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Fosfor</div><span class="nutrient-value">' + item.nutrient_P_percent + '%</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Kalium</div><span class="nutrient-value">' + item.nutrient_K_percent + '%</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Kalsium</div><span class="nutrient-value">' + item.nutrient_Ca_percent + '%</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Magnesium</div><span class="nutrient-value">' + item.nutrient_Mg_percent + '%</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Belerang</div><span class="nutrient-value">' + item.nutrient_S_percent + '%</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Besi</div><span class="nutrient-value">' + item.nutrient_Fe_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Mangan</div><span class="nutrient-value">' + item.nutrient_Mn_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Seng</div><span class="nutrient-value">' + item.nutrient_Zn_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Tembaga</div><span class="nutrient-value">' + item.nutrient_Cu_ppm + ' ppm</span></div>';
                analysisHTML += '<div class="nutrient-item"><div class="icon-tooltip">Boron</div><span class="nutrient-value">' + item.nutrient_B_ppm + ' ppm</span></div>';
                analysisHTML += '</div>';
                analysisHTML += '</td>';
                analysisHTML += '</tr>';
            }
        });
        
        analysisHTML += '</tbody>';
        analysisHTML += '</table>';
        analysisHTML += '</div>';
        analysisHTML += '<div>&nbsp;</div>';
        
        // Analisis berdasarkan jurnal dan riset Aglaonema
        // Sumber jurnal: 
        // 1. "Pengaruh Media Tanam terhadap Pertumbuhan Aglaonema" - Jurnal Hortikultura Indonesia
        // 2. "Optimalisasi Media Tanam untuk Tanaman Hias Daun" - Jurnal Agronomi
        // 3. "Karakteristik Media Tanam Organik untuk Aglaonema" - Jurnal Ilmu Tanah
        
        // Analisis Retensi Air berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-tint me-2"></i>Retensi Air: ' + retention.toFixed(1) + '%</h6>';
        
        // Berdasarkan riset: Aglaonema membutuhkan retensi air 40-60%
        if (retention > 70) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Retensi air terlalu tinggi menurut standar Aglaonema.</strong> Berdasarkan penelitian, retensi air optimal untuk Aglaonema adalah 40-60%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Risiko tinggi untuk pembusukan akar (Pythium dan Phytophthora)</li>';
            analysisHTML += '<li>Media tetap basah terlalu lama, mengurangi aerasi akar</li>';
            analysisHTML += '<li>Kondisi anaerobik dapat berkembang, menghambat penyerapan nutrisi</li>';
            analysisHTML += '<li>Pertumbuhan jamur patogen meningkat</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Daun menguning, pertumbuhan terhambat, akar busuk</p>';
        } else if (retention < 30) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Retensi air rendah untuk kebutuhan Aglaonema.</strong> Menurut penelitian, Aglaonema memerlukan media dengan retensi 40-60%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Frekuensi penyiraman perlu ditingkatkan 2-3x lebih sering</li>';
            analysisHTML += '<li>Risiko dehidrasi pada tanaman, terutama dalam kondisi panas</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci keluar dari media</li>';
            analysisHTML += '<li>Stres air dapat menyebabkan daun layu dan tepi daun mengering</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Daun layu, pertumbuhan lambat, ujung daun kering</p>';
        } else if (retention >= 40 && retention <= 60) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Retensi air optimal untuk Aglaonema.</strong> Sesuai dengan rekomendasi penelitian untuk pertumbuhan optimal.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media dapat menahan air cukup untuk 5-7 hari</li>';
            analysisHTML += '<li>Akar mendapatkan oksigen yang cukup</li>';
            analysisHTML += '<li>Risiko pembusukan akar minimal</li>';
            analysisHTML += '<li>Nutrisi tersedia secara optimal</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan sehat, daun hijau cerah, sistem akar berkembang baik</p>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>Retensi air dalam batas wajar untuk Aglaonema.</strong> Tetapi dapat dioptimalkan ke rentang 40-60%.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan Retensi Air:</strong> Kemampuan media menahan air setelah penyiraman dan drainase. Retensi yang tepat mencegah kekeringan tanpa menyebabkan genangan air.</p>';
        analysisHTML += '</div>';
        
        // Analisis Drainase berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-water me-2"></i>Drainase: ' + drainage.toFixed(1) + '%</h6>';
        
        // Berdasarkan riset: Drainase optimal untuk Aglaonema 40-60%
        if (drainage < 30) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Drainase rendah untuk standar Aglaonema.</strong> Penelitian menunjukkan drainase optimal adalah 40-60%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Air menggenang di dasar pot, meningkatkan risiko busuk akar</li>';
            analysisHTML += '<li>Akar kekurangan oksigen karena kondisi anaerobik</li>';
            analysisHTML += '<li>Garam mineral menumpuk di media</li>';
            analysisHTML += '<li>Pertumbuhan jamur dan bakteri patogen meningkat</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Akar busuk, daun menguning, tanaman layu meski media basah</p>';
        } else if (drainage > 70) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Drainase sangat cepat untuk Aglaonema.</strong> Media akan cepat kering setelah penyiraman.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Frekuensi penyiraman perlu sangat sering</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci sebelum diserap akar</li>';
            analysisHTML += '<li>Media tidak stabil, mudah longsor</li>';
            analysisHTML += '<li>Tanaman rentan terhadap fluktuasi kelembaban</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan terhambat, daun pucat, nutrisi tidak optimal</p>';
        } else if (drainage >= 40 && drainage <= 60) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Drainase optimal untuk Aglaonema.</strong> Sesuai dengan standar penelitian untuk media tanam berkualitas.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Air berlebih dapat mengalir dengan baik</li>';
            analysisHTML += '<li>Media tetap lembab tanpa tergenang</li>';
            analysisHTML += '<li>Akar mendapatkan aerasi yang cukup</li>';
            analysisHTML += '<li>Nutrisi tersimpan dengan baik dalam media</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Sistem perakaran sehat, pertumbuhan optimal, resistensi penyakit tinggi</p>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>Drainase dalam batas dapat diterima.</strong> Tetapi lebih baik dioptimalkan ke rentang 40-60%.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan Drainase:</strong> Kemampuan media mengalirkan air berlebih setelah penyiraman. Drainase yang baik mencegah genangan air dan busuk akar.</p>';
        analysisHTML += '</div>';
        
        // Analisis Porositas berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-wind me-2"></i>Porositas: ' + porosity.toFixed(1) + '%</h6>';
        
        // Berdasarkan riset: Porositas optimal untuk Aglaonema 60-80%
        if (porosity < 50) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Porositas rendah untuk standar Aglaonema.</strong> Penelitian menunjukkan porositas optimal 60-80%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media terlalu padat, menghambat perkembangan akar</li>';
            analysisHTML += '<li>Akar kekurangan oksigen untuk respirasi</li>';
            analysisHTML += '<li>Air tidak merata dalam media</li>';
            analysisHTML += '<li>Drainase terhambat, meningkatkan risiko busuk akar</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan lambat, daun kecil, sistem akar terbatas</p>';
        } else if (porosity > 85) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Porositas sangat tinggi.</strong> Media mungkin terlalu ringan dan tidak stabil.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Media tidak dapat menopang tanaman dengan baik</li>';
            analysisHTML += '<li>Retensi air rendah, cepat kering</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci</li>';
            analysisHTML += '<li>Tanaman mudah roboh</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Tanaman tidak stabil, pertumbuhan tidak optimal, daun pucat</p>';
        } else if (porosity >= 60 && porosity <= 80) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Porositas optimal untuk Aglaonema.</strong> Sesuai dengan penelitian untuk media tanam berkualitas.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Ruang udara cukup untuk respirasi akar</li>';
            analysisHTML += '<li>Media ringan namun stabil</li>';
            analysisHTML += '<li>Air dan nutrisi tersebar merata</li>';
            analysisHTML += '<li>Akar dapat berkembang dengan optimal</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Sistem perakaran luas, pertumbuhan cepat, daun besar dan sehat</p>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>Porositas dalam batas wajar.</strong> Dapat dioptimalkan ke rentang 60-80% untuk hasil terbaik.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan Porositas:</strong> Persentase ruang kosong dalam media yang dapat diisi air atau udara. Porositas tinggi = lebih banyak ruang untuk akar bernapas.</p>';
        analysisHTML += '</div>';
        
        // Analisis pH berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-flask me-2"></i>Tingkat Keasaman (pH): ' + ph.toFixed(1) + '</h6>';
        
        // Berdasarkan riset: pH optimal untuk Aglaonema 5.5-6.5
        if (ph < 5.0) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>pH terlalu asam untuk Aglaonema.</strong> Penelitian menunjukkan pH optimal 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Toksisitas aluminium dan mangan meningkat</li>';
            analysisHTML += '<li>Ketersediaan fosfor, kalsium, dan magnesium menurun</li>';
            analysisHTML += '<li>Aktivitas mikroorganisme menguntungkan terhambat</li>';
            analysisHTML += '<li>Penyerapan nutrisi tidak optimal</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Klorosis daun, pertumbuhan terhambat, nekrosis tepi daun</p>';
        } else if (ph > 7.5) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>pH terlalu basa untuk Aglaonema.</strong> Aglaonema tumbuh optimal pada pH 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Ketersediaan besi, mangan, seng, dan tembaga menurun</li>';
            analysisHTML += '<li>Fosfor terikat dengan kalsium menjadi tidak tersedia</li>';
            analysisHTML += '<li>Beberapa nutrisi mikro menjadi tidak dapat diserap</li>';
            analysisHTML += '<li>Beberapa penyakit jamur lebih aktif pada pH tinggi</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Klorosis interveinal, defisiensi mikronutrien, pertumbuhan lambat</p>';
        } else if (ph >= 5.5 && ph <= 6.5) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>pH optimal untuk Aglaonema.</strong> Sesuai dengan penelitian untuk penyerapan nutrisi maksimal.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Semua nutrisi makro dan mikro tersedia optimal</li>';
            analysisHTML += '<li>Aktivitas mikroorganisme menguntungkan maksimal</li>';
            analysisHTML += '<li>Toksisitas logam berat minimal</li>';
            analysisHTML += '<li>Penyerapan nutrisi oleh akar efisien</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Warna daun cerah, pertumbuhan cepat, resistensi penyakit tinggi</p>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>pH dalam batas dapat diterima.</strong> Tetapi lebih baik dioptimalkan ke rentang 5.5-6.5.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan pH:</strong> Tingkat keasaman atau kebasaan media. pH mempengaruhi ketersediaan nutrisi untuk tanaman.</p>';
        analysisHTML += '</div>';
        
        // Analisis CEC berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-exchange-alt me-2"></i>Kapasitas Tukar Kation (CEC): ' + cec.toFixed(1) + ' meq/100g</h6>';
        
        // Berdasarkan riset: CEC optimal untuk media Aglaonema 20-40 meq/100g
        if (cec < 10) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>CEC rendah untuk media Aglaonema.</strong> Penelitian menunjukkan CEC optimal 20-40 meq/100g.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi sangat terbatas</li>';
            analysisHTML += '<li>Pemupukan perlu dilakukan lebih sering dengan dosis rendah</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci oleh air penyiraman</li>';
            analysisHTML += '<li>Fluktuasi ketersediaan nutrisi tinggi</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Defisiensi nutrisi, pertumbuhan tidak merata, daun pucat</p>';
        } else if (cec > 50) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>CEC tinggi untuk media Aglaonema.</strong> Media dapat menyimpan banyak nutrisi.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Nutrisi tersimpan dengan baik dalam media</li>';
            analysisHTML += '<li>Frekuensi pemupukan dapat dikurangi</li>';
            analysisHTML += '<li>Risiko pencucian nutrisi minimal</li>';
            analysisHTML += '<li>Media dapat menahan kelebihan garam mineral</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Ketersediaan nutrisi stabil, pertumbuhan konsisten, warna daun optimal</p>';
        } else if (cec >= 20 && cec <= 40) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>CEC optimal untuk Aglaonema.</strong> Sesuai dengan penelitian untuk media tanam berkualitas.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi cukup untuk 2-4 minggu</li>';
            analysisHTML += '<li>Nutrisi tersedia secara bertahap sesuai kebutuhan tanaman</li>';
            analysisHTML += '<li>Risiko defisiensi atau kelebihan nutrisi rendah</li>';
            analysisHTML += '<li>Efisiensi penggunaan pupuk tinggi</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan stabil, warna daun cerah, kesehatan tanaman optimal</p>';
        } else {
            analysisHTML += '<p class="text-primary"><i class="fas fa-info-circle me-1"></i><strong>CEC dalam batas dapat diterima.</strong> Tetapi lebih baik dioptimalkan ke rentang 20-40 meq/100g.</p>';
        }
        
        analysisHTML += '<p><strong>Penjelasan CEC:</strong> Kemampuan media menahan dan melepaskan kation nutrisi (K, Ca, Mg, NH4). CEC tinggi = kemampuan menyimpan nutrisi lebih baik.</p>';
        analysisHTML += '</div>';
        
        // Analisis Kandungan dan Kegunaan
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-leaf me-2"></i>Kandungan dan Kegunaan Media</h6>';
        analysisHTML += '<p>Media tanam ini mengandung berbagai nutrisi dan bahan organik yang bermanfaat untuk Aglaonema:</p>';
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
            }
        });
        
        analysisHTML += '<li><strong>Nitrogen (N):</strong> ' + totalNitrogen.toFixed(2) + '% - Esensial untuk pertumbuhan daun dan batang</li>';
        analysisHTML += '<li><strong>Fosfor (P):</strong> ' + totalPhosphorus.toFixed(2) + '% - Penting untuk perkembangan akar dan pembungaan</li>';
        analysisHTML += '<li><strong>Kalium (K):</strong> ' + totalPotassium.toFixed(2) + '% - Meningkatkan ketahanan penyakit dan transportasi nutrisi</li>';
        analysisHTML += '<li><strong>Kalsium (Ca):</strong> ' + totalCalcium.toFixed(2) + '% - Memperkuat dinding sel dan sistem perakaran</li>';
        analysisHTML += '<li><strong>Magnesium (Mg):</strong> ' + totalMagnesium.toFixed(2) + '% - Komponen klorofil untuk fotosintesis</li>';
        analysisHTML += '<li><strong>Sulfur (S):</strong> ' + totalSulfur.toFixed(2) + '% - Penting untuk sintesis protein dan enzim</li>';
        analysisHTML += '<li><strong>Besi (Fe):</strong> ' + totalIron.toFixed(0) + ' ppm - Esensial untuk pembentukan klorofil</li>';
        analysisHTML += '<li><strong>Mangan (Mn):</strong> ' + totalManganese.toFixed(0) + ' ppm - Berperan dalam fotosintesis dan metabolisme nitrogen</li>';
        analysisHTML += '<li><strong>Zinc (Zn):</strong> ' + totalZinc.toFixed(0) + ' ppm - Penting untuk sintesis hormon pertumbuhan</li>';
        analysisHTML += '<li><strong>Tembaga (Cu):</strong> ' + totalCopper.toFixed(0) + ' ppm - Berperan dalam metabolisme karbohidrat dan protein</li>';
        analysisHTML += '<li><strong>Boron (B):</strong> ' + totalBoron.toFixed(0) + ' ppm - Penting untuk pembelahan sel dan perkembangan bunga</li>';
        
        analysisHTML += '</ul>';
        analysisHTML += '<p><strong>Masa Pakai Media:</strong> Berdasarkan komposisi, media ini diperkirakan bertahan 12-18 bulan sebelum perlu diganti. Bahan organik akan terdekomposisi secara bertahap, mengurangi porositas dan meningkatkan kepadatan media.</p>';
        analysisHTML += '</div>';
        
        // Pro dan Kontra
        analysisHTML += '<div class="pros-cons">';
        analysisHTML += '<div class="pros">';
        analysisHTML += '<h6><i class="fas fa-thumbs-up me-2"></i>Kelebihan</h6>';
        analysisHTML += '<ul>';
        
        if (retention >= 40 && retention <= 60) {
            analysisHTML += '<li>Retensi air optimal untuk Aglaonema</li>';
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
        
        analysisHTML += '<li>Komposisi seimbang untuk pertumbuhan Aglaonema</li>';
        analysisHTML += '<li>Mengandung berbagai mikronutrien esensial</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        analysisHTML += '<div class="cons">';
        analysisHTML += '<h6><i class="fas fa-thumbs-down me-2"></i>Kekurangan</h6>';
        analysisHTML += '<ul>';
        
        if (retention < 40 || retention > 60) {
            analysisHTML += '<li>Retensi air tidak optimal untuk Aglaonema</li>';
        }
        if (drainage < 40 || drainage > 60) {
            analysisHTML += '<li>Drainase perlu disesuaikan untuk Aglaonema</li>';
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
        
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        analysisHTML += '</div>';
        analysisHTML += '<div>&nbsp;</div>';
        
        // Rekomendasi berdasarkan riset Aglaonema
        analysisHTML += '<div class="recommendations">';
        analysisHTML += '<h6><i class="fas fa-lightbulb me-2"></i>Rekomendasi untuk Aglaonema</h6>';
        analysisHTML += '<p>Berdasarkan analisis media tanam ini, berikut rekomendasi untuk pertumbuhan Aglaonema yang optimal:</p>';
        analysisHTML += '<ul>';
        
        // Rekomendasi berdasarkan properti media
        if (retention < 40) {
            analysisHTML += '<li>Tambahkan bahan dengan retensi tinggi seperti cocopeat atau vermiculite untuk meningkatkan kemampuan menahan air</li>';
        } else if (retention > 60) {
            analysisHTML += '<li>Tambahkan bahan dengan drainase tinggi seperti pasir malang atau perlite untuk mengurangi retensi air</li>';
        }
        
        if (drainage < 40) {
            analysisHTML += '<li>Tambahkan bahan dengan drainase tinggi seperti arang sekam atau pasir malang untuk meningkatkan aliran air</li>';
        } else if (drainage > 60) {
            analysisHTML += '<li>Tambahkan bahan dengan retensi tinggi seperti cocopeat atau humus untuk mengurangi kecepatan drainase</li>';
        }
        
        if (porosity < 60) {
            analysisHTML += '<li>Tambahkan bahan dengan porositas tinggi seperti perlite atau arang sekam untuk meningkatkan aerasi</li>';
        } else if (porosity > 80) {
            analysisHTML += '<li>Tambahkan bahan dengan struktur lebih padat seperti top soil untuk menstabilkan media</li>';
        }
        
        if (ph < 5.5) {
            analysisHTML += '<li>Tambahkan kapur pertanian (dolomit) untuk menaikkan pH ke rentang optimal</li>';
        } else if (ph > 6.5) {
            analysisHTML += '<li>Tambahkan belerang atau peat moss untuk menurunkan pH ke rentang optimal</li>';
        }
        
        if (cec < 20) {
            analysisHTML += '<li>Tambahkan bahan dengan CEC tinggi seperti zeolit atau vermiculite untuk meningkatkan kemampuan menyimpan nutrisi</li>';
        }
        
        if (totalNitrogen < 0.5) {
            analysisHTML += '<li>Tambahkan pupuk kandang atau vermicompost untuk meningkatkan kandungan nitrogen</li>';
        }
        
        if (totalPhosphorus < 0.2) {
            analysisHTML += '<li>Gunakan pupuk fosfat atau bahan dengan kandungan fosfor tinggi seperti rock phosphate</li>';
        }
        
        analysisHTML += '<li>Siram Aglaonema 1-2 kali seminggu, sesuaikan dengan kondisi lingkungan</li>';
        analysisHTML += '<li>Berikan pupuk lengkap dengan rasio N-P-K 3-1-2 setiap 4-6 minggu selama musim tanam</li>';
        analysisHTML += '<li>Pastikan pot memiliki lubang drainase yang cukup</li>';
        analysisHTML += '<li>Ganti media setiap 12-18 bulan untuk menjaga kualitas</li>';
        analysisHTML += '<li>Letakkan Aglaonema di tempat dengan cahaya terang tidak langsung</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        analysisContent.html(analysisHTML);
    }
    
    // Reset simulasi
    function resetSimulation() {
        $('#simulation-result').slideUp();
        $('#media-properties').slideUp();
        $('#analysis-card').slideUp();
        $('#water-level-enhanced').css('height', '0%');
        $('#watering-animation-enhanced').css('height', '0%');
        $('#drainage-animation-enhanced').css('height', '0%');
        $('#media-composition-enhanced').empty().css('height', '0%');
        
        showSnackbar('Simulasi berhasil direset');
    }
    
    // Simpan komposisi ke localStorage
    function saveComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk disimpan.');
            return;
        }
        
        const totalPortion = composition.reduce((sum, item) => sum + item.portion, 0);
        if (totalPortion === 0) {
            showCustomAlert('Peringatan', 'Total bagian tidak boleh 0. Atur bagian untuk setiap bahan.');
            return;
        }
        
        showCustomPrompt('Simpan Komposisi', 'Masukkan nama untuk komposisi ini:', function(name) {
            if (!name) {
                showCustomAlert('Peringatan', 'Nama komposisi tidak boleh kosong.');
                return;
            }
            
            const savedCompositions = JSON.parse(localStorage.getItem('aglaonemaCompositions') || '[]');
            
            // Cek apakah nama sudah ada
            const existing = savedCompositions.find(comp => comp.name === name);
            if (existing) {
                showCustomConfirm('Konfirmasi', 'Komposisi dengan nama ini sudah ada. Apakah Anda ingin menimpanya?', function(confirmed) {
                    if (confirmed) {
                        // Timpa komposisi yang sudah ada
                        const index = savedCompositions.findIndex(comp => comp.name === name);
                        savedCompositions[index] = {
                            name: name,
                            composition: composition,
                            date: new Date().toISOString()
                        };
                        
                        localStorage.setItem('aglaonemaCompositions', JSON.stringify(savedCompositions));
                        showSnackbar('Komposisi berhasil diperbarui');
                    }
                });
            } else {
                // Tambahkan komposisi baru
                savedCompositions.push({
                    name: name,
                    composition: composition,
                    date: new Date().toISOString()
                });
                
                localStorage.setItem('aglaonemaCompositions', JSON.stringify(savedCompositions));
                showSnackbar('Komposisi berhasil disimpan');
            }
        });
    }
    
    // Muat komposisi dari localStorage
    function loadCompositionsFromStorage() {
        return JSON.parse(localStorage.getItem('aglaonemaCompositions') || '[]');
    }
    
    // Lihat komposisi tersimpan
    function viewSavedCompositions() {
        const savedCompositions = loadCompositionsFromStorage();
        const container = $('#savedCompositionsList');
        container.empty();
        
        if (savedCompositions.length === 0) {
            container.append($('<p>').addClass('text-center text-muted').text('Belum ada komposisi tersimpan'));
            showModal($('#savedModal'));
            return;
        }
        
        savedCompositions.forEach((comp, index) => {
            const compItem = $('<div>').addClass('saved-composition-item');
            
            const name = $('<div>').addClass('saved-comp-name').text(comp.name);
            const date = $('<div>').addClass('saved-comp-date').text(new Date(comp.date).toLocaleDateString('id-ID'));
            
            const actions = $('<div>').addClass('saved-comp-actions');
            
            const loadBtn = $('<button>').addClass('btn btn-sm btn-outline-primary me-1')
                .html('<i class="fas fa-upload me-1"></i>Muat')
                .click(() => {
                    composition = [...comp.composition];
                    renderComposition();
                    updateTotalPortion();
                    hideModal($('#savedModal'));
                    showSnackbar('Komposisi ' + comp.name + ' berhasil dimuat');
                });
            
            const deleteBtn = $('<button>').addClass('btn btn-sm btn-outline-danger')
                .html('<i class="fas fa-trash me-1"></i>Hapus')
                .click(() => {
                    showCustomConfirm('Konfirmasi', 'Apakah Anda yakin ingin menghapus komposisi ' + comp.name + '?', function(confirmed) {
                        if (confirmed) {
                            const updatedCompositions = savedCompositions.filter((_, i) => i !== index);
                            localStorage.setItem('aglaonemaCompositions', JSON.stringify(updatedCompositions));
                            viewSavedCompositions();
                            showSnackbar('Komposisi berhasil dihapus');
                        }
                    });
                });
            
            actions.append(loadBtn, deleteBtn);
            compItem.append(name, date, actions);
            container.append(compItem);
        });
        
        showModal($('#savedModal'));
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
                const importedData = JSON.parse(e.target.result);
                
                // Validasi data
                if (!Array.isArray(importedData)) {
                    throw new Error('Format file tidak valid');
                }
                
                // Reset komposisi saat ini dan muat yang baru
                composition = [...importedData];
                renderComposition();
                updateTotalPortion();
                
                hideModal($('#importCompositionModal'));
                showSnackbar('Komposisi berhasil diimpor');
            } catch (error) {
                showCustomAlert('Error', 'File tidak valid: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }
    
    // Export komposisi
    function exportComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk diexport.');
            return;
        }
        
        const dataStr = JSON.stringify(composition, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'komposisi-aglaonema.json';
        
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
        
        // Kumpulkan semua informasi yang diperlukan
        let content = 'HASIL SIMULASI PENYIRAMAN MEDIA TANAM AGLAONEMA\n';
        content += '==================================================\n\n';
        
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
        
        // Sifat media
        content += 'SIFAT MEDIA CAMPURAN (RATA-RATA TERTIMBANG)\n';
        content += '--------------------------------------------\n';
        content += 'Retensi Media: ' + $('#avg-retention').text() + '\n';
        content += 'Drainase Media: ' + $('#avg-drainage').text() + '\n';
        content += 'Porositas Media: ' + $('#avg-porosity').text() + '\n';
        content += 'pH Media: ' + $('#avg-ph').text() + '\n';
        content += 'CEC Media: ' + $('#avg-cec').text() + '\n\n';
        
        // Detail komposisi media
        content += 'DETAIL KOMPOSISI MEDIA\n';
        content += '---------------------\n';
        content += 'Total Volume Media: ' + $('#media-volume').text() + '\n\n';
        
        content += 'TABEL KOMPOSISI:\n';
        content += 'Nama Bahan | Bagian | Volume (mL) | Persentase | Retensi Air | Drainase | Porositas | pH | CEC | N | P | K | Ca | Mg | S | Fe | Mn | Zn | Cu | B\n';
        content += '--------------------------------------------------------------------------------------------------------------------------------------------------------\n';
        
        const totalPortion = composition.reduce((sum, item) => sum + item.portion, 0);
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? ((item.portion / totalPortion) * 100).toFixed(2) : 0;
                const itemVolume = parseFloat($('#media-volume').text()) * (percentage / 100);
                content += item.name + ' | ' + item.portion + ' | ' + itemVolume.toFixed(2) + ' | ' + percentage + '% | ' + 
                          item.retention + '% | ' + item.drainage + '% | ' + item.porosity + '% | ' + 
                          item.ph.toFixed(1) + ' | ' + item.cec.toFixed(2) + ' | ' +
                          item.nutrient_N_percent + '% | ' + item.nutrient_P_percent + '% | ' + item.nutrient_K_percent + '% | ' +
                          item.nutrient_Ca_percent + '% | ' + item.nutrient_Mg_percent + '% | ' + item.nutrient_S_percent + '% | ' +
                          item.nutrient_Fe_ppm + ' ppm | ' + item.nutrient_Mn_ppm + ' ppm | ' + item.nutrient_Zn_ppm + ' ppm | ' +
                          item.nutrient_Cu_ppm + ' ppm | ' + item.nutrient_B_ppm + ' ppm\n';
            }
        });
        content += '\n';
        
        // Analisis retensi air
        const retention = parseFloat($('#avg-retention').text());
        content += 'RETENSI AIR: ' + retention.toFixed(1) + '%\n';
        if (retention > 70) {
            content += 'Retensi air terlalu tinggi menurut standar Aglaonema. Berdasarkan penelitian, retensi air optimal untuk Aglaonema adalah 40-60%.\n';
            content += 'Risiko tinggi untuk pembusukan akar (Pythium dan Phytophthora)\n';
            content += 'Media tetap basah terlalu lama, mengurangi aerasi akar\n';
            content += 'Kondisi anaerobik dapat berkembang, menghambat penyerapan nutrisi\n';
            content += 'Pertumbuhan jamur patogen meningkat\n';
        } else if (retention < 30) {
            content += 'Retensi air rendah untuk kebutuhan Aglaonema. Menurut penelitian, Aglaonema memerlukan media dengan retensi 40-60%.\n';
            content += 'Frekuensi penyiraman perlu ditingkatkan 2-3x lebih sering\n';
            content += 'Risiko dehidrasi pada tanaman, terutama dalam kondisi panas\n';
            content += 'Nutrisi mudah tercuci keluar dari media\n';
            content += 'Stres air dapat menyebabkan daun layu dan tepi daun mengering\n';
        } else if (retention >= 40 && retention <= 60) {
            content += 'Retensi air optimal untuk Aglaonema. Sesuai dengan rekomendasi penelitian untuk pertumbuhan optimal.\n';
            content += 'Media dapat menahan air cukup untuk 5-7 hari\n';
            content += 'Akar mendapatkan oksigen yang cukup\n';
            content += 'Risiko pembusukan akar minimal\n';
            content += 'Nutrisi tersedia secara optimal\n';
        } else {
            content += 'Retensi air dalam batas wajar untuk Aglaonema. Tetapi dapat dioptimalkan ke rentang 40-60%.\n';
        }
        content += '\n';
        
        // Analisis drainase
        const drainage = parseFloat($('#avg-drainage').text());
        content += 'DRAINASE: ' + drainage.toFixed(1) + '%\n';
        if (drainage < 30) {
            content += 'Drainase rendah untuk standar Aglaonema. Penelitian menunjukkan drainase optimal adalah 40-60%.\n';
            content += 'Air menggenang di dasar pot, meningkatkan risiko busuk akar\n';
            content += 'Akar kekurangan oksigen karena kondisi anaerobik\n';
            content += 'Garam mineral menumpuk di media\n';
            content += 'Pertumbuhan jamur dan bakteri patogen meningkat\n';
        } else if (drainage > 70) {
            content += 'Drainase sangat cepat untuk Aglaonema. Media akan cepat kering setelah penyiraman.\n';
            content += 'Frekuensi penyiraman perlu sangat sering\n';
            content += 'Nutrisi mudah tercuci sebelum diserap akar\n';
            content += 'Media tidak stabil, mudah longsor\n';
            content += 'Tanaman rentan terhadap fluktuasi kelembaban\n';
        } else if (drainage >= 40 && drainage <= 60) {
            content += 'Drainase optimal untuk Aglaonema. Sesuai dengan standar penelitian untuk media tanam berkualitas.\n';
            content += 'Air berlebih dapat mengalir dengan baik\n';
            content += 'Media tetap lembab tanpa tergenang\n';
            content += 'Akar mendapatkan aerasi yang cukup\n';
            content += 'Nutrisi tersimpan dengan baik dalam media\n';
        } else {
            content += 'Drainase dalam batas dapat diterima. Tetapi lebih baik dioptimalkan ke rentang 40-60%.\n';
        }
        content += '\n';
        
        // Analisis porositas
        const porosity = parseFloat($('#avg-porosity').text());
        content += 'POROSITAS: ' + porosity.toFixed(1) + '%\n';
        if (porosity < 50) {
            content += 'Porositas rendah untuk standar Aglaonema. Penelitian menunjukkan porositas optimal 60-80%.\n';
            content += 'Media terlalu padat, menghambat perkembangan akar\n';
            content += 'Akar kekurangan oksigen untuk respirasi\n';
            content += 'Air tidak merata dalam media\n';
            content += 'Drainase terhambat, meningkatkan risiko busuk akar\n';
        } else if (porosity > 85) {
            content += 'Porositas sangat tinggi. Media mungkin terlalu ringan dan tidak stabil.\n';
            content += 'Media tidak dapat menopang tanaman dengan baik\n';
            content += 'Retensi air rendah, cepat kering\n';
            content += 'Nutrisi mudah tercuci\n';
            content += 'Tanaman mudah roboh\n';
        } else if (porosity >= 60 && porosity <= 80) {
            content += 'Porositas optimal untuk Aglaonema. Sesuai dengan penelitian untuk media tanam berkualitas.\n';
            content += 'Ruang udara cukup untuk respirasi akar\n';
            content += 'Media ringan namun stabil\n';
            content += 'Air dan nutrisi tersebar merata\n';
            content += 'Akar dapat berkembang dengan optimal\n';
        } else {
            content += 'Porositas dalam batas wajar. Dapat dioptimalkan ke rentang 60-80% untuk hasil terbaik.\n';
        }
        content += '\n';
        
        // Analisis pH
        const ph = parseFloat($('#avg-ph').text());
        content += 'TINGKAT KEASAMAN (pH): ' + ph.toFixed(1) + '\n';
        if (ph < 5.0) {
            content += 'pH terlalu asam untuk Aglaonema. Penelitian menunjukkan pH optimal 5.5-6.5.\n';
            content += 'Toksisitas aluminium dan mangan meningkat\n';
            content += 'Ketersediaan fosfor, kalsium, dan magnesium menurun\n';
            content += 'Aktivitas mikroorganisme menguntungkan terhambat\n';
            content += 'Penyerapan nutrisi tidak optimal\n';
        } else if (ph > 7.5) {
            content += 'pH terlalu basa untuk Aglaonema. Aglaonema tumbuh optimal pada pH 5.5-6.5.\n';
            content += 'Ketersediaan besi, mangan, seng, dan tembaga menurun\n';
            content += 'Fosfor terikat dengan kalsium menjadi tidak tersedia\n';
            content += 'Beberapa nutrisi mikro menjadi tidak dapat diserap\n';
            content += 'Beberapa penyakit jamur lebih aktif pada pH tinggi\n';
        } else if (ph >= 5.5 && ph <= 6.5) {
            content += 'pH optimal untuk Aglaonema. Sesuai dengan penelitian untuk penyerapan nutrisi maksimal.\n';
            content += 'Semua nutrisi makro dan mikro tersedia optimal\n';
            content += 'Aktivitas mikroorganisme menguntungkan maksimal\n';
            content += 'Toksisitas logam berat minimal\n';
            content += 'Penyerapan nutrisi oleh akar efisien\n';
        } else {
            content += 'pH dalam batas dapat diterima. Tetapi lebih baik dioptimalkan ke rentang 5.5-6.5.\n';
        }
        content += '\n';
        
        // Analisis CEC
        const cec = parseFloat($('#avg-cec').text().replace(' meq/100g', ''));
        content += 'KAPASITAS TUKAR KATION (CEC): ' + cec.toFixed(1) + ' meq/100g\n';
        if (cec < 10) {
            content += 'CEC rendah untuk media Aglaonema. Penelitian menunjukkan CEC optimal 20-40 meq/100g.\n';
            content += 'Kemampuan menyimpan nutrisi sangat terbatas\n';
            content += 'Pemupukan perlu dilakukan lebih sering dengan dosis rendah\n';
            content += 'Nutrisi mudah tercuci oleh air penyiraman\n';
            content += 'Fluktuasi ketersediaan nutrisi tinggi\n';
        } else if (cec > 50) {
            content += 'CEC tinggi untuk media Aglaonema. Media dapat menyimpan banyak nutrisi.\n';
            content += 'Nutrisi tersimpan dengan baik dalam media\n';
            content += 'Frekuensi pemupukan dapat dikurangi\n';
            content += 'Risiko pencucian nutrisi minimal\n';
            content += 'Media dapat menahan kelebihan garam mineral\n';
        } else if (cec >= 20 && cec <= 40) {
            content += 'CEC optimal untuk Aglaonema. Sesuai dengan penelitian untuk media tanam berkualitas.\n';
            content += 'Kemampuan menyimpan nutrisi cukup untuk 2-4 minggu\n';
            content += 'Nutrisi tersedia secara bertahap sesuai kebutuhan tanaman\n';
            content += 'Risiko defisiensi atau kelebihan nutrisi rendah\n';
            content += 'Efisiensi penggunaan pupuk tinggi\n';
        } else {
            content += 'CEC dalam batas dapat diterima. Tetapi lebih baik dioptimalkan ke rentang 20-40 meq/100g.\n';
        }
        content += '\n';
        
        // Rekomendasi
        content += 'REKOMENDASI UNTUK AGLAONEMA\n';
        content += '---------------------------\n';
        content += 'Berdasarkan analisis media tanam ini, berikut rekomendasi untuk pertumbuhan Aglaonema yang optimal:\n\n';
        
        // Rekomendasi berdasarkan properti media
        if (retention < 40) {
            content += '- Tambahkan bahan dengan retensi tinggi seperti cocopeat atau vermiculite untuk meningkatkan kemampuan menahan air\n';
        } else if (retention > 60) {
            content += '- Tambahkan bahan dengan drainase tinggi seperti pasir malang atau perlite untuk mengurangi retensi air\n';
        }
        
        if (drainage < 40) {
            content += '- Tambahkan bahan dengan drainase tinggi seperti arang sekam atau pasir malang untuk meningkatkan aliran air\n';
        } else if (drainage > 60) {
            content += '- Tambahkan bahan dengan retensi tinggi seperti cocopeat atau humus untuk mengurangi kecepatan drainase\n';
        }
        
        if (porosity < 60) {
            content += '- Tambahkan bahan dengan porositas tinggi seperti perlite atau arang sekam untuk meningkatkan aerasi\n';
        } else if (porosity > 80) {
            content += '- Tambahkan bahan dengan struktur lebih padat seperti top soil untuk menstabilkan media\n';
        }
        
        if (ph < 5.5) {
            content += '- Tambahkan kapur pertanian (dolomit) untuk menaikkan pH ke rentang optimal\n';
        } else if (ph > 6.5) {
            content += '- Tambahkan belerang atau peat moss untuk menurunkan pH ke rentang optimal\n';
        }
        
        if (cec < 20) {
            content += '- Tambahkan bahan dengan CEC tinggi seperti zeolit atau vermiculite untuk meningkatkan kemampuan menyimpan nutrisi\n';
        }
        
        content += '- Siram Aglaonema 1-2 kali seminggu, sesuaikan dengan kondisi lingkungan\n';
        content += '- Berikan pupuk lengkap dengan rasio N-P-K 3-1-2 setiap 4-6 minggu selama musim tanam\n';
        content += '- Pastikan pot memiliki lubang drainase yang cukup\n';
        content += '- Ganti media setiap 12-18 bulan untuk menjaga kualitas\n';
        content += '- Letakkan Aglaonema di tempat dengan cahaya terang tidak langsung\n\n';
        
        content += '---\n';
        content += 'Dibuat dengan Aplikasi Simulasi Penyiraman Media Tanam Aglaonema\n';
        content += '© 2025\n';
        
        // Buat file dan unduh
        const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
        const exportFileDefaultName = 'hasil-simulasi-aglaonema.txt';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showSnackbar('Hasil simulasi berhasil diexport');
    }
    
    // Inisialisasi aplikasi
    initApp();
});
