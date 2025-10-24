$(document).ready(function() {
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
