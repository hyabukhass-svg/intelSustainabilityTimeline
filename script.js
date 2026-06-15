// Intel Summit Check-In App

const ATTENDANCE_GOAL = 50;

let totalAttendance = 0;

let teamCounts = {
  water: 0,
  netZero: 0,
  renewables: 0
};

let attendees = [];

// HTML elements
const nameInput = document.querySelector("#nameInput");
const teamSelect = document.querySelector("#teamSelect");
const checkInBtn = document.querySelector("#checkInBtn");

const greeting = document.querySelector("#greeting");
const attendanceCount = document.querySelector("#attendanceCount");
const progressBar = document.querySelector("#progressBar");

const waterCount = document.querySelector("#waterCount");
const netZeroCount = document.querySelector("#netZeroCount");
const renewablesCount = document.querySelector("#renewablesCount");

const celebrationMessage = document.querySelector("#celebrationMessage");
const attendeeList = document.querySelector("#attendeeList");
const resetBtn = document.querySelector("#resetBtn");

// Load saved progress
window.addEventListener("load", function () {
  const savedData = localStorage.getItem("intelSummitData");

  if (savedData) {
    const data = JSON.parse(savedData);

    totalAttendance = data.totalAttendance || 0;
    teamCounts = data.teamCounts || teamCounts;
    attendees = data.attendees || [];
  }

  updatePage();
});

// Check in attendee
checkInBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const team = teamSelect.value;

  if (name === "" || team === "") {
    greeting.textContent = "Please enter your name and select a team.";
    return;
  }

  totalAttendance++;

  if (team === "Team Water Wise") {
    teamCounts.water++;
  } else if (team === "Team Net Zero") {
    teamCounts.netZero++;
  } else if (team === "Team Renewables") {
    teamCounts.renewables++;
  }

  attendees.push({
    name: name,
    team: team
  });

  greeting.textContent = `🎉 Welcome, ${name} from ${team}!`;

  nameInput.value = "";
  teamSelect.value = "";

  saveProgress();
  updatePage();
});

// Save data to localStorage
function saveProgress() {
  const data = {
    totalAttendance: totalAttendance,
    teamCounts: teamCounts,
    attendees: attendees
  };

  localStorage.setItem("intelSummitData", JSON.stringify(data));
}

// Update all page content
function updatePage() {
  attendanceCount.textContent = totalAttendance;

  waterCount.textContent = teamCounts.water;
  netZeroCount.textContent = teamCounts.netZero;
  renewablesCount.textContent = teamCounts.renewables;

  let progressPercent = (totalAttendance / ATTENDANCE_GOAL) * 100;

  if (progressPercent > 100) {
    progressPercent = 100;
  }

  progressBar.style.width = progressPercent + "%";

  showAttendees();
  checkForCelebration();
}

// Display attendee list
function showAttendees() {
  attendeeList.innerHTML = "";

  attendees.forEach(function (attendee) {
    const item = document.createElement("li");
    item.textContent = `${attendee.name} — ${attendee.team}`;
    attendeeList.appendChild(item);
  });
}

// Celebration feature
function checkForCelebration() {
  if (totalAttendance >= ATTENDANCE_GOAL) {
    let winningTeam = "Team Water Wise";
    let highestCount = teamCounts.water;

    if (teamCounts.netZero > highestCount) {
      winningTeam = "Team Net Zero";
      highestCount = teamCounts.netZero;
    }

    if (teamCounts.renewables > highestCount) {
      winningTeam = "Team Renewables";
      highestCount = teamCounts.renewables;
    }

    celebrationMessage.textContent = `🏆 Goal reached! ${winningTeam} is leading with ${highestCount} attendees.`;
  } else {
    celebrationMessage.textContent = "";
  }
}

// Reset app
resetBtn.addEventListener("click", function () {
  localStorage.removeItem("intelSummitData");

  totalAttendance = 0;

  teamCounts = {
    water: 0,
    netZero: 0,
    renewables: 0
  };

  attendees = [];

  greeting.textContent = "Welcome! Please enter your name and select your team.";

  updatePage();
});