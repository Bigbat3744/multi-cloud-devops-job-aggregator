const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const resultsCount = document.getElementById("results-count");
const resultsGrid = document.getElementById("results-grid");
const roleChipGroups = document.querySelectorAll('[data-filter-group="role"] .chip');
const seniorityChipGroups = document.querySelectorAll('[data-filter-group="seniority"] .chip');

let allJobs = [];
let activeQuery = "";
let activeRole = "all";
let activeSeniority = "all";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function inferSeniority(job) {
  const haystack = `${job.title || ""} ${job.description || ""}`.toLowerCase();

  if (/\b(senior|lead|principal|staff|architect)\b/.test(haystack)) {
    return "expert";
  }

  if (/\b(junior|graduate|entry[\s-]?level|intern)\b/.test(haystack)) {
    return "junior";
  }

  const years = [];
  const rangeRegex = /(\d{1,2})\s*(?:-|to)\s*(\d{1,2})\s*\+?\s*(?:years?|yrs?)/g;
  const singleRegex = /(\d{1,2})\+?\s*(?:years?|yrs?)/g;

  let rangeMatch = rangeRegex.exec(haystack);
  while (rangeMatch) {
    years.push(Number(rangeMatch[2]));
    rangeMatch = rangeRegex.exec(haystack);
  }

  let singleMatch = singleRegex.exec(haystack);
  while (singleMatch) {
    years.push(Number(singleMatch[1]));
    singleMatch = singleRegex.exec(haystack);
  }

  if (years.length > 0) {
    const maxYears = Math.max(...years);
    if (maxYears <= 2) {
      return "junior";
    }
    if (maxYears >= 6) {
      return "expert";
    }
    return "mid";
  }

  return "mid";
}

function inferRole(job) {
  const haystack = `${job.title || ""} ${job.description || ""}`.toLowerCase();

  if (/\b(security|cyber|infosec|iam|soc|penetration|vulnerability)\b/.test(haystack)) {
    return "security";
  }

  if (/\b(data|machine learning|mlops|analytics|data science|ai)\b/.test(haystack)) {
    return "data";
  }

  if (/\b(devops|sre|site reliability|platform|kubernetes|terraform|ci\/cd)\b/.test(haystack)) {
    return "devops";
  }

  if (/\b(cloud|aws|azure|gcp|google cloud)\b/.test(haystack)) {
    return "cloud";
  }

  if (/\b(software|frontend|backend|full[\s-]?stack|developer|engineer)\b/.test(haystack)) {
    return "software";
  }

  return "other";
}

function normalise(rawJob) {
  const normalised = {
    id: rawJob?.id ? String(rawJob.id) : crypto.randomUUID(),
    title: rawJob?.title || "Untitled role",
    company: rawJob?.company || "Unknown company",
    location: rawJob?.location || "Remote / Unspecified",
    description: rawJob?.description || "No description available.",
    url: rawJob?.url || "#",
    source: rawJob?.source || "Unknown",
    postedDate: rawJob?.posted_date || "",
    createdAt: rawJob?.created_at || "",
  };

  normalised.seniority = inferSeniority(normalised);
  normalised.role = inferRole(normalised);
  return normalised;
}

function applyFilters(jobs, query, role, seniority) {
  const searchTerm = query.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesQuery =
      !searchTerm ||
      `${job.title} ${job.company} ${job.location} ${job.description} ${job.source}`
        .toLowerCase()
        .includes(searchTerm);

    const matchesRole = role === "all" || job.role === role;
    const matchesSeniority = seniority === "all" || job.seniority === seniority;

    return matchesQuery && matchesRole && matchesSeniority;
  });
}

function formatSeniorityLabel(level) {
  if (level === "expert") {
    return "Expert";
  }
  if (level === "junior") {
    return "Junior";
  }
  return "Mid-level";
}

function renderLoading() {
  resultsCount.textContent = "Loading roles...";
  resultsGrid.innerHTML = '<article class="feedback-card">Searching for matching roles...</article>';
}

function renderError(message) {
  resultsCount.textContent = "0 roles found";
  resultsGrid.innerHTML = `<article class="feedback-card">${escapeHtml(message)}</article>`;
}

function renderJobs(jobs) {
  resultsCount.textContent = `${jobs.length} role${jobs.length === 1 ? "" : "s"} found`;

  if (jobs.length === 0) {
    resultsGrid.innerHTML =
      '<article class="feedback-card">No roles matched your current filters. Try a broader query.</article>';
    return;
  }

  resultsGrid.innerHTML = jobs
    .map((job) => {
      const safeTitle = escapeHtml(job.title);
      const safeCompany = escapeHtml(job.company);
      const safeLocation = escapeHtml(job.location);
      const safeSource = escapeHtml(job.source);
      const safeDescription = escapeHtml(job.description);
      const safeUrl = escapeHtml(job.url);
      const safeSeniority = escapeHtml(formatSeniorityLabel(job.seniority));

      return `
        <article class="job-card">
          <header class="job-card-header">
            <h3 class="job-title">${safeTitle}</h3>
            <span class="source-badge">${safeSource}</span>
          </header>
          <p class="job-meta">${safeCompany} · ${safeLocation}</p>
          <span class="seniority-pill seniority-${escapeHtml(job.seniority)}">${safeSeniority}</span>
          <p class="job-description">${safeDescription}</p>
          <a class="job-link" href="${safeUrl}" target="_blank" rel="noopener noreferrer">View Role →</a>
        </article>
      `;
    })
    .join("");
}

function refreshView() {
  const filtered = applyFilters(allJobs, activeQuery, activeRole, activeSeniority);
  renderJobs(filtered);
}

async function runSearch() {
  const query = searchInput.value.trim();
  activeQuery = query;

  renderLoading();

  try {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/jobs?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from API.");
    }

    const data = await response.json();
    const rawJobs = Array.isArray(data) ? data : data.jobs;
    allJobs = Array.isArray(rawJobs) ? rawJobs.map(normalise) : [];
    refreshView();
  } catch (error) {
    console.error(error);
    renderError("Unable to load roles right now. Please try again in a moment.");
  }
}

function updateChipState(chips, activeValue) {
  chips.forEach((chip) => {
    const isActive = chip.dataset.value === activeValue;
    chip.classList.toggle("active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

roleChipGroups.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeRole = chip.dataset.value;
    updateChipState(roleChipGroups, activeRole);
    refreshView();
  });
});

seniorityChipGroups.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeSeniority = chip.dataset.value;
    updateChipState(seniorityChipGroups, activeSeniority);
    refreshView();
  });
});

searchButton.addEventListener("click", runSearch);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runSearch();
  }
});

runSearch();

