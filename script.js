const TARGET_NAME = "madamji"; // Change to her actual name (lowercase)
let kabulCount = 0;

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

// 3. Page 2 "Kabul" Button Counter Logic
function handleKabulClick() {
    kabulCount++;
    const yesBtn = document.getElementById('yes-btn');
    
    if (kabulCount === 1) {
        yesBtn.innerHTML = "Kabul! ❤️ (1/3)";
    } else if (kabulCount === 2) {
        yesBtn.innerHTML = "Kabul!! 💖 (2/3)";
    } else if (kabulCount >= 3) {
        yesBtn.innerHTML = "Kabul!!! 💍 (3/3)";
        // Brief delay so she can process the 3/3 benchmark before moving to Page 3
        setTimeout(() => {
            nextPage(3);
        }, 400);
    }
}

// 4. Upgraded Elusive "No" Button setup (Zero Flickering)
function setupNoButton() {
    const noBtn = document.getElementById('no-btn');
    if (!noBtn) return;

    function flee() {
        // Keeps the wide leaps across her screen so it remains unclickable
        const x = Math.floor(Math.random() * 320) - 160; 
        const y = Math.floor(Math.random() * 160) - 80;  
        
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    noBtn.addEventListener('mouseenter', flee);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Stifles mobile tap execution
        flee();
    });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Kabul is destiny! 'No' doesn't work here. 😉❤️");
    });
}

// Start everything when the window loads
window.addEventListener('DOMContentLoaded', loadPages);