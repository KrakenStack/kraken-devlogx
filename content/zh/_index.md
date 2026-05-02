<<<<<<< HEAD
<!-- 
TODO: 把下面这篇技术博客翻译成中文：
  要求：
      1. 保留 Markdown 格式
      2. 技术术语保持专业
      3. 语气自然 
-->

{{% blocks/cover title="欢迎来到 GokrakensDocs：GokrakensDocs 项目！" height="full td-below-navbar" image_anchor="top" %}}

{{% _param description %}} {.display-6}
=======
---
title: GokrakensDocs
---

{{% blocks/cover height="full td-below-navbar" class="hero-cover" %}}

<h1 class="terminal-title">
  <span id="type-text"></span><span class="cursor">_</span>
</h1>
>>>>>>> release

了解更多 获取代码 {{% _param FA brands github "" %}}
{{% blocks/link-down color="info" %}}

{{% /blocks/cover %}}

<script>
document.addEventListener("DOMContentLoaded", function () {

<<<<<<< HEAD
Goldydocs 提供了一个统一的 Web UI，用于展示诸如粥的温度、椅子的尺寸以及床铺柔软度等指标！你甚至可以查看是谁动了你的粥。

（遗憾的是，Goldydocs 并不是一个真实项目，但你可以将本网站作为示例，基于 Docsy 构建你自己的实际项目网站。）
=======
  const logs = [
    "别担心被 AI 干掉，担心隔壁工位用 Copilot 的人。",
    "system online",
    "boot sequence initialized"
  ];

  const el = document.getElementById("type-text");
>>>>>>> release

  let i = 0;

  function typeLine(line, cb) {
    let j = 0;

<<<<<<< HEAD
{{% blocks/feature title="全新椅子指标！" icon="fa-lightbulb" %}}

请持续关注此处以获取最新更新！
=======
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
>>>>>>> release

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

<<<<<<< HEAD
{{% blocks/feature title="欢迎贡献！" icon="fab fa-github" url="https://github.com/google/docsy-example" %}}

我们在 GitHub 上采用 Pull Request 工作流进行协作开发，欢迎新用户参与贡献！
=======
  run();

  /* =========================
     mouse parallax
  ========================= */
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
>>>>>>> release

    const cover = document.getElementById("td-cover-block-0");

<<<<<<< HEAD
{{% blocks/feature title="关注我们的 X 平台！" icon="fab fa-x-twitter" url="https://x.com/docsydocs" %}}

用于发布最新功能和相关公告。
=======
    if (cover) {
      cover.style.setProperty("--x", x + "px");
      cover.style.setProperty("--y", y + "px");
    }
  });

});
</script>
>>>>>>> release

<script>
document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector("#td-cover-block-0");
  if (!hero) return;

  /* =========================
     创建双层背景（关键）
  ========================= */

<<<<<<< HEAD
这是第二个区块
=======
  let layerA = document.createElement("div");
  let layerB = document.createElement("div");
>>>>>>> release

  layerA.className = "bg-layer";
  layerB.className = "bg-layer";

  hero.prepend(layerA);
  hero.prepend(layerB);

<<<<<<< HEAD
这是另一个居中对齐的区块
=======
  const images = [
    "/images/bg/55170037873_a8099c72b0_o.jpg",
    "/images/bg/55176825916_645efbea74_o.jpg",
    "/images/bg/55176828541_4718379ed0_o.jpg",
    "/images/bg/55176997903_caef369503_o.jpg"
  ];
>>>>>>> release

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