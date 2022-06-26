const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

let img1 = document.createElement("img");
    img1.src = "https://cherepah.ru/wp-content/uploads/a/2/6/a264b61adb38e9e95ac24c813037419c.jpeg";
    img1.width = "500";
    img1.heigth = "200";
    img1.alt = "мангуст";
    
    
    headElem.append(img1);
    
// Класс, который представляет сам тест
// Quiz — сам тест. Содержит все данные, отвечает за переход к следующему вопросу и завершение теста.
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

// Класс, представляющий вопрос
// Question — вопрос. Содержит текст вопроса и варианты ответов.
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

// Класс, представляющий ответ
// Answer — ответ. Содержит текст ответа и количество очков.
class Answer 
{


	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

// Класс, представляющий результат
// Result — результат. Содержит финальный текст и количество очков, которое необходимо для достижения этого результата.
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 4),
	new Result("Ваш уровень выше среднего", 6),
	new Result("Вы в совершенстве знаете тему", 8)
];

//Массив с вопросами
const questions = 
[
    
    
    new Question("1. Сколько потребовалось интернету лет для достижения 50 млн. аудитории?", 
	[
		new Answer("1) 1", 0),
		new Answer("2) 5", 1),
		new Answer("3) 10", 0),
		new Answer("4) 13", 0)
	]),
    
    new Question("2. Чем опасна цифровизация?", 
	[
		new Answer("1) вымывание среднего класса", 1),
		new Answer("2) роботы захватят людей", 0),
		new Answer("3) глобальное потепление от электрических приборов", 0),
		new Answer("4) люди меньше будут читать книжки", 0)
	]),
    
    new Question("3. Что значит термин «виртуальный»?", 
	[
		new Answer("1) способность мысленно создавать реальность, отличную от той, в которой мы пребываем в данный момент", 0),
		new Answer("2) это понятие, означающее такое, которое может произойти, мыслимый, осуществимый, допустимый", 0),
		new Answer("3) это понятие, означающее состояние, появляющееся в следствии взаимодействия определённых элементов объективной и субъективной действительности (элементов нашего сознания, компьютера и человека), присутствие определенных искусственно созданных условий и взаимосвязей внутренних компонентов целого, существующее как относительно самостоятельная целостная структура неопределенное время и характеризующееся неопределенностью своего бытия", 1),
		new Answer("4) это понятие, означающее такое, которое только представляется в воображении, нереальный", 0)
	]),
    
    new Question("4. Что не входит в особенность виртуального?", 
	[
		new Answer("1) виртуальное возникает от довиртуального состояния относительного покоя в следствии взаимодействия.", 0),
		new Answer("2) виртуальное состояние – итог становления конкретных новых условий", 0),
		new Answer("3) виртуальное состояние по отношению к довиртуальному состоянию существует столько, сколько позволяют отношения и связи между взаимодействующими элементами системы.", 0),
		new Answer("4) виртуальное состояние заканчивается, когда человек выходит из сети Интернет", 1)
	]),
    
    new Question("5. Что из перечисленного не характеризует виртуальность?", 
	[
		new Answer("1) определенность существования во времени", 1),
		new Answer("2) иллюзорность", 0),
		new Answer("3) конструированность", 0),
		new Answer("4) n - мерность", 0)
	]),
    
    new Question("6. К какой парадигме отношений перешло общество?", 
	[
		new Answer("1) объект - объектные отношения", 0),
		new Answer("2) объект - субъектные отношения", 0),
		new Answer("3) субъект - субъектные отношения", 0),
		new Answer("4) субъект - метасубъектные отношения", 1)
	]),
    
    new Question("7. Какого тип научной рациональности не существует?", 
	[
		new Answer("1) доклассический", 1),
		new Answer("2) классический", 0),
		new Answer("3) неклассический", 0),
		new Answer("4) постнеклассический", 0)
	]),
    
    new Question("8. Главное, что удалось передать режиссеру фильма «Терминатор»?", 
	[
		new Answer("1) убегать от киборга бесполезно", 0),
		new Answer("2) путешествие во времени станет возможным в ближайшем будущем", 0),
		new Answer("3) животный ужас и страх перед неизведанным", 1),
		new Answer("4) кто-то уже спас наше будущее", 0)
	]),
    
    new Question("9. Какая центральная идея сюжета фильма «Матрица»?", 
	[
		new Answer("1) прогресс цифровизации зашел настолько далеко, что машины встали против людей", 0),
		new Answer("2) наш мир может быть нереален, а всё, что мы видим вокруг, — созданная машинами симуляция, которую наш мозг воспринимает как реальность", 1),
		new Answer("3) у искусственного интеллекта тоже может быть душа", 0),
		new Answer("4) Люди стали жестокими и дикими в будущем", 0)
	]),
        
    new Question("10. Вставьте пропущенные слова в описании фильма «Первому игроку приготовиться» <br><br> Технологии, с помощью которых в фильме осуществляется погружение в виртуальную реальность, ______________________.", 
	[
		new Answer("1) такие же какие были в 90-х годах", 0),
		new Answer("2) еще не видел современный человек", 0),
		new Answer("3) это обычные смартфоны", 0),
		new Answer("4) мало отличаются от современных", 1)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}