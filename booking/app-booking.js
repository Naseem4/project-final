const seatsSection = document.getElementById("seatsSection");


// STEP 1
const formSection = document.getElementById("formSection");

const nameInput = document.getElementById("name");
const ageInput  = document.getElementById("age");
const phoneInput = document.getElementById("phone");
const ticketsInput = document.getElementById("tickets");

const doneBtn = document.getElementById("doneBtn");
const resetAllBtn = document.getElementById("resetAll");


//STEP 2
const showKeyPill = document.getElementById("showKeyPill");

const welcomeLine = document.getElementById("welcomeLine");
const hintLine = document.getElementById("hintLine");

const seatsGrid = document.getElementById("seatsGrid");

const confirmBtn = document.getElementById("confirmBtn");
const backBtn = document.getElementById("backBtn");


// modal
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const editBtn = document.getElementById("editBtn");
const finalConfirmBtn = document.getElementById("finalConfirmBtn");
const summaryBox = document.getElementById("summaryBox");


// Seats
const ROWS = 6;
const COLS = 5;

let selectedSeatId = null;
let selectedSeats = [];
let currentShowKey = null;


// seat ID
function seatIdFromIndex(i){
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const rowLetter = String.fromCharCode(65 + r);
    return `${rowLetter}${c + 1}`;
}


function getShowKey(){
    const name = nameInput.value.trim();
    const age  = ageInput.value.trim();
    const phone = phoneInput.value.trim();
    const tickets = ticketsInput.value.trim();

    if (age <= 12){ alert("Please bring an adult to reserve your cinema seats."); return null; }
    if (!name){ alert("Please enter your name"); return null; }
    if (!age){ alert("Please enter your age"); return null; }
    if (!phone){ alert("Please enter your phone number"); return null; }
    if (!tickets){ alert("Please enter number of tickets"); return null; }

    return `${phone}__${tickets}`;  //pk
}


resetAllBtn.addEventListener("click", () => {
    nameInput.value = "";
    ageInput.value = "";
    phoneInput.value = "";
    ticketsInput.value = "";
    showKeyPill.textContent = "No show selected";
});


// Step 1 → Step 2
doneBtn.addEventListener("click", () => {
    const key = getShowKey();
    if (!key) return;

    currentShowKey = key;
    showKeyPill.textContent = "Show selected";

    welcomeLine.textContent = `Please, ${nameInput.value} choose your seat.`;
    hintLine.textContent = "Tap any available seat to select it.";

    formSection.classList.add("hidden");
    seatsSection.classList.remove("hidden");

    selectedSeatId = null;
    selectedSeats = [];
    confirmBtn.disabled = true;
    renderSeats();
});


backBtn.addEventListener("click", () => {
    seatsSection.classList.add("hidden");
    formSection.classList.remove("hidden");
    selectedSeatId = null;
    selectedSeats = [];
    confirmBtn.disabled = true;
});


// Save data using localStorage
function loadReservedSeats(showKey){
    const raw = localStorage.getItem("bookings");
    if (!raw) return {};
    try {
        const all = JSON.parse(raw);
        return all[showKey] || {};
    } catch {
        return {};
    }
}
// Each seat has its own booking details.
function saveBooking(showKey, booking){
    let all = {};
    const raw = localStorage.getItem("bookings");
    if (raw) all = JSON.parse(raw);

    if (!all[showKey]) all[showKey] = {};
    all[showKey][booking.seatId] = booking;

    localStorage.setItem("bookings", JSON.stringify(all));
}


// Build seats
function renderSeats(){
    seatsGrid.innerHTML = "";
    const reservedMap = loadReservedSeats(currentShowKey);

    for (let i = 0; i < ROWS * COLS; i++){
        const seatId = seatIdFromIndex(i);
        const isReserved = !!reservedMap[seatId];

        const seat = document.createElement("button");
        seat.className = "seat " + (isReserved ? "reserved" : "available");
        seat.disabled = isReserved;
        seat.dataset.seatId = seatId;


        if (selectedSeats.includes(seatId) && !isReserved){
            seat.classList.add("selected");
        }

        seat.innerHTML = `
            <div class="chair"></div>
            <div class="stand"></div>
        `;

        seat.addEventListener("click", () => {
            if (isReserved) return;

            if (selectedSeats.includes(seatId)) {
                selectedSeats = selectedSeats.filter(s => s !== seatId);
            } else {
                if (selectedSeats.length >= Number(ticketsInput.value)) {
                    alert("You already selected the maximum number of seats");
                    return;
                }
                selectedSeats.push(seatId);
            }

            confirmBtn.disabled = selectedSeats.length !== Number(ticketsInput.value);
            renderSeats();
        });

        seatsGrid.appendChild(seat);
    }
}
// Modal
function openModal(){
    modalBackdrop.classList.remove("hidden");
    document.body.classList.add("no-scroll");
}

function closeModal(){
    modalBackdrop.classList.add("hidden");
    document.body.classList.remove("no-scroll");
}


// Summary modal
confirmBtn.addEventListener("click", () => {
    if (selectedSeats.length !== Number(ticketsInput.value)) return;

    summaryBox.innerHTML = `
        <div><strong>Name:</strong> ${nameInput.value}</div>
        <div><strong>Age:</strong> ${ageInput.value}</div>
        <div><strong>Phone:</strong> ${phoneInput.value}</div>
        <div><strong>Tickets:</strong> ${ticketsInput.value}</div>
        <hr>
        <div><strong>Seats:</strong> ${selectedSeats.join(", ")}</div>
    `;
    openModal();
});


// Final confirm
finalConfirmBtn.addEventListener("click", () => {

    selectedSeats.forEach(seatId => {
        saveBooking(currentShowKey, {
            name: nameInput.value,
            age: ageInput.value,
            phone: phoneInput.value,
            tickets: ticketsInput.value,
            seatId
        });
    });

    closeModal();
    selectedSeats = [];
    confirmBtn.disabled = true;
    renderSeats();

    seatsSection.classList.add("hidden");
    formSection.classList.remove("hidden");

    nameInput.value = "";
    ageInput.value = "";
    phoneInput.value = "";
    ticketsInput.value = "";

    showKeyPill.textContent = "No show selected";
});


document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});


modalClose.addEventListener("click", closeModal);
editBtn.addEventListener("click", closeModal);

