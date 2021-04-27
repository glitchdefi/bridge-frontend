import { BSC_NODE_URL } from "../_configs";
import Web3 from "web3";
import abiContract from '../contracts/bscpad.json';

const web3 = new Web3(BSC_NODE_URL);
// debugger
export const getInfoContract = async (addresses) => {
    const info = {}
    // console.log("BSC_NODE_URL===>", BSC_NODE_URL)
    await Promise.all(
        addresses
            .filter(address => address !== 'TBA')
            .map(async (address) => {
                // console.log(address)
                if (address === 'TBA') {
                    info[`${address}`] = {
                        state: 'P',
                        symbol: 'TBA',
                        rate: 0,
                        totalCountWallet: 0,
                        totalCountUserParticipated: 0,
                        totalFundParticipated: 0,
                        maxSingleParticipationAllocated: 0,
                        maxTotalParticipationAllocated: 0
                    }
                }
                else {
                    const tokenContract = new web3.eth.Contract(
                        abiContract,
                        address
                    )
                    // debugger
                    const contractInfo = await tokenContract.methods
                        .info()
                        .call()

                    const contractInfoRound = await tokenContract.methods
                        .infoRounds()
                        .call()

                    // console.log(contractInfoRound);
                    const tokenAddress = contractInfo[0]
                    const symbol = contractInfo[1]
                    const decimal = parseInt(contractInfo[2])
                    const rate = parseFloat(contractInfo[3] / 10 ** 6)
                    const openTime = parseInt(contractInfo[4])
                    const fcfsOpenTime = parseInt(contractInfo[5])
                    const closeTime = parseInt(contractInfo[6])
                    // const isPrivate = contractInfo[6]
                    const totalCountWallet = contractInfo[7]
                    const state = contractInfo[8]
                    const totalCountUserParticipated = contractInfo[9]
                    const totalFundParticipated = parseFloat(contractInfo[10] / 10 ** decimal)
                    // const maxSingleParticipationAllocated = parseFloat(contractInfo[11] / 10 ** decimal)
                    const maxTotalParticipationAllocated = parseFloat(contractInfo[11] / 10 ** decimal)
                    // debugger
                    // console.log('contractInfo==>', contractInfo);

                    let infoRound = []
                    for (let i = 0; i < contractInfoRound['0'].length; i++) {
                        infoRound.push({
                            round: contractInfoRound[0][i],
                            opens: contractInfoRound[1][i],
                            closes: contractInfoRound[2][i],
                        })
                    }
                    // const now = new Date().getTime() /10000 + 10000;
                    // console.log(infoRound)
                    info[`${address}`] = {
                        tokenAddress, symbol, decimal, rate, openTime, fcfsOpenTime, closeTime,
                        totalCountWallet, totalCountUserParticipated,
                        totalFundParticipated,
                        maxTotalParticipationAllocated, state,
                        infoRound
                    }
                }
            })
    )
    // console.log(info)
    return info
}


export async function getInfoWallet(address, wallet) {
    const tokenContract = new web3.eth.Contract(
        abiContract,
        address
    )
    const contractInfo = await tokenContract.methods
        .infoWallet()
        .call({ from: wallet })
    const tokenBalance = parseInt(contractInfo[0])
    const remainingAllocation = parseInt(contractInfo[1])
    const bnbBalance = parseFloat(contractInfo[2] / 10 ** 18)
    const userParticipation = parseInt(contractInfo[3])

    return {
        tokenBalance, remainingAllocation, bnbBalance, userParticipation
    }
}






