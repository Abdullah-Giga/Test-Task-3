

// Taking an array of objects of the AM time
const objArr_am = [
  {
    start: 9,
    end: 9.5,
  },
  

];

// Taking an array of objects of the PM time

const objArr_pm = [
  {
    start: 3,
    end: 4,
  },
  {
    start: 12,
    end: 1,
  },
  {
    start: 3.5,
    end: 5,
  },
  {
    start: 5,
    end: 6,
  },
  {
    start: 7,
    end: 8,
  },
  
  {
    start: 5.5,
    end: 8,
  },  
  {
    start: 1,
    end: 3.5,
  },
];




// Sorting both arrays individually wrt the time sequence
objArr_am.sort(function(a, b){
  return a.start - b.start;
});
objArr_pm.sort(function(a, b){
  return a.start - b.start;
});

console.log(objArr_am);
console.log(objArr_pm);


// making a combined array

const objArr = objArr_am.concat(objArr_pm);
console.log(objArr);


// Makng a new div for every scheduled task
const getDiv = (start) => {
  let div = `
    
    <div class="r-item-full" >
    <span class="gray-text">${start}:00 - </span><b>Sample Item</b> <span class="green-text"> Sample Location</span>
    </div>`;
  return div;
};

const getDivHalf = (start) => {
  let div = `
    
    <div class="r-item-half">
    <span class="gray-text">${Math.trunc(start)}:30 - </span><b>Sample Item</b> <span class="green-text"> Sample Location</span>
    </div>`;
  return div;
};



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
function collision(){
  
  for(let i = 0; i < objArr.length ; i++){
    let j = 0;

    while(j != i && j < objArr.length - 1){
      if(collision_helper(document.getElementById(objArr[j].start) ,document.getElementById(objArr[i].start))){

  
        let parent = document.getElementById(objArr[j].start);
        let child = document.getElementById(objArr[i].start);
        parent.appendChild(child);
        console.log("hello",child.id);
        child.style.marginTop = `${(objArr[i].start - objArr[j].start)*120}px`;
      }
      j++;
    }
  }
  }





// Rendering all the new task divs  
const render = () => {
  for (let i = 1; i <= 12; i+=0.5) {
    let j = document.getElementById(i);

    for(let k = 0; k < objArr.length; k++){

        if (j.id == objArr[k].start && !j.id.includes(".5")) {
          j.innerHTML +=  getDiv(objArr[k].start);
          j.style.height = `${(objArr[k].end - objArr[k].start) * 120}px`; 

        }
        else if(j.id == objArr[k].start && j.id.includes(".")){
          j.innerHTML +=  getDivHalf(objArr[k].start);
          j.style.height += `${((objArr[k].end - objArr[k].start) * 120)}px`;

        }
    }
    
  }
};



render();
collision();
