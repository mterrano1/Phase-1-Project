
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

    btn.addEventListener('click', function(e){
        let parentId = e.target.parentNode.id;
        // clearPage(e.target.parentNode);
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${parentId}`)
        .then(res => res.json())
        .then(data => {
            let drinksList = data.drinks;
            const p = document.createElement('p');
            for (key of drinksList)
            document.getElementById(key.idDrink).appendChild(p)
            p.textContent = key.strInstructions
        })
    })

    document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseover', function(e){
        e.target.style.cursor = 'pointer';
        e.target.style.opacity = 0.7;
    }));

    document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseout', function(e){
        e.target.style.opacity = 1;
    }));

}


// function makeDrink(drink){
//     const id = drink.idDrink;
//     const p = document.createElement('p');
//     p.textContent = drink.strDrink;
    
// }

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
    e.target.style.cursor = 'pointer';
    e.target.style.opacity = 0.7;
}));

document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseout', function(e){
    e.target.style.opacity = 1;
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
