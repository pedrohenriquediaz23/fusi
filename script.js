// Smooth scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Segment control functionality
    const segmentInputs = document.querySelectorAll('input[name="pricing-tab"]');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    segmentInputs.forEach(input => {
        input.addEventListener('change', function() {
            const selectedTab = this.value;
            console.log('Switched to:', selectedTab);
            
            // Add visual feedback
            showNotification(`Alterado para: ${selectedTab.toUpperCase()}`, 'info');
            
            // Here you would typically show/hide different pricing content
            // For now, we'll add a subtle animation to the pricing cards
            pricingCards.forEach((card, index) => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, index * 100);
            });
            
            // Example: Change pricing based on selected tab
            updatePricingForTab(selectedTab);
        });
    });
    
    function updatePricingForTab(tab) {
        const priceElements = document.querySelectorAll('.amount');
        const periodElements = document.querySelectorAll('.period');
        const planTitles = document.querySelectorAll('.pricing-header h3');
        const planDescriptions = document.querySelectorAll('.pricing-header p');
        
        switch(tab) {
            case 'hourly':
                // Preços originais por horas
                priceElements[0].textContent = '5,00';
                priceElements[1].textContent = '10,90';
                priceElements[2].textContent = '19,90';
                periodElements[0].textContent = '/hora';
                periodElements[1].textContent = '/4h';
                periodElements[2].textContent = '/24h';
                planTitles[0].textContent = '1 HORA';
                planTitles[1].textContent = '4 HORAS';
                planTitles[2].textContent = '24 HORAS';
                planDescriptions[0].textContent = 'Ideal para testes rápidos';
                planDescriptions[1].textContent = 'Perfeito para sessões longas';
                planDescriptions[2].textContent = 'Para desenvolvimento intenso';
                break;
            case 'weekly':
                // Preços semanais (exemplo baseado nos originais)
                priceElements[0].textContent = '25,00';
                priceElements[1].textContent = '45,00';
                priceElements[2].textContent = '80,00';
                periodElements[0].textContent = '/semana';
                periodElements[1].textContent = '/semana';
                periodElements[2].textContent = '/semana';
                planTitles[0].textContent = '1 SEMANA';
                planTitles[1].textContent = '2 SEMANAS';
                planTitles[2].textContent = '4 SEMANAS';
                planDescriptions[0].textContent = 'Ideal para testes prolongados';
                planDescriptions[1].textContent = 'Perfeito para projetos médios';
                planDescriptions[2].textContent = 'Para desenvolvimento contínuo';
                break;
            case 'monthly':
                // Preços mensais (exemplo baseado nos originais)
                priceElements[0].textContent = '89,90';
                priceElements[1].textContent = '159,90';
                priceElements[2].textContent = '299,90';
                periodElements[0].textContent = '/mês';
                periodElements[1].textContent = '/mês';
                periodElements[2].textContent = '/mês';
                planTitles[0].textContent = '1 MÊS';
                planTitles[1].textContent = '3 MESES';
                planTitles[2].textContent = '6 MESES';
                planDescriptions[0].textContent = 'Ideal para uso regular';
                planDescriptions[1].textContent = 'Perfeito para projetos longos';
                planDescriptions[2].textContent = 'Para desenvolvimento profissional';
                break;
        }
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em até 2 horas.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Checkout functionality
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutClose = document.querySelector('.checkout-close');
    const cancelButton = document.querySelector('.cancel-button');
    const paymentForm = document.getElementById('payment-form');
    
    // Open checkout modal
    function openCheckout(plan, price, description) {
        // Update checkout summary
        document.getElementById('selected-plan').textContent = `Plano ${plan}`;
        document.getElementById('selected-description').textContent = description;
        document.getElementById('selected-price').textContent = `R$ ${price}`;
        document.getElementById('subtotal').textContent = `R$ ${price}`;
        document.getElementById('total-price').textContent = `R$ ${price}`;
        
        // Show modal
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close checkout modal
    function closeCheckout() {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Pricing buttons functionality
    const pricingButtons = document.querySelectorAll('.pricing-button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            const card = this.closest('.pricing-card');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            openCheckout(title, price, description);
        });
    });
    
    // Close checkout modal events
    if (checkoutClose) {
        checkoutClose.addEventListener('click', closeCheckout);
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', closeCheckout);
    }
    
    // Close modal when clicking overlay
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal || e.target.classList.contains('checkout-overlay')) {
            closeCheckout();
        }
    });
    
    // Payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const confirmButton = this.querySelector('.confirm-button');
            const originalText = confirmButton.innerHTML;
            
            // Get form data
            const formData = {
                name: document.getElementById('customer-name').value,
                email: document.getElementById('customer-email').value,
                phone: document.getElementById('customer-phone').value,
                paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
                plan: document.getElementById('selected-plan').textContent,
                price: document.getElementById('selected-price').textContent
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.phone) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simulate payment processing
            confirmButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            confirmButton.disabled = true;
            
            setTimeout(() => {
                // Simulate successful payment
                showNotification('Pagamento processado com sucesso! Você receberá as credenciais por email em breve.', 'success');
                
                // Reset form
                this.reset();
                document.querySelector('input[name="payment-method"][value="pix"]').checked = true;
                
                // Close modal
                setTimeout(() => {
                    closeCheckout();
                    confirmButton.innerHTML = originalText;
                    confirmButton.disabled = false;
                }, 2000);
                
            }, 3000);
        });
    }
    
    // CTA buttons functionality
    const ctaButtons = document.querySelectorAll('.cta-button, .primary-button, .trial-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button types
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('ver planos')) {
                document.querySelector('#plans').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // YouTube API and video player functionality
    let players = {};
    let currentPlayingVideo = null;
    let youtubeAPIReady = false;
    
    // Check if YouTube API is loaded
    function checkYouTubeAPI() {
        if (typeof YT !== 'undefined' && YT.Player) {
            youtubeAPIReady = true;
            initializePlayers();
        } else {
            setTimeout(checkYouTubeAPI, 100);
        }
    }
    
    // Initialize YouTube players
    function initializePlayers() {
        const videoCards = document.querySelectorAll('.video-card');
        videoCards.forEach(card => {
            const videoId = card.getAttribute('data-video');
            const playerId = `player-${videoId}`;
            const playerElement = document.getElementById(playerId);
            
            if (playerElement && !players[videoId]) {
                try {
                    players[videoId] = new YT.Player(playerId, {
                        height: '100%',
                        width: '100%',
                        videoId: videoId,
                        playerVars: {
                            'playsinline': 1,
                            'rel': 0,
                            'modestbranding': 1,
                            'showinfo': 0,
                            'controls': 1,
                            'autoplay': 0,
                            'fs': 1,
                            'cc_load_policy': 0
                        },
                        events: {
                            'onReady': function(event) {
                                console.log('Player ready for video:', videoId);
                            },
                            'onStateChange': function(event) {
                                if (event.data === YT.PlayerState.PLAYING) {
                                    // Pause other videos when one starts playing
                                    Object.keys(players).forEach(id => {
                                        if (id !== videoId && players[id].pauseVideo) {
                                            players[id].pauseVideo();
                                        }
                                    });
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error creating player for video:', videoId, error);
                }
            }
        });
    }
    
    // YouTube API ready callback (global function)
    window.onYouTubeIframeAPIReady = function() {
        console.log('YouTube API Ready');
        youtubeAPIReady = true;
        initializePlayers();
    };
    
    // Start checking for YouTube API
    checkYouTubeAPI();
    
    // Video card interactions
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const videoId = card.getAttribute('data-video');
        const videoOverlay = card.querySelector('.video-overlay');
        
        if (playButton && videoId && videoOverlay) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                playVideo(videoId, videoOverlay);
            });
        }
        
        // Close video when clicking outside or on close button
        videoOverlay.addEventListener('click', function(e) {
            if (e.target === videoOverlay) {
                closeVideo(videoId, videoOverlay);
            }
        });
        
        // Close button functionality
        const closeButton = card.querySelector('.video-close');
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                closeVideo(videoId, videoOverlay);
            });
        }
    });
    
    function playVideo(videoId, overlay) {
        console.log('Attempting to play video:', videoId);
        
        // Close any currently playing video
        if (currentPlayingVideo && currentPlayingVideo !== videoId) {
            const currentOverlay = document.querySelector(`[data-video="${currentPlayingVideo}"] .video-overlay`);
            if (currentOverlay) {
                closeVideo(currentPlayingVideo, currentOverlay);
            }
        }
        
        // Show overlay
        overlay.classList.add('active');
        currentPlayingVideo = videoId;
        
        // Wait a bit for the overlay to show, then play the video
        setTimeout(() => {
            if (players[videoId] && typeof players[videoId].playVideo === 'function') {
                try {
                    players[videoId].playVideo();
                    console.log('Video playing:', videoId);
                } catch (error) {
                    console.error('Error playing video:', error);
                    // Fallback: open in new tab
                    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                }
            } else {
                console.log('Player not ready, opening in new tab');
                // Fallback: open in new tab
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            }
        }, 300);
    }
    
    function closeVideo(videoId, overlay) {
        overlay.classList.remove('active');
        
        // Pause the video
        if (players[videoId]) {
            players[videoId].pauseVideo();
        }
        
        if (currentPlayingVideo === videoId) {
            currentPlayingVideo = null;
        }
    }
    
    // Close video with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentPlayingVideo) {
            const overlay = document.querySelector(`[data-video="${currentPlayingVideo}"] .video-overlay`);
            if (overlay) {
                closeVideo(currentPlayingVideo, overlay);
            }
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Special observer for games and pricing cards with slide animation from left
    const slideObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const slideObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when entering view
                const cards = entry.target.querySelectorAll('.game-card, .pricing-card');
                cards.forEach(card => {
                    card.classList.add('animate-in');
                });
            } else {
                // Remove animation class when leaving view to reset for next time
                const cards = entry.target.querySelectorAll('.game-card, .pricing-card');
                cards.forEach(card => {
                    card.classList.remove('animate-in');
                });
            }
        });
    }, slideObserverOptions);

    // Observe elements for animation (excluding games and pricing cards)
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .video-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe games and pricing sections for slide animation from left
    const gamesSection = document.querySelector('.games');
    const pricingSection = document.querySelector('.pricing');
    
    if (gamesSection) {
        slideObserver.observe(gamesSection);
    }
    
    if (pricingSection) {
        slideObserver.observe(pricingSection);
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .video-card, .game-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Game cards functionality
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Add click animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 150);
                
                // Get game name
                const gameName = card.querySelector('h3').textContent;
                
                // Show notification
                showNotification(`Escolha um plano para jogar ${gameName}!`, 'info');
                
                // Scroll to plans section
                setTimeout(() => {
                    document.querySelector('#plans').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 500);
            });
        }
        
        // Card click to scroll to plans
        card.addEventListener('click', function() {
            document.querySelector('#plans').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dynamic pricing calculation (example)
    function updatePricing() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.amount');
            if (priceElement) {
                // Add some dynamic pricing logic here if needed
                const currentPrice = parseFloat(priceElement.textContent.replace(',', '.'));
                // Example: Apply discount for popular plan
                if (card.classList.contains('popular')) {
                    priceElement.style.color = '#f59e0b';
                }
            }
        });
    }

    updatePricing();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Modal system
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-button">OK</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalContent = modal.querySelector('.modal-content');
    
    modalOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modalContent.style.cssText = `
        background: var(--card-bg);
        border-radius: 20px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(20px);
        max-width: 500px;
        width: 100%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-button').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.opacity = '0';
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Add some additional CSS for notifications and modals
const additionalStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h3 {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .modal-close:hover {
        color: var(--primary-color);
    }
    
    .modal-body {
        padding: 30px;
    }
    
    .modal-body p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .modal-footer {
        padding: 20px 30px;
        border-top: 1px solid var(--border-color);
        text-align: right;
    }
    
    .modal-button {
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .modal-button:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-glow);
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px;
        border-top: 1px solid var(--border-color);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    body.loaded .hero-badge,
    body.loaded .hero-title,
    body.loaded .hero-description,
    body.loaded .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Timer de Promoção - Reinicia sempre que a página é recarregada
function startPromoTimer() {
    // Sempre inicia com 3 dias completos
    let totalSeconds = 3 * 24 * 60 * 60; // 3 dias em segundos
    
    function updateTimer() {
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Quando chegar a zero, reinicia com 3 dias
            totalSeconds = 3 * 24 * 60 * 60;
        }
    }
    
    // Atualiza imediatamente
    updateTimer();
    
    // Atualiza a cada segundo
    setInterval(updateTimer, 1000);
}

// Inicia o timer quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    startPromoTimer();
});
