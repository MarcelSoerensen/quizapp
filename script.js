let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was ist das wichtigste HTML-Tag?",
        "answer_1": "&lt;body&gt;",
        "answer_2": "&lt;html&gt;",
        "answer_3": "&lt;div&gt;",
        "answer_4": "&lt;pizza&gt;",
        "right_answer": 1
    },
    {
        "question": "Was macht das Tag &lt;head&gt;?",
        "answer_1": "Es enthält wichtige Metadaten und Titel der Seite.",
        "answer_2": "Es ist das Dach der Seite, damit es nicht regnet.",
        "answer_3": "Es gibt der Seite den richtigen Haarschnitt.",
        "answer_4": "Es ist der Ort, an dem der geheime Code verborgen wird.",
        "right_answer": 1
    },
    {
        "question": "Welches HTML-Tag sorgt dafür, dass die Seite schön aussieht?",
        "answer_1": "&lt;style&gt;",
        "answer_2": "&lt;makeitpretty&gt;",
        "answer_3": "&lt;fashion&gt;",
        "answer_4": "&lt;beauty&gt;",
        "right_answer": 1
    },
    {
        "question": "Was bedeutet das Tag &lt;footer&gt;?",
        "answer_1": "Es ist der Fuß der Seite, damit sie nicht stolpert.",
        "answer_2": "Es enthält den Quellcode und Copyright-Infos.",
        "answer_3": "Es ist ein mysteriöser Ort für verlorene Webseiten.",
        "answer_4": "Es ist der Ort, an dem die Seite ihre Füße ausruht.",
        "right_answer": 2
    },
    {
        "question": "Was macht das &lt;img>-Tag in HTML?",
        "answer_1": "Es fügt ein Bild hinzu, damit du keine Bilder mehr suchen musst.",
        "answer_2": "Es teleportiert Bilder aus dem Internet auf deine Seite.",
        "answer_3": "Es zeigt dir, wie du Pixel in ihrer besten Form bekommst.",
        "answer_4": "Es verwandelt Text in ein Kunstwerk.",
        "right_answer": 1
    },
    {
        "question": "Wie nennt man es, wenn ein Link in einem neuen Tab geöffnet wird?",
        "answer_1": "Ein Magischer Link",
        "answer_2": "Ein Hyperlink von der Zukunft",
        "answer_3": "Mit target='_blank' machst du es",
        "answer_4": "Ein Portal zum Unbekannten",
        "right_answer": 3
    },
    {
        "question": "Was passiert, wenn du &lt;h1 > verwendest?",
        "answer_1": "Es macht die Überschrift zu einem Riesenschild.",
        "answer_2": "Es gibt der Seite einen Titel, der alle bewundert.",
        "answer_3": "Es sorgt dafür, dass alle deine Texte wie wahre Helden aussehen.",
        "answer_4": "Es lässt deine Überschrift in den Himmel wachsen.",
        "right_answer": 2
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length; 
    showQuestion();
};

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        showProgressBar();
        showNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('all-questions-end-screen').innerHTML = questions.length;
    document.getElementById('right_answers').innerHTML = rightQuestions;
}

function showProgressBar() {
    let percent = Math.round(((currentQuestion + 1) / questions.length) * 100);
        document.getElementById('progress-bar').style = `width: ${percent}%`;
        document.getElementById('progress-bar').innerHTML = `${percent} %`;
}

function showNextQuestion() {
    let question = questions[currentQuestion];
        document.getElementById('current-question').innerHTML = currentQuestion + 1;
        document.getElementById('question-text').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selected) {
    let question = questions[currentQuestion];
    let selelectedQuestionNumber = selected.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    
    if (selelectedQuestionNumber == question['right_answer']) {
        rightAnswer(selected);
        
    } else {
        wrongAnswer(selected, idOfRightAnswer);
    }   

    document.getElementById('next-button').disabled = false;
}

function rightAnswer(selected) {
    document.getElementById(selected).parentNode.classList.add('bg-success');
        rightQuestions++;
        AUDIO_SUCCESS.play();
}

function wrongAnswer(selected, idOfRightAnswer) {
    document.getElementById(selected).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    clearAnswerButtons();
    showQuestion();
}

function clearAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function newGame() {
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById('end-screen').style = 'display: none';
    document.getElementById('question-body').style = '';
    init();
}

