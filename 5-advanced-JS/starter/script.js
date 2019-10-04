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

function retirement(retirementAge){
	var a = ' years left until retirement.';
	return function(yearOfBirth) {
		var age = 2016 - yearOfBirth;
		console.log((retirementAge - age) + a);
	}
}

var retirementUS = retirement(66);
retirementUS(1990);

retirement(66)(1990);

//Result:
// 40 years left until retirement.
// (2016 - (2016 - 1990))

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