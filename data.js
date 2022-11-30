
// This array takes data in 24 hour format i.e 1 pm is 13 pm 2pm is 14pm


const objArr = [
  
  // {
  //   start: "All-day",
  //   name : "Sample Item",
  //   location : "Sample Location"
  // },
  {
    start: 9,
    end: 20,
    name : "Sample Item",
    location : "Sample Location"
  },
  {
    start: 13,
    end: 14,
    name : "Sample Item",
    location : "Sample Location"
  },
  {
    start: 12,
    end: 13,
    name : "Sample Item",
    location : "Sample Location"
  },
  {
    start: 15.5,
    end: 17,
    name : "Sample Item",
    location : "Sample Location"
  },
  {
    start: 15,
    end: 19,
    name : "Sample Item",
    location : "Sample Location"
  },
];





// Sorting array wrt the time sequence
objArr.sort(function (a, b) {
  return a.start - b.start;
});

console.log(objArr);



// Function to hande 24 hour format
function time(start) {
  if (start > 12) {
    return start - 12;
  } else {
    return start;
  }
}



// All day task function
function render_allDay(){
let j = document.getElementById("8");
let allDay;

for(let i = 0; i<objArr.length;i++){
  if(objArr[i].start == "All-day"){
    allDay = objArr.splice(i,1);
  }
  else{
    return;
  }
}
j.innerHTML = `<div class="item">
<span class="gray-text">${allDay[0].start}- </span><b>${allDay[0].name}</b> <span class="green-text"> ${allDay[0].location}</span>
</div>`;
}


// Makng a new div for every scheduled task
const getDiv = (start,name,location) => {
  let div = ` 
    
    <div class="r-item-full" >
    <span class="gray-text">${time(
      start
    )}:00 - </span><b>${name}</b> <span class="green-text"> ${location}</span>
    </div>`;
  return div;
};

// Making new dv to handle tie starting with .5 or :30 minute format

const getDivHalf = (start,name,location) => {
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
      if(objArr[j].start == "All-day"){
        j++;
        // i = 1;
      }
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
        j.innerHTML += getDiv(objArr[k].start,objArr[k].name,objArr[k].location);
        j.style.height = `${(objArr[k].end - objArr[k].start) * 123}px`;
      } else if (j.id == objArr[k].start && j.id.includes(".")) {
        j.innerHTML += getDivHalf(objArr[k].start,objArr[k].name,objArr[k].location);
        j.style.height += `${(objArr[k].end - objArr[k].start) * 120}px`;
      }
    }
  }
};


render_allDay();
render();
collision();
