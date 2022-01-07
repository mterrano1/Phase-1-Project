
function renderOneDrink(drink){
    const grabDrinkInfo = document.querySelector('#drink-info');
    const div = document.createElement('div');
    div.id = drink.idDrink;
    div.classList.add('drinkCard');

    const img = document.createElement('img');
    img.classList.add('drinkImages');
    img.src = drink.strDrinkThumb;

    const h3 = document.createElement('h3');
    const btn = document.createElement('button');
    btn.classList.add('drinkButtons')

    grabDrinkInfo.appendChild(div);
    div.appendChild(img);
    img.width = 200;
    img.height = 200;
    div.appendChild(h3).textContent = drink.strDrink;;
    div.appendChild(btn).textContent = 'Make it';

    btn.addEventListener('click', function(e){
        let parentId = e.target.parentNode.id;
        if (btn.innerText === 'Make it') {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${parentId}`)
        .then(res => res.json())
        .then(data => {
            let drinksObject = data.drinks[0];
            let drinksArray = Object.entries(drinksObject);

            const h4 = document.createElement('h4');
            h4.textContent = 'Ingredients';
            document.getElementById(drinksArray[0][1]).appendChild(h4);

            const ul = document.createElement('ul');
            document.getElementById(drinksArray[0][1]).appendChild(ul);

            let ingArray = [];
            let measArray = [];
            let testArray = [];

            for (array of drinksArray){
                if (array[0].charAt(6) === 'r' && array[1] != null){
                    ingArray.push(array[1]);
                    testArray.push(array[1]);
                }
                else if
                    (array[0].charAt(3) === 'M' && array[1] != null){
                        measArray.push(array[1]);
                }
            }

            for (let i = 0; i <= testArray.length - 1; ++i){
                const li = document.createElement('li');

                li.textContent = measArray.shift();
                li.textContent += ' of' + ' ' + ingArray.shift();
                ul.append(li)
            }

            const p = document.createElement('p');
            document.getElementById(drinksArray[0][1]).appendChild(p);
            p.textContent = drinksArray[9][1];

            btn.innerText = 'Clear'
        })
        }
        else {
            let btnParent = btn.parentElement;
            while (btnParent.children.length > 3) {
                btnParent.removeChild(btnParent.lastChild)
            }
            btn.innerText = 'Make it'
        }
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
    getDrinks(buttonText);
}))

function clearPage(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
