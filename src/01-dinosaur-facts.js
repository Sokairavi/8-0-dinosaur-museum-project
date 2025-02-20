/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getTallestDinosaur()
 * ---------------------
 * Returns an object with the tallest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */

//dinosaurs is an array of objects
//we need to return the tallest dinosaur from the list 
//it means we have to access the dinosaur length in meters 
//we have to write a loop and accumulator pattern for it 
//convert the meters to feet by multiplying the meters by 3.281
function getTallestDinosaur(dinosaurs) {
  let tallestDino = {};//determine data type and value 
  let tallestSoFar = dinosaurs[0]//variable for comparison as we loop through 

  for (let i = 0; i < dinosaurs.length; i++){// standard for loop, can also be i = 1 but imma keep it at 0 
    if (dinosaurs[i].lengthInMeters > tallestSoFar.lengthInMeters){
      tallestSoFar = dinosaurs[i]
    }
  } 
  if (tallestSoFar){ //if it's the tallest access the certain key and value 
    tallestDino[tallestSoFar.name] = tallestSoFar.lengthInMeters*3.281 //key and value 
  }
  // console.log(tallestDino)
  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  return tallestDino;
}


/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
//should return last number in mya 
//return interpolation with dino name, pronuniciation, and id

function getDinosaurDescription(dinosaurs, id) {
  //Default description message if dinosaur cannot be found
  let description = `A dinosaur with an ID of '${id}' cannot be found.`;
  //Iterate or go through dinosaurs array, each called "dino"
  for (let dino of dinosaurs) {
    //Compare current dino.dinosaurID to id
    if (dino.dinosaurId === id) {
      // if `id` found, re-assign value of description, with `dino.mya[dino.mya.length -1]` as last element because dino.mya[dino.mya.length -1] is a rule for accessing last element. 
      description = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length -1]} million years ago.`
    }
  }
  return description;
}


/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let newArray = []; //Returning an ARRAY of "dinosaurId's" that lived within the "mya" range provided
  let dinoKey = "dinosaurId";

  //If the "key" paramater is provided (ie truthy), it needs to return the value of that key for each dinosaur alive at that time, in an array 
  if(Object.keys(dinosaurs[0]).includes(key)){//objects.keys returns an array of given object's own properties
    dinoKey = key;
  }

  for(let dino of dinosaurs){
    //If a dino only has one mya provided, it has to allow for the given mya OR dino.mya -1 which accesses last element 
    if(dino.mya.length === 2){
      if(mya <= dino.mya[0] && mya >= dino.mya[1]){
        newArray.push(dino[dinoKey])
      }
    } else {
      if (mya === dino.mya[0] || mya === (dino.mya[0] - 1)) {
        newArray.push(dino[dinoKey])
      }
    } 
  }
  return newArray
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
