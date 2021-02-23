class Person {
    constructor(isIll, difficulty) {
      this.isIll = isIll;
      this.difficulty = parseFloat(difficulty);
    }
}

class Test {
    constructor(cp,testDifficulty,cost) {
      this.cp = parseFloat(cp);
      this.testDifficulty = parseFloat(testDifficulty);
      this.cost = parseInt(cost);
    }
}

class Society{
    constructor(nPerson,budget) {
        this.nPerson = parseInt(nPerson);
        this.budget = parseInt(budget);
    }
    build_pl () {
        let personList = new Array(this.nPerson);
        for(let i=0;i<this.nPerson;i++) {
            personList[i] = new Person(Math.random() < 0.5, 0);
        }
        this.peopleList = personList;
        return personList;
    }
    build_tl () {
        let testList = [new Test(0.5,0.2,3000),new Test(0.6,0.3,4000),new Test(0.2,0.1,1000),new Test(0.8,0.7,5000),new Test(0.25,0.2,2000),new Test(0.7,0.8,7000),new Test(0.1,0.1,1000),new Test(0.5,0.5,5000),new Test(0.45,0.3,4500),new Test(0.65,0.65,6500)];
       console.log(testList);
        this.testList = testList;
        return testList;
    }
}

let society1  = new Society(60,100000);

society1.build_pl();
society1.build_tl();

showBudget ();

let p1 = [];
function pushToArray ( n ) {
    p1.push(n);
    console.log(`person ${n} added successfully!`);
}

let testnum;
function testNumber( n ) {
    testnum = n ;
    console.log(`test ${n} selected successfully!` , society1.testList[n]);
} 

function displayTestsSpecifications( t ) {
    
    document.getElementById('test-specifications').innerHTML = ` درصد تشخیص: ${society1.testList[t].cp}
    سختی: ${society1.testList[t].testDifficulty}
    هزینه:  ${society1.testList[t].cost }
    ` ; 
}

const people_place_holder = document.getElementById('people');
function displayPeople () {
    for(let i=0;i<society1.peopleList.length ; ++ i) {
        people_place_holder.insertAdjacentHTML('beforeend',`  <button class="personButton"  data-pn="${i}"> person ${i+1} </button>  `);
    }
}
people_place_holder.addEventListener('click', function(event){
    const target = event.target;
    if(target.tagName == 'BUTTON') {
        const person_number = target.dataset.pn ;
        target.style.backgroundColor = 'red';
        console.log(person_number);
        pushToArray(person_number);
    }
});

const test_place_holder = document.getElementById('tests');
function displayTests () {
    society1.build_tl(p1);
    for(let i=0;i<society1.testList.length ; ++ i) {
        test_place_holder.insertAdjacentHTML('beforeend',`  <button class="testButton"  data-tn="${i}"> test ${i+1} </button>  `);
    }
}
test_place_holder.addEventListener('click', function(event){
    const target = event.target;
    if(target.tagName == 'BUTTON') {
        const test_number = target.dataset.tn ;
        target.style.backgroundColor = 'yellow';
        console.log(test_number);
        testNumber(test_number);
    }
});
test_place_holder.addEventListener('mouseover', function(event){
    const target = event.target;
    if(target.tagName == 'BUTTON') {
        const test_number = target.dataset.tn ;
        displayTestsSpecifications(test_number);
    }
});

displayPeople();
displayTests();

let patient_list= []; 
for(let i = 0 ; i<society1.peopleList.length ; ++i ) {
    if(society1.peopleList[i].isIll == true ) {
        patient_list.push(i);
    }
}
console.log("These people are sick: ",patient_list);

console.log(society1.peopleList);
console.log(society1.testList);


let flag = false;
let score = 1000;
let selected = new Set();

function Test1() {
    if(!flag) takeTest(p1,testnum);
}

let patientsList = [];

function takeTest( p , t ) {

    document.getElementById('may-be-sick').innerHTML = " ";
    let sub_patient_list = [];
    for(let i = 0 ; i < p.length ; ++i ) {
        selected.add( p[ i ] );
    }

    console.log("budget:",society1.budget);

   p.forEach( e => {
    if( society1.peopleList[e].difficulty + society1.testList[t].testDifficulty <= 1 && society1.budget - society1.testList[t].cost >= 0 ) {
        
        society1.budget -= society1.testList[t].cost;
        society1.peopleList[e].difficulty += society1.testList[t].testDifficulty;
        if(society1.peopleList[e].isIll == true) {
            sub_patient_list.push( e );
            console.log("is sick",e);
        }
        else {
            console.log("is not sick",e);
        }
    } else {
        if( society1.peopleList[e].difficulty + society1.testList[t].testDifficulty >= 1) {
            alert("you cannot try this test on this person");
        } else {
            alert("you don't have enough money. choose another test.");
        }
    }
   })

    let n_cp = parseInt(sub_patient_list.length * society1.testList[t].cp) ;
    console.log("n_cp: " , n_cp);
    let randomSick = getRandom(sub_patient_list,n_cp);
    console.log("random sick: ",randomSick);
    console.log("patient list1: ",patientsList);
    patientsList = [...patientsList,...randomSick];
    console.log("patient list2: ",patientsList);

    for(let j = 0 ; j < patientsList.length;j++) {
        document.getElementById('may-be-sick').insertAdjacentHTML('beforeend' , `, ${patientsList[j]}`);
    }
  
    while(p.length > 0) {
        p.pop();
    }
 
    if(society1.budget < 1000 || patientsList.length == patient_list.length)
    {
    flag = true;
    patientsList.forEach(i => {
        console.log(`patient list ${patientsList[i]}`);
    })

    alert("Game is Over. \br your final score: " + score);
    location.reload();
    }
}



function resetButton() {
    var x = document.querySelectorAll('button');
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "inherit";
    }
}

function showBudget (){
    document.getElementById('show-budget').innerHTML = society1.budget;
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// const finish_button_holder = document.getElementById('finish');
// finish_button_holder.addEventListener('click', function(event){
//     const target = event.target;
//     if(target.tagName == 'BUTTON') {
//         console.log(endGame(p1));
//         alert(`Your final score is ${endGame(p1)} !`);
//         location.reload();
//     }
// });

// function endGame(p) {
//     let count = 0;
//     p.forEach( e => {
//         if(society1.peopleList[e].isIll == true ) {
//             score += 100 ;
//             count++;
//         } else {
//             score -= 50;
//         }
//     })
//     score -= (patient_list.length - count) * 200;
//     return score;
// }