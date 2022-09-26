<script setup>
import { reactive } from "vue";
const menu = reactive({
  categories: [
    { index: "9", name: "General Knowledge" },
    { index: "18", name: "Computer Science" },
    { index: "20", name: "Mythology" },
    { index: "23", name: "History" },
  ],
  difficulties: ["easy", "medium", "hard"],
  category: "",
  difficulty: "",
});
</script>

<template>
  <div class="container">
    <div id="home" class="flex-center flex-column">
      <h1>Just A Quiz</h1>
      <div class="flex-row">
        <div>
          <h3>Select Category:</h3>
          <div
            v-for="category in menu.categories"
            :key="category.index"
            class="btn"
            :class="{ btn__active: category.name === menu.category }"
            @click="menu.category = category.name"
          >
            {{ category.name }}
          </div>
        </div>
        <div>
          <h3>Select Difficulty:</h3>
          <div
            v-for="difficulty in menu.difficulties"
            :key="difficulty.index"
            class="btn"
            :class="{ btn__active: difficulty === menu.difficulty }"
            @click="menu.difficulty = difficulty"
          >
            {{ difficulty }}
          </div>
        </div>
      </div>
      <a
        v-if="menu.category && menu.difficulty"
        class="btn"
        :href="`/game?cat=${menu.category}&diff=${menu.difficulty}`"
        >Play</a
      >
    </div>
  </div>
</template>
<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
}
h3 {
  font-size: 100px;
}
.container > * {
  width: 100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.flex-center {
  justify-content: center;
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-center {
  text-align: center;
}

.hidden {
  display: none;
}

/* BUTTONS */
.btn {
  font-size: 1.8rem;
  padding: 1rem 0;
  width: 20rem;
  text-align: center;
  border: 0.1rem solid #23a6f3;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #23a6f3;
  background-color: white;
}

.btn:hover {
  cursor: pointer;
  box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
  transform: translateY(-0.1rem);
  transition: transform 150ms;
}

.btn[disabled]:hover {
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn__active {
  box-shadow: 0 0.4rem 1.4rem 0 rgba(214, 94, 128, 0.5);
  transform: translateY(-0.1rem) scale(1.05);
  transition: transform 150ms;
}
</style>
