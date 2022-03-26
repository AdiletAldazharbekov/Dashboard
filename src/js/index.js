document.addEventListener('DOMContentLoaded', ()=>{

    
// Функция определения направления тренда (зеленый вверх или красный вниз)
const getTrand = (num)=>{
return num>0 ?
`<img src="./src/img/icons/up.svg" alt="up"/><span class="green">${num}%</span>` :
`<img src="./src/img/icons/down.svg" alt="down"/><span class="red">${num*-1}%</span>`
}

// ============================================================================================================================


const list = document.querySelector('.listCoins')
// Списка крпитовалют для блока All Assets
// Фомирования списка криптовалют и вывод их на экран
const renderData = coins =>{
    coins.forEach(coinItem => {
        let listItem=document.createElement('li')
        listItem.className+='coinItem'
        listItem.innerHTML+=`
            <a href="${coinItem.websiteUrl}" target="_blank">
                <img class="coin-img" src="${coinItem.icon}" alt="coin"/>
                <div class="coinDesc">
                    <div class="coin-name">
                        <p class="name">${coinItem.name}</p>
                        <p class="value">
                        ${Math.round(coinItem.priceBtc*1000)/1000} ${coinItem.symbol} - $${Math.round(coinItem.price*100)/100}
                        </p>
                    </div>
                    <div class="coin-price">
                        <p class="price">$${Math.round(coinItem.priceBtc * coinItem.price*100)/100}</p>
                        <div class="prc">${getTrand(coinItem.priceChange1h)}</div>
                    </div>
                </div>
            </a>`
        list.append(listItem)
    });
}

let skip = 0 //Переменная для стартовой позиции списка
let limit=10 // лимит по сколько криптовалют показывать (добавлять в список)
// Функция для Подключения к ресурсу через API
const getData = async () => {  
    try {
        const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=${limit}`)
        const data = await resp.json()
        const {coins} = data
        renderData(coins)
        }
    catch (e) {
        console.log(`Ошибка - ${e}`)
        }
}
getData()


// ============================================================================================================================


const topCoins = document.querySelector('.content-top')
// Определения топовых крпитовалют для мини карточек вверхней части экрана

// Фомирования списка криптовалют и вывод их на экран
const renderTopCoins = coins =>{
    const coin3 = [...coins]
    let topCards = ['start','center','end']
    for(i=0; i<3; i++){
    let coin = coin3[i]
    let div=document.createElement('div')
    div.className+=`content-top-${topCards[i]}`
    div.innerHTML+=`
        <p class="coin__name">${coin.name}</p>
        <p class="coin__price">$${Math.round(coin.price*100)/100}</p>
        <div class="chart-3">
            <p>${getTrand(coin.priceChange1d)}</p>
            <div><img src="./src/img/Overview/chart-3.png" alt=""/></div>
        </div>`
    topCoins.append(div)
    }     
}

// Функция для формирования списка крпитовалют
const getTopCoins = async () => {  
    try {
        const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100`)
        const data = await resp.json()
        const {coins} = data
        renderTopCoins(coins)
        }
    catch (e) {
        console.log(`Ошибка - ${e}`)
        }
    }
getTopCoins()


// ============================================================================================================================



const xLabels=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
let day = new Date().getDate()
// alert(day);

let bgColor='#724BF2'
let period='1m' //available periods - 24h | 1w | 1m | 3m | 6m | 1y |all
let coinId='ethereum'
let charType='bar'
let myChart

const canvasDiv = document.querySelector('.content-bottom-Left-portofolio')
// Формирование массива данных для основного графика
const renderDataCoin = coins =>{
let canvas=document.createElement('canvas')
canvas.className='mainChart'
canvasDiv.append(canvas)
    let arr =[]
    coins.forEach(element => {
        arr.push(Math.round(element[1]))
    })

    const ctx = document.querySelector('.mainChart').getContext('2d')

    let yMax = Math.ceil(Math.max.apply(null,arr)/1000)*1000 //определение максимальной шкалы
    Chart.defaults.plugins.legend.display = false; // убирает дефолтную легенду

    // Добавление основного графика за период
   
 

     myChart = new Chart (ctx, {
        type: charType, //'bar', //'line',
        data: {
            labels:xLabels,
            datasets: [{
                data: arr,
                backgroundColor: bgColor,
                borderRadius: 4,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax,
                },
            }
        }
    })
}

// Получение данных конкретной криптовалюты (coinId) по за пероид (period)
const getCoin = async () => {  
    try {
        const resp = await fetch(`https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${coinId}`)
        const data = await resp.json()
        const {chart} = data
        renderDataCoin(chart)
        }
    catch (e) {
        console.log(`Ошибка - ${e}`)
        }
    }

getCoin()





// ============================================================================================================================



const list1 = document.querySelector('.listCoins')
// Списка крпитовалют для блока All Assets
// Фомирования списка криптовалют и вывод их на экран
const renderList = coins =>{
    coins.forEach(coinItem => {
        let listItem=document.createElement('li')
        listItem.className+='coinItem'
        listItem.innerHTML+=`
            <a href="${coinItem.websiteUrl}" target="_blank">
                <img class="coin-img" src="${coinItem.icon}" alt="coin"/>
                <div class="coinDesc">
                    <div class="coin-name">
                        <p class="name">${coinItem.name}</p>
                        <p class="value">
                        ${Math.round(coinItem.priceBtc*1000)/1000} ${coinItem.symbol} - $${Math.round(coinItem.price*100)/100}
                        </p>
                    </div>
                    <div class="coin-price">
                        <p class="price">$${Math.round(coinItem.priceBtc * coinItem.price*100)/100}</p>
                        <div class="prc">${getTrand(coinItem.priceChange1h)}</div>
                    </div>
                </div>
            </a>`
        list.append(listItem)
    });
}

let skip1 = 0 //Переменная для стартовой позиции списка
let limit1=10 // лимит по сколько криптовалют показывать (добавлять в список)
// Функция для Подключения к ресурсу через API
const getList = async () => {  
    try {
        const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=${skip1}&limit=${limit1}`)
        const data = await resp.json()
        const {coins} = data
        renderList(coins)
        }
    catch (e) {
        console.log(`Ошибка - ${e}`)
        }
}
// getData()













// ============================================================================================================================



// * * * * * *   События на действия пользоваателя   * * * * * *

// при нажатии на кнопку "View All" увеличивается skip на размер limita и повторно вызывается функция getData
const btnViewAll = document.querySelector('.btnViewAll')

btnViewAll.addEventListener('click',()=> {
    skip+=limit
    getData()
})

// при нажатии на кнопку в навигационной панеле очищается верхняя часть и вызывается функция getTopCData
const btnNav = document.querySelector('.drop-btn')

btnNav.addEventListener('click',()=>{
    topCoins.innerHTML=''
    getTopCoins()
})

// выбор типа основного графика
const chartType = document.querySelector('#period')

chartType.addEventListener('change', (event) => {
    charType=event.target.value
    myChart.destroy()
    canvasDiv.lastChild.remove()
    getCoin()
})










})




