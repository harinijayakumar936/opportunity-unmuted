const views = ["listen", "episode", "find", "ask", "about"];
const savedQuestionsKey = "unmutedQuestions";

let selectedCategory = "All";
let shownEpisode = null;

function topicTag(topic) {
  if (topic === "Wellbeing") {
    return `<span class="tag tag-wellbeing">Wellbeing</span>`;
  }
  return `<span class="tag tag-opportunity">Opportunity</span>`;
}

function helpBoxHtml() {
  return `
    <aside class="help-box" aria-label="Need help right now?">
      <h2>Need help right now?</h2>
      <p>Free, private, any time, day or night.</p>
      <div class="help-actions">
        <a class="button button-help" href="tel:988">Call 988</a>
        <a class="button button-help" href="sms:988">Text 988</a>
        <a class="button button-help" href="sms:741741?&amp;body=HOME">Text HOME to 741741</a>
      </div>
      <p class="help-danger">If you're in danger, call <a href="tel:911">911</a>.</p>
    </aside>
  `;
}

function showHelpBoxes() {
  document.querySelectorAll(".help-slot").forEach(function (slot) {
    slot.innerHTML = helpBoxHtml();
  });
}

function makeEpisodeCard(episode) {
  return `
    <li>
      <a class="card episode-card" href="#episode-${episode.id}">
        <p class="episode-number">Episode ${episode.id}</p>
        <h2 class="episode-title">${episode.title}</h2>
        <p class="episode-meta">
          <span>${episode.host}</span>
          <span aria-hidden="true">·</span>
          <span>${episode.minutes} min</span>
          ${topicTag(episode.topic)}
        </p>
      </a>
    </li>
  `;
}

function showEpisodes() {
  // newest episodes first
  const newestFirst = episodes.slice().sort(function (a, b) {
    return b.id - a.id;
  });

  let html = "";
  newestFirst.forEach(function (episode) {
    html += makeEpisodeCard(episode);
  });
  document.getElementById("episode-list").innerHTML = html;
}

function makeResourceCard(resource) {
  return `
    <li class="card resource-card">
      <p class="resource-category">${resource.category}</p>
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <p class="how-to"><strong>How to get it:</strong> ${resource.howToGetIt}</p>
    </li>
  `;
}

function resourcesForEpisode(episode) {
  return resources.filter(function (resource) {
    return episode.resourceCategories.includes(resource.category);
  });
}

function showEpisodePage(id) {
  const episode = episodes.find(function (item) {
    return item.id === id;
  });
  const page = document.getElementById("view-episode");

  if (!episode) {
    shownEpisode = null;
    page.innerHTML = `
      <a class="back-link" href="#listen">Back to all episodes</a>
      <h1 class="view-heading" tabindex="-1">Episode not found</h1>
      <p class="intro">That episode doesn't exist yet. Check out the ones we have.</p>
    `;
    return;
  }

  shownEpisode = episode;

  let notesHtml = "";
  episode.notes.forEach(function (note) {
    notesHtml += `<li>${note}</li>`;
  });

  let resourcesHtml = "";
  resourcesForEpisode(episode).forEach(function (resource) {
    resourcesHtml += makeResourceCard(resource);
  });

  let wellbeingHtml = "";
  if (episode.topic === "Wellbeing") {
    wellbeingHtml = helpBoxHtml();
  }

  let reviewedHtml = "";
  if (episode.topic === "Wellbeing") {
    reviewedHtml = `<p class="reviewed">Reviewed by a school counselor</p>`;
  }

  page.innerHTML = `
    <a class="back-link" href="#listen">Back to all episodes</a>
    ${wellbeingHtml}
    <p class="episode-number">Episode ${episode.id}</p>
    <h1 class="view-heading episode-page-title" tabindex="-1">${episode.title}</h1>
    <p class="episode-meta">
      <span>${episode.host}</span>
      <span aria-hidden="true">·</span>
      <span>${episode.minutes} min</span>
      ${topicTag(episode.topic)}
    </p>
    ${reviewedHtml}
    <button id="episode-play-button" class="button button-primary play-button" type="button">Play episode</button>
    <h2>Show notes</h2>
    <ul class="show-notes">${notesHtml}</ul>
    <h2>Resources from this episode</h2>
    <ul class="card-list">${resourcesHtml}</ul>
  `;

  document.getElementById("episode-play-button").addEventListener("click", function () {
    playEpisode(episode);
  });
  updateEpisodePlayButton();
}

function updateEpisodePlayButton() {
  const button = document.getElementById("episode-play-button");
  if (!button || shownEpisode === null) {
    return;
  }
  if (shownEpisode.audio === "") {
    button.textContent = "Audio coming soon";
    button.disabled = true;
  } else if (isPlaying(shownEpisode)) {
    button.textContent = "Pause episode";
  } else {
    button.textContent = "Play episode";
  }
}

function showCategoryButtons() {
  let html = "";
  categories.forEach(function (category) {
    html += `<button class="filter-button" type="button" data-category="${category}" aria-pressed="false">${category}</button>`;
  });

  const group = document.getElementById("category-buttons");
  group.innerHTML = html;

  group.querySelectorAll(".filter-button").forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.category;
      showResources();
    });
  });
}

function filterResources() {
  const searchText = document.getElementById("resource-search").value.trim().toLowerCase();

  return resources.filter(function (resource) {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const words = (resource.title + " " + resource.description).toLowerCase();
    const matchesSearch = words.includes(searchText);
    return matchesCategory && matchesSearch;
  });
}

function showResources() {
  const matches = filterResources();

  let html = "";
  matches.forEach(function (resource) {
    html += makeResourceCard(resource);
  });
  document.getElementById("resource-list").innerHTML = html;
  document.getElementById("no-results").hidden = matches.length > 0;

  let countText = "Showing " + matches.length + " resources";
  if (matches.length === 1) {
    countText = "Showing 1 resource";
  }
  document.getElementById("resource-count").textContent = countText;

  document.querySelectorAll(".filter-button").forEach(function (button) {
    const isSelected = button.dataset.category === selectedCategory;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function saveQuestion(question) {
  try {
    const saved = JSON.parse(localStorage.getItem(savedQuestionsKey) || "[]");
    saved.push(question);
    localStorage.setItem(savedQuestionsKey, JSON.stringify(saved));
    return true;
  } catch (error) {
    return false;
  }
}

function handleAskSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("ask-form");
  const message = document.getElementById("ask-message");
  const name = document.getElementById("ask-name");
  const error = document.getElementById("message-error");
  const thankYou = document.getElementById("thank-you");

  if (message.value.trim() === "") {
    error.hidden = false;
    message.setAttribute("aria-invalid", "true");
    message.setAttribute("aria-describedby", "message-error");
    message.focus();
    return;
  }

  error.hidden = true;
  message.removeAttribute("aria-invalid");
  message.removeAttribute("aria-describedby");

  let sender = name.value.trim();
  if (sender === "") {
    sender = "Anonymous";
  }

  const saved = saveQuestion({
    type: form.querySelector("input[name='type']:checked").value,
    message: message.value.trim(),
    name: sender,
    date: new Date().toISOString()
  });

  if (saved) {
    thankYou.textContent = "Thank you! Your message was saved. Keep listening for new episodes.";
  } else {
    thankYou.textContent = "Sorry, your message couldn't be saved on this device. Please try again later.";
  }
  thankYou.hidden = false;
  form.reset();
  thankYou.focus();
}

function showAbout() {
  document.getElementById("episode-count").textContent =
    episodes.length + " episodes so far, and more on the way.";
}

function showView(name) {
  views.forEach(function (view) {
    document.getElementById("view-" + view).hidden = view !== name;
  });

  // the episode page belongs to the Listen tab
  let activeTab = name;
  if (name === "episode") {
    activeTab = "listen";
  }

  document.querySelectorAll(".tab").forEach(function (tab) {
    if (tab.dataset.tab === activeTab) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

function handleRoute() {
  const page = location.hash.replace("#", "");

  if (page.startsWith("episode-")) {
    showEpisodePage(Number(page.replace("episode-", "")));
    showView("episode");
  } else if (views.includes(page) && page !== "episode") {
    showView(page);
  } else {
    showView("listen");
  }

  // hide the old thank-you note when coming back to the Ask tab
  if (page !== "ask") {
    document.getElementById("thank-you").hidden = true;
  }
}

function moveFocusToHeading() {
  const heading = document.querySelector(".view:not([hidden]) .view-heading");
  if (heading) {
    heading.focus();
  }
  window.scrollTo(0, 0);
}

let installPrompt = null;

function isInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}

function isIPhone() {
  const agent = navigator.userAgent;
  return agent.includes("iPhone") || agent.includes("iPad");
}

function wasInstallBannerClosed() {
  try {
    return localStorage.getItem("installBannerClosed") === "yes";
  } catch (error) {
    return false;
  }
}

function showInstallBanner(message, canInstall) {
  if (isInstalled() || wasInstallBannerClosed()) {
    return;
  }
  document.getElementById("install-text").textContent = message;
  document.getElementById("install-button").hidden = !canInstall;
  document.getElementById("install-banner").hidden = false;
}

function closeInstallBanner() {
  document.getElementById("install-banner").hidden = true;
  try {
    localStorage.setItem("installBannerClosed", "yes");
  } catch (error) {
    // if storage is blocked, the banner just shows again next time
  }
}

function installApp() {
  installPrompt.prompt();
  installPrompt.userChoice.then(function () {
    installPrompt = null;
    closeInstallBanner();
  });
}

function setUpInstallBanner() {
  // iPhones have no install button, so we explain the steps instead
  if (isIPhone()) {
    showInstallBanner("Get the app: open this page in Safari, tap Share, then Add to Home Screen.", false);
  }

  // Android and Chrome tell us when the app can be installed
  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    installPrompt = event;
    showInstallBanner("Get the app on your phone. It works offline too.", true);
  });

  window.addEventListener("appinstalled", closeInstallBanner);
  document.getElementById("install-button").addEventListener("click", installApp);
  document.getElementById("install-close").addEventListener("click", closeInstallBanner);
}

function registerServiceWorker() {
  // service workers only work on a real website, not when opening the file directly
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js");
  }
}

showHelpBoxes();
showEpisodes();
showCategoryButtons();
showResources();
showAbout();
handleRoute();
setUpInstallBanner();
registerServiceWorker();

document.getElementById("resource-search").addEventListener("input", showResources);
document.getElementById("ask-form").addEventListener("submit", handleAskSubmit);

window.addEventListener("hashchange", function () {
  handleRoute();
  moveFocusToHeading();
});
