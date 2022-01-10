
//Render drink function
function renderOneDrink(drink){
    //Creating elements and tags
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

    buttonFetch(btn);
    btnCursorHover();
    btnCursorReset();

}

//Function will fetch details of the drink using the ID of the parent node
function fetchDrinkDetails(parentId){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${parentId}`)
    .then(res => res.json())
    .then(data => renderDrinkDetails(data))
}

function renderDrinkDetails(data){

    //Grabbing all key-value pairs and adding them to seperate arrays together
    let drinksObject = data.drinks[0];
    let drinksArray = Object.entries(drinksObject);
    let ingArray = [];
    let measArray = [];
    let testArray = [];

    //Iterate through data to find all ingredients that don't have a null value
    //Pushing all ingredients into empty array called ingArray
    for (array of drinksArray){
        if (array[0].charAt(6) === 'r' && array[1] != null){
            ingArray.push(array[1]);
            testArray.push(array[1]);
        }
    //Iterate through data to find all measurements that don't have null value
    //Pushing all measurements into empty array called measArray
    else if 
        (array[0].charAt(3) === 'M' && array[1] != null){
        measArray.push(array[1]);
        }
    }
    drinkDetailIteration(drinksArray, ingArray, measArray, testArray)
}

//Function to iterate through all of the drink details and grab only information for drink card
function drinkDetailIteration(drinksArray, ingArray, measArray, testArray){
    //Creating ingredients title for ingredients and measurements data
    const h4 = document.createElement('h4');
    h4.textContent = 'Ingredients';
    document.getElementById(drinksArray[0][1]).appendChild(h4);

    //Creating unordered list to list the ingredients and measurements
    const ul = document.createElement('ul');
    document.getElementById(drinksArray[0][1]).appendChild(ul);

    //Creating for loop to iterate through ingredients and measurements
    //testArray is an empty array that I'm just using to get length of ingredients and measurements
    for (let i = 0; i <= testArray.length - 1; ++i){
        const li = document.createElement('li');
        //Adding measurements to each list followed by ' of ingredients' and appending to ul
        li.textContent = measArray.shift();
        li.textContent += ' of' + ' ' + ingArray.shift();
        ul.append(li)
    }
    //Creating a 'p' tag to add instructions for making drink and appending below list
    const p = document.createElement('p');
    document.getElementById(drinksArray[0][1]).appendChild(p);
    p.textContent = drinksArray[9][1];
}


//Fetch request to grab all drinks specified by alcohol type in parameter
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

//Event listener to change cursor on hover
function btnCursorHover(){
    document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseover', function(e){
        e.target.style.cursor = 'pointer';
        e.target.style.opacity = 0.7;
    }));
}
btnCursorHover()

//Event listener to fade button color on hover
function btnCursorReset(){
    document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseout', function(e){
        e.target.style.opacity = 1;
    }));
}
btnCursorReset()

//Event listener to fetch drinks organized by the alcohol name on button
document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', function(e){
    let buttonText = e.target.innerText;
    getDrinks(buttonText);
}))

//Function to add event listener to drink details button that will fetch drink details if conditions are met
function buttonFetch(btn){
    btn.addEventListener('click', (e) => {
        let parentId = e.target.parentNode.id;
        if (btn.innerText === 'Make it'){
        fetchDrinkDetails(parentId);
        //Change button innertext to 'clear' so function can't be repeated
        btn.innerText = 'Clear'    
        }
        else {
            let btnParent = btn.parentElement;
            while (btnParent.children.length > 3){
                btnParent.removeChild(btnParent.lastChild)
            }
            //Change name of button back to 'Make it' so it can be clicked on again and have same functionality
            btn.innerText = 'Make it'
        }
    })
}

//Function to clear 'drink-list' div every time a new alcohol is selected
function clearPage(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
