$(document).ready(function() {
    // Data bahan default dengan properti retensi, drainase, porositas, dan pH
    const defaultMaterials = [
        { id: 1, name: "Sekam padi mentah", percentage: 0, retention: 25, drainage: 40, porosity: 60, ph: 6.5 },
        { id: 2, name: "Sekam padi mentah (fermentasi)", percentage: 0, retention: 30, drainage: 35, porosity: 65, ph: 6.2 },
        { id: 3, name: "Arang sekam padi", percentage: 0, retention: 70, drainage: 25, porosity: 75, ph: 7.8 },
        { id: 4, name: "Humus daun bambu (fermentasi / composted bamboo leaves)", percentage: 0, retention: 45, drainage: 30, porosity: 55, ph: 5.8 },
        { id: 5, name: "Humus daun kaliandra (fermentasi)", percentage: 0, retention: 45, drainage: 30, porosity: 55, ph: 5.2 },
        { id: 6, name: "Humus andam (fermentasi)", percentage: 0, retention: 45, drainage: 30, porosity: 55, ph: 5.3 },
        { id: 7, name: "Akar pakis cacah kecil (oven)", percentage: 0, retention: 35, drainage: 35, porosity: 60, ph: 5.5 },
        { id: 8, name: "Biji kapuk / klenteng (oven)", percentage: 0, retention: 35, drainage: 30, porosity: 55, ph: 6.0 },
        { id: 9, name: "Cocopeat (fermentasi)", percentage: 0, retention: 60, drainage: 25, porosity: 70, ph: 5.5 },
        { id: 10, name: "Cocofiber", percentage: 0, retention: 40, drainage: 30, porosity: 60, ph: 5.5 },
        { id: 11, name: "Perlite", percentage: 0, retention: 20, drainage: 80, porosity: 85, ph: 7.0 },
        { id: 12, name: "Pasir Malang (ukuran sedang)", percentage: 0, retention: 10, drainage: 90, porosity: 40, ph: 6.8 },
        { id: 13, name: "Vermiculite", percentage: 0, retention: 45, drainage: 25, porosity: 70, ph: 6.8 },
        { id: 14, name: "Zeolit", percentage: 0, retention: 15, drainage: 40, porosity: 55, ph: 7.0 },
        { id: 15, name: "Top Soil (tanah humus, variabel)", percentage: 0, retention: 25, drainage: 40, porosity: 50, ph: 5.5 },
        { id: 16, name: "Pupuk Kandang Kambing (fermentasi)", percentage: 0, retention: 35, drainage: 30, porosity: 60, ph: 6.5 },
        { id: 17, name: "Vermicompost (kascing)", percentage: 0, retention: 50, drainage: 25, porosity: 65, ph: 6.2 },
        { id: 18, name: "Arang kayu", percentage: 0, retention: 70, drainage: 20, porosity: 75, ph: 7.5 },
        { id: 19, name: "Rockwool (mineral wool)", percentage: 0, retention: 35, drainage: 30, porosity: 80, ph: 6.8 },
        { id: 20, name: "Kerikil (gravel)", percentage: 0, retention: 5, drainage: 95, porosity: 35, ph: 6.5 },
        { id: 21, name: "Pasir sungai (lebih halus dari kerikil)", percentage: 0, retention: 8, drainage: 80, porosity: 40, ph: 6.5 },
        { id: 22, name: "Hydroton", percentage: 0, retention: 8, drainage: 85, porosity: 70, ph: 6.8 },
        { id: 23, name: "Spagnum peat moss", percentage: 0, retention: 65, drainage: 10, porosity: 75, ph: 4.0 },
        { id: 24, name: "Biochar", percentage: 0, retention: 80, drainage: 15, porosity: 75, ph: 7.0 },
        { id: 25, name: "Pumice", percentage: 0, retention: 20, drainage: 70, porosity: 75, ph: 7.0 },
    ];
    
    let materials = [];
    let nextCustomId = 26;
    let isSimulating = false;
    
    // Popup Functions
    function showAlert(message, title = "Informasi", icon = "info-circle") {
        $("#popup-icon").attr("class", `fas fa-${icon}`);
        $("#popup-title").text(title);
        $("#popup-message").text(message);
        $("#popup-buttons").html('<button class="popup-btn confirm" id="popup-ok"><i class="fas fa-check"></i> OK</button>');
        
        $("#popup-overlay").addClass("active");
        
        $("#popup-ok").on("click", function() {
            $("#popup-overlay").removeClass("active");
        });
    }
    
    function showConfirm(message, title = "Konfirmasi", icon = "question-circle", confirmText = "Ya", cancelText = "Batal") {
        return new Promise((resolve) => {
            $("#popup-icon").attr("class", `fas fa-${icon}`);
            $("#popup-title").text(title);
            $("#popup-message").text(message);
            $("#popup-buttons").html(`
                <button class="popup-btn cancel" id="popup-cancel"><i class="fas fa-times"></i> ${cancelText}</button>
                <button class="popup-btn confirm" id="popup-confirm"><i class="fas fa-check"></i> ${confirmText}</button>
            `);
            
            $("#popup-overlay").addClass("active");
            
            $("#popup-confirm").on("click", function() {
                $("#popup-overlay").removeClass("active");
                resolve(true);
            });
            
            $("#popup-cancel").on("click", function() {
                $("#popup-overlay").removeClass("active");
                resolve(false);
            });
        });
    }
    
    // Inisialisasi aplikasi
    function initApp() {
        renderMaterialCards();
        updateTotalPercentage();
        generateSideHoles();
        loadSavedData();
        updateWateringInfo();
        renderSavedConfigs();
        
        // Event listener untuk update info penyiraman
        $("#water-volume").on("input", updateWateringInfo);
        $("#watering-duration").on("input", updateWateringInfo);
        
        // Event listener untuk import file
        $("#import-file").on("change", handleFileImport);
    }
    
    // Render material cards dengan deskripsi untuk semua properti
    function renderMaterialCards() {
        const container = $("#material-cards");
        
        if (materials.length === 0) {
            container.html(`
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>Belum ada bahan yang ditambahkan</p>
                    <p>Pilih bahan dari daftar di atas</p>
                </div>
            `);
            return;
        }
        
        container.empty();
        
        materials.forEach(material => {
            // Tentukan kelas dan deskripsi untuk setiap properti
            const retentionDesc = getRetentionDescription(material.retention);
            const drainageDesc = getDrainageDescription(material.drainage);
            const porosityDesc = getPorosityDescription(material.porosity);
            const phDesc = getPhDescription(material.ph);
            
            const card = $(`
                <div class="material-card" data-id="${material.id}">
                    <button class="delete-material" title="Hapus bahan"><i class="fas fa-times"></i></button>
                    <h3>${material.name}</h3>
                    <div class="percentage-control">
                        <input type="range" class="percentage-slider" min="0" max="100" step="0.1" value="${material.percentage}">
                        <input type="number" class="percentage-input" min="0" max="100" step="0.1" value="${material.percentage.toFixed(1)}">
                        <span class="percentage-label">%</span>
                    </div>
                    <div class="properties">
                        <div class="property">
                            <span class="property-label">Retensi</span>
                            <span class="property-value">${material.retention}%</span>
                            <div class="property-bar">
                                <div class="property-fill retention-fill" style="width: ${material.retention}%"></div>
                            </div>
                            <div class="property-indicator retention-indicator">${retentionDesc}</div>
                        </div>
                        <div class="property">
                            <span class="property-label">Drainase</span>
                            <span class="property-value">${material.drainage}%</span>
                            <div class="property-bar">
                                <div class="property-fill drainage-fill" style="width: ${material.drainage}%"></div>
                            </div>
                            <div class="property-indicator drainage-indicator">${drainageDesc}</div>
                        </div>
                        <div class="property">
                            <span class="property-label">Poros</span>
                            <span class="property-value">${material.porosity}%</span>
                            <div class="property-bar">
                                <div class="property-fill porosity-fill" style="width: ${material.porosity}%"></div>
                            </div>
                            <div class="property-indicator porosity-indicator">${porosityDesc}</div>
                        </div>
                        <div class="property">
                            <span class="property-label">pH</span>
                            <span class="property-value">${material.ph}</span>
                            <div class="property-bar">
                                <div class="property-fill ph-fill" style="width: ${(material.ph / 14) * 100}%"></div>
                            </div>
                            <div class="property-indicator ph-indicator ${getPhClass(material.ph)}">${phDesc}</div>
                        </div>
                    </div>
                </div>
            `);
            
            card.find(".percentage-slider").on("input", function() {
                const id = $(this).closest(".material-card").data("id");
                const value = parseFloat($(this).val());
                updateMaterialPercentage(id, value);
            });
            
            card.find(".percentage-input").on("input", function() {
                const id = $(this).closest(".material-card").data("id");
                let value = parseFloat($(this).val());
                // Validasi input
                if (isNaN(value) || value < 0) {
                    value = 0;
                } else if (value > 100) {
                    value = 100;
                }
                updateMaterialPercentage(id, value);
            });
            
            card.find(".delete-material").on("click", function() {
                const id = $(this).closest(".material-card").data("id");
                removeMaterial(id);
            });
            
            container.append(card);
        });
    }
    
    // Fungsi untuk mendapatkan deskripsi Retensi
    function getRetentionDescription(retention) {
        if (retention < 20) return "Sangat Rendah";
        if (retention < 40) return "Rendah";
        if (retention < 60) return "Sedang";
        if (retention < 80) return "Tinggi";
        return "Sangat Tinggi";
    }
    
    // Fungsi untuk mendapatkan deskripsi Drainase
    function getDrainageDescription(drainage) {
        if (drainage < 20) return "Sangat Lambat";
        if (drainage < 40) return "Lambat";
        if (drainage < 60) return "Sedang";
        if (drainage < 80) return "Cepat";
        return "Sangat Cepat";
    }
    
    // Fungsi untuk mendapatkan deskripsi Porositas
    function getPorosityDescription(porosity) {
        if (porosity < 20) return "Sangat Padat";
        if (porosity < 40) return "Padat";
        if (porosity < 60) return "Sedang";
        if (porosity < 80) return "Berongga";
        return "Sangat Berongga";
    }
    
    // Fungsi untuk mendapatkan deskripsi pH
    function getPhDescription(ph) {
        if (ph < 4.5) return "Sangat Asam";
        if (ph < 5.5) return "Asam Kuat";
        if (ph < 6.5) return "Asam Ringan";
        if (ph < 7.5) return "Netral";
        if (ph < 8.5) return "Basa Ringan";
        return "Basa Kuat";
    }
    
    // Fungsi untuk mendapatkan kelas CSS untuk pH
    function getPhClass(ph) {
        if (ph < 6.5) return "ph-acid";
        if (ph > 7.5) return "ph-alkaline";
        return "ph-neutral";
    }
    
    // Hapus bahan berdasarkan ID
    function removeMaterial(id) {
        materials = materials.filter(m => m.id !== id);
        renderMaterialCards();
        updateTotalPercentage();
    }
    
    // Update persentase material
    function updateMaterialPercentage(id, percentage) {
        const material = materials.find(m => m.id === id);
        if (material) {
            material.percentage = percentage;
            const card = $(`.material-card[data-id="${id}"]`);
            card.find(".percentage-slider").val(percentage);
            card.find(".percentage-input").val(percentage.toFixed(1));
            updateTotalPercentage();
        }
    }
    
    // Update total persentase
    function updateTotalPercentage() {
        const total = materials.reduce((sum, material) => sum + material.percentage, 0);
        const totalElement = $("#total-percentage");
        totalElement.html(`<i class="fas fa-calculator"></i> Total: ${total.toFixed(1)}%`);
        
        if (total > 100) {
            totalElement.addClass("error");
        } else {
            totalElement.removeClass("error");
        }
    }
    
    // Update info penyiraman
    function updateWateringInfo() {
        const waterVolume = parseFloat($("#water-volume").val());
        const wateringDuration = parseFloat($("#watering-duration").val());
        
        $("#water-poured").text(`${waterVolume} mL`);
        $("#watering-duration-display").text(`${wateringDuration} detik`);
        
        // Jika durasi diubah, update volume air (asumsi debit 100 mL/detik)
        if ($("#watering-duration").is(":focus")) {
            const newVolume = wateringDuration * 100;
            $("#water-volume").val(newVolume);
            $("#water-poured").text(`${newVolume} mL`);
        }
        
        // Jika volume diubah, update durasi
        if ($("#water-volume").is(":focus")) {
            const newDuration = waterVolume / 100;
            $("#watering-duration").val(newDuration.toFixed(1));
            $("#watering-duration-display").text(`${newDuration.toFixed(1)} detik`);
        }
    }
    
    // Tambah bahan dari daftar
    function addMaterialFromList() {
        const selectedId = $("#material-select").val();
        
        if (!selectedId) {
            showAlert("Pilih bahan dari daftar terlebih dahulu", "Peringatan", "exclamation-triangle");
            return;
        }
        
        // Cek apakah bahan sudah ada
        const existingMaterial = materials.find(m => m.id == selectedId);
        if (existingMaterial) {
            showAlert("Bahan ini sudah ditambahkan", "Peringatan", "exclamation-triangle");
            return;
        }
        
        // Temukan bahan dari daftar default
        const materialToAdd = defaultMaterials.find(m => m.id == selectedId);
        if (materialToAdd) {
            materials.push({...materialToAdd});
            renderMaterialCards();
            updateTotalPercentage();
            $("#material-select").val("");
        }
    }
    
    // Normalisasi persentase ke 100%
    function normalizePercentages() {
        const total = materials.reduce((sum, material) => sum + material.percentage, 0);
        
        if (total === 0) {
            showAlert("Tidak ada bahan yang dipilih untuk dinormalisasi", "Peringatan", "exclamation-triangle");
            return;
        }
        
        materials.forEach(material => {
            material.percentage = (material.percentage / total) * 100;
        });
        
        renderMaterialCards();
        updateTotalPercentage();
    }
    
    // Reset komposisi
    function resetComposition() {
        materials.forEach(material => {
            material.percentage = 0;
        });
        
        renderMaterialCards();
        updateTotalPercentage();
    }
    
    // Tambah bahan custom
    function addCustomMaterial() {
        const name = $("#custom-material-name").val().trim();
        const retention = parseFloat($("#custom-retention").val());
        const drainage = parseFloat($("#custom-drainage").val());
        const porosity = parseFloat($("#custom-porosity").val());
        const ph = parseFloat($("#custom-ph").val());
        
        if (name === "") {
            showAlert("Masukkan nama bahan terlebih dahulu", "Peringatan", "exclamation-triangle");
            return;
        }
        
        if (isNaN(retention) || retention < 0 || retention > 100) {
            showAlert("Masukkan nilai retensi yang valid (0-100)", "Peringatan", "exclamation-triangle");
            return;
        }
        
        if (isNaN(drainage) || drainage < 0 || drainage > 100) {
            showAlert("Masukkan nilai drainase yang valid (0-100)", "Peringatan", "exclamation-triangle");
            return;
        }
        
        if (isNaN(porosity) || porosity < 0 || porosity > 100) {
            showAlert("Masukkan nilai porositas yang valid (0-100)", "Peringatan", "exclamation-triangle");
            return;
        }
        
        if (isNaN(ph) || ph < 0 || ph > 14) {
            showAlert("Masukkan nilai pH yang valid (0-14)", "Peringatan", "exclamation-triangle");
            return;
        }
        
        materials.push({
            id: nextCustomId,
            name: name,
            percentage: 0,
            retention: retention,
            drainage: drainage,
            porosity: porosity,
            ph: ph
        });
        
        nextCustomId++;
        $("#custom-material-name").val("");
        $("#custom-retention").val("0");
        $("#custom-drainage").val("0");
        $("#custom-porosity").val("0");
        $("#custom-ph").val("7.0");
        renderMaterialCards();
        updateTotalPercentage();
    }
    
    // Generate lubang samping
    function generateSideHoles() {
        const sideHolesContainer = $("#side-holes");
        sideHolesContainer.empty();
        
        // 5 baris lubang vertikal
        for (let row = 0; row < 5; row++) {
            // 8 lubang per baris
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * 360;
                const hole = $('<div class="side-hole"></div>');
                
                // Posisi lubang (33% dari tinggi pot)
                const topPosition = 100 - ((row + 1) * (33 / 5));
                
                hole.css({
                    top: `${topPosition}%`,
                    transform: `rotate(${angle}deg) translateX(85px)`
                });
                
                sideHolesContainer.append(hole);
            }
        }
    }
    
    // Hitung volume pot
    function calculatePotVolume() {
        const diameter = parseFloat($("#pot-diameter").val());
        const height = parseFloat($("#pot-height").val());
        const radius = diameter / 2;
        
        // Volume silinder: π * r² * h
        return Math.PI * Math.pow(radius, 2) * height;
    }
    
    // Hitung properti campuran (rata-rata tertimbang)
    function calculateMixedProperties() {
        let totalRetention = 0;
        let totalDrainage = 0;
        let totalPorosity = 0;
        let totalPh = 0;
        let totalPercentage = 0;
        
        materials.forEach(material => {
            if (material.percentage > 0) {
                totalRetention += material.retention * material.percentage;
                totalDrainage += material.drainage * material.percentage;
                totalPorosity += material.porosity * material.percentage;
                totalPh += material.ph * material.percentage;
                totalPercentage += material.percentage;
            }
        });
        
        if (totalPercentage === 0) return { retention: 0, drainage: 0, porosity: 0, ph: 0 };
        
        return {
            retention: totalRetention / totalPercentage,
            drainage: totalDrainage / totalPercentage,
            porosity: totalPorosity / totalPercentage,
            ph: totalPh / totalPercentage
        };
    }
    
    // Animasi tetesan air
    function animateWaterDrops() {
        const dropsContainer = $("#water-drops");
        dropsContainer.empty();
        
        for (let i = 0; i < 20; i++) {
            const drop = $('<div class="water-drop"></div>');
            const left = Math.random() * 100;
            const delay = Math.random() * 1.5;
            
            drop.css({
                left: `${left}%`,
                animationDelay: `${delay}s`
            });
            
            dropsContainer.append(drop);
        }
        
        // Hapus tetesan setelah animasi selesai
        setTimeout(() => {
            dropsContainer.empty();
        }, 2000);
    }
    
    // PERBAIKAN: Fungsi untuk menghasilkan rekomendasi dan analisis termasuk pH
    function generateAnalysis(mixedProps) {
        const recommendations = [];
        
        // Analisis drainase
        let drainageInfo = "";
        if (mixedProps.drainage < 20) {
            drainageInfo = "Sangat Lambat (Tanah Liat). Media cenderung tergenang air, berisiko busuk akar.";
        } else if (mixedProps.drainage < 40) {
            drainageInfo = "Lambat. Media mempertahankan kelembaban cukup lama, cocok untuk Aglaonema yang suka lembab.";
        } else if (mixedProps.drainage < 60) {
            drainageInfo = "Sedang. Keseimbangan drainase dan retensi baik untuk Aglaonema.";
        } else if (mixedProps.drainage < 80) {
            drainageInfo = "Cepat. Media akan cepat kering, cocok untuk Aglaonema yang takut becek.";
        } else {
            drainageInfo = "Sangat Cepat (Sangat Poros). Media akan cepat kering, cocok untuk Aglaonema yang takut becek.";
        }
        
        // Analisis pH
        let phInfo = "";
        if (mixedProps.ph < 5.0) {
            phInfo = `Sangat Asam (${mixedProps.ph.toFixed(2)}). Aglaonema lebih menyukai pH sedikit asam hingga netral (5.5-6.5).`;
        } else if (mixedProps.ph < 5.5) {
            phInfo = `Asam (${mixedProps.ph.toFixed(2)}). Cocok untuk Aglaonema, tetapi perhatikan jika pH terlalu rendah.`;
        } else if (mixedProps.ph < 6.5) {
            phInfo = `Ideal (${mixedProps.ph.toFixed(2)}). Rentang pH terbaik untuk Aglaonema.`;
        } else if (mixedProps.ph < 7.0) {
            phInfo = `Netral (${mixedProps.ph.toFixed(2)}). Masih dapat diterima untuk Aglaonema.`;
        } else {
            phInfo = `Basa (${mixedProps.ph.toFixed(2)}). Aglaonema lebih menyukai pH sedikit asam.`;
        }
        
        // Analisis media
        let mediaAnalysis = "";
        if (mixedProps.retention < 30 && mixedProps.porosity > 70) {
            mediaAnalysis = `Campuran ini memiliki retensi air ${mixedProps.retention.toFixed(0)}% dan porositas ${mixedProps.porosity.toFixed(0)}%. Struktur sangat berongga, aerasi akar maksimal. Retensi air rendah, perlu penyiraman lebih sering.`;
        } else if (mixedProps.retention > 60 && mixedProps.porosity < 50) {
            mediaAnalysis = `Campuran ini memiliki retensi air ${mixedProps.retention.toFixed(0)}% dan porositas ${mixedProps.porosity.toFixed(0)}%. Struktur padat, retensi air tinggi. Berisiko tergenang jika drainase tidak memadai.`;
        } else {
            mediaAnalysis = `Campuran ini memiliki retensi air ${mixedProps.retention.toFixed(0)}% dan porositas ${mixedProps.porosity.toFixed(0)}%. Keseimbangan retensi air dan drainase baik untuk Aglaonema.`;
        }
        
        // Rekomendasi berdasarkan retensi
        if (mixedProps.retention < 30) {
            recommendations.push("Retensi rendah. Tambah cocopeat, humus, atau vermicompost.");
        } else if (mixedProps.retention > 70) {
            recommendations.push("Retensi terlalu tinggi. Kurangi bahan dengan retensi tinggi dan tambah bahan drainase.");
        }
        
        // Rekomendasi berdasarkan drainase
        if (mixedProps.drainage < 30) {
            recommendations.push("Drainase buruk! Tambah perlite, pasir, sekam bakar, atau biji kapuk.");
        } else if (mixedProps.drainage > 70) {
            recommendations.push("Drainase terlalu tinggi. Tambah bahan dengan retensi lebih tinggi.");
        }
        
        // Rekomendasi berdasarkan porositas
        if (mixedProps.porosity < 40) {
            recommendations.push("Porositas rendah. Tambah perlite atau cocofiber.");
        } else if (mixedProps.porosity > 80) {
            recommendations.push("Porositas sangat tinggi. Pertimbangkan menambah bahan dengan kepadatan lebih tinggi.");
        }
        
        // Rekomendasi untuk pH
        if (mixedProps.ph < 5.5) {
            recommendations.push("pH terlalu asam. Tambahkan kapur pertanian/dolomit untuk menaikkan pH.");
        } else if (mixedProps.ph > 6.5) {
            recommendations.push("pH terlalu basa. Tambahkan belerang atau bahan organik asam seperti gambut.");
        }
        
        return {
            drainageInfo: drainageInfo,
            phInfo: phInfo,
            mediaAnalysis: mediaAnalysis,
            recommendations: recommendations
        };
    }
    
    // PERBAIKAN: Tampilkan analisis dan rekomendasi dengan tampilan baru
    function displayAnalysis(mixedProps) {
        const analysis = generateAnalysis(mixedProps);
        const analysisContainer = $("#analysis-container");
        
        // Tampilkan analisis drainase
        $("#drainage-analysis").html(`<p>${analysis.drainageInfo}</p>`);
        
        // Tampilkan analisis pH
        $("#ph-analysis").html(`<p>${analysis.phInfo}</p>`);
        
        // Tampilkan analisis media
        $("#media-analysis").html(`<p>${analysis.mediaAnalysis}</p>`);
        
        // Tampilkan rekomendasi
        const recommendationList = $("#recommendation-list");
        recommendationList.empty();
        
        analysis.recommendations.forEach(rec => {
            let listItem = $("<li></li>").text(rec);
            
            // Tambahkan kelas berdasarkan jenis rekomendasi
            if (rec.includes("buruk") || rec.includes("terlalu") || rec.includes("risiko")) {
                listItem.addClass("warning");
            } else if (rec.includes("ideal") || rec.includes("baik")) {
                listItem.addClass("important");
            }
            
            recommendationList.append(listItem);
        });
        
        // Tampilkan container analisis
        analysisContainer.show();
    }
    
    // Jalankan simulasi
    function runSimulation() {
        if (isSimulating) return;
        
        const totalPercentage = materials.reduce((sum, material) => sum + material.percentage, 0);
        
        if (totalPercentage === 0) {
            showAlert("Silakan atur komposisi media tanam terlebih dahulu", "Peringatan", "exclamation-triangle");
            return;
        }
        
        if (totalPercentage > 100) {
            showAlert("Total persentase komposisi melebihi 100%. Silakan normalisasi terlebih dahulu.", "Peringatan", "exclamation-triangle");
            return;
        }
        
        isSimulating = true;
        $("#simulate-btn").prop("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Menjalankan Simulasi...');
        
        const potVolume = calculatePotVolume();
        const soilPercentage = parseFloat($("#soil-percentage").val()) / 100;
        const waterVolume = parseFloat($("#water-volume").val());
        const wateringDuration = parseFloat($("#watering-duration").val());
        
        const soilVolume = potVolume * soilPercentage;
        
        // Hitung properti campuran (rata-rata tertimbang)
        const mixedProps = calculateMixedProperties();
        
        // Asumsi: air akan mengisi berdasarkan porositas media
        const maxWaterRetention = soilVolume * (mixedProps.porosity / 100) * (mixedProps.retention / 100);
        const retainedWater = Math.min(waterVolume, maxWaterRetention);
        const drainedWater = waterVolume - retainedWater;
        
        // Update tampilan
        updatePotDisplay(soilPercentage, retainedWater / potVolume);
        animateWaterDrops();
        
        // Delay untuk animasi
        setTimeout(() => {
            displayResults(potVolume, soilVolume, waterVolume, wateringDuration, retainedWater, drainedWater, mixedProps);
            // PERBAIKAN: Tampilkan analisis dan rekomendasi
            displayAnalysis(mixedProps);
            isSimulating = false;
            $("#simulate-btn").prop("disabled", false).html('<i class="fas fa-play"></i> Jalankan Simulasi');
        }, 2000);
    }
    
    // Update tampilan pot
    function updatePotDisplay(soilPercentage, waterPercentage) {
        $("#soil-display").css("height", `${soilPercentage * 100}%`);
        $("#water-display").css("height", `${waterPercentage * 100}%`);
    }
    
    // Tampilkan hasil
    function displayResults(potVolume, soilVolume, waterVolume, wateringDuration, retainedWater, drainedWater, mixedProps) {
        const resultsContainer = $("#results");
        resultsContainer.empty();
        
        const results = [
            { label: "Volume Pot", value: `${potVolume.toFixed(2)} cm³` },
            { label: "Volume Media Tanam", value: `${soilVolume.toFixed(2)} cm³` },
            { label: "Volume Air Dikucurkan", value: `${waterVolume.toFixed(2)} mL` },
            { label: "Durasi Penyiraman", value: `${wateringDuration.toFixed(1)} detik` },
            { label: "Air yang Tertahan di Media", value: `${retainedWater.toFixed(2)} mL` },
            { label: "Air yang Terserap Media", value: `${(retainedWater / soilVolume * 100).toFixed(2)}%` },
            { label: "Air yang Mengalir Keluar", value: `${drainedWater.toFixed(2)} mL` }
        ];
        
        results.forEach(result => {
            const resultItem = $(`
                <div class="result-item">
                    <span class="result-label">${result.label}:</span>
                    <span class="result-value">${result.value}</span>
                </div>
            `);
            
            resultsContainer.append(resultItem);
        });
        
        // Tambah properti campuran
        const mixedPropsSection = $(`
            <div class="mixed-properties">
                <h4><i class="fas fa-chart-bar"></i> Sifat Media Campuran (Rata-rata Tertimbang)</h4>
                <div class="result-item">
                    <span class="result-label">Retensi Media:</span>
                    <span class="result-value">${mixedProps.retention.toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Drainase Media:</span>
                    <span class="result-value">${mixedProps.drainage.toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Porositas Media:</span>
                    <span class="result-value">${mixedProps.porosity.toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">pH Media:</span>
                    <span class="result-value">${mixedProps.ph.toFixed(2)}</span>
                </div>
            </div>
        `);
        
        resultsContainer.append(mixedPropsSection);
    }
    
    // Simpan konfigurasi dengan nama
    function saveConfiguration() {
        const saveName = $("#save-name").val().trim();
        
        if (!saveName) {
            showAlert("Masukkan nama simpanan terlebih dahulu", "Peringatan", "exclamation-triangle");
            return;
        }
        
        const saveData = {
            materials: materials,
            potDiameter: $("#pot-diameter").val(),
            potHeight: $("#pot-height").val(),
            soilPercentage: $("#soil-percentage").val(),
            waterVolume: $("#water-volume").val(),
            wateringDuration: $("#watering-duration").val(),
            nextCustomId: nextCustomId,
            timestamp: new Date().toISOString()
        };
        
        // Ambil simpanan yang sudah ada
        let savedConfigs = JSON.parse(localStorage.getItem("aglaonemaSimulation_Saves")) || {};
        
        // Tambah atau update simpanan
        savedConfigs[saveName] = saveData;
        
        // Simpan ke localStorage
        localStorage.setItem("aglaonemaSimulation_Saves", JSON.stringify(savedConfigs));
        
        showAlert(`Konfigurasi "${saveName}" berhasil disimpan!`, "Sukses", "check-circle");
        $("#save-name").val("");
        renderSavedConfigs();
    }
    
    // Muat konfigurasi yang disimpan
    function loadConfiguration(name) {
        const savedConfigs = JSON.parse(localStorage.getItem("aglaonemaSimulation_Saves")) || {};
        const config = savedConfigs[name];
        
        if (config) {
            materials = config.materials || [];
            nextCustomId = config.nextCustomId || 25;
            
            $("#pot-diameter").val(config.potDiameter || 9.5);
            $("#pot-height").val(config.potHeight || 9.5);
            $("#soil-percentage").val(config.soilPercentage || 95);
            $("#water-volume").val(config.waterVolume || 500);
            $("#watering-duration").val(config.wateringDuration || 5);
            
            renderMaterialCards();
            updateTotalPercentage();
            updateWateringInfo();
            updatePotDisplay(0, 0);
            $("#results").html(`
                <div class="empty-state">
                    <i class="fas fa-tint"></i>
                    <p>Belum ada hasil simulasi</p>
                    <p>Klik "Jalankan Simulasi" untuk melihat hasil</p>
                </div>
            `);
            $("#analysis-container").hide();
            
            showAlert(`Konfigurasi "${name}" berhasil dimuat!`, "Sukses", "check-circle");
        }
    }
    
    // Hapus konfigurasi yang disimpan
    function deleteConfiguration(name) {
        showConfirm(`Hapus simpanan "${name}"?`, "Konfirmasi Hapus", "trash-alt", "Hapus", "Batal")
            .then(result => {
                if (result) {
                    let savedConfigs = JSON.parse(localStorage.getItem("aglaonemaSimulation_Saves")) || {};
                    delete savedConfigs[name];
                    localStorage.setItem("aglaonemaSimulation_Saves", JSON.stringify(savedConfigs));
                    renderSavedConfigs();
                }
            });
    }
    
    // Render daftar simpanan
    function renderSavedConfigs() {
        const container = $("#saved-configs");
        const savedConfigs = JSON.parse(localStorage.getItem("aglaonemaSimulation_Saves")) || {};
        
        if (Object.keys(savedConfigs).length === 0) {
            container.html(`
                <div class="empty-state">
                    <i class="fas fa-save"></i>
                    <p>Belum ada simpanan</p>
                </div>
            `);
            return;
        }
        
        container.empty();
        
        Object.keys(savedConfigs).forEach(name => {
            const config = savedConfigs[name];
            const date = new Date(config.timestamp).toLocaleDateString('id-ID');
            
            const configItem = $(`
                <div class="saved-config-item">
                    <div class="saved-config-name">${name}</div>
                    <div class="saved-config-actions">
                        <button class="config-btn load-config" data-name="${name}"><i class="fas fa-folder-open"></i> Muat</button>
                        <button class="config-btn danger delete-config" data-name="${name}"><i class="fas fa-trash"></i> Hapus</button>
                    </div>
                </div>
            `);
            
            container.append(configItem);
        });
        
        // Event handler untuk tombol muat dan hapus
        $(".load-config").on("click", function() {
            const name = $(this).data("name");
            loadConfiguration(name);
        });
        
        $(".delete-config").on("click", function() {
            const name = $(this).data("name");
            deleteConfiguration(name);
        });
    }
    
    // Hapus semua data
    function deleteData() {
        showConfirm("Apakah Anda yakin ingin menghapus semua data?", "Konfirmasi Hapus", "trash-alt", "Hapus Semua", "Batal")
            .then(result => {
                if (result) {
                    localStorage.removeItem("aglaonemaSimulation_Saves");
                    materials = [];
                    renderMaterialCards();
                    $("#pot-diameter").val(9.5);
                    $("#pot-height").val(9.5);
                    $("#soil-percentage").val(95);
                    $("#water-volume").val(500);
                    $("#watering-duration").val(5);
                    updateTotalPercentage();
                    updatePotDisplay(0, 0);
                    $("#results").html(`
                        <div class="empty-state">
                            <i class="fas fa-tint"></i>
                            <p>Belum ada hasil simulasi</p>
                            <p>Klik "Jalankan Simulasi" untuk melihat hasil</p>
                        </div>
                    `);
                    $("#analysis-container").hide();
                    updateWateringInfo();
                    renderSavedConfigs();
                    showAlert("Semua data berhasil dihapus!", "Sukses", "check-circle");
                }
            });
    }
    
    // Muat data yang disimpan
    function loadSavedData() {
        const savedData = localStorage.getItem("aglaonemaSimulation_Current");
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            materials = data.materials || [];
            nextCustomId = data.nextCustomId || 25;
            
            $("#pot-diameter").val(data.potDiameter || 9.5);
            $("#pot-height").val(data.potHeight || 9.5);
            $("#soil-percentage").val(data.soilPercentage || 95);
            $("#water-volume").val(data.waterVolume || 500);
            $("#watering-duration").val(data.wateringDuration || 5);
            
            renderMaterialCards();
            updateTotalPercentage();
            updateWateringInfo();
        }
    }
    
    // Export data ke file TXT
    function exportToTxt() {
        const potVolume = calculatePotVolume();
        const soilPercentage = parseFloat($("#soil-percentage").val()) / 100;
        const soilVolume = potVolume * soilPercentage;
        const mixedProps = calculateMixedProperties();
        
        let content = "LAPORAN SIMULASI PENYIRAMAN AGLAONEMA\n";
        content += "========================================\n\n";
        
        content += "CATATAN: Media tanam tercampur sempurna menjadi satu kesatuan homogen.\n";
        content += "Sifat-sifat media merupakan rata-rata tertimbang dari bahan-bahan penyusunnya.\n\n";
        
        content += "KONFIGURASI POT:\n";
        content += `- Diameter: ${$("#pot-diameter").val()} cm\n`;
        content += `- Tinggi: ${$("#pot-height").val()} cm\n`;
        content += `- Volume: ${potVolume.toFixed(2)} cm³\n`;
        content += `- Pengisian Media: ${$("#soil-percentage").val()}%\n`;
        content += `- Volume Media: ${soilVolume.toFixed(2)} cm³\n\n`;
        
        content += "KOMPOSISI MEDIA TANAM:\n";
        materials.forEach(material => {
            if (material.percentage > 0) {
                content += `- ${material.name}: ${material.percentage.toFixed(1)}% (Retensi: ${material.retention}%, Drainase: ${material.drainage}%, Porositas: ${material.porosity}%, pH: ${material.ph})\n`;
            }
        });
        
        content += `\nTotal Komposisi: ${materials.reduce((sum, m) => sum + m.percentage, 0).toFixed(1)}%\n\n`;
        
        content += "SIFAT MEDIA CAMPURAN (RATA-RATA TERTIMBANG):\n";
        content += `- Retensi: ${mixedProps.retention.toFixed(2)}%\n`;
        content += `- Drainase: ${mixedProps.drainage.toFixed(2)}%\n`;
        content += `- Porositas: ${mixedProps.porosity.toFixed(2)}%\n`;
        content += `- pH: ${mixedProps.ph.toFixed(2)}\n\n`;
        
        content += "HASIL SIMULASI:\n";
        const results = $("#results .result-item");
        if (results.length > 0) {
            results.each(function() {
                const label = $(this).find(".result-label").text().replace(":", "");
                const value = $(this).find(".result-value").text();
                content += `- ${label}: ${value}\n`;
            });
        } else {
            content += "Simulasi belum dijalankan\n";
        }
        
        content += `\nTanggal: ${new Date().toLocaleString('id-ID')}\n`;
        
        // Buat dan unduh file
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "simulasi_aglaonema.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Reset simulasi
    function resetSimulation() {
        $("#water-volume").val(500);
        $("#watering-duration").val(5);
        updatePotDisplay(0, 0);
        $("#results").html(`
            <div class="empty-state">
                <i class="fas fa-tint"></i>
                <p>Belum ada hasil simulasi</p>
                <p>Klik "Jalankan Simulasi" untuk melihat hasil</p>
            </div>
        `);
        $("#analysis-container").hide();
        updateWateringInfo();
    }
    
    // Import dari file TXT
    function handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            parseImportedData(content);
        };
        reader.readAsText(file);
        
        // Reset input file
        event.target.value = '';
    }
    
    // Parse data yang diimport dari file TXT
    function parseImportedData(content) {
        try {
            const lines = content.split('\n');
            let inCompositionSection = false;
            let newMaterials = [];
            
            // Reset materials yang ada
            materials = [];
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                
                // Cari bagian konfigurasi pot
                if (line.startsWith('KONFIGURASI POT:')) {
                    // Baca baris-baris berikutnya sampai bagian berikutnya
                    for (let j = i + 1; j < lines.length; j++) {
                        const configLine = lines[j].trim();
                        if (configLine.startsWith('- Diameter:')) {
                            const diameter = parseFloat(configLine.match(/Diameter: ([\d.]+)/)[1]);
                            $("#pot-diameter").val(diameter);
                        } else if (configLine.startsWith('- Tinggi:')) {
                            const height = parseFloat(configLine.match(/Tinggi: ([\d.]+)/)[1]);
                            $("#pot-height").val(height);
                        } else if (configLine.startsWith('- Pengisian Media:')) {
                            const soilPercentage = parseFloat(configLine.match(/Pengisian Media: ([\d.]+)/)[1]);
                            $("#soil-percentage").val(soilPercentage);
                        } else if (configLine === '' && j > i + 5) {
                            break;
                        }
                    }
                }
                
                // Cari bagian komposisi media tanam
                if (line.startsWith('KOMPOSISI MEDIA TANAM:')) {
                    inCompositionSection = true;
                    continue;
                }
                
                if (inCompositionSection) {
                    // Jika menemukan baris kosong setelah bagian komposisi, keluar
                    if (line === '' && newMaterials.length > 0) {
                        inCompositionSection = false;
                        break;
                    }
                    
                    // Parse baris bahan
                    if (line.startsWith('- ') && line.includes('%')) {
                        // Format: - [nama bahan]: [persentase]% (Retensi: [retensi]%, Drainase: [drainase]%, Porositas: [porositas]%, pH: [pH])
                        const match = line.match(/^- (.+?): ([\d.]+)% \(Retensi: ([\d.]+)%, Drainase: ([\d.]+)%, Porositas: ([\d.]+)%, pH: ([\d.]+)\)/);
                        if (match) {
                            const name = match[1].trim();
                            const percentage = parseFloat(match[2]);
                            const retention = parseFloat(match[3]);
                            const drainage = parseFloat(match[4]);
                            const porosity = parseFloat(match[5]);
                            const ph = parseFloat(match[6]);
                            
                            // Cek apakah bahan sudah ada dalam daftar default
                            const existingDefault = defaultMaterials.find(m => m.name === name);
                            
                            if (existingDefault) {
                                // Gunakan bahan default dengan persentase yang diimport
                                materials.push({
                                    ...existingDefault,
                                    percentage: percentage
                                });
                            } else {
                                // Tambahkan sebagai bahan custom
                                materials.push({
                                    id: nextCustomId++,
                                    name: name,
                                    percentage: percentage,
                                    retention: retention,
                                    drainage: drainage,
                                    porosity: porosity,
                                    ph: ph
                                });
                            }
                        }
                    }
                }
            }
            
            // Update tampilan
            renderMaterialCards();
            updateTotalPercentage();
            updateWateringInfo();
            
            showAlert("Data berhasil diimport dari file!", "Sukses", "check-circle");
        } catch (error) {
            console.error("Error parsing imported data:", error);
            showAlert("Terjadi kesalahan saat mengimport data. Pastikan file yang diimport valid.", "Error", "exclamation-triangle");
        }
    }
    
    // Event handlers
    $("#add-material-btn").on("click", addMaterialFromList);
    $("#normalize-btn").on("click", normalizePercentages);
    $("#reset-composition-btn").on("click", resetComposition);
    $("#add-custom-btn").on("click", addCustomMaterial);
    $("#simulate-btn").on("click", runSimulation);
    $("#save-config-btn").on("click", saveConfiguration);
    $("#delete-btn").on("click", deleteData);
    $("#export-btn").on("click", exportToTxt);
    $("#reset-simulation-btn").on("click", resetSimulation);
    
    // Inisialisasi aplikasi
    initApp();
});
