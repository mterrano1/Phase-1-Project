const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

function renderOneDrink(drink){
    const grabDrinkInfo = document.querySelector('#drink-info');
    const div = document.createElement('div');
    div.id = drink.idDrink;
    div.classList.add('drinkCard');
    const img = document.createElement('img');
    img.classList.add('drinkImages');
    const p = document.createElement('p');
    p.textContent = drink.strDrink;
    img.src = drink.strDrinkThumb;

    grabDrinkInfo.appendChild(div);
    div.appendChild(img);
    div.appendChild(p);
    img.width = 200;
    img.height = 200;

}

function getDrinks(alcohol){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
    .then(res => res.json())
    .then(data => {
        let drinksList = data.drinks
        drinksList.forEach(drink => renderOneDrink(drink))
    })
}

document.querySelectorAll('.alcohol').forEach(btn => btn.addEventListener('mouseover', function(e){
    e.target.style.cursor = 'pointer';
}));
