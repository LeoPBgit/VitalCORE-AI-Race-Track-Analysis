// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(55, 70, 82, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated Counter for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when hero section is visible
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('%')) {
                        animateCounter(stat, parseFloat(text), 1500);
                    } else if (text.includes('+')) {
                        const num = parseInt(text.replace('+', ''));
                        animateCounter(stat, num, 1500);
                        stat.textContent = num + '+';
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .team-feature, .hero-stats');
    animatedElements.forEach(el => observer.observe(el));
});

// Dashboard Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const dashboardContent = document.querySelector('.dashboard-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update dashboard content based on selected tab
            updateDashboardContent(this.textContent.trim());
        });
    });
});

function updateDashboardContent(tabName) {
    const telemetryCards = document.querySelectorAll('.telemetry-card');
    
    switch(tabName) {
        case 'Live Telemetry':
            updateTelemetryData([
                { title: 'Speed', value: '247', unit: 'km/h', trend: 'up', change: '+12 km/h' },
                { title: 'Lap Time', value: '1:23.456', unit: '', trend: 'down', change: '-0.234s' },
                { title: 'Tire Temp', value: '98°C', unit: '', trend: 'neutral', change: 'Optimal' }
            ]);
            break;
        case 'Performance':
            updateTelemetryData([
                { title: 'Best Lap', value: '1:22.891', unit: '', trend: 'down', change: 'Personal Best' },
                { title: 'Avg Speed', value: '198', unit: 'km/h', trend: 'up', change: '+5 km/h' },
                { title: 'Consistency', value: '94%', unit: '', trend: 'up', change: '+2%' }
            ]);
            break;
        case 'Analytics':
            updateTelemetryData([
                { title: 'Efficiency', value: '87%', unit: '', trend: 'up', change: '+3%' },
                { title: 'Fuel Usage', value: '2.1', unit: 'L/lap', trend: 'down', change: '-0.1 L' },
                { title: 'Brake Wear', value: '15%', unit: '', trend: 'neutral', change: 'Normal' }
            ]);
            break;
    }
}

function updateTelemetryData(data) {
    const telemetryCards = document.querySelectorAll('.telemetry-card');
    
    data.forEach((item, index) => {
        if (telemetryCards[index]) {
            const card = telemetryCards[index];
            const title = card.querySelector('h4');
            const value = card.querySelector('.value');
            const unit = card.querySelector('.unit');
            const trend = card.querySelector('.trend');
            
            if (title) title.textContent = item.title;
            if (value) value.textContent = item.value;
            if (unit) unit.textContent = item.unit;
            if (trend) {
                trend.textContent = `${getTrendIcon(item.trend)} ${item.change}`;
                trend.className = `trend ${item.trend}`;
            }
        }
    });
}

function getTrendIcon(trend) {
    switch(trend) {
        case 'up': return '↗';
        case 'down': return '↘';
        case 'neutral': return '→';
        default: return '→';
    }
}

// Sidebar Navigation for Analytics Dashboard
document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update dashboard based on selection
            updateAnalyticsDashboard(this.textContent.trim());
        });
    });
});

function updateAnalyticsDashboard(section) {
    const metrics = document.querySelectorAll('.metric-card');
    
    switch(section) {
        case 'Live Telemetry':
            updateMetrics([
                { title: 'Current Lap', value: '1:23.456', change: '-0.234s from best', type: 'positive' },
                { title: 'Position', value: 'P3', change: 'Maintaining', type: 'neutral' },
                { title: 'Fuel Level', value: '67%', change: '12 laps remaining', type: 'negative' },
                { title: 'Tire Wear', value: '23%', change: 'Good condition', type: 'positive' }
            ]);
            break;
        case 'Performance':
            updateMetrics([
                { title: 'Best Lap', value: '1:22.891', change: 'Session best', type: 'positive' },
                { title: 'Avg Lap', value: '1:24.123', change: '+1.232s from best', type: 'neutral' },
                { title: 'Top Speed', value: '312 km/h', change: 'Sector 2', type: 'positive' },
                { title: 'Consistency', value: '94%', change: '+2% from last session', type: 'positive' }
            ]);
            break;
        case 'Team':
            updateMetrics([
                { title: 'Team Position', value: 'P2', change: 'In championship', type: 'positive' },
                { title: 'Points Gap', value: '-15 pts', change: 'To leader', type: 'negative' },
                { title: 'Reliability', value: '98%', change: 'This season', type: 'positive' },
                { title: 'Pit Stops', value: '2.3s', change: 'Average time', type: 'positive' }
            ]);
            break;
        case 'Settings':
            updateMetrics([
                { title: 'Data Rate', value: '1000 Hz', change: 'Sampling frequency', type: 'neutral' },
                { title: 'Latency', value: '45ms', change: 'End-to-end', type: 'positive' },
                { title: 'Storage', value: '2.1 TB', change: 'Used this season', type: 'neutral' },
                { title: 'Uptime', value: '99.9%', change: 'Last 30 days', type: 'positive' }
            ]);
            break;
    }
}

function updateMetrics(data) {
    const metricCards = document.querySelectorAll('.metric-card');
    
    data.forEach((item, index) => {
        if (metricCards[index]) {
            const card = metricCards[index];
            const title = card.querySelector('h4');
            const value = card.querySelector('.metric-value');
            const change = card.querySelector('.metric-change');
            
            if (title) title.textContent = item.title;
            if (value) value.textContent = item.value;
            if (change) {
                change.textContent = item.change;
                change.className = `metric-change ${item.type}`;
            }
        }
    });
}

// Form Handling for CTA Buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Start Free Trial')) {
                e.preventDefault();
                showModal('trial');
            } else if (this.textContent.includes('Schedule Demo') || this.textContent.includes('Watch Demo')) {
                e.preventDefault();
                showModal('demo');
            }
        });
    });
});

function showModal(type) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(55, 70, 82, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(55, 70, 82, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const title = type === 'trial' ? 'Start Your Free Trial' : 'Schedule a Demo';
    const description = type === 'trial' 
        ? 'Get started with VitalCORE today. No credit card required.'
        : 'See VitalCORE in action with a personalized demo.';
    
    modal.innerHTML = `
        <h3 style="color: #374652; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
        <p style="color: #6c757d; margin-bottom: 2rem;">${description}</p>
        <form style="text-align: left;">
            <input type="text" placeholder="Full Name" style="width: 100%; padding: 12px; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
            <input type="email" placeholder="Email Address" style="width: 100%; padding: 12px; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
            <input type="text" placeholder="Company Name" style="width: 100%; padding: 12px; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
            <select style="width: 100%; padding: 12px; margin-bottom: 2rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                <option>Team Size</option>
                <option>1-10 people</option>
                <option>11-50 people</option>
                <option>51-200 people</option>
                <option>200+ people</option>
            </select>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button type="submit" style="background: linear-gradient(135deg, #008BFC, #0066cc); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer;">${type === 'trial' ? 'Start Trial' : 'Schedule Demo'}</button>
                <button type="button" class="close-modal" style="background: transparent; color: #374652; border: 2px solid #374652; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer;">Cancel</button>
            </div>
        </form>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animate modal in
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal handlers
    const closeModal = () => {
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    };
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Form submission
    modal.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you! We'll be in touch soon to ${type === 'trial' ? 'set up your trial' : 'schedule your demo'}.`);
            closeModal();
        }, 2000);
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.dashboard-preview');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize loading state
document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Real-time Data Simulation
function simulateRealTimeData() {
    const speedElement = document.querySelector('.telemetry-card .value');
    const lapTimeElement = document.querySelectorAll('.telemetry-card .value')[1];
    
    if (speedElement && lapTimeElement) {
        setInterval(() => {
            // Simulate speed changes
            const currentSpeed = parseInt(speedElement.textContent);
            const newSpeed = currentSpeed + Math.floor(Math.random() * 10 - 5);
            speedElement.textContent = Math.max(200, Math.min(300, newSpeed));
            
            // Simulate lap time updates
            const minutes = 1;
            const seconds = 22 + Math.random() * 4;
            const milliseconds = Math.floor(Math.random() * 1000);
            lapTimeElement.textContent = `${minutes}:${seconds.toFixed(0).padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        }, 2000);
    }
}

// Start real-time simulation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(simulateRealTimeData, 3000);
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.click();
        }
    }
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}
