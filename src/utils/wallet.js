var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')
const hdkey = require('ethereumjs-wallet/hdkey')
const Wallet = require('ethereumjs-wallet')
const keccak256 = require('js-sha3').keccak_256
const Directory = require('./directory')
const Unichain = require('@uniworld/unichain-js');



function decryptPrivateKey(privateKeyHash, password) {

    var decipher = crypto.createDecipher(Directory.ENCRYPT_ALGOROTHMS, password)
    // debugger
    var dec = decipher.update(privateKeyHash, 'hex', 'utf8')
    dec += decipher.final('utf8');
    // console.log(dec);
    
    return dec;
}

function encryptPrivateKey(privateKey, password) {
    var cipher = crypto.createCipher(Directory.ENCRYPT_ALGOROTHMS, password)
    var crypted = cipher.update(privateKey, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted;
}


// generatedUniWallet('abc')

function generateMnemonic() {
    const randomBytes = crypto.randomBytes(32)
    const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
    return mnemonic
    // return bip39.generateMnemonic()
}

function generateSeed(mnemonic) {
    return bip39.mnemonicToSeedSync(mnemonic)
}

function generatePrivKey(mnemonic) {
    const seed = generateSeed(mnemonic)
    // console.log(typeof (seed))
    return hdkey.fromMasterSeed(seed).derivePath(`m/44'/60'/0'/0/0`).getWallet().getPrivateKey()
}

function derivePubKey(privKey) {
    const wallet = Wallet.fromPrivateKey(privKey)
    return wallet.getPublicKey()
}

const deriveEthAddress = (pubKey) => {
    const address = keccak256(pubKey) // keccak256 hash of  publicKey
    // Get the last 20 bytes of the public key
    return "0x" + address.substring(address.length - 40, address.length)
}



const genUnwAddress = () => {
    const mnemonic = generateMnemonic();
    const privateKey = generatePrivKey(mnemonic).toString('hex')
    const address = Unichain.address.fromPrivateKey(privateKey)
    return {
        mnemonic,
        privateKey,
        address
    }
    // return address
}

const getUnwAddressFromMnemonic = (mnemonic) => {
  
    if(!bip39.validateMnemonic(mnemonic)){
        return null;
    }
    const privateKey = generatePrivKey(mnemonic).toString('hex')
    const address = Unichain.address.fromPrivateKey(privateKey)
    return {
        privateKey,
        address
    } 
}

const getUnwAddressFromPrivateKey = (privateKey) => {
    try {

        const address = Unichain.address.fromPrivateKey(privateKey)
    return {
        privateKey,
        address
    } 
    } catch (error) {
        console.log(error);
        return null;
    }
}



export const walletUtils = {
    decryptPrivateKey,
    encryptPrivateKey,
    genUnwAddress,
    getUnwAddressFromMnemonic,
    getUnwAddressFromPrivateKey
}

// const BnbApiClient = require('@binance-chain/javascript-sdk')
// const bnbAddress = BnbApiClient.crypto.getAddressFromPrivateKey(priKey)
// console.log('Binanace address = ', bnbAddress)