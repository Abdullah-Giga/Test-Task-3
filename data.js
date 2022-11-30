// This array tajes data <= 12.5pm and >= 9 am
const objArr_am = [
  {
    start: 9,
    end: 13,
  },
  {
    start: 10,
    end: 11,
  },
];

// This array takes data in 24 hour format i.e 1 pm is 13 pm 2pm is 14pm

const objArr_pm = [
  {
    start: 13,
    end: 14,
  },
  {
    start: 12,
    end: 13,
  },
  {
    start: 15.5,
    end: 17,
  },
  {
    start: 15,
    end: 19,
  },
];

// Sorting both arrays individually wrt the time sequence
objArr_am.sort(function (a, b) {
  return a.start - b.start;
});
objArr_pm.sort(function (a, b) {
  return a.start - b.start;
});


// making a combined array
const objArr = objArr_am.concat(objArr_pm);


// Functio to hande 24 hour format
function time(start) {
  if (start > 12) {
    return start - 12;
  } else {
    return start;
  }
}

// Makng a new div for every scheduled task
const getDiv = (start) => {
  let div = `
    
    <div class="r-item-full" >
    <span class="gray-text">${time(
      start
    )}:00 - </span><b>Sample Item</b> <span class="green-text"> Sample Location</span>
    </div>`;
  return div;
};

// Making new dv to handle tie starting with .5 or :30 minute format

const getDivHalf = (start) => {
  let div = `
    
    <div class="r-item-half">
    <span class="gray-text">${Math.trunc(
      time(start)
    )}:30 - </span><b>Sample Item</b> <span class="green-text"> Sample Location</span>
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
        console.log("hello", child.id);
        child.style.marginTop = `${
          (objArr[i].start - objArr[j].start) * 120
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
        j.innerHTML += getDiv(objArr[k].start);
        j.style.height = `${(objArr[k].end - objArr[k].start) * 120}px`;
      } else if (j.id == objArr[k].start && j.id.includes(".")) {
        j.innerHTML += getDivHalf(objArr[k].start);
        j.style.height += `${(objArr[k].end - objArr[k].start) * 120}px`;
      }
    }
  }
};

render();
collision();
