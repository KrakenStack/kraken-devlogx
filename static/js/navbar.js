document.addEventListener("DOMContentLoaded", function () {

    const images = [
        "images/bg/55176825916_645efbea74_o.jpg",
        "images/bg/55176997903_caef369503_o.jpg",
        "images/bg/55170037873_a8099c72b0_o.jpg"
    ];

    const container = document.querySelector("#td-cover-block-0");
    if (!container) return;

    let index = 0;

    function layer(src, active = false) {
        const div = document.createElement("div");
        div.className = "bg-layer";
        if (active) div.classList.add("active");
        div.style.backgroundImage = `url(${src})`;
        return div;
    }

    let current = layer(images[0], true);
    let next = layer(images[1], false);

    container.prepend(current);
    container.prepend(next);

    setInterval(() => {

        index = (index + 1) % images.length;

        const temp = current;
        current = next;
        next = temp;

        next.style.backgroundImage = `url(${images[index]})`;

        next.classList.add("active");
        current.classList.remove("active");

    }, 5000);

});