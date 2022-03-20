document.addEventListener('DOMContentLoaded', ()=>{
    const list = document.querySelector('.listCoins')
    const btnViewAll = document.querySelector('.btnViewAll')
    const btnNav = document.querySelector('.drop-btn')

    const cloin3 = document.querySelector('.content-top')
    
    const ctx = document.querySelector('.mainChart').getContext('2d')

   
    let count = 0
    let limit=10
    let idCoin=0


const getTrand = (num)=>{
if (num>=0) {
    return `<img src="./src/img/icons/up.svg" alt="up"/><span class="green">${num}%</span>`
}else {
    return `<img src="./src/img/icons/down.svg" alt="down"/><span class="red">${num*-1}%</span>`
}
}


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
            </a>
            `
            list.append(listItem)
        });
    }

    const renderData1 = coins =>{
       const topCoins = [...coins]
       let topCards = ['start','center','end']
       for(i=0; i<3; i++){
        let coin = topCoins[i]
        let div=document.createElement('div')
        div.className+=`content-top-${topCards[i]}`
        div.innerHTML+=`
        <p class="coin__name">${coin.name}</p>
        <p class="coin__price">$${  Math.round(coin.price*100)/100   }</p>
        <div class="chart-3">
            <p>
            ${getTrand(coin.priceChange1d)}   
            </p>
            <div>
                <img
                    src="./src/img/Overview/chart-3.png"
                    alt=""
                />
            </div>
        </div>
        `
        cloin3.append(div)
       }     
    }

    const getData = async () => {  
try {
    const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=${count}&limit=${limit}`)
    // skip=0 это индекс с какого элемента показываеть limit=10 кол-во элементов
    const data = await resp.json()
    const {coins} = data
    renderData(coins)
    }
catch (e) {
    console.log(`Ошибка - ${e}`)
    }
}

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



btnViewAll.addEventListener('click',()=> {
    count+=limit
    getData()
})

btnNav.addEventListener('click',()=>{
    cloin3.innerHTML=''
    
    getCoin()
})

list.addEventListener('scroll', e=>{
    // console.log(e)
    // count+=limit
    // getData()
})



getCoin()
getData()






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




