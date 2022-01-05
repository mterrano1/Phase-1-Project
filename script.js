const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

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
