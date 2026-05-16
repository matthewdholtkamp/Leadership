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
    el.innerHTML = `
      <div class="page landing">
        <div class="landing-header">
          <div class="landing-eyebrow">Defense Health Agency • Fort Leonard Wood</div>
          <h1 class="landing-title">DCCS Leadership & Counseling Portal</h1>
          <p class="landing-subtitle">LTC Matthew Holtkamp</p>
          <div class="landing-mission" style="max-width:800px;margin:1.5rem auto 0;color:var(--text-secondary);line-height:1.6;font-size:1.1rem;">
            Centralized hub for command philosophy, expectations, and counseling integration.
          </div>
        </div>
        
        <!-- Action Buttons for Counseling -->
        <div style="display:flex;justify-content:center;gap:1.5rem;margin:2rem 0 3rem;flex-wrap:wrap;">
          <a href="#" target="_blank" style="text-decoration:none;background:var(--army-green);color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:10px;box-shadow:0 4px 12px rgba(76,175,80,0.2);transition:transform 0.2s;">
            <span>📝</span> Initial Counseling Form
          </a>
          <a href="#" target="_blank" style="text-decoration:none;background:var(--bg-glass);border:1px solid var(--border-accent);color:var(--gold);padding:12px 24px;border-radius:8px;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:10px;transition:transform 0.2s;">
            <span>📅</span> Quarterly Counseling Form
          </a>
        </div>

        <div class="landing-paths" style="margin-top:0;">
          <div class="path-card" onclick="location.hash='#/leadership'">
            <div class="path-card-icon framework">⭐</div>
            <h2 class="path-card-title">Leadership Philosophy<br>& Expectations</h2>
            <p class="path-card-desc">Read my beliefs, expectations, and evaluation criteria. Review this prior to your initial counseling.</p>
            <div class="path-card-arrow">→</div>
          </div>
          <div class="path-card" onclick="location.hash='#/strategy'">
            <div class="path-card-icon strategy">🏛️</div>
            <h2 class="path-card-title">Army Medicine<br>Strategic Plan</h2>
            <p class="path-card-desc">Understand how the Army's five Lines of Effort cascade from OTSG to our installation. See how GLWCH executes the national strategy.</p>
            <div class="path-card-arrow">→</div>
          </div>
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
          <div class="section-eyebrow">Leadership</div>
          <h1 class="section-title">Philosophy & Expectations</h1>
          <p class="section-desc">${D.leader.name} — ${D.leader.title}</p>
        </div>

        <!-- Motto -->
        <div style="text-align:center;margin-bottom:2.5rem;padding:2rem;background:var(--bg-card);border:1px solid var(--border-accent);border-radius:var(--radius-lg);">
          <div style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">Motto</div>
          <div style="font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,var(--text-primary),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${D.motto}</div>
          <div style="display:flex;justify-content:center;gap:2rem;margin-top:1rem;">
            <div style="text-align:center;">
              <div style="font-size:0.85rem;font-weight:600;color:var(--gold);">Work Smart</div>
              <div style="font-size:0.75rem;color:var(--text-muted);max-width:200px;">Apply sound judgment, disciplined planning, and efficient processes.</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:0.85rem;font-weight:600;color:var(--gold);">Move Fast</div>
              <div style="font-size:0.75rem;color:var(--text-muted);max-width:200px;">Operate with urgency and adaptability. Act decisively.</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:0.85rem;font-weight:600;color:var(--gold);">Be Nice</div>
              <div style="font-size:0.75rem;color:var(--text-muted);max-width:200px;">Treat everyone with dignity while enforcing high standards.</div>
            </div>
          </div>
        </div>

        <!-- Beliefs -->
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:1rem;">Leadership Beliefs</div>
        <div class="leadership-grid">
          ${L.philosophy.beliefs.map((b, i) => `
            <div class="belief-card">
              <div class="belief-title">${i+1}. ${b.title}</div>
              <div class="belief-text">${b.text}</div>
            </div>
          `).join('')}
        </div>

        <!-- Expectations -->
        <div style="margin:2rem 0;">
          <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:1rem;">What I Expect From My Leaders</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${L.philosophy.expectations.map(e => `
              <div style="padding:8px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius);font-size:0.85rem;color:var(--text-secondary);">✦ ${e}</div>
            `).join('')}
          </div>
        </div>

        <!-- Evaluations -->
        <div class="eval-section">
          <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:1rem;">Evaluations — Rating Focus</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
            <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:1.5rem;">
              <div class="eval-title" style="color:var(--blue);">Highly Qualified</div>
              <ul class="eval-list">
                ${L.evaluations.highlyQualified.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
            <div style="background:var(--bg-card);border:1px solid rgba(200,168,78,0.2);border-radius:var(--radius-lg);padding:1.5rem;">
              <div class="eval-title" style="color:var(--gold);">Most Qualified — <em>Initiative (lots of it!!)</em></div>
              <ul class="eval-list">
                ${L.evaluations.mostQualified.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- Org Chart -->
        <div style="margin-top:2.5rem;">
          <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:1rem;">GLWCH Leadership</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
            ${Object.entries(L.orgChart).map(([role, name]) => `
              <div style="background:var(--bg-card);border:1px solid ${role==='dccs'?'var(--border-accent)':'var(--border-subtle)'};border-radius:var(--radius);padding:1rem;text-align:center;">
                <div style="font-size:0.7rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${role==='dccs'?'var(--gold)':'var(--text-muted)'};margin-bottom:4px;">${role.toUpperCase()}</div>
                <div style="font-size:0.9rem;font-weight:600;">${name}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
