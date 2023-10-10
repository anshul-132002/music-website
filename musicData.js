// Mock async function to modify the URL
async function modifyUrl(url) {
  return new Promise((resolve) => {
    const modifiedUrl =
      url.replace(
        "https://open.spotify.com/track/",
        "https://open.spotify.com/embed/track/"
      ) + "?utm_source=generator&theme=0";
    resolve(modifiedUrl);
  });
}

async function renderMusicCards(data) {
  const musicContainer = document.querySelector(".music-grid");

  for (let item of data) {
    item.src = await modifyUrl(item.src);

    const musicItem = document.createElement("div");
    musicItem.className = "music-item";

    const des = document.createElement("div");
    des.className = "des";

    const iframe = document.createElement("iframe");
    Object.assign(iframe.style, {
      borderRadius: "12px",
      width: "100%",
      height: "352px",
      color:"black",
    });
    Object.assign(iframe, {
      src: item.src,
      frameBorder: "0",
      allowFullscreen: true,
      allow:
        "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
      loading: "lazy",
    });

    const p = document.createElement("p");
    p.textContent = "Suggested by " + item.suggestedBy;
    p.style.marginTop="0px";
    p.style.marginBottom = "10px";
    p.style.backgroundImage="linear-gradient(to right, crimson, pink, gold, orange, springgreen, blue)";
    p.style.webkitBackgroundClip="text";
    p.style.webkitTextFillColor="transparent";
    p.style.webkitAnimation="gradient 10s linear infinite";
    p.style.padding="5px";

    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // -webkit-animation: hue 60s infinite linear;

    des.appendChild(iframe);
    des.appendChild(p);
    musicItem.appendChild(des);
    musicContainer.appendChild(musicItem);
  }
}

// Fetch the JSON data from the file and then render the music cards
async function fetchAndRender() {
  try {
    const response = await fetch("./musicData.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    await renderMusicCards(data);
  } catch (error) {
    console.log("There was a problem:", error.message);
  }
}

fetchAndRender();
