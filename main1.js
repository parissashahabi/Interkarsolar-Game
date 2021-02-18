class Person {
    constructor(isIll, difficulty) {
      this.isIll = isIll;
      this.difficulty = parseFloat(difficulty);
    }
}

class Test {
    constructor(cp, pod,testDifficulty,cost) {
      this.cp = parseFloat(cp);
      this.pod = parseFloat(pod);
      this.testDifficulty = parseFloat(testDifficulty);
      this.cost = parseInt(cost);
    }
}

class Society{
    constructor(nPerson,nTest,budget) {
        this.nPerson = parseInt(nPerson);
        this.nTest = parseInt(nTest);
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
        let testList = new Array(this.nTest);
        for(let i=0;i<this.nTest;i++) {
            testList[i] = new Test(Math.random().toFixed(2), Math.random().toFixed(2),Math.random().toFixed(2), Math.floor(Math.random() * 10) + 1);
        }
        this.testList = testList;
        return testList;
    }
}
let society1  = new Society(20,7,Math.floor(Math.random() * 30) + 10);

society1.build_pl();
society1.build_tl();

showBudget ();

function displayPeople () {
    for(let i=0;i<society1.peopleList.length ; ++ i) {
        document.getElementById('people').insertAdjacentHTML('beforeend',`  <button> person ${i+1} </button>  `);
    }
}

function displayTests () {
    for(let i=0;i<society1.testList.length ; ++ i) {
        document.getElementById('tests').insertAdjacentHTML('beforeend',`  <button> test ${i+1} </button>`  );
    }
}

displayTests();
displayPeople();

let patient_list= [];
for(let i = 0 ; i<society1.peopleList.length ; ++i ) {
    if(society1.peopleList[i].isIll == true ) {
        patient_list.push(i);
    }
}
console.log("These people are sick: ",patient_list);

console.log(society1.peopleList);
console.log(society1.testList);

let costList = [];
for (let i = 0; i < 7 ; i++) {
  costList.push(society1.testList[i].cost);
}
let minCost = Math.min.apply(Math,costList);


let flag = false;
let score = 100;
let selected = new Set();
let p1 = [];

function pushToArray ( n ) {
    p1.push(n);
    console.log(`person ${n} added successfully!`);
}

let testnum;
function testNumber( n ) {
    testnum = n ;
    //console.log(is_sick.length * society1.testList[testnum].cp);
    console.log(`test ${n} selected successfully!` , society1.testList[n]);
}

function Test1() {
    if(!flag) takeTest(p1,testnum);
}

let patientsList = [];

function takeTest( p , t ) {

    for(let i = 0 ; i < p.length ; ++i ) {
        selected.add( p[ i ] );
    }

    console.log("budget:",society1.budget);
    console.log("min:",minCost);

    let sub_patient_list = [];
    let sub_nonpatient_list = [];
   p.forEach( e => {
    if( society1.peopleList[e].difficulty + society1.testList[t].testDifficulty < 1 && society1.budget - society1.testList[t].cost >= 0 ) {
        
        society1.budget -= society1.testList[t].cost;
        society1.peopleList[e].difficulty += society1.testList[t].testDifficulty;

        if(society1.peopleList[e].isIll == true) {
            sub_patient_list.push( e );
        } else {
            sub_nonpatient_list.push(e);
        }
    } else {
        if( society1.peopleList[element].difficulty + society1.testList[t].testDifficulty >= 1) {
            alert("you cannot try this test on this person");
        } else {
            alert("you don't have enough money. choose another test.");
        }
    }
   })

    let n_cp = sub_patient_list.length * society1.testList[t].cp ;
    let n_pod = n_cp / society1.testList[t].pod;
    let may_be_sick = [];
    let first = getRandom(sub_patient_list,n_cp);
    let second = getRandom(sub_nonpatient_list,n_pod);
    may_be_sick.push(...first, ...second);
    
    // if(society1.budget < minCost || patientsList.length == is_sick.length)
    // {
    //     flag = true;
    //     patientsList.forEach(i => {
    //         console.log("patients list:",i);
    //     })

    //     selected.forEach( i => {
    //         console.log("selected:",i);
    //     })
    //     alert("Game is Over. \br your final score: " + score);
    //     location.reload();
    // }



    while(p.length > 0) {
        p.pop();
    }
}

function displayTestsSpecifications( t ) {
    
    document.getElementById('test-specifications').innerHTML = `درصد درستی: ${society1.testList[t].cp}
    درصد تشخیص: ${society1.testList[t].pod}
    سختی: ${society1.testList[t].testDifficulty}
    هزینه:  ${society1.testList[t].cost }
    ` ; 
}

function resetButton() {
    var x = document.querySelectorAll('button');
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "#efefef";
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