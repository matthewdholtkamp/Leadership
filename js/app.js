// DCCS Operational Framework — Main Application
const App = {
  init() {
    window.addEventListener('hashchange', () => this.route());
    this.route();
  },

  route() {
    const hash = location.hash.slice(1) || '/';
    const main = document.getElementById('app');
    const parts = hash.split('/').filter(Boolean);

    if (parts[0] === 'strategy') this.renderStrategy(main);
    else if (parts[0] === 'leadership') this.renderLeadership(main);
    else if (parts[0] === 'evaluations') {
      location.hash = '#/leadership';
      return;
    }
    else this.renderLanding(main);

    this.updateNav(parts[0] || 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  updateNav(active) {
    document.querySelectorAll('.nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.page === active);
    });
  },

  // ===== LANDING PAGE =====
  renderLanding(el) {
    const D = FRAMEWORK;
    const INITIAL_COUNSELING_URL = 'https://militaryhealth-my.sharepoint-mil.us/personal/matthew_d_holtkamp_mil_health_mil/_layouts/15/listforms.aspx?cid=ZDcyZGM2OWYtNGZlMC00N2I0LTgyMGEtMjVlZjdkYjVmYjZm&nav=ZDAzMzI1MGUtMWFlYi00NTM1LWFiYTgtYjM3OTg1NmZmNTVm';
    const QUARTERLY_COUNSELING_URL = 'https://militaryhealth-my.sharepoint-mil.us/personal/matthew_d_holtkamp_mil_health_mil/_layouts/15/listforms.aspx?cid=ZDcyZGM2OWYtNGZlMC00N2I0LTgyMGEtMjVlZjdkYjVmYjZm&nav=MzFjYjRmYmUtZjZjNi00MDlmLWFkYjYtYjA1OGEwMDYxMTMy';

    el.innerHTML = `
      <div class="page landing portal-home">
        <div class="landing-header">
          <div class="landing-eyebrow">Defense Health Agency • Fort Leonard Wood</div>
          <h1 class="landing-title">DCCS Leadership & Counseling Portal</h1>
          <p class="landing-subtitle">LTC Matthew Holtkamp</p>
          <div class="landing-mission">
            Centralized hub for command philosophy, expectations, and counseling integration.
          </div>
        </div>

        <div class="home-grid">
          <section class="home-panel home-primary">
            <div class="panel-kicker">Start Here</div>
            <h2 class="panel-title">Use this portal in order.</h2>
            <p class="panel-desc">Before scheduling counseling, review the strategic context, read and understand my leadership philosophy, then choose the right counseling path.</p>

            <div class="workflow-list">
              <div class="workflow-item">
                <div class="workflow-number">1</div>
                <div class="workflow-copy">
                  <h3>Review Army Strategy</h3>
                  <p>Understand the Army Medicine Lines of Effort and how they connect to GLWCH, DCCS priorities, and the MSCoE mission.</p>
                  <a class="inline-link" href="#/strategy">Open Army Strategy →</a>
                </div>
              </div>
              <div class="workflow-item">
                <div class="workflow-number">2</div>
                <div class="workflow-copy">
                  <h3>Read the Leadership Philosophy</h3>
                  <p>Read and understand the DCCS intent, leadership beliefs, expectations, communication rules, and evaluation guidance before we meet.</p>
                  <a class="inline-link" href="#/leadership">Open leadership philosophy →</a>
                </div>
              </div>
              <div class="workflow-item">
                <div class="workflow-number">3</div>
                <div class="workflow-copy">
                  <h3>Schedule counseling</h3>
                  <p>After you have reviewed the material, email SSG Flor Holloway or Ms. Tina Mackie in Global to schedule initial or quarterly counseling.</p>
                  <div class="form-actions">
                    <a href="${INITIAL_COUNSELING_URL}" target="_blank" rel="noopener noreferrer" class="form-action primary">Initial Counseling Form</a>
                    <a href="${QUARTERLY_COUNSELING_URL}" target="_blank" rel="noopener noreferrer" class="form-action secondary">Quarterly Counseling Form</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div class="landing-footer" style="margin-top:4rem;">
          <div style="display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;">
            <div style="text-align:center;">
              <div class="landing-footer-name">${D.leader.name}</div>
              <div class="landing-footer-title">${D.leader.title}</div>
            </div>
            <div style="text-align:center;">
              <div class="landing-footer-name">${D.assistant.name}</div>
              <div class="landing-footer-title">${D.leader.title}, NCOIC</div>
            </div>
          </div>
          <div style="margin-top:12px;font-size:0.75rem;color:var(--text-muted);">
            Motto: <span style="color:var(--gold);font-weight:600;">${D.motto}</span>
          </div>
          <div class="footer-reference-links" aria-label="Reference links">
            <a href="#/strategy">Army Strategy</a>
            <span>·</span>
            <a href="#/leadership">Leadership Philosophy</a>
          </div>
        </div>
      </div>`;
  },

  // ===== ARMY STRATEGY PAGE =====
  toggleDropdown(id) {
    const el = document.getElementById(id);
    const btn = el?.previousElementSibling;
    if (el) {
      el.classList.toggle('open');
      btn?.classList.toggle('open');
    }
  },

  renderStrategy(el) {
    const S = FRAMEWORK.armyStrategy;
    el.innerHTML = `
      <div class="page section-page">
        <button class="back-btn" onclick="location.hash='#/'">← Back to Home</button>
        <div class="section-header">
          <div class="section-eyebrow">Army Medicine Strategic Plan</div>
          <h1 class="section-title">Five Lines of Effort</h1>
          <p class="section-desc">The overarching strategy from The Surgeon General (OTSG) that guides all Army medical operations. See how each Line of Effort cascades from the national level down to GLWCH at Fort Leonard Wood — the Army's premier force generation installation.</p>
        </div>

        <!-- Introduction Dropdown -->
        <div class="dropdown-section" style="margin-bottom:1.5rem;">
          <button class="dropdown-trigger intro-trigger" onclick="App.toggleDropdown('intro-content')">
            <span style="display:flex;align-items:center;gap:10px;">
              <span class="dropdown-chevron">›</span>
              <span style="font-size:1rem;font-weight:700;">Introduction & Overview</span>
            </span>
            <span style="font-size:0.75rem;color:var(--text-muted);">Click to expand</span>
          </button>
          <div class="dropdown-content" id="intro-content">
            <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.8;margin-bottom:1rem;">${S.introduction}</p>
            <div style="background:rgba(200,168,78,0.06);border:1px solid rgba(200,168,78,0.15);border-radius:var(--radius);padding:1rem;margin-bottom:1rem;">
              <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">End State</div>
              <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;">${S.endState}</p>
            </div>
            <div style="background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius);padding:1rem;">
              <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Implementation & Assessment</div>
              <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;">${S.implementation}</p>
            </div>
          </div>
        </div>

        <!-- LOE Header -->
        <div style="display:flex;align-items:center;gap:12px;margin:2rem 0 1.5rem;">
          <div style="height:2px;flex:1;background:linear-gradient(90deg,transparent,var(--border-subtle));"></div>
          <div style="font-size:13px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold);white-space:nowrap;">★ LINES OF EFFORT ★</div>
          <div style="height:2px;flex:1;background:linear-gradient(90deg,var(--border-subtle),transparent);"></div>
        </div>

        <!-- LOE Cards -->
        ${S.loes.map(loe => `
          <div class="strategy-loe-block">
            <!-- LOE Header Bar -->
            <div class="strategy-loe-header" style="border-left:4px solid ${loe.color};">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
                <span class="strategy-loe-number" style="background:${loe.color};">LOE ${loe.id}</span>
                <span class="strategy-loe-category" style="color:${loe.color};">${loe.category}</span>
              </div>
              <div class="strategy-loe-name">${loe.name}</div>
              <div class="strategy-loe-type">${loe.type}</div>
              <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;margin-top:8px;">${loe.description || ''}</p>
            </div>

            <!-- Objectives -->
            ${loe.objectives.map(obj => `
              <div class="dropdown-section objective-dropdown">
                <button class="dropdown-trigger objective-trigger" onclick="App.toggleDropdown('obj-${loe.id}-${obj.id}')">
                  <span style="display:flex;align-items:center;gap:10px;">
                    <span class="dropdown-chevron">›</span>
                    <span style="font-weight:600;">${obj.id} — ${obj.name}</span>
                  </span>
                  <span style="font-size:0.7rem;color:var(--text-muted);">${obj.tasks ? obj.tasks.length + ' tasks' : ''}</span>
                </button>
                <div class="dropdown-content" id="obj-${loe.id}-${obj.id}">
                  <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;margin-bottom:1rem;">${obj.description}</p>
                  ${obj.tasks && obj.tasks.length > 0 ? `
                    <div style="font-size:0.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">Tasks</div>
                    <ul style="list-style:none;padding:0;margin:0;">
                      ${obj.tasks.map((t, ti) => `
                        <li style="padding:8px 12px;font-size:0.8rem;color:var(--text-secondary);background:var(--bg-glass);border-radius:6px;margin-bottom:4px;border-left:2px solid ${loe.color};line-height:1.5;">
                          <span style="color:var(--text-muted);font-weight:600;margin-right:6px;">${obj.id}.${ti+1}</span> ${t}
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
            `).join('')}

            <!-- GLWCH Connection -->
            <div class="strategy-glwch-box" style="margin:0 0 0 4px;">
              <div class="strategy-glwch-label">⬦ GLWCH Connection — How We Execute This LOE</div>
              <div class="strategy-glwch-text">${loe.glwchConnection}</div>
            </div>
          </div>
        `).join('')}

        <!-- Enabling Objectives -->
        <div style="margin-top:2.5rem;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
            <div style="height:2px;flex:1;background:linear-gradient(90deg,transparent,var(--border-subtle));"></div>
            <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);white-space:nowrap;">Enabling Objectives</div>
            <div style="height:2px;flex:1;background:linear-gradient(90deg,var(--border-subtle),transparent);"></div>
          </div>
          ${S.enablingObjectives.map(eo => `
            <div class="dropdown-section" style="margin-bottom:0.5rem;">
              <button class="dropdown-trigger" onclick="App.toggleDropdown('eo-${eo.id}')">
                <span style="display:flex;align-items:center;gap:10px;">
                  <span class="dropdown-chevron">›</span>
                  <span style="font-weight:600;">${eo.id}. ${eo.name}</span>
                </span>
              </button>
              <div class="dropdown-content" id="eo-${eo.id}">
                <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;margin-bottom:1rem;">${eo.description}</p>
                ${eo.tasks ? `
                  <ul style="list-style:none;padding:0;">
                    ${eo.tasks.map(t => `<li style="padding:6px 12px;font-size:0.8rem;color:var(--text-secondary);background:var(--bg-glass);border-radius:6px;margin-bottom:4px;">› ${t}</li>`).join('')}
                  </ul>
                ` : ''}
                <div class="strategy-glwch-box" style="margin-top:12px;">
                  <div class="strategy-glwch-label">⬦ GLWCH</div>
                  <div class="strategy-glwch-text">${eo.glwch}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align:center;margin-top:3rem;">
          <button class="back-btn" onclick="location.hash='#/framework'" style="background:rgba(200,168,78,0.1);border-color:var(--border-accent);color:var(--gold);font-weight:600;font-size:1rem;padding:12px 32px;">
            See How GLWCH Executes → Operational Framework
          </button>
        </div>
      </div>`;
  },

  // ===== LEADERSHIP PAGE =====
  renderLeadership(el) {
    const L = FRAMEWORK.leadership;
    const D = FRAMEWORK;
    el.innerHTML = `
      <div class="page section-page">
        <button class="back-btn" onclick="location.hash='#/'">← Back to Home</button>
        <div class="section-header">
          <div class="section-eyebrow">Leadership Philosophy</div>
          <h1 class="section-title">How I Lead and What I Expect</h1>
          <div class="leader-heading">
            <div class="leader-heading-name">${D.leader.name}</div>
            <div class="leader-heading-role">Deputy Commander for Clinical Services</div>
            <div class="leader-heading-role">MSCoE Command Surgeon</div>
          </div>
        </div>

        <div class="motto-card">
          <div class="section-label">Motto</div>
          <div class="motto-text">${D.motto}</div>
          <div class="motto-parts">
            <div><strong>Work Smart</strong><span>Apply sound judgment, disciplined planning, and efficient processes.</span></div>
            <div><strong>Move Fast</strong><span>Operate with urgency and adaptability. Act decisively.</span></div>
            <div><strong>Be Nice</strong><span>Treat everyone with dignity while enforcing high standards.</span></div>
          </div>
        </div>

        <section class="content-section intent-section" id="intent">
          <div class="section-label">DCCS Intent</div>
          <h2 class="content-heading">Right care, right place, right time.</h2>
          <div class="content-stack">
            <div>
              <div class="mini-label">Purpose</div>
              <p>${L.intent.purpose}</p>
            </div>
            <div>
              <div class="mini-label">Key Tasks</div>
              <ul class="intent-list">
                ${L.intent.keyTasks.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
            <div>
              <div class="mini-label gold">End State</div>
              <p class="end-state-text">${L.intent.endState}</p>
            </div>
          </div>
        </section>

        <section class="content-section" id="beliefs">
          <div class="section-label">Leadership Beliefs</div>
          <h2 class="content-heading">The standards behind the work.</h2>
          <div class="leadership-grid">
            ${L.philosophy.beliefs.map((b, i) => `
              <div class="belief-card">
                <div class="belief-title">${i + 1}. ${b.title}</div>
                <div class="belief-text">${b.text}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="content-section" id="expectations">
          <div class="section-label">Expectations</div>
          <h2 class="content-heading">What I expect from my leaders.</h2>
          <div class="expectations-grid">
            ${L.philosophy.expectations.map((e, i) => `
              <div class="expectation-item">
                <div class="expectation-number">${i + 1}</div>
                <div class="expectation-text">${e}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="content-section" id="communication">
          <div class="section-label">Communication</div>
          <h2 class="content-heading">Solve at the lowest level. Escalate with options.</h2>
          <div class="comm-grid">
            <div class="info-card">
              <div class="info-card-title">Open Door Policy</div>
              <p>${L.communication.openDoor}</p>
            </div>
            <div class="info-card">
              <div class="info-card-title">Meeting Battle Rhythm</div>
              <p>${L.communication.battleRhythm}</p>
            </div>
          </div>
        </section>

        <section class="content-section" id="evaluations">
          <div class="section-label">Evaluations</div>
          <h2 class="content-heading">Rating guidance before counseling.</h2>
          <p class="content-intro">Evaluations are part of leader development. Know the ground rules, understand where input comes from, and use the HQ/MQ criteria to calibrate your own performance.</p>
          <div class="eval-guidance-grid">
            <div class="eval-guidance-card">
              <div class="eval-title" style="color:var(--gold);">Rating Ground Rules</div>
              <div class="eval-rule-list">
                ${L.evaluations.groundRules.map(rule => `
                  <div class="eval-rule ${rule.title.includes('Top-block') ? 'critical' : ''}">
                    <div class="eval-rule-title">${rule.title}</div>
                    <div class="eval-rule-text">${rule.text}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="eval-guidance-card">
              <div class="eval-title" style="color:var(--blue);">Where Ratings Come From</div>
              <div class="eval-rule-list">
                ${L.evaluations.ratingFocusAreas.map((source, i) => `
                  <div class="eval-rule">
                    <div class="eval-rule-title">Source ${i + 1}</div>
                    <div class="eval-rule-text">${source}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="eval-rating-grid">
            <div class="rating-card">
              <div class="eval-title" style="color:var(--blue);">Highly Qualified</div>
              <ul class="eval-list">
                ${L.evaluations.highlyQualified.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
            <div class="rating-card highlighted">
              <div class="eval-title" style="color:var(--gold);">Most Qualified — <em>Initiative (lots of it!!)</em></div>
              <ul class="eval-list">
                ${L.evaluations.mostQualified.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="eval-final-thought">
            <div class="eval-final-label">Final Thought</div>
            <div class="eval-final-text">${L.evaluations.finalThought}</div>
          </div>
        </section>

        <section class="content-section" id="team">
          <div class="section-label">GLWCH Leadership</div>
          <h2 class="content-heading">Command and deputy leadership.</h2>
          <div class="team-grid">
            ${Object.entries(L.orgChart).map(([role, name]) => `
              <div class="team-card ${role === 'dccs' ? 'featured' : ''}">
                <div class="team-role">${role.toUpperCase()}</div>
                <div class="team-name">${name}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>`;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
