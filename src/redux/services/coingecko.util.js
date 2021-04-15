// const axios = require('axios')
import  axios from 'axios'
const Tokens = require('../../tokens/supportToken.json')

export const getCoinPrice = async () => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10000&page=1&sparkline=false'
        const response = await axios.get(url)
        // console.log(Object.keys(response))
        // console.log(response.data)
        const listTokenSupport = Object.values(Tokens)
        // console.log(listTokenSupport.length)
        const tokens = []
        response.data.forEach(item => {
            if (listTokenSupport.includes(item.symbol.toUpperCase())) {
                // console.log(data.symbol.toUpperCase())
                tokens.push({
                    symbol: item.symbol.toUpperCase(),
                    current_price: item.current_price,
                })
            }  
        });
       
        return tokens
        // console.log(data)
    } catch (error) {
        console.log(error)
        throw new Error('Cannot get price now')
    }
}
getCoinPrice()