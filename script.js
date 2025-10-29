// ============================
// Mobile Menu Toggle
// ============================

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ============================
// Smooth Scroll & Active Link
// ============================

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            
            // Smooth scroll to section
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// Intersection Observer for Animations
// ============================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and feature cards
const sections = document.querySelectorAll('.section');
const featureCards = document.querySelectorAll('.feature-card');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(2rem)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(2rem)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============================
// Update Active Link on Scroll
// ============================

const updateActiveLink = () => {
    const sections = document.querySelectorAll('.section');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveLink();
    });
});

// ============================
// Form Handling
// ============================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && message) {
        // Show success message (in real app, send to server)
        showNotification('💕 Mensagem de amor enviada com sucesso!', 'success');
        
        // Reset form
        contactForm.reset();
    } else {
        showNotification('Por favor, preencha todos os campos com carinho 💖', 'error');
    }
});

// ============================
// Notification System
// ============================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 5rem;
        right: 1rem;
        left: 1rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateY(-2rem);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-2rem);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================
// Touch Gestures (Swipe)
// ============================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - open menu
            if (window.innerWidth < 768) {
                menuToggle.classList.add('active');
                nav.classList.add('active');
            }
        } else {
            // Swipe left - close menu
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    }
}

// ============================
// Performance Optimization
// ============================

// Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================
// PWA Installation Prompt
// ============================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button (you can add this to your UI)
    console.log('PWA can be installed');
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    showNotification('App instalado com sucesso!', 'success');
});

// ============================
// Console Welcome Message
// ============================

console.log('%c💕 Uma declaração especial de amor 💕', 'font-size: 20px; font-weight: bold; color: #E91E63;');
console.log('%cFeito com muito carinho e amor', 'font-size: 14px; color: #FF4081;');

// ============================
// Controle do Vídeo Modal
// ============================

// Garantir que o DOM esteja totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Inicializando modal de vídeo...');
    
    let currentSlide = 0;
    let totalSlides = 11;
    let autoPlayInterval = null;

    const videoModal = document.getElementById('videoModal');
    const playVideoBtn = document.getElementById('playVideoBtn');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const videoSlides = document.querySelectorAll('.video-slide');
    const progressBar = document.getElementById('progressBar');
    const currentFrameSpan = document.getElementById('currentFrame');
    const totalFramesSpan = document.getElementById('totalFrames');

    // Debug: Verificar se os elementos foram encontrados
    console.log('=== DEBUG MODAL ===');
    console.log('videoModal:', videoModal);
    console.log('playVideoBtn:', playVideoBtn);
    console.log('closeVideoBtn:', closeVideoBtn);
    console.log('videoSlides count:', videoSlides.length);
    console.log('==================');

// Abrir modal de vídeo
if (playVideoBtn && videoModal) {
    playVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('=== ABRINDO MODAL (FORÇADO) ===');
        
        // Salvar a posição do scroll para iOS
        const scrollY = window.scrollY;
        
        // Limpar qualquer estilo inline anterior
        videoModal.removeAttribute('style');
        
        // FORÇAR EXIBIÇÃO VIA INLINE STYLES (sobrescreve tudo)
        videoModal.style.cssText = `
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.98) !important;
            z-index: 999999 !important;
            overflow: auto !important;
            -webkit-overflow-scrolling: touch !important;
        `;
        
        // Adicionar classe active também
        videoModal.classList.add('active');
        
        // Bloquear scroll do body (compatível com iOS)
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.dataset.scrollY = scrollY;
        document.body.classList.add('modal-open');
        
        console.log('✅ Modal aberto! Verificando...');
        
        setTimeout(() => {
            console.log('Modal display:', window.getComputedStyle(videoModal).display);
            console.log('Modal position:', window.getComputedStyle(videoModal).position);
            console.log('Modal z-index:', window.getComputedStyle(videoModal).zIndex);
        }, 100);
        
        // Iniciar slides
        if (videoSlides && videoSlides.length > 0) {
            console.log('✅ Iniciando', videoSlides.length, 'slides');
            showSlide(0);
            startAutoPlay();
        } else {
            console.error('❌ Slides não encontrados');
        }
    });
} else {
    console.error('❌ Elementos não encontrados');
    console.log('playVideoBtn:', playVideoBtn);
    console.log('videoModal:', videoModal);
}

// Fechar modal
if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeVideo();
    });
}

function closeVideo() {
    console.log('=== FECHANDO MODAL ===');
    
    // Remover classe active
    videoModal.classList.remove('active');
    videoModal.removeAttribute('style');
    
    // Restaurar scroll (compatível com iOS)
    const scrollY = document.body.dataset.scrollY || 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, parseInt(scrollY));
    delete document.body.dataset.scrollY;
    
    // Remover classe do body
    document.body.classList.remove('modal-open');
    
    // Parar autoplay
    stopAutoPlay();
    
    console.log('Modal fechado');
    
    // Sair do fullscreen
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

// Fechar ao clicar fora (no fundo escuro)
videoModal.addEventListener('click', (e) => {
    // Verifica se clicou no modal-inner (fundo) ou diretamente no modal
    if (e.target === videoModal || e.target.classList.contains('video-modal-inner')) {
        closeVideo();
    }
});

// Mostrar slide específico
function showSlide(n) {
    console.log('showSlide called with n:', n);
    console.log('videoSlides:', videoSlides);
    console.log('videoSlides.length:', videoSlides ? videoSlides.length : 0);
    
    if (!videoSlides || videoSlides.length === 0) {
        console.error('Nenhum slide disponível!');
        return;
    }
    
    if (n >= totalSlides) {
        currentSlide = totalSlides - 1;
        stopAutoPlay();
    } else if (n < 0) {
        currentSlide = 0;
    } else {
        currentSlide = n;
    }
    
    // Esconder todos os slides
    videoSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar slide atual
    if (videoSlides[currentSlide]) {
        videoSlides[currentSlide].classList.add('active');
    }
    
    // Atualizar progress bar
    if (progressBar) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // Atualizar contador
    if (currentFrameSpan) {
        currentFrameSpan.textContent = currentSlide + 1;
    }
    if (totalFramesSpan) {
        totalFramesSpan.textContent = totalSlides;
    }
}

// Botão próximo
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Botão anterior
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

// Play/Pause
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', toggleAutoPlay);
}

function toggleAutoPlay() {
    if (autoPlayInterval) {
        stopAutoPlay();
        playPauseBtn.innerHTML = '▶ Play';
    } else {
        startAutoPlay();
        playPauseBtn.innerHTML = '⏸ Pause';
    }
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            showSlide(currentSlide + 1);
        } else {
            stopAutoPlay();
            playPauseBtn.innerHTML = '🔄 Reiniciar';
        }
    }, 5500); // 5.5 segundos por slide
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!videoModal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showSlide(currentSlide - 1);
    } else if (e.key === 'Escape') {
        closeVideo();
    }
});

// Gestos de swipe no mobile para o vídeo
let videoTouchStartX = 0;
let videoTouchEndX = 0;

if (videoModal) {
    videoModal.addEventListener('touchstart', (e) => {
        videoTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    videoModal.addEventListener('touchend', (e) => {
        videoTouchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, { passive: true });
}

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = videoTouchStartX - videoTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - próximo
            showSlide(currentSlide + 1);
        } else {
            // Swipe right - anterior
            showSlide(currentSlide - 1);
        }
    }
}

}); // Fim do DOMContentLoaded
