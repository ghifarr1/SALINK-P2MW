// Penerbitan Surat functionality

// Function to handle form submission
function submitSurat(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get form values
    const jenisSurat = document.getElementById('jenisSurat').value;
    const nik = document.getElementById('nik').value;
    const nama = document.getElementById('nama').value;
    const ttl = document.getElementById('ttl').value;
    const pekerjaan = document.getElementById('pekerjaan').value;
    const keperluan = document.getElementById('keperluan').value;
    
    // Validasi NIK (harus 16 digit)
    if (nik.length !== 16 || isNaN(nik)) {
        alert('NIK harus berupa 16 digit angka');
        return false;
    }
    
    // Placeholder for AJAX submission
    console.log('Form submitted:', {
        jenisSurat,
        nik,
        nama,
        ttl,
        pekerjaan,
        keperluan
    });
    
    // Tampilkan feedback ke pengguna
    alert('Permohonan surat berhasil diajukan!');
    
    // Reset form
    document.getElementById('formPenerbitanSurat').reset();
    
    return false;
}

// Add event listener for select dropdown for enhanced mobile UX
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('jenisSurat');
    
    // Ensure proper dropdown behavior on mobile
    selectElement.addEventListener('focus', function() {
        this.blur(); // On some mobile devices, this helps with native select dropdown
        
        // Add click sound/haptic feedback if applicable
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(5); // Short vibration for tactile feedback
        }
    });
    
    // Handle pre-population of form if needed
    if (sessionStorage.getItem('userNIK')) {
        document.getElementById('nik').value = sessionStorage.getItem('userNIK');
        document.getElementById('nama').value = sessionStorage.getItem('userName') || '';
    }
});

// Fungsi untuk menampilkan pop-up konfirmasi
function showKonfirmasiPopup(jenisSurat) {
    // Persiapkan data untuk ditampilkan di popup
    const today = new Date();
    const formattedDate = formatDate(today);
    const nomorPermohonan = generateNomorPermohonan(today);
    
    // Isi konten popup
    document.getElementById('popupJenisSurat').textContent = jenisSurat;
    document.getElementById('popupNomorPermohonan').textContent = nomorPermohonan;
    document.getElementById('popupTanggalPengajuan').textContent = formattedDate;
    
    // Tampilkan popup
    const popup = document.getElementById('popupKonfirmasi');
    popup.classList.add('active');
    
    // Cegah scroll pada body
    document.body.style.overflow = 'hidden';
}

// Format tanggal ke format Indonesia
function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Generate nomor permohonan unik
function generateNomorPermohonan(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return `SR-${year}${month}${day}${random}`;
}

// Event listener untuk tombol close pada popup
document.addEventListener('DOMContentLoaded', function() {
    const btnClosePopup = document.getElementById('btnClosePopup');
    
    if (btnClosePopup) {
        btnClosePopup.addEventListener('click', function() {
            // Tutup popup
            document.getElementById('popupKonfirmasi').classList.remove('active');
            
            // Kembalikan scroll pada body
            document.body.style.overflow = '';
            
            // Redirect ke beranda
            window.location.href = 'index.html';
        });
    }
});

// Update fungsi submitSurat untuk menampilkan popup setelah form berhasil disubmit
function submitSurat(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get form values
    const jenisSurat = document.getElementById('jenisSurat').value;
    const jenisSuratText = document.getElementById('jenisSurat').options[document.getElementById('jenisSurat').selectedIndex].text;
    const nik = document.getElementById('nik').value;
    const nama = document.getElementById('nama').value;
    const ttl = document.getElementById('ttl').value;
    const pekerjaan = document.getElementById('pekerjaan').value;
    const keperluan = document.getElementById('keperluan').value;
    
    // Validasi NIK (harus 16 digit)
    if (nik.length !== 16 || isNaN(nik)) {
        alert('NIK harus berupa 16 digit angka');
        return false;
    }
    
    // Placeholder for AJAX submission
    console.log('Form submitted:', {
        jenisSurat,
        nik,
        nama,
        ttl,
        pekerjaan,
        keperluan
    });
    
    // Tampilkan popup konfirmasi
    showKonfirmasiPopup(jenisSuratText);
    
    return false;
}