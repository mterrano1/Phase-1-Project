
function renderOneDrink(drink){
    const grabDrinkInfo = document.querySelector('#drink-info');
    const div = document.createElement('div');
    div.id = drink.idDrink;
    div.classList.add('drinkCard');
    const img = document.createElement('img');
    img.classList.add('drinkImages');
    const h3 = document.createElement('h3');
    h3.textContent = drink.strDrink;
    img.src = drink.strDrinkThumb;
    const btn = document.createElement('button');
    btn.classList.add('drinkButtons')

    grabDrinkInfo.appendChild(div);
    div.appendChild(img);
    img.width = 200;
    img.height = 200;
    div.appendChild(h3);
    div.appendChild(btn).textContent = 'Make it';

    btn.addEventListener('click', function(e){
        let parentId = e.target.parentNode.id;
        // clearPage(e.target.parentNode);
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${parentId}`)
        .then(res => res.json())
        .then(data => {
            let drinksObject = data.drinks[0];
            let drinksArray = Object.entries(drinksObject);

            const p = document.createElement('p');
            document.getElementById(drinksArray[0][1]).appendChild(p);
            p.textContent = drinksArray[9][1];

            const ol = document.createElement('ol');
            document.getElementById(drinksArray[0][1]).appendChild(ol);

            for (array of drinksArray){
                if (array[0].charAt(3) === 'M' && array[1] != null){
                    console.log(array[1])
                }
            }

            for (array of drinksArray){
                if (array[0].charAt(6) === 'r' && array[1] != null){
                    console.log(array[1])
                }
            }

            function createList(measurement){
                li.testContent = measurement;
                ol.append(li)
            }
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
