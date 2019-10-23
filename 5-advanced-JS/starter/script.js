/* 
- Everything except primitives are objects

- Objects interacting with one another through methods and properties;
- Used to store data, structure applications into modules and keeping code clean.
- Constructors are used as blueprints to create Instances

- Every JavaScript object has a prototype property, which makes inheritance possible in JavaScript
- The prototype property of an object is where we put methods and properties we want other objects to inheritance
- The Contructtor's protoptype property is NOT the prototype of the Contructor itself,
it's the prototype of ALL instances that are created through it
- When a certain method (or property) is called, the search starts in the object itself,
and if it cannot be found, the search moves on to the object's prototype. This
continues until the mthod is found: prototype chain
*/
// Function constructor
/* var john = {
	name: 'John',
	yearOfBirth: 1990,
	job: 'teacher'
}; */

/*
var Person = function(name, yearOfBirth, job){
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
}

Person.prototype.calculateAge = function(){
		console.log(2019 - this.yearOfBirth);
	}

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');

john.calculateAge();

var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
*/

// Object.create
/*
var personProto = {
	calculateAge: function(){
		console.log(2019 - this.yearOfBirth);
	}
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, 
{
	name: {value : 'Jane'},
	yearOfBirth: {value: 1969},
	job: {value: 'designer'}
	
});
*/

// Primitives vs objects

/*
//primitives

var a = 23;
var b = a;

a = 46;
console.log(a,b);


// Objects
var obj1 = {
	name: 'John',
	age: 26
};
var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age ,obj2.age);

// Functions
var age = 27;
var obj = {
	name: 'Jonas',
	city: 'Lisbon'
};

function change(a, b){
	a = 30;
	b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);
*/

/////////////////////////////////
// Lecture: Passing functions as arguments
/*
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn){
	var arrRes = [];
	for (var i = 0; i < arr.length; i++){
		arrRes.push(fn(arr[i]));
	}
	return arrRes;
}

function calculateAge(el){
	return 2019 - el;
}

function isFullAge(el){
	return el >= 18;
}

function maxHeartBeat(el){
	if (el >= 18 && el <= 81){
	return Math.round(206.9 - (0.67 * el));
	} else {
		return -1;
	}
}

var ages = arrayCalc(years, calculateAge);

var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartBeat);
console.log(ages);
console.log(fullAges);
console.log(rates);
*/

//////////////////////////////////////////////
// Lecture: Functions returning functions
/*
function interviewQuestions(job){
	if(job === 'designer'){
		return function(name){
			console.log(name + ' , can you please explain what UX design is?');
		}
	} else if (job === 'teacher'){
		return function(name){
			console.log('What subject do you teach, ' + name + '?');
		}
	} else {
		return function(name){
			console.log('Hello ' + name +', what do you do?' );
		}
	}
		
}

var teacherQuestion = interviewQuestions('teacher');
var designerQuestion = interviewQuestions('designer');

teacherQuestion('John');
designerQuestion('John');
designerQuestion('Jane');

interviewQuestions('teacher')('Mark');

*/

/////////////////////////////////
// Lecture: Immediately invoked function expression (IIFE)

// IIFE is useful to create a private scope, where the variables are not accessible outside.
// This is useful when you don't want to create a reusable function

/*
function game(){
	var score = Math.random() * 10;
	console.log(score >= 5);
}
game();
*/
/*
(function (){var score = Math.random() * 10;
	console.log(score >= 5);
})();

(function (goodLuck){var score = Math.random() * 10;
	console.log(score >= 5 - goodLuck);
})(5);
	
//console.log(score);
*/

///////////////////////////////
// Lecture: Closures
/*
function retirement(retirementAge){
	var a = ' years left until retirement.';
	return function(yearOfBirth) {
		var age = 2016 - yearOfBirth;
		console.log((retirementAge - age) + a);
	}
}

var retirementUS = retirement(66);
retirementUS(1990);
var retirementGermany = 
retirement(65);
var retirementIceland = 
retirement(67);

retirement(66)(1990);
retirementGermany(1990);
retirementIceland(1990);

//Result:
// 40 years left until retirement.
// (2016 - (2016 - 1990))
*/
/*
Closure summary
An inner function has always access to the variables and parameters of its outer function,
even after the outer function has returned
*/
/*
function interviewQuestions(job){
	if(job === 'designer'){
		return function(name){
			console.log(name + ' , can you please explain what UX design is?');
		}
	} else if (job === 'teacher'){
		return function(name){
			console.log('What subject do you teach, ' + name + '?');
		}
	} else {
		return function(name){
			console.log('Hello ' + name +', what do you do?' );
		}
	}
		
}
*/
/*
function interviewQuestions(job){
	return function(name){
		if (job === 'designer'){
		  console.log(name + ' , can you please explain what UX design is?');
		} else if (job === 'teacher'){
		  console.log('What subject do you teach, ' + name + '?');
		} else{
			console.log('Hello ' + name +', what do you do?' );
		}
	  
	}
}
interviewQuestions('teacher')('John');
*/

///////////////////////////////////
// Lecture: Bind, call and apply

/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if (style === 'formal'){
            console.log('Good ' + timeOfDay + ' , Ladies and gentlement! I\'m a ' + 
            this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {console.log('Hey! What\'s up? I\'m ' + this.name + 
        ', I\'m a ' + this.job + 
        ' and I\'m ' + this.age + 
        ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
    }
    
var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');

john.presentation.call(emily, 'friendly', 'afternoon');

//john.presentation.apply(emily, ['friendly', 'afternoon'])

var johnFriendly = john.presentation.bind(john, 'friendly');


//currying create a function based on another function to create a preset
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');




var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn){
	var arrRes = [];
	for (var i = 0; i < arr.length; i++){
		arrRes.push(fn(arr[i]));
	}
	return arrRes;
}

function calculateAge(el){
	return 2019 - el;
}

function isFullAge(limit, el){
	return el >= limit;
}

var ages = arrayCalc(years, calculateAge)

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);


*/


/***************************************
 CODING CHALLENGE 7
***************************************/

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) The question itself
b) The answers from which the player can choose the correct one (choose an adquate data structure here, array, object, etc.)
c) Correct anwser (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers
(each question should have a number) (Hint: write a method for the Question for this task)

5. Use the 'prompt' function to ask the user for the correct answer. 
The user should input the number of the correct answer such as you displayed it on task 4. 

6. Check if the answer is correct and print to the console whether the answer is correct or not
(Hint: write another method for this)

7. Suppose this code would be a plugin for other progrmmers to use in their code.
So make sure that all your code is private and doesn't interfere with other programmers code
(Hint: we learned a special teqnique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends
(Hint: write a function for this and call it right after displaying the result)

9. Be careful: After task 8, the game literally never ends. So include the option to quit
the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point
to the score (HINT: I'm going to use the power of closures for this, but you don't have to,
just do this with the tools you feel more comfortable at this point.)

11. Display the score in the console. Use yet another method for this.
*/
(function() {
var question1 = new Question("Who is da best", ["Tony", "Me", "no u"], 0);
var question2 = new Question("The true answer", ["1337", "42", "69"], 1);

var score = 0;
var questions = [];
questions.push(question1);
questions.push(question2);
var currentQuestion;	

function Question(desc, answers, solution){
    this.question = desc;
    this.answers = answers;
    this.solution = solution;
}

Question.prototype.checkAnswer = function(ans){
    if (parseInt(ans) === this.solution) {
        console.log("Correct answer :)");
    } else {
        console.log("Wrong answer :( Try again!");
    }

}


Question.prototype.displayQuestion = function(){
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++){
        console.log(i + ': ' + this.answers[i]);
    } 
}

console.log(currentQuestion);

currentQuestion = Math.floor(Math.random() * questions.length);
questions[currentQuestion].displayQuestion();

var playerChoice = prompt('Please select the right answer');


questions[currentQuestion].checkAnswer(playerChoice);	


})();


/*
function displayQuestion(quest){
    console.log(quest.question);
    for (var i = 0; i < quest.answers.length; i++){
        console.log(i + ': ' + quest.answers[i]);
    }    
}



displayQuestion(questions[currentQuestion]);
var playerChoice = prompt('test');
function checkAnswer(question, playerChoice){
    console.log(question.solution);
    console.log(playerChoice);
    if (question.solution == playerChoice){
        return "right answer! :)";
    } else{
        return "wrong answer :(";
    }
    
}
console.log(checkAnswer(questions[currentQuestion], playerChoice));

*/