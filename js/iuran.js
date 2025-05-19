// Script untuk mengatur perpindahan tab
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-item');
    const indicator = document.querySelector('.tab-indicator');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Move indicator
            indicator.style.left = (index * 50) + '%';
            
            // Show relevant content
            const tabId = this.getAttribute('data-tab');
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + '-content') {
                    content.classList.add('active');
                }
            });
        });
    });
});