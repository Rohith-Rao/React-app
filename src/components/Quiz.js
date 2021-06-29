import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
const QuizWindow = styled.div`
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 10vh;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2em auto;
    @media screen and (min-width: 1180px) {
        width: 50%;
    }
`;

const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 15px;
    padding: 15px 30px;
    text-decoration: none;
    color: #616A94;
    background-color: #161A31;
    transition: 0.3s;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;
    
    @media screen and (min-width: 1180px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
    }
`;
const Title = styled.h1`
    margin-top: 4em;
    font-size: 48px;
`;

const Points = styled.p`
    font-size: 24px;
    margin-bottom: 3em;
`;
const Question = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const Quiz = (props) => {
    const refreshPage = () => window.location.reload();

    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {

        let userAnswer = e.target.outerText;

        if (quiz[number].answer === userAnswer) setPts(pts + 1);
        setNumber(number + 1);
    }

    useEffect(() => {

        if (props.topic==='GK'){
            axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
            .then(res=>{
                setQuiz(res.data.results.map(item =>(
                    {
                        question : item.question,
                        options :  shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer : item.correct_answer
                    }
                )));
            })
            .catch(err=>{console.error(err)})
        }
        else if (props.topic==='Computers') {
            axios.get('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple')
            .then(res=>{
                setQuiz(res.data.results.map(item =>(
                    {
                        question : item.question,
                        options :  shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer : item.correct_answer
                    }
                )));
            })
            .catch(err=>{console.error(err)})
        }
        else if (props.topic==='Films') {
            axios.get('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple')
            .then(res=>{
                setQuiz(res.data.results.map(item =>(
                    {
                        question : item.question,
                        options :  shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer : item.correct_answer
                    }
                )));
            })
            .catch(err=>{console.error(err)})
        }
        else if (props.topic==='Celebs') {
            axios.get('https://opentdb.com/api.php?amount=5&category=26&difficulty=medium&type=multiple')
            .then(res=>{
                setQuiz(res.data.results.map(item =>(
                    {
                        question : item.question,
                        options :  shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer : item.correct_answer
                    }
                )));
            })
            .catch(err=>{console.error(err)})
        }
        else if (props.topic==='Music') {
            axios.get('https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple')
            .then(res=>{
                setQuiz(res.data.results.map(item =>(
                    {
                        question : item.question,
                        options :  shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer : item.correct_answer
                    }
                )));
            })
            .catch(err=>{console.error(err)})
        }
    }, []);
    console.log(quiz)
    return (
        <QuizWindow>
            { quiz[number] &&

                <>
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>

                    <Options>
                        {quiz[number].options.map((item, index) => (
                            <Option key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={pickAnswer}></Option>
                        ))}
                    </Options>
                </>

            }
            {
                number === 5 &&
                <>
                    <Title>Finished</Title>
                    <Points>Your score {pts}/5</Points>
                    <button className="button" onClick={refreshPage}>Retry</button>
                </>
            }
        </QuizWindow>
    )
}
export default Quiz