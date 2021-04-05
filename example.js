require('dotenv').config()
const { init, getGas, trackGas } = require('./gas')

async function getGasPrice() {
  init(process.env.DEFI_PULSE_KEY)
  const gas = await getGas()
  console.log(`gas : ${JSON.stringify(gas, null, 2)}`)
}


function tellMeWhenThePriceReaches(price) {
  init(process.env.DEFI_PULSE_KEY)
  const pingGas = trackGas((price * 10), 1000, ({ fast, fastest }) => {
    console.log(`Yay 🎉 the gas price has dropped. It's now - fastest: ${(fastest/10)} / fast: ${(fast/10)}`)
  })
  pingGas()
}

//Example1:
//getGasPrice()

//Example2:
tellMeWhenThePriceReaches(109)