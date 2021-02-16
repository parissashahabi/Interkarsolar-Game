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
            personList[i] = new Person(Math.random() < 0.5, 0);;
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
let society1  = new Society(14,7,Math.floor(Math.random() * 30) + 10);
society1.build_pl();
society1.build_tl();
let is_sick = [];
for(let i = 0 ; i<society1.peopleList.length ; ++i ) {
    if(society1.peopleList[i].isIll == true ) {
        is_sick.push(i);
    }
}
console.log(is_sick);
console.log(society1.peopleList);
console.log(society1.testList);
let costList = [];
for (let i = 0; i < 7 ; i++) {
  costList.push(society1.testList[i].cost)
}
let minCost = Math.min.apply(Math,costList);


let flag = false;
let score = 100;
let testnum;
let selected = new Set();
let p1 = [];
function pushToArray ( n ) {
    p1.push(n);
    console.log("person added successfully!" , society1.peopleList[n]);
}
function testNumber( n ) {
    testnum = n ;
    console.log("test selected successfully!" , society1.testList[n]);
}
function Test1() {

    if(!flag)takeTest(p1,testnum);
}

let patientsList = [];
function takeTest( p , t ) {

    for(let i = 0 ; i < p.length ; ++i ) {
        selected.add( p[ i ] );
    }
    console.log("budget:",society1.budget);
    console.log("min:",minCost);

    if(society1.budget < minCost || patientsList.length == is_sick.length)
    {
        flag = true;
        patientsList.forEach(i => {
            console.log("patients list:",i);
        })

        selected.forEach( i => {
            console.log("selected:",i);
        })
        }

    p.forEach(element => {
        if( society1.peopleList[element].difficulty + society1.testList[t].testDifficulty < 1 && society1.budget - society1.testList[t].cost >= 0 ) {
            society1.budget -= society1.testList[t].cost;
            society1.peopleList[element].difficulty += society1.testList[t].testDifficulty;
            score -= 10;
            if( society1.peopleList[element].isIll == true ) {
                let sum = society1.testList[t].cp + society1.testList[t].pod;
                let rand = Math.floor(Math.random() * 25) / 100;
                if(rand + sum > 1.5 ) {
                    patientsList.push( society1.peopleList[element] );
                    console.log("this person is ill");
                    switch(element){
                        case 0:
                            document.getElementById('btn-0').innerHTML = "this person is ill";
                            document.getElementById('btn-0').style.background = 'green';
                            break;
                        case 1:
                            document.getElementById('btn-1').innerHTML = "this person is ill";
                            document.getElementById('btn-1').style.background = 'green';
                            break;
                        case 2:
                            document.getElementById('btn-2').innerHTML = "this person is ill";
                            document.getElementById('btn-2').style.background = 'green';
                            break;
                        case 3:
                            document.getElementById('btn-3').innerHTML = "this person is ill";
                            document.getElementById('btn-3').style.background = 'green';
                            break;
                        case 4:
                            document.getElementById('btn-4').innerHTML = "this person is ill";
                            document.getElementById('btn-4').style.background = 'green';
                            break;
                        case 5:
                            document.getElementById('btn-5').innerHTML = "this person is ill";
                            document.getElementById('btn-5').style.background = 'green';
                            break;
                        case 6:
                            document.getElementById('btn-6').innerHTML = "this person is ill";
                            document.getElementById('btn-6').style.background = 'green';
                            break;
                        case 7:
                            document.getElementById('btn-7').innerHTML = "this person is ill";
                            document.getElementById('btn-7').style.background = 'green';
                            break;
                        case 8:
                            document.getElementById('btn-8').innerHTML = "this person is ill";
                            document.getElementById('btn-8').style.background = 'green';
                            break;
                        case 9:
                            document.getElementById('btn-9').innerHTML = "this person is ill";
                            document.getElementById('btn-9').style.background = 'green';
                            break;
                        case 10:
                            document.getElementById('btn-10').innerHTML = "this person is ill";
                            document.getElementById('btn-10').style.background = 'green';
                            break;
                        case 11:
                            document.getElementById('btn-11').innerHTML = "this person is ill";
                            document.getElementById('btn-11').style.background = 'green';
                            break;
                        case 12:
                            document.getElementById('btn-12').innerHTML = "this person is ill";
                            document.getElementById('btn-12').style.background = 'green';
                            break;
                        case 13:
                            document.getElementById('btn-13').innerHTML = "this person is ill";
                            document.getElementById('btn-13').style.background = 'green';
                            break;
                        default:
                            break;
                    }
                    score += 30;
                }
            }else {
                score -= 15;
            }
            console.log( society1.peopleList[element] );
        }
        else {
            alert("you cannot try this test on this person");
            console.log("you can't test on this person anymore" , society1.peopleList[element] );
        }
    });
console.log(society1.testList[t]);
console.log(society1.budget);
console.log(score);
while(p.length > 0) {
    p.pop();
}
console.log(p);
}

function displayTests( t ) {
    document.getElementById('test-specifications').innerHTML = "درصد درستی: " + society1.testList[t].cp + " " + "درصد تشخیص: " + society1.testList[t].pod + " " + "سختی: " + society1.testList[t].testDifficulty + " " + "هزینه: " + society1.testList[t].cost ; 
}
function clear () {
    document.getElementById('test-specifications').innerHTML = " ";
}
function resetButton() {
    var x = document.getElementsByClassName("BTN");
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "#efefef";
    }
  }
  function showBudget (){
      document.getElementById('show-budget').innerHTML = society1.budget;
  }