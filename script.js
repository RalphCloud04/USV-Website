// =========================================================
// GET ELEMENTS
// =========================================================

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const navItems =
    document.querySelectorAll(".nav-item");

const pages =
    document.querySelectorAll(".page");

const backToDashboard =
    document.getElementById("backToDashboard");

    // =========================================================
// GPS MAP - LEAFLET + OPENSTREETMAP
// =========================================================
let usvLatitude = 14.6627;
let usvLongitude = 120.9567;


// CREATE MAP

const gpsMap = L.map("map").setView(
    [usvLatitude, usvLongitude],
    16
);


// OPENSTREETMAP

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
).addTo(gpsMap);


// USV MARKER

const usvMarker = L.marker([
    usvLatitude,
    usvLongitude
]).addTo(gpsMap);

usvMarker.bindPopup(
    "<strong>USV Location</strong>"
);


// UPDATE USV LOCATION

function updateUSVLocation(
    latitude,
    longitude
) {

    usvLatitude = latitude;
    usvLongitude = longitude;

    // Move marker
    usvMarker.setLatLng([
        latitude,
        longitude
    ]);

    // Center map
    gpsMap.setView([
        latitude,
        longitude
    ]);

    // Update latitude
    const latitudeElement =
        document.getElementById("latitude");

    // Update longitude
    const longitudeElement =
        document.getElementById("longitude");

    if (latitudeElement) {
        latitudeElement.textContent =
            `${latitude.toFixed(4)}° N`;
    }

    if (longitudeElement) {
        longitudeElement.textContent =
            `${longitude.toFixed(4)}° E`;
    }
}


// =========================================================
// SIDEBAR
// =========================================================

function closeSidebar() {

    if (sidebar) {

        sidebar.classList.remove("open");

    }

    if (sidebarOverlay) {

        sidebarOverlay.classList.remove("show");

    }

    if (menuBtn) {

        menuBtn.classList.remove("change");

    }

}


if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        menuBtn.classList.toggle("change");

        sidebar.classList.toggle("open");

        sidebarOverlay.classList.toggle("show");

    });

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


// =========================================================
// PAGE NAVIGATION
// =========================================================

function showPage(pageID) {

    // Hide ALL pages first

    pages.forEach((page) => {

        page.classList.remove("active-page");

    });


    // Find the selected page

    const selectedPage =
        document.getElementById(pageID);


    // Stop if the page does not exist

    if (!selectedPage) {

        return;

    }


    // Show ONLY the selected page

    selectedPage.classList.add("active-page");


    // Update sidebar buttons

    navItems.forEach((nav) => {

        nav.classList.remove("active");

    });


    const selectedNav =
        document.querySelector(
            `[data-page="${pageID}"]`
        );


    if (selectedNav) {

        selectedNav.classList.add("active");

    }


    // Close sidebar

    closeSidebar();

}


// SIDEBAR BUTTONS

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const pageID =
            item.getAttribute("data-page");

        showPage(pageID);

    });

});


// =========================================================
// BACK TO DASHBOARD
// =========================================================

if (backToDashboard) {

    backToDashboard.addEventListener(
        "click",
        () => {

            showPage("dashboardPage");

        }
    );

}


 // =========================================================
 // EXPAND / MINIMIZE CARDS
 // =========================================================

const expandButtons =
    document.querySelectorAll(".expand-btn");

expandButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        if (!card) {
            return;
        }

        // Check if this card is already expanded
        const isExpanded =
            card.classList.contains("expanded");

        // Close ALL expanded cards first
        document
            .querySelectorAll(".card.expanded")
            .forEach((expandedCard) => {

                expandedCard.classList.remove("expanded");

                const expandedButton =
                    expandedCard.querySelector(".expand-btn");

                if (expandedButton) {
                    expandedButton.textContent = "⛶";
                }

            });

        // If the clicked card wasn't expanded,
        // expand ONLY that card
        if (!isExpanded) {

            card.classList.add("expanded");

            button.textContent = "✕";

            document.body.classList.add("no-scroll");

        } else {

            document.body.classList.remove("no-scroll");

        }

        // Resize the GPS map after the card transition
        if (card.id === "gps-location") {

            setTimeout(() => {

                if (typeof gpsMap !== "undefined" && gpsMap) {
                    gpsMap.invalidateSize();
                }

            }, 300);

        }

    });

});

// =========================================================
// CAMERA PLAY BUTTON
// =========================================================

const playButton =
    document.querySelector(".play-button");

const camera =
    document.querySelector(".camera");


if (playButton && camera) {

    playButton.addEventListener("click", () => {

        camera.classList.toggle("playing");


        if (
            camera.classList.contains("playing")
        ) {

            playButton.textContent = "❚❚";

        }

        else {

            playButton.textContent = "▶";

        }

    });

}


// =========================================================
// DEMO SYSTEM STATUS
// =========================================================

const statusText =
    document.querySelector(
        ".online-status span:last-child"
    );

const statusDot =
    document.querySelector(".status-dot");


let systemOnline = false;


function updateSystemStatus() {

    if (!statusText || !statusDot) {

        return;

    }


    if (systemOnline) {

        statusText.textContent =
            "System Online";

        statusDot.style.background =
            "#22c55e";

        statusDot.style.boxShadow =
            "0 0 8px #22c55e";

    }

    else {

        statusText.textContent =
            "System Offline";

        statusDot.style.background =
            "#ef4444";

        statusDot.style.boxShadow =
            "0 0 8px #ef4444";

    }

}


updateSystemStatus();


// =========================================================
// WATER QUALITY
// =========================================================

const temperatureElement =
    document.getElementById("temperature");

const tdsElement =
    document.getElementById("tds");

const phElement =
    document.getElementById("ph");


function updateWaterQuality(
    temperature,
    tds,
    ph
) {

    if (temperatureElement) {

        temperatureElement.textContent =
            `${temperature} °C`;

    }


    if (tdsElement) {

        tdsElement.textContent =
            `${tds} ppm`;

    }


    if (phElement) {

        phElement.textContent =
            ph;

    }

}


// LIVE SENSOR DATA FROM FLASK (same-origin /api/latest and /api/history)
const readingStatus = document.getElementById("reading-status");
const fmt = (value, digits=2) => value === null || value === undefined || !Number.isFinite(Number(value)) ? "--" : Number(value).toFixed(digits);
let lastReadingId = null;

function showConnectionState(label, online) {
    if (statusText) statusText.textContent = label;
    if (statusDot) {
        statusDot.style.background = online ? "#22c55e" : "#ef4444";
        statusDot.style.boxShadow = online ? "0 0 8px #22c55e" : "none";
    }
}

async function refreshLatest() {
    try {
        const response = await fetch("/api/latest", {cache:"no-store"});
        if (!response.ok) throw new Error(`API HTTP ${response.status}`);
        const data = await response.json();
        if (temperatureElement) temperatureElement.textContent = `${fmt(data.temperature)} °C`;
        if (tdsElement) tdsElement.textContent = `${fmt(data.tds)} ppm`;
        if (phElement) phElement.textContent = fmt(data.ph);
        const latitude = Number(data.latitude), longitude = Number(data.longitude);
        if (data.gps_valid === true && Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 && !(latitude === 0 && longitude === 0)) {
            updateUSVLocation(latitude, longitude);
        } else {
            document.getElementById("latitude").textContent = "No valid GPS fix";
            document.getElementById("longitude").textContent = "No valid GPS fix";
        }
        const ageMs = Date.now() - Date.parse(data.recorded_at);
        const fresh = Number.isFinite(ageMs) && ageMs >= -60000 && ageMs < 30000;
        showConnectionState(fresh ? "Recent data" : "Stale data", fresh);
        if (readingStatus) readingStatus.textContent = `Last reading: ${data.recorded_at ? new Date(data.recorded_at).toLocaleString() : "Unknown"} (stored data may be simulated)`;
        if (data.id !== lastReadingId) { lastReadingId = data.id; refreshHistory(); }
    } catch (error) {
        showConnectionState("API unavailable", false);
        if (readingStatus) readingStatus.textContent = `Unable to load readings: ${error.message}`;
    }
}

function renderSeries(selector, readings, key) {
    const chart = document.querySelector(selector);
    if (!chart) return;
    const line = chart.querySelector("polyline");
    if (!line) return;
    const values = readings.map(r => Number(r[key])).filter(Number.isFinite);
    const circles = [...chart.querySelectorAll("circle")];
    if (!values.length) { line.setAttribute("points", ""); circles.forEach(c => c.remove()); return; }
    const min = Math.min(...values), max = Math.max(...values);
    const span = Math.max(max-min, 0.1);
    const coords = values.map((v,i) => [55 + (values.length===1 ? 0 : i*515/(values.length-1)), 160 - (v-min)/span*120]);
    line.setAttribute("points", coords.map(([x,y])=>`${x},${y}`).join(" "));
    circles.forEach(c => c.remove());
    for (const [x,y] of coords) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx",x); dot.setAttribute("cy",y); dot.setAttribute("r",3);
        dot.setAttribute("class", selector.includes("temperature") ? "temperature-point" : selector.includes("tds") ? "tds-point" : "ph-point");
        chart.appendChild(dot);
    }
}

async function refreshHistory() {
    try {
        const response = await fetch("/api/history?limit=20", {cache:"no-store"});
        if (!response.ok) return;
        const rows = await response.json();
        if (!Array.isArray(rows)) return;
        const chronological = rows.slice().reverse();
        renderSeries(".temperature-line", chronological, "temperature");
        renderSeries(".tds-line", chronological, "tds");
        renderSeries(".ph-line", chronological, "ph");
        const first = chronological[0], last = chronological[chronological.length-1];
        for (const labels of document.querySelectorAll(".graph-labels")) {
            if (!first || !last) { labels.textContent = "No history yet"; continue; }
            labels.textContent = `${new Date(first.recorded_at).toLocaleString()} — ${new Date(last.recorded_at).toLocaleString()} (last ${rows.length} readings)`;
        }
    } catch (error) { console.error("History fetch failed:",error); }
}

// Initial refresh and subsequent polling. API availability is distinct from sensor freshness.
refreshLatest();
setInterval(refreshLatest, 2000);

 // =========================================================
 // WASTE COMPOSITION CHARTS
 // Starts at zero until actual waste data arrives
 // =========================================================

const wasteChartContainers = document.querySelectorAll(
    "#waste-report .chart-placeholder"
);

const dailyChart = wasteChartContainers[0] || null;
const monthlyChart = wasteChartContainers[1] || null;

const pieChart = document.querySelector(
    "#waste-report .pie-placeholder"
);

const wasteCounts = {
    Plastic: 0,
    Organic: 0,
    Paper: 0,
    Metal: 0,
    Other: 0
};

const wasteColors = {
    Plastic: "#3b82f6",
    Organic: "#22c55e",
    Paper: "#f59e0b",
    Metal: "#ef4444",
    Other: "#8b5cf6"
};


// =========================================================
// WASTE CHART STYLES
// =========================================================

const wasteStyle = document.createElement("style");

wasteStyle.textContent = `
    #waste-report .chart-placeholder {
        height: 180px;
        padding: 12px;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        gap: 8px;
        position: relative;
        overflow: hidden;
    }

    #waste-report .chart-placeholder::after {
        display: none !important;
    }

    #waste-report .waste-bar-group {
        flex: 1;
        height: 100%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 5px;
    }

    #waste-report .waste-bar {
        width: 70%;
        min-height: 0;
        border-radius: 5px 5px 0 0;
        background: #3b82f6;
        transition: height 0.3s ease;
    }

    #waste-report .waste-bar-label {
        font-size: 10px;
        white-space: nowrap;
    }

    #waste-report .waste-no-data {
        position: absolute;
        top: 8px;
        left: 0;
        right: 0;
        text-align: center;
        color: #64748b;
        font-size: 11px;
    }

    #waste-report .pie-placeholder {
        width: 220px;
        height: 220px;
        max-width: 100%;
        margin: 12px auto;
        border-radius: 50%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e2e8f0;
        box-shadow: none;
    }

    #waste-report .pie-placeholder::before,
    #waste-report .pie-placeholder::after {
        display: none !important;
    }

    #waste-report .waste-pie-center {
        position: absolute;
        inset: 25%;
        border-radius: 50%;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #64748b;
        font-size: 12px;
        font-weight: bold;
    }

    #waste-report .waste-legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px 14px;
        margin: 12px auto;
        font-size: 12px;
        color: #475569;
    }

    #waste-report .waste-legend-item {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    #waste-report .waste-legend-color {
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 3px;
    }
`;

document.head.appendChild(wasteStyle);


// =========================================================
// RENDER BAR GRAPHS
// =========================================================

function renderWasteBars(container, labels, values) {
    if (!container) return;

    container.innerHTML = "";

    const maximum = Math.max(...values, 1);

    labels.forEach((label, index) => {
        const value = Math.max(0, Number(values[index]) || 0);

        const group = document.createElement("div");
        group.className = "waste-bar-group";

        const bar = document.createElement("div");
        bar.className = "waste-bar";

        bar.style.height = value > 0
            ? `${(value / maximum) * 100}%`
            : "0";

        bar.title = `${label}: ${value} items`;

        const labelElement = document.createElement("span");
        labelElement.className = "waste-bar-label";
        labelElement.textContent = label;

        group.append(bar, labelElement);
        container.appendChild(group);
    });

    if (values.every(value => Number(value) === 0)) {
        const message = document.createElement("div");
        message.className = "waste-no-data";
        message.textContent = "Waiting for waste data";
        container.appendChild(message);
    }
}


// =========================================================
// RENDER PIE CHART AND LEGEND
// =========================================================

function renderWastePie() {
    if (!pieChart) return;

    // Remove the previous legend to prevent duplicates.
    const oldLegend = document.querySelector(
        "#waste-report .waste-legend"
    );

    if (oldLegend) oldLegend.remove();

    const total = Object.values(wasteCounts).reduce(
        (sum, count) => sum + count,
        0
    );

    pieChart.innerHTML = "";

    if (total === 0) {
        pieChart.style.background = "#e2e8f0";

        pieChart.innerHTML = `
            <div class="waste-pie-center">
                <span>No data</span>
                <span>0 items</span>
            </div>
        `;
    } else {
        let current = 0;
        const slices = [];

        for (const [type, count] of Object.entries(wasteCounts)) {
            if (count <= 0) continue;

            const start = current;
            current += (count / total) * 100;

            slices.push(
                `${wasteColors[type]} ${start}% ${current}%`
            );
        }

        pieChart.style.background =
            `conic-gradient(${slices.join(", ")})`;

        pieChart.innerHTML = `
            <div class="waste-pie-center">
                <span>${total}</span>
                <span>Total items</span>
            </div>
        `;
    }

    const legend = document.createElement("div");
    legend.className = "waste-legend";

    for (const [type, count] of Object.entries(wasteCounts)) {
        const percentage = total > 0
            ? ((count / total) * 100).toFixed(1)
            : "0.0";

        const item = document.createElement("div");
        item.className = "waste-legend-item";

        const color = document.createElement("span");
        color.className = "waste-legend-color";
        color.style.background = wasteColors[type];

        const label = document.createElement("span");
        label.textContent =
            `${type}: ${percentage}% (${count})`;

        item.append(color, label);
        legend.appendChild(item);
    }

    pieChart.insertAdjacentElement("afterend", legend);
}


// =========================================================
// UPDATE WASTE CHARTS
// =========================================================

function updateWasteCharts(dailyValues, monthlyValues) {
    renderWasteBars(
        dailyChart,
        ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"],
        dailyValues || [0, 0, 0, 0, 0]
    );

    renderWasteBars(
        monthlyChart,
        ["W1", "W2", "W3", "W4"],
        monthlyValues || [0, 0, 0, 0]
    );

    renderWastePie();
}


// =========================================================
// RECEIVE ACTUAL WASTE COUNTS
// =========================================================

// Call this function when your backend provides actual counts.
// Example:
// updateWasteCounts({
//     Plastic: 10,
//     Organic: 5,
//     Paper: 3,
//     Metal: 1,
//     Other: 1
// });

function updateWasteCounts(newCounts) {
    if (!newCounts || typeof newCounts !== "object") return;

    for (const type of Object.keys(wasteCounts)) {
        const value = Number(newCounts[type]);

        if (Number.isFinite(value) && value >= 0) {
            wasteCounts[type] = value;
        }
    }

    updateWasteCharts();
}


// Show the empty charts immediately.
updateWasteCharts();

// =========================================================
// CONTROLLER PAGE - SAFETY DEFAULTS
// =========================================================

// The controller interface is not connected to the thrusters.
// Keep all controls disabled until the backend is implemented.

const controllerPage = document.getElementById("controllerPage");

if (controllerPage) {

    controllerPage.querySelectorAll("button, input").forEach((control) => {
        control.disabled = true;
    });

}