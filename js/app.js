'use strict';
// build a object constructor
// add an event for the constructor
// create a scoring system for the images
// create a counter for number of choices left
// create a counter for how many times the choices showed up
// when new images are showed somehow show 3 different images maybe use pop
var choicesLeft = 25;
Bus.myPics = [];
Bus.selectedNumbers =[];
Bus.savedNumbers = [];
Bus.imgElements = document.getElementsByClassName('picture-choices');


function Bus(filepath, displayName, photoId){
  this.filepath = filepath;
  this.displayName = displayName;
  this.photoId = photoId;
  this.timesShown = 0;
  this.timesChosen = 0;
  
  
  
  
  Bus.myPics.push(this);
  

}


new Bus ('img/bag.jpg', 'r2d2 Bag','bag');
new Bus ('img/banana.jpg', 'Banana Slicer', 'banana');
new Bus ('img/bathroom.jpg','Ipad Toilet', 'bathroom');
// new Bus ('img/boots.jpg');
// new Bus ('img/breakfast.jpg');
// new Bus ('img/bubblegum.jpg');
// new Bus ('img/chair.jpg');
// new Bus ('img/cthulhu.jpg');
// new Bus ('img/dog-duck.jpg');
// new Bus ('img/dragon.jpg');
// new Bus ('img/pen.jpg');
// new Bus ('img/pet-sweep.jpg');
// new Bus ('img/scissors.jpg');
// new Bus ('img/shark.jpg');
// new Bus ('img/sweep.png');
// new Bus ('img/tauntaun.jpg');
// new Bus ('img/unicorn.jpg');
// new Bus ('img/usb.gif');
// new Bus ('img/water-can.jpg');
// new Bus ('img/wine-glass.jpg');

// function repeatAnswer(){
//   if(Bus.myPics === Bus.selectedNumbers){
//     Bus.randomBus();
//     Bus.randomBusAgain();
//     Bus.randomBusOneMoreTime();

//   }
//   else{
// Bus.selectedNumbers.pop();
// Bus.selectedNumbers.pop();
// Bus.selectedNumbers.pop();
//   }
// }

Bus.pictureChooser = function(index){
  
  var randomNum = Math.random() * Bus.myPics.length;
  var roundedDown = Math.floor(randomNum);
  var myImage = Bus.myPics[roundedDown];
  Bus.selectedNumbers.push(myImage);
  Bus.savedNumbers.push(myImage);
  Bus.imgElements[index].src = myImage.filepath;
  Bus.imgElements[index].id=myImage.photoId;
  console.log('randombus is here.')
  // repeatAnswer();
};

Bus.randomBusAgain = function(){
  var randomNum = Math.random() * Bus.myPics.length;
  var roundedDown = Math.floor(randomNum);
  var myImage = Bus.myPics[roundedDown];
  Bus.selectedNumbers.push(myImage);
  Bus.savedNumbers.push(myImage);
  Bus.imgElement2.src = myImage.filepath;
  // repeatAnswer();
};
Bus.randomBusOneMoreTime = function(){
  var randomNum = Math.random() * Bus.myPics.length;
  var roundedDown = Math.floor(randomNum);
  var myImage = Bus.myPics[roundedDown];
  Bus.selectedNumbers.push(myImage);
  Bus.savedNumbers.push(myImage);
  Bus.imgElement3.src = myImage.filepath;
  // repeatAnswer();
};


// Bus.addNewPics = function(event){
// event.preventDefault();

// Bus.randomBus(0);
// // Bus.randomBusAgain();
// // Bus.randomBusOneMoreTime();
// }

Bus.pictureChooser(0);
Bus.pictureChooser(1);
Bus.pictureChooser(2);
console.log(Bus.imgElements);
Bus.imgElements[0].addEventListener('click', function(){ 
  Bus.pictureChooser(0);
  Bus.pictureChooser(1);
  Bus.pictureChooser(2);
  var pictureSet= document.getElementsByClassName('picture-choices');
  console.log(pictureSet);
});
Bus.imgElements[1].addEventListener('click', function(){ 
  Bus.pictureChooser(0);
  Bus.pictureChooser(1);
  Bus.pictureChooser(2);
});
Bus.imgElements[2].addEventListener('click', function(){ 
  Bus.pictureChooser(0);
  Bus.pictureChooser(1);
  Bus.pictureChooser(2);
});
// Bus.imgElements[0].addEventListener('click', console.log('I hear you.'));

// Bus.randomBusAgain();
// Bus.randomBusOneMoreTime();