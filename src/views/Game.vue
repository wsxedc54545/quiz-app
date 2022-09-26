<template>
  <div class="container">
    <h3>Quiz Category: {{ route.query.cat }}</h3>
    <h3>Quiz Difficulty: {{ diff }}</h3>
    <h3>Your Score: {{ quiz.count }} / 10</h3>
    <div
      v-for="(test, testIndex) in quiz.data"
      :key="testIndex"
      id="game"
      class="justify-center flex-column"
    >
      <h3 id="quesiton">{{ testIndex + 1 }}. {{ test.question }}</h3>
      <h5>Your Answer: {{ quiz.answer[testIndex] }}</h5>
      <div class="choice-container">
        <div
          v-for="(choice, index) in ['A', 'B', 'C', 'D']"
          :key="index"
          class="choice-container"
          :class="{
            rightAnswer:
              quiz.endQuiz &&
              test.answer[index] === quiz.correct_answer[testIndex],
          }"
          @click="quiz.answer[testIndex] = test.answer[index]"
        >
          <p class="choice-prefix">{{ choice }}</p>
          <p class="choice-text">{{ test.answer[index] }}</p>
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="btn" @click="handleSubmit">Submit</div>
      <router-link class="btn goHome" to="/">Home</router-link>
    </div>
    <div v-if="quiz.wrongNotice" class="wrongNotice">
      Please answer all questions first!
    </div>
    <button @click="scrollToTop" id="myBtn" title="Go to top">Top</button>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  async setup() {
    const quiz = reactive({
      data: [],
      wrongNotice: false,
      correct_answer: [],
      answer: [],
      count: 0,
    });
    const route = useRoute();
    const diff = route.query.diff;
    let cat;
    switch (route.query.cat) {
      case "General Knowledge":
        cat = "9";
        break;
      case "Computer Science":
        cat = "18";
        break;
      case "Mythology":
        cat = "20";
        break;
      case "History":
        cat = "23";
        break;
      default:
        break;
    }
    function shuffleArray(inputArray) {
      return inputArray.sort(() => Math.random() - 0.5);
    }
    function handleSubmit() {
      if (quiz.answer.length === 10) {
        quiz.wrongNotice = false;
        quiz.endQuiz = true;
        for (let i = 0; i < 10; i++) {
          if (quiz.answer[i] === quiz.correct_answer[i]) {
            quiz.count++;
          }
        }
      } else {
        quiz.wrongNotice = true;
        quiz.endQuiz = false;
      }
    }
    function scrollToTop() {
      window.scrollTo(0, 0);
    }
    const url = `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}&type=multiple`;
    const { data } = await axios.get(url);
    const array = Object.values(data.results).map((item) => {
      return item;
    });
    array.forEach((el) => {
      const obj = {
        question: el.question,
      };
      quiz.correct_answer.push(el.correct_answer);
      el.incorrect_answers.push(el.correct_answer);
      obj.answer = shuffleArray(el.incorrect_answers);
      quiz.data.push(obj);
    });
    return { data, route, quiz, diff, cat, handleSubmit, scrollToTop };
  },
};
</script>

<style>
.container {
  display: block;
  padding: 5% 0;
  height: 100%;
}
#game {
  margin-top: 40px;
}
.choice-container {
  display: flex;
  width: 100%;
  font-size: 20px;
  border: 0.1rem solid rgb(86, 165, 235, 0.25);
  background-color: white;
}

.choice-container:hover {
  cursor: pointer;
  box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
  transform: translateY(-0.1rem);
  transition: transform 150ms;
}

.choice-prefix {
  padding: 1.5rem 2.5rem;
  background-color: #56a5eb;
  color: white;
}

.choice-text {
  padding: 1.5rem;
}
h5 {
  color: green;
  font-size: 1.8rem;
  margin-bottom: 10px;
}
.submit {
  margin: 100px auto 10px;
  display: flex;
  justify-content: space-evenly;
}
.wrongNotice {
  color: red;
  font-size: 24px;
  text-align: center;
}
.rightAnswer {
  background: limegreen;
}
#myBtn {
  /* display: none; */
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  text-align: center;
  width: 50px;
}

#myBtn:hover {
  background-color: #555;
}
.goHome {
  padding: 5px;
}
.btn-wrapper {
  display: flex;
}
</style>
