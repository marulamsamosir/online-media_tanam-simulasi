$(document).ready(function() {
    // Data bahan baku default dengan CEC dan pH
    const defaultMaterials = [
        { id: 1, name: "Sekam Padi Mentah", portion: 0, retention: 35.3, drainage: 64.7, porosity: 77.0, ph: 6.8, cec: 10, organicMatter: 85.2, nitrogen: 0.48, phosphorus: 0.32, potassium: 1.98, calcium: 0.15, magnesium: 0.08, carbonNitrogenRatio: 95, bulkDensity: 0.12, description: "Sekam padi mentah memiliki struktur berongga yang memberikan aerasi sangat baik. Kandungan silika yang tinggi (15-20%) membantu memperkuat dinding sel tanaman." },
        { id: 2, name: "Sekam Padi Mentah (Fermentasi)", portion: 0, retention: 50, drainage: 50, porosity: 80.0, ph: 6.5, cec: 15, organicMatter: 82.5, nitrogen: 0.85, phosphorus: 0.45, potassium: 2.15, calcium: 0.18, magnesium: 0.12, carbonNitrogenRatio: 60, bulkDensity: 0.14, description: "Proses fermentasi meningkatkan ketersediaan nutrisi dan mengurangi rasio C/N. Mikroorganisme menguntungkan berkembang yang bermanfaat untuk kesehatan akar." },
        { id: 3, name: "Sekam Padi Mentah (Oven)", portion: 0, retention: 40, drainage: 60, porosity: 82.0, ph: 7.0, cec: 12, organicMatter: 83.8, nitrogen: 0.52, phosphorus: 0.38, potassium: 2.05, calcium: 0.16, magnesium: 0.09, carbonNitrogenRatio: 88, bulkDensity: 0.11, description: "Pemanasan mengeringkan sekam tanpa merusak struktur, meningkatkan porositas namun mengurangi kandungan nutrisi yang mudah menguap." },
        { id: 4, name: "Arang Sekam Padi", portion: 0, retention: 54.1, drainage: 45.9, porosity: 85.0, ph: 7.6, cec: 45.8, organicMatter: 88.3, nitrogen: 0.65, phosphorus: 0.72, potassium: 2.85, calcium: 0.25, magnesium: 0.15, carbonNitrogenRatio: 120, bulkDensity: 0.09, description: "Proses pembakaran menghasilkan struktur berpori yang sangat stabil dengan kemampuan menyerap air dan nutrisi yang tinggi. pH cenderung alkalin." },
        { id: 5, name: "Humus Daun Bambu (Fermentasi)", portion: 0, retention: 60, drainage: 40, porosity: 65, ph: 6.2, cec: 25, organicMatter: 75.2, nitrogen: 1.25, phosphorus: 0.38, potassium: 0.85, calcium: 0.45, magnesium: 0.28, carbonNitrogenRatio: 25, bulkDensity: 0.35, description: "Kaya akan nutrisi dan mikroorganisme menguntungkan. Struktur remah yang baik untuk perkembangan akar dan retensi air yang optimal." },
        { id: 6, name: "Humus Daun Kaliandra (Fermentasi)", portion: 0, retention: 65, drainage: 35, porosity: 70, ph: 5.8, cec: 28, organicMatter: 78.5, nitrogen: 1.45, phosphorus: 0.42, potassium: 0.92, calcium: 0.52, magnesium: 0.32, carbonNitrogenRatio: 22, bulkDensity: 0.32, description: "Daun kaliandra kaya nitrogen dan mineral. Fermentasi menghasilkan humus dengan pH agak asam yang cocok untuk Aglaonema." },
        { id: 7, name: "Humus Andam (Fermentasi)", portion: 0, retention: 65, drainage: 35, porosity: 70, ph: 5.7, cec: 30, organicMatter: 76.8, nitrogen: 1.38, phosphorus: 0.35, potassium: 0.88, calcium: 0.48, magnesium: 0.30, carbonNitrogenRatio: 24, bulkDensity: 0.34, description: "Humus dari daun andam memiliki kandungan nutrisi seimbang dengan struktur yang gembur dan kemampuan retensi air yang baik." },
        { id: 8, name: "Akar Pakis Cacah (Oven)", portion: 0, retention: 58.0, drainage: 42.0, porosity: 75, ph: 5.5, cec: 20, organicMatter: 82.5, nitrogen: 0.85, phosphorus: 0.28, potassium: 1.25, calcium: 0.35, magnesium: 0.22, carbonNitrogenRatio: 55, bulkDensity: 0.18, description: "Struktur berserat yang tahan lama dengan aerasi sangat baik. pH asam cocok untuk Aglaonema yang menyukai kondisi agak asam." },
        { id: 9, name: "Biji Kapuk / Klenteng (Oven)", portion: 0, retention: 30, drainage: 70, porosity: 55, ph: 6.1, cec: 15, organicMatter: 88.2, nitrogen: 0.42, phosphorus: 0.25, potassium: 1.15, calcium: 0.12, magnesium: 0.08, carbonNitrogenRatio: 110, bulkDensity: 0.22, description: "Struktur ringan dengan drainase sangat baik. Kandungan minyak alami membantu menjaga kelembaban tanpa membuat media terlalu basah." },
        { id: 10, name: "Cocopeat (Fermentasi)", portion: 0, retention: 80.0, drainage: 20.0, porosity: 94.0, ph: 6.0, cec: 30, organicMatter: 92.5, nitrogen: 0.55, phosphorus: 0.18, potassium: 0.85, calcium: 0.25, magnesium: 0.15, carbonNitrogenRatio: 105, bulkDensity: 0.08, description: "Kemampuan retensi air sangat tinggi dengan struktur berongga yang memberikan aerasi optimal. Cocok sebagai komponen utama media." },
        { id: 11, name: "Cocofiber", portion: 0, retention: 42.0, drainage: 58.0, porosity: 80, ph: 5.8, cec: 25, organicMatter: 90.8, nitrogen: 0.48, phosphorus: 0.15, potassium: 0.78, calcium: 0.22, magnesium: 0.12, carbonNitrogenRatio: 115, bulkDensity: 0.11, description: "Serat kelapa yang memberikan struktur dan aerasi sangat baik. Tahan lama dan tidak mudah lapuk dalam kondisi basah." },
        { id: 12, name: "Perlite", portion: 0, retention: 35.0, drainage: 65.0, porosity: 90, ph: 7.2, cec: 1.5, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 0, calcium: 0.05, magnesium: 0.02, carbonNitrogenRatio: 0, bulkDensity: 0.10, description: "Mineral vulkanik yang dipanaskan hingga mengembang. Sangat ringan dengan porositas tinggi, meningkatkan aerasi tanpa menambah berat media." },
        { id: 13, name: "Pasir Malang", portion: 0, retention: 25.4, drainage: 74.6, porosity: 50, ph: 6.9, cec: 7.3, organicMatter: 0, nitrogen: 0, phosphorus: 0.02, potassium: 0.15, calcium: 0.85, magnesium: 0.12, carbonNitrogenRatio: 0, bulkDensity: 1.45, description: "Pasir vulkanik dengan butiran kasar dan berpori. Memberikan drainase sangat baik dan mencegah media menjadi terlalu padat." },
        { id: 14, name: "Vermiculite", portion: 0, retention: 65.0, drainage: 35.0, porosity: 85, ph: 7.0, cec: 100, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 3.5, calcium: 1.2, magnesium: 15.5, carbonNitrogenRatio: 0, bulkDensity: 0.12, description: "Mineral yang dipanaskan hingga mengembang seperti akordeon. Sangat ringan dengan kemampuan menahan air dan nutrisi yang tinggi." },
        { id: 15, name: "Zeolit", portion: 0, retention: 40.0, drainage: 60.0, porosity: 60, ph: 7.5, cec: 150, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 1.8, calcium: 2.5, magnesium: 0.8, carbonNitrogenRatio: 0, bulkDensity: 0.95, description: "Mineral aluminosilikat dengan struktur kristal berongga. CEC sangat tinggi membuatnya ideal untuk menyimpan dan melepaskan nutrisi secara bertahap." },
        { id: 16, name: "Top Soil", portion: 0, retention: 45, drainage: 30, porosity: 50, ph: 6.5, cec: 15, organicMatter: 45.2, nitrogen: 0.25, phosphorus: 0.12, potassium: 0.35, calcium: 0.85, magnesium: 0.42, carbonNitrogenRatio: 18, bulkDensity: 1.25, description: "Tanah lapisan atas yang kaya humus dan mikroorganisme. Menyediakan nutrisi alami namun dapat memadat jika digunakan berlebihan." },
        { id: 17, name: "Pupuk Kandang Kambing (Fermentasi)", portion: 0, retention: 60, drainage: 40, porosity: 65, ph: 7.2, cec: 50, organicMatter: 65.8, nitrogen: 1.85, phosphorus: 1.25, potassium: 1.65, calcium: 1.45, magnesium: 0.75, carbonNitrogenRatio: 20, bulkDensity: 0.55, description: "Sumber nutrisi organik lengkap dengan mikroorganisme menguntungkan. Fermentasi mengurangi panas dan meningkatkan ketersediaan nutrisi." },
        { id: 18, name: "Vermicompost (Kascing)", portion: 0, retention: 70.0, drainage: 30.0, porosity: 75, ph: 6.8, cec: 60, organicMatter: 58.5, nitrogen: 1.95, phosphorus: 1.85, potassium: 1.25, calcium: 2.15, magnesium: 0.85, carbonNitrogenRatio: 15, bulkDensity: 0.45, description: "Kompos hasil proses cacing tanah yang kaya hormon pertumbuhan, enzim, dan mikroorganisme menguntungkan. Nutrisi tersedia dalam bentuk yang mudah diserap tanaman." },
        { id: 19, name: "Arang Kayu", portion: 0, retention: 25, drainage: 75, porosity: 80, ph: 8.5, cec: 20, organicMatter: 85.5, nitrogen: 0.35, phosphorus: 0.15, potassium: 1.05, calcium: 0.95, magnesium: 0.25, carbonNitrogenRatio: 130, bulkDensity: 0.25, description: "Struktur berpori yang stabil dengan pH alkalin. Dapat menyerap racun dan menyediakan habitat untuk mikroorganisme menguntungkan." },
        { id: 20, name: "Rockwool", portion: 0, retention: 80.0, drainage: 20.0, porosity: 95, ph: 7.0, cec: 5, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 0, calcium: 0.35, magnesium: 0.08, carbonNitrogenRatio: 0, bulkDensity: 0.07, description: "Serat batuan yang dipanaskan, sangat steril dengan kemampuan menahan air dan udara secara seimbang. pH netral setelah dicuci." },
        { id: 21, name: "Kerikil", portion: 0, retention: 5, drainage: 95, porosity: 40, ph: 7.1, cec: 1, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 0, calcium: 0.12, magnesium: 0.03, carbonNitrogenRatio: 0, bulkDensity: 1.65, description: "Memberikan drainase maksimal dan mencegah media menjadi terlalu padat. Biasanya digunakan sebagai lapisan dasar pot." },
        { id: 22, name: "Pasir Sungai", portion: 0, retention: 15.0, drainage: 85.0, porosity: 45, ph: 7.0, cec: 2, organicMatter: 0, nitrogen: 0, phosphorus: 0.01, potassium: 0.08, calcium: 0.45, magnesium: 0.05, carbonNitrogenRatio: 0, bulkDensity: 1.55, description: "Butiran halus dengan drainase baik. Dapat memadat jika digunakan berlebihan, sebaiknya dicampur dengan bahan organik." },
        { id: 23, name: "Hydroton", portion: 0, retention: 45, drainage: 55, porosity: 80, ph: 7.0, cec: 5, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 0.15, calcium: 0.25, magnesium: 0.08, carbonNitrogenRatio: 0, bulkDensity: 0.35, description: "Bola tanah liat yang dipanaskan, ringan dan berpori. Menyediakan aerasi sangat baik dengan retensi air yang cukup." },
        { id: 24, name: "Spagnum Peat Moss", portion: 0, retention: 90.0, drainage: 10.0, porosity: 90, ph: 4.0, cec: 100, organicMatter: 98.2, nitrogen: 0.85, phosphorus: 0.08, potassium: 0.15, calcium: 0.45, magnesium: 0.18, carbonNitrogenRatio: 58, bulkDensity: 0.09, description: "Lumut gambut dengan kemampuan retensi air sangat tinggi dan pH sangat asam. CEC tinggi membuatnya ideal untuk menyimpan nutrisi." },
        { id: 25, name: "Biochar", portion: 0, retention: 70, drainage: 30, porosity: 85, ph: 8.0, cec: 40, organicMatter: 92.5, nitrogen: 0.55, phosphorus: 0.35, potassium: 1.85, calcium: 1.15, magnesium: 0.45, carbonNitrogenRatio: 125, bulkDensity: 0.22, description: "Arang yang diproduksi secara terkontrol, sangat berpori dengan kemampuan menyerap air dan nutrisi. Menyediakan habitat untuk mikroorganisme menguntungkan." },
        { id: 26, name: "Pumice", portion: 0, retention: 35, drainage: 65, porosity: 80, ph: 7.2, cec: 10, organicMatter: 0, nitrogen: 0, phosphorus: 0, potassium: 2.15, calcium: 1.85, magnesium: 0.35, carbonNitrogenRatio: 0, bulkDensity: 0.45, description: "Batu apung vulkanik yang sangat ringan dan berpori. Memberikan aerasi sangat baik tanpa mengubah pH media secara signifikan." }
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
                $('<i>').addClass('fas fa-vial'),
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
            portion: 0
        });
        
        renderComposition();
        updateTotalPortion();
        showSnackbar('Bahan ' + selectedMaterial.name + ' berhasil ditambahkan ke komposisi');
        
        // Reset pilihan
        selectedMaterial = null;
        $('#selected-material-text').text('Pilih Bahan Baku');
    }
    
    // Render komposisi dengan desain tabel Material Design yang diperbaiki
    function renderComposition() {
        const container = $('#composition-list');
        container.empty();
        
        if (composition.length === 0) {
            container.append($('<p>').addClass('text-center text-muted p-4').text('Tambahkan bahan dari dropdown di atas untuk memulai'));
            return;
        }
        
        // Buat tabel dengan desain baru
        const table = $('<table>').addClass('composition-table').css('width', '100%');
        const thead = $('<thead>');
        const tbody = $('<tbody>');
        
        // Baris header pertama
        const headerRow1 = $('<tr>');
        headerRow1.append($('<th rowspan="2" width="55%">').text('BAHAN'));
        headerRow1.append($('<th rowspan="2" width="15%">').text('PROPORSI'));
        headerRow1.append($('<th colspan="5" width="25%">').text('KOMPONEN'));
        headerRow1.append($('<th rowspan="2" width="5%">').text('AKSI'));
        thead.append(headerRow1);
        
        // Baris header kedua (sub-kolom komponen)
        const headerRow2 = $('<tr>');
        
        // Retensi dengan tooltip
        headerRow2.append($('<th width="5%">').append(
            $('<div>').addClass('tooltip-container text-center').append(
                $('<i>').addClass('fas fa-tint table-header-icon'),
                $('<span>').addClass('tooltip-text tooltip-bottom').text('Retensi Air (%) - Kemampuan media menahan air')
            )
        ));
        
        // Drainase dengan tooltip
        headerRow2.append($('<th width="5%">').append(
            $('<div>').addClass('tooltip-container text-center').append(
                $('<i>').addClass('fas fa-water table-header-icon'),
                $('<span>').addClass('tooltip-text tooltip-bottom').text('Drainase (%) - Kemampuan media mengalirkan air')
            )
        ));
        
        // Porositas dengan tooltip
        headerRow2.append($('<th width="5%">').append(
            $('<div>').addClass('tooltip-container text-center').append(
                $('<i>').addClass('fas fa-wind table-header-icon'),
                $('<span>').addClass('tooltip-text tooltip-bottom').text('Porositas (%) - Ruang udara dalam media')
            )
        ));
        
        // pH dengan tooltip
        headerRow2.append($('<th width="5%">').append(
            $('<div>').addClass('tooltip-container text-center').append(
                $('<i>').addClass('fas fa-vial table-header-icon'),
                $('<span>').addClass('tooltip-text tooltip-bottom').text('Tingkat keasaman (pH)')
            )
        ));
        
        // CEC dengan tooltip
        headerRow2.append($('<th width="5%">').append(
            $('<div>').addClass('tooltip-container text-center').append(
                $('<i>').addClass('fas fa-exchange-alt table-header-icon'),
                $('<span>').addClass('tooltip-text tooltip-bottom').text('Kapasitas Tukar Kation (CEC)')
            )
        ));
        
        thead.append(headerRow2);
        
        // Isi tabel
        composition.forEach((item, index) => {
            const row = $('<tr>');
            
            // Nama bahan
            row.append($('<td>').addClass('material-name').text(item.name));
            
            // Input bagian (proposi)
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
            
            row.append($('<td>').addClass('text-center').append(portionInput));
            
            // Nilai properti - setiap properti dalam sel terpisah
            row.append($('<td>').addClass('text-center').text(item.retention.toFixed(1)));
            row.append($('<td>').addClass('text-center').text(item.drainage.toFixed(1)));
            row.append($('<td>').addClass('text-center').text(item.porosity.toFixed(1)));
            row.append($('<td>').addClass('text-center').text(item.ph.toFixed(1)));
            row.append($('<td>').addClass('text-center').text(item.cec.toFixed(1)));
            
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
            
            row.append($('<td>').addClass('text-center').append(deleteButton));
            
            tbody.append(row);
        });
        
        table.append(thead, tbody);
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
            $('#water-level').css('height', waterLevelHeight + '%');
            
            // Animasi media komposisi
            $('#media-composition').css('height', '75%');
            
            // Animasi penyiraman yang lebih menarik
            const wateringAnimation = $('#watering-animation');
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
                        $('.pot-body').append(ripple);
                        
                        setTimeout(function() {
                            ripple.remove();
                        }, 1500);
                    }, i * 300);
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
    
    // Generate analisis dan rekomendasi yang AKURAT berdasarkan riset Aglaonema
    function generateAnalysis(retention, drainage, porosity, cec, ph, retainedWater, drainedWater, mediaVolume, totalPortion) {
        const analysisContent = $('#analysis-content');
        const waterVolume = $('#water-volume').text();
        analysisContent.empty();
        
        let analysisHTML = '<div class="mb-3">';
        analysisHTML += '<h6><i class="fas fa-chart-line me-2"></i>Analisis Media Tanam Aglaonema Berdasarkan Riset</h6>';
        analysisHTML += '<p>Berdasarkan penelitian tentang media tanam Aglaonema, berikut adalah analisis detail mengenai komposisi media Anda:</p>';
        analysisHTML += '</div>';
        
        // Detail Komposisi Media - dengan ikon dan tooltip
        analysisHTML += '<div class="composition-details">';
        analysisHTML += '<h6><i class="fas fa-list me-2"></i>Detail Komposisi Media</h6>';
        analysisHTML += '<p>Total Volume Media: <strong>' + mediaVolume.toFixed(2) + ' mL</strong></p>';
        analysisHTML += '<table class="table table-sm composition-simulation-table">';
        analysisHTML += '<thead><tr>';
        analysisHTML += '<th width="40%" style="text-align: center !important;"><div class="tooltip-container"><i class="fas fa-seedling"></i><span class="tooltip-text tooltip-bottom">Nama Bahan</span></div></th>';
        analysisHTML += '<th width="5%"><div class="tooltip-container"><i class="fas fa-weight"></i><span class="tooltip-text tooltip-bottom">Bagian (Proporsi)</span></div></th>';
        analysisHTML += '<th width="10%"><div class="tooltip-container"><i class="fas fa-vial"></i><span class="tooltip-text tooltip-bottom">Volume dalam mL</span></div></th>';
        analysisHTML += '<th width="10%"><div class="tooltip-container"><i class="fas fa-percentage"></i><span class="tooltip-text tooltip-bottom">Persentase dalam Komposisi (%)</span></div></th>';
        analysisHTML += '<th width="7%"><div class="tooltip-container"><i class="fas fa-tint"></i><span class="tooltip-text tooltip-bottom">Retensi Air (%)</span></div></th>';
        analysisHTML += '<th width="7%"><div class="tooltip-container"><i class="fas fa-water"></i><span class="tooltip-text tooltip-bottom">Drainase (%)</span></div></th>';
        analysisHTML += '<th width="7%"><div class="tooltip-container"><i class="fas fa-wind"></i><span class="tooltip-text tooltip-bottom">Porositas (%)</span></div></th>';
        analysisHTML += '<th width="7%"><div class="tooltip-container"><i class="fas fa-flask"></i><span class="tooltip-text tooltip-bottom">Tingkat keasaman (pH)</span></div></th>';
        analysisHTML += '<th width="7%"><div class="tooltip-container"><i class="fas fa-exchange-alt"></i><span class="tooltip-text tooltip-bottom">Kapasitas Tukar Kation (CEC)</span></div></th>';
        analysisHTML += '</tr></thead>';
        analysisHTML += '<tbody>';
        
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? ((item.portion / totalPortion) * 100).toFixed(2) : 0;
                const itemVolume = mediaVolume * (percentage / 100);
                analysisHTML += '<tr>';
                analysisHTML += '<td>' + item.name + '</td>';
                analysisHTML += '<td class="text-right">' + item.portion + '</td>';
                analysisHTML += '<td class="text-right">' + itemVolume.toFixed(2) + '</td>';
                analysisHTML += '<td class="text-right">' + percentage + '</td>';
                analysisHTML += '<td class="text-right">' + item.retention + '</td>';
                analysisHTML += '<td class="text-right">' + item.drainage + '</td>';
                analysisHTML += '<td class="text-right">' + item.porosity + '</td>';
                analysisHTML += '<td class="text-right">' + item.ph.toFixed(1) + '</td>';
                analysisHTML += '<td class="text-right">' + item.cec.toFixed(2) + '</td>';
                analysisHTML += '</tr>';
            }
        });
        
        analysisHTML += '</tbody>';
        analysisHTML += '</table>';
        analysisHTML += '</div>';
        analysisHTML += '<div>&nbsp;</div>';
        
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
        
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? (item.portion / totalPortion) : 0;
                const material = defaultMaterials.find(m => m.id === item.id);
                if (material) {
                    totalOrganicMatter += material.organicMatter * percentage;
                    totalNitrogen += material.nitrogen * percentage;
                    totalPhosphorus += material.phosphorus * percentage;
                    totalPotassium += material.potassium * percentage;
                    totalCalcium += material.calcium * percentage;
                    totalMagnesium += material.magnesium * percentage;
                }
            }
        });
        
        analysisHTML += '<li><strong>Bahan Organik:</strong> ' + totalOrganicMatter.toFixed(1) + '% - Menyediakan makanan untuk mikroorganisme menguntungkan dan meningkatkan struktur media</li>';
        analysisHTML += '<li><strong>Nitrogen (N):</strong> ' + totalNitrogen.toFixed(2) + '% - Esensial untuk pertumbuhan daun dan batang</li>';
        analysisHTML += '<li><strong>Fosfor (P):</strong> ' + totalPhosphorus.toFixed(2) + '% - Penting untuk perkembangan akar dan pembungaan</li>';
        analysisHTML += '<li><strong>Kalium (K):</strong> ' + totalPotassium.toFixed(2) + '% - Meningkatkan ketahanan penyakit dan transportasi nutrisi</li>';
        analysisHTML += '<li><strong>Kalsium (Ca):</strong> ' + totalCalcium.toFixed(2) + '% - Memperkuat dinding sel dan sistem perakaran</li>';
        analysisHTML += '<li><strong>Magnesium (Mg):</strong> ' + totalMagnesium.toFixed(2) + '% - Komponen klorofil untuk fotosintesis</li>';
        
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
        if (totalOrganicMatter > 60) {
            analysisHTML += '<li>Kandungan bahan organik tinggi</li>';
        }
        
        analysisHTML += '<li>Komposisi seimbang untuk pertumbuhan Aglaonema</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        analysisHTML += '<div class="cons">';
        analysisHTML += '<h6><i class="fas fa-thumbs-down me-2"></i>Kekurangan</h6>';
        analysisHTML += '<ul>';
        
        if (retention < 40 || retention > 60) {
            analysisHTML += '<li>Retensi air perlu disesuaikan</li>';
        }
        if (drainage < 40 || drainage > 60) {
            analysisHTML += '<li>Drainase perlu dioptimalkan</li>';
        }
        if (porosity < 60 || porosity > 80) {
            analysisHTML += '<li>Porositas tidak ideal</li>';
        }
        if (ph < 5.5 || ph > 6.5) {
            analysisHTML += '<li>pH perlu disesuaikan</li>';
        }
        if (cec < 20 || cec > 40) {
            analysisHTML += '<li>Kemampuan menyimpan nutrisi perlu dioptimalkan</li>';
        }
        
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        analysisHTML += '</div>';
        
        // Rekomendasi berdasarkan analisis
        analysisHTML += '<div class="analysis-point mt-3">';
        analysisHTML += '<h6><i class="fas fa-clipboard-check me-2"></i>Rekomendasi untuk Aglaonema</h6>';
        analysisHTML += '<p>Berdasarkan analisis komprehensif, berikut rekomendasi untuk media tanam Aglaonema Anda:</p>';
        analysisHTML += '<ul>';
        
        if (retention < 40) {
            analysisHTML += '<li><strong>Tingkatkan retensi air</strong> dengan menambah cocopeat, vermiculite, atau humus</li>';
        } else if (retention > 60) {
            analysisHTML += '<li><strong>Kurangi retensi air</strong> dengan menambah pasir malang, perlite, atau arang sekam</li>';
        }
        
        if (drainage < 40) {
            analysisHTML += '<li><strong>Tingkatkan drainase</strong> dengan menambah pasir malang, perlite, atau kerikil</li>';
        } else if (drainage > 60) {
            analysisHTML += '<li><strong>Kurangi drainase</strong> dengan menambah cocopeat, vermiculite, atau bahan organik halus</li>';
        }
        
        if (porosity < 60) {
            analysisHTML += '<li><strong>Tingkatkan porositas</strong> dengan menambah sekam padi, perlite, atau cocofiber</li>';
        } else if (porosity > 80) {
            analysisHTML += '<li><strong>Kurangi porositas</strong> dengan menambah tanah atau bahan organik halus</li>';
        }
        
        if (ph < 5.5) {
            analysisHTML += '<li><strong>Tingkatkan pH</strong> dengan menambah kapur pertanian atau arang sekam</li>';
        } else if (ph > 6.5) {
            analysisHTML += '<li><strong>Turunkan pH</strong> dengan menambah belerang, peat moss, atau pupuk yang bersifat asam</li>';
        }
        
        if (cec < 20) {
            analysisHTML += '<li><strong>Tingkatkan CEC</strong> dengan menambah zeolit, vermiculite, atau bahan organik</li>';
        } else if (cec > 40) {
            analysisHTML += '<li>Media memiliki CEC tinggi, <strong>pupuk dapat diberikan lebih jarang</strong> dengan dosis tepat</li>';
        }
        
        analysisHTML += '<li><strong>Frekuensi penyiraman:</strong> ' + (retention >= 40 && retention <= 60 ? '5-7 hari sekali' : 'Sesuaikan dengan kondisi media') + '</li>';
        analysisHTML += '<li><strong>Pemupukan:</strong> Gunakan pupuk seimbang dengan NPK 20-20-20 setiap 2-4 minggu</li>';
        analysisHTML += '<li><strong>Monitoring:</strong> Periksa kelembaban media secara teratur sebelum penyiraman</li>';
        analysisHTML += '</ul>';
        analysisHTML += '<p class="mt-2"><strong>Catatan:</strong> Rekomendasi ini didasarkan pada penelitian tentang kebutuhan media tanam Aglaonema. Hasil aktual dapat bervariasi tergantung kondisi lingkungan.</p>';
        analysisHTML += '</div>';
        
        analysisContent.html(analysisHTML);
    }
    
    // Reset simulasi
    function resetSimulation() {
        $('#water-level').css('height', '0%');
        $('#media-composition').css('height', '0%');
        $('#watering-animation').css('height', '0%').empty();
        $('#simulation-result').hide();
        $('#analysis-card').hide();
        $('#media-properties').hide();
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
            if (!name || name.trim() === '') {
                showCustomAlert('Peringatan', 'Nama komposisi tidak boleh kosong.');
                return;
            }
            
            // Dapatkan komposisi yang tersimpan
            const savedCompositions = JSON.parse(localStorage.getItem('savedCompositions')) || [];
            
            // Cek apakah nama sudah ada
            if (savedCompositions.some(comp => comp.name === name)) {
                showCustomConfirm('Konfirmasi', 'Nama komposisi sudah ada. Apakah Anda ingin menggantinya?', function(confirmed) {
                    if (confirmed) {
                        // Hapus yang lama dan simpan yang baru
                        const filtered = savedCompositions.filter(comp => comp.name !== name);
                        filtered.push({
                            name: name,
                            composition: composition,
                            date: new Date().toISOString()
                        });
                        
                        localStorage.setItem('savedCompositions', JSON.stringify(filtered));
                        showSnackbar('Komposisi berhasil disimpan');
                    }
                });
            } else {
                // Tambahkan komposisi baru
                savedCompositions.push({
                    name: name,
                    composition: composition,
                    date: new Date().toISOString()
                });
                
                localStorage.setItem('savedCompositions', JSON.stringify(savedCompositions));
                showSnackbar('Komposisi berhasil disimpan');
            }
        });
    }
    
    // Muat komposisi dari localStorage
    function loadCompositionsFromStorage() {
        // Fungsi ini dipanggil saat inisialisasi, tidak perlu melakukan apa-apa di sini
        // karena komposisi akan dimuat saat modal dibuka
    }
    
    // Tampilkan komposisi yang tersimpan
    function viewSavedCompositions() {
        const savedCompositions = JSON.parse(localStorage.getItem('savedCompositions')) || [];
        
        if (savedCompositions.length === 0) {
            showCustomAlert('Informasi', 'Tidak ada komposisi yang tersimpan.');
            return;
        }
        
        const container = $('#savedCompositionsList');
        container.empty();
        
        savedCompositions.forEach((comp, index) => {
            const item = $('<div>').addClass('saved-item');
            
            const info = $('<div>');
            info.append($('<h6>').text(comp.name));
            info.append($('<small>').addClass('text-muted').text('Disimpan: ' + new Date(comp.date).toLocaleDateString('id-ID')));
            
            const actions = $('<div>').addClass('d-flex align-items-center');
            
            const loadButton = $('<button>').addClass('btn btn-sm btn-outline-primary me-2')
                .html('<i class="fas fa-upload"></i>')
                .attr('title', 'Muat komposisi')
                .click(function() {
                    composition = [...comp.composition];
                    renderComposition();
                    updateTotalPortion();
                    hideModal($('#savedModal'));
                    showSnackbar('Komposisi ' + comp.name + ' berhasil dimuat');
                });
            
            const deleteButton = $('<button>').addClass('btn btn-sm btn-outline-danger delete-saved')
                .html('<i class="fas fa-trash"></i>')
                .attr('title', 'Hapus komposisi')
                .click(function() {
                    showCustomConfirm('Konfirmasi', 'Apakah Anda yakin ingin menghapus komposisi ' + comp.name + '?', function(confirmed) {
                        if (confirmed) {
                            const updatedCompositions = savedCompositions.filter((_, i) => i !== index);
                            localStorage.setItem('savedCompositions', JSON.stringify(updatedCompositions));
                            viewSavedCompositions(); // Refresh list
                            showSnackbar('Komposisi berhasil dihapus');
                        }
                    });
                });
            
            actions.append(loadButton, deleteButton);
            item.append(info, actions);
            container.append(item);
        });
        
        showModal($('#savedModal'));
    }
    
    // Export komposisi ke JSON
    function exportComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk diexport.');
            return;
        }
        
        const totalPortion = composition.reduce((sum, item) => sum + item.portion, 0);
        if (totalPortion === 0) {
            showCustomAlert('Peringatan', 'Total bagian tidak boleh 0. Atur bagian untuk setiap bahan.');
            return;
        }
        
        const data = {
            name: 'Komposisi Media Tanam Aglaonema',
            composition: composition,
            date: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'komposisi-media-aglaonema.json';
        link.click();
        
        showSnackbar('Komposisi berhasil diexport');
    }
    
    // Import komposisi dari JSON
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
                
                if (!data.composition || !Array.isArray(data.composition)) {
                    throw new Error('Format file tidak valid');
                }
                
                // Validasi data komposisi
                const validComposition = data.composition.filter(item => 
                    item.id && item.name && typeof item.portion === 'number'
                );
                
                if (validComposition.length === 0) {
                    throw new Error('Tidak ada data komposisi yang valid');
                }
                
                composition = validComposition;
                renderComposition();
                updateTotalPortion();
                hideModal($('#importCompositionModal'));
                showSnackbar('Komposisi berhasil diimport');
            } catch (error) {
                showCustomAlert('Error', 'Gagal memuat file: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }
    
    // Export hasil simulasi ke TXT (format yang diminta)
    function exportSimulation() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada data simulasi untuk diexport.');
            return;
        }
        
        // Data ukuran pot
        const potDiameter = $('#pot-diameter').val();
        const potHeight = $('#pot-height').val();
        const mediaPercentage = $('#media-percentage').val();
        
        // Data komposisi media
        const totalPortion = composition.reduce((sum, item) => sum + item.portion, 0);
        
        // Data hasil simulasi
        const waterVolume = $('#water-volume').text();
        const wateringDuration = $('#watering-duration').text();
        const potVolume = $('#pot-volume').text();
        const mediaVolume = $('#media-volume').text();
        const retainedWater = $('#retained-water-value').text();
        const absorbedWater = $('#absorbed-water-percentage').text();
        const drainedWater = $('#drained-water-value').text();
        const mediaWetness = $('#media-wetness').text();
        
        // Data properti media
        const avgRetention = $('#avg-retention').text();
        const avgDrainage = $('#avg-drainage').text();
        const avgPorosity = $('#avg-porosity').text();
        const avgPH = $('#avg-ph').text();
        const avgCEC = $('#avg-cec').text();
        
        // Buat konten file TXT
        let content = 'HASIL SIMULASI PENYIRAMAN MEDIA TANAM AGLAONEMA\n';
        content += '==================================================\n\n';
        
        // Informasi ukuran pot
        content += 'INFORMASI UKURAN POT\n';
        content += '--------------------\n';
        content += 'Diameter Pot: ' + potDiameter + ' cm\n';
        content += 'Tinggi Pot: ' + potHeight + ' cm\n';
        content += 'Media dalam Pot: ' + mediaPercentage + '%\n\n';
        
        // Informasi komposisi media tanam
        content += 'INFORMASI KOMPOSISI MEDIA TANAM\n';
        content += '------------------------------\n';
        content += 'Total Bagian: ' + totalPortion.toFixed(1) + '\n\n';
        
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? ((item.portion / totalPortion) * 100).toFixed(2) : 0;
                content += '- ' + item.name + ': ' + item.portion + ' bagian (' + percentage + '%)\n';
            }
        });
        content += '\n';
        
        // Informasi hasil simulasi
        content += 'HASIL SIMULASI\n';
        content += '--------------\n';
        content += 'Volume Air yang Digunakan: ' + waterVolume + '\n';
        content += 'Durasi Penyiraman: ' + wateringDuration + '\n';
        content += 'Volume Pot: ' + potVolume + '\n';
        content += 'Volume Media: ' + mediaVolume + '\n';
        content += 'Air yang Tertahan di Media: ' + retainedWater + '\n';
        content += 'Air yang Terserap Media: ' + absorbedWater + '\n';
        content += 'Air yang Mengalir Keluar: ' + drainedWater + '\n';
        content += 'Kebasahan Media: ' + mediaWetness + '\n\n';
        
        // Informasi analisis media & rekomendasi
        content += 'ANALISIS MEDIA & REKOMENDASI\n';
        content += '============================\n\n';
        
        // Sifat media
        content += 'SIFAT MEDIA CAMPURAN (RATA-RATA TERTIMBANG)\n';
        content += '--------------------------------------------\n';
        content += 'Retensi Media: ' + avgRetention + '\n';
        content += 'Drainase Media: ' + avgDrainage + '\n';
        content += 'Porositas Media: ' + avgPorosity + '\n';
        content += 'pH Media: ' + avgPH + '\n';
        content += 'CEC Media: ' + avgCEC + '\n\n';
        
        // Detail komposisi media
        content += 'DETAIL KOMPOSISI MEDIA\n';
        content += '---------------------\n';
        content += 'Total Volume Media: ' + $('#media-volume').text() + '\n\n';
        
        content += 'TABEL KOMPOSISI:\n';
        content += 'Nama Bahan | Bagian | Volume (mL) | Persentase | Retensi Air | Drainase | Porositas | pH | CEC\n';
        content += '------------------------------------------------------------------------------------------------\n';
        
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? ((item.portion / totalPortion) * 100).toFixed(2) : 0;
                const itemVolume = parseFloat($('#media-volume').text()) * (percentage / 100);
                content += item.name + ' | ' + item.portion + ' | ' + itemVolume.toFixed(2) + ' | ' + percentage + '% | ' + 
                          item.retention + '% | ' + item.drainage + '% | ' + item.porosity + '% | ' + 
                          item.ph.toFixed(1) + ' | ' + item.cec.toFixed(2) + '\n';
            }
        });
        content += '\n';
        
        // Analisis retensi air
        content += 'RETENSI AIR: ' + parseFloat(avgRetention).toFixed(1) + '%\n';
        if (parseFloat(avgRetention) > 70) {
            content += 'ANALISIS: Retensi air terlalu tinggi menurut standar Aglaonema. Berdasarkan penelitian, retensi air optimal untuk Aglaonema adalah 40-60%.\n';
            content += 'RISIKO: Tinggi untuk pembusukan akar, media tetap basah terlalu lama, kondisi anaerobik dapat berkembang.\n';
            content += 'DAMPAK PADA AGLAONEMA: Daun menguning, pertumbuhan terhambat, akar busuk.\n\n';
        } else if (parseFloat(avgRetention) < 30) {
            content += 'ANALISIS: Retensi air rendah untuk kebutuhan Aglaonema. Menurut penelitian, Aglaonema memerlukan media dengan retensi 40-60%.\n';
            content += 'RISIKO: Frekuensi penyiraman perlu ditingkatkan, risiko dehidrasi, nutrisi mudah tercuci.\n';
            content += 'DAMPAK PADA AGLAONEMA: Daun layu, pertumbuhan lambat, ujung daun kering.\n\n';
        } else if (parseFloat(avgRetention) >= 40 && parseFloat(avgRetention) <= 60) {
            content += 'ANALISIS: Retensi air optimal untuk Aglaonema. Sesuai dengan rekomendasi penelitian untuk pertumbuhan optimal.\n';
            content += 'KEUNTUNGAN: Media dapat menahan air cukup untuk 5-7 hari, akar mendapatkan oksigen yang cukup, risiko pembusukan akar minimal.\n';
            content += 'DAMPAK PADA AGLAONEMA: Pertumbuhan sehat, daun hijau cerah, sistem akar berkembang baik.\n\n';
        } else {
            content += 'ANALISIS: Retensi air dalam batas wajar untuk Aglaonema. Tetapi dapat dioptimalkan ke rentang 40-60%.\n\n';
        }
        
        // Analisis drainase
        content += 'DRAINASE: ' + parseFloat(avgDrainage).toFixed(1) + '%\n';
        if (parseFloat(avgDrainage) < 30) {
            content += 'ANALISIS: Drainase rendah untuk standar Aglaonema. Penelitian menunjukkan drainase optimal adalah 40-60%.\n';
            content += 'RISIKO: Air menggenang di dasar pot, meningkatkan risiko busuk akar, akar kekurangan oksigen.\n';
            content += 'DAMPAK PADA AGLAONEMA: Akar busuk, daun menguning, tanaman layu meski media basah.\n\n';
        } else if (parseFloat(avgDrainage) > 70) {
            content += 'ANALISIS: Drainase sangat cepat untuk Aglaonema. Media akan cepat kering setelah penyiraman.\n';
            content += 'RISIKO: Frekuensi penyiraman perlu sangat sering, nutrisi mudah tercuci sebelum diserap akar.\n';
            content += 'DAMPAK PADA AGLAONEMA: Pertumbuhan terhambat, daun pucat, nutrisi tidak optimal.\n\n';
        } else if (parseFloat(avgDrainage) >= 40 && parseFloat(avgDrainage) <= 60) {
            content += 'ANALISIS: Drainase optimal untuk Aglaonema. Sesuai dengan standar penelitian untuk media tanam berkualitas.\n';
            content += 'KEUNTUNGAN: Air berlebih dapat mengalir dengan baik, media tetap lembab tanpa tergenang, akar mendapatkan aerasi yang cukup.\n';
            content += 'DAMPAK PADA AGLAONEMA: Sistem perakaran sehat, pertumbuhan optimal, resistensi penyakit tinggi.\n\n';
        } else {
            content += 'ANALISIS: Drainase dalam batas dapat diterima. Tetapi lebih baik dioptimalkan ke rentang 40-60%.\n\n';
        }
        
        // Analisis porositas
        content += 'POROSITAS: ' + parseFloat(avgPorosity).toFixed(1) + '%\n';
        if (parseFloat(avgPorosity) < 50) {
            content += 'ANALISIS: Porositas rendah untuk standar Aglaonema. Penelitian menunjukkan porositas optimal 60-80%.\n';
            content += 'RISIKO: Media terlalu padat, menghambat perkembangan akar, akar kekurangan oksigen untuk respirasi.\n';
            content += 'DAMPAK PADA AGLAONEMA: Pertumbuhan lambat, daun kecil, sistem akar terbatas.\n\n';
        } else if (parseFloat(avgPorosity) > 85) {
            content += 'ANALISIS: Porositas sangat tinggi. Media mungkin terlalu ringan dan tidak stabil.\n';
            content += 'RISIKO: Media tidak dapat menopang tanaman dengan baik, retensi air rendah, nutrisi mudah tercuci.\n';
            content += 'DAMPAK PADA AGLAONEMA: Tanaman tidak stabil, pertumbuhan tidak optimal, daun pucat.\n\n';
        } else if (parseFloat(avgPorosity) >= 60 && parseFloat(avgPorosity) <= 80) {
            content += 'ANALISIS: Porositas optimal untuk Aglaonema. Sesuai dengan penelitian untuk media tanam berkualitas.\n';
            content += 'KEUNTUNGAN: Ruang udara cukup untuk respirasi akar, media ringan namun stabil, air dan nutrisi tersebar merata.\n';
            content += 'DAMPAK PADA AGLAONEMA: Sistem perakaran luas, pertumbuhan cepat, daun besar dan sehat.\n\n';
        } else {
            content += 'ANALISIS: Porositas dalam batas wajar. Dapat dioptimalkan ke rentang 60-80% untuk hasil terbaik.\n\n';
        }
        
        // Analisis pH
        content += 'TINGKAT KEASAMAN (pH): ' + parseFloat(avgPH).toFixed(1) + '\n';
        if (parseFloat(avgPH) < 5.0) {
            content += 'ANALISIS: pH terlalu asam untuk Aglaonema. Penelitian menunjukkan pH optimal 5.5-6.5.\n';
            content += 'RISIKO: Toksisitas aluminium dan mangan meningkat, ketersediaan fosfor, kalsium, dan magnesium menurun.\n';
            content += 'DAMPAK PADA AGLAONEMA: Klorosis daun, pertumbuhan terhambat, nekrosis tepi daun.\n\n';
        } else if (parseFloat(avgPH) > 7.5) {
            content += 'ANALISIS: pH terlalu basa untuk Aglaonema. Aglaonema tumbuh optimal pada pH 5.5-6.5.\n';
            content += 'RISIKO: Ketersediaan besi, mangan, seng, dan tembaga menurun, fosfor terikat dengan kalsium menjadi tidak tersedia.\n';
            content += 'DAMPAK PADA AGLAONEMA: Klorosis interveinal, defisiensi mikronutrien, pertumbuhan lambat.\n\n';
        } else if (parseFloat(avgPH) >= 5.5 && parseFloat(avgPH) <= 6.5) {
            content += 'ANALISIS: pH optimal untuk Aglaonema. Sesuai dengan penelitian untuk penyerapan nutrisi maksimal.\n';
            content += 'KEUNTUNGAN: Semua nutrisi makro dan mikro tersedia optimal, aktivitas mikroorganisme menguntungkan maksimal.\n';
            content += 'DAMPAK PADA AGLAONEMA: Warna daun cerah, pertumbuhan cepat, resistensi penyakit tinggi.\n\n';
        } else {
            content += 'ANALISIS: pH dalam batas dapat diterima. Tetapi lebih baik dioptimalkan ke rentang 5.5-6.5.\n\n';
        }
        
        // Analisis CEC
        content += 'KAPASITAS TUKAR KATION (CEC): ' + parseFloat(avgCEC).toFixed(1) + ' meq/100g\n';
        if (parseFloat(avgCEC) < 10) {
            content += 'ANALISIS: CEC rendah untuk media Aglaonema. Penelitian menunjukkan CEC optimal 20-40 meq/100g.\n';
            content += 'RISIKO: Kemampuan menyimpan nutrisi sangat terbatas, pemupukan perlu dilakukan lebih sering, nutrisi mudah tercuci.\n';
            content += 'DAMPAK PADA AGLAONEMA: Defisiensi nutrisi, pertumbuhan tidak merata, daun pucat.\n\n';
        } else if (parseFloat(avgCEC) > 50) {
            content += 'ANALISIS: CEC tinggi untuk media Aglaonema. Media dapat menyimpan banyak nutrisi.\n';
            content += 'KEUNTUNGAN: Nutrisi tersimpan dengan baik dalam media, frekuensi pemupukan dapat dikurangi, risiko pencucian nutrisi minimal.\n';
            content += 'DAMPAK PADA AGLAONEMA: Ketersediaan nutrisi stabil, pertumbuhan konsisten, warna daun optimal.\n\n';
        } else if (parseFloat(avgCEC) >= 20 && parseFloat(avgCEC) <= 40) {
            content += 'ANALISIS: CEC optimal untuk Aglaonema. Sesuai dengan penelitian untuk media tanam berkualitas.\n';
            content += 'KEUNTUNGAN: Kemampuan menyimpan nutrisi cukup untuk 2-4 minggu, nutrisi tersedia secara bertahap, efisiensi penggunaan pupuk tinggi.\n';
            content += 'DAMPAK PADA AGLAONEMA: Pertumbuhan stabil, warna daun cerah, kesehatan tanaman optimal.\n\n';
        } else {
            content += 'ANALISIS: CEC dalam batas dapat diterima. Tetapi lebih baik dioptimalkan ke rentang 20-40 meq/100g.\n\n';
        }
        
        // Rekomendasi
        content += 'REKOMENDASI UNTUK AGLAONEMA\n';
        content += '---------------------------\n';
        
        if (parseFloat(avgRetention) < 40) {
            content += '- Tingkatkan retensi air dengan menambah cocopeat, vermiculite, atau humus\n';
        } else if (parseFloat(avgRetention) > 60) {
            content += '- Kurangi retensi air dengan menambah pasir malang, perlite, atau arang sekam\n';
        }
        
        if (parseFloat(avgDrainage) < 40) {
            content += '- Tingkatkan drainase dengan menambah pasir malang, perlite, atau kerikil\n';
        } else if (parseFloat(avgDrainage) > 60) {
            content += '- Kurangi drainase dengan menambah cocopeat, vermiculite, atau bahan organik halus\n';
        }
        
        if (parseFloat(avgPorosity) < 60) {
            content += '- Tingkatkan porositas dengan menambah sekam padi, perlite, atau cocofiber\n';
        } else if (parseFloat(avgPorosity) > 80) {
            content += '- Kurangi porositas dengan menambah tanah atau bahan organik halus\n';
        }
        
        if (parseFloat(avgPH) < 5.5) {
            content += '- Tingkatkan pH dengan menambah kapur pertanian atau arang sekam\n';
        } else if (parseFloat(avgPH) > 6.5) {
            content += '- Turunkan pH dengan menambah belerang, peat moss, atau pupuk yang bersifat asam\n';
        }
        
        if (parseFloat(avgCEC) < 20) {
            content += '- Tingkatkan CEC dengan menambah zeolit, vermiculite, atau bahan organik\n';
        } else if (parseFloat(avgCEC) > 40) {
            content += '- Media memiliki CEC tinggi, pupuk dapat diberikan lebih jarang dengan dosis tepat\n';
        }
        
        content += '\n';
        content += 'Frekuensi penyiraman: ' + (parseFloat(avgRetention) >= 40 && parseFloat(avgRetention) <= 60 ? '5-7 hari sekali' : 'Sesuaikan dengan kondisi media') + '\n';
        content += 'Pemupukan: Gunakan pupuk seimbang dengan NPK 20-20-20 setiap 2-4 minggu\n';
        content += 'Monitoring: Periksa kelembaban media secara teratur sebelum penyiraman\n\n';
        
        content += 'Catatan: Rekomendasi ini didasarkan pada penelitian tentang kebutuhan media tanam Aglaonema. Hasil aktual dapat bervariasi tergantung kondisi lingkungan.\n\n';
        
        content += '==================================================\n';
        content += 'Dibuat dengan Aplikasi Simulasi Penyiraman Media Tanam Aglaonema\n';
        content += '© 2025\n';
        
        // Buat file dan download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hasil-simulasi-aglaonema.txt';
        link.click();
        
        // Bersihkan URL
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        showSnackbar('Hasil simulasi berhasil diexport');
    }
    
    // Inisialisasi aplikasi
    initApp();
});
