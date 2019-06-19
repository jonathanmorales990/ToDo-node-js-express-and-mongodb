$(function() {

	$(document).on('click', '#add-new-todo', function () {
		addTodoAjax();
	});

	$(document).on('keypress', function(e) {
		if(e.which == 13) {
			addTodoAjax();
		}
	});

	function addTodoAjax(button) {

		let data = {
			"todo": $('.todo-input').val()
		}

		$.ajax({
		    type: 'PUT',
		    url: '/todo',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		}).done(function (dataServer) {
			console.log(dataServer);
			createTodo( data.todo, dataServer[dataServer.length-1]._id );
		}).fail(function (dataServer) {
			console.log(dataServer);
		});
	}

	function createTodo(text, id){
		let markup = '<li class="ui-state-default"><div class="checkbox"><label> <button id="'+ id +'" class="item btn btn-default btn-xs pull-left add-as-done"><span class="glyphicon glyphicon-ok"></span></button><span style="margin-left: 5px; line-height: 1.7;">'+ text +'</span></label></div></li>';
		$('#sortable').append(markup);
		$('.add-todo').val('');
    	}

});
