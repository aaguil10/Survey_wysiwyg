var survey_count = 0;
var my_survey = null;
var curr_selcetion = null;
var question_count = 0;

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

//creates Question objects and html for questions
Section.prototype.makeQuestion = function (q_id) {
	this.q[this.count] = new Question("question_" + q_id, "Type question here", this.count);
	this.slot_finder["question_" + q_id] = this.count;

	var question = document.createElement("li");
	question.innerHTML = '<h3>Question Name<h3>';
	question.innerHTML += '<input type="text" name="fname" class="inputs" id="in_' + q_id + '" value="Type question here">';
	question.setAttribute('class', 'questions');
	question.setAttribute('id', 'question_' + q_id);
	$('#' + this.id).append(question);
	console.log('created ' + this.q[this.count].id);
	this.count++;

}

//Updates Question array in question object
Section.prototype.UpdateQuesOrder = function (array) {
	var tmp = [];
	for(var i = 0; i < this.q.length; i++){
		var sec_slot = this.slot_finder[array[i]];
		tmp[i] = this.q[sec_slot];
		this.slot_finder[array[i]] = i;	//update slot_finder for Question
	}
	this.q = tmp;
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

//creates list
function buildSurvey(sur_id){
	var survey = document.createElement("ul");
	//survey.innerHTML = '<h3>my survey<h3>';
	survey.setAttribute('class', 'surveys');
	survey.setAttribute('id', sur_id);
	return survey;

}

//Updates order of Sections in our Object Survey when it's sorted
Survey.prototype.UpdateSecOrder = function (array) {
	var tmp = [];
	for(var i = 0; i < this.s.length; i++){
		var str  = array[i].split("_");
		var sec_id = 'section_' + str[1];	//convert secList_0 to section_0
		var sec_slot = this.slot_finder[sec_id];
		tmp[i] = this.s[sec_slot];
		this.slot_finder[sec_id] = i;	//update slot_finder for section
	}
	this.s = tmp;
}

//Makes Section object and then creates html and inserts it to current survey
Survey.prototype.makeSection = function (id_num) {
	this.s[this.count] = new Section('section_' + id_num, this.count);
	this.slot_finder['section_' + id_num] = this.count;

	var section = document.createElement("ul");
	section.setAttribute('class', 'sections');
	section.setAttribute('id', 'section_' + id_num);
	
	//essentially <li><ul>...Ques...</ul></li>  the "li" is part of a bigger list that 
	//enables the sections to be sortable 
	var wrapper = document.createElement("li");
	wrapper.setAttribute('class', 'form_sections');
	wrapper.setAttribute('id', 'secList_' + id_num);
	wrapper.setAttribute('onclick', 'change_selection(this.id)');
	wrapper.innerHTML = "<h4>Section Name<h4>";
	$(wrapper).append(section);
	$('#' + this.id).append(wrapper);
	console.log('created ' + this.s[this.count].id);
	change_selection('secList_' + id_num)
	
	this.count++;
};


$( document ).ready(function() {
	my_survey = new Survey('survey_' + survey_count++, 'form_display');
	$('.surveys').sortable({
		update: function(event, ui) {	//updates order of sections
			var arr = $('.surveys').sortable('toArray');
			my_survey.UpdateSecOrder(arr);	
		}
	});
	$('.surveys').disableSelection();	

	
});


function add_section(){
	my_survey.makeSection(my_survey.count);
		$('.sections').sortable({
		update: function(event, ui) {	//updates order of sections
			var arr = $('#'+ this.id).sortable('toArray');
			var sec_slot = my_survey.slot_finder[this.id];
			my_survey.s[sec_slot].UpdateQuesOrder(arr);	
		}
	});
	$('.sections').disableSelection();	
}

function add_question(){
	var str  = curr_selcetion.split("_");
	var sec_id = 'section_' + str[1];
	var sec_slot = my_survey.slot_finder[sec_id];
	my_survey.s[sec_slot].makeQuestion(question_count++);
	
	$( ".inputs" ).change(function() {
		var str  = curr_selcetion.split("_");
		var sec_id = 'section_' + str[1];
		var sec_slot = my_survey.slot_finder[sec_id];
	
	
		var value = $( this ).val();
		//console.log("value: " + value);
		var st  = this.id.split("_");
		var ques_id = 'question_' + st[1];
		var ques_slot = my_survey.s[sec_slot].slot_finder[ques_id];
		my_survey.s[sec_slot].q[ques_slot].val = value;
		console.log("value: " + my_survey.s[sec_slot].q[ques_slot].val);
		
	});
}

//Changes the section selected and makes border blue
function change_selection(S_id){
	var str  = S_id.split("_");
	var sec_id = 'section_' + str[1];
	if(curr_selcetion != null){
		$('#' + curr_selcetion).css('border','none');
	}
	curr_selcetion = S_id;
	$('#' + S_id).css('border','1px solid cyan');
}



function printA(array){
	var str = "";
	for(var i = 0; i < array.length; i++){
		str += array[i].id + ',';
	}
	console.log(str);
}

function debug(){
	var str  = curr_selcetion.split("_");
	var sec_id = 'section_' + str[1];
	var sec_slot = my_survey.slot_finder[sec_id];
	printA(my_survey.s[sec_slot].q);

}