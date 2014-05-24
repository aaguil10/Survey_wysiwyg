var survey_count = 0;
var my_survey = null;

//question object
function Question(id,val,slot) {
	this.id = id;		//stores element id
	this.val = val;		//stores value in input field
	this.slot = slot;	//stores the order that the questions in
}

//Section object stores an array of questions
function Section(id,slot){
	this.id = id;			//stores id of section
	this.q = [];			//stores array of questions q[0] being the first q in the survey
	this.slot = slot;		//use to keep track of the order of elements
	this.count = 0;			//count of questions made so far
	this.slot_finder = [];	//used as a hash to find slot value of a question from id
}


//Survey object stores an array of sections
function Survey(sur_id,inbed_id){
	this.s = [];			//array of sections
	this.count = 0;			//count of sections made so far
	this.slot_finder = [];	//slot_finder[section_id] will give section_slot (see above)
	this.id = sur_id;
	$('#' + inbed_id).append(buildSurvey(sur_id));
	console.log("made survey!");
}


function buildSurvey(sur_id){
	var survey = document.createElement("ul");
	//survey.innerHTML = '<h3>my survey<h3>';
	survey.setAttribute('class', 'surveys');
	survey.setAttribute('id', sur_id);
	return survey;

}

Survey.prototype.UpdateSecOrder = function (array) {
	var tmp = [];
	//var str  = array[0].split("_");
	

	for(var i = 0; i < this.s.length; i++){
		var str  = array[i].split("_");
		var sec_id = 'section_' + str[1];
		var sec_slot = this.slot_finder[sec_id];
		tmp[i] = this.s[sec_slot];
		//console.log("Sec[" + sec_slot + "]: " + this.s[sec_slot]);
		this.slot_finder[sec_id] = i;
	}

	//console.log(tmp);
	this.s = tmp;
}

Survey.prototype.makeSection = function (id_num) {
	this.s[this.count] = new Section('section_' + id_num, this.count);
	this.slot_finder['section_' + id_num] = this.count;
	//console.log('Put section_'+ id_num + ' in slot ' + this.slot_finder['section_' + id_num]);

	var section = document.createElement("ul");
	section.setAttribute('class', 'sections');
	section.setAttribute('id', 'section_' + id_num);
	section.setAttribute('onclick', 'change_selection(this.id)');
	
	//essentially <li><ul>...Ques...</ul></li>  the "li" is part of a bigger list that 
	//enables the sections to be sortable 
	var wrapper = document.createElement("li");
	wrapper.setAttribute('class', 'form_sections');
	wrapper.setAttribute('id', 'secList_' + id_num);
	wrapper.innerHTML = "<h4>Section Name<h4>";
	$(wrapper).append(section);
	$('#' + this.id).append(wrapper);
	console.log('created ' + this.s[this.count].id);
	
	this.count++;
};


$( document ).ready(function() {
    console.log( "ready!" );
	my_survey = new Survey('survey_' + survey_count++, 'form_display');
	//my_survey.makeSection('section_' + my_survey.count);
	$('.surveys').sortable({
		update: function(event, ui) {
			var arr = $('.surveys').sortable('toArray');
			//console.log(arr);
			//console.log(my_survey.slot_finder['section_' + 0]);
			my_survey.UpdateSecOrder(arr);
			//printA(my_survey.s);
			
			
		}
	
	});
	$('.surveys').disableSelection();	

	
});



function add_section(){
	my_survey.makeSection(my_survey.count);
}


function printA(array){
	var str = "";
	for(var i = 0; i < array.length; i++){
		str += array[i].id + ',';
	}
	console.log(str);
}

function debug(){
	printA(my_survey.s);

}