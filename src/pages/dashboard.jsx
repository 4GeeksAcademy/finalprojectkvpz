import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOut from './signout';

function EssayHooksQuiz() {
  const [questions, setQuestions] = useState([]); // Track the selected questions
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track whether answer has been submitted
  const [correct, setCorrect] = useState(false); // Track if the submitted answer is correct
  const [score, setScore] = useState(0); // Track total score
  const [showResults, setShowResults] = useState(false); // Track whether to show quiz results
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [attempts, setAttempts] = useState(0); // Track number of attempts made for the current question

  // Define an array of potential essay hooks questions
  const essayHooksQuestions = [
    {
      question: "What is an essay hook?",
      choices: ['A tool used to catch the reader’s attention in the first sentence or paragraph of an essay', 'A type of fishing lure', 'A software development framework', 'A tool used to indent paragraphs'],
      correctAnswer: 'A tool used to catch the reader’s attention in the first sentence or paragraph of an essay'
    },
    {
      question: "Which of the following is NOT a type of essay hook?",
      choices: ['Question hook', 'Thesis statement hook', 'Anecdote hook', 'Quotation hook'],
      correctAnswer: 'Thesis statement hook'
    },
    {
      question: "What is the purpose of a question hook?",
      choices: ['To introduce a controversial topic', 'To provide background information', 'To engage the reader by posing a question', 'To conclude the essay'],
      correctAnswer: 'To engage the reader by posing a question'
    },
    {
      question: "Which type of essay hook involves using a relevant quote from a famous person or literature?",
      choices: ['Anecdote hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Quotation hook'
    },
    {
      question: "What is the benefit of using an anecdote hook in an essay?",
      choices: ['It provides factual evidence to support the thesis', 'It entertains the reader with a short story or example', 'It summarizes the main points of the essay', 'It provides a statistical fact or figure'],
      correctAnswer: 'It entertains the reader with a short story or example'
    },
    {
      question: "Which type of essay hook involves starting with a surprising fact or statistic?",
      choices: ['Anecdote hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Statistic hook'
    },
    {
      question: "What is the purpose of a description hook?",
      choices: ['To engage the reader by describing a scene or setting', 'To ask a rhetorical question', 'To summarize the main points of the essay', 'To provide background information'],
      correctAnswer: 'To engage the reader by describing a scene or setting'
    },
    {
      question: "Which type of essay hook involves addressing the reader directly?",
      choices: ['Anecdote hook', 'Quotation hook', 'Statistic hook', 'Direct address hook'],
      correctAnswer: 'Direct address hook'
    },
    {
      question: "What is the purpose of using a direct address hook?",
      choices: ['To provide background information', 'To engage the reader by addressing them directly', 'To conclude the essay', 'To introduce a controversial topic'],
      correctAnswer: 'To engage the reader by addressing them directly'
    },
    {
      question: "Which type of essay hook involves describing an event from the past?",
      choices: ['Anecdote hook', 'Quotation hook', 'Statistic hook', 'Flashback hook'],
      correctAnswer: 'Flashback hook'
    },
    {
      question: "What is the purpose of using a flashback hook?",
      choices: ['To provide factual evidence to support the thesis', 'To engage the reader with a short story or example from the past', 'To summarize the main points of the essay', 'To provide a statistical fact or figure'],
      correctAnswer: 'To engage the reader with a short story or example from the past'
    },
    {
      question: "Which type of essay hook involves starting with a question?",
      choices: ['Question hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Question hook'
    },
    {
      question: "What is the purpose of using a question hook?",
      choices: ['To provide background information', 'To engage the reader by posing a question', 'To conclude the essay', 'To introduce a controversial topic'],
      correctAnswer: 'To engage the reader by posing a question'
    },
    {
      question: "Which type of essay hook involves starting with a definition?",
      choices: ['Definition hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Definition hook'
    },
    {
      question: "What is the purpose of using a definition hook?",
      choices: ['To summarize the main points of the essay', 'To define key terms or concepts', 'To engage the reader with a short story or example', 'To provide a statistical fact or figure'],
      correctAnswer: 'To define key terms or concepts'
    },
    {
      question: "Which type of essay hook involves starting with a personal story?",
      choices: ['Anecdote hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Anecdote hook'
    },
    {
      question: "What is the purpose of using a personal story hook?",
      choices: ['To summarize the main points of the essay', 'To engage the reader with a personal experience', 'To introduce a controversial topic', 'To provide background information'],
      correctAnswer: 'To engage the reader with a personal experience'
    },
    {
      question: "Which type of essay hook involves starting with a metaphor or simile?",
      choices: ['Metaphor or simile hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Metaphor or simile hook'
    },
    {
      question: "What is the purpose of using a metaphor or simile hook?",
      choices: ['To provide background information', 'To engage the reader by comparing two things', 'To conclude the essay', 'To introduce a controversial topic'],
      correctAnswer: 'To engage the reader by comparing two things'
    },
    {
      question: "Which type of essay hook involves starting with a shocking statement?",
      choices: ['Shocking statement hook', 'Quotation hook', 'Statistic hook', 'Description hook'],
      correctAnswer: 'Shocking statement hook'
    },
    {
      question: "What is the purpose of using a shocking statement hook?",
      choices: ['To engage the reader with a surprising fact or statement', 'To summarize the main points of the essay', 'To provide factual evidence to support the thesis', 'To introduce a controversial topic'],
      correctAnswer: 'To engage the reader with a surprising fact or statement'
    }
  ];

  // useEffect hook to select 3 random questions when the component mounts
  useEffect(() => {
    const shuffleQuestions = () => {
      // Shuffle the questions array
      const shuffledQuestions = [...essayHooksQuestions].sort(() => Math.random() - 0.5);
      // Select the first 3 questions
      const selectedQuestions = shuffledQuestions.slice(0, 3);
      setQuestions(selectedQuestions);
    };
    shuffleQuestions();
  }, []);

  // useEffect hook to load the current question when component mounts or question index changes
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[questionIndex];
      setQuestion(currentQuestion.question);
      setCorrectAnswer(currentQuestion.correctAnswer);
      setChoices([...currentQuestion.choices.sort(() => Math.random() - 0.5)]);
      setFeedback('');
      setSelectedAnswer('');
      setSubmitted(false);
      setCorrect(false);
      setAttempts(0); // Reset attempts for the current question
    }
  }, [questionIndex, questions]);

  // useEffect hook to update elapsed time
  useEffect(() => {
    let interval;
    if (!showResults && !submitted) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000); // Update elapsed time every second
    }

    return () => clearInterval(interval);
  }, [showResults, submitted]);

  const handleSubmit = async () => {
    try {
      // Check if the selected answer is correct
      if (selectedAnswer === correctAnswer) {
        setFeedback('Correct!');
        setCorrect(true);
        setScore(score + 1); // Increment score for correct answer
      } else {
        if (attempts < 1) { // Allow only one additional attempt
          setFeedback('Incorrect. Please try again.');
          setAttempts(attempts + 1); // Increment attempts
          return; // Exit the function to prevent further execution
        } else {
          setFeedback('Incorrect.');
        }
      }
      // Set submitted to true after submitting answer
      setSubmitted(true);
      // If the last question is submitted, show the results
      if (questionIndex === 2) {
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNextQuestion = () => {
    // Move to the next question only if an answer has been submitted
    if (submitted) {
      // Increment the question index to move to the next question
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleAnswerChange = (choice) => {
    // Allow answer change only if the answer is not correct and not yet submitted
    if (!correct && !submitted) {
      setSelectedAnswer(choice);
    }
  };

  // Calculate total score percentage
  const totalQuestions = 3; // Only 3 questions are selected
 // Calculate total score percentage and round it up
  const scorePercentage = Math.ceil((score / totalQuestions) * 100);


  // Format elapsed time
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
    <img src="/Dashboard.jpg" alt="Login Background Image"/>
      <div className="sign-out-container">
        <SignOut />
      </div>
      <div>
        <h4>{question}</h4>
        <Form>
          {choices.map((choice, index) => (
            <div key={index}>
              <Form.Check
                type="radio"
                id={choice}
                label={choice}
                checked={selectedAnswer === choice}
                onChange={() => handleAnswerChange(choice)}
                disabled={submitted && correctAnswer !== choice}
              />
            </div>
          ))}
        </Form>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        {feedback && <div>{feedback}</div>}
        <div>{formatTime(elapsedTime)}</div>
        {questionIndex < 2 && (
          <Button variant="primary" disabled={!submitted} onClick={handleNextQuestion}>Next</Button>
        )}
        {showResults && (
          <div>
            <h2>Quiz Results</h2>
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {score}</p>
            <p>Score Percentage: {scorePercentage}%</p>
            <p>Elapsed Time: {formatTime(elapsedTime)}</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default EssayHooksQuiz;



