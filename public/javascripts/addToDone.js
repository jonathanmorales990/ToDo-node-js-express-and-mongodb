$(function() {

	$(document).on('click', '.add-as-done', function () {
		addAsDoneAjax($(this));
	});

	function addAsDoneAjax(element) {

		let data = {
			"_id": $(element).attr('id')
		}

		$.ajax({
			type: 'POST',
			url: '/todo',
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function (dataServer) {
			console.log(dataServer)
		}).fail(function (dataServer) {
			console.log(dataServer);
		});
	}
	function doneTodo(doneItem, id){
		var done = doneItem;
		var markup = '<li id="'+ id +'">'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
		$('#done-items').append(markup);
    	}
});
