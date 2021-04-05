const axios = require('axios')

async function getGas() {
  const url =  `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=19137f493325fb279aaf5f94ba25633b37262ae28594acbf538912141641`
  const { data: response }  = await
    axios
        .get(url)

  // console.log(`response : ${JSON.stringify(response, null, 2)}`)
  return response
}

async function run() {
 const gas = await getGas()
 console.log(`gas : ${JSON.stringify(gas, null, 2)}`)
}

/**
 * 
 * @param {number} price 
 * @param {number} period 
 * @param {number} userId  //Not used right now
 * @param {function} notify 
 */
const trackGas = (price, period, userId, notify) => 
  async function pingGas () {
    console.log('pingGas')
    
    const gas = await getGas()
    if(gas.fastest > price) {
      console.log(`gas.fastest ${gas.fastest} is above ${price} - keep tracking`)
      setTimeout(await pingGas, period);
    } else {
      console.log('')
      console.log(`Great news! gas.fastest ${gas.fastest} is below ${price}`)
      notify(gas)
    }
  }
  // const gas = await pingGas()
  // return gas

run()
module.exports = {
  getGas,
  trackGas
}
// trackGas()
