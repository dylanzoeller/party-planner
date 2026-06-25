const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2605-ftb-et-web-ft";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// ===== STATE =====
let events = [];
let selectedEvent = null;

// ===== FETCH ALL EVENTS =====
async function getEvents() {
  try {
    const res = await fetch(API);
    const json = await res.json();

    events = json.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

// ===== FETCH SINGLE EVENT =====
async function getEvent(id) {
  try {
    const res = await fetch(API + "/" + id);
    const json = await res.json();

    selectedEvent = json.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

// ===== COMPONENT: LIST ITEM =====
function EventListItem(event) {
  const $li = document.createElement("li");

  const $a = document.createElement("a");
  $a.href = "#selected";
  $a.textContent = event.name;

  $a.addEventListener("click", (e) => {
    e.preventDefault();
    getEvent(event.id);
  });

  $li.appendChild($a);
  return $li;
}

// ===== COMPONENT: LIST =====
function EventList() {
  const $ul = document.createElement("ul");

  events.forEach((event) => {
    $ul.appendChild(EventListItem(event));
  });

  return $ul;
}

// ===== COMPONENT: DETAILS =====
function EventDetails() {
  const $section = document.createElement("section");

  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to view details.";
    return $p;
  }

  const $h3 = document.createElement("h3");
  $h3.textContent = `${selectedEvent.name} #${selectedEvent.id}`;

  const $date = document.createElement("p");
  $date.textContent = selectedEvent.date;

  const $location = document.createElement("p");
  $location.textContent = selectedEvent.location;

  const $desc = document.createElement("p");
  $desc.textContent = selectedEvent.description;

  $section.append($h3, $date, $location, $desc);

  return $section;
}

// ===== RENDER =====
function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>

      <section id="selected">
        <h2>Party Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

// ===== INIT =====
async function init() {
  await getEvents();
  render();
}

init();
