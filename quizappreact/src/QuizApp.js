import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizApp = () => {
  const questions = [
    {
      question: 'Sual 1: Hansi dil JavaScript\'in temelini yaradir?',
      options: [' Java', ' C', ' HTML', ' Python'],
      correctAnswer: ' Java',
    },
    {
      question: 'Sual 2: Hansi obyekt yonumlu programlama dili C++\'a dayanır?',
      options: [' Python', ' C#', ' Java', ' C'],
      correctAnswer: ' C#',
    },
    {
      question: 'Sual 3: Hansi programlama dilinde "print" funksiyasi istifade edilir?',
      options: [' Python', ' JavaScript', ' Java', ' C'],
      correctAnswer: ' Python',
    },
    {
        question: 'Sual 4: Hansi il İstanbulun Feth Ilidir?',
        options: ['1543', '1345', '1433', '1453'],
        correctAnswer: '1453',
      },
      {
        question: 'Sual 5: "HTML" hansi nov programlama dili veya işaretleme dilidir?',
        options: ['Programlasdirma Dili', 'İşaretleme Dili', 'Database Dili', 'Scripting Dili'],
        correctAnswer: 'İşaretleme Dili',
      },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const shuffleQuestions = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    shuffleQuestions(questions);
  }, []);

  const handleNextQuestion = () => {
    const correct = questions[currentQuestion].correctAnswer === userAnswer;
    if (correct) {
      setScore(score + 1);
      setFeedback('Doğru!');
    } else {
      setFeedback('Yanlış!');
    }

    if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
    } else {
      setQuizCompleted(true);
    }
  };
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer('')
    setScore(0);
    setQuizCompleted(false);
    setFeedback('');
    shuffleQuestions(questions);
  };

  if (quizCompleted) {
    return (
      <div className="container mt-5">
        <h1>Quiz Tamamlandı!</h1>
        <p>Toplam Xal: {score}/{questions.length}</p>
        <button className="btn btn-primary" onClick={handleRestartQuiz}>
          Quiz'i Yeniden Başlat (Restart)
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10 col-lg-10">
          <div className="border">
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>My Quiz</h4>
                <span>({currentQuestion + 1} of {questions.length})</span>
              </div>
            </div>
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row align-items-center question-title">
                <h3 className="text-danger">Q.</h3>
                <h5 className="mt-1 ml-2">{questions[currentQuestion].question}</h5>
              </div>
              <ul className="list-group">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index} className="list-group-item">
                    <label className="radio">
                      <input
                        type="radio"
                        name={`question${currentQuestion}`}
                        value={option}
                        checked={userAnswer === option}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
              <button
                className="btn btn-primary d-flex align-items-center btn-danger"
                type="button"
                onClick={handleNextQuestion}
              >
                Next<i class="fa fa-angle-right ml-2"></i>
              </button>
              <p>{feedback}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;