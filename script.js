// GET ELEMENTS

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

const backToDashboard = document.getElementById("backToDashboard");


// OPEN / CLOSE SIDEBAR

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("change");

    sidebar.classList.toggle("open");

    sidebarOverlay.classList.toggle("show");

});


// FUNCTION TO CLOSE SIDEBAR

function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    menuBtn.classList.remove("change");

}


// CLOSE WHEN CLICKING OUTSIDE

sidebarOverlay.addEventListener("click", closeSidebar);


// PAGE NAVIGATION

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const pageID = item.getAttribute("data-page");


        // HIDE ALL PAGES

        pages.forEach((page) => {

            page.classList.remove("active-page");

        });


        // SHOW SELECTED PAGE

        const selectedPage =
            document.getElementById(pageID);

        selectedPage.classList.add("active-page");


        // REMOVE ACTIVE STYLE
        // FROM ALL MENU ITEMS

        navItems.forEach((nav) => {

            nav.classList.remove("active");

        });


        // ADD ACTIVE STYLE
        // TO SELECTED ITEM

        item.classList.add("active");


        // CLOSE MENU

        closeSidebar();

    });

});


// BACK TO DASHBOARD

backToDashboard.addEventListener("click", () => {

    // HIDE ALL PAGES

    pages.forEach((page) => {

        page.classList.remove("active-page");

    });


    // SHOW DASHBOARD

    document
        .getElementById("dashboardPage")
        .classList.add("active-page");


    // UPDATE SIDEBAR ACTIVE BUTTON

    navItems.forEach((nav) => {

        nav.classList.remove("active");

    });


    document
        .querySelector(
            '[data-page="dashboardPage"]'
        )
        .classList.add("active");


    closeSidebar();

});


// EXPAND / MINIMIZE CARDS

const expandButtons =
    document.querySelectorAll(".expand-btn");


expandButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".card");


        card.classList.toggle("expanded");


        if (card.classList.contains("expanded")) {

            button.textContent = "✕";

            document.body.classList.add(
                "no-scroll"
            );

        }

        else {

            button.textContent = "⛶";

            document.body.classList.remove(
                "no-scroll"
            );

        }

    });

});


// CAMERA PLAY BUTTON

const playButton =
    document.querySelector(".play-button");

const camera =
    document.querySelector(".camera");


playButton.addEventListener("click", () => {

    camera.classList.toggle("playing");


    if (camera.classList.contains("playing")) {

        playButton.textContent = "❚❚";

    }

    else {

        playButton.textContent = "▶";

    }

});


// DEMO SYSTEM STATUS

const statusText =
    document.querySelector(".online-status span:last-child");

const statusDot =
    document.querySelector(".status-dot");


// FOR NOW THIS IS DEMO ONLY

let systemOnline = true;


function updateSystemStatus() {

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


// WATER QUALITY

const temperatureElement =
    document.getElementById("temperature");

const tdsElement =
    document.getElementById("tds");

const phElement =
    document.getElementById("ph");


// UPDATE WATER QUALITY VALUES

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