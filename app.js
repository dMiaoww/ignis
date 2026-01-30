/**
 * Ignis Platform Logic (v2.1)
 * Enhanced Event Handling & Discussion Flow
 */

const KNOWLEDGE_POOL = [
    {
        id: 1,
        title: { en: "The Ochre Effect", zh: "赭石效应" },
        tag: { en: "Psychology", zh: "心理学" },
        domain: { en: "Human Perception", zh: "人类感知" },
        preview: { en: "Perception of neutral tones in natural vs synthetic light.", zh: "自然光与人造光下中性色调的感知差异。" },
        full: { en: "The Ochre Effect refers to a phenomenon in color psychology where the human brain adjusts its white balance based on the ambient color temperature. In natural sunlight, our eyes are primed for the full spectrum, making earthy tones appear more vibrant.", zh: "赭石效应是指色彩心理学中的一种现象，即人脑会根据环境色温自动调整白平衡。在自然光下，我们的眼睛对全光谱更为敏感，这使得大地色调显得更加鲜艳。" },
        bridge: { title: { en: "Kelvin Scale", zh: "开尔文温标" }, domain: { en: "Physics", zh: "物理学" }, text: { en: "While Ochre is about perception, the Kelvin scale is the cold physical measurement of that same light temperature.", zh: "虽然赭石效应关乎感知，但开尔文温标则是对同一光温的物理精确测量。" } }
    },
    {
        id: 2,
        title: { en: "Kessler Syndrome", zh: "凯斯勒现象" },
        tag: { en: "Astronautics", zh: "航天学" },
        domain: { en: "Systems Science", zh: "系统科学" },
        preview: { en: "A cascade of space debris in low Earth orbit.", zh: "近地轨道上太空垃圾的连锁碰撞反应。" },
        full: { en: "Proposed by NASA scientist Donald J. Kessler in 1978, the Kessler Syndrome suggests that a single collision between two large objects could create a cloud of debris that renders orbital shells unusable.", zh: "由美国国家航空航天局（NASA）科学家唐纳德·凯斯勒于1978年提出，该理论认为近地轨道上的物体密度过高时，物体间的撞击会产生更多碎片，形成连锁反应，最终导致轨道空间无法使用。" },
        bridge: { title: { en: "Tragedy of the Commons", zh: "公地悲记" }, domain: { en: "Economics", zh: "经济学" }, text: { en: "Both systems collapse because individual actors over-exploit a shared, finite resource—whether orbits or pastures.", zh: "这两个系统都会因为个体过度开发共享的有限资源（无论是轨道还是牧场）而崩溃。" } }
    },
    {
        id: 3,
        title: { en: "Zeno's Paradox", zh: "芝诺悖论" },
        tag: { en: "Philosophy", zh: "哲学" },
        domain: { en: "Logics", zh: "逻辑学" },
        preview: { en: "The ancient Greek argument that motion is impossible.", zh: "古希腊关于“运动是不可能的”论证。" },
        full: { en: "Zeno of Elea proposed several paradoxes to support the idea that the world is monolithic and unchanging. The most famous is 'Achilles and the Tortoise', which calculus later resolved.", zh: "爱利亚的芝诺提出了数个悖论来支持世界是单一且永恒不变的观点。其中最著名的是“阿基里斯追乌龟”，后来被微积分理论所化解。" },
        bridge: { title: { en: "Planck Length", zh: "普朗克长度" }, domain: { en: "Quantum Physics", zh: "量子物理" }, text: { en: "Zeno assumed space is infinitely divisible; quantum physics suggests there might be a 'smallest' possible unit of space.", zh: "芝诺假设空间是无限可分的；而量子物理学则认为空间可能存在一个“最小”的基本单位。" } }
    },
    {
        id: 4,
        title: { en: "Lindy Effect", zh: "林迪效应" },
        tag: { en: "Statistics", zh: "统计学" },
        domain: { en: "Probability", zh: "概率论" },
        preview: { en: "Non-perishable items' life expectancy increases with age.", zh: "非易损物品的预期寿命随其已存在时间的增长而增长。" },
        full: { en: "The Lindy Effect suggests that for things like ideas, books, or technologies, every additional day of survival implies a longer remaining life. If a book has been in print for 50 years, it is likely to be for another 50.", zh: "林迪效应认为，对于思想、书籍或技术等非物质事物，它们每多生存一天，其剩余的预期寿命就会变长。如果一本书已经出版了50年，它很可能还会再流行50年。" },
        bridge: { title: { en: "Antifragility", zh: "反脆弱性" }, domain: { en: "Risk Mgmt", zh: "风险管理" }, text: { en: "Systems that follow the Lindy Effect are often antifragile—they actually benefit from time and stressors.", zh: "遵循林迪效应的系统通常具有反脆弱性——它们实际上能从时间和压力中获益。" } }
    },
    {
        id: 5,
        title: { en: "Blue Zones", zh: "蓝色地带" },
        tag: { en: "Health", zh: "健康" },
        domain: { en: "Sociology", zh: "社会学" },
        preview: { en: "Regions of the world where people live much longer than average.", zh: "世界上人们的寿命显著高于平均水平的地区。" },
        full: { en: "Blue Zones are geographic areas where people live significantly longer lives, often reaching age 100. Factors include plant-based diets, constant moderate physical activity, and strong social connections.", zh: "蓝色地带是指那些居民寿命极长、经常能活到100岁以上的地理区域。其长寿因素包括植物性饮食、规律的适度体力活动以及紧密的社会联系。" },
        bridge: { title: { en: "Social Capital", zh: "社会资本" }, domain: { en: "Economics", zh: "经济学" }, text: { en: "Longevity in Blue Zones isn't just biological; it's a form of social capital where community ties provide safety nets.", zh: "蓝色地带的长寿并非纯粹的生物学现象，它也是一种社会资本，社区纽带为居民提供了安全网。" } }
    },
    {
        id: 6,
        title: { en: "Pareto Principle", zh: "帕累托法则" },
        tag: { en: "Economics", zh: "经济学" },
        domain: { en: "Systems Science", zh: "系统科学" },
        preview: { en: "The 80/20 rule of effects originating from causes.", zh: "关于“投入与产出”不平衡的80/20法则。" },
        full: { en: "Named after Vilfredo Pareto, this principle states that roughly 80% of consequences come from 20% of causes. It's used widely in business, software optimization, and time management.", zh: "以维弗雷多·帕累托命名，该法则指出，在许多事件中，约80%的结果源自20%的原因。它广泛应用于商业管理、软件优化和时间管理等领域。" },
        bridge: { title: { en: "Zipf's Law", zh: "齐普夫定律" }, domain: { en: "Linguistics", zh: "语言学" }, text: { en: "The Pareto distribution is a cousin to Zipf's Law, which describes how common words are used in any language.", zh: "帕累托分布是齐普夫定律的近亲，后者描述了语言中常用词汇的使用频率分布情况。" } }
    },
    {
        id: 7,
        title: { en: "Dunning-Kruger Effect", zh: "达克效应" },
        tag: { en: "Psychology", zh: "心理学" },
        domain: { en: "Human Perception", zh: "人类感知" },
        preview: { en: "Cognitive bias where people with low ability overrate their competence.", zh: "能力不足的人往往会过度高估自己水平的认知偏差。" },
        full: { en: "Discovered by social psychologists David Dunning and Justin Kruger, this bias involves people with limited knowledge in a domain overestimating their skills, while experts often underestimate theirs.", zh: "由社会心理学家大卫·邓宁和贾斯汀·克鲁格发现。这种偏差表现为，在某一领域知识匮乏的人往往高估自己的能力，而真正的专家反而容易低估自己。" },
        bridge: { title: { en: "Socratic Paradox", zh: "苏格拉底悖论" }, domain: { en: "Philosophy", zh: "哲学" }, text: { en: "The antidote to Dunning-Kruger is the Socratic wisdom: 'I know that I know nothing.'", zh: "达克效应的解药是苏格拉底式的智慧：“我唯一知道的就是我一无所知。”" } }
    },
    {
        id: 8,
        title: { en: "Schrödinger's Cat", zh: "薛定谔的猫" },
        tag: { en: "Physics", zh: "物理学" },
        domain: { en: "Quantum Mechanics", zh: "量子力学" },
        preview: { en: "A thought experiment about quantum superposition.", zh: "关于量子叠加态的著名理想实验。" },
        full: { en: "Erwin Schrödinger proposed this to illustrate the 'absurdity' of the Copenhagen interpretation of quantum mechanics, where a cat in a box could be both alive and dead until observed.", zh: "埃尔温·薛定谔提出这个实验是为了说明量子力学哥本哈根诠释的“荒谬性”，即在被观察之前，盒子里的猫可以同时处于既死又活的叠加状态。" },
        bridge: { title: { en: "Observer Effect", zh: "观察者效应" }, domain: { en: "Philosophy", zh: "哲学" }, text: { en: "This physics thought experiment mirrors the philosophical question of whether reality exists independent of an observer.", zh: "这个物理思想实验反映了一个哲学问题：现实是否可以独立于观察者而存在？" } }
    },
    {
        id: 9,
        title: { en: "Ship of Theseus", zh: "忒修斯之船" },
        tag: { en: "Philosophy", zh: "哲学" },
        domain: { en: "Logics", zh: "逻辑学" },
        preview: { en: "If every part of a ship is replaced, is it still the same ship?", zh: "如果船的所有零件都被更换了，它还是原来的那艘船吗？" },
        full: { en: "This thought experiment asks whether an object that has had all of its components replaced remains fundamentally the same object.", zh: "这个思想实验探讨的是：如果一个物体所有的组成部分都被逐一替换，它在本质上是否还是原来的那个物体。" },
        bridge: { title: { en: "Biological Cell Turnover", zh: "生物细胞更新" }, domain: { en: "Biology", zh: "生物学" }, text: { en: "Your body replaces most of its cells every 7-10 years. Are you the same person you were a decade ago?", zh: "人体绝大多数细胞每7-10年就会更新一次。那么，你还是十年前的那个你吗？" } }
    },
    {
        id: 10,
        title: { en: "Deadlock", zh: "死锁" },
        tag: { en: "Computing", zh: "计算机科学" },
        domain: { en: "Systems Science", zh: "系统科学" },
        preview: { en: "A state where two actions each wait for the other to finish.", zh: "两个或多个进程因互相等待对方释放资源而陷入的僵局。" },
        full: { en: "In computing, a deadlock happens when two or more processes are each waiting for the other to release a resource, leading to a permanent halt.", zh: "在计算领域，死锁发生在两个或多个进程互相持有了对方需要的资源且都在等待对方释放时，导致系统永久性卡死。" },
        bridge: { title: { en: "Mexican Standoff", zh: "墨西哥对峙" }, domain: { en: "Cinematography", zh: "电影艺术" }, text: { en: "Deadlock is the digital version of a Mexican Standoff, a common trope in Western films.", zh: "死锁堪称“墨西哥对峙”的数字版，后者是西方电影中常见的三个及以上角色互相举枪僵持的桥段。" } }
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
            connectBtn: document.getElementById('connect-github'),
            disconnectBtn: document.getElementById('disconnect-github'),
            syncSetup: document.getElementById('sync-setup'),
            syncActive: document.getElementById('sync-active'),
            deviceDisplay: document.getElementById('device-flow-display'),
            deviceCodeText: document.getElementById('device-code'),
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

    init() {
        this.updateStaticTexts();
        this.renderSparks();
        this.updateStats();
        this.bindEvents();
    }

    updateStats() {
        this.items.learnedCountDisplay.textContent = this.learnedIds.length;
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
            connectBtn: { en: "Connect GitHub", zh: "连接 GitHub" },
            statusNotConnected: { en: "Not connected to cloud.", zh: "尚未连接云端。" }
        };

        this.items.navDiscovery.textContent = t.discovery[this.currentLang];
        this.items.navRecall.textContent = t.recall[this.currentLang];
        this.items.heroSubtitle.textContent = this.currentView === 'discovery' ? t.discoverySubtitle[this.currentLang] : t.recallSubtitle[this.currentLang];
        this.items.heroTitle.innerHTML = this.currentView === 'discovery' ? t.discoveryHero[this.currentLang] : t.recallHero[this.currentLang];
        this.items.settingsTitle.textContent = t.settingsTitle[this.currentLang];
        this.items.settingsDesc.textContent = t.settingsDesc[this.currentLang];
        this.items.connectBtn.textContent = t.connectBtn[this.currentLang];
        this.items.syncStatusText.textContent = t.statusNotConnected[this.currentLang];

        const learnedSpan = this.items.learnedCountDisplay.nextSibling;
        if (learnedSpan) learnedSpan.textContent = ` ${t.learned[this.currentLang]}`;

        this.updateSyncUI();
    }

    updateSyncUI() {
        const isConnected = !!this.syncState.token;
        this.items.syncSetup.classList.toggle('hidden', isConnected);
        this.items.syncActive.classList.toggle('hidden', !isConnected);
        this.items.deviceDisplay.classList.add('hidden');
    }

    // Cloud Sync Logic - GitHub Device Flow
    static CLIENT_ID = 'Ov23li0HPhvVPhA0N9iP'; // Replace with your real Client ID

    async initiateDeviceFlow() {
        this.items.syncSetup.classList.add('hidden');
        this.items.deviceDisplay.classList.remove('hidden');
        this.items.deviceCodeText.textContent = '.... ....';

        try {
            const response = await fetch('https://github.com/login/device/code', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ client_id: IgnisApp.CLIENT_ID, scope: 'gist' })
            });
            const data = await response.json();

            if (data.device_code) {
                this.items.deviceCodeText.textContent = data.user_code;
                this.pollForToken(data.device_code, data.interval);
            }
        } catch (e) {
            console.error("Device flow failed:", e);
            this.updateSyncUI();
            alert(this.currentLang === 'en' ? "Failed to start授权. Try again." : "授权启动失败，请重试。");
        }
    }

    async pollForToken(deviceCode, interval) {
        const poll = async () => {
            try {
                const response = await fetch('https://github.com/login/oauth/access_token', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_id: IgnisApp.CLIENT_ID,
                        device_code: deviceCode,
                        grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
                    })
                });
                const data = await response.json();

                if (data.access_token) {
                    this.syncState.token = data.access_token;
                    localStorage.setItem('ignis_gh_token', data.access_token);
                    this.updateSyncUI();
                    this.syncProgress('pull');
                    return;
                }

                if (data.error === 'authorization_pending') {
                    setTimeout(poll, (interval || 5) * 1000);
                } else {
                    this.updateSyncUI(); // Reset if timeout or other error
                }
            } catch (e) {
                this.updateSyncUI();
            }
        };
        poll();
    }

    async syncProgress(direction = 'push') {
        if (!this.syncState.token) return;

        const fileName = 'ignis_data.json';
        const headers = { 'Authorization': `token ${this.syncState.token}`, 'Accept': 'application/vnd.github.v3+json' };

        try {
            if (!this.syncState.gistId) {
                const listResp = await fetch('https://api.github.com/gists', { headers });
                const gists = await listResp.json();
                const existing = (gists && gists.find) ? gists.find(g => g.files[fileName]) : null;
                if (existing) {
                    this.syncState.gistId = existing.id;
                    localStorage.setItem('ignis_gist_id', this.syncState.gistId);
                    direction = 'pull';
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
                    this.renderSparks();
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
                }
            }
        } catch (e) { console.error("Sync error:", e); }
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
        this.items.connectBtn.addEventListener('click', () => this.initiateDeviceFlow());
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
