document.addEventListener('DOMContentLoaded', ()=>{
    const list = document.querySelector('.listCoins')
    const btnViewAll = document.querySelector('.btnViewAll')

    const ctx = document.querySelector('.mainChart').getContext('2d')
   
    let count = 0
    let limit=10

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
                        <p class="prc">
                            <img
                                src="./src/img/Assets/circle-up.svg"
                                alt=""
                            />8.36%</p>
                    </div>
                </div>
                </a>
            `
            list.append(listItem)
        });
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

btnViewAll.addEventListener('click',()=> {
    count+=limit
    getData()
})
list.addEventListener('scroll', e=>{
    // console.log(e)
    // count+=limit
    // getData()
})




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




