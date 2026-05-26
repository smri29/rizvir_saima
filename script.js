const TARGET_NAME = "madamji"; // Change to her actual name (lowercase)

// 1. MOUNTING LOGIC: Loads all pages dynamically into the mother page
async function loadPages() {
    const mountPoint = document.getElementById('mount-point');
    
    try {
        // Fetch all pages parallelly
        const [p1, p2, p3, p4] = await Promise.all([
            fetch('page1.html').then(res => res.text()),
            fetch('page2.html').then(res => res.text()),
            fetch('page3.html').then(res => res.text()),
            fetch('page4.html').then(res => res.text())
        ]);

        // Inject them into the mother page
        mountPoint.innerHTML = p1 + p2 + p3 + p4;

        // Initialize the elusive "No" button event listeners AFTER they are loaded
        setupNoButton();

    } catch (err) {
        console.error("Error mounting pages:", err);
    }
}

// 2. Navigation & Game Rules
function checkName() {
    const inputName = document.getElementById('name-input').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');

    if (inputName === TARGET_NAME) {
        nextPage(2);
    } else {
        errorMsg.innerText = "❌ Uh oh! That's not the name of my queen. Try again! 😘";
    }
}

function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageNumber}`).classList.add('active');
}

// 3. Elusive "No" Button setup
function setupNoButton() {
    const noBtn = document.getElementById('no-btn');
    if (!noBtn) return;

    function flee() {
        const x = Math.floor(Math.random() * 160) - 80;
        const y = Math.floor(Math.random() * 80) - 40;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    noBtn.addEventListener('mouseenter', flee);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        flee();
    });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Nice try! But 'No' is not an option. ❤️");
    });
}

// Start everything when the window loads
window.addEventListener('DOMContentLoaded', loadPages);