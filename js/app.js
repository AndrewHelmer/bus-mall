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

Bus.listShower = function(){
  for (var i=0; i < Bus.myPics.length; i++){
    var listEL = document.createElement('li');
    listEL.textContent = `${Bus.myPics[i].displayName} has recieved ${Bus.myPics[i].timesChosen} selections. ${Bus.myPics[i].displayName} was shown ${Bus.myPics[i].timesShown} times.`;
    Bus.ulEL.appendChild(listEL);
  }
};

Bus.voteUpdater = function(){
  for (var i=0; i < Bus.myPics; i++){
    Bus.allTheVotes[i] = Bus.myPics[i].timesChosen;
    Bus.displayName[i] = Bus.myPics[i];
  }
};
Bus.hideElements = function(){
  Bus.firstPicEl.classList.add('hide');
  Bus.secondPicEl.classList.add('hide');
  Bus.thirdPicEl.classList.add('hide');
};

// Bus.showChart = function() {
//   var context = document.getElementById('data-chart').getContext('2d');

//   var chartColors = ['yellow', 'orange', 'purple', 'blue','green','yellow', 'orange', 'purple', 'blue','green','yellow', 'orange', 'purple', 'blue','green','yellow', 'orange', 'purple', 'blue','green'];

//   var busProductChart = new Chart(context, { // eslint-disable-line
//     type: 'bar',
//     data : {
//       labels: Bus.displayNames,
//       datasets: [{
//         labels: 'How many times a product was chosen.',
//         data: Bus.timesChosen,
//         backgroundColors: chartColors
//       }],
//     },
//     options: {
//       responsive:true,
//       maintainAspectRatio: false,
//       scales: {
//         yAxes: [{
//           tick: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// };
var ctx = document.getElementById('data-chart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive:true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});

//Event Handlers

Bus.clickingHandler = function(event){
  Bus.choicesLeft++;
  for (var i=0; i < Bus.myPics.length; i++){
    if(event.target.alt === Bus.myPics[i].displayName){
      Bus.myPics[i].timesChosen++;

    }
  }
  if(Bus.choicesLeft > 24){
    Bus.sectionEl.removeEventListener('click',Bus.clickingHandler);
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


