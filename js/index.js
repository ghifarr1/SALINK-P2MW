 // Deteksi layar mobile yang lebih akurat
        function isMobile() {
            return window.innerWidth < 768;
        }
        
        // Toggle sidebar dengan animasi yang lebih halus
        function toggleSidebar() {
            document.body.classList.toggle('show-sidebar');
        }
        
        // Pengaturan tampilan berdasarkan ukuran layar yang lebih responsif
        function responsiveAdjustments() {
            const desktopElements = document.querySelectorAll('.desktop-only');
            
            if (isMobile()) {
                desktopElements.forEach(el => {
                    el.style.display = 'none';
                });
            } else {
                desktopElements.forEach(el => {
                    el.style.display = 'block';
                });
            }
        }
        
        // Event listener optimasi untuk performa mobile
        document.addEventListener('DOMContentLoaded', function() {
            responsiveAdjustments();
            
            // Optimasi event listener untuk resize dengan throttling
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(responsiveAdjustments, 250);
            });
        });

        // Fungsi untuk modal darurat - dioptimalkan untuk performa mobile
        const modal = document.querySelector('#modalEmergency');
        const openModalButton = document.querySelector('#openModalButton');
        const closeModalButton = document.querySelector('#closeModalButton');

        // Tambahan error handling untuk pengalaman mobile yang lebih baik
        if (openModalButton) {
            openModalButton.addEventListener('click', () => {
                modal.classList.add('show');
                // Mencegah scroll pada background saat modal terbuka
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                modal.classList.remove('show');
                // Mengaktifkan kembali scroll saat modal ditutup
                document.body.style.overflow = '';
            });
        }

        // Menutup modal jika klik di luar modal - tetap dipertahankan untuk UX yang lebih baik
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Placeholder untuk fungsi kirim pesan
        function kirimPesan() {
            const input = document.querySelector('.input-with-icon input');
            if (input && input.value.trim() !== '') {
                alert('Pesan darurat dikirim: ' + input.value);
                input.value = '';
            } else {
                alert('Silakan ketik pesan terlebih dahulu');
            }
        }

        // Menambahkan background dinamis ke header
        document.addEventListener('DOMContentLoaded', function() {
            // Array gambar untuk background header (contoh paths)
            const backgroundImages = [
                'assets/images/perumahan.jpeg',
            ];
            
            // Set background awal
            const dynamicBackground = document.getElementById('dynamicBackground');
            if (dynamicBackground) {
                dynamicBackground.style.backgroundImage = `url('${backgroundImages[0]}')`;
                
                // Mengubah background secara periodik (opsional)
                let currentBgIndex = 0;
                setInterval(() => {
                    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
                    dynamicBackground.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;
                }, 10000); // Ganti setiap 10 detik
            }
            
            // Inisialisasi carousel
            initCarousel();
            
            // Fungsi responsive tetap dipertahankan
            responsiveAdjustments();
            
            // Optimasi event listener untuk resize dengan throttling
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(responsiveAdjustments, 250);
            });
        });
        
        // Fungsi untuk carousel
        function initCarousel() {
            const carouselContainer = document.querySelector('.carousel-container');
            const carouselSlides = document.querySelectorAll('.carousel-slide');
            const carouselDots = document.querySelectorAll('.carousel-dot');
            const prevArrow = document.querySelector('.carousel-arrow.prev');
            const nextArrow = document.querySelector('.carousel-arrow.next');
            let currentSlide = 0;
            let startX, moveX;
            
            // Auto rotate carousel
            let carouselInterval = setInterval(nextSlide, 5000);
            
            // Fungsi untuk menampilkan slide tertentu
            function showSlide(index) {
                // Reset interval untuk mencegah slide berubah terlalu cepat setelah interaksi manual
                clearInterval(carouselInterval);
                carouselInterval = setInterval(nextSlide, 5000);
                
                // Validasi index
                if (index >= carouselSlides.length) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = carouselSlides.length - 1;
                } else {
                    currentSlide = index;
                }
                
                // Menggeser ke slide yang aktif
                if (carouselContainer) {
                    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
                
                // Update dot yang aktif
                carouselDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentSlide);
                });
            }
            
            // Fungsi untuk slide berikutnya
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            // Fungsi untuk slide sebelumnya
            function prevSlide() {
                showSlide(currentSlide - 1);
            }
            
            // Event listeners untuk navigasi dot
            carouselDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Event listeners untuk arrow
            if (prevArrow) prevArrow.addEventListener('click', prevSlide);
            if (nextArrow) nextArrow.addEventListener('click', nextSlide);
            
            // Touch events untuk swipe di mobile
            if (carouselContainer) {
                carouselContainer.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    // Hentikan animasi selama swipe
                    carouselContainer.style.transition = 'none';
                }, { passive: true });
                
                carouselContainer.addEventListener('touchmove', (e) => {
                    if (!startX) return;
                    
                    moveX = e.touches[0].clientX;
                    const diff = moveX - startX;
                    const offset = (diff / window.innerWidth) * 100;
                    
                    // Batas pergeseran selama swipe
                    if (Math.abs(offset) < 50) {
                        carouselContainer.style.transform = `translateX(calc(-${currentSlide * 100}% + ${offset}px))`;
                    }
                }, { passive: true });
                
                carouselContainer.addEventListener('touchend', (e) => {
                    carouselContainer.style.transition = 'transform 0.5s ease';
                    
                    if (!startX || !moveX) return;
                    
                    const diff = moveX - startX;
                    // Swipe kanan (prev) atau kiri (next)
                    if (diff > 50) {
                        prevSlide();
                    } else if (diff < -50) {
                        nextSlide();
                    } else {
                        // Kembali ke posisi slide saat ini jika swipe tidak cukup jauh
                        showSlide(currentSlide);
                    }
                    
                    // Reset nilai
                    startX = null;
                    moveX = null;
                }, { passive: true });
            }
            
            // Tampilkan slide pertama
            showSlide(0);
        }

        // Fungsi untuk menampilkan emergency popup dari bawah layar
        function showEmergencyConfirmation() {
            // Tutup modal emergency sebelumnya jika terbuka
            const modalEmergency = document.querySelector('#modalEmergency');
            if (modalEmergency && modalEmergency.classList.contains('show')) {
                modalEmergency.classList.remove('show');
                
                // Memberikan jeda animasi sebelum menampilkan popup baru
                setTimeout(() => {
                document.querySelector('#emergencyConfirmationPopup').classList.add('active');
                }, 300); // Jeda 300ms untuk smooth transition
            } else {
                // Langsung tampilkan popup jika modal tidak sedang terbuka
                document.querySelector('#emergencyConfirmationPopup').classList.add('active');
            }
            
            // Nonaktifkan scroll body agar tidak mengganggu popup
            document.body.style.overflow = 'hidden';
        }

        // Fungsi untuk menutup emergency popup dengan animasi slide-down
        function closeEmergencyConfirmation() {
            const emergencyPopup = document.querySelector('#emergencyConfirmationPopup');
            if (emergencyPopup) {
                emergencyPopup.classList.remove('active');
                
                // Aktifkan kembali scroll setelah popup tertutup
                setTimeout(() => {
                document.body.style.overflow = '';
                }, 400); // Jeda sampai animasi selesai
            }
        }

        // Tambahkan ini ke dalam fungsi kirimPesan() yang sudah ada
        function kirimPesan() {
            const input = document.querySelector('.input-with-icon input');
            if (input && input.value.trim() !== '') {
                input.value = '';
                
                // Tampilkan popup konfirmasi dengan animasi slide-up
                showEmergencyConfirmation();
                
                // Tracking untuk analitik (opsional)
                if (typeof gtag !== 'undefined') {
                gtag('event', 'emergency_message_sent', {
                    'event_category': 'Emergency',
                    'event_label': 'User sent emergency message'
                });
                }
            } else {
                alert('Silakan ketik pesan terlebih dahulu');
            }
        }
        
        // Menambahkan event listener untuk tombol darurat di modal emergency
        document.addEventListener('DOMContentLoaded', function() {
            // Menambahkan event listener untuk tombol-tombol darurat di modal
            const emergencyButtons = document.querySelectorAll('.emergency-button-option');
            emergencyButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Menampilkan popup konfirmasi darurat
                showEmergencyConfirmation();
            });
            });
            
            // Event listener untuk tombol Situasi Telah Aman
            const situationSafeButton = document.querySelector('#situationSafeButton');
            if (situationSafeButton) {
            situationSafeButton.addEventListener('click', function() {
                closeEmergencyConfirmation();
                // Fungsi tambahan bila diperlukan
                console.log('Situasi telah aman');
            });
            }
            
            // Event listener untuk tombol Tidak Sengaja Tertekan
            const accidentalPressButton = document.querySelector('#accidentalPressButton');
            if (accidentalPressButton) {
            accidentalPressButton.addEventListener('click', function() {
                closeEmergencyConfirmation();
                // Fungsi tambahan bila diperlukan
                console.log('Tombol tidak sengaja tertekan');
            });
            }
        });