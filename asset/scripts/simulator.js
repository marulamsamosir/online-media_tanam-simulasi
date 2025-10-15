$(document).ready(function() {
    // Data bahan baku default dengan CEC dan pH
    const defaultMaterials = [
        { id: 1, name: "Sekam Padi Mentah", portion: 0, retention: 35.3, drainage: 64.7, porosity: 77.0, ph: 6.8, cec: 10 },
        { id: 2, name: "Sekam Padi Mentah (Fermentasi)", portion: 0, retention: 50, drainage: 50, porosity: 80.0, ph: 6.5, cec: 15 },
        { id: 3, name: "Sekam Padi Mentah (Oven)", portion: 0, retention: 40, drainage: 60, porosity: 82.0, ph: 7.0, cec: 12 },
        { id: 4, name: "Arang Sekam Padi", portion: 0, retention: 54.1, drainage: 45.9, porosity: 85.0, ph: 7.6, cec: 45.8 },
        { id: 5, name: "Humus Daun Bambu (Fermentasi)", portion: 0, retention: 60, drainage: 40, porosity: 65, ph: 6.2, cec: 25 },
        { id: 6, name: "Humus Daun Kaliandra (Fermentasi)", portion: 0, retention: 65, drainage: 35, porosity: 70, ph: 5.8, cec: 28 },
        { id: 7, name: "Humus Andam (Fermentasi)", portion: 0, retention: 65, drainage: 35, porosity: 70, ph: 5.7, cec: 30 },
        { id: 8, name: "Akar Pakis Cacah (Oven)", portion: 0, retention: 58.0, drainage: 42.0, porosity: 75, ph: 5.5, cec: 20 },
        { id: 9, name: "Biji Kapuk / Klenteng (Oven)", portion: 0, retention: 30, drainage: 70, porosity: 55, ph: 6.1, cec: 15 },
        { id: 10, name: "Cocopeat (Fermentasi)", portion: 0, retention: 80.0, drainage: 20.0, porosity: 94.0, ph: 6.0, cec: 30 },
        { id: 11, name: "Cocofiber", portion: 0, retention: 42.0, drainage: 58.0, porosity: 80, ph: 5.8, cec: 25 },
        { id: 12, name: "Perlite", portion: 0, retention: 35.0, drainage: 65.0, porosity: 90, ph: 7.2, cec: 1.5 },
        { id: 13, name: "Pasir Malang", portion: 0, retention: 25.4, drainage: 74.6, porosity: 50, ph: 6.9, cec: 7.3 },
        { id: 14, name: "Vermiculite", portion: 0, retention: 65.0, drainage: 35.0, porosity: 85, ph: 7.0, cec: 100 },
        { id: 15, name: "Zeolit", portion: 0, retention: 40.0, drainage: 60.0, porosity: 60, ph: 7.5, cec: 150 },
        { id: 16, name: "Top Soil", portion: 0, retention: 45, drainage: 30, porosity: 50, ph: 6.5, cec: 15 },
        { id: 17, name: "Pupuk Kandang Kambing (Fermentasi)", portion: 0, retention: 60, drainage: 40, porosity: 65, ph: 7.2, cec: 50 },
        { id: 18, name: "Vermicompost (Kascing)", portion: 0, retention: 70.0, drainage: 30.0, porosity: 75, ph: 6.8, cec: 60 },
        { id: 19, name: "Arang Kayu", portion: 0, retention: 25, drainage: 75, porosity: 80, ph: 8.5, cec: 20 },
        { id: 20, name: "Rockwool", portion: 0, retention: 80.0, drainage: 20.0, porosity: 95, ph: 7.0, cec: 5 },
        { id: 21, name: "Kerikil", portion: 0, retention: 5, drainage: 95, porosity: 40, ph: 7.1, cec: 1 },
        { id: 22, name: "Pasir Sungai", portion: 0, retention: 15.0, drainage: 85.0, porosity: 45, ph: 7.0, cec: 2 },
        { id: 23, name: "Hydroton", portion: 0, retention: 45, drainage: 55, porosity: 80, ph: 7.0, cec: 5 },
        { id: 24, name: "Spagnum Peat Moss", portion: 0, retention: 90.0, drainage: 10.0, porosity: 90, ph: 4.0, cec: 100 },
        { id: 25, name: "Biochar", portion: 0, retention: 70, drainage: 30, porosity: 85, ph: 8.0, cec: 40 },
        { id: 26, name: "Pumice", portion: 0, retention: 35, drainage: 65, porosity: 80, ph: 7.2, cec: 10 }
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
            row.append($('<td>').addClass('text-center').text(item.retention));
            row.append($('<td>').addClass('text-center').text(item.drainage));
            row.append($('<td>').addClass('text-center').text(item.porosity));
            row.append($('<td>').addClass('text-center').text(item.ph));
            row.append($('<td>').addClass('text-center').text(item.cec));
            
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
            
            const maxWaterRetention = mediaVolume * (avgRetention / 100);
            const retainedWater = Math.min(waterVolume, maxWaterRetention);
            const absorbedWater = retainedWater * 0.7; // Asumsi 70% air terserap
            const drainedWater = waterVolume - retainedWater;
            
            const absorbedPercentage = (absorbedWater / waterVolume) * 100;
            
            // Tampilkan informasi tambahan di Hasil Simulasi
            $('#water-volume').text(waterVolume.toFixed(2) + ' mL');
            $('#watering-duration').text(wateringDuration.toFixed(1) + ' detik');
            $('#pot-volume').text(potVolume.toFixed(2) + ' mL');
            
            // Tampilkan hasil
            $('#media-volume').text(mediaVolume.toFixed(2) + ' mL');
            $('#retained-water-value').text(retainedWater.toFixed(2) + ' mL');
            $('#absorbed-water-percentage').text(absorbedPercentage.toFixed(1) + '%');
            $('#drained-water-value').text(drainedWater.toFixed(2) + ' mL');

            // Animasi level air di pot
            const waterLevelHeight = (retainedWater / maxWaterRetention) * 65;
            $('#water-level').css('height', waterLevelHeight + '%');
            
            // Animasi media komposisi
            $('#media-composition').css('height', '65%');
            
            // Animasi penyiraman yang lebih menarik
            const wateringAnimation = $('#watering-animation');
            wateringAnimation.css('height', '30%');
            
            // Tambahkan efek tetesan air
            const waterDrops = $('<div>').addClass('water-drops');
            for (let i = 0; i < 15; i++) {
                const drop = $('<div>').addClass('water-drop');
                drop.css({
                    left: Math.random() * 100 + '%',
                    animationDelay: (Math.random() * 1.5) + 's'
                });
                waterDrops.append(drop);
            }
            wateringAnimation.append(waterDrops);
            
            setTimeout(function() {
                wateringAnimation.css('height', '0%');
                
                // Tambahkan efek riak air setelah penyiraman
                const ripple = $('<div>').addClass('water-ripple');
                $('.pot-body').append(ripple);
                
                setTimeout(function() {
                    ripple.remove();
                }, 1500);
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
        analysisHTML += '<th width="40%"><div class="tooltip-container"><i class="fas fa-seedling"></i><span class="tooltip-text tooltip-bottom">Nama Bahan</span></div></th>';
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
                analysisHTML += '<td align="right">' + item.portion.toFixed(0) + '</td>';
                analysisHTML += '<td align="right">' + itemVolume.toFixed(2) + '</td>';
                analysisHTML += '<td align="right">' + percentage + '</td>';
                analysisHTML += '<td align="right">' + item.retention.toFixed(0) + '</td>';
                analysisHTML += '<td align="right">' + item.drainage.toFixed(0) + '</td>';
                analysisHTML += '<td align="right">' + item.porosity.toFixed(0) + '</td>';
                analysisHTML += '<td align="right">' + item.ph.toFixed(1) + '</td>';
                analysisHTML += '<td align="right">' + item.cec.toFixed(2) + '</td>';
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
            analysisHTML += '<li>Media cepat kering, menyebabkan stres air pada tanaman</li>';
            analysisHTML += '<li>Nutrisi tercuci lebih cepat sebelum diserap akar</li>';
            analysisHTML += '<li>Pertumbuhan terhambat karena defisit air kronis</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Daun layu, tepi daun kering, pertumbuhan lambat</p>';
        } else if (retention >= 40 && retention <= 60) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Retensi air optimal untuk Aglaonema berdasarkan penelitian.</strong> Rentang 40-60% ideal untuk pertumbuhan.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Keseimbangan air yang sempurna untuk metabolisme Aglaonema</li>';
            analysisHTML += '<li>Media tidak terlalu basah atau terlalu kering</li>';
            analysisHTML += '<li>Frekuensi penyiraman 5-7 hari sekali optimal</li>';
            analysisHTML += '<li>Akar dapat bernafas dan menyerap nutrisi dengan baik</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan optimal, daun hijau segar, akar sehat</p>';
        } else {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Retensi air mendekati optimal untuk Aglaonema.</strong> Rentang ideal adalah 40-60%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kondisi media cukup baik untuk pertumbuhan Aglaonema</li>';
            analysisHTML += '<li>Perhatikan kelembaban lingkungan untuk penyiraman</li>';
            analysisHTML += '<li>Monitor kondisi tanaman secara berkala</li>';
            analysisHTML += '</ul>';
        }
        analysisHTML += '<p><strong>Air yang tertahan:</strong> ' + retainedWater.toFixed(2) + ' mL</p>';
        analysisHTML += '</div>';
        
        // Analisis Drainase berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-water me-2"></i>Drainase: ' + drainage.toFixed(1) + '%</h6>';
        
        // Berdasarkan riset: Drainase optimal 30-50% untuk Aglaonema
        if (drainage > 60) {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Drainase sangat tinggi untuk Aglaonema.</strong> Penelitian menunjukkan drainase optimal 30-50%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Risiko genangan air sangat rendah</li>';
            analysisHTML += '<li>Nutrisi dapat tercuci dengan cepat sebelum diserap</li>';
            analysisHTML += '<li>Frekuensi pemupukan perlu ditingkatkan 1.5-2x</li>';
            analysisHTML += '<li>Akar tidak sempat menyerap air dan nutrisi secara optimal</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Defisiensi nutrisi, pertumbuhan tidak maksimal</p>';
        } else if (drainage < 20) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Drainase rendah untuk standar Aglaonema.</strong> Berdasarkan riset, drainase 30-50% optimal.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Risiko tinggi untuk pembusukan akar</li>';
            analysisHTML += '<li>Media cenderung tergenang, kondisi anaerobik</li>';
            analysisHTML += '<li>Perkembangan jamur patogen meningkat</li>';
            analysisHTML += '<li>Akar kesulitan bernafas</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Busuk akar, daun menguning, pertumbuhan terhambat</p>';
        } else if (drainage >= 30 && drainage <= 50) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Drainase optimal untuk Aglaonema.</strong> Sesuai dengan penelitian tentang media Aglaonema.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Aliran air yang seimbang, tidak terlalu cepat atau lambat</li>';
            analysisHTML += '<li>Risiko genangan air minimal</li>';
            analysisHTML += '<li>Nutrisi tidak cepat tercuci, tersedia cukup lama</li>';
            analysisHTML += '<li>Akar mendapatkan oksigen yang cukup</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Sistem perakaran sehat, penyerapan nutrisi optimal</p>';
        } else {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Drainase mendekati optimal untuk Aglaonema.</strong> Rentang ideal adalah 30-50%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kondisi drainase cukup baik</li>';
            analysisHTML += '<li>Perhatikan sistem drainase pot</li>';
            analysisHTML += '<li>Monitor kecepatan aliran air saat penyiraman</li>';
            analysisHTML += '</ul>';
        }
        analysisHTML += '<p><strong>Air yang mengalir keluar:</strong> ' + drainedWater.toFixed(2) + ' mL</p>';
        analysisHTML += '</div>';
        
        // Analisis Porositas berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-wind me-2"></i>Porositas: ' + porosity.toFixed(1) + '%</h6>';
        
        // Berdasarkan riset: Porositas optimal 20-30% untuk Aglaonema
        if (porosity > 40) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Porositas tinggi sangat baik untuk Aglaonema.</strong> Penelitian menunjukkan porositas >20% optimal.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Aerasi akar yang sangat baik</li>';
            analysisHTML += '<li>Pertumbuhan akar optimal dengan oksigen cukup</li>';
            analysisHTML += '<li>Risiko pembusukan akar sangat rendah</li>';
            analysisHTML += '<li>Aktivitas mikroorganisme menguntungkan meningkat</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Sistem perakaran berkembang optimal, tanaman tumbuh subur</p>';
        } else if (porosity < 15) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>Porositas rendah untuk kebutuhan Aglaonema.</strong> Berdasarkan penelitian, porositas minimal 20% diperlukan.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Aerasi akar kurang optimal</li>';
            analysisHTML += '<li>Risiko kekurangan oksigen pada akar</li>';
            analysisHTML += '<li>Pertumbuhan akar terhambat</li>';
            analysisHTML += '<li>Media cenderung padat dan kompak</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan lambat, daun kecil, akar tidak berkembang maksimal</p>';
        } else if (porosity >= 20 && porosity <= 30) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>Porositas optimal untuk Aglaonema.</strong> Sesuai dengan standar penelitian.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Aerasi akar memadai untuk respirasi</li>';
            analysisHTML += '<li>Keseimbangan udara dan air yang baik</li>';
            analysisHTML += '<li>Pertumbuhan akar sehat dan optimal</li>';
            analysisHTML += '<li>Struktur media gembur dan tidak padat</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan vigor, daun lebar dan sehat</p>';
        } else {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>Porositas cukup baik untuk Aglaonema.</strong> Rentang ideal adalah 20-30%.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kondisi aerasi memadai</li>';
            analysisHTML += '<li>Perhatikan kompaksi media seiring waktu</li>';
            analysisHTML += '<li>Monitor perkembangan sistem perakaran</li>';
            analysisHTML += '</ul>';
        }
        analysisHTML += '</div>';
        
        // Analisis pH berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-flask me-2"></i>Tingkat Keasaman (pH): ' + ph.toFixed(1) + '</h6>';
        
        // Berdasarkan riset: pH optimal 5.5-6.5 untuk Aglaonema
        if (ph > 7.0) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>pH terlalu tinggi (alkalin) untuk Aglaonema.</strong> Penelitian menunjukkan pH optimal 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Beberapa nutrisi mikro (Fe, Mn, Zn, Cu) tidak tersedia</li>';
            analysisHTML += '<li>Risiko klorosis (menguningnya daun) karena defisiensi besi</li>';
            analysisHTML += '<li>Fosfor terikat menjadi tidak tersedia</li>';
            analysisHTML += '<li>Aktivitas mikroba menguntungkan menurun</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Daun menguning, pertumbuhan terhambat, defisiensi nutrisi</p>';
        } else if (ph < 5.0) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>pH terlalu rendah (asam) untuk Aglaonema.</strong> Berdasarkan riset, pH optimal 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Beberapa nutrisi (Ca, Mg, Mo) tidak tersedia</li>';
            analysisHTML += '<li>Risiko keracunan aluminium dan mangan</li>';
            analysisHTML += '<li>Aktivitas mikroba tanah tidak optimal</li>';
            analysisHTML += '<li>Fosfor terikat aluminium menjadi tidak tersedia</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan kerdil, nekrosis daun, defisiensi kalsium</p>';
        } else if (ph >= 5.5 && ph <= 6.5) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>pH optimal untuk Aglaonema.</strong> Sesuai dengan penelitian tentang kebutuhan Aglaonema.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Semua nutrisi tersedia secara optimal untuk tanaman</li>';
            analysisHTML += '<li>Aktivitas mikroorganisme menguntungkan maksimal</li>';
            analysisHTML += '<li>Penyerapan nutrisi oleh akar efisien</li>';
            analysisHTML += '<li>Pertumbuhan optimal tanpa hambatan nutrisi</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Warna daun cerah, pertumbuhan vigor, kesehatan optimal</p>';
        } else {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>pH mendekati optimal untuk Aglaonema.</strong> Rentang ideal adalah 5.5-6.5.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Ketersediaan nutrisi cukup baik</li>';
            analysisHTML += '<li>Monitor pH secara berkala</li>';
            analysisHTML += '<li>Perhatikan gejala defisiensi nutrisi</li>';
            analysisHTML += '</ul>';
        }
        analysisHTML += '</div>';

        // Analisis CEC berdasarkan riset Aglaonema
        analysisHTML += '<div class="analysis-point">';
        analysisHTML += '<h6><i class="fas fa-exchange-alt me-2"></i>Kapasitas Tukar Kation (CEC): ' + cec.toFixed(1) + ' meq/100g</h6>';
        
        // Berdasarkan riset: CEC optimal 15-30 meq/100g untuk Aglaonema
        if (cec > 40) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>CEC tinggi sangat baik untuk Aglaonema.</strong> Penelitian menunjukkan CEC tinggi meningkatkan ketersediaan nutrisi.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi sangat baik</li>';
            analysisHTML += '<li>Nutrisi tidak mudah tercuci oleh air penyiraman</li>';
            analysisHTML += '<li>Frekuensi pemupukan dapat dikurangi</li>';
            analysisHTML += '<li>Ketersediaan nutrisi stabil untuk tanaman</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan subur, daun hijau intensif, kesehatan optimal</p>';
        } else if (cec < 10) {
            analysisHTML += '<p class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i><strong>CEC rendah untuk kebutuhan Aglaonema.</strong> Berdasarkan penelitian, CEC minimal 15 meq/100g diperlukan.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi rendah</li>';
            analysisHTML += '<li>Nutrisi mudah tercuci oleh air penyiraman</li>';
            analysisHTML += '<li>Frekuensi pemupukan perlu ditingkatkan 2-3x</li>';
            analysisHTML += '<li>Risiko defisiensi nutrisi lebih tinggi</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan lambat, daun pucat, defisiensi nutrisi</p>';
        } else if (cec >= 15 && cec <= 30) {
            analysisHTML += '<p class="text-success"><i class="fas fa-check-circle me-1"></i><strong>CEC optimal untuk Aglaonema.</strong> Sesuai dengan standar penelitian.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi cukup baik</li>';
            analysisHTML += '<li>Nutrisi tersedia secara bertahap untuk tanaman</li>';
            analysisHTML += '<li>Frekuensi pemupukan standar (2-4 minggu sekali)</li>';
            analysisHTML += '<li>Keseimbangan nutrisi terjaga</li>';
            analysisHTML += '</ul>';
            analysisHTML += '<p><strong>Dampak pada Aglaonema:</strong> Pertumbuhan stabil, daun sehat, tidak ada gejala defisiensi</p>';
        } else {
            analysisHTML += '<p class="text-info"><i class="fas fa-info-circle me-1"></i><strong>CEC cukup baik untuk Aglaonema.</strong> Rentang ideal adalah 15-30 meq/100g.</p>';
            analysisHTML += '<ul>';
            analysisHTML += '<li>Kemampuan menyimpan nutrisi memadai</li>';
            analysisHTML += '<li>Perhatikan jadwal pemupukan yang tepat</li>';
            analysisHTML += '<li>Monitor gejala defisiensi nutrisi</li>';
            analysisHTML += '</ul>';
        }
        analysisHTML += '</div>';

        // Rekomendasi berdasarkan analisis
        analysisHTML += '<div class="pros-cons">';
        analysisHTML += '<div class="pros">';
        analysisHTML += '<h6><i class="fas fa-thumbs-up me-2"></i>Kelebihan Media</h6>';
        
        let prosList = '<ul>';
        
        // Retensi
        if (retention >= 40 && retention <= 60) {
            prosList += '<li>Retensi air optimal untuk Aglaonema</li>';
        } else if (retention > 30 && retention < 70) {
            prosList += '<li>Retensi air cukup baik</li>';
        }
        
        // Drainase
        if (drainage >= 30 && drainage <= 50) {
            prosList += '<li>Drainase optimal untuk mencegah genangan</li>';
        } else if (drainage > 20 && drainage < 60) {
            prosList += '<li>Drainase cukup baik</li>';
        }
        
        // Porositas
        if (porosity >= 20) {
            prosList += '<li>Porositas baik untuk aerasi akar</li>';
        }
        
        // pH
        if (ph >= 5.5 && ph <= 6.5) {
            prosList += '<li>pH optimal untuk ketersediaan nutrisi</li>';
        } else if (ph > 5.0 && ph < 7.0) {
            prosList += '<li>pH dalam rentang yang dapat ditoleransi</li>';
        }
        
        // CEC
        if (cec >= 15) {
            prosList += '<li>Kemampuan menyimpan nutrisi baik</li>';
        }
        
        if (prosList === '<ul>') {
            prosList += '<li>Media dapat digunakan dengan pemantauan ketat</li>';
        }
        
        prosList += '</ul>';
        analysisHTML += prosList;
        analysisHTML += '</div>';
        
        analysisHTML += '<div class="cons">';
        analysisHTML += '<h6><i class="fas fa-thumbs-down me-2"></i>Perbaikan yang Diperlukan</h6>';
        
        let consList = '<ul>';
        
        // Retensi
        if (retention > 70) {
            consList += '<li>Kurangi bahan dengan retensi tinggi (cocopeat, rockwool)</li>';
        } else if (retention < 30) {
            consList += '<li>Tambah bahan dengan retensi sedang (sekam fermentasi, humus)</li>';
        }
        
        // Drainase
        if (drainage < 20) {
            consList += '<li>Tambah bahan dengan drainase tinggi (perlite, pasir malang)</li>';
        } else if (drainage > 60) {
            consList += '<li>Kurangi bahan dengan drainase sangat tinggi</li>';
        }
        
        // Porositas
        if (porosity < 15) {
            consList += '<li>Tambah bahan berpori (arang sekam, perlite)</li>';
        }
        
        // pH
        if (ph > 7.0) {
            consList += '<li>Turunkan pH dengan bahan asam (peat moss, humus daun)</li>';
        } else if (ph < 5.0) {
            consList += '<li>Naikkan pH dengan bahan alkalin (kapur pertanian)</li>';
        }
        
        // CEC
        if (cec < 10) {
            consList += '<li>Tambah bahan dengan CEC tinggi (vermikompos, zeolit)</li>';
        }
        
        if (consList === '<ul>') {
            consList += '<li>Tidak ada perbaikan signifikan yang diperlukan</li>';
        }
        
        consList += '</ul>';
        analysisHTML += consList;
        analysisHTML += '</div>';
        analysisHTML += '</div>';
        
        // Rekomendasi Umum Berdasarkan Riset Aglaonema
        analysisHTML += '<div class="analysis-point mt-3">';
        analysisHTML += '<h6><i class="fas fa-lightbulb me-2"></i>Rekomendasi Berdasarkan Penelitian Aglaonema</h6>';
        
        analysisHTML += '<p><strong>Komposisi Media Optimal Aglaonema (berdasarkan penelitian):</strong></p>';
        analysisHTML += '<ul>';
        analysisHTML += '<li><strong>Komponen utama (60-70%):</strong> Arang sekam, sekam mentah/fermentasi, cocofiber</li>';
        analysisHTML += '<li><strong>Komponen organik (20-30%):</strong> Humus daun, pupuk kandang matang, vermikompos</li>';
        analysisHTML += '<li><strong>Komponen drainase (10-20%):</strong> Pasir malang, perlite, zeolit</li>';
        analysisHTML += '<li><strong>pH target:</strong> 5.5-6.5</li>';
        analysisHTML += '<li><strong>Retensi air target:</strong> 40-60%</li>';
        analysisHTML += '<li><strong>Frekuensi penyiraman:</strong> 5-7 hari sekali (sesuaikan dengan lingkungan)</li>';
        analysisHTML += '</ul>';
        
        analysisHTML += '<p><strong>Rekomendasi Penyiraman:</strong></p>';
        analysisHTML += '<ul>';
        analysisHTML += '<li>Volume air: ' + (mediaVolume * 0.3).toFixed(0) + '-' + (mediaVolume * 0.5).toFixed(0) + ' mL per penyiraman</li>';
        analysisHTML += '<li>Frekuensi: 5-7 hari sekali (periksa kelembaban media)</li>';
        analysisHTML += '<li>Waktu terbaik: Pagi hari (sebelum jam 10) atau sore hari (setelah jam 16)</li>';
        analysisHTML += '<li>Hindari: Penyiraman berlebihan dan genangan di dasar pot</li>';
        analysisHTML += '</ul>';
        
        analysisHTML += '<p><strong>Pemantauan:</strong></p>';
        analysisHTML += '<ul>';
        analysisHTML += '<li>Periksa kelembaban media dengan jari sebelum menyiram</li>';
        analysisHTML += '<li>Monitor warna dan kondisi daun secara berkala</li>';
        analysisHTML += '<li>Perhatikan drainase saat penyiraman</li>';
        analysisHTML += '<li>Evaluasi komposisi media setiap 6-12 bulan</li>';
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        analysisContent.html(analysisHTML);
    }
    
    // Reset simulasi
    function resetSimulation() {
        $('#water-level').css('height', '0%');
        $('#media-composition').css('height', '0%');
        $('#watering-animation').css('height', '0%').empty();
        $('#simulation-result').slideUp();
        $('#media-properties').slideUp();
        $('#analysis-card').slideUp();
        showSnackbar('Simulasi berhasil direset');
    }
    
    // Simpan komposisi
    function saveComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk disimpan.');
            return;
        }
        
        showCustomPrompt('Simpan Komposisi', 'Masukkan nama untuk komposisi ini:', function(name) {
            if (!name || name.trim() === '') {
                showCustomAlert('Peringatan', 'Nama komposisi tidak boleh kosong.');
                return;
            }
            
            const savedCompositions = getSavedCompositions();
            const newComposition = {
                id: Date.now(),
                name: name.trim(),
                date: new Date().toLocaleDateString('id-ID'),
                composition: [...composition]
            };
            
            savedCompositions.push(newComposition);
            localStorage.setItem('aglaonemaCompositions', JSON.stringify(savedCompositions));
            
            showSnackbar('Komposisi berhasil disimpan');
        });
    }
    
    // Lihat komposisi tersimpan
    function viewSavedCompositions() {
        const savedCompositions = getSavedCompositions();
        const container = $('#savedCompositionsList');
        container.empty();
        
        if (savedCompositions.length === 0) {
            container.append($('<p>').addClass('text-center text-muted p-4').text('Belum ada komposisi yang disimpan'));
            return;
        }
        
        savedCompositions.forEach((comp, index) => {
            const item = $('<div>').addClass('saved-item')
                .click(() => loadComposition(comp))
                .append(
                    $('<div>').append(
                        $('<strong>').text(comp.name),
                        $('<div>').addClass('text-muted small').text('Disimpan: ' + comp.date + ' | Bahan: ' + comp.composition.length)
                    ),
                    $('<div>').addClass('delete-saved')
                        .html('<i class="fas fa-trash"></i>')
                        .click(function(e) {
                            e.stopPropagation();
                            deleteSavedComposition(index);
                        })
                );
            
            container.append(item);
        });
        
        showModal($('#savedModal'));
    }
    
    // Muat komposisi dari simpanan
    function loadComposition(comp) {
        composition = [...comp.composition];
        renderComposition();
        updateTotalPortion();
        hideModal($('#savedModal'));
        showSnackbar('Komposisi ' + comp.name + ' berhasil dimuat');
    }
    
    // Hapus komposisi tersimpan
    function deleteSavedComposition(index) {
        showCustomConfirm('Hapus Komposisi', 'Apakah Anda yakin ingin menghapus komposisi ini?', function(confirmed) {
            if (!confirmed) return;
            
            const savedCompositions = getSavedCompositions();
            savedCompositions.splice(index, 1);
            localStorage.setItem('aglaonemaCompositions', JSON.stringify(savedCompositions));
            
            viewSavedCompositions();
            showSnackbar('Komposisi berhasil dihapus');
        });
    }
    
    // Dapatkan daftar komposisi tersimpan
    function getSavedCompositions() {
        const saved = localStorage.getItem('aglaonemaCompositions');
        return saved ? JSON.parse(saved) : [];
    }
    
    // Muat komposisi dari localStorage
    function loadCompositionsFromStorage() {
        const savedCompositions = getSavedCompositions();
        if (savedCompositions.length > 0) {
            // Optional: Tampilkan notifikasi bahwa ada komposisi tersimpan
        }
    }
    
    // Ekspor hasil simulasi ke file TXT
    function exportSimulation() {
        if (!$('#simulation-result').is(':visible')) {
            showCustomAlert('Peringatan', 'Jalankan simulasi terlebih dahulu sebelum mengekspor.');
            return;
        }
        
        // Ambil data dari simulasi
        const potDiameter = $('#pot-diameter').val();
        const potHeight = $('#pot-height').val();
        const mediaPercentage = $('#media-percentage').val();
        const waterVolume = $('#water-volume').text();
        const wateringDuration = $('#watering-duration').text();
        const potVolume = $('#pot-volume').text();
        const mediaVolume = $('#media-volume').text();
        const retainedWater = $('#retained-water-value').text();
        const absorbedWater = $('#absorbed-water-percentage').text();
        const drainedWater = $('#drained-water-value').text();
        
        // Ambil data properti media
        const avgRetention = $('#avg-retention').text();
        const avgDrainage = $('#avg-drainage').text();
        const avgPorosity = $('#avg-porosity').text();
        const avgPH = $('#avg-ph').text();
        const avgCEC = $('#avg-cec').text();
        
        // Ambil data komposisi
        let compositionText = '';
        const totalPortion = composition.reduce((sum, item) => sum + item.portion, 0);
        
        composition.forEach(item => {
            if (item.portion > 0) {
                const percentage = totalPortion > 0 ? ((item.portion / totalPortion) * 100).toFixed(1) : 0;
                compositionText += `- ${item.name}: ${item.portion} bagian (${percentage}%)\n`;
            }
        });
        
        // Ambil data analisis - format sama seperti di aplikasi
        const analysisContent = $('#analysis-content');
        let analysisText = '';
        
        // Ambil setiap bagian analisis
        analysisContent.find('.analysis-point').each(function() {
            const title = $(this).find('h6').text();
            analysisText += `${title}\n`;
            
            // Ambil semua konten dalam analysis-point
            $(this).contents().each(function() {
                if (this.nodeType === 3) { // Text node
                    const text = $(this).text().trim();
                    if (text) analysisText += `${text}\n`;
                } else if (this.tagName === 'P') {
                    analysisText += `${$(this).text()}\n`;
                } else if (this.tagName === 'UL') {
                    $(this).find('li').each(function() {
                        analysisText += `• ${$(this).text()}\n`;
                    });
                }
            });
            
            analysisText += '\n';
        });
        
        // Ambil bagian pro dan kontra
        analysisText += "KELEBIHAN MEDIA INI:\n";
        analysisContent.find('.pros li').each(function() {
            analysisText += `• ${$(this).text()}\n`;
        });
        
        analysisText += "\nPERBAIKAN YANG DIPERLUKAN:\n";
        analysisContent.find('.cons li').each(function() {
            analysisText += `• ${$(this).text()}\n`;
        });
        
        // Ambil rekomendasi umum
        const lastAnalysisPoint = analysisContent.find('.analysis-point').last();
        analysisText += "\nREKOMENDASI UMUM BERDASARKAN PENELITIAN AGLAONEMA:\n";
        
        lastAnalysisPoint.find('p, ul').each(function() {
            if ($(this).is('p')) {
                analysisText += `${$(this).text()}\n`;
            } else if ($(this).is('ul')) {
                $(this).find('li').each(function() {
                    analysisText += `• ${$(this).text()}\n`;
                });
            }
        });
        
        // Format data untuk ekspor ke TXT - SAMA PERSIS dengan tampilan di aplikasi
        let exportData = '';
        exportData += 'HASIL SIMULASI PENYIRAMAN MEDIA TANAM AGLAONEMA\n';
        exportData += '=============================================\n\n';
        
        // A. UKURAN POT YANG DISIMULASIKAN
        exportData += 'A. UKURAN POT YANG DISIMULASIKAN:\n';
        exportData += '---------------------------------------------\n';
        exportData += `Diameter Pot: ${potDiameter} cm\n`;
        exportData += `Tinggi Pot: ${potHeight} cm\n`;
        exportData += `Persentase Media dalam Pot: ${mediaPercentage}%\n\n`;
        
        // B. KOMPOSISI MEDIA TANAM
        exportData += 'B. KOMPOSISI MEDIA TANAM:\n';
        exportData += '---------------------------------------------\n';
        exportData += compositionText + '\n';
        
        // C. HASIL SIMULASI
        exportData += 'C. HASIL SIMULASI:\n';
        exportData += '---------------------------------------------\n';
        exportData += `Volume Pot: ${potVolume}\n`;
        exportData += `Volume Air yang Digunakan: ${waterVolume}\n`;
        exportData += `Durasi Penyiraman: ${wateringDuration}\n`;
        exportData += `Volume Media: ${mediaVolume}\n`;
        exportData += `Air yang Tertahan di Media: ${retainedWater}\n`;
        exportData += `Air yang Terserap Media: ${absorbedWater}\n`;
        exportData += `Air yang Mengalir Keluar: ${drainedWater}\n\n`;
        
        exportData += 'SIFAT MEDIA CAMPURAN (Rata-rata Tertimbang):\n';
        exportData += `- Retensi Media: ${avgRetention}\n`;
        exportData += `- Drainase Media: ${avgDrainage}\n`;
        exportData += `- Porositas Media: ${avgPorosity}\n`;
        exportData += `- pH Media: ${avgPH}\n`;
        exportData += `- CEC Media: ${avgCEC}\n\n`;
        
        // D. ANALISIS MEDIA & REKOMENDASI
        exportData += 'D. ANALISIS MEDIA & REKOMENDASI:\n';
        exportData += '---------------------------------------------\n';
        exportData += analysisText;
        
        exportData += '\n' + '='.repeat(50) + '\n';
        exportData += 'Aplikasi Simulasi Penyiraman Media Tanam Aglaonema\n';
        exportData += `Dibuat pada: ${new Date().toLocaleString('id-ID')}\n`;
        
        // Buat blob dan unduh file
        const blob = new Blob([exportData], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hasil-simulasi-aglaonema.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSnackbar('Hasil simulasi berhasil diekspor dalam format TXT');
    }
    
    // Ekspor komposisi ke JSON
    function exportComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk diekspor.');
            return;
        }
        
        const exportData = {
            name: 'Komposisi Media Aglaonema',
            date: new Date().toISOString(),
            composition: composition
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = $('<a>').attr({
            href: url,
            download: 'komposisi_aglaonema_' + new Date().toISOString().slice(0, 10) + '.json'
        })[0];
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSnackbar('Komposisi berhasil diekspor');
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
                
                if (!data.composition || !Array.isArray(data.composition)) {
                    throw new Error('Format file tidak valid');
                }
                
                // Validasi data komposisi
                const validComposition = data.composition.filter(item => 
                    item.id && item.name && 
                    typeof item.retention === 'number' &&
                    typeof item.drainage === 'number' &&
                    typeof item.porosity === 'number'
                );
                
                if (validComposition.length === 0) {
                    throw new Error('Tidak ada data komposisi yang valid');
                }
                
                composition = validComposition;
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
    
    // Inisialisasi aplikasi
    initApp();
});
