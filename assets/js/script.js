// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navUl.classList.toggle('active');
        });
    }

    // Smooth scroll for Start Simulation button
    const startBtn = document.querySelector('.btn-glow-large');
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#about-section');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Tab switching functionality for Motivation Hub
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show selected tab content
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Career guidance functionality
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const careerDetails = document.querySelectorAll('.career-detail-section');

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const careerType = btn.getAttribute('data-career');

            // Hide all career details
            careerDetails.forEach(detail => detail.classList.remove('active'));

            // Show selected career detail
            const targetDetail = document.getElementById(careerType + '-detail');
            if (targetDetail) {
                targetDetail.classList.add('active');
                // Smooth scroll to the detail section
                targetDetail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Category filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const careerCards = document.querySelectorAll('.career-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            careerCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Quiz functionality - 12 Question Career Personality Quiz
let currentQuestion = 0;
const totalQuestions = 12;
let scores = { tech: 0, design: 0, health: 0, business: 0 };

const questions = [
    {
        title: "Question 1",
        text: "What is your favorite subject in school?",
        options: ["Mathematics", "Science", "Art", "Literature"],
        categories: ["tech", "health", "design", "business"]
    },
    {
        title: "Question 2",
        text: "How do you prefer solving problems?",
        options: ["Logically with data", "Creatively and intuitively", "Through discussion and collaboration", "Strategically with planning"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 3",
        text: "What kind of work excites you the most?",
        options: ["Building innovative solutions", "Helping and mentoring others", "Creating beautiful designs", "Leading teams and projects"],
        categories: ["tech", "health", "design", "business"]
    },
    {
        title: "Question 4",
        text: "What environment do you enjoy working in?",
        options: ["Tech-focused office", "Creative and artistic space", "Healthcare or educational setting", "Business and corporate environment"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 5",
        text: "What's your biggest strength?",
        options: ["Analytical thinking", "Creativity and imagination", "Empathy and communication", "Leadership and organization"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 6",
        text: "How do you handle new technologies?",
        options: ["Excited to learn and implement", "Use them as creative tools", "Focus on how they help people", "Leverage for business efficiency"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 7",
        text: "Which activity sounds most fun to you?",
        options: ["Coding or debugging software", "Designing graphics or websites", "Teaching or counseling others", "Managing projects or events"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 8",
        text: "What motivates you the most?",
        options: ["Solving complex challenges", "Making a positive impact", "Expressing creativity", "Achieving leadership goals"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 9",
        text: "How do you like to express creativity?",
        options: ["Through technology and innovation", "Through art and design", "Through helping others grow", "Through strategic planning"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 10",
        text: "Which word best describes you?",
        options: ["Analytical", "Creative", "Empathetic", "Strategic"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 11",
        text: "What's your dream job environment?",
        options: ["High-tech startup", "Creative agency", "Hospital or school", "Corporate office"],
        categories: ["tech", "design", "health", "business"]
    },
    {
        title: "Question 12",
        text: "What kind of impact do you want to make in the world?",
        options: ["Technological advancement", "Creative inspiration", "Social betterment", "Business innovation"],
        categories: ["tech", "design", "health", "business"]
    }
];

function loadQuestion() {
    if (currentQuestion < totalQuestions) {
        const q = questions[currentQuestion];

        // Animate card out (slide left)
        const card = document.getElementById('quiz-card');
        card.style.animation = 'slideOutLeft 0.4s ease-out';

        setTimeout(() => {
            // Update content
            document.getElementById('question-title').textContent = q.title;
            document.getElementById('question-text').textContent = q.text;
            document.getElementById('current-question').textContent = currentQuestion + 1;
            document.querySelector('.question-number').textContent = `${currentQuestion + 1} / ${totalQuestions}`;

            const optionsContainer = document.querySelector('.options');
            optionsContainer.innerHTML = '';

            const optionIcons = ['🎯', '💡', '🎨', '👑'];

            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `
                    <span class="option-icon">${optionIcons[index]}</span>
                    <span class="option-text">${option}</span>
                `;
                btn.addEventListener('click', () => selectOption(btn));
                optionsContainer.appendChild(btn);
            });

            // Animate card in (slide from right)
            card.style.animation = 'slideInRight 0.6s ease-out';
            updateProgress();
        }, 400);
    } else {
        // Show result section
        showResultSection();
    }
}

function selectOption(selectedBtn) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    selectedBtn.classList.add('selected');

    // Record the answer
    const optionIndex = Array.from(selectedBtn.parentNode.children).indexOf(selectedBtn);
    const category = questions[currentQuestion].categories[optionIndex];
    scores[category]++;

    // Show appropriate button
    if (currentQuestion < totalQuestions - 1) {
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('result-btn').style.display = 'none';
    } else {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('result-btn').style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('result-btn').style.display = 'none';
}

function getCareerResult() {
    const maxScore = Math.max(...Object.values(scores));
    const topCategories = Object.keys(scores).filter(category => scores[category] === maxScore);

    // Career mapping based on categories
    const careerMap = {
        tech: "Software Engineer",
        design: "UI/UX Designer",
        health: "Doctor",
        business: "Entrepreneur"
    };

    // If tie, pick the first one (could be randomized or based on priority)
    return careerMap[topCategories[0]];
}

function showResultSection() {
    const career = getCareerResult();
    const quizCard = document.getElementById('quiz-card');
    quizCard.style.animation = 'slideOutLeft 0.4s ease-out';

    setTimeout(() => {
        quizCard.innerHTML = `
            <div class="result-success">
                <div class="success-icon">🎉</div>
                <h2>Your Ideal Career Path: ${career}</h2>
                <p>Based on your answers, ${career} seems like the perfect fit for your personality and preferences!</p>
                <div class="result-actions">
                    <button onclick="viewCareerRoadmap()" class="btn-quiz-glow result-btn">View Career Roadmap</button>
                    <button onclick="restartQuiz()" class="btn-quiz-glow restart-btn">Retake Quiz</button>
                </div>
            </div>
        `;
        quizCard.style.animation = 'slideInRight 0.6s ease-out, successGlow 2s infinite alternate';
    }, 400);
}

function viewCareerRoadmap() {
    const career = getCareerResult();
    // Redirect to guidance page with career parameter
    window.location.href = `guidance.html?career=${encodeURIComponent(career)}`;
}

function viewResults() {
    window.location.href = 'result.html';
}

function restartQuiz() {
    currentQuestion = 0;
    scores = { tech: 0, design: 0, health: 0, business: 0 };
    loadQuestion();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

// Result page functionality
function loadResults() {
    // Animate percentage counter
    let counter = 0;
    const target = 85; // Example percentage
    const counterElement = document.getElementById('percentage');
    const interval = setInterval(() => {
        counter++;
        counterElement.textContent = counter + '%';
        if (counter >= target) {
            clearInterval(interval);
        }
    }, 50);

    // Create chart
    const ctx = document.getElementById('result-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Creativity', 'Logic', 'Leadership', 'Communication', 'Technical Skills'],
            datasets: [{
                label: 'Your Profile',
                data: [80, 70, 90, 85, 75],
                backgroundColor: 'rgba(14, 165, 164, 0.2)',
                borderColor: '#0ea5a4',
                borderWidth: 2,
                pointBackgroundColor: '#0ea5a4'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Search and filter functionality for academies
function filterAcademies() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const cityFilter = document.getElementById('city-filter').value.toLowerCase();
    const fieldFilter = document.getElementById('field-filter').value.toLowerCase();
    const cards = document.querySelectorAll('.academy-card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const city = card.getAttribute('data-city').toLowerCase();
        const field = card.getAttribute('data-field').toLowerCase();
        const description = card.querySelector('.academy-description').textContent.toLowerCase();

        const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
        const matchesCity = cityFilter === '' || city === cityFilter;
        const matchesField = fieldFilter === '' || field === fieldFilter;

        if (matchesSearch && matchesCity && matchesField) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.quiz-fullscreen')) {
        loadQuestion();
        document.getElementById('next-btn').addEventListener('click', nextQuestion);
        document.getElementById('result-btn').addEventListener('click', viewResults);
    }

    if (document.querySelector('.result-section')) {
        loadResults();
    }

    if (document.querySelector('.academies-fullscreen')) {
        document.getElementById('search').addEventListener('input', filterAcademies);
        document.getElementById('city-filter').addEventListener('change', filterAcademies);
        document.getElementById('field-filter').addEventListener('change', filterAcademies);
        document.getElementById('search-btn').addEventListener('click', filterAcademies);
    }
});