// JavaScript untuk halaman pembayaran dengan animasi yang lebih baik

document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan elemen dropdown dan opsi bank
    const transferDropdown = document.querySelector('.dropdown-toggle');
    const bankOptions = document.getElementById('bank-options');
    
    // Toggle dropdown saat Transfer Akun Virtual diklik dengan animasi
    if (transferDropdown && bankOptions) {
        transferDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle class active pada elemen dropdown dengan animasi
            this.classList.toggle('active');
            
            // Toggle class visible pada opsi bank
            bankOptions.classList.toggle('visible');
            
            // Menambahkan delay saat menutup untuk animasi smooth
            if (!bankOptions.classList.contains('visible')) {
                // Gunakan setTimeout untuk memberikan delay sebelum menyembunyikan opsi
                setTimeout(() => {
                    if (!bankOptions.classList.contains('visible')) {
                        bankOptions.style.overflow = 'hidden';
                    }
                }, 400); // Delay sesuai dengan durasi animasi
            } else {
                bankOptions.style.overflow = 'visible';
            }
        });
    }
    
    // Mendapatkan semua radio button metode pembayaran
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const paymentItems = document.querySelectorAll('.payment-method-item');
    
    // Menambahkan efek ripple pada klik item metode pembayaran
    paymentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Cek jika yang diklik adalah dropdown toggle khusus
            if (item.classList.contains('dropdown-toggle')) {
                // Jangan check radio untuk dropdown toggle karena akan dihandle terpisah
                return;
            }
            
            // Temukan radio button di dalam item ini
            const radio = item.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Trigger event change untuk menjalankan logika dropdown
                const event = new Event('change');
                radio.dispatchEvent(event);
                
                // Tambahkan efek visual feedback
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                item.appendChild(ripple);
                
                // Hapus elemen ripple setelah animasi selesai
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            }
        });
    });
    
    // Menambahkan event listener untuk setiap radio button
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Highlight item yang dipilih
            paymentItems.forEach(item => {
                item.classList.remove('selected');
            });
            
            // Tambahkan class selected ke parent dari radio yang dipilih
            this.closest('.payment-method-item').classList.add('selected');
            
            // Cek jika metode pembayaran adalah Transfer Akun Virtual
            if (this.id === 'transfer') {
                // Tampilkan opsi bank dengan animasi
                bankOptions.classList.add('visible');
                transferDropdown.classList.add('active');
                
                // Setelah animasi mulai, set overflow menjadi visible
                setTimeout(() => {
                    bankOptions.style.overflow = 'visible';
                }, 50);
            } else if (this.closest('.bank-option')) {
                // Jika yang dipilih adalah opsi bank, tetap tampilkan dropdown
                bankOptions.classList.add('visible');
                transferDropdown.classList.add('active');
            } else {
                // Sembunyikan opsi bank dengan animasi
                bankOptions.classList.remove('visible');
                transferDropdown.classList.remove('active');
                
                // Set overflow hidden setelah animasi selesai
                setTimeout(() => {
                    if (!bankOptions.classList.contains('visible')) {
                        bankOptions.style.overflow = 'hidden';
                    }
                }, 400);
            }
        });
    });
    
    // Event listener untuk tombol Bayar Sekarang
    const payButton = document.querySelector('.pay-now-button');
    if (payButton) {
        payButton.addEventListener('click', function() {
            // Cek apakah ada metode pembayaran yang dipilih
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
            
            if (selectedMethod) {
                // Animasi tombol bayar
                this.classList.add('clicked');
                
                // Simulasi proses pembayaran dengan delay untuk terlihat lebih alami
                setTimeout(() => {
                    alert('Proses pembayaran dengan ' + selectedMethod.id.toUpperCase() + ' akan dimulai.');
                    // Reset kelas tombol
                    this.classList.remove('clicked');
                    // Di sini bisa ditambahkan redirect ke halaman konfirmasi atau proses lainnya
                }, 300);
            } else {
                // Jika tidak ada metode pembayaran yang dipilih
                alert('Silakan pilih metode pembayaran terlebih dahulu.');
            }
        });
    }
});