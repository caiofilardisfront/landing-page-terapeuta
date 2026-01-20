        // --- FAQ ACCORDION ---
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', function() {
                const item = btn.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('open');
                // Fecha todos
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                        openItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                // Toggle atual
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('open');
                    answer.style.maxHeight = null;
                }
            });
        });

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('testimonialCarousel');
        const cards = document.querySelectorAll('.testimonial-card');
        const btnPrev = document.querySelector('.btn-prev');
        const btnNext = document.querySelector('.btn-next');
        
            // --- MENU HAMBURGUER MOBILE ---
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navMenu = document.querySelector('.nav-menu');
            if (mobileToggle && navMenu) {
                mobileToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    mobileToggle.classList.toggle('open');
                });
            }

        // Função para atualizar as classes (Ativo/Blur)
        const updateClasses = () => {
            const center = container.scrollLeft + (container.offsetWidth / 2);
            
            let closestCard = null;
            let minDistance = Infinity;

            // Encontrar o card mais próximo do centro
            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const distance = Math.abs(center - cardCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
                
                // Limpar classes anteriores
                card.classList.remove('active', 'prev', 'next');
            });

            // Aplicar classes se encontrou
            if (closestCard) {
                closestCard.classList.add('active');
                
                const prevCard = closestCard.previousElementSibling;
                const nextCard = closestCard.nextElementSibling;

                if (prevCard) prevCard.classList.add('prev');
                if (nextCard) nextCard.classList.add('next');
            }
        };

        // Ouvir o evento de scroll
        container.addEventListener('scroll', updateClasses);
        
        // Rodar uma vez no início e no resize
        updateClasses();
        window.addEventListener('resize', updateClasses);

        // --- Lógica dos Botões ---
        const scrollAmount = 340; // Largura do card + margem (aprox)

        btnPrev.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        btnNext.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // Centralizar o primeiro item ao carregar
        setTimeout(() => {
             const firstCardWidth = cards[0].offsetWidth;
             const containerCenter = container.offsetWidth / 2;
             // Ajuste fino inicial se necessário, mas o padding CSS já ajuda
             updateClasses(); 
        }, 100);
    });