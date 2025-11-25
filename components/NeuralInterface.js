'use client';
import { useEffect } from 'react';

export default function NeuralInterface() {
    useEffect(() => {
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
                bgAudio.play();
                btn.innerText = "❚❚";
            } else {
                bgAudio.pause();
                btn.innerText = "▶";
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
                Soy un profesional con alto sentido de la responsabilidad y proactividad. Me considero una persona agradable para trabajar en equipo, siempre dispuesto a colaborar y brindar apoyo a quienes me rodean.
            </p>
            <p style="margin-bottom:15px;">
                Destaco por una comunicación clara y empática, logrando involucrar eficazmente a stakeholders no técnicos, aumentando su confianza y fomentando la adopción de IA en sus procesos.
            </p>
            <p>
                Me apasiona la tecnología, y me encuentro en constante aprendizaje para mantenerme actualizado en las últimas tendencias y herramientas de la industria.
            </p>
            <div style="margin-top:20px; border-top:1px solid #333; padding-top:10px;">
                    <div style="font-size:0.9em; color:#888;">CONTACTO DIRECTO:</div>
                    <div style="color:var(--neon-cyan);">errucan@gmail.com | +56 9 75162103</div>
                    <div style="color:var(--neon-cyan);">Santiago, Chile</div>
            </div>
        `
            },
            "EXPERIENCIA": {
                title: "TRAYECTORIA LABORAL",
                content: `
            <div class="card">
                <div class="job-header">
                    <div class="job-role">Data Scientist Engineer</div>
                    <div class="job-meta">WOM Chile | Feb 2025 - Presente</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Desarrollé una solución de <strong>Speech Analytics end-to-end en GCP</strong> sobre las llamadas a Call-Center, usando Airflow, Gemini GenAI, BigQueryML y Power BI.</li>
                        <li>Logré una <strong>reducción de 15 segundos</strong> del Tiempo Medio de Operación (TMO) de los ejecutivos y la obtención de una panorámica completa de la calidad de atención.</li>
                        <li>Apoyé la creación de lineamientos técnicos para la implementación gobernada de soluciones basadas en <strong>Agentes de IA</strong> dentro de entornos Cloud.</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="job-header">
                    <div class="job-role">Data Analyst & Engineer</div>
                    <div class="job-meta">ICB S.A. | Ene 2024 - Feb 2025</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Entrené un modelo predictivo que mejoró la detección de anomalías de stock en camiones de autoventa en un <strong>63%</strong>.</li>
                        <li>Desarrollé un <strong>Agente de IA</strong> para apoyo a las ventas de gestores comerciales, logrando un aumento del <strong>8% en ventas</strong> en el primer mes de adopción.</li>
                        <li>Automaticé flujos <strong>MLOps</strong>, integrando modelos en Google Cloud con Docker y CI/CD para garantizar despliegues y mejoras continuas.</li>
                        <li>Implementé flujos automatizados de ETL desde distintas fuentes, centralizándolos en un Data Warehouse en <strong>BigQuery</strong>.</li>
                        <li>Impulsé la adopción de IA en la empresa mediante charlas para diversas áreas.</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="job-header">
                    <div class="job-role">Data Scientist</div>
                    <div class="job-meta">DATA UC | 2023</div>
                </div>
                <div class="job-desc">
                    <ul>
                        <li>Formé parte de un proyecto de inteligencia comercial que definió nuevas estrategias de pricing para programas de posgrado de la UC.</li>
                        <li>Desarrollé scrapers y pipelines de datos para extraer información del mercado educativo, integrando datos con dashboards interactivos.</li>
                        <li>Entrené modelos predictivos y usé técnicas de <strong>IA Generativa</strong> para apoyar decisiones en tiempo real acorde a las estrategias de la competencia.</li>
                    </ul>
                </div>
            </div>
        `
            },
            "DOCENCIA": {
                title: "DOCENCIA Y OTROS",
                content: `
            <div class="card">
                <div class="job-role">Relator de Seminarios</div>
                <div class="job-meta">DUOC UC y UAI | 2024</div>
                <p class="job-desc" style="margin-top:5px;">
                    Compartí mi experiencia en la implementación de soluciones de IA Generativa en la industria.
                </p>
            </div>
            <div class="card">
                <div class="job-role">Relator Curso Capacitación</div>
                <div class="job-meta">Tesorería General de la República | 2023</div>
                <p class="job-desc" style="margin-top:5px;">
                    Enseñé modelos predictivos para riesgo de crédito con Python a funcionarios.
                </p>
            </div>
            <div class="card">
                <div class="job-role">Docencia Universitaria</div>
                <div class="job-meta">Pontificia Universidad Católica | 2022 - 2024</div>
                <p class="job-desc" style="margin-top:5px;">
                    Dirigí cursos de Analytics y Machine Learning con R y Python para estudiantes de pregrado y posgrado.
                </p>
            </div>
            <div class="card">
                <div class="job-role">Práctica Profesional</div>
                <div class="job-meta">Entel S.A. | 2022</div>
                <p class="job-desc" style="margin-top:5px;">
                    Desarrollé dos proyectos de análisis de sentimientos para mejorar procesos de atención a clientes.
                </p>
            </div>
        `
            },
            "SKILLS": {
                title: "ARSENAL TÉCNICO",
                content: `
            <h3 class="section-title">CORE TECHNOLOGIES</h3>
            <span class="skill-tag highlight">Python (Avanzado)</span>
            <span class="skill-tag highlight">SQL (Avanzado)</span>
            <span class="skill-tag highlight">Google Cloud Platform (Avanzado)</span>
            <span class="skill-tag">Docker (Intermedio)</span>
            <span class="skill-tag">Git (Intermedio)</span>
            <span class="skill-tag">Power BI (Intermedio)</span>

            <h3 class="section-title">INTELIGENCIA ARTIFICIAL</h3>
            <span class="skill-tag highlight">GenAI</span>
            <span class="skill-tag highlight">RAG</span>
            <span class="skill-tag highlight">Agentic AI</span>
            <span class="skill-tag">LLMs (Gemini)</span>
            <span class="skill-tag">MLOps</span>
            <span class="skill-tag">NLP</span>
            <span class="skill-tag">Deep Learning</span>
            <span class="skill-tag">Machine Learning</span>
            <span class="skill-tag">Web Scraping</span>
            
            <h3 class="section-title">CERTIFICACIONES</h3>
            <ul style="list-style:none; color:#ccc; font-size:0.9em; line-height:1.8;">
                <li>★ Generative AI Engineering, IBM (2025)</li>
                <li>★ RAG and Agentic AI, IBM (2025)</li>
                <li>★ Generative AI for Developers, AWS (2025)</li>
                <li>★ Generative AI Leader, Google Cloud (2025)</li>
                <li>• Data Scientist con Python, Platzi (2023)</li>
                <li>• AWS Cloud Practitioner, Platzi (2023)</li>
                <li>• Data Scientist Professional, DataCamp (2021)</li>
            </ul>

            <h3 class="section-title">IDIOMAS</h3>
            <p style="color:#ccc;">Inglés Nivel B2 (Conversacional y Escrito)</p>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-top:5px; font-size:0.8em; color:#888;">
                <span>Reading: Intermedio</span>
                <span>Writing: Intermedio</span>
                <span>Speaking: Intermedio</span>
                <span>Listening: Intermedio</span>
            </div>
        `
            },
            "EDUCACION": {
                title: "FORMACIÓN ACADÉMICA",
                content: `
            <div class="card" style="border-left-color: var(--neon-cyan);">
                <div class="job-role">Magíster en Ciencia de Datos</div>
                <div class="job-meta">Pontificia Universidad Católica de Chile | 2023-2025</div>
            </div>
            <div class="card" style="border-left-color: var(--neon-cyan);">
                <div class="job-role">Diplomado en Project Management</div>
                <div class="job-meta">Universidad Adolfo Ibáñez | 2024</div>
            </div>
            <div class="card" style="border-left-color: var(--neon-cyan);">
                <div class="job-role">Estadística</div>
                <div class="job-meta">Pontificia Universidad Católica de Chile | 2018-2022</div>
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
            let totalDelay = 0;

            bootLogs.forEach(log => {
                totalDelay += Math.random() * 500 + 200; // Randomize slightly
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `log-line ${log.type}`;
                    line.innerText = `> ${log.msg}`;
                    logContainer.appendChild(line);
                    logContainer.scrollTop = logContainer.scrollHeight; // Auto scroll
                    SfxSys.click(); // Sound effect for typing
                }, totalDelay);
            });

            // Show Start Button after logs
            setTimeout(() => {
                const btn = document.getElementById('start-btn');
                btn.style.opacity = 1;
                document.querySelector('.boot-status span').innerText = "_READY_TO_LINK";
                document.querySelector('.boot-status span').classList.add('blink');
            }, totalDelay + 500);
        }

        function bootSystem() {
            // Start SFX Engine
            SfxSys.init();
            SfxSys.playTone(600, 'sine', 0.5, 0.1); // Boot sound

            // Play Background Audio
            bgAudio.play().catch(e => console.log("Audio autoplay blocked, user gesture needed earlier"));

            const boot = document.getElementById('boot-screen');
            boot.style.transition = "opacity 1s ease-out";
            boot.style.opacity = 0;

            setTimeout(() => {
                boot.style.display = 'none';
                document.getElementById('ui-layer').style.display = 'block';
                resize();
                initNodes();
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

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Responsive Layout Adjustment
            if (width < 768) {
                nodes.forEach(n => {
                    if (n.id === 'DOCENCIA') { n.baseX = -100; n.baseY = 80; }
                    if (n.id === 'SKILLS') { n.baseX = 100; n.baseY = 80; }
                    if (n.id === 'EDUCACION') { n.baseX = 0; n.baseY = 180; }
                });
            }
        }
        window.addEventListener('resize', resize);

        // --- INPUT HANDLING ---
        canvas.addEventListener('mousemove', e => {
            if (state !== 'IDLE') return;
            const rect = canvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left - width / 2) / camera.zoom - camera.x;
            const my = (e.clientY - rect.top - height / 2) / camera.zoom - camera.y;

            let hit = false;
            nodes.forEach(n => {
                const dist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
                if (dist < n.size + 15) {
                    if (!n.hover) {
                        document.body.style.cursor = 'pointer';
                        SfxSys.hover();
                    }
                    n.hover = true;
                    hit = true;
                } else {
                    n.hover = false;
                }
            });
            if (!hit) document.body.style.cursor = 'default';
        });

        canvas.addEventListener('click', e => {
            if (state !== 'IDLE') return;
            const active = nodes.find(n => n.hover);
            if (active) {
                SfxSys.click();
                openNode(active.id);
            }
        });

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
            setTimeout(() => {
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
            modal.classList.add('active');
        }

        function closeModal() {
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

            setTimeout(() => { state = 'IDLE'; }, 500);
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
            setTimeout(() => {
                const overlay = document.getElementById('destruct-overlay');
                overlay.style.display = 'flex';

                let timer = 10;
                const timerEl = document.getElementById('countdown-timer');

                const interval = setInterval(() => {
                    timer--;
                    timerEl.innerText = timer;

                    if (timer <= 0) {
                        clearInterval(interval);
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
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
            let iterations = 0;
            const interval = setInterval(() => {
                element.innerText = finalText.split("")
                    .map((letter, index) => {
                        if (index < iterations) return finalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("");

                if (iterations >= finalText.length) clearInterval(interval);
                iterations += 1 / 2;
            }, 30);
        }

        // --- RENDER LOOP ---
        function animate() {
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
                requestAnimationFrame(animate);
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
            requestAnimationFrame(animate);
        }

        // Attach Event Listeners
        const startBtn = document.getElementById('start-btn');
        if (startBtn) startBtn.addEventListener('click', bootSystem);

        const btnPlay = document.getElementById('btn-play');
        if (btnPlay) btnPlay.addEventListener('click', toggleAudio);

        const volSlider = document.getElementById('vol-slider');
        if (volSlider) volSlider.addEventListener('input', (e) => setVolume(e.target.value));

        const btnSpeed = document.getElementById('btn-speed');
        if (btnSpeed) btnSpeed.addEventListener('click', cycleSpeed);

        const btnMuteDestruct = document.getElementById('btn-mute-destruct');
        if (btnMuteDestruct) btnMuteDestruct.addEventListener('click', toggleDestructMute);

        const closeBtns = document.querySelectorAll('.close-btn');
        closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

        // Start Boot
        runBootSequence();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            if (startBtn) startBtn.removeEventListener('click', bootSystem);
            if (btnPlay) btnPlay.removeEventListener('click', toggleAudio);
            if (volSlider) volSlider.removeEventListener('input', setVolume);
            if (btnSpeed) btnSpeed.removeEventListener('click', cycleSpeed);
            if (btnMuteDestruct) btnMuteDestruct.removeEventListener('click', toggleDestructMute);
            closeBtns.forEach(btn => btn.removeEventListener('click', closeModal));
        };
    }, []);

    return (
        <>
            {/* AUDIO SOURCES */}
            <audio id="bg-audio" loop>
                <source src="/Esteban_Rucán_IA_Generativa_impacto_negocio.m4a" type="audio/mp4" />
                {/* Fallback or placeholder if file is missing/wrong format */}
            </audio>

            {/* CANVAS BACKGROUND */}
            <div id="canvas-container">
                <canvas id="mainCanvas"></canvas>
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
                            <button id="btn-play" className="ctrl-btn">▶</button>
                            <input type="range" id="vol-slider" min="0" max="1" step="0.1" defaultValue="1" />
                            <button id="btn-speed" className="ctrl-btn">1x</button>
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
            <div id="data-modal">
                <div className="modal-header">
                    <h2 id="modal-title" className="decrypt-target">DATA</h2>
                    <button className="close-btn">CERRAR CONEXIÓN</button>
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
                <button id="btn-mute-destruct">SILENCE ALARM</button>
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
                    <div className="terminal-actions">
                        <a href="mailto:errucan@gmail.com" className="cyber-btn">
                            <span className="btn-glitch">INITIATE_RECOVERY_PROTOCOL</span>
                            <span className="btn-tag">EMAIL_LINK</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
