'use strict';


// API KEY
const key = '';


const lha = {};
lha.rate = {
  rate : '50.45'
}


// GETTING THE LHA RATE
function getRateBtn() {
  const postcode = document.querySelector('#postcode').value;
  const bedrooms = document.querySelector('#bedrooms').value;
  const rate = document.querySelector('#rate');

  if (postcode == '' || bedrooms == '') {
    // console.log('Please enter the required values');

    rate.classList.remove('display');
    document.querySelector('.container').removeChild(rate);
    document.querySelector('.container').innerHTML += '<p id="rate">Please enter the required values</p>';
  } 
  
  else {
    // console.log(postcode);
    // console.log(bedrooms);
    getLhaRate(postcode, bedrooms);
  }
};


// LHA RATE FETCHING
function getLhaRate(postcode, bedrooms) {
  let api = `https://api.propertydata.co.uk/lha-rate?key=${key}&postcode=${postcode}&bedrooms=${bedrooms}`;
  
   fetch(api)
       .then(function(response) {
         let data = response.json();
         return data;
       })
       .then(function(status) {
        //  console.log(status);

         lha.postcode = status.postcode;
         lha.brma = status.data.brma;
         lha.rate = status.data.rate;

        //  console.log(lhr.postcode);
        //  console.log(lhr.brma);
        //  console.log(lhr.rate);

         const rate = document.querySelector('#rate');

         rate.classList.remove('display');
         document.querySelector('.container').removeChild(rate);
         document.querySelector('.container').innerHTML += `<p id="rate">${lha.brma}  |  $${lha.rate} </p>`;
       })
       .catch(function(error) {
          const rate = document.querySelector('#rate');

          rate.classList.remove('display');
          document.querySelector('.container').removeChild(rate);
          document.querySelector('.container').innerHTML += `<p id="rate">${error}</p>`;
       });
}

