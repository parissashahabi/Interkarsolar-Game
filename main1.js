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
let sub_patient_list = [];
let sub_nonpatient_list = [];
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
        let testList = [];
       
        p1.forEach( e => {
             if(society1.peopleList[e].isIll == true) {
            sub_patient_list.push( e );
            console.log("is sick",e);
        } else {
            sub_nonpatient_list.push(e);
            console.log("is not sick",e);
        }
        for(let i = 1 ; i < sub_patient_list.length ; ++i ) {
            for(let j = p1.length - i  ; j > 1; --j ) {
                let test = new Test((i/sub_patient_list.length),(i/(i+j)),Math.random().toFixed(2), Math.floor(Math.random() * 10) + 1);
                
                testList.push( test );
                for(let k = 0 ; k < testList.length - 1; k++) {
                    if(testList[k].cp == test.cp && testList[k].pod == test.pod) {
                        testList.pop();
                    }
                }
            }
        }
        
        })
       console.log(testList);
        this.testList = testList;
        return testList;
    }
}

let society1  = new Society(20,7,Math.floor(Math.random() * 3000) + 1000);

society1.build_pl();

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
    
    document.getElementById('test-specifications').innerHTML = `درصد درستی: ${society1.testList[t].cp}
    درصد تشخیص: ${society1.testList[t].pod}
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

let patient_list= [];
for(let i = 0 ; i<society1.peopleList.length ; ++i ) {
    if(society1.peopleList[i].isIll == true ) {
        patient_list.push(i);
    }
}
console.log("These people are sick: ",patient_list);

console.log(society1.peopleList);
console.log(society1.testList);
function min_cost() {
    let costList = [];
    for (let i = 0; i < 7 ; i++) {
      costList.push(society1.testList[i].cost);
    }
    let minCost = Math.min.apply(Math,costList);
    return minCost;

}

let flag = false;
let score = 1000;
let selected = new Set();

function Test1() {
    if(!flag) takeTest(p1,testnum);
}

let patientsList = [];

function takeTest( p , t ) {

    for(let i = 0 ; i < p.length ; ++i ) {
        selected.add( p[ i ] );
    }

    console.log("budget:",society1.budget);

   p.forEach( e => {
    if( society1.peopleList[e].difficulty + society1.testList[t].testDifficulty < 1 && society1.budget - society1.testList[t].cost >= 0 ) {
        
        society1.budget -= society1.testList[t].cost;
        society1.peopleList[e].difficulty += society1.testList[t].testDifficulty;
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
    let n_pod = parseInt(n_cp / society1.testList[t].pod) - n_cp;
    console.log("n_pod: " , n_pod);
    let may_be_sick = [];
    let may_not_be_sick = [];
    let p_randomSick_list = [];
    p_randomSick_list = p.filter(n => !randomSick.includes(n));
    console.log("p - random sick list: ",p_randomSick_list);
    let randomList = getRandom(p_randomSick_list,n_pod);
    randomList.forEach( e => {
         if( society1.peopleList[e].isIll == true ) {
            may_not_be_sick.push(e);
        } else {
            may_be_sick.push(e);
        }
    })
    console.log("random list: ",randomList);
    may_be_sick = [...may_be_sick,...randomSick];
    console.log("may be sick: ",may_be_sick);
    console.log("may not be sick: ",may_not_be_sick);
    for(let j = 0 ; j < may_be_sick.length;j++) {
        document.getElementById('may-be-sick').insertAdjacentHTML('beforeend' , `, ${may_be_sick[j]}`);
    }
    for(let j = 0 ; j < may_not_be_sick.length;j++) {
        document.getElementById('may-not-be-sick').insertAdjacentHTML('beforeend' , `, ${may_not_be_sick[j]}`);
       }
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
    //     
    // }



    while(p.length > 0) {
        p.pop();
    }
    while(society1.testList.length > 0) {
        society1.testList.pop();
    }
    document.getElementById('tests').innerHTML = " ";
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




const finish_button_holder = document.getElementById('finish');
finish_button_holder.addEventListener('click', function(event){
    const target = event.target;
    if(target.tagName == 'BUTTON') {
        console.log(endGame(p1));
        alert(`Your final score is ${endGame(p1)} !`);
        location.reload();
    }
});

function endGame(p) {
    let count = 0;
    p.forEach( e => {
        if(society1.peopleList[e].isIll == true ) {
            score += 100 ;
            count++;
        } else {
            score -= 50;
        }
    })
    score -= (patient_list.length - count) * 200;
    return score;
}