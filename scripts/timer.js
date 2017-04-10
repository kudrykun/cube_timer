
	var start_time = 0; /*Время старта*/
	var end_time = 0;/*Время финиша*/
	var elapsed_time = 0;/*Прошедшее время*/
	var checkings = 0; /*Количество замеров*/
	var standart = +new Date(1970,1, 1, 0, 0, 0, 0);
	var timer = 0; /*Обертка функции-интервала*/
	var checkings_arr = [];

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
            checkings++; /*Инкрементируем количество замеров*/
            elapsed_time = end_time - start_time; /*Вычисляем конечное время*/
            checkings_arr.push(elapsed_time);/*Закидываем результат в массив*/
            rewrite_plain_results(); /*переписываем список результатов*/
            rewrite_average_results(); /*Переписываем средние результаты*/
            
            
		}
	}

	/*Обновляем секундомер 100 раз в секунду*/
	function start_timer() {
		end_time = (+new Date());
		elapsed_time = end_time - start_time;
		$('#time').text(formatTime());
	}

	/*Форматируем время в m:ss.msms*/
	function formatTime(){
		var time_string = new Date(elapsed_time+standart).toString().replace(/.*([0-9]:[0-9][0-9]).*/, '$1');
		var ms = String(Math.trunc(elapsed_time % 1000 / 10));
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

	/*Переписываем результаты*/
	function rewrite_plain_results() {
		$('#results-list').append('<li id="'+ (checkings-1) + '-result">' + formatTime() + "</li>");/*Добавляем замер в таблицу*/
	}
	/*Переписываем средние результаты*/
	function rewrite_average_results() {
		$('#checkings').text(checkings);/*Вывод количества попыток*/
	}
