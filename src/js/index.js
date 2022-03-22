document.addEventListener('DOMContentLoaded', ()=>{


    const list = document.querySelector('.listCoins')
    const btnViewAll = document.querySelector('.btnViewAll')
    const btnNav = document.querySelector('.drop-btn')

    const topCoins = document.querySelector('.content-top')
    
    const ctx = document.querySelector('.mainChart').getContext('2d')

   
   
    let idCoin=0

// Функция определения направления тренда (зеленый вверх или красный вниз)
const getTrand = (num)=>{
return num>0 ?
`<img src="./src/img/icons/up.svg" alt="up"/><span class="green">${num}%</span>` :
`<img src="./src/img/icons/down.svg" alt="down"/><span class="red">${num*-1}%</span>`
}

// Список криптовалют
const renderData = coins =>{
    console.log(coins)
    coins.forEach(coinItem => {
        let listItem=document.createElement('li')
        listItem.className+='coinItem'
        listItem.innerHTML+=`
            <a  href="${coinItem.websiteUrl}" target="_blank">
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

const renderData1 = coins =>{
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
let skip = 0
let limit=10
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
// ===================================================================================


// Функция для формирования списка крпитовалют
const getCoin = async () => {  
    try {
        const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100`)
        const data = await resp.json()
        const {coins} = data
        renderData1(coins)
        }
    catch (e) {
        console.log(`Ошибка - ${e}`)
        }
    }
getCoin()

// * * * * * *   События на действия пользоваателя   * * * * * *

// при нажатии на кнопку "View All" увеличивается skip на размер limita и повторно вызывается функция getData
btnViewAll.addEventListener('click',()=> {
    skip+=limit
    getData()
})

// при нажатии на кнопку в навигационной панеле очищается верхняя часть и вызывается функция getTopCData
btnNav.addEventListener('click',()=>{
    topCoins.innerHTML=''
    getCoin()
})










Chart.defaults.plugins.legend.display = false;
const myChart = new Chart (ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            data: [2000, 3800, 6000, 4000, 2000, 3500, 4000, 4600, 4500, 2200],
            backgroundColor: '#724BF2',
            borderRadius: 4,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})




















})




