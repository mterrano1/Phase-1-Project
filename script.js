
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
    const btn = document.createElement('button');
    btn.classList.add('likeBtns')
    btn.textContent = 'Learn to make'

    grabDrinkInfo.appendChild(div);
    div.appendChild(img);
    img.width = 200;
    img.height = 200;
    div.appendChild(p);
    div.appendChild(btn);

}

function getDrinks(alcohol){
    const grabDrinkInfo = document.querySelector('#drink-info');
    clearPage(grabDrinkInfo);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
    .then(res => res.json())
    .then(data => {
        let drinksList = data.drinks
        drinksList.forEach(drink => renderOneDrink(drink))
    })
}

document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseover', function(e){
    e.target.style.cursor = 'pointer'
}));

document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', function(e){
    let buttonText = e.target.innerText;
    getDrinks(buttonText)
}))

function clearPage(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
