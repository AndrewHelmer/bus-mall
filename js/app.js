'use strict';
// build a object constructor
// add an event for the constructor
// create a scoring system for the images
// create a counter for number of choices left
// create a counter for how many times the choices showed up
// when new images are showed somehow show 3 different images maybe use pop
Bus.choicesLeft = 0;
Bus.myPics = [];
Bus.selectedNumbers =[];
Bus.savedNumbers = [];
Bus.allTheVotes = [];
Bus.savedNames= [];
Bus.imgElements = document.getElementsByClassName('picture-choices');
Bus.ulEL= document.getElementById('final-stats');
Bus.sectionEl = document.getElementById('crazy-pic-section');


function Bus(displayName,filepath){
  this.displayName = displayName;
  this.filepath = filepath;
  this.timesShown = 0;
  this.timesChosen = 0;
  Bus.myPics.push(this);
}


new Bus ('r2d2 Bag','img/bag.jpg');
new Bus ('Banana Slicer','img/banana.jpg');
new Bus ('Ipad Toilet','img/bathroom.jpg');
new Bus ('Rubber Boots','img/boots.jpg');
new Bus ('Breakfast Maker','img/breakfast.jpg');
new Bus ('Meat Gum','img/bubblegum.jpg');
new Bus ('Odd Chair','img/chair.jpg');
new Bus ('Cthulu','img/cthulhu.jpg');
new Bus ('Dog-Duck','img/dog-duck.jpg');
new Bus ('Dragon Meat','img/dragon.jpg');
new Bus ('Utensil Pen','img/pen.jpg');
new Bus ('Pet Sweep','img/pet-sweep.jpg');
new Bus ('Pizza scissors','img/scissors.jpg');
new Bus ('Man Eating Shark','img/shark.jpg');
new Bus ('Baby Sweeper','img/sweep.png');
new Bus ('Napping Baby','img/tauntaun.jpg');
new Bus ('Unicorn Meat','img/unicorn.jpg');
new Bus ('Tentacle Horror','img/usb.gif');
new Bus ('Pointless Water Can','img/water-can.jpg');
new Bus ('Weird Wine Glass','img/wine-glass.jpg');

Bus.firstPicEl = document.getElementById('first-picture');
Bus.secondPicEl = document.getElementById('second-picture');
Bus.thirdPicEl = document.getElementById('third-picture');

Bus.crazyPicture = function(){
  do{
    var numberOnePicture = Math.floor(Math.random() * Bus.myPics.length);
    var numberTwoPicture = Math.floor(Math.random() * Bus.myPics.length);
    var numberThreePicture = Math.floor(Math.random() * Bus.myPics.length);
  } while(numberOnePicture === numberTwoPicture
    || numberOnePicture === numberThreePicture
    || numberTwoPicture === numberThreePicture
    || Bus.selectedNumbers.includes(numberOnePicture)
    || Bus.selectedNumbers.includes(numberTwoPicture)
    || Bus.selectedNumbers.includes(numberThreePicture));
  Bus.selectedNumbers.pop();
  Bus.selectedNumbers.pop();
  Bus.selectedNumbers.pop();

  Bus.selectedNumbers.push(numberOnePicture);
  Bus.selectedNumbers.push(numberTwoPicture);
  Bus.selectedNumbers.push(numberThreePicture);

  Bus.firstPicEl.src = Bus.myPics[numberOnePicture].filepath;
  Bus.firstPicEl.alt = Bus.myPics[numberOnePicture].displayName;

  Bus.secondPicEl.src = Bus.myPics[numberTwoPicture].filepath;
  Bus.secondPicEl.alt = Bus.myPics[numberTwoPicture].displayName;

  Bus.thirdPicEl.src = Bus.myPics[numberThreePicture].filepath;
  Bus.thirdPicEl.alt = Bus.myPics[numberThreePicture].displayName;

  Bus.myPics[numberOnePicture].timesShown++;
  Bus.myPics[numberTwoPicture].timesShown++;
  Bus.myPics[numberTwoPicture].timesShown++;
};
// shows list after votes are done
Bus.listShower = function(){
  for (var i=0; i < Bus.myPics.length; i++){
    var listEL = document.createElement('li');
    listEL.textContent = `${Bus.myPics[i].displayName} has recieved ${Bus.myPics[i].timesChosen} selections. ${Bus.myPics[i].displayName} was shown ${Bus.myPics[i].timesShown} times.`;
    Bus.ulEL.appendChild(listEL);
  }
};
// function to update the votes
Bus.voteUpdater = function(){
  for (var i in Bus.myPics) {
    Bus.allTheVotes[i] = Bus.myPics[i].timesChosen;
    Bus.savedNames[i] = Bus.myPics[i].displayName;
  }
};
Bus.hideElements = function(){
  Bus.firstPicEl.classList.add('hide');
  Bus.secondPicEl.classList.add('hide');
  Bus.thirdPicEl.classList.add('hide');
};
Bus.checkLocaleStorage = function(){
  if(localStorage.getItem('allBusObjects')) {
    Bus.loadLocalStorage();
  } else{
    Bus.savedLocalStorage();
  }

};
Bus.savedLocalStorage = function(){
  var savedStringedObjects = JSON.stringify(Bus.myPics);
  localStorage.setItem('allBusObjects', savedStringedObjects);
};
Bus.loadLocalStorage = function(){
  var storedStringedObjects = localStorage.getItem('allBusObjects');
  Bus.myPics = JSON.parse(storedStringedObjects);
};
Bus.showChart = function() {
  Bus.savedLocalStorage();
  var context = document.getElementById('data-chart').getContext('2d');
  var busProductChart = new Chart(context, { // eslint-disable-line
    type: 'bar',
    data : {
      labels: Bus.savedNames,
      datasets: [{
        label: 'How many times a product was chosen.',
        data: Bus.allTheVotes,
        backgroundColor: ['yellow', 'orange', 'purple', 'blue','green','yellow', 'orange', 'purple', 'blue','green','yellow', 'orange', 'purple', 'blue','green','yellow', 'orange', 'purple', 'blue','green'],
      }],
    },
    options: {
      responsive:true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          tick: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};


Bus.clickingHandler = function(event){
  Bus.choicesLeft++;
  for (var i=0; i < Bus.myPics.length; i++){
    if(event.target.alt === Bus.myPics[i].displayName){
      Bus.myPics[i].timesChosen++;

    }
  }
  if(Bus.choicesLeft > 24){
    Bus.sectionEl.removeEventListener('click',Bus.clickingHandler);

    // store results in local storage
    localStorage.setItem('userResults',JSON.stringify(Bus.myPics));
    // other functions
    Bus.listShower();
    Bus.voteUpdater();
    Bus.hideElements();
    Bus.showChart();

  }else{
    Bus.crazyPicture();
  }
};
Bus.sectionEl.addEventListener('click',Bus.clickingHandler);

Bus.crazyPicture();
Bus.checkLocalStorage();


