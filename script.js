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

        const card =
            button.closest(".card");


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

                expandedCard.classList.remove(
                    "expanded"
                );

                const expandedButton =
                    expandedCard.querySelector(
                        ".expand-btn"
                    );

                if (expandedButton) {

                    expandedButton.textContent =
                        "⛶";

                }

            });


        // If the clicked card wasn't expanded,
        // expand ONLY that card

        if (!isExpanded) {

            card.classList.add("expanded");

            button.textContent = "✕";

            document.body.classList.add(
                "no-scroll"
            );

        }

        else {

            document.body.classList.remove(
                "no-scroll"
            );

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


let systemOnline = true;


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


// INITIAL DEMO VALUES

updateWaterQuality(
    28.5,
    320,
    7.2
);