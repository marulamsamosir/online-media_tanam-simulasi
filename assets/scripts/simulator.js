$(document).ready(function() {
    let materials = [...masterDataMaterials];
    let sifats = [...masterDataSifats];
    let nutrientMakros = [...masterDataNutrientMakros];
    let nutrientMikros = [...masterDataNutrientMikros];
    let composition = [];
    let compSifat = [];
    let selectedMaterial = null;
    let mediaVolume = 0;
    let dataComponentList = [
        'makro',
        'mikro',
        'mineral',
        'organik'
    ]
    
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
        
        $('#saveCompositionModalClose, #saveCompositionModalCloseBtn').click(function() {
            hideModal($('#saveCompositionModal'));
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

        // Event listener untuk tombol simpan komposisi
        $('#saveCompositionConfirm').click(function() {
            const name = $('#saveCompositionName').val();
            const description = $('#saveCompositionDescription').val();
            
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
                description: description,
                date: new Date().toLocaleDateString('id-ID'),
                composition: simplifiedComposition
            };
            
            savedCompositions.push(newComposition);
            localStorage.setItem('savedCompositions', JSON.stringify(savedCompositions));
            
            hideModal($('#saveCompositionModal'));
            showSnackbar('Komposisi berhasil disimpan');
        });

        // Event listener untuk tombol export semua komposisi
        $('#export-all-compositions').click(exportAllCompositions);

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

            material.sifats.forEach(sifat => {
                const tmpSifat = sifats.find(tSifat => tSifat.name === sifat.name);

                if (tmpSifat) {
                    details.append($('<span>').addClass('material-detail').append(
                        $('<i>').addClass('fas ' + tmpSifat.style),
                        $('<span>').text(sifat.value + ' ' + tmpSifat.unit)
                    ));
                }
            });

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
            
            // SIFAT 
            const propertieRow = $('<div>').addClass('properties-list');

            item.sifats.forEach(sifat => {
                const tmpSifat = sifats.find(tSifat => tSifat.name === sifat.name);

                if (tmpSifat) {
                    propertieRow.append(
                        $('<div>').addClass('property-item').append(
                            $('<div>').addClass('icon-tooltip').append(
                                $('<i>').addClass('fas ' + tmpSifat.style),
                                $('<span>').addClass('tooltip-text').text(tmpSifat.label_sub  + ' ' + tmpSifat.unit)
                            ),
                            $('<span>').addClass('property-value').text(sifat.value.toFixed(1))
                        )
                    ); 
                }
            });
            
            mainRow.append($('<td>').addClass('text-right').append(propertieRow));
            
            // NUTRISI 
            const nutrientRow = $('<div>').addClass('nutrients-list');

            // Makro
            item.nutrients.makro.forEach(nutrient => {
                const tmpNutrient = nutrientMakros.find(tNutrient => tNutrient.symbol === nutrient.symbol);

                if (tmpNutrient) {
                    nutrientRow.append(
                        $('<div>').addClass('property-item').append(
                            $('<div>').addClass('icon-tooltip').append(
                                $('<span>').addClass('tooltip-text').text(tmpNutrient.name_id),
                                $('<span>').addClass('nutrient-value').text(tmpNutrient.symbol)
                            ),
                            $('<span>').addClass('nutrient-value').text(nutrient.value.toFixed(2))
                        )
                    );
                }
            });

            // Mikro
            item.nutrients.mikro.forEach(nutrient => {
                const tmpNutrient = nutrientMikros.find(tNutrient => tNutrient.symbol === nutrient.symbol);

                if (tmpNutrient) {
                    nutrientRow.append(
                        $('<div>').addClass('property-item').append(
                            $('<div>').addClass('icon-tooltip').append(
                                $('<span>').addClass('tooltip-text').text(tmpNutrient.name_id),
                                $('<span>').addClass('nutrient-value').text(tmpNutrient.symbol)
                            ),
                            $('<span>').addClass('nutrient-value').text(nutrient.value.toFixed(2))
                        )
                    );
                }
            });

            // Minerals
            item.minerals.forEach(mineral => {
                nutrientRow.append(
                    $('<div>').addClass('property-item').append(
                        $('<div>').addClass('icon-tooltip').append(
                            $('<span>').addClass('tooltip-text').text(mineral.name_id),
                            $('<span>').addClass('nutrient-value').text(mineral.symbol)
                        ),
                        $('<span>').addClass('nutrient-value').text(mineral.value.toFixed(2) + ' ' + mineral.unit)
                    )
                );
            });

            // Organic Components
            item.organic_components.forEach(organic => {
                nutrientRow.append(
                    $('<div>').addClass('property-item').append(
                        $('<div>').addClass('icon-tooltip').append(
                            // $('<span>').addClass('tooltip-text').text(organic.name),
                            // $('<span>').addClass('nutrient-value').text(organic.name)
                        ),
                        $('<span>').addClass('nutrient-value').text(organic.name)
                    )
                );
            });

            mainRow.append($('<td>').addClass('text-right').append(nutrientRow));
            
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
    
    // Simpan komposisi dengan modal baru
    function saveComposition() {
        if (composition.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi untuk disimpan.');
            return;
        }
        
        // Reset form
        $('#saveCompositionName').val('');
        $('#saveCompositionDescription').val('');
        
        // Tampilkan modal
        showModal($('#saveCompositionModal'));
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

            validComposition.forEach(comp => {
                comp.sifats.forEach(sifat => {
                    const tmpSifat = sifats.find(tSifat => tSifat.name === sifat.name);

                    if (tmpSifat) {
                        if (sifat.name === 'retention') {
                            avgRetention += (sifat.value * comp.portion) / totalPortion;
                        }
                        else if (sifat.name === 'drainage') {
                            avgDrainage += (sifat.value * comp.portion) / totalPortion;
                        }
                        else if (sifat.name === 'porosity') {
                            avgPorosity += (sifat.value * comp.portion) / totalPortion;
                        }
                        else if (sifat.name === 'ph') {
                            avgPH += (sifat.value * comp.portion) / totalPortion;
                        }
                        else if (sifat.name === 'cec') {
                            avgCEC += (sifat.value * comp.portion) / totalPortion;
                        }
                    }
                });
            });

            // Tampilkan properti media
            $('#avg-retention').text(avgRetention.toFixed(1));
            $('#avg-drainage').text(avgDrainage.toFixed(1));
            $('#avg-porosity').text(avgPorosity.toFixed(1));
            $('#avg-ph').text(avgPH.toFixed(1));
            $('#avg-cec').text(avgCEC.toFixed(1) + ' meq/100g');

            $('#media-properties').show();

            // Simulasi penyiraman
            const waterVolume = parseFloat($('#water-volume-input').val());
            const wateringDuration = parseFloat($('#watering-duration-input').val());

            const poreSpaceVolume = (mediaVolume * avgPorosity) / 100;
            const maxWaterRetention = poreSpaceVolume * avgRetention;
            const retainedWater = Math.min(waterVolume, maxWaterRetention);
            const absorbedWater = retainedWater * 0.7; // Asumsi 70% air terserap
            const drainedWater = waterVolume - retainedWater;

            const absorbedPercentage = (retainedWater / mediaVolume) * 100;
            
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
            
            // // Tampilkan persentase kebasahan media
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

    function addNutrientData(data, category, name, value) {
        const tmpData = data.find(tData => tData.name === name);

        if (tmpData) {
            tmpData.value += value; 
        }
        else {
            data.push({
                'category': category,
                'name' : name,
                'value' : value
            });
        }
    }

    function printSfatRecommendationList(sifatName, sifatCase) {
        const tmpSifat = sifats.find(tSifat => tSifat.name === sifatName);
        let boxRec = '';
        let lst = '';

        if (tmpSifat) {
            const tmpRec = tmpSifat.recommendation.find(tRec => tRec.case === sifatCase);

            if (tmpRec) {
                if (tmpRec.data.length > 0) {
                    boxRec = $('<div>').addClass('recommendation-item');
                    lst = $('<ul>');

                    boxRec.append(
                        $('<p>').append(
                            $('<i>').addClass('fas fa-lightbulb me-2'),
                            $('<strong>').text(tmpRec.title_sub)
                        )
                    );

                    tmpRec.data.forEach(rec => {
                        lst.append($('<li>').text(rec));
                    });

                    boxRec.append( lst );
                }
            }
        }

        return boxRec;
    }

    function printRecommendationList(objData, caseSifat) {
        const boxRec = $('<div>').addClass('recommendation-item');
        const lst = $('<ul>');
        let ketemu = false;

        objData.forEach(rec => {
            if (rec.case === caseSifat) {

                boxRec.append(
                    $('<p>').append(
                        $('<i>').addClass('fas fa-lightbulb me-2'),
                        $('<strong>').text(rec.title_sub)
                    )
                );

                if (rec.data.length > 0)
                    ketemu = true;
                
                rec.data.forEach(data => {
                    lst.append($('<li>').text(data));
                });

                boxRec.append(lst);
            }
        });

        return (ketemu) ? boxRec : '';
    }
    
    // Generate analisis dan rekomendasi
    function generateAnalysis(retention, drainage, porosity, cec, ph, retainedWater, drainedWater, mediaVolume, totalPortion) {
        let dataNutrient = [];
        const container = $('#analysis-content');
        container.empty();

        const header = $('<div>').addClass('mb-3');
        header.append(
            $('<h6>').append(
                $('<i>').addClass('fas fa-chart-line me-2'),
                'Analisis Media Tanam'
            ),
            $('<p>').text('Berikut adalah analisis detail mengenai komposisi media Anda :')
        );

        // Detail Komposisi Media - dengan ikon dan tooltip
        const komposisi = $('<div>').addClass('composition-details');
        komposisi.append(
            $('<h6>').append(
                $('<i>').addClass('fas fa-list me-2'),
                'Detail Komposisi Media'
            ),
            $('<p>').append(
                'Total Volume Media : ',
                $('<strong>').text(mediaVolume.toFixed(2) + ' mL')
            )
        );
        const table = $('<table>').addClass('composition-detail-table-improved');
        const thead = $('<thead>');
        const tbody = $('<tbody>');

        thead.append(
            $('<tr>').append(
                // $('<th width="3%">').text('No'),
                // $('<th width="35%">').text('BAHAN'),
                // $('<th width="2%">').text('BAGIAN'),
                // $('<th width="12%">').text('VOLUME'),
                // $('<th width="18%">').text('SIFAT'),
                // $('<th width="30%">').text('NUTRISI')

                $('<th width="3%">').text('No'),
                $('<th width="25%">').text('BAHAN'),
                $('<th width="1%">').text('BAGIAN'),
                $('<th width="5%">').text('VOLUME'),
                $('<th width="15%">').text('SIFAT'),
                $('<th width="20%">').text('NUTRISI'),
                $('<th width="31%">').text('KEGUNAAN')
            )
        );

        composition.forEach((bahan, idx) => {
            if (bahan.portion > 0) {
                const percentage = totalPortion > 0 ? ((bahan.portion / totalPortion) * 100).toFixed(2) : 0;
                const bahanVolume = mediaVolume * (percentage / 100);

                const tbodyRow = $('<tr>').addClass('material-row');

                tbodyRow.append(
                    $('<td>').addClass('text-center').append(
                        $('<span>').addClass('property-value').text((idx + 1))
                    ),
                    $('<td>').append(
                        $('<span>').addClass('property-value').text(bahan.name)
                    ),
                    $('<td>').addClass('text-center').append(
                        $('<span>').addClass('property-value').text(bahan.portion)
                    ),
                    $('<td>').addClass('text-right').append(
                        $('<span>').addClass('property-value').append(
                            bahanVolume.toFixed(2) + ' mL',
                            "<br>",
                            percentage + '&nbsp;&nbsp;&nbsp;&nbsp;%'
                        )
                    )
                );

                // Sifat
                const rowSifat = $('<td>').addClass('text-center');
                const rowSifatList = $('<div>').addClass('properties-list');

                bahan.sifats.forEach(sifat => {
                    const tmpSifat = sifats.find(tSifat => tSifat.name === sifat.name);

                    if (tmpSifat) {
                        rowSifatList.append(
                            $('<div>').addClass('property-item').append(
                                $('<div>').addClass('icon-tooltip').append(
                                    $('<i>').addClass('fas ' + tmpSifat.style),
                                    $('<span>').addClass('tooltip-text').text(tmpSifat.label_sub)
                                ),
                                $('<span>').addClass('property-value').text(sifat.value.toFixed(1))
                            )
                        );        
                    }
                });
                rowSifat.append(rowSifatList);

                // Nutrisi, Mineral, Organik
                const rowNutrisi = $('<td>').addClass('text-center');
                const rowNutrisiList = $('<div>').addClass('nutrients-list');
                let valNut = 0;

                // Nutrisi - Makro
                bahan.nutrients.makro.forEach(nut => {
                    const tmpNut = nutrientMakros.find(tNut => tNut.symbol === nut.symbol);

                    if (tmpNut) {
                        valNut = (nut.value * bahan.portion) / 100;

                        rowNutrisiList.append(
                            $('<div>').addClass('property-item').append(
                                $('<div>').addClass('icon-tooltip').append(
                                    $('<span>').addClass('tooltip-text').text(nut.name_id),
                                    $('<span>').addClass('nutrient-value').text(nut.symbol)
                                ),
                                $('<span>').addClass('nutrient-value').text(valNut.toFixed(2))
                            )
                        );

                        addNutrientData(dataNutrient, 'makro', nut.name_id, valNut);
                    }
                });

                // Nutrisi - Mikro
                bahan.nutrients.mikro.forEach(nut => {
                    const tmpNut = nutrientMikros.find(tNut => tNut.symbol === nut.symbol);

                    if (tmpNut) {
                        valNut = (nut.value * bahan.portion) / 100;

                        rowNutrisiList.append(
                            $('<div>').addClass('property-item').append(
                                $('<div>').addClass('icon-tooltip').append(
                                    $('<span>').addClass('tooltip-text').text(nut.name_id),
                                    $('<span>').addClass('nutrient-value').text(nut.symbol)
                                ),
                                $('<span>').addClass('nutrient-value').text(valNut.toFixed(2))
                            )
                        );

                        addNutrientData(dataNutrient, 'mikro', nut.name_id, valNut);
                    }
                });

                // Minerals
                bahan.minerals.forEach(nut => {
                    valNut = (nut.value * bahan.portion) / 100;

                    rowNutrisiList.append(
                        $('<div>').addClass('property-item').append(
                            $('<div>').addClass('icon-tooltip').append(
                                $('<span>').addClass('tooltip-text').text(nut.name_id),
                                $('<span>').addClass('nutrient-value').text(nut.symbol)
                            ),
                            $('<span>').addClass('nutrient-value').text(valNut.toFixed(2))
                        )
                    );

                    addNutrientData(dataNutrient, 'mineral', nut.name_id, valNut);
                });

                // Organik
                bahan.organic_components.forEach(nut => {
                    rowNutrisiList.append(
                        $('<div>').addClass('property-item').append(
                            $('<span>').addClass('nutrient-value text-right').text(nut.name_id)
                        )
                    );

                    addNutrientData(dataNutrient, 'organik', nut.name_id, valNut);
                });
                rowNutrisi.append(rowNutrisiList);

                // Kegunaan
                const rowGuna = $('<td>').addClass('text-justify');
                const rowGunaList = $('<div>').addClass('nutrients-list');

                // bahan.kegunaan.forEach((guna, idxGuna) => {
                bahan.kegunaan.forEach(guna => {
                    rowGunaList.append(
                        $('<div>').addClass('property-item').append(
                            $('<span>').addClass('nutrient-value').text(guna)
                        )
                    );
                });

                rowGuna.append(rowGunaList);


                tbodyRow.append(
                    rowSifat,
                    rowNutrisi,
                    rowGuna
                );
                tbody.append(tbodyRow);
            }
        });

        container.append(
            header,
            komposisi.append(
                table.append(
                    thead,
                    tbody
                )
            )
        );

        
        // SIFAT
        sifats.forEach(sifat => {
            const compSifat = $('<div>').addClass('analysis-point');
            let valSifat = 0;
            let tvSifat = 0;

            if (sifat.name === 'retention') {
                if (retention > 7) 
                    valSifat = 7;
                else if (retention < 3)
                    valSifat = 3;
                else
                    valSifat = null;

                tvSifat = retention;
            }
            else if (sifat.name === 'drainage') {
                if (drainage < 3)
                    valSifat = 3;
                else if (drainage > 7)
                    valSifat = 7;
                else
                    valSifat = null;

                tvSifat = drainage;
            }
            else if (sifat.name === 'porosity') {
                if (porosity < 5)
                    valSifat = 5;
                else if (porosity > 8.5)
                    valSifat = 8.5;
                else
                    valSifat = null;

                tvSifat = porosity;
            }
            else if (sifat.name === 'ph') {
                if (ph < 5)
                    valSifat = 5;
                else if (ph > 7.5)
                    valSifat = 7.5;
                else if ((ph >= 5.5) && (ph <= 6.5))
                    valSifat = "5.5 & 6.5";
                else
                    valSifat = null;

                tvSifat = ph;
            }
            else if (sifat.name === 'cec') {
                if (ph < 10)
                    valSifat = 10;
                else if (ph > 50)
                    valSifat = 50;
                else if ((ph >= 20) && (ph <= 40))
                    valSifat = "20 && 40";
                else
                    valSifat = null;

                tvSifat = cec;
            }
        
            const tSifat = sifat.analysis.find(xSifat => xSifat.value === valSifat);
            if (tSifat) {
                compSifat.append(
                    $('<h6>').append(
                        $('<i>').addClass('fas ' + sifat.style + ' me-2'),
                        sifat.label_sub + ': ' + tvSifat.toFixed(2) + ' ' + sifat.unit
                    ),
                    $('<p>').addClass('text-' + tSifat.status).append(
                        $('<i>').addClass('fas ' + tSifat.style + ' me-1'),
                        $('<strong>').text(tSifat.title),
                        ' ',
                        tSifat.title_desc
                    )
                );

                const compSifatData = $('<ul>');
                tSifat.data.forEach(tData => {
                    compSifatData.append(
                        $('<li>').text(tData)
                    )
                });
                compSifat.append(compSifatData);

                compSifat.append(
                    $('<p>').append(
                        $('<strong>').text('Penjelasan ' + sifat.label_sub + ' : '),
                        sifat.description
                    )
                );
            }

            container.append(compSifat);
        });

        // ANALISIS KANDUNGAN DAN KEGUNAAN
        const compNutrient = $('<div>').addClass('analysis-point');
        compNutrient.append(
            $('<h6>').append(
                $('<i>').addClass('fas fa-leaf me-2'),
                'Kandungan dan Kegunaan Media'
            ),
            $('<p>').text('Media tanam ini mengandung berbagai macam nutrisi dan bahan organik yang bermanfaat untuk tanaman :')
        );

        const compNutrientList = $('<ul>');
        dataComponentList.forEach(tCompNut => {
            const tmpNut = dataNutrient.filter(item => item.category == tCompNut);
            let objNut = [];
            let tName = '';
            let tValue = '';

            tmpNut.forEach(tNut => {
                if ((tCompNut === 'makro') || (tCompNut === 'mikro')) {
                    if (tCompNut === 'makro')
                        objNut = nutrientMakros;
                    else if (tCompNut === 'mikro')
                        objNut = nutrientMikros;
                    
                    const tmpNut = objNut.find(tvNut => tvNut.name_id === tNut.name);
                    if (tmpNut) {
                        tName = tNut.name
                        tValue = ' : ' + tNut.value.toFixed(2) + ' - ' + tmpNut.description;
                    }
                }
                else if (tCompNut === 'mineral') {
                    tName = tNut.name;
                    tValue = ' : ' + tNut.value.toFixed(2);
                }
                else if (tCompNut === 'organik') {
                    tName = tNut.name;
                    tValue = '';
                }

                compNutrientList.append(
                    // $('<li>').addClass('text-justify').append(
                    $('<li>').append(
                        $('<strong>').text(tNut.name),
                        tValue
                    )
                );
            });
        });

        compNutrient.append(
            compNutrientList,
            $('<p>').append(
                $('<strong>').text('Masa Pakai Media : '),
                'Berdasarkan komposisi, media ini diperkirakan bertahan 12-18 bulan sebelum perlu diganti. Bahan organik akan terdekomposisi secara bertahap, mengurangi porositas dan meningkatkan kepadatan media.'
            )
        );

        
        // PRO DAN KONTRA
        const compProsKontra = $('<div>').addClass('pros-cons');
        const compPros = $('<div>').addClass('pros');
        const compCons = $('<div>').addClass('cons');

        // Pros
        compPros.append(
            $('<h6>').append(
                $('<i>').addClass('fas fa-thumbs-up me-2'),
                'Kelebihan'
            )
        );

        const compProsList = $('<ul>');
        sifats.forEach(sifat => {
            if ((retention >= 4 && retention <= 6) || (drainage >= 4 && drainage <= 6) || (porosity >= 6 && porosity <= 8) || (ph >= 5.5 && ph <= 6.5) || (cec >= 20 && cec <= 40)) {
                const tmpSifat = sifats.find(tSifat => tSifat.symbol === sifat.symbol);
                if (tmpSifat)
                    compProsList.append($('<li>').text(tmpSifat.pros_cons.pros));
            }
        });

        dataNutrient.forEach(nut => {
            let ketemu = false;
            let objNut = [];

            if (nut.category === 'makro') {
                objNut = nutrientMakros;
            }
            else if (nut.category === 'mikro') {
                objNut = nutrientMikros;
            }
            
            if ((nut.name === 'Nitrogen') || (nut.name === 'Fosfor')) {
                if (nut.value > 1)
                    ketemu = true;
            }

            if (ketemu) {
                const tmpNut = objNut.find(tNut => tNut.name_id === nut.name);
                if (tmpNut)
                    compProsList.append($('<li>').text(tmpNut.pros_cons.pros));
            }
        });

        compProsList.append(
            $('<li>').text('Komposisi seimbang untuk pertumbuhan tanaman.'),
            $('<li>').text('Mengandung berbagai mikronutrien esensial.')
        );
        compPros.append(compProsList);


        // Cons
        compCons.append(
            $('<h6>').append(
                $('<i>').addClass('fas fa-thumbs-up me-2'),
                'Kekurangan'
            )
        );

        const compConsList = $('<ul>');
        sifats.forEach(sifat => {
            if ((retention < 4 || retention > 6) || (drainage < 4 || drainage > 6) || (porosity < 6 || porosity > 8) || (ph < 5.5 || ph > 6.5)  || (cec < 20 || cec > 40)) {
                const tmpSifat = sifats.find(tSifat => tSifat.symbol === sifat.symbol);
                if (tmpSifat)
                    compConsList.append($('<li>').text(tmpSifat.pros_cons.cons));
            }
        });

        dataNutrient.forEach(nut => {
            let ketemu = false;
            let objNut = [];

            if (nut.category === 'makro') {
                objNut = nutrientMakros;
            }
            else if (nut.category === 'mikro') {
                objNut = nutrientMikros;
            }
            
            if (nut.name === 'Nitrogen') {
                if (nut.value < 0.5)
                    ketemu = true;
            }
            else if (nut.name === 'Fosfor') {
                if (nut.value < 0.2)
                    ketemu = true;
            }

            if (ketemu) {
                const tmpNut = objNut.find(tNut => tNut.name_id === nut.name);
                if (tmpNut)
                    compConsList.append($('<li>').text(tmpNut.pros_cons.pros));
            }
        });
        compCons.append(compConsList);

        compProsKontra.append(
            compPros,
            compCons
        );


        // REKOMENDASI BERDASARKAN JURNAL DAN RISET
        const compRekomen = $('<div>').addClass('recommendations');
        compRekomen.append(
            $('<h6>').append(
                $('<i>').addClass('fas fa-clipboard-check me-2'),
                'Rekomendasi Berdasarkan Jurnal dan Riset'
            )
        );

        if (retention < 4)
            compRekomen.append( printSfatRecommendationList('retention', 'less_than') );

        if (drainage < 4)
            compRekomen.append( printSfatRecommendationList('drainage', 'less_than') );
        
        if (ph < 5.5)
            compRekomen.append( printSfatRecommendationList('ph', 'less_than') );

        if (ph > 7.0)
            compRekomen.append( printSfatRecommendationList('ph', 'greater_than') );

        if (cec < 20)
            compRekomen.append( printSfatRecommendationList('cec', 'less_than') );

        // Rekomendasi umum berdasarkan jurnal tanaman
        compRekomen.append(
            $('<div>').addClass('recommendation-item').append(
                $('<p>').append(
                    $('<i>').addClass('fas fa-lightbulb me-2'),
                    $('<strong>').text('Rekomendasi Umum Berdasarkan Jurnal Tanaman:')
                ),
                $('<ul>').append(
                    $('<li>').text('Media tanam ideal untuk tanaman umum memiliki porositas 60-80%, retensi air 40-60%, dan drainase 40-60%.'),
                    $('<li>').text('pH optimal untuk penyerapan nutrisi adalah 5.5-6.5 untuk sebagian besar tanaman.'),
                    $('<li>').text('Kapasitas Tukar Kation (CEC) optimal adalah 20-40 meq/100g untuk media tanam.'),
                    $('<li>').text('Gunakan campuran bahan organik dan anorganik untuk menyeimbangkan sifat fisik dan kimia media.'),
                    $('<li>').text('Pemantauan rutin kondisi media sangat penting untuk kesehatan tanaman jangka panjang.')
                )
            )
        );

        // Sumber Referensi
        const compRef = $('<div>').addClass('recommendation-item');
        const compRefList = $('<ul>');

        compRef.append(
            $('<p>').append(
                $('<i>').addClass('fas fa-lightbulb me-2'),
                $('<strong>').text('Daftar Referensi :')
            )
        );

        composition.forEach(com => {
            com.references.forEach(data => {
                compRefList.append(
                    $('<li>').append(
                        (data.url) ? $('<a>', { 'title': data.sumber, href: data.url, text: data.sumber}) : data.sumber
                    )
                );
            });
        });

        compRef.append(compRefList);
        compRekomen.append(compRef);

        container.append(
            compNutrient,
            compProsKontra,
            compRekomen
        );
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
            
            // Tampilkan deskripsi jika ada
            if (comp.description) {
                info.append($('<p>').addClass('saved-description').text(comp.description));
            }
            
            info.append($('<span>').addClass('saved-date').text(comp.date));
            
            const actions = $('<div>').addClass('saved-composition-actions');
            
            const loadBtn = $('<button>').addClass('btn btn-sm btn-primary me-1')
                .html('<i class="fas fa-upload"></i>')
                .attr('title', 'Load komposisi')
                .click(() => {
                    // Load komposisi: cari data lengkap dari masterDataMaterials berdasarkan nama
                    composition = [];
                    comp.composition.forEach(savedItem => {
                        const material = masterDataMaterials.find(m => m.name === savedItem.name);
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
                
                // Map data import menjadi data lengkap dari masterDataMaterials
                composition = [];
                data.forEach(item => {
                    const material = masterDataMaterials.find(m => m.name === item.name);
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
    
    // Export semua komposisi tersimpan ke file JSON
    function exportAllCompositions() {
        const savedCompositions = getSavedCompositions();
        
        if (savedCompositions.length === 0) {
            showCustomAlert('Peringatan', 'Tidak ada komposisi tersimpan untuk diexport.');
            return;
        }
        
        const dataStr = JSON.stringify(savedCompositions, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'semua_komposisi_media_tanam.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showSnackbar('Semua komposisi berhasil diexport');
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
