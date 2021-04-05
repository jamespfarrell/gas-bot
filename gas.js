const axios = require('axios')
require('dotenv').config()

let url = null
function init(apiKey) {
  url =  `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${apiKey}`
}

async function getGas() {
  if(!url) throw new Error('Please call call init with your defipulse api key first')
  const { data: response }  = await
    axios.get(url)

  return response
}

/**
 * 
 * @param {number} price 
 * @param {number} period 
 * @param {function} notify 
 */
const trackGas = (price, period, notify) => 
  async function pingGas () {
    //console.log('pingGas')
    
    const gas = await getGas()
    if(gas.fastest > price) {
      //console.log(`gas.fastest ${gas.fastest} is above ${price} - keep tracking`)
      setTimeout(await pingGas, period);
    } else {
      console.log('')
      //console.log(`Great news! gas.fastest ${gas.fastest} is below ${price}`)
      notify(gas)
    }
  }



module.exports = {
  getGas,
  trackGas,
  init
}

