import { objArr, AllDay } from "./data.js";

// Sorting array wrt the time sequence
objArr.sort(function (a, b) {
  return a.start - b.start;
});

// Function to hande 24 hour format
function time(start) {
  if (start > 12) {
    return start - 12;
  } else {
    return start;
  }
}

// All day task function
function render_allDay() {
  let j = document.getElementById("8");
  for (let i = 0; i < AllDay.length; i++) {
    j.innerHTML += ` <div class = "item-all" id = "All-day-${i}">
                    <span class="gray-text">${AllDay[i].start}- </span><b>${AllDay[i].name}</b> <span class="green-text"> ${AllDay[i].location}</span>
                    </div>
                    `;
  }
}

// Makng a new div for every scheduled task
const getDiv = (start, name, location) => {
  let div = ` 
      
      <div class="r-item-full" >
      <span class="gray-text">${time(
        start
      )}:00 - </span><b>${name}</b> <span class="green-text"> ${location}</span>
      </div>`;
  return div;
};

// Making new dv to handle time starting with .5 or :30 minute format

const getDivHalf = (start, name, location) => {
  let div = `
      
      <div class="r-item-half">
      <span class="gray-text">${Math.trunc(
        time(start)
      )}:30 - </span><b>${name}</b> <span class="green-text"> ${location}</span>
      </div>`;
  return div;
};

// Find if collision occurs between two divs
function collision_helper(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}

// Checking the collision and making divs responsive
function collision() {
  for (let i = 0; i < objArr.length; i++) {
    let j = 0;
    while (j != i && j < objArr.length - 1) {
      if (
        collision_helper(
          document.getElementById(objArr[j].start),
          document.getElementById(objArr[i].start)
        )
      ) {
        let parent = document.getElementById(objArr[j].start);
        let child = document.getElementById(objArr[i].start);
        parent.appendChild(child);
        child.style.marginTop = `${
          (objArr[i].start - objArr[j].start) * 123
        }px`;
      }
      j++;
    }
  }
}

// Rendering all the new task divs
const render = () => {
  for (let i = 9; i <= 20; i += 0.5) {
    let j = document.getElementById(i);

    for (let k = 0; k < objArr.length; k++) {
      if (j.id == objArr[k].start && !j.id.includes(".5")) {
        j.innerHTML += getDiv(
          objArr[k].start,
          objArr[k].name,
          objArr[k].location
        );
        j.style.height = `${(objArr[k].end - objArr[k].start) * 123}px`;
      } else if (j.id == objArr[k].start && j.id.includes(".")) {
        j.innerHTML += getDivHalf(
          objArr[k].start,
          objArr[k].name,
          objArr[k].location
        );
        j.style.height += `${(objArr[k].end - objArr[k].start) * 120}px`;
      }
    }
  }
};


// Function calls

render();
collision();
render_allDay();
