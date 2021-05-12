import { BigNumber } from 'bignumber.js'
// import Fingerprint2 from 'fingerprintjs2'


export function numberFormat(
  number,
  decimals = 0,
  decPoint,
  thousandsSep,
  trailingZeros = false
) {
  if (typeof number === 'undefined') return
  // Strip all characters but numerical ones.
  const numerical = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  const n = !isFinite(+numerical) ? 0 : +numerical
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''
  const toFixedFix = function (n) {
    const k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
    // return n
  }
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + n.toFixed(5)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    if (trailingZeros) {
      // 1.123 with decimals = 5 => 1.12300
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
  }
  return s[1] ? s.join(dec) : s[0]
}

export function toAmount(value, decimals = 8) {
  if (!value) {
    return ''
  }
  return new BigNumber(value).multipliedBy(Math.pow(10, decimals)).toFixed()
}

export function fromAmount(value, decimals = 8) {
  if (!value) {
    return ''
  }
  return new BigNumber(value).div(Math.pow(10, decimals)).toFixed()
}

export function shortAddress(address) {
  if (!address) {
    return ''
  }
  if (address.length <= 15) {
    return address
  }
  if (address.length === 34 && address.match(/^M/)) {
    return address.slice(0, 5) + '...' + address.slice(address.length - 3)
  }
  return address.slice(0, 12) + '...'
}

export function isMobile() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined')
    return false
  const isAndroid = navigator.userAgent.match(/Android/i)
  const isBlackBerry = navigator.userAgent.match(/BlackBerry/i)
  const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i)
  const isOpera = navigator.userAgent.match(/Opera Mini/i)
  const isWindows = navigator.userAgent.match(/IEMobile/i)
  return isAndroid || isBlackBerry || isIOS || isOpera || isWindows
}

export function mobileDetection() {
  if (typeof navigator === 'undefined') return {}
  if (navigator.userAgent.match(/Android/i)) {
    return {
      name: 'Android',
      // wallet: 'https://midaswallet.page.link/tWKNkE6jXifJfoGp7'
      wallet: 'https://midaswallet.page.link/dapps'
    }
  } else if (navigator.userAgent.match(/BlackBerry/i)) {
    return {
      name: 'BlackBerry',
      wallet: ''
    }
  } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    return {
      name: 'iOS',
      // wallet: 'https://midaswallet.page.link/tWKNkE6jXifJfoGp7'
      wallet: 'https://midaswallet.page.link/pUjXH5dRhNcFJjqEA'
    }
  } else if (navigator.userAgent.match(/Opera Mini/i)) {
    return {
      name: 'Opera',
      wallet: ''
    }
  } else if (navigator.userAgent.match(/IEMobile/i)) {
    return {
      name: 'Windows',
      wallet: ''
    }
  } else {
    return {
      name: 'unknown',
      wallet: ''
    }
  }
}

export function browserDetection() {
  if (typeof navigator === 'undefined') return {}
  if (isMobile()) {
    return mobileDetection()
  }
  if (navigator.userAgent.indexOf('Chrome') !== -1) {
    return {
      name: 'Chrome',
      wallet: 'http://bit.ly/mcashchain-chrome-extension'
    }
  } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    return {
      name: 'Firefox',
      wallet: ''
    }
  } else {
    return {
      name: 'unknown',
      wallet: ''
    }
  }
}

export function isDevMode() {
  return process.env.nodeEnvironment !== 'production'
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function getCookie(cname) {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function copyToClipboard(str) {
  let el = str
  if (typeof str === 'string') {
    el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.top = '0'
    el.style.left = '-9999px'
    el.style.zIndex = '-1'
    document.body.appendChild(el)
  }

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // save current contentEditable/readOnly status
    const editable = el.contentEditable
    const readOnly = el.readOnly

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true
    el.readOnly = true

    // create a selectable range
    const range = document.createRange()
    range.selectNodeContents(el)

    // select the range
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    el.setSelectionRange(0, 999999)

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable
    el.readOnly = readOnly
  } else {
    el.focus()
    el.select()
  }

  document.execCommand('copy')
  if (typeof str === 'string') {
    document.body.removeChild(el)
  }
}

export function windowSize() {
  return {
    innerWidth:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    innerHeight:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
    scrollTop:
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop
  }
}

export function isMidasWallet() {
  if (typeof navigator === 'undefined') return true
  return !!navigator.userAgent.match(/Midas/i)
}

// --- get value in object ---
// extends object-path
const options = {}

function getKey(key) {
  const intKey = parseInt(key)
  if (intKey.toString() === key) {
    return intKey
  }
  return key
}

function hasOwnProperty(obj, prop) {
  if (obj === null) {
    return false
  }
  // to handle objects with null prototypes (too edge case?)
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function hasShallowProperty(obj, prop) {
  return (
    options.includeInheritedProps ||
    (typeof prop === 'number' && Array.isArray(obj)) ||
    hasOwnProperty(obj, prop)
  )
}

function getShallowProperty(obj, prop) {
  if (hasShallowProperty(obj, prop)) {
    return obj[prop]
  }
}

export function gets(obj, curPath, defaultValue = null) {
  let path = curPath
  if (typeof path === 'number') {
    path = [path]
  }
  if (!path || path.length === 0) {
    return obj
  }
  if (obj === null) {
    return defaultValue
  }
  if (typeof path === 'string') {
    return gets(obj, path.split('.'), defaultValue)
  }

  const currentPath = getKey(path[0])
  const nextObj = getShallowProperty(obj, currentPath)
  if (typeof nextObj === 'undefined') {
    return defaultValue
  }

  if (path.length === 1) {
    return nextObj
  }

  return gets(obj[currentPath], path.slice(1), defaultValue)
}
// --- end get value in object ---

export function abbreviateNumber(number, digits = 2, min = 0, options = {}) {
  if (!number || isNaN(number)) return number
  const num = +number
  if (num < min || num < 1000) {
    return numberFormat(num, options.decimals || null)
  }

  const units = ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y']
  let decimal = 0

  for (let i = units.length - 1; i >= 0; i--) {
    decimal = Math.pow(1000, i + 1)

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i]
    }
  }

  return num
}

export function numberToChips(number) {
  if (
    isNaN(number) ||
    new BigNumber(number).lte(0) ||
    new BigNumber(number).gte(1e12)
  ) {
    return []
  }
  const roundNum = function (n) {
    const len = n.toString().length
    if (len < 4) return n
    return n - (n % Math.pow(10, len - 3))
  }
  const max = 75e6
  const maxChips = 15
  let num = new BigNumber(number).gt(max) ? max : +number
  num = roundNum(num)
  const chips = [
    5e6,
    1e6,
    5e5,
    2e5,
    5e4,
    2e4,
    5000,
    1000,
    500,
    100,
    50,
    25,
    5,
    1
  ]
  let arr = []
  for (let i = 0; i <= chips.length; i++) {
    if (num === 0) break
    if (num < chips[chips.length - 1]) break
    const v = chips[i]
    if (num >= v) {
      arr = arr.concat(Array(Math.floor(num / v)).fill(v))
      num = new BigNumber(num).mod(v).toNumber() // number % v
    }
    if (arr.length >= maxChips) break
  }
  if (arr.length >= maxChips) {
    arr.splice(maxChips)
  }
  return arr.length > 0 ? arr.reverse() : []
}

export function getUniqueClientId() {
  if (typeof window === 'undefined') {
    return null
  }
  // globally-unique identifiers
  let guid = window.localStorage.getItem('clientId')
  if (guid) {
    return guid
  }
  const generateUid = function () {
    const rand = Math.random()
      .toString(36)
      .substring(2, 6)
    return `${rand}${new Date().getTime()}`
  }
  guid = generateUid()
  window.localStorage.setItem('clientId', guid)
  return guid
}

// export function getFingerPrintHash () {
//   try {
//     return new Promise(resolve => {
//       Fingerprint2.get({}, function (components) {
//         const values = components.map(function (component) {
//           return component.value
//         })
//         const murmur = Fingerprint2.x64hash128(values.join(''), 31)
//         resolve(murmur)
//       })
//     })
//   } catch (e) {
//     console.error('Error: getFingerPrintHash: ', e)
//     return Promise.resolve()
//   }
// }

export function generateSeq() {
  return `${new Date().getTime()}`
}

export function logTraffic(event = '...', message) {
  if (isDevMode()) {
    // //console.log(event, message)
  }
}

export function isPortrait() {
  // return Math.abs(window.orientation) !== 90
  return window.orientation === 0 || window.orientation === 180
}

export function onVisibilityChange(callback) {
  if (typeof document === 'undefined') {
    return
  }
  let visible = true
  let hidden, visibilityChange
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
  }

  const handleVisibilityChange = () => {
    if (document[hidden]) {
      if (visible) {
        visible = false
        callback(visible)
      }
    } else {
      if (!visible) {
        visible = true
        callback(visible)
      }
    }
  }

  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (
    typeof document.addEventListener === 'undefined' ||
    hidden === undefined
  ) {
    //console.log(
      'This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.'
    )
  } else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false)
  }
}

export function toRangeByLength(start, stop, length = 20) {
  const arr = Array(length - 1)
    .fill(start)
    .map((x, y) => {
      const v = x + (y * (stop - start)) / (length - 1)
      if (v < start) {
        return start
      }
      if (v > stop) {
        return stop
      }
      return Math.round(v)
    })
  arr.push(stop)
  return arr
}

/* Check browser support */
export function fullscreenEnabled() {
  // return document.fullscreenEnabled
  const elem = document.documentElement
  return !!(
    elem.requestFullscreen ||
    elem.mozRequestFullScreen ||
    elem.webkitRequestFullscreen ||
    elem.msRequestFullscreen
  )
}

/* View in fullscreen */
export function openFullscreen(element) {
  const elem = element || document.documentElement
  const supportedLockOrientation = !!(
    window.screen && 'orientation' in window.screen
  )
  const orientation = 'portrait-primary'
  let result = null
  if (elem.requestFullscreen) {
    result = elem.requestFullscreen()
    supportedLockOrientation && window.screen.orientation.lock(orientation)
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    result = elem.mozRequestFullScreen()
    supportedLockOrientation &&
      window.screen.mozLockOrientation.lock(orientation)
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    result = elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    result = elem.msRequestFullscreen()
    supportedLockOrientation &&
      window.screen.msLockOrientation.lock(orientation)
  }
  return result
}

/* Close fullscreen */
export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen()
  }
}

/* Is fullscreen mode */
export function isFullscreen() {
  return window.outerHeight - window.innerHeight <= 1
}

export function serializeQuery(obj) {
  const str = []
  Object.entries(obj).forEach(([key, value]) => {
    if (hasOwnProperty(obj, key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  })
  return str.join('&')
}

// export function isTournament (gameType) {
//   return [ENUM_ROOM_GROUP.SIT_N_GO.gameType].indexOf(gameType) >= 0
// }

export function numberToOrdinalSuffix(num) {
  if (isNaN(num)) return num
  const i = +num
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export function millisToSeconds(millis) {
  if (isNaN(millis)) return millis
  const seconds = (+millis / 1000).toFixed(0)
  return seconds ? +seconds : 0
}



export const getRemainTime = (idElement, time) => {
  var countDownDate = time

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  try {
    document.getElementById(idElement).innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s";
    if (distance < 0) {
      document.getElementById(idElement).innerHTML = "Closed";
    }
  } catch (error) {

  }
}
/**
 * 
 * @param {*} idElement 
 * @param {*} time 
 * @param {function callback} start 
 * @param {function callback} end 
 */

export const getCountDown = (idElement, time, start, end) => {

  var countDownDate = time

  // Update the count down every 1 second
  var job = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    
    try {
      document.getElementById(idElement).innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        end(job)
        clearInterval(job);
       
        document.getElementById(idElement).innerHTML = "0d 0h 0m 0s";
      }
    } catch (error) {
    }


    // If the count down is over, write some text 

  }, 1000);

  start(job)
}



export const remainTime = (time) => {
  var countDownDate = time

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // //console.log("remain day====>", days + " d " + hours + " h" + minutes + " m" + seconds + " s");
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  // Output the result in an element with id="demo"
}