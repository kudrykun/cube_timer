	/*Спасибо за идею и некоторые куски кода сайту http://sekundomer.net/ !*/
	var start_time = 0; /*Время старта*/
	var end_time = 0;/*Время финиша*/
	var elapsed_time = 0;/*Прошедшее время*/
	var standart = +new Date(1970,1, 1, 0, 0, 0, 0);
	var timer = 0; /*Обертка функции-интервала*/
	var checkings_arr = []; /*Массив результатов*/

	/*Старт и финиш*/
	function start() {
		if (timer == 0) {
			start_time = (+new Date());
			timer = setInterval(function(){
				start_timer()
			},10);
		}
		else {
			clearInterval(timer); /*останавливает таймер*/
            timer=0; /*Обнуление таймера*/
            elapsed_time = end_time - start_time; /*Вычисляем конечное время*/
            checkings_arr.push(elapsed_time);/*Закидываем результат в массив*/
            $('#results-list').append('<li id="'+ (checkings_arr.length -1) + '-check">' + formatTime(elapsed_time) + "</li>");/*Добавляем замер в таблицу*/
            refresh_plain_results();
            refresh_average_results();  
		}
	}

	/*Обновляем секундомер 100 раз в секунду*/
	function start_timer() {
		end_time = (+new Date());
		elapsed_time = end_time - start_time;
		$('#time').text(formatTime(elapsed_time));
	}

	/*Форматируем время в m:ss.msms*/
	function formatTime(ms){
		var time_string = new Date(ms+standart).toString().replace(/.*([0-9]:[0-9][0-9]).*/, '$1');
		var ms = String(Math.trunc(ms % 1000 / 10));
		while (ms.length < 2) ms = '0' + ms; /*Добавляем нули, если число короче 3ех*/
        time_string += '.' + ms; /*Добавляем точку с миллисекундами ко времени стандарта?*/
        return time_string;
	}
	/*действия при нажатии клавиш*/
	function catchToggle(e) {
		if (e.keyCode == 32) { //если нажали Enter, то true	
			start();
  		}
	};
	/*Ловим нажатие*/
	$('html').keydown(function(eventObject){
		catchToggle(eventObject);
	});

	/*Ловим клик*/
	$('#results-list').click(function(event){
		var click_obj = event.target;
		/*Если мы кликаем на результат, то удаляем его из массива и из ul результатов*/
		if (click_obj.tagName == 'LI'){
			delete_plain_result(click_obj);
		}
	});

	/*Переписываем результаты*/
	function delete_plain_result(click_obj) {
		/*Удаляем этот результат из массива*/
		checkings_arr.splice(parseInt(click_obj.id),1);
		/*Находим его соседей в списке результатов*/
		var siblings = $('#'+ click_obj.id).siblings();
		/*Удаляем этот элемент из списка результатов*/
		$('#' + click_obj.id).remove();
		/*Меняем их id*/
		for(var i = 0; i < checkings_arr.length; i++) siblings[i].id = i + '-check';
		refresh_plain_results();
		refresh_average_results();
	}
	/*Переписываем средние результаты*/
	function refresh_plain_results() {
		var best = Math.min.apply(Math,checkings_arr);
		var worst = Math.max.apply(Math,checkings_arr);
		$('#results-list').children().each(function(index){
			if(checkings_arr[index] == best) { 
				$(this).addClass('best-result marker');
			}
			else{
				if(checkings_arr[index] == worst){
					$(this).addClass('worst-result marker');
				}
				else{
					$(this).removeAttr('class');
				}
			}
		});
	}
	/*Переписываем средние результаты*/
	function refresh_average_results() {
		$('#checkings').text(checkings_arr.length);/*Вывод количества попыток*/
		var total_average = 0;
		var three_average = 0;
		var five_average = 0;
		var twelve_average = 0;
		for (var i = 0; i < checkings_arr.length; i++){
			total_average += checkings_arr[i];
			if(i == 2) three_average = total_average / 3;
			if(i == 4) five_average = total_average / 5;
			if(i == 11) twelve_average = total_average / 12;
		}
		total_average = total_average / checkings_arr.length;
		$('#average-all').text(formatTime(total_average));
		$('#average-of-3').text(formatTime(three_average));
		$('#average-of-5').text(formatTime(five_average));
		$('#average-of-12').text(formatTime(twelve_average));
	}
