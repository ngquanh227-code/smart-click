/**
 * SMART CLICK - CORE APP LOGIC & INTERACTIVE HUB
 * Campaign: "Click khôn ngoan – Mua an toàn"
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // STATE MANAGEMENT & LOCAL STORAGE
  // =========================================================================
  const state = {
    currentTab: "home",
    theme: localStorage.getItem("smartclick_theme") || "dark",
    soundEnabled: true,
    survey: JSON.parse(localStorage.getItem("smartclick_survey")) || window.SMARTCLICK_DATA.initialSurvey,
    hasVotedSurvey: localStorage.getItem("smartclick_hasVoted") === "true",
    shops: JSON.parse(localStorage.getItem("smartclick_shops")) || window.SMARTCLICK_DATA.shops,
    dramaPosts: JSON.parse(localStorage.getItem("smartclick_drama")) || window.SMARTCLICK_DATA.dramaPosts,
    
    // Minigame 1: Battle
    currentBattleIndex: 0,
    battleScore: 0,
    battleStreak: 0,

    // Minigame 2: Quiz
    quizCurrentIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    quizPassed: false,

    // Checklist
    checklistProgress: JSON.parse(localStorage.getItem("smartclick_checklist")) || [false, false, false, false, false]
  };

  // Sound Synth via Web Audio API
  const audioCtx = window.AudioContext || window.webkitAudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;
  function playSound(type) {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      if (type === "success") {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "wrong") {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "pop") {
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // Audio auto-play policy catch
    }
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, icon = "fa-check-circle") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--brand-orange)"></i> <span>${message}</span>`;
    container.appendChild(toast);
    playSound("pop");
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Trigger Confetti Effect
  function fireConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ff6b00", "#2563eb", "#7c3aed", "#10b981"]
      });
    }
  }

  // =========================================================================
  // THEME TOGGLE
  // =========================================================================
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (state.theme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      state.theme = isLight ? "light" : "dark";
      localStorage.setItem("smartclick_theme", state.theme);
      themeToggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
      showToast(isLight ? "Đã chuyển sang giao diện Sáng" : "Đã chuyển sang giao diện Tối", "fa-circle-half-stroke");
    });
  }

  // =========================================================================
  // TAB NAVIGATION (Desktop + Mobile Dock + Deep Linking)
  // =========================================================================
  function switchTab(tabId) {
    state.currentTab = tabId;
    
    // Update Desktop Nav Links
    document.querySelectorAll(".nav-link-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    // Update Mobile Dock Buttons
    document.querySelectorAll(".dock-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    // Update Sections
    document.querySelectorAll(".tab-section").forEach(sec => {
      sec.classList.toggle("active", sec.id === `section-${tabId}`);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Tab-specific initializations
    if (tabId === "certificate") {
      drawCertificate();
    } else if (tabId === "shops") {
      renderShops();
    } else if (tabId === "drama") {
      renderDramaPosts();
    } else if (tabId === "minigame") {
      renderBattle();
      renderQuiz();
    } else if (tabId === "handbook") {
      renderChecklist();
      updateCalculator();
    }
  }

  // Bind desktop nav buttons
  document.querySelectorAll(".nav-link-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Bind mobile dock buttons
  document.querySelectorAll(".dock-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Bind in-page cross navigation buttons
  document.querySelectorAll("[data-nav-target]").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.navTarget));
  });

  // =========================================================================
  // FEATURE 1: TRANG CHỦ & KHẢO SÁT REAL-TIME
  // =========================================================================
  function renderSurveyUI() {
    const surveyContainer = document.getElementById("surveyQuestionsList");
    if (!surveyContainer) return;

    const { q1, q2, q3 } = state.survey;
    const questions = [
      { key: "q1", data: q1, num: 1 },
      { key: "q2", data: q2, num: 2 },
      { key: "q3", data: q3, num: 3 }
    ];

    surveyContainer.innerHTML = questions.map(q => `
      <div class="survey-question-card" id="card-${q.key}">
        <div class="survey-q-title">
          <span class="q-badge">${q.num}</span>
          <span>${q.data.question}</span>
        </div>
        <div class="survey-options-list">
          ${q.data.options.map(opt => `
            <label class="survey-option-label" data-q="${q.key}" data-opt="${opt.id}">
              <input type="radio" name="${q.key}" value="${opt.id}">
              <span>${opt.text}</span>
            </label>
          `).join("")}
        </div>
      </div>
    `).join("");

    // Bind option click styles
    surveyContainer.querySelectorAll(".survey-option-label").forEach(label => {
      label.addEventListener("click", () => {
        const qName = label.dataset.q;
        surveyContainer.querySelectorAll(`[data-q="${qName}"]`).forEach(l => l.classList.remove("selected"));
        label.classList.add("selected");
        const radio = label.querySelector("input[type='radio']");
        if (radio) radio.checked = true;
        playSound("pop");
      });
    });

    renderSurveyStats();
  }

  function renderSurveyStats() {
    const statsContainer = document.getElementById("statBarsContainer");
    const totalVotesEl = document.getElementById("totalSurveyVotes");
    if (!statsContainer) return;

    if (totalVotesEl) {
      totalVotesEl.textContent = state.survey.totalVotes.toLocaleString("vi-VN");
    }

    const { q2, q3 } = state.survey;
    // Calculate percentages
    const q2Total = q2.options.reduce((sum, opt) => sum + opt.votes, 0);
    const q3Total = q3.options.reduce((sum, opt) => sum + opt.votes, 0);

    const q2Pcts = q2.options.map(o => Math.round((o.votes / q2Total) * 100));
    const q3Pcts = q3.options.map(o => Math.round((o.votes / q3Total) * 100));

    statsContainer.innerHTML = `
      <div class="stat-bar-group">
        <div class="stat-bar-label-row">
          <span>⚠️ Từng dính hàng khác quảng cáo</span>
          <strong style="color: var(--status-danger)">${q2Pcts[0]}%</strong>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill danger" style="width: ${q2Pcts[0]}%"></div>
        </div>
      </div>

      <div class="stat-bar-group">
        <div class="stat-bar-label-row">
          <span>🔍 Thói quen soi kỹ review có ảnh/video</span>
          <strong style="color: var(--brand-blue-light)">${q3Pcts[0]}%</strong>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill blue" style="width: ${q3Pcts[0]}%"></div>
        </div>
      </div>

      <div class="stat-bar-group">
        <div class="stat-bar-label-row">
          <span>💸 Thấy rẻ & lượt mua khủng là chốt ngay</span>
          <strong style="color: var(--status-warning)">${q3Pcts[2]}%</strong>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill warning" style="width: ${q3Pcts[2]}%"></div>
        </div>
      </div>

      <div class="stat-bar-group">
        <div class="stat-bar-label-row">
          <span>🛡️ Chưa từng bị dính bẫy (Check cẩn thận)</span>
          <strong style="color: var(--status-safe)">${q2Pcts[2]}%</strong>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill safe" style="width: ${q2Pcts[2]}%"></div>
        </div>
      </div>
    `;
  }

  const submitSurveyBtn = document.getElementById("submitSurveyBtn");
  if (submitSurveyBtn) {
    submitSurveyBtn.addEventListener("click", () => {
      const q1Val = document.querySelector("input[name='q1']:checked");
      const q2Val = document.querySelector("input[name='q2']:checked");
      const q3Val = document.querySelector("input[name='q3']:checked");

      if (!q1Val || !q2Val || !q3Val) {
        showToast("Vui lòng trả lời đủ cả 3 câu hỏi nhé bạn ơi!", "fa-circle-exclamation");
        return;
      }

      // Update votes in state
      const findAndAddVote = (qKey, optId) => {
        const targetOpt = state.survey[qKey].options.find(o => o.id === optId);
        if (targetOpt) targetOpt.votes += 1;
      };

      findAndAddVote("q1", q1Val.value);
      findAndAddVote("q2", q2Val.value);
      findAndAddVote("q3", q3Val.value);
      state.survey.totalVotes += 1;
      state.hasVotedSurvey = true;

      localStorage.setItem("smartclick_survey", JSON.stringify(state.survey));
      localStorage.setItem("smartclick_hasVoted", "true");

      renderSurveyStats();
      fireConfetti();
      playSound("success");
      showToast("Cảm ơn bạn! Kết quả bình chọn đã được cập nhật real-time!", "fa-heart-circle-check");

      submitSurveyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã Ghi Nhận Bình Chọn';
      submitSurveyBtn.classList.remove("btn-primary");
      submitSurveyBtn.classList.add("btn-secondary");
      submitSurveyBtn.disabled = true;
    });
  }

  // =========================================================================
  // FEATURE 2: CỘNG ĐỒNG BÌNH CHỌN SHOP UY TÍN
  // =========================================================================
  let currentShopCategory = "all";
  let currentShopTag = "all";
  let shopSearchKeyword = "";

  function renderShops() {
    const container = document.getElementById("shopsGrid");
    if (!container) return;

    let filtered = state.shops.filter(shop => {
      const matchCat = currentShopCategory === "all" || shop.category === currentShopCategory;
      const matchTag = currentShopTag === "all" || shop.tag === currentShopTag;
      const matchSearch = !shopSearchKeyword || 
        shop.name.toLowerCase().includes(shopSearchKeyword.toLowerCase()) ||
        shop.description.toLowerCase().includes(shopSearchKeyword.toLowerCase());
      return matchCat && matchTag && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: var(--brand-navy-surface); border-radius: var(--radius-lg);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px;"></i>
          <h4 style="font-weight: 700; color: var(--text-primary);">Không tìm thấy shop nào phù hợp</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Hãy thử tìm từ khóa khác hoặc bấm nút "Đề cử Shop mới" bên dưới!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(shop => {
      const borderClass = shop.tag === "safe" ? "border-safe" : shop.tag === "warning" ? "border-warning" : "border-blacklist";
      const tagClass = shop.tag === "safe" ? "safe" : shop.tag === "warning" ? "warning" : "blacklist";
      const tagIcon = shop.tag === "safe" ? "fa-circle-check" : shop.tag === "warning" ? "fa-triangle-exclamation" : "fa-shield-halved";

      return `
        <div class="shop-card ${borderClass}" data-shop-id="${shop.id}">
          <div>
            <div class="shop-card-header">
              <img src="${shop.avatar}" alt="${shop.name}" class="shop-avatar" onerror="this.src='assets/logo.jpg'">
              <div class="shop-meta">
                <h4 class="shop-name">${shop.name}</h4>
                <span class="shop-platform"><i class="fa-solid fa-store"></i> ${shop.platform}</span>
              </div>
            </div>

            <div class="shop-tag-badge ${tagClass}">
              <i class="fa-solid ${tagIcon}"></i> ${shop.tagLabel}
            </div>

            <p class="shop-desc">${shop.description}</p>

            <div class="shop-metrics-grid">
              <div class="metric-box">
                <span class="metric-val ${shop.ratingDesc > 85 ? 'high' : shop.ratingDesc > 50 ? 'med' : 'low'}">${shop.ratingDesc}%</span>
                <span class="metric-label">Đúng mô tả</span>
              </div>
              <div class="metric-box">
                <span class="metric-val ${shop.ratingReturn >= 8.5 ? 'high' : shop.ratingReturn >= 5 ? 'med' : 'low'}">${shop.ratingReturn}/10</span>
                <span class="metric-label">Đổi trả</span>
              </div>
              <div class="metric-box">
                <span class="metric-val high"><i class="fa-solid fa-star" style="color: #f59e0b; font-size: 0.75rem;"></i> ${shop.ratingPrice}/5</span>
                <span class="metric-label">Giá SV</span>
              </div>
            </div>
          </div>

          <div class="shop-actions-row">
            <div class="vote-btn-group">
              <button class="btn-vote heart" onclick="window.voteShop('${shop.id}', 'heart')">
                <i class="fa-solid fa-heart"></i> <span>${shop.verifiedCount}</span>
              </button>
              <button class="btn-vote alert" onclick="window.voteShop('${shop.id}', 'alert')">
                <i class="fa-solid fa-triangle-exclamation"></i> <span>${shop.warningCount}</span>
              </button>
            </div>
            <button class="btn-quick-peek" onclick="window.openShopModal('${shop.id}')">
              <i class="fa-solid fa-bolt"></i> Soi 30s
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // Filter chips interaction
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const type = chip.dataset.filterType;
      const val = chip.dataset.filterValue;

      // Unselect siblings
      chip.parentElement.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      if (type === "cat") currentShopCategory = val;
      if (type === "tag") currentShopTag = val;

      renderShops();
      playSound("pop");
    });
  });

  const shopSearchInput = document.getElementById("shopSearchInput");
  if (shopSearchInput) {
    shopSearchInput.addEventListener("input", (e) => {
      shopSearchKeyword = e.target.value.trim();
      renderShops();
    });
  }

  // Vote Shop Function (Global)
  window.voteShop = function(shopId, type) {
    const shop = state.shops.find(s => s.id === shopId);
    if (!shop) return;

    if (type === "heart") {
      shop.verifiedCount += 1;
      showToast(`+1 Thả tim uy tín cho ${shop.name}!`, "fa-heart");
      fireConfetti();
      playSound("success");
    } else {
      shop.warningCount += 1;
      showToast(`+1 Cảnh báo cộng đồng về ${shop.name}!`, "fa-triangle-exclamation");
      playSound("wrong");
    }

    localStorage.setItem("smartclick_shops", JSON.stringify(state.shops));
    renderShops();
  };

  // Open "Soi Nhanh 30s" Modal
  window.openShopModal = function(shopId) {
    const shop = state.shops.find(s => s.id === shopId);
    if (!shop) return;

    const modal = document.getElementById("shopPeekModal");
    const titleEl = document.getElementById("peekModalTitle");
    const contentEl = document.getElementById("peekModalContent");

    titleEl.innerHTML = `<i class="fa-solid fa-bolt" style="color: var(--brand-orange)"></i> Soi Nhanh 30s: ${shop.name}`;
    contentEl.innerHTML = `
      <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 16px;">
        <img src="${shop.avatar}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover;" onerror="this.src='assets/logo.jpg'">
        <div>
          <h4 style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary);">${shop.name}</h4>
          <span style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-truck-fast"></i> Tốc độ ship: ${shop.deliverySpeed}</span>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <h5 style="font-size: 0.88rem; font-weight: 800; color: var(--status-safe); margin-bottom: 6px;">
          <i class="fa-solid fa-thumbs-up"></i> Điểm Cộng Nổi Bật:
        </h5>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
          ${shop.summary30s.pros.map(p => `
            <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; gap: 8px;">
              <i class="fa-solid fa-check" style="color: var(--status-safe); margin-top: 3px;"></i>
              <span>${p}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h5 style="font-size: 0.88rem; font-weight: 800; color: var(--status-danger); margin-bottom: 6px;">
          <i class="fa-solid fa-triangle-exclamation"></i> Điểm Trừ Cần Lưu Ý:
        </h5>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
          ${shop.summary30s.cons.map(c => `
            <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; gap: 8px;">
              <i class="fa-solid fa-xmark" style="color: var(--status-danger); margin-top: 3px;"></i>
              <span>${c}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div style="background: rgba(255, 107, 0, 0.1); border: 1px solid rgba(255, 107, 0, 0.3); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px;">
        <h5 style="font-size: 0.84rem; font-weight: 800; color: var(--brand-orange); margin-bottom: 4px;">
          <i class="fa-solid fa-lightbulb"></i> Mẹo Săn Deal & Tránh Bẫy Của Shop:
        </h5>
        <p style="font-size: 0.82rem; color: #ffedd5;">${shop.summary30s.smartTip}</p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid var(--brand-blue); border-radius: var(--radius-sm); padding: 10px 14px;">
        <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">REVIEW THẬT TỪ SINH VIÊN:</span>
        <p style="font-size: 0.82rem; font-style: italic; color: var(--text-primary);">${shop.summary30s.topReview}</p>
      </div>
    `;

    modal.classList.add("active");
    playSound("pop");
  };

  // Close Modal Handler
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    });
  });

  // Modal Backdrop Click
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.classList.remove("active");
    });
  });

  // Form Đề Cử Shop Mới
  const addShopBtn = document.getElementById("addShopBtn");
  const addShopModal = document.getElementById("addShopModal");
  if (addShopBtn && addShopModal) {
    addShopBtn.addEventListener("click", () => addShopModal.classList.add("active"));
  }

  const addShopForm = document.getElementById("addShopForm");
  if (addShopForm) {
    addShopForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("newShopName").value.trim();
      const platform = document.getElementById("newShopPlatform").value;
      const category = document.getElementById("newShopCat").value;
      const tag = document.getElementById("newShopTag").value;
      const desc = document.getElementById("newShopDesc").value.trim();
      const pros = document.getElementById("newShopPros").value.trim();
      const cons = document.getElementById("newShopCons").value.trim();

      const newShop = {
        id: "shop-" + Date.now(),
        name,
        platform,
        category,
        tag,
        tagLabel: tag === "safe" ? "Shop Sinh Viên Tin Dùng" : tag === "warning" ? "Cần Cân Nhắc" : "Góc Cảnh Báo/Blacklist",
        avatar: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150&auto=format&fit=crop&q=80",
        description: desc,
        ratingDesc: tag === "safe" ? 95 : tag === "warning" ? 60 : 20,
        ratingReturn: tag === "safe" ? 9.0 : tag === "warning" ? 5.0 : 1.5,
        ratingPrice: 5,
        deliverySpeed: "2-3 ngày",
        verifiedCount: 1,
        warningCount: tag === "safe" ? 0 : 5,
        summary30s: {
          pros: [pros || "Sản phẩm đúng mô tả, giá cả phải chăng."],
          cons: [cons || "Chưa có phản hồi tiêu cực nào."],
          smartTip: "Nên nhắn tin hỏi shop tình trạng kho hàng trước khi chốt đơn.",
          topReview: `“Shop vừa được sinh viên đề cử vào hệ sinh thái Smart Click!”`
        }
      };

      state.shops.unshift(newShop);
      localStorage.setItem("smartclick_shops", JSON.stringify(state.shops));
      renderShops();
      addShopModal.classList.remove("active");
      addShopForm.reset();
      fireConfetti();
      playSound("success");
      showToast(`Đã thêm shop "${name}" vào danh sách bình chọn!`, "fa-circle-check");
    });
  }

  // =========================================================================
  // FEATURE 3: GÓC BÓC PHỐT & CẢNH BÁO LỪA ĐẢO
  // =========================================================================
  function renderDramaPosts() {
    const container = document.getElementById("dramaFeedList");
    if (!container) return;

    container.innerHTML = state.dramaPosts.map(post => `
      <div class="drama-post-card" id="${post.id}">
        <div class="drama-post-header">
          <div class="post-author-info">
            <div class="author-avatar">${post.isAnonymous ? '<i class="fa-solid fa-user-secret"></i>' : post.author[0]}</div>
            <div class="author-name-row">
              <span class="author-name">
                ${post.author}
                ${post.isAnonymous ? '<span class="tag-pill hot" style="padding: 2px 8px; font-size: 0.68rem;"><i class="fa-solid fa-mask"></i> Ẩn danh</span>' : ''}
              </span>
              <span class="post-time"><i class="fa-regular fa-clock"></i> ${post.timeAgo}</span>
            </div>
          </div>
          <span class="damage-badge"><i class="fa-solid fa-circle-exclamation"></i> Mất: ${post.damageAmount}</span>
        </div>

        <h4 class="post-title">${post.title}</h4>
        <div class="target-shop-tag">
          <i class="fa-solid fa-store"></i> Shop bị tố cáo: <strong>${post.shopName}</strong> | Phân loại: ${post.categoryBadge}
        </div>

        <p class="post-body-text">${post.content}</p>

        <!-- Khung Lời Khuyên Tự Động Từ Smart Click -->
        <div class="smart-advice-box">
          <div class="smart-advice-title">
            <i class="fa-solid fa-shield-halved"></i> ${post.smartAdvice.badge}
          </div>
          <p class="smart-advice-analysis"><strong>Phân tích bẫy:</strong> ${post.smartAdvice.analysis}</p>
          <p class="smart-advice-action"><i class="fa-solid fa-bullseye"></i> <strong>Cần làm ngay:</strong> ${post.smartAdvice.action}</p>
        </div>

        <div class="post-actions-bar">
          <div class="reactions-group">
            <button class="reaction-btn" onclick="window.reactPost('${post.id}', 'sympathy')">
              <span>😭 Đồng cảm</span> <strong>(${post.reactions.sympathy})</strong>
            </button>
            <button class="reaction-btn" onclick="window.reactPost('${post.id}', 'helpful')">
              <span>👍 Hữu ích</span> <strong>(${post.reactions.helpful})</strong>
            </button>
            <button class="reaction-btn safe" onclick="window.reactPost('${post.id}', 'avoided')">
              <span>🛡️ Đã né kịp</span> <strong>(${post.reactions.avoided})</strong>
            </button>
          </div>
          <button class="comment-toggle-btn" onclick="window.openCommentModal('${post.id}')">
            <i class="fa-solid fa-message"></i> Bình luận (${post.commentsCount || post.comments.length})
          </button>
        </div>
      </div>
    `).join("");
  }

  // React Post (Global)
  window.reactPost = function(postId, reactType) {
    const post = state.dramaPosts.find(p => p.id === postId);
    if (!post) return;
    post.reactions[reactType] += 1;
    localStorage.setItem("smartclick_drama", JSON.stringify(state.dramaPosts));
    renderDramaPosts();
    playSound("pop");
    showToast("Đã ghi nhận tương tác của bạn!", "fa-thumbs-up");
  };

  // Open Comment Modal
  window.openCommentModal = function(postId) {
    const post = state.dramaPosts.find(p => p.id === postId);
    if (!post) return;

    const modal = document.getElementById("commentsModal");
    const titleEl = document.getElementById("commentsModalTitle");
    const listEl = document.getElementById("commentsModalList");
    const formEl = document.getElementById("newCommentForm");

    titleEl.innerHTML = `<i class="fa-solid fa-comments" style="color: var(--brand-orange)"></i> Bình luận: ${post.shopName}`;
    
    function renderComments() {
      listEl.innerHTML = post.comments.map(c => `
        <div style="background: rgba(255, 255, 255, 0.04); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 4px;">
            <strong style="color: var(--brand-orange);">${c.user}</strong>
            <span style="color: var(--text-muted);">${c.time}</span>
          </div>
          <p style="font-size: 0.84rem; color: var(--text-secondary);">${c.text}</p>
        </div>
      `).join("");
    }
    renderComments();

    formEl.onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById("commentTextInput");
      const val = input.value.trim();
      if (!val) return;

      post.comments.push({
        user: "Bạn (Sinh viên UTT)",
        text: val,
        time: "Vừa xong"
      });
      post.commentsCount = post.comments.length;
      localStorage.setItem("smartclick_drama", JSON.stringify(state.dramaPosts));
      input.value = "";
      renderComments();
      renderDramaPosts();
      playSound("pop");
      showToast("Đã gửi bình luận!", "fa-paper-plane");
    };

    modal.classList.add("active");
  };

  // Đăng Bài Cảnh Báo Mới
  const openDramaModalBtn = document.getElementById("openDramaModalBtn");
  const createDramaModal = document.getElementById("createDramaModal");
  if (openDramaModalBtn && createDramaModal) {
    openDramaModalBtn.addEventListener("click", () => createDramaModal.classList.add("active"));
  }

  const createDramaForm = document.getElementById("createDramaForm");
  if (createDramaForm) {
    createDramaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const shopName = document.getElementById("dramaShopName").value.trim();
      const category = document.getElementById("dramaCategory").value;
      const amount = document.getElementById("dramaAmount").value.trim() || "Chưa xác định";
      const title = document.getElementById("dramaTitle").value.trim();
      const content = document.getElementById("dramaContent").value.trim();
      const isAnon = document.getElementById("dramaAnonCheck").checked;
      const authorName = isAnon ? "Sinh viên giấu tên (UTT)" : (document.getElementById("dramaAuthorName").value.trim() || "Sinh viên UTT");

      const newPost = {
        id: "post-" + Date.now(),
        author: authorName,
        isAnonymous: isAnon,
        timeAgo: "Vừa xong",
        shopName: shopName,
        categoryBadge: category,
        damageAmount: amount,
        title: title,
        content: content,
        smartAdvice: {
          badge: "Phân tích tự động từ Smart Click:",
          analysis: "Chiêu trò có dấu hiệu lợi dụng niềm tin người mua khi không kiểm tra kỹ đánh giá thật hoặc giao dịch ngoài luồng bảo vệ của sàn.",
          action: "Hãy lưu lại toàn bộ sao kê tin nhắn, hóa đơn vận đơn và bấm Trả hàng/Báo cáo vi phạm ngay lập tức!"
        },
        reactions: { sympathy: 1, helpful: 1, avoided: 1 },
        commentsCount: 0,
        comments: []
      };

      state.dramaPosts.unshift(newPost);
      localStorage.setItem("smartclick_drama", JSON.stringify(state.dramaPosts));
      renderDramaPosts();
      createDramaModal.classList.remove("active");
      createDramaForm.reset();
      fireConfetti();
      playSound("success");
      showToast("Bài viết cảnh báo của bạn đã được đăng thành công!", "fa-shield-halved");
    });
  }

  // =========================================================================
  // FEATURE 4: MINIGAME (BATTLE REVIEW & QUIZ)
  // =========================================================================
  // Tab Switcher inside Minigame
  const btnSubBattle = document.getElementById("subnavBattleBtn");
  const btnSubQuiz = document.getElementById("subnavQuizBtn");
  const viewBattle = document.getElementById("viewBattleMode");
  const viewQuiz = document.getElementById("viewQuizMode");

  if (btnSubBattle && btnSubQuiz) {
    btnSubBattle.addEventListener("click", () => {
      btnSubBattle.classList.add("active");
      btnSubQuiz.classList.remove("active");
      viewBattle.style.display = "block";
      viewQuiz.style.display = "none";
      renderBattle();
      playSound("pop");
    });

    btnSubQuiz.addEventListener("click", () => {
      btnSubQuiz.classList.add("active");
      btnSubBattle.classList.remove("active");
      viewBattle.style.display = "none";
      viewQuiz.style.display = "block";
      renderQuiz();
      playSound("pop");
    });
  }

  // BATTLE: Soi Review Thật vs Review Ảo
  function renderBattle() {
    const battle = window.SMARTCLICK_DATA.battles[state.currentBattleIndex];
    if (!battle) return;

    document.getElementById("battleCurrentRound").textContent = `${state.currentBattleIndex + 1}/${window.SMARTCLICK_DATA.battles.length}`;
    document.getElementById("battleScoreVal").textContent = state.battleScore;
    document.getElementById("battleStreakVal").textContent = state.battleStreak;
    document.getElementById("battleProductTitle").textContent = `Vòng ${state.currentBattleIndex + 1}: ${battle.productName}`;

    // Fill Review A
    const revA = battle.reviewA;
    const cardA = document.getElementById("reviewCardA");
    cardA.className = "review-choice-card";
    cardA.innerHTML = `
      <div>
        <span class="card-label-badge side-a"><i class="fa-solid fa-a"></i> MẪU ĐÁNH GIÁ A</span>
        <div class="review-user-row">
          <span class="review-user-name">${revA.author}</span>
          <span class="review-stars">${'★'.repeat(revA.stars)}</span>
        </div>
        <p style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 8px;"><i class="fa-regular fa-clock"></i> ${revA.time}</p>
        <img src="${revA.images[0]}" alt="Review img" class="review-img-preview" onerror="this.src='assets/logo.jpg'">
        <p class="review-text-content">“${revA.text}”</p>
      </div>
      <button class="btn-select-review" onclick="window.chooseBattle('A')">
        <i class="fa-solid fa-hand-pointer"></i> CHỌN MẪU A LÀ REVIEW THẬT
      </button>
    `;

    // Fill Review B
    const revB = battle.reviewB;
    const cardB = document.getElementById("reviewCardB");
    cardB.className = "review-choice-card";
    cardB.innerHTML = `
      <div>
        <span class="card-label-badge side-b"><i class="fa-solid fa-b"></i> MẪU ĐÁNH GIÁ B</span>
        <div class="review-user-row">
          <span class="review-user-name">${revB.author}</span>
          <span class="review-stars">${'★'.repeat(revB.stars)}</span>
        </div>
        <p style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 8px;"><i class="fa-regular fa-clock"></i> ${revB.time}</p>
        <img src="${revB.images[0]}" alt="Review img" class="review-img-preview" onerror="this.src='assets/logo.jpg'">
        <p class="review-text-content">“${revB.text}”</p>
      </div>
      <button class="btn-select-review" onclick="window.chooseBattle('B')">
        <i class="fa-solid fa-hand-pointer"></i> CHỌN MẪU B LÀ REVIEW THẬT
      </button>
    `;

    // Hide feedback box
    const feedbackBox = document.getElementById("battleFeedbackBox");
    feedbackBox.className = "battle-feedback-box";
  }

  window.chooseBattle = function(choice) {
    const battle = window.SMARTCLICK_DATA.battles[state.currentBattleIndex];
    if (!battle) return;

    const isCorrect = choice === battle.correctOption;
    const cardA = document.getElementById("reviewCardA");
    const cardB = document.getElementById("reviewCardB");
    const feedbackBox = document.getElementById("battleFeedbackBox");

    // Disable buttons
    cardA.querySelectorAll("button").forEach(b => b.disabled = true);
    cardB.querySelectorAll("button").forEach(b => b.disabled = true);

    if (battle.correctOption === "A") {
      cardA.classList.add("selected-correct");
      cardB.classList.add("selected-wrong");
    } else {
      cardB.classList.add("selected-correct");
      cardA.classList.add("selected-wrong");
    }

    if (isCorrect) {
      state.battleScore += 100;
      state.battleStreak += 1;
      playSound("success");
      fireConfetti();
      showToast("Chính xác! Bạn có con mắt soi review cực tinh tường!", "fa-bullseye");
    } else {
      state.battleStreak = 0;
      playSound("wrong");
      showToast("Chưa đúng rồi! Hãy xem kỹ dấu hiệu seeding nhé!", "fa-triangle-exclamation");
    }

    document.getElementById("battleScoreVal").textContent = state.battleScore;
    document.getElementById("battleStreakVal").textContent = state.battleStreak;

    // Fill Explanation Box
    const fakeObj = battle.correctOption === "A" ? battle.reviewB : battle.reviewA;
    feedbackBox.innerHTML = `
      <div class="feedback-headline ${isCorrect ? 'correct' : 'wrong'}">
        <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>${isCorrect ? 'XUẤT SẮC! BẠN ĐÃ BẮT BÀI ĐÚNG SEEDING!' : 'CẢNH BÁO: BẠN ĐÃ BỊ SEEDING ĐÁNH LỪA!'}</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-primary); margin-bottom: 10px;">${battle.explanation}</p>

      <div style="background: rgba(255, 107, 0, 0.1); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 12px;">
        <strong style="color: var(--brand-orange); font-size: 0.82rem; display: block; margin-bottom: 6px;">
          🔍 CÁC DẤU HIỆU SEEDING VẠCH TRẦN REVIEW ẢO:
        </strong>
        <ul class="clues-list">
          ${fakeObj.clues.map(c => `<li><i class="fa-solid fa-magnifying-glass"></i> <span>${c}</span></li>`).join("")}
        </ul>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        ${state.currentBattleIndex < window.SMARTCLICK_DATA.battles.length - 1 ? `
          <button class="btn btn-primary btn-sm" onclick="window.nextBattle()">
            Vòng Tiếp Theo <i class="fa-solid fa-arrow-right"></i>
          </button>
        ` : `
          <button class="btn btn-primary btn-sm" onclick="window.finishBattle()">
            <i class="fa-solid fa-award"></i> Chuyển Sang Thi Trắc Nghiệm 10 Câu
          </button>
        `}
      </div>
    `;
    feedbackBox.classList.add("show");
  };

  window.nextBattle = function() {
    state.currentBattleIndex += 1;
    renderBattle();
    playSound("pop");
  };

  window.finishBattle = function() {
    btnSubQuiz.click();
  };

  // QUIZ 10 CÂU TRẮC NGHIỆM
  function renderQuiz() {
    const q = window.SMARTCLICK_DATA.quiz[state.quizCurrentIndex];
    if (!q) return;

    state.quizAnswered = false;

    // Progress
    const pct = Math.round(((state.quizCurrentIndex + 1) / window.SMARTCLICK_DATA.quiz.length) * 100);
    document.getElementById("quizProgressFill").style.width = `${pct}%`;
    document.getElementById("quizProgressLabel").textContent = `Câu ${state.quizCurrentIndex + 1}/${window.SMARTCLICK_DATA.quiz.length}`;
    document.getElementById("quizCurrentScore").textContent = `Điểm: ${state.quizScore}/10`;

    document.getElementById("quizQuestionTitle").textContent = `${state.quizCurrentIndex + 1}. ${q.question}`;

    const optionsContainer = document.getElementById("quizOptionsGrid");
    const letters = ["A", "B", "C", "D"];
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn" data-opt-idx="${idx}" onclick="window.handleQuizAnswer(${idx})">
        <span class="opt-letter">${letters[idx]}</span>
        <span>${opt}</span>
      </button>
    `).join("");

    const explanationBox = document.getElementById("quizExplanationBox");
    explanationBox.style.display = "none";
    document.getElementById("quizNextBtn").style.display = "none";
  }

  window.handleQuizAnswer = function(chosenIdx) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    const q = window.SMARTCLICK_DATA.quiz[state.quizCurrentIndex];
    const isCorrect = chosenIdx === q.correct;

    const buttons = document.querySelectorAll(".quiz-option-btn");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add("correct");
      } else if (idx === chosenIdx) {
        btn.classList.add("incorrect");
      }
    });

    if (isCorrect) {
      state.quizScore += 1;
      playSound("success");
      showToast("Chính xác! +1 Điểm tỉnh táo!", "fa-check");
    } else {
      playSound("wrong");
      showToast("Chưa chính xác! Xem giải thích bên dưới nhé!", "fa-circle-xmark");
    }

    document.getElementById("quizCurrentScore").textContent = `Điểm: ${state.quizScore}/10`;

    const explanationBox = document.getElementById("quizExplanationBox");
    explanationBox.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-lightbulb" style="color: var(--brand-orange)"></i> Giải thích từ Chuyên gia Smart Click:
      </div>
      <p>${q.explanation}</p>
    `;
    explanationBox.style.display = "block";

    const nextBtn = document.getElementById("quizNextBtn");
    nextBtn.style.display = "inline-flex";
    if (state.quizCurrentIndex === window.SMARTCLICK_DATA.quiz.length - 1) {
      nextBtn.innerHTML = '<i class="fa-solid fa-flag-checkered"></i> Xem Kết Quả & Mở Khóa Chứng Nhận';
    } else {
      nextBtn.innerHTML = 'Câu Tiếp Theo <i class="fa-solid fa-arrow-right"></i>';
    }
  };

  const quizNextBtn = document.getElementById("quizNextBtn");
  if (quizNextBtn) {
    quizNextBtn.addEventListener("click", () => {
      if (state.quizCurrentIndex < window.SMARTCLICK_DATA.quiz.length - 1) {
        state.quizCurrentIndex += 1;
        renderQuiz();
        playSound("pop");
      } else {
        // Quiz completed
        finishQuiz();
      }
    });
  }

  function finishQuiz() {
    const passed = state.quizScore >= 8;
    state.quizPassed = passed;

    const modal = document.getElementById("quizResultModal");
    const resultTitle = document.getElementById("quizModalTitle");
    const resultContent = document.getElementById("quizModalContent");

    if (passed) {
      playSound("success");
      fireConfetti();
      resultTitle.innerHTML = `<i class="fa-solid fa-crown" style="color: #f59e0b"></i> XUẤT SẮC! BẠN LÀ NGƯỜI MUA HÀNG TỈNH TÁO!`;
      resultContent.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="font-size: 3rem; font-weight: 900; font-family: var(--font-display); color: var(--status-safe); margin-bottom: 8px;">
            ${state.quizScore}/10
          </div>
          <p style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 16px;">
            Chúc mừng bạn đã xuất sắc vượt qua bài test thực chiến phòng chống lừa đảo online của Smart Click!
          </p>
          <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--status-safe); border-radius: var(--radius-md); padding: 14px; margin-bottom: 20px;">
            <strong style="color: var(--status-safe); display: block; margin-bottom: 4px;">🎉 CHỨNG NHẬN ĐÃ ĐƯỢC MỞ KHÓA!</strong>
            <span style="font-size: 0.84rem; color: #a7f3d0;">Hãy sang tab "Chứng Nhận" để điền tên và tải ảnh Chứng Nhận Điện Tử về khoe Facebook nhé!</span>
          </div>
          <button class="btn btn-primary" onclick="window.goToCertificateWithScore('${state.quizScore}')">
            <i class="fa-solid fa-certificate"></i> TẠO CHỨNG NHẬN NGAY
          </button>
        </div>
      `;
    } else {
      playSound("wrong");
      resultTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: var(--status-warning)"></i> CẦN NÂNG CAO CẢNH GIÁC!`;
      resultContent.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="font-size: 3rem; font-weight: 900; font-family: var(--font-display); color: var(--status-warning); margin-bottom: 8px;">
            ${state.quizScore}/10
          </div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
            Bạn đạt ${state.quizScore}/10 điểm (Cần >= 8/10 để mở khóa Chứng nhận). Có vẻ như một vài chiêu trò tinh vi vẫn làm bạn phân vân!
          </p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-secondary" onclick="window.restartQuiz()">
              <i class="fa-solid fa-rotate-right"></i> Làm Lại Quiz
            </button>
            <button class="btn btn-primary" onclick="window.goToHandbook()">
              <i class="fa-solid fa-book-open"></i> Đọc Cẩm Nang 30s
            </button>
          </div>
        </div>
      `;
    }

    modal.classList.add("active");
  }

  window.restartQuiz = function() {
    state.quizCurrentIndex = 0;
    state.quizScore = 0;
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    renderQuiz();
  };

  window.goToHandbook = function() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    switchTab("handbook");
  };

  window.goToCertificateWithScore = function(score) {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    switchTab("certificate");
  };

  // =========================================================================
  // FEATURE 5: TẠO & CHIA SẺ CHỨNG NHẬN (CANVAS GENERATOR)
  // =========================================================================
  const certCanvas = document.getElementById("certificateCanvas");
  const certNameInput = document.getElementById("certStudentName");
  const certSchoolInput = document.getElementById("certSchoolName");
  const certTitleSelect = document.getElementById("certHonorTitle");

  function drawCertificate() {
    if (!certCanvas) return;
    const ctx = certCanvas.getContext("2d");
    const width = 1200;
    const height = 800;
    certCanvas.width = width;
    certCanvas.height = height;

    const studentName = (certNameInput && certNameInput.value.trim()) || "NGUYỄN VĂN AN";
    const schoolName = (certSchoolInput && certSchoolInput.value.trim()) || "ĐẠI HỌC CÔNG NGHỆ GIAO THÔNG VẬN TẢI (UTT)";
    const honorTitle = (certTitleSelect && certTitleSelect.value) || "NGƯỜI MUA HÀNG TỈNH TÁO";
    const certCode = "SC-UTT-2026-" + (Math.floor(1000 + Math.random() * 9000));

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#080c26");
    bgGrad.addColorStop(0.5, "#121948");
    bgGrad.addColorStop(1, "#070b22");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Geometric Cyber Grid / Glow accents
    ctx.strokeStyle = "rgba(37, 99, 235, 0.15)";
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, height - 40);
      ctx.stroke();
    }

    // 3. Elegant Outer Double Border
    ctx.strokeStyle = "#ff6b00";
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, width - 84, height - 84);

    // Decorative Corners
    const cornerSize = 24;
    ctx.fillStyle = "#ff6b00";
    ctx.fillRect(24, 24, cornerSize, cornerSize);
    ctx.fillRect(width - 48, 24, cornerSize, cornerSize);
    ctx.fillRect(24, height - 48, cornerSize, cornerSize);
    ctx.fillRect(width - 48, height - 48, cornerSize, cornerSize);

    // 4. Header: SMART CLICK & Slogan
    ctx.textAlign = "center";

    // Logo icon or tag
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 20px 'Outfit', sans-serif";
    ctx.fillText("UNIVERSITY OF TRANSPORT TECHNOLOGY  •  SMART CLICK 2026", width / 2, 95);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 48px 'Outfit', sans-serif";
    ctx.fillText("CHỨNG NHẬN ĐIỆN TỬ", width / 2, 160);

    ctx.fillStyle = "#ff6b00";
    ctx.font = "800 22px 'Outfit', sans-serif";
    ctx.fillText("“CLICK KHÔN NGOAN – MUA AN TOÀN”", width / 2, 205);

    // 5. Honoree presentation text
    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Chứng nhận đồng hành cùng chiến dịch Tiêu dùng Thông minh trao tặng cho:", width / 2, 270);

    // 6. Student Name (Hero element with dynamic font autoscaling)
    let studentFontSize = 50;
    ctx.font = `900 ${studentFontSize}px 'Outfit', sans-serif`;
    while (ctx.measureText(studentName.toUpperCase()).width > (width - 260) && studentFontSize > 26) {
      studentFontSize -= 2;
      ctx.font = `900 ${studentFontSize}px 'Outfit', sans-serif`;
    }
    const studentWidth = ctx.measureText(studentName.toUpperCase()).width;
    ctx.fillStyle = "#ff8800";
    ctx.fillText(studentName.toUpperCase(), width / 2, 345);

    // Underline sized precisely to student name
    const underlineHalf = Math.min(Math.max(studentWidth / 2 + 25, 120), width / 2 - 80);
    ctx.strokeStyle = "#ff6b00";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width / 2 - underlineHalf, 365);
    ctx.lineTo(width / 2 + underlineHalf, 365);
    ctx.stroke();

    // 7. University / Class with autoscaling
    let schoolFontSize = 24;
    ctx.font = `bold ${schoolFontSize}px 'Plus Jakarta Sans', sans-serif`;
    while (ctx.measureText(schoolName).width > (width - 220) && schoolFontSize > 16) {
      schoolFontSize -= 1;
      ctx.font = `bold ${schoolFontSize}px 'Plus Jakarta Sans', sans-serif`;
    }
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(schoolName, width / 2, 415);

    // 8. Honor Title Badge (Auto-fit badge width to text)
    const titleText = `DANH HIỆU: ${honorTitle.toUpperCase()}`;
    let titleFontSize = 24;
    ctx.font = `800 ${titleFontSize}px 'Outfit', sans-serif`;
    while (ctx.measureText(titleText).width > (width - 260) && titleFontSize > 18) {
      titleFontSize -= 1;
      ctx.font = `800 ${titleFontSize}px 'Outfit', sans-serif`;
    }
    const titleMetrics = ctx.measureText(titleText);
    const badgeWidth = Math.min(Math.max(titleMetrics.width + 60, 420), width - 160);
    const badgeX = (width - badgeWidth) / 2;

    ctx.fillStyle = "rgba(124, 58, 237, 0.4)";
    ctx.fillRect(badgeX, 455, badgeWidth, 60);
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 2;
    ctx.strokeRect(badgeX, 455, badgeWidth, 60);

    ctx.fillStyle = "#f8fafc";
    ctx.fillText(titleText, width / 2, 493);

    // Description text
    ctx.fillStyle = "#94a3b8";
    ctx.font = "italic 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Đã hoàn thành xuất sắc thử thách nhận diện bẫy lừa đảo và cam kết chia sẻ kinh nghiệm mua sắm an toàn.", width / 2, 560);

    // 9. Stamp & Footer signatures
    // Stamp circle
    ctx.save();
    ctx.translate(220, 670);
    ctx.rotate(-0.1);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.font = "800 12px 'Outfit', sans-serif";
    ctx.fillText("SMART CLICK • UTT", 0, -32);
    ctx.font = "900 18px 'Outfit', sans-serif";
    ctx.fillText("VERIFIED", 0, 6);
    ctx.font = "800 11px 'Outfit', sans-serif";
    ctx.fillText("CLICK AN TOÀN", 0, 35);
    ctx.restore();

    // Signatures
    ctx.textAlign = "center";
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("BAN CHỈ ĐẠO CHIẾN DỊCH", width - 240, 640);
    ctx.font = "italic 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#ff8800";
    ctx.fillText("Smart Click Community Hub", width - 240, 680);
    ctx.font = "500 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`Mã số: ${certCode} • Ngày cấp: ${new Date().toLocaleDateString('vi-VN')}`, width - 240, 715);
  }

  // Bind inputs to re-draw
  if (certNameInput) certNameInput.addEventListener("input", drawCertificate);
  if (certSchoolInput) certSchoolInput.addEventListener("input", drawCertificate);
  if (certTitleSelect) certTitleSelect.addEventListener("change", drawCertificate);

  // Download Certificate
  const downloadCertBtn = document.getElementById("downloadCertBtn");
  if (downloadCertBtn && certCanvas) {
    downloadCertBtn.addEventListener("click", () => {
      drawCertificate();
      const link = document.createElement("a");
      link.download = `SmartClick-ChungNhan-${(certNameInput.value || "SinhVien").replace(/\s+/g, "_")}.png`;
      link.href = certCanvas.toDataURL("image/png");
      link.click();
      fireConfetti();
      playSound("success");
      showToast("Đã tải ảnh Chứng nhận về máy của bạn!", "fa-download");
    });
  }

  // Share Certificate
  const shareCertBtn = document.getElementById("shareCertBtn");
  if (shareCertBtn) {
    shareCertBtn.addEventListener("click", () => {
      const shareText = `Tôi vừa đạt chứng nhận "${certTitleSelect.value}" tại Smart Click! Click khôn ngoan – Mua an toàn, đừng để bị dính bẫy review ảo nhé anh em sinh viên ơi!\n\n#ClickKhonNgoanMuaAnToan #SinhVienTieuDungThongMinh #CheckTruocKhiMua #SmartClick #KhoanCheckDa`;
      navigator.clipboard.writeText(shareText).then(() => {
        showToast("Đã copy caption & hashtag chiến dịch vào khay nhớ tạm!", "fa-copy");
        fireConfetti();
        playSound("pop");
      }).catch(() => {
        showToast("Đã chuẩn bị nội dung chia sẻ!", "fa-share-nodes");
      });
    });
  }

  // =========================================================================
  // FEATURE 6: CẨM NANG MUA SẮM 30S & DEAL RISK CALCULATOR
  // =========================================================================
  function renderChecklist() {
    const container = document.getElementById("checklistStepsContainer");
    if (!container) return;

    container.innerHTML = window.SMARTCLICK_DATA.checklist.map((item, idx) => {
      const isChecked = state.checklistProgress[idx];
      return `
        <div class="checklist-step-item ${isChecked ? 'checked' : ''}" onclick="window.toggleChecklist(${idx})">
          <div class="check-box-circle">
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="step-details">
            <h4 class="step-title">Bước ${item.step}: ${item.title}</h4>
            <p class="step-desc">${item.desc}</p>
          </div>
        </div>
      `;
    }).join("");

    updateChecklistProgressUI();
  }

  window.toggleChecklist = function(idx) {
    state.checklistProgress[idx] = !state.checklistProgress[idx];
    localStorage.setItem("smartclick_checklist", JSON.stringify(state.checklistProgress));
    renderChecklist();
    playSound("pop");
  };

  function updateChecklistProgressUI() {
    const checkedCount = state.checklistProgress.filter(Boolean).length;
    const countEl = document.getElementById("checklistDoneCount");
    if (countEl) countEl.textContent = `${checkedCount}/5 bước hoàn tất`;
    if (checkedCount === 5) {
      fireConfetti();
      showToast("Tuyệt vời! Bạn đã trang bị trọn bộ 5 bước phòng vệ!", "fa-shield-halved");
    }
  }

  // Render Flashcards 3D
  function renderFlashcards() {
    const container = document.getElementById("flashcardsGrid");
    if (!container) return;

    container.innerHTML = window.SMARTCLICK_DATA.tricks.map(trick => `
      <div class="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="trick-icon">
              <i class="fa-solid ${trick.icon}"></i>
            </div>
            <h4>${trick.title}</h4>
            <p>${trick.short}</p>
            <span class="flip-hint"><i class="fa-solid fa-rotate"></i> Chạm để lật bài học</span>
          </div>
          <div class="flip-card-back">
            <h5><i class="fa-solid fa-triangle-exclamation"></i> Bẫy gian thương:</h5>
            <p>${trick.backContent}</p>
            <div class="counter-tip">
              <strong>💡 Cách hóa giải:</strong> ${trick.counterMeasure}
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // DEAL RISK CALCULATOR
  function updateCalculator() {
    const discountInput = document.getElementById("calcDiscount");
    const shopAgeSelect = document.getElementById("calcShopAge");
    const photoReviewSelect = document.getElementById("calcPhotoReview");
    const paymentMethodSelect = document.getElementById("calcPaymentMethod");

    if (!discountInput || !shopAgeSelect || !photoReviewSelect || !paymentMethodSelect) return;

    const discountVal = parseInt(discountInput.value) || 0;
    document.getElementById("discountDisplayVal").textContent = `${discountVal}%`;

    let risk = 5; // Base risk

    // Discount factor
    if (discountVal > 75) risk += 45;
    else if (discountVal > 50) risk += 25;
    else if (discountVal > 30) risk += 10;

    // Shop age factor
    risk += parseInt(shopAgeSelect.value) || 0;

    // Photo review factor
    risk += parseInt(photoReviewSelect.value) || 0;

    // Payment method factor
    risk += parseInt(paymentMethodSelect.value) || 0;

    // Cap at 99%
    risk = Math.min(Math.max(risk, 5), 98);

    const scoreEl = document.getElementById("meterRiskScore");
    const circleEl = document.getElementById("meterCircle");
    const verdictEl = document.getElementById("meterVerdict");
    const adviceEl = document.getElementById("meterAdvice");

    scoreEl.textContent = `${risk}%`;

    if (risk < 30) {
      circleEl.style.background = "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0.05) 100%)";
      circleEl.style.border = "3px solid var(--status-safe)";
      scoreEl.style.color = "var(--status-safe)";
      verdictEl.textContent = "🟢 DEAL AN TOÀN - ĐỘ TIN CẬY CAO";
      verdictEl.style.color = "var(--status-safe)";
      adviceEl.textContent = "Các chỉ số đều trong ngưỡng lành mạnh. Vẫn nhớ quay video khi unbox hàng bạn nhé!";
    } else if (risk < 65) {
      circleEl.style.background = "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.05) 100%)";
      circleEl.style.border = "3px solid var(--status-warning)";
      scoreEl.style.color = "var(--status-warning)";
      verdictEl.textContent = "🟡 CẦN CÂN NHẮC - RỦI RO TRUNG BÌNH";
      verdictEl.style.color = "var(--status-warning)";
      adviceEl.textContent = "Hãy lọc vào review 1 sao và nhắn tin hỏi shop hình chụp thật tại kho trước khi bấm đặt hàng!";
    } else {
      circleEl.style.background = "radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.05) 100%)";
      circleEl.style.border = "3px solid var(--status-danger)";
      scoreEl.style.color = "var(--status-danger)";
      verdictEl.textContent = "🔴 CỰC KỲ NGUY HIỂM - NGUY CƠ LỪA ĐẢO CAO";
      verdictEl.style.color = "var(--status-danger)";
      adviceEl.textContent = "KHOAN, DỪNG LẠI! Mức giảm giá bất thường hoặc yêu cầu ngoài sàn này 90% là bẫy giăng cho sinh viên!";
    }
  }

  // Bind calculator inputs
  ["calcDiscount", "calcShopAge", "calcPhotoReview", "calcPaymentMethod"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateCalculator);
  });

  // =========================================================================
  // INITIALIZE APP
  // =========================================================================
  renderSurveyUI();
  renderShops();
  renderDramaPosts();
  renderFlashcards();
  renderChecklist();
  updateCalculator();

  // Draw initial certificate canvas once fonts ready
  if (document.fonts) {
    document.fonts.ready.then(() => {
      drawCertificate();
    });
  } else {
    setTimeout(drawCertificate, 500);
  }
});
