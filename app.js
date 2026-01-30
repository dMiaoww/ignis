/**
 * Ignis Platform Logic (v2.1)
 * Enhanced Event Handling & Discussion Flow
 */

const KNOWLEDGE_POOL = [
    {
        id: 1, title: "The Ochre Effect", tag: "Psychology", domain: "Human Perception",
        preview: "Perception of neutral tones in natural vs synthetic light.",
        full: "The Ochre Effect refers to a phenomenon in color psychology where the human brain adjusts its white balance based on the ambient color temperature. In natural sunlight, our eyes are primed for the full spectrum, making earthy tones appear more vibrant.",
        bridge: { title: "Kelvin Scale", domain: "Physics", text: "While Ochre is about perception, the Kelvin scale is the cold physical measurement of that same light temperature." }
    },
    {
        id: 2, title: "Kessler Syndrome", tag: "Astronautics", domain: "Systems Science",
        preview: "A cascade of space debris in low Earth orbit.",
        full: "Proposed by NASA scientist Donald J. Kessler in 1978, the Kessler Syndrome suggests that a single collision between two large objects could create a cloud of debris that renders orbital shells unusable.",
        bridge: { title: "Tragedy of the Commons", domain: "Economics", text: "Both systems collapse because individual actors over-exploit a shared, finite resource—whether orbits or pastures." }
    },
    {
        id: 3, title: "Zeno's Paradox", tag: "Philosophy", domain: "Logics",
        preview: "The ancient Greek argument that motion is impossible.",
        full: "Zeno of Elea proposed several paradoxes to support the idea that the world is monolithic and unchanging. The most famous is 'Achilles and the Tortoise', which calculus later resolved.",
        bridge: { title: "Planck Length", domain: "Quantum Physics", text: "Zeno assumed space is infinitely divisible; quantum physics suggests there might be a 'smallest' possible unit of space." }
    },
    {
        id: 4, title: "Lindy Effect", tag: "Statistics", domain: "Probability",
        preview: "Non-perishable items' life expectancy increases with age.",
        full: "The Lindy Effect suggests that for things like ideas, books, or technologies, every additional day of survival implies a longer remaining life. If a book has been in print for 50 years, it is likely to be for another 50.",
        bridge: { title: "Antifragility", domain: "Risk Mgmt", text: "Systems that follow the Lindy Effect are often antifragile—they actually benefit from time and stressors." }
    },
    {
        id: 5, title: "Blue Zones", tag: "Health", domain: "Sociology",
        preview: "Regions of the world where people live much longer than average.",
        full: "Blue Zones are geographic areas where people live significantly longer lives, often reaching age 100. Factors include plant-based diets, constant moderate physical activity, and strong social connections.",
        bridge: { title: "Social Capital", domain: "Economics", text: "Longevity in Blue Zones isn't just biological; it's a form of social capital where community ties provide safety nets." }
    },
    {
        id: 6, title: "Pareto Principle", tag: "Economics", domain: "Systems Science",
        preview: "The 80/20 rule of effects originating from causes.",
        full: "Named after Vilfredo Pareto, this principle states that roughly 80% of consequences come from 20% of causes. It's used widely in business, software optimization, and time management.",
        bridge: { title: "Zipf's Law", domain: "Linguistics", text: "The Pareto distribution is a cousin to Zipf's Law, which describes how common words are used in any language." }
    },
    {
        id: 7, title: "Dunning-Kruger Effect", tag: "Psychology", domain: "Human Perception",
        preview: "Cognitive bias where people with low ability overrate their competence.",
        full: "Discovered by social psychologists David Dunning and Justin Kruger, this bias involves people with limited knowledge in a domain overestimating their skills, while experts often underestimate theirs.",
        bridge: { title: "Socratic Paradox", domain: "Philosophy", text: "The antidote to Dunning-Kruger is the Socratic wisdom: 'I know that I know nothing.'" }
    },
    {
        id: 8, title: "Schrödinger's Cat", tag: "Physics", domain: "Quantum Mechanics",
        preview: "A thought experiment about quantum superposition.",
        full: "Erwin Schrödinger proposed this to illustrate the 'absurdity' of the Copenhagen interpretation of quantum mechanics, where a cat in a box could be both alive and dead until observed.",
        bridge: { title: "Observer Effect", domain: "Philosophy", text: "This physics thought experiment mirrors the philosophical question of whether reality exists independent of an observer." }
    },
    {
        id: 9, title: "Ship of Theseus", tag: "Philosophy", domain: "Logics",
        preview: "If every part of a ship is replaced, is it still the same ship?",
        full: "This thought experiment asks whether an object that has had all of its components replaced remains fundamentally the same object.",
        bridge: { title: "Biological Cell Turnover", domain: "Biology", text: "Your body replaces most of its cells every 7-10 years. Are you the same person you were a decade ago?" }
    },
    {
        id: 10, title: "Deadlock", tag: "Computing", domain: "Systems Science",
        preview: "A state where two actions each wait for the other to finish.",
        full: "In computing, a deadlock happens when two or more processes are each waiting for the other to release a resource, leading to a permanent halt.",
        bridge: { title: "Mexican Standoff", domain: "Cinematography", text: "Deadlock is the digital version of a Mexican Standoff, a common trope in Western films." }
    }
];

class IgnisApp {
    constructor() {
        this.allSparks = KNOWLEDGE_POOL;
        this.visibleSparkCount = 4;
        this.learnedIds = this.getSavedProgress();
        this.lastLearnedDomain = localStorage.getItem('ignis_last_domain') || null;
        this.currentSpark = null;
        this.isAiThinking = false;

        // Cache DOM Elements
        this.items = {
            grid: document.getElementById('spark-grid'),
            overlay: document.getElementById('detail-overlay'),
            modalContent: document.getElementById('modal-content'),
            chatMessages: document.getElementById('chat-messages'),
            chatInput: document.getElementById('chat-input'),
            sendBtn: document.getElementById('send-chat'),
            learnedBtn: document.getElementById('mark-learned-btn'),
            closeBtn: document.getElementById('close-modal'),
            learnedCountDisplay: document.getElementById('learned-count'),
            loadingTrigger: document.getElementById('loading-trigger')
        };

        this.init();
    }

    getSavedProgress() {
        try {
            return JSON.parse(localStorage.getItem('ignis_learned') || '[]');
        } catch (e) {
            return [];
        }
    }

    init() {
        this.renderSparks();
        this.updateStats();
        this.bindEvents();
    }

    updateStats() {
        this.items.learnedCountDisplay.textContent = this.learnedIds.length;
    }

    renderSparks() {
        this.items.grid.innerHTML = '';

        // Filter out learned items
        const unlearnedSparks = this.allSparks.filter(spark => !this.learnedIds.includes(spark.id));

        // Anti-Silo Entropy Sorting: 
        // 1. Prioritize sparks NOT from the last learned domain
        // 2. Randomize the selection to avoid deterministic patterns
        const sortedSparks = unlearnedSparks.sort((a, b) => {
            if (a.domain === this.lastLearnedDomain && b.domain !== this.lastLearnedDomain) return 1;
            if (a.domain !== this.lastLearnedDomain && b.domain === this.lastLearnedDomain) return -1;
            return Math.random() - 0.5;
        });

        const displaySparks = sortedSparks.slice(0, this.visibleSparkCount);

        if (displaySparks.length === 0 && unlearnedSparks.length === 0) {
            this.items.grid.innerHTML = '<div class="info-msg">Your quest for now is complete. Fresh knowledge awaits in the coming days.</div>';
            return;
        }

        displaySparks.forEach((spark) => {
            const card = document.createElement('div');
            card.className = 'spark-card';
            card.innerHTML = `
                <div class="spark-tag">${spark.tag}</div>
                <h3 class="spark-title">${spark.title}</h3>
                <p class="spark-preview">${spark.preview}</p>
                <div class="spark-domain-label">${spark.domain}</div>
            `;
            card.addEventListener('click', () => this.showDetail(spark));
            this.items.grid.appendChild(card);
        });
    }

    showDetail(spark) {
        this.currentSpark = spark;

        let bridgeHtml = "";
        if (spark.bridge) {
            bridgeHtml = `
                <div class="bridge-card">
                    <h4>Cross-Domain Bridge</h4>
                    <p><strong>Connection to ${spark.bridge.domain}:</strong> ${spark.bridge.text}</p>
                    <div class="bridge-tag">${spark.bridge.title}</div>
                </div>
            `;
        }

        this.items.modalContent.innerHTML = `
            <div class="spark-tag">${spark.tag}</div>
            <h2>${spark.title}</h2>
            <p>${spark.full}</p>
            ${bridgeHtml}
        `;

        // Initial AI prompt
        this.items.chatMessages.innerHTML = `
            <div class="msg ai">Hello! I'm your knowledge guide. I can help you dive deeper into <strong>${spark.title}</strong>. What specific part interests you?</div>
        `;

        const isLearned = this.learnedIds.includes(spark.id);
        this.items.learnedBtn.textContent = isLearned ? '✓ Learned' : 'Mark as Learned';
        this.items.learnedBtn.disabled = isLearned;

        this.items.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Auto-focus input
        setTimeout(() => this.items.chatInput.focus(), 300);
    }

    addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `msg ${sender}`;
        msg.textContent = text;
        this.items.chatMessages.appendChild(msg);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.items.chatMessages.scrollTop = this.items.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing';
        indicator.id = 'ai-typing';
        indicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        this.items.chatMessages.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('ai-typing');
        if (indicator) indicator.remove();
    }

    simulateAIResponse(userText) {
        if (this.isAiThinking) return;
        this.isAiThinking = true;

        this.showTypingIndicator();

        // Track session history for the current spark
        if (!this.currentSpark.sessionHistory) this.currentSpark.sessionHistory = [];

        setTimeout(() => {
            this.hideTypingIndicator();
            const prompt = userText.toLowerCase();
            let response = "";

            const pools = {
                why: [
                    `The reason behind ${this.currentSpark.title} lies in its fundamental ${this.currentSpark.tag} roots. It's often driven by specific environmental or psychological triggers.`,
                    `Many researchers believe that ${this.currentSpark.title} occurs because of complex interactions within the ${this.currentSpark.tag} domain.`,
                    `That's a deep dive! Essentially, ${this.currentSpark.title} is a response to the need for system equilibrium in ${this.currentSpark.tag}.`
                ],
                example: [
                    `Consider a scenario in modern ${this.currentSpark.tag}. You'll see ${this.currentSpark.title} perfectly illustrated when new data points challenge existing models.`,
                    `A classic real-world example of ${this.currentSpark.title} is often cited in recent academic papers. It shows the ripple effect of this concept.`,
                    `Think of it like this: if ${this.currentSpark.title} were a tool, it would be the one used to bridge the gap between theory and practice in ${this.currentSpark.tag}.`
                ],
                general: [
                    `I see your point about ${this.currentSpark.title}. It's a cornerstone of modern ${this.currentSpark.tag} thinking.`,
                    `That's an interesting way to frame it! ${this.currentSpark.title} often reveals more about ${this.currentSpark.tag} than we initially expect.`,
                    `Let's look at this from another angle. ${this.currentSpark.title} isn't just a static concept; it's dynamic and evolving.`,
                    `Precisely! Adding to that, ${this.currentSpark.title} has some very unique properties when studied closely.`
                ]
            };

            let intent = 'general';
            if (prompt.includes('why') || prompt.includes('为什么') || prompt.includes('如何') || prompt.includes('how')) intent = 'why';
            else if (prompt.includes('example') || prompt.includes('例子') || prompt.includes('举例')) intent = 'example';

            let available = pools[intent].filter(r => !this.currentSpark.sessionHistory.includes(r));
            if (available.length === 0) {
                available = pools[intent];
                this.currentSpark.sessionHistory = [];
            }

            response = available[Math.floor(Math.random() * available.length)];
            this.currentSpark.sessionHistory.push(response);

            this.addMessage(response, 'ai');
            this.isAiThinking = false;
        }, 1200 + Math.random() * 800);
    }

    handleSendMessage() {
        const text = this.items.chatInput.value.trim();
        if (text && !this.isAiThinking) {
            this.addMessage(text, 'user');
            this.items.chatInput.value = '';
            this.simulateAIResponse(text);
        }
    }

    markAsLearned() {
        if (!this.currentSpark || this.learnedIds.includes(this.currentSpark.id)) return;

        this.learnedIds.push(this.currentSpark.id);
        this.lastLearnedDomain = this.currentSpark.domain;

        localStorage.setItem('ignis_learned', JSON.stringify(this.learnedIds));
        localStorage.setItem('ignis_last_domain', this.lastLearnedDomain);

        this.updateStats();
        this.items.learnedBtn.textContent = '✓ Learned';
        this.items.learnedBtn.disabled = true;

        // Give visual feedback before closing or updating
        setTimeout(() => {
            this.closeModal();
            this.renderSparks();
        }, 300);
    }

    closeModal() {
        this.items.overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentSpark = null;
    }

    bindEvents() {
        // Close buttons
        this.items.closeBtn.addEventListener('click', () => this.closeModal());
        this.items.overlay.addEventListener('click', (e) => {
            if (e.target === this.items.overlay) this.closeModal();
        });

        // Chat actions
        this.items.sendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSendMessage();
        });

        this.items.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Progression
        this.items.learnedBtn.addEventListener('click', () => this.markAsLearned());

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    window.ignisApp = new IgnisApp();
});
