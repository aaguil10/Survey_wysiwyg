/* your Javascript goes here */
var sec_count = 0;
var ques_count = 0;
var curr_selcetion = null;


function change_selection(new_id){
	if(curr_selcetion != null){
		$('#' + curr_selcetion).css('border','1px solid cyan');
	}
	curr_selcetion = new_id;
	$('#' + curr_selcetion).css('border','1px solid blue');
}

function make_section(id_num){
	var section = document.createElement("div");
	section.innerHTML = "<h3>Section Name<h3>";
	section.setAttribute('class', 'sections');
	section.setAttribute('id', 'section_' + id_num);
	section.setAttribute('onclick', 'change_selection(this.id)');
	return section;
}

function make_question(id_num){
	var question = document.createElement("div");
	question.innerHTML = "<h3>Question Name<h3>";
	question.setAttribute('class', 'questions');
	question.setAttribute('id', 'question_' + id_num);
	//question.setAttribute('onclick', 'select_sec(this.id)');
	return question;
}


function selector(id){
    //curr_selcetion = id;
	//$('#' + curr_selcetion).css('border','1px solid blue');
	//alert(id);
	change_selection(id)
}

function add_section(){
	//alert("Your adding a section!");
	tmp_selcetion = 'section_' + sec_count;
	$('#form_display').append(make_section(sec_count++));
	//$('#' + curr_selcetion).css('border','1px solid blue');
	change_selection(tmp_selcetion);
}

function add_question(){
	//alert("Your adding a question");
	$('#' + curr_selcetion).append(make_question(ques_count++));

}