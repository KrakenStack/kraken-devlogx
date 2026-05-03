---
title: GokrakensDocs
---

{{% blocks/cover height="full td-below-navbar" class="hero-cover" %}}

<h1 class="terminal-title">
  <span id="type-text"></span><span class="cursor">_</span>
</h1>

{{% /blocks/cover %}}

<!-- 磨砂终端打字 + 视差效果 -->
<style>
  /* ========== 终端区域全局样式 ========== */
  .terminal-wrapper {
    text-align: center;
    margin: 1rem 0;
    z-index: 10;
    position: relative;
  }

  .terminal-card {
    display: inline-block;
    max-width: 88vw;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 32px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    padding: 0.25rem 0.25rem;
  }

  #type-text {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 1.3rem;
    line-height: 1.6;
    color: #aaffdd;
    text-shadow: 0 0 5px #0fa;
    white-space: pre-wrap;
    word-break: break-word;
    padding: 1rem 2rem;
    margin: 0;
    text-align: left;
    display: inline-block;
    min-width: 200px;
  }

  /* 光标效果 */
  #type-text::after {
    content: "_";
    animation: blink 0.9s step-end infinite;
    margin-left: 3px;
    font-weight: 700;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* 移动端适配 */
  @media (max-width: 640px) {
    #type-text {
      font-size: 1rem;
      padding: 0.8rem 1.2rem;
    }
    .terminal-card {
      max-width: 94vw;
    }
  }
</style>

<script>
  (function() {
    // 确保 DOM 加载完成后再执行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

    function init() {
      // ---------- 1. 创建/获取终端容器 ----------
      let typeTextEl = document.getElementById('type-text');
      
      if (!typeTextEl) {
        // 查找合适的内容容器（优先 hero 区域）
        let heroContainer = document.querySelector('.hero-content') || 
                            document.querySelector('#td-cover-block-0 .container');
        
        if (heroContainer) {
          // 清空原有内容（保留磨砂终端效果）
          heroContainer.innerHTML = '';
          
          // 创建两层包裹：wrapper -> card -> #type-text
          const wrapper = document.createElement('div');
          wrapper.className = 'terminal-wrapper';
          const card = document.createElement('div');
          card.className = 'terminal-card';
          const pre = document.createElement('div');
          pre.id = 'type-text';
          
          card.appendChild(pre);
          wrapper.appendChild(card);
          heroContainer.appendChild(wrapper);
          
          typeTextEl = pre;
        } else {
          // 保底：在页面中央生成一个悬浮终端
          const body = document.body;
          const wrapper = document.createElement('div');
          wrapper.style.position = 'fixed';
          wrapper.style.bottom = '30%';
          wrapper.style.left = '50%';
          wrapper.style.transform = 'translateX(-50%)';
          wrapper.style.zIndex = '9999';
          wrapper.className = 'terminal-wrapper';
          
          const card = document.createElement('div');
          card.className = 'terminal-card';
          const pre = document.createElement('div');
          pre.id = 'type-text';
          
          card.appendChild(pre);
          wrapper.appendChild(card);
          body.appendChild(wrapper);
          
          typeTextEl = pre;
        }
      }
      
      // ---------- 2. 打字内容 ----------
      const logs = [
        "别担心被 AI 干掉，担心隔壁工位用 Copilot 的人。",
        "system online",
        "boot sequence initialized"
      ];
      
      let i = 0;
      
      function typeLine(line, cb) {
        let j = 0;
        // 非第一行时，先换行
        if (typeTextEl.innerHTML.length > 0) {
          typeTextEl.innerHTML += "\n";
        }
        
        function typing() {
          if (j < line.length) {
            typeTextEl.innerHTML += line[j++];
            setTimeout(typing, 35);
          } else {
            cb && cb();
          }
        }
        
        typing();
      }
      
      function run() {
        if (i < logs.length) {
          setTimeout(() => {
            typeLine(logs[i], () => {
              i++;
              run();
            });
          }, 250);
        }
      }
      
      run();
      
      // ---------- 3. 鼠标视差效果（保留原有） ----------
      document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;
        const cover = document.getElementById("td-cover-block-0");
        if (cover) {
          cover.style.setProperty("--x", x + "px");
          cover.style.setProperty("--y", y + "px");
        }
      });
    }
  })();
</script>

<script>
document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector("#td-cover-block-0");
  if (!hero) return;

  /* =========================
     创建双层背景（关键）
  ========================= */

  let layerA = document.createElement("div");
  let layerB = document.createElement("div");


  layerA.className = "bg-layer";
  layerB.className = "bg-layer";

  hero.prepend(layerA);
  hero.prepend(layerB);

  const images = [
    "images/bg/55170037873_a8099c72b0_o.jpg",
    "images/bg/55176825916_645efbea74_o.jpg",
    "images/bg/55176828541_4718379ed0_o.jpg",
    "images/bg/55176997903_caef369503_o.jpg"
  ];

  let index = 0;
  let current = layerA;
  let next = layerB;

  current.style.backgroundImage = `url(${images[0]})`;

  setInterval(() => {

    index = (index + 1) % images.length;

    next.style.backgroundImage = `url(${images[index]})`;

    // 交叉淡入淡出（无黑屏）
    next.style.opacity = 1;
    current.style.opacity = 0;

    // 交换层
    const temp = current;
    current = next;
    next = temp;

  }, 3000);

});
</script>