document.addEventListener("DOMContentLoaded", () => {
        const track = document.querySelector(".carousel-track");
        
        // --- 1. LÓGICA DO INFINITO ---
        // Pegamos todos os cards originais
        const originalCards = Array.from(track.children);
        
        // Clonamos para garantir o loop sem buracos
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); 
            track.appendChild(clone);
        });

        // --- 2. LÓGICA DA MODAL (LIGHTBOX) ---
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.modal-close');

        // Função para abrir a modal
        const openModal = (src) => {
            modalImg.src = src;
            modal.classList.add('active');
            // Pausa a animação do fundo se quiser (opcional, via CSS já pausa no hover)
        };

        // Função para fechar a modal
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modalImg.src = ''; // Limpa a imagem após fechar
            }, 300);
        };

        // Adicionar evento de clique em TODAS as imagens (originais e clones)
        // Usamos delegação de evento no 'track' para pegar até os clones
        track.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && e.target.classList.contains('t-print-img')) {
                openModal(e.target.src);
            }
        });

        // Fechar ao clicar no X
        closeBtn.addEventListener('click', closeModal);

        // Fechar ao clicar fora da imagem (no fundo escuro)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    });