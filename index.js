const express = require('express');
var Amadeus = require('amadeus');
const app = express();
var http = require('http').createServer(app);

var amadeus = new Amadeus({
  clientId: 'VJ5t4PMtK6V0acAhmzgdibWiSmZeI0fn',
  clientSecret: 'Cq3fVC9dXKW6JJe3'
});


const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get(`/citySearch`, async (req, res) => { 
    console.log(req.query); 
    var keywords = req.query.keyword; 
    const response = await amadeus.referenceData.locations 
      .get({ 
        keyword: keywords, 
        subType: "CITY,AIRPORT", 
      }) 
      .catch((x) => console.log(x)); 
    try { 
      await res.json(JSON.parse(response.body)); 
    } catch (err) { 
      await res.json(err); 
    } 
  });

var server = app.listen(port,()=>{
    console.log("Howdy, I am running at PORT 3000")
  })

  app.get("/date", async function (req, res) { 
    console.log(req.body); 
    locationDeparture = "SYD"; 
    locationArrival = "BKK"; 
    departure = "2021-05-01"; 
    const response = await amadeus.shopping.flightOffersSearch 
      .get({ 
        originLocationCode: locationDeparture, 
        destinationLocationCode: locationArrival, 
        departureDate: departure, 
        adults: "1", 
      }) 
      .catch((err) => console.log(err)); 
    try { 
      await res.json(JSON.parse(response.body)); 
    } catch (err) { 
      await res.json(err); 
    } 
  }); 

  app.post('/post-test', async function(req, res)  {
    console.log('Got body:', req.body);
   
    
    res.sendStatus(200);
});

  app.post('/flightprice', async function(req, res) {
    res.json(req.body);
    inputFlight = req.body;
    console.log(req.body)
    const responsePricing = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
          'data': {
            'type': 'flight-offers-pricing',
            'flightOffers': inputFlight
          }})).catch(err=>console.log(err))
     try {
      await res.json(JSON.parse(responsePricing.body));
    } catch (err) {
      await res.json(err);
    }
     })

     app.post('/flightCreateOrder', async function(req, res) {
      res.json(req.body);
      let inputFlightCreateOrder = req.body;
    console.log(req.body)
    const returnBokkin = amadeus.booking.flightOrders.post(
          JSON.stringify({
      "data": {
        "type": "flight-order",
        "flightOffers": [
               inputFlightCreateOrder
            ],
        "travelers": [
          {
            "id": "1",
            "dateOfBirth": "1982-01-16",
            "name": {
              "firstName": "JORGE",
              "lastName": "GONZALES"
            },
            "gender": "MALE",
            "contact": {
              "emailAddress": "jorge.gonzales833@telefonica.es",
              "phones": [
                {
                  "deviceType": "MOBILE",
                  "countryCallingCode": "34",
                  "number": "480080076"
                }
              ]
            },
            "documents": [
              {
                "documentType": "PASSPORT",
                "birthPlace": "Madrid",
                "issuanceLocation": "Madrid",
                "issuanceDate": "2015-04-14",
                "number": "00000000",
                "expiryDate": "2025-04-14",
                "issuanceCountry": "ES",
                "validityCountry": "ES",
                "nationality": "ES",
                "holder": true
              }
            ]
          },
          {
            "id": "2",
            "dateOfBirth": "2012-10-11",
            "gender": "FEMALE",
            "contact": {
              "emailAddress": "jorge.gonzales833@telefonica.es",
              "phones": [
                {
                  "deviceType": "MOBILE",
                  "countryCallingCode": "34",
                  "number": "480080076"
                }
              ]
            },
            "name": {
              "firstName": "ADRIANA",
              "lastName": "GONZALES"
            }
          }
        ]
      }
    })
        ).then(function(response){
        console.log(response.result);
    }).catch(function(responseError){
        console.log(responseError);
    });
    })
 