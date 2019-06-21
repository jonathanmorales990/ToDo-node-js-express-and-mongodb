$(function() {

	let loading = false;

	$(document).on('click', '.remove-item', function () {
		removeAjax($(this));
	});

	function removeAjax (element) {
		let data = {
			"_id": $(element).attr('id')
		}
		let loading = false;

		if (loading == true) {
			return false;
		}

		loading = true;

		$(element).empty();
		$(element).append('<img class="remove-todo-loading" src="/images/loading.gif">');

		$.ajax({
			type: 'DELETE',
			url: '/todo',
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function (dataServer) {
			loading = false;
			$(element).empty();
			$(element).append('<span class="glyphicon glyphicon-remove"></span>');
			removeTodo(element);
		}).fail(function (dataServer) {
			loading = false;
			$(element).empty();
			$(element).append('<span class="glyphicon glyphicon-remove"></span>');
		});
	}
	function removeTodo (element) {
		$(element).closest('li').remove();
	}
});