import React, { useContext, useEffect, useState } from 'react';
import { AppState } from '../../App';
import axiosBase from '../../axiosConfig';
import LayOut from '../../components/LayOut/LayOut';
import Loading from '../../components/Loading/Loading';
import QuestionList from '../../components/QuestionList/QuestionList';
import './home.css';

const Home = () => {
  const { user } = useContext(AppState);
  const token = localStorage.getItem('token');
  //   console.log(token);

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosBase.get('/questions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setQuestions(() => data.questions?.reverse());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);

        console.error(error.message);
        setIsLoading(false);
      }
    })();
  }, [token]);
  console.log(isLoading);
  return (
    <LayOut>
      {true && <Loading />}

      <section className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header className="d-flex justify-content-between mt-5 p-4">
              <div>
                <button className="btn btn-primary p-2 fs-4">
                  Ask Question
                </button>
              </div>
              <div>
                <h4 className="fs-2">Welcome, {user.username}!</h4>
              </div>
            </header>

            <div className="mt-4">
              {questions?.map((question, i) => (
                <QuestionList question={question} key={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </LayOut>
  );
};
export default Home;
