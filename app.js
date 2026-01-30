/**
 * Ignis Platform Logic (v2.1)
 * Enhanced Event Handling & Discussion Flow
 */

class IgnisApp {
    constructor() {
        this.allSparks = [];
        this.visibleSparkCount = 4;
        this.learnedIds = this.getSavedProgress();
        this.lastLearnedDomain = localStorage.getItem('ignis_last_domain') || null;
        this.currentSpark = null;
        this.isAiThinking = false;
        this.currentView = 'discovery'; // 'discovery' or 'recall'
        this.currentLang = localStorage.getItem('ignis_lang') || 'en'; // 'en' or 'zh'
        this.syncState = {
            token: localStorage.getItem('ignis_gh_token') || '',
            gistId: localStorage.getItem('ignis_gist_id') || '',
            isSyncing: false
        };

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
            loadingTrigger: document.getElementById('loading-trigger'),
            navDiscovery: document.getElementById('nav-discovery'),
            navRecall: document.getElementById('nav-recall'),
            heroTitle: document.getElementById('hero-title'),
            heroSubtitle: document.getElementById('hero-subtitle'),
            langToggle: document.getElementById('lang-toggle'),
            // Settings items
            settingsBtn: document.getElementById('settings-btn'),
            settingsOverlay: document.getElementById('settings-overlay'),
            closeSettings: document.getElementById('close-settings'),
            ghTokenInput: document.getElementById('github-token'),
            saveTokenBtn: document.getElementById('save-token'),
            smartGenerateBtn: document.getElementById('smart-generate-btn'),
            disconnectBtn: document.getElementById('disconnect-github'),
            syncSetup: document.getElementById('sync-setup'),
            syncActive: document.getElementById('sync-active'),
            settingsTitle: document.getElementById('settings-title'),
            settingsDesc: document.getElementById('settings-desc'),
            syncStatusText: document.getElementById('sync-status-text')
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

    async loadLibrary() {
        try {
            const response = await fetch('data/sparks.json');
            this.allSparks = await response.json();
            if (this.currentLang === 'en') console.log(`Library loaded: ${this.allSparks.length} sparks discovered.`);
        } catch (e) {
            console.error("Critical: Failed to load knowledge library.", e);
        }
    }

    async init() {
        await this.loadLibrary();
        this.updateStaticTexts();
        this.renderSparks();
        this.updateStats();
        this.bindEvents();
    }

    updateStats() {
        if (this.items.learnedCountDisplay) {
            this.items.learnedCountDisplay.textContent = this.learnedIds.length;
        }
    }

    switchView(view) {
        this.currentView = view;
        this.items.navDiscovery.classList.toggle('active', view === 'discovery');
        this.items.navRecall.classList.toggle('active', view === 'recall');
        this.updateStaticTexts();
        this.renderSparks();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('ignis_lang', this.currentLang);
        this.updateStaticTexts();
        this.renderSparks();
    }

    updateStaticTexts() {
        const t = {
            discovery: { en: "Discovery", zh: "探索新知" },
            recall: { en: "Recall", zh: "知识回顾" },
            learned: { en: "Learned", zh: "已学" },
            discoverySubtitle: { en: "Scholarly Pursuits", zh: "学术探索" },
            recallSubtitle: { en: "Inner Reflections", zh: "内心感悟" },
            discoveryHero: { en: 'Your journey of <span class="accent-text">infinite discovery</span>.', zh: '你的<span class="accent-text">无限探索</span>之旅。' },
            recallHero: { en: 'Rekindle the <span class="accent-text">sparks of wisdom</span>.', zh: '重燃<span class="accent-text">智慧的火花</span>。' },
            completeMsg: { en: "Your quest for now is complete. Fresh knowledge awaits in the coming days.", zh: "你目前的探索已完成。新的知识正在酝酿中。" },
            emptyRecall: { en: "You haven't learned any sparks yet. Start your discovery first!", zh: "你还没有学习任何火花。先去探索新知识吧！" },
            markLearned: { en: "Mark as Learned", zh: "标记为已学" },
            alreadyLearned: { en: "✓ Learned", zh: "✓ 已学习" },
            settingsTitle: { en: "Cloud Sync", zh: "云端同步" },
            settingsDesc: { en: "Keep your progress across devices via GitHub.", zh: "使用 GitHub 在不同设备间同步你的学习进度。" },
            smartGenerateBtn: { en: "Smart Generate Token", zh: "极速生成 Token" },
            saveTokenBtn: { en: "Save & Connect", zh: "保存并连接" },
            statusNotConnected: { en: "Not connected to cloud.", zh: "尚未连接云端。" }
        };

        this.items.navDiscovery.textContent = t.discovery[this.currentLang];
        this.items.navRecall.textContent = t.recall[this.currentLang];
        this.items.heroSubtitle.textContent = this.currentView === 'discovery' ? t.discoverySubtitle[this.currentLang] : t.recallSubtitle[this.currentLang];
        this.items.heroTitle.innerHTML = this.currentView === 'discovery' ? t.discoveryHero[this.currentLang] : t.recallHero[this.currentLang];
        this.items.settingsTitle.textContent = t.settingsTitle[this.currentLang];
        this.items.settingsDesc.textContent = t.settingsDesc[this.currentLang];
        this.items.smartGenerateBtn.textContent = t.smartGenerateBtn[this.currentLang];
        this.items.saveTokenBtn.textContent = t.saveTokenBtn[this.currentLang];
        this.items.syncStatusText.textContent = t.statusNotConnected[this.currentLang];

        const learnedSpan = this.items.learnedCountDisplay.nextSibling;
        if (learnedSpan) learnedSpan.textContent = ` ${t.learned[this.currentLang]}`;

        this.updateSyncUI();
    }

    updateSyncUI() {
        const isConnected = !!this.syncState.token;
        this.items.syncSetup.classList.toggle('hidden', isConnected);
        this.items.syncActive.classList.toggle('hidden', !isConnected);
    }

    // Cloud Sync Logic - Smart Token Flow
    handleSaveToken() {
        const token = this.items.ghTokenInput.value.trim();
        if (!token) {
            alert(this.currentLang === 'en' ? "Please paste a valid token." : "请输入有效的 Token。");
            return;
        }

        this.syncState.token = token;
        localStorage.setItem('ignis_gh_token', token);
        this.syncProgress('pull'); // Attempt to find existing gist and pull data
    }

    async syncProgress(direction = 'push') {
        if (!this.syncState.token) return;

        const fileName = 'ignis_data.json';
        const headers = {
            'Authorization': `token ${this.syncState.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        try {
            this.syncState.isSyncing = true;
            // 1. Auto-Discovery
            if (!this.syncState.gistId) {
                const listResp = await fetch('https://api.github.com/gists', { headers });
                const gists = await listResp.json();
                if (Array.isArray(gists)) {
                    const existing = gists.find(g => g.files[fileName]);
                    if (existing) {
                        this.syncState.gistId = existing.id;
                        localStorage.setItem('ignis_gist_id', this.syncState.gistId);
                        direction = 'pull';
                    }
                }
            }

            const url = `https://api.github.com/gists${this.syncState.gistId ? '/' + this.syncState.gistId : ''}`;
            const method = this.syncState.gistId ? 'PATCH' : 'POST';

            if (direction === 'pull' && this.syncState.gistId) {
                const response = await fetch(url, { headers });
                const gist = await response.json();
                if (gist.files && gist.files[fileName]) {
                    const remoteData = JSON.parse(gist.files[fileName].content);
                    this.learnedIds = remoteData.learnedIds || [];
                    this.lastLearnedDomain = remoteData.lastDomain || null;
                    localStorage.setItem('ignis_learned', JSON.stringify(this.learnedIds));
                    this.updateStats();
                    this.updateSyncUI();
                    this.renderSparks();
                    if (this.currentLang === 'en') console.log("Cloud sync: Data pulled successfully.");
                }
            } else {
                const body = {
                    description: "Ignis Knowledge Platform Sync Data",
                    public: false,
                    files: {
                        [fileName]: {
                            content: JSON.stringify({
                                learnedIds: this.learnedIds,
                                lastDomain: this.lastLearnedDomain,
                                lang: this.currentLang
                            })
                        }
                    }
                };
                const resp = await fetch(url, { method, headers, body: JSON.stringify(body) });
                const gist = await resp.json();
                if (gist.id) {
                    this.syncState.gistId = gist.id;
                    localStorage.setItem('ignis_gist_id', gist.id);
                    this.updateSyncUI();
                }
            }
        } catch (e) {
            console.error("Sync error:", e);
            if (e.message.includes("401")) {
                alert(this.currentLang === 'en' ? "Invalid Token. Please reconnect." : "Token 无效，请重新连接。");
                this.disconnect();
            }
            this.syncState.isSyncing = false;
            this.updateSyncUI();
        } finally {
            this.syncState.isSyncing = false;
            this.updateSyncUI();
        }
    }

    renderSparks() {
        this.items.grid.innerHTML = '';

        let sparksToShow = [];
        if (this.currentView === 'discovery') {
            const unlearnedSparks = this.allSparks.filter(spark => !this.learnedIds.includes(spark.id));
            sparksToShow = unlearnedSparks.sort((a, b) => {
                if (a.domain.en === this.lastLearnedDomain && b.domain.en !== this.lastLearnedDomain) return 1;
                if (a.domain.en !== this.lastLearnedDomain && b.domain.en === this.lastLearnedDomain) return -1;
                return Math.random() - 0.5;
            }).slice(0, this.visibleSparkCount);

            if (sparksToShow.length === 0 && unlearnedSparks.length === 0) {
                const msg = this.currentLang === 'en' ? "Your quest for now is complete. Fresh knowledge awaits in the coming days." : "你目前的探索已完成。新的知识正在酝酿中。";
                this.items.grid.innerHTML = `<div class="info-msg">${msg}</div>`;
                return;
            }
        } else {
            // Recall view: all learned items
            sparksToShow = this.allSparks.filter(spark => this.learnedIds.includes(spark.id));
            if (sparksToShow.length === 0) {
                const msg = this.currentLang === 'en' ? "You haven't learned any sparks yet. Start your discovery first!" : "你还没有学习任何火花。先去探索新知识吧！";
                this.items.grid.innerHTML = `<div class="info-msg">${msg}</div>`;
                return;
            }
        }

        sparksToShow.forEach((spark) => {
            const card = document.createElement('div');
            card.className = 'spark-card';
            const l = this.currentLang;
            card.innerHTML = `
                <div class="spark-tag">${spark.tag[l]}</div>
                <h3 class="spark-title">${spark.title[l]}</h3>
                <p class="spark-preview">${spark.preview[l]}</p>
                <div class="spark-domain-label">${spark.domain[l]}</div>
            `;
            card.addEventListener('click', () => this.showDetail(spark));
            this.items.grid.appendChild(card);
        });
    }

    showDetail(spark) {
        this.currentSpark = spark;

        const l = this.currentLang;
        let bridgeHtml = "";
        if (spark.bridge) {
            bridgeHtml = `
                <div class="bridge-card">
                    <h4>${l === 'en' ? 'Cross-Domain Bridge' : '跨域关联'}</h4>
                    <p><strong>${l === 'en' ? 'Connection to' : '关联领域'} ${spark.bridge.domain[l]}:</strong> ${spark.bridge.text[l]}</p>
                    <div class="bridge-tag">${spark.bridge.title[l]}</div>
                </div>
            `;
        }

        this.items.modalContent.innerHTML = `
            <div class="spark-tag">${spark.tag[l]}</div>
            <h2>${spark.title[l]}</h2>
            <p>${spark.full[l]}</p>
            ${bridgeHtml}
        `;

        const isLearned = this.learnedIds.includes(spark.id);
        const prompts = {
            recall: {
                en: `Welcome back to <strong>${spark.title[l]}</strong>! It's great to revisit this. Has your perspective on this changed, or would you like to explore deeper layers?`,
                zh: `欢迎回到 **${spark.title[l]}**！很高兴能和你再次探讨这个话题。你现在的视角是否有了一些变化，还是想探索更深层的内容？`
            },
            discovery: {
                en: `Hello! I'm your knowledge guide. I can help you dive deeper into <strong>${spark.title[l]}</strong>. What specific part interests you?`,
                zh: `你好！我是你的知识向导。我可以帮你更深入地了解 **${spark.title[l]}**。你对哪一部分最感兴趣？`
            }
        };

        this.items.chatMessages.innerHTML = `
            <div class="msg ai">${isLearned ? prompts.recall[l] : prompts.discovery[l]}</div>
        `;

        const labels = {
            mark: { en: "Mark as Learned", zh: "标记为已学" },
            done: { en: "✓ Learned", zh: "✓ 已学习" }
        };

        this.items.learnedBtn.textContent = isLearned ? labels.done[l] : labels.mark[l];
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
        const l = this.currentLang;
        const tag = this.currentSpark.tag[l];
        const title = this.currentSpark.title[l];

        // Track session history for the current spark
        if (!this.currentSpark.sessionHistory) this.currentSpark.sessionHistory = [];

        setTimeout(() => {
            this.hideTypingIndicator();
            const prompt = userText.toLowerCase();
            let response = "";

            const pools = {
                why: {
                    en: [
                        `The reason behind ${title} lies in its fundamental ${tag} roots. It's often driven by specific environmental or psychological triggers.`,
                        `Many researchers believe that ${title} occurs because of complex interactions within the ${tag} domain.`,
                        `That's a deep dive! Essentially, ${title} is a response to the need for system equilibrium in ${tag}.`
                    ],
                    zh: [
                        `${title} 背后的原因在于其基本的 ${tag} 根源。它通常是由特定的环境或心理触发因素驱动的。`,
                        `许多研究人员认为，${title} 的发生是由于 ${tag} 领域内复杂的相互作用。`,
                        `这是一个很深的主题！本质上，${title} 是对 ${tag} 系统平衡需求的一种响应。`
                    ]
                },
                example: {
                    en: [
                        `Consider a scenario in modern ${tag}. You'll see ${title} perfectly illustrated when new data points challenge existing models.`,
                        `A classic real-world example of ${title} is often cited in recent academic papers. It shows the ripple effect of this concept.`,
                        `Think of it like this: if ${title} were a tool, it would be the one used to bridge the gap between theory and practice in ${tag}.`
                    ],
                    zh: [
                        `想象一下现代 ${tag} 中的一个场景。当新的数据挑战现有模型时，你会看到 ${title} 被完美地诠释。`,
                        `在最近的学术论文中经常引用 ${title} 的经典现实案例。它展示了这一概念的涟漪效应。`,
                        `你可以这样想：如果 ${title} 是一件工具，它就是用来弥合 ${tag} 理论与实践之间鸿沟的那一件。`
                    ]
                },
                general: {
                    en: [
                        `I see your point about ${title}. It's a cornerstone of modern ${tag} thinking.`,
                        `That's an interesting way to frame it! ${title} often reveals more about ${tag} than we initially expect.`,
                        `Let's look at this from another angle. ${title} isn't just a static concept; it's dynamic and evolving.`,
                        `Precisely! Adding to that, ${title} has some very unique properties when studied closely.`
                    ],
                    zh: [
                        `我明白关于 ${title} 的观点了。它是现代 ${tag} 思维的一个基石。`,
                        `这个切入点很有意思！${title} 揭露的关于 ${tag} 的信息往往比我们最初预想的要多。`,
                        `让我们从另一个角度来看。${title} 不仅仅是一个静态的概念；它是动态且不断演进的。`,
                        `正是如此！此外，仔细研究的话，${title} 具有一些非常独特的属性。`
                    ]
                }
            };

            let intent = 'general';
            if (prompt.includes('why') || prompt.includes('为什么') || prompt.includes('如何') || prompt.includes('how')) intent = 'why';
            else if (prompt.includes('example') || prompt.includes('例子') || prompt.includes('举例')) intent = 'example';

            let available = pools[intent][l].filter(r => !this.currentSpark.sessionHistory.includes(r));
            if (available.length === 0) {
                available = pools[intent][l];
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
        this.lastLearnedDomain = this.currentSpark.domain.en;

        localStorage.setItem('ignis_learned', JSON.stringify(this.learnedIds));
        localStorage.setItem('ignis_last_domain', this.lastLearnedDomain);

        this.updateStats();

        const labels = {
            done: { en: "✓ Learned", zh: "✓ 已学习" }
        };
        this.items.learnedBtn.textContent = labels.done[this.currentLang];
        this.items.learnedBtn.disabled = true;

        // Auto-sync if token exists
        if (this.syncState.token) this.syncProgress('push');

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

    openSettings() {
        this.updateSyncUI();
        this.items.settingsOverlay.classList.remove('hidden');
    }

    closeSettings() {
        this.items.settingsOverlay.classList.add('hidden');
    }

    disconnect() {
        if (confirm(this.currentLang === 'en' ? "Disconnect from GitHub?" : "断开与 GitHub 的连接？")) {
            this.syncState.token = '';
            this.syncState.gistId = '';
            localStorage.removeItem('ignis_gh_token');
            localStorage.removeItem('ignis_gist_id');
            this.updateSyncUI();
        }
    }

    bindEvents() {
        // Settings
        this.items.settingsBtn.addEventListener('click', () => this.openSettings());
        this.items.closeSettings.addEventListener('click', () => this.closeSettings());
        this.items.saveTokenBtn.addEventListener('click', () => this.handleSaveToken());
        this.items.disconnectBtn.addEventListener('click', () => this.disconnect());
        this.items.settingsOverlay.addEventListener('click', (e) => {
            if (e.target === this.items.settingsOverlay) this.closeSettings();
        });

        // Language switching
        this.items.langToggle.addEventListener('click', () => this.toggleLanguage());

        // Nav switching
        this.items.navDiscovery.addEventListener('click', () => this.switchView('discovery'));
        this.items.navRecall.addEventListener('click', () => this.switchView('recall'));

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
