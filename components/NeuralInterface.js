'use client';
import { useEffect } from 'react';

export default function NeuralInterface() {
    useEffect(() => {
        // Track every async handle so we can tear them down on unmount.
        const timeouts = new Set();
        const intervals = new Set();
        let rafId = null;
        let destroyed = false;

        const safeTimeout = (fn, delay) => {
            const id = setTimeout(() => {
                timeouts.delete(id);
                if (!destroyed) fn();
            }, delay);
            timeouts.add(id);
            return id;
        };
        const safeInterval = (fn, delay) => {
            const id = setInterval(() => {
                if (destroyed) {
                    clearInterval(id);
                    intervals.delete(id);
                    return;
                }
                fn();
            }, delay);
            intervals.add(id);
            return id;
        };

        // --- AUDIO ENGINE (SFX) ---
        const SfxSys = {
            ctx: null,
            init: function () {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
            },
            playTone: function (freq, type, duration, vol = 0.1) {
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(vol, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            },
            hover: function () { this.playTone(800, 'sine', 0.1, 0.02); },
            click: function () { this.playTone(1200, 'square', 0.1, 0.05); },
            alarm: function () {
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(600, this.ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.5);
                osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 1.0);
                gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 10); // Alarm duration
            }
        };

        // --- MAIN AUDIO PLAYER LOGIC ---
        const bgAudio = document.getElementById('bg-audio');
        let audioSpeeds = [1.0, 1.5, 2.0];
        let currentSpeedIdx = 0;

        function toggleAudio() {
            const btn = document.getElementById('btn-play');
            if (bgAudio.paused) {
                const p = bgAudio.play();
                if (p && typeof p.catch === 'function') p.catch(() => {});
                btn.innerText = "❚❚";
                btn.setAttribute('aria-label', 'Pausar audio');
            } else {
                bgAudio.pause();
                btn.innerText = "▶";
                btn.setAttribute('aria-label', 'Reproducir audio');
            }
        }

        function setVolume(val) {
            bgAudio.volume = val;
        }

        function cycleSpeed() {
            currentSpeedIdx = (currentSpeedIdx + 1) % audioSpeeds.length;
            const newSpeed = audioSpeeds[currentSpeedIdx];
            bgAudio.playbackRate = newSpeed;
            document.getElementById('btn-speed').innerText = newSpeed + "x";
        }


        // --- DATABASE (FULL CONTENT) ---
        const db = {
            "PERFIL": {
                title: "RESUMEN PROFESIONAL",
                content: `
            <p style="margin-bottom:15px; font-size:1.1em; color:#fff;">
                AI Engineer con más de 3 años llevando soluciones de Inteligencia Artificial, Machine Learning y Data Analytics a producción sobre Google Cloud Platform.
            </p>
            <p style="margin-bottom:15px;">
                Especializado en <strong>IA Generativa, Agentes de IA, MLOps y NLP</strong>, con impacto demostrado en eficiencia operacional, ventas y calidad de servicio. Magíster en Ciencia de Datos (PUC) y Diplomado en Project Management (UAI).
            </p>
            <p>
                Me caracteriza la comunicación clara con stakeholders técnicos y no técnicos, facilitando la adopción de IA en organizaciones de distintos niveles de madurez digital.
            </p>

        `
            },
            "EXPERIENCIA": {
                title: "TRAYECTORIA LABORAL",
                content: `
            <div class="card">
                <div class="job-header">
                    <div class="job-role">AI Engineer</div>
                    <div class="job-meta">WOM Chile | Feb 2025 – Presente</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Diseñé y desplegué en producción una solución de <strong>Speech Analytics end-to-end en GCP</strong> (Airflow, Gemini, BigQuery ML, Power BI), entregando visibilidad completa sobre la calidad de atención del Call Center y logrando una reducción significativa en el Tiempo Medio de Operación.</li>
                        <li>Co-definí lineamientos técnicos para la implementación gobernada de <strong>Agentes de IA</strong> en entornos Cloud, fortaleciendo estándares de arquitectura, trazabilidad y uso responsable.</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="job-header">
                    <div class="job-role">Data Analyst & Engineer</div>
                    <div class="job-meta">ICB S.A. | Ene 2024 – Feb 2025</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Entrené un modelo predictivo que mejoró sustancialmente la detección de anomalías de stock en camiones de autoventa.</li>
                        <li>Desarrollé y llevé a adopción un <strong>Agente de IA</strong> para apoyo comercial, con impacto positivo y medible en ventas desde su primer mes de uso.</li>
                        <li>Automaticé flujos <strong>MLOps</strong> y pipelines ETL con Docker y CI/CD en Google Cloud, centralizando datos en <strong>BigQuery</strong> para operación analítica escalable.</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="job-header">
                    <div class="job-role">Data Scientist</div>
                    <div class="job-meta">DATA UC – Estudios y Servicios Estadísticos | 2023</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Desarrollé scrapers y pipelines de datos del mercado educativo, integrando resultados con dashboards interactivos para definir estrategias de pricing de programas de posgrado.</li>
                        <li>Entrené modelos predictivos y apliqué técnicas de <strong>IA Generativa</strong> para apoyar decisiones estratégicas en tiempo real.</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="job-header">
                    <div class="job-role">Práctica Profesional – NLP</div>
                    <div class="job-meta">Entel S.A. | 2022</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Desarrollé proyectos de análisis de sentimientos con técnicas de <strong>NLP</strong> para optimizar procesos de atención al cliente.</li>
                    </ul>
                </div>
            </div>
        `
            },
            "DOCENCIA": {
                title: "DOCENCIA Y OTROS",
                content: `
            <div class="card">
                <div class="job-role">Relator e Impulsor de Adopción de IA</div>
                <div class="job-meta">DUOC UC, UAI, ICB, WOM | 2024 – 2026</div>
                <p class="job-desc" style="margin-top:5px;">
                    Expositor en seminarios sobre IA Generativa en instituciones académicas e impulsor de adopción en entornos corporativos, adaptando el mensaje a distintos niveles técnicos y de madurez organizacional.
                </p>
            </div>
            <div class="card">
                <div class="job-role">Instructor – Modelos Predictivos con Python</div>
                <div class="job-meta">Tesorería General de la República | 2023</div>
                <p class="job-desc" style="margin-top:5px;">
                    Instructor del curso de modelos predictivos de riesgo de crédito con Python para funcionarios públicos.
                </p>
            </div>
            <div class="card">
                <div class="job-role">Docencia Universitaria – Analytics & Machine Learning</div>
                <div class="job-meta">Pontificia Universidad Católica de Chile | 2022 – 2024</div>
                <p class="job-desc" style="margin-top:5px;">
                    Docente en cursos de Analytics y Machine Learning con R y Python para estudiantes de pregrado y diplomado.
                </p>
            </div>
        `
            },
            "SKILLS": {
                title: "ARSENAL TÉCNICO",
                content: `
            <h3 class="section-title">LENGUAJES Y HERRAMIENTAS</h3>
            <span class="skill-tag highlight">Python</span>
            <span class="skill-tag highlight">SQL</span>
            <span class="skill-tag">Docker</span>
            <span class="skill-tag">Git</span>
            <span class="skill-tag">Power BI</span>

            <h3 class="section-title">CLOUD & MLOPS</h3>
            <span class="skill-tag highlight">Google Cloud Platform</span>
            <span class="skill-tag highlight">BigQuery</span>
            <span class="skill-tag">Vertex AI</span>
            <span class="skill-tag">Cloud Run</span>
            <span class="skill-tag">Airflow</span>
            <span class="skill-tag">CI/CD</span>

            <h3 class="section-title">IA & MACHINE LEARNING</h3>
            <span class="skill-tag highlight">IA Generativa</span>
            <span class="skill-tag highlight">Agentes de IA</span>
            <span class="skill-tag highlight">RAG</span>
            <span class="skill-tag highlight">LLMs</span>
            <span class="skill-tag">NLP</span>
            <span class="skill-tag">Speech Analytics</span>
            <span class="skill-tag">Fine-Tuning</span>
            <span class="skill-tag">MLOps</span>
            <span class="skill-tag">Deep Learning</span>
            <span class="skill-tag">Machine Learning</span>

            <h3 class="section-title">DATOS</h3>
            <span class="skill-tag">ETL / Data Pipelines</span>
            <span class="skill-tag">Data Warehousing</span>
            <span class="skill-tag">Web Scraping</span>
            <span class="skill-tag">Análisis Estadístico</span>

            <h3 class="section-title">CERTIFICACIONES</h3>
            <ul style="list-style:none; color:#ccc; font-size:0.9em; line-height:1.8;">
                <li>★ Generative AI Engineering, IBM (2025)</li>
                <li>★ RAG and Agentic AI, IBM (2025)</li>
                <li>★ Generative AI for Developers, AWS (2025)</li>
                <li>★ Generative AI Leader, Google Cloud (2025)</li>
            </ul>

            <h3 class="section-title">IDIOMAS</h3>
            <p style="color:#ccc;">Español (nativo) &nbsp;|&nbsp; Inglés B2 – Competencia Profesional</p>
        `
            },
            "EDUCACION": {
                title: "FORMACIÓN ACADÉMICA",
                content: `
            <div class="card" style="border-left-color: var(--neon-cyan);">
                <div class="job-role">Magíster en Ciencia de Datos</div>
                <div class="job-meta">Pontificia Universidad Católica de Chile | 2023 – 2025</div>
            </div>
            <div class="card" style="border-left-color: var(--neon-cyan);">
                <div class="job-role">Diplomado en Project Management</div>
                <div class="job-meta">Universidad Adolfo Ibáñez | 2024</div>
            </div>
            <div class="card" style="border-left-color: var(--neon-cyan);">
                <div class="job-role">Estadística</div>
                <div class="job-meta">Pontificia Universidad Católica de Chile | 2018 – 2022</div>
            </div>
        `
            }
        };

        // --- SYSTEM LOGIC ---
        const canvas = document.getElementById('mainCanvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        let state = 'BOOT'; // BOOT, IDLE, MODAL, DESTRUCT
        let explored = new Set(); // Tracks opened nodes

        // Nodes Config
        const nodeConfig = [
            { id: 'PERFIL', label: 'PERFIL', x: 0, y: 0, color: '#fff', size: 30 },
            { id: 'EXPERIENCIA', label: 'EXPERIENCIA', x: 0, y: -150, color: '#bc13fe', size: 20 },
            { id: 'DOCENCIA', label: 'DOCENCIA', x: -140, y: -50, color: '#bc13fe', size: 18 },
            { id: 'SKILLS', label: 'SKILLS', x: 140, y: -50, color: '#00f3ff', size: 20 },
            { id: 'EDUCACION', label: 'EDUCACIÓN', x: 0, y: 150, color: '#00f3ff', size: 18 }
        ];

        let camera = { x: 0, y: 0, zoom: 0.5, tx: 0, ty: 0, tz: 1 };

        // --- INITIALIZATION ---
        const bootLogs = [
            { msg: "INITIALIZING_KERNEL...", type: "normal", delay: 500 },
            { msg: "LOADING_NEURAL_MODULES...", type: "normal", delay: 800 },
            { msg: "VERIFYING_INTEGRITY...", type: "warning", delay: 1200 },
            { msg: "INTEGRITY_CHECK_PASSED", type: "success", delay: 1500 },
            { msg: "ESTABLISHING_SECURE_LINK...", type: "normal", delay: 2000 },
            { msg: "DECRYPTING_USER_PROFILE...", type: "normal", delay: 2500 },
            { msg: "ACCESS_GRANTED", type: "success", delay: 3000 },
            { msg: "SYSTEM_READY", type: "success", delay: 3200 }
        ];

        function runBootSequence() {
            const logContainer = document.getElementById('boot-log');
            if (!logContainer) return;

            bootLogs.forEach(log => {
                safeTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `log-line ${log.type}`;
                    line.innerText = `> ${log.msg}`;
                    logContainer.appendChild(line);
                    logContainer.scrollTop = logContainer.scrollHeight;
                    SfxSys.click();
                }, log.delay);
            });

            const lastDelay = bootLogs[bootLogs.length - 1].delay;
            safeTimeout(() => {
                const btn = document.getElementById('start-btn');
                if (btn) btn.style.opacity = 1;
                const statusSpan = document.querySelector('.boot-status span');
                if (statusSpan) {
                    statusSpan.innerText = "_READY_TO_LINK";
                    statusSpan.classList.add('blink');
                }
            }, lastDelay + 500);
        }

        function bootSystem() {
            // Start SFX Engine
            SfxSys.init();
            SfxSys.playTone(600, 'sine', 0.5, 0.1); // Boot sound

            // Background audio starts muted-ish to match slider default.
            bgAudio.volume = 0.5;
            bgAudio.play().catch(() => { /* autoplay blocked — user can press Play */ });

            const boot = document.getElementById('boot-screen');
            boot.style.transition = "opacity 1s ease-out";
            boot.style.opacity = 0;

            safeTimeout(() => {
                boot.style.display = 'none';
                document.getElementById('ui-layer').style.display = 'block';
                initNodes();
                resize();
                state = 'IDLE';
                animate();
            }, 1000);
        }

        function initNodes() {
            nodes = nodeConfig.map(cfg => ({
                ...cfg,
                baseX: cfg.x, baseY: cfg.y,
                pulse: Math.random() * 100,
                hover: false
            }));
            console.log("Nodes initialized:", nodes);
        }

        const mobileLayout = {
            PERFIL: { x: 0, y: 0 },
            EXPERIENCIA: { x: 0, y: -120 },
            DOCENCIA: { x: -90, y: -40 },
            SKILLS: { x: 90, y: -40 },
            EDUCACION: { x: 0, y: 120 },
        };

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const useMobile = width < 768;
            nodes.forEach(n => {
                const source = useMobile ? mobileLayout[n.id] : nodeConfig.find(c => c.id === n.id);
                if (source) {
                    n.baseX = source.x;
                    n.baseY = source.y;
                }
            });
        }
        window.addEventListener('resize', resize);

        // --- INPUT HANDLING ---
        const onMouseMove = e => {
            if (state !== 'IDLE') return;
            const rect = canvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left - width / 2) / camera.zoom - camera.x;
            const my = (e.clientY - rect.top - height / 2) / camera.zoom - camera.y;

            // Find the closest hovered node (in case hit-areas overlap) to avoid
            // replaying SFX and setting hover=true on multiple nodes at once.
            let closest = null;
            let closestDist = Infinity;
            nodes.forEach(n => {
                const dist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
                if (dist < n.size + 15 && dist < closestDist) {
                    closest = n;
                    closestDist = dist;
                }
            });

            nodes.forEach(n => {
                const wasHover = n.hover;
                n.hover = n === closest;
                if (n.hover && !wasHover) SfxSys.hover();
            });

            document.body.style.cursor = closest ? 'pointer' : 'default';
        };
        canvas.addEventListener('mousemove', onMouseMove);

        const onMouseLeave = () => {
            nodes.forEach(n => { n.hover = false; });
            document.body.style.cursor = 'default';
        };
        canvas.addEventListener('mouseleave', onMouseLeave);

        const onCanvasClick = () => {
            if (state !== 'IDLE') return;
            const active = nodes.find(n => n.hover);
            if (active) {
                SfxSys.click();
                openNode(active.id);
            }
        };
        canvas.addEventListener('click', onCanvasClick);

        // Touch Support — open the single closest node only.
        const onTouchStart = e => {
            if (state !== 'IDLE') return;
            e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const mx = (touch.clientX - rect.left - width / 2) / camera.zoom - camera.x;
            const my = (touch.clientY - rect.top - height / 2) / camera.zoom - camera.y;

            let closest = null;
            let closestDist = Infinity;
            nodes.forEach(n => {
                const dist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
                if (dist < n.size + 30 && dist < closestDist) {
                    closest = n;
                    closestDist = dist;
                }
            });
            if (closest) {
                SfxSys.click();
                openNode(closest.id);
            }
        };
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });

        // --- CORE FUNCTIONS ---
        function openNode(id) {
            const node = nodes.find(n => n.id === id);
            if (!node) return;

            // Mark as explored
            if (!explored.has(id)) explored.add(id);

            state = 'MODAL';

            // Camera Move
            camera.tx = -node.x;
            camera.ty = -node.y;
            camera.tz = 3; // Zoom In

            document.getElementById('log-msg').innerText = `> DECRYPTING: ${id}...`;

            // Modal Open Delay for effect
            safeTimeout(() => {
                showModalData(id);
            }, 600);
        }

        function showModalData(id) {
            const data = db[id];
            if (!data) return;

            const modal = document.getElementById('data-modal');
            const title = document.getElementById('modal-title');
            const body = document.getElementById('modal-body');

            // Decrypt Text Effect for Title
            decryptText(title, data.title);

            body.innerHTML = data.content;
            body.scrollTop = 0;
            modal.classList.add('active');

            // Move focus inside the modal for keyboard/screen reader users.
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) closeBtn.focus();
        }

        function closeModal() {
            if (state !== 'MODAL') return;
            document.getElementById('data-modal').classList.remove('active');

            // CHECK SELF DESTRUCT CONDITION
            if (explored.size === nodes.length) {
                initiateSelfDestruct();
                return;
            }

            document.getElementById('log-msg').innerText = "> RETURNING TO ROOT...";

            // Camera Reset
            camera.tx = 0;
            camera.ty = 0;
            camera.tz = 1;

            safeTimeout(() => { state = 'IDLE'; }, 500);
        }

        // --- SELF DESTRUCT SEQUENCE ---
        function initiateSelfDestruct() {
            state = 'DESTRUCT';
            document.body.classList.add('destruct-mode');

            // Start Alarm
            SfxSys.alarm();

            // Visuals
            camera.tx = 0; camera.ty = 0; camera.tz = 0.8; // Zoom out slightly

            document.getElementById('log-msg').innerText = "CRITICAL ERROR: FULL ACCESS DETECTED.";
            document.getElementById('log-msg').style.color = 'red';
            document.getElementById('sync-status').innerText = "COMPROMISED";
            document.getElementById('sync-status').style.color = 'red';

            // Overlay
            safeTimeout(() => {
                const overlay = document.getElementById('destruct-overlay');
                overlay.style.display = 'flex';

                let timer = 10;
                const timerEl = document.getElementById('countdown-timer');

                const interval = safeInterval(() => {
                    timer--;
                    timerEl.innerText = timer;

                    if (timer <= 0) {
                        clearInterval(interval);
                        intervals.delete(interval);
                        finalizeDestruction();
                    }
                }, 1000);
            }, 1000);
        }

        function toggleDestructMute() {
            const btn = document.getElementById('btn-mute-destruct');

            // Toggle Mute State
            if (SfxSys.ctx && SfxSys.ctx.state === 'running') {
                SfxSys.ctx.suspend();
                bgAudio.muted = true;
                btn.innerText = "ALARM SILENCED";
                btn.classList.add('muted');
            } else {
                if (SfxSys.ctx) SfxSys.ctx.resume();
                bgAudio.muted = false;
                btn.innerText = "SILENCE ALARM";
                btn.classList.remove('muted');
            }
        }

        function finalizeDestruction() {
            // Stop audio
            bgAudio.pause();

            document.getElementById('destruct-overlay').style.display = 'none';
            document.getElementById('ui-layer').style.display = 'none';
            document.getElementById('canvas-container').style.display = 'none';

            const final = document.getElementById('final-screen');
            final.style.display = 'flex'; // Centered due to fixed pos + flex
            document.body.style.backgroundColor = '#000';
        }


        // Text Decryption Effect logic
        function decryptText(element, finalText) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
            let iterations = 0;
            const interval = safeInterval(() => {
                element.innerText = finalText.split("")
                    .map((letter, index) => {
                        if (index < iterations) return finalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("");

                if (iterations >= finalText.length) {
                    element.innerText = finalText; // ensure final render is exact
                    clearInterval(interval);
                    intervals.delete(interval);
                }
                iterations += 1 / 2;
            }, 30);
        }

        // --- RENDER LOOP ---
        function animate() {
            if (destroyed) return;
            // Clear
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            // Camera Lerp
            const lerpSpeed = state === 'DESTRUCT' ? 0.02 : 0.1;
            camera.x += (camera.tx - camera.x) * lerpSpeed;
            camera.y += (camera.ty - camera.y) * lerpSpeed;
            camera.zoom += (camera.tz - camera.zoom) * lerpSpeed;

            // Add Camera Shake in destruct mode
            let shakeX = 0, shakeY = 0;
            if (state === 'DESTRUCT') {
                shakeX = (Math.random() - 0.5) * 10;
                shakeY = (Math.random() - 0.5) * 10;
            }

            ctx.save();
            ctx.translate(width / 2 + shakeX, height / 2 + shakeY);
            ctx.scale(camera.zoom, camera.zoom);
            ctx.translate(camera.x, camera.y);

            // Draw Connections
            ctx.strokeStyle = state === 'DESTRUCT' ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 243, 255, 0.15)';
            ctx.lineWidth = 1;

            // Connect everything to center PERFIL
            if (nodes.length === 0) {
                ctx.restore();
                rafId = requestAnimationFrame(animate);
                return;
            }
            const center = nodes[0];
            for (let i = 1; i < nodes.length; i++) {
                ctx.beginPath();
                ctx.moveTo(center.x, center.y);
                ctx.lineTo(nodes[i].x, nodes[i].y);
                ctx.stroke();
            }

            // Connect Outer Ring
            ctx.beginPath();
            ctx.moveTo(nodes[1].x, nodes[1].y); // Exp
            ctx.lineTo(nodes[3].x, nodes[3].y); // Skills
            ctx.lineTo(nodes[4].x, nodes[4].y); // Edu
            ctx.lineTo(nodes[2].x, nodes[2].y); // Docencia
            ctx.closePath();
            ctx.stroke();

            // Draw Nodes
            const time = Date.now() * 0.001;
            nodes.forEach(n => {
                // Lerp position to base (responsive fix)
                n.x += (n.baseX - n.x) * 0.1;
                n.y += (n.baseY - n.y) * 0.1;

                // Hover Animation
                const scale = n.hover ? 1.2 : 1;

                // Adjust color if explored or destruct
                let drawColor = n.color;
                if (state === 'DESTRUCT') drawColor = '#ff003c';
                else if (explored.has(n.id)) drawColor = '#0f0'; // Green if visited
                if (n.id === 'PERFIL' && explored.has('PERFIL')) drawColor = '#fff';

                // Pulse Ring
                ctx.beginPath();
                ctx.strokeStyle = drawColor;
                ctx.globalAlpha = 0.5 + Math.sin(time * 2 + n.pulse) * 0.3;
                if (state === 'DESTRUCT') ctx.globalAlpha = Math.random(); // Glitchy pulse

                ctx.arc(n.x, n.y, n.size * 1.5 * scale, 0, Math.PI * 2);
                ctx.stroke();

                // Core
                ctx.globalAlpha = 1;
                ctx.fillStyle = '#050505';
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.size * scale, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = drawColor;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Inner Fill
                ctx.fillStyle = drawColor;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.size * 0.3 * scale, 0, Math.PI * 2);
                ctx.fill();

                // Label
                ctx.fillStyle = '#fff';
                if (state === 'DESTRUCT') ctx.fillStyle = '#ff003c';

                ctx.font = '12px Share Tech Mono';
                ctx.textAlign = 'center';
                ctx.fillText(n.label, n.x, n.y + n.size + 20);
            });

            ctx.restore();
            rafId = requestAnimationFrame(animate);
        }

        // Attach Event Listeners
        const startBtn = document.getElementById('start-btn');
        if (startBtn) startBtn.addEventListener('click', bootSystem);

        const btnPlay = document.getElementById('btn-play');
        if (btnPlay) btnPlay.addEventListener('click', toggleAudio);

        const volSlider = document.getElementById('vol-slider');
        const onVolInput = (e) => setVolume(parseFloat(e.target.value));
        if (volSlider) volSlider.addEventListener('input', onVolInput);

        const btnSpeed = document.getElementById('btn-speed');
        if (btnSpeed) btnSpeed.addEventListener('click', cycleSpeed);

        const btnMuteDestruct = document.getElementById('btn-mute-destruct');
        if (btnMuteDestruct) btnMuteDestruct.addEventListener('click', toggleDestructMute);

        const closeBtns = document.querySelectorAll('.close-btn');
        closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

        // Close modal when clicking the dimmed background outside it.
        const modalEl = document.getElementById('data-modal');
        const onModalBackdrop = (e) => {
            if (e.target === modalEl) closeModal();
        };
        if (modalEl) modalEl.addEventListener('click', onModalBackdrop);

        // Global keyboard shortcuts: Escape closes modal, Enter boots when ready.
        const onKeyDown = (e) => {
            if (e.key === 'Escape' && state === 'MODAL') {
                closeModal();
            } else if (e.key === 'Enter' && state === 'BOOT') {
                const btn = document.getElementById('start-btn');
                if (btn && parseFloat(btn.style.opacity) > 0) bootSystem();
            }
        };
        window.addEventListener('keydown', onKeyDown);

        // Start Boot
        runBootSequence();

        // Cleanup
        return () => {
            destroyed = true;
            if (rafId !== null) cancelAnimationFrame(rafId);
            timeouts.forEach(id => clearTimeout(id));
            timeouts.clear();
            intervals.forEach(id => clearInterval(id));
            intervals.clear();

            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', onKeyDown);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('click', onCanvasClick);
            canvas.removeEventListener('touchstart', onTouchStart);

            if (startBtn) startBtn.removeEventListener('click', bootSystem);
            if (btnPlay) btnPlay.removeEventListener('click', toggleAudio);
            if (volSlider) volSlider.removeEventListener('input', onVolInput);
            if (btnSpeed) btnSpeed.removeEventListener('click', cycleSpeed);
            if (btnMuteDestruct) btnMuteDestruct.removeEventListener('click', toggleDestructMute);
            if (modalEl) modalEl.removeEventListener('click', onModalBackdrop);
            closeBtns.forEach(btn => btn.removeEventListener('click', closeModal));

            // Reset residual DOM state in case the component remounts.
            document.body.style.cursor = '';
            document.body.classList.remove('destruct-mode');
            try {
                bgAudio.pause();
                bgAudio.currentTime = 0;
            } catch (_) { /* no-op */ }
            if (SfxSys.ctx && typeof SfxSys.ctx.close === 'function') {
                SfxSys.ctx.close().catch(() => {});
            }
        };
    }, []);

    return (
        <>
            {/* AUDIO SOURCES */}
            <audio id="bg-audio" loop preload="metadata">
                <source src="/Esteban_Rucán_IA_Generativa_impacto_negocio.m4a" type="audio/mp4" />
            </audio>

            {/* CANVAS BACKGROUND */}
            <div id="canvas-container">
                <canvas id="mainCanvas" aria-label="Interfaz neural interactiva con nodos de portafolio" role="img"></canvas>
            </div>

            {/* BOOT SCREEN */}
            <div id="boot-screen">
                <div className="boot-container">
                    <div className="glitch-wrapper">
                        <h1 className="boot-title" data-text="NEURAL_INTERFACE_V2.0">NEURAL_INTERFACE_V2.0</h1>
                    </div>
                    <div className="terminal-log" id="boot-log">
                        {/* Log lines injected via JS */}
                    </div>
                    <div className="boot-status">
                        <span className="blink">_WAITING_FOR_USER_INPUT</span>
                    </div>
                    <button id="start-btn">
                        <span className="btn-text">INITIALIZE_LINK</span>
                        <span className="btn-decor">&gt;&gt;</span>
                    </button>
                </div>
            </div>

            {/* UI LAYER */}
            <div id="ui-layer" style={{ display: 'none' }}>
                <div className="scanline"></div>

                <div id="hud-profile" className="hud-panel">
                    <h1 style={{ fontSize: '24px', marginBottom: '5px' }}>ESTEBAN RUCÁN</h1>
                    <div style={{ fontSize: '12px', color: '#888' }}>AI ENGINEER</div>
                    <div style={{ marginTop: '10px', fontSize: '11px', lineHeight: '1.4' }}>
                        &gt; STATUS: ONLINE<br />
                        &gt; LOCATION: SANTIAGO, CL<br />
                        &gt; CLEARANCE: LEVEL 5
                    </div>

                    {/* AUDIO PLAYER */}
                    <div className="audio-player" style={{ marginTop: '15px', borderTop: '1px solid #333', paddingTop: '10px' }}>
                        <div style={{ fontSize: '9px', color: '#666', marginBottom: '5px' }}>AUDIO FEED: YOUR BEST CANDIDATE</div>
                        <div className="audio-controls-row">
                            <button id="btn-play" className="ctrl-btn" aria-label="Reproducir o pausar audio">▶</button>
                            <input type="range" id="vol-slider" min="0" max="1" step="0.1" defaultValue="0.5" aria-label="Volumen" />
                            <button id="btn-speed" className="ctrl-btn" aria-label="Velocidad de reproducción">1x</button>
                        </div>
                    </div>
                </div>

                <div id="hud-system" className="hud-panel">
                    <div>&gt; CORE: RUNNING</div>
                    <div id="log-msg">&gt; ESPERANDO INTERACCIÓN...</div>
                    <div id="sync-status" style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>SYNC: STABLE</div>
                </div>

                <div style={{ position: 'absolute', bottom: '80px', width: '100%', textAlign: 'center', pointerEvents: 'none', opacity: 0.7 }}>
                    <div style={{ fontSize: '10px', background: '#000', display: 'inline-block', padding: '5px', border: '1px solid #333' }}>
                        TOCA LOS NODOS PARA DESENCRIPTAR DATOS
                    </div>
                </div>
            </div>

            {/* UNIVERSAL MODAL */}
            <div id="data-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="modal-header">
                    <h2 id="modal-title" className="decrypt-target">DATA</h2>
                    <button className="close-btn" aria-label="Cerrar">CERRAR CONEXIÓN</button>
                </div>
                <div id="modal-body" className="modal-content">
                    {/* Content Injected via JS */}
                </div>
            </div>

            {/* DESTRUCT OVERLAY */}
            <div id="destruct-overlay">
                <div className="warning-text">⚠️ SECURITY BREACH DETECTED ⚠️<br />DATA EXFILTRATION COMPLETE</div>
                <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>INITIATING PROTOCOL ZERO IN:</div>
                <div className="timer-big" id="countdown-timer">10</div>
                <button id="btn-mute-destruct" className="cyber-btn" style={{ borderColor: 'var(--neon-red)', color: 'var(--neon-red)', marginTop: '20px' }}>SILENCE ALARM</button>
            </div>

            {/* FINAL SCREEN (POST-DESTRUCTION) */}
            <div id="final-screen">
                <div className="terminal-box">
                    <div className="terminal-header">
                        <span className="status-dot error"></span> SYSTEM_HALTED // ERROR_CODE: 0xDEAD
                    </div>
                    <div className="terminal-body">
                        <p>&gt; CONNECTION_LOST...</p>
                        <p>&gt; NEURAL_LINK_SEVERED_BY_HOST</p>
                        <p>&gt; USER_PROFILE_ENCRYPTION: <span className="blink">LOCKED</span></p>
                        <br />
                        <p className="dimmed">To restore access, manual override is required via secure channel.</p>
                    </div>
                    <div className="terminal-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>

                        <a href="https://github.com/estebanrucan" className="cyber-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <i className="fab fa-github" style={{ fontSize: '1.2em' }}></i>
                            <span className="btn-tag">GITHUB</span>
                        </a>
                        <a href="https://www.linkedin.com/in/estebanrucan" className="cyber-btn" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <i className="fab fa-linkedin" style={{ fontSize: '1.2em' }}></i>
                            <span className="btn-tag">LINKEDIN</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
