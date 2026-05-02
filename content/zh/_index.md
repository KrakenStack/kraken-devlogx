---
title: GokrakensDocs
---

{{% blocks/cover height="full td-below-navbar" class="hero-cover" %}}

<h1 class="terminal-title">
  <span id="type-text"></span><span class="cursor">_</span>
</h1>

{{% blocks/link-down color="info" %}}

{{% /blocks/cover %}}

<script>
document.addEventListener("DOMContentLoaded", function () {

  const logs = [
    "别担心被 AI 干掉，担心隔壁工位用 Copilot 的人。",
    "system online",
    "boot sequence initialized"
  ];

  const el = document.getElementById("type-text");

  let i = 0;

  function typeLine(line, cb) {
    let j = 0;

    el.innerHTML += "\n";

    function typing() {
      if (j < line.length) {
        el.innerHTML += line[j++];
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

  /* =========================
     mouse parallax
  ========================= */
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;

    const cover = document.getElementById("td-cover-block-0");

    if (cover) {
      cover.style.setProperty("--x", x + "px");
      cover.style.setProperty("--y", y + "px");
    }
  });

});
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
    "/images/bg/55170037873_a8099c72b0_o.jpg",
    "/images/bg/55176825916_645efbea74_o.jpg",
    "/images/bg/55176828541_4718379ed0_o.jpg",
    "/images/bg/55176997903_caef369503_o.jpg"
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