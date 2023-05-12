const categoriesContent = document.querySelector('#categories')
const categoryName = document.querySelector('#category-name')
const main = document.querySelector('#main')
const sidebar = document.querySelector('#sidebar')
const btn = document.querySelector('#sidebar-btn')
let selectedCategory = 'Beef'

const arr = [1,2,3,4,5,6,7,8,9]

function fetchCategories() {
	arr.map(item => {
		categoriesContent.innerHTML +=`
		<div role="status" class="max-w-sm animate-pulse">
          <div class="h-[70px] bg-white bg-opacity-20 rounded-md dark:bg-opacity-20 w-full mb-4 p-4 flex items-center gap-4">
            <div class="w-[50px] h-[50px] bg-gray-200 dark:bg-gray-400 rounded-md"></div>
            <div class="w-[100px] h-[30px] rounded-full bg-gray-200 dark:bg-opacity-20"></div>
          </div>
        </div>
		`
	})

	fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
		.then(res => res.json())
		.then(data => renderCategories(data.categories))
		.catch(err => console.log(err))
}

function renderCategories(categories) {
	categoriesContent.innerHTML = ''
	categories.map(item => {
		categoriesContent.innerHTML += `
      <li
	  onclick="fetchMeals(this)"
	  data-category="${item.strCategory}"
	  class="category-class flex gap-4 p-4 active:scale-95 transition-all mx-2 rounded-md items-center cursor-pointer justify-center hover:scale-105  ${selectedCategory === item.strCategory ? "border-blue-500" : ""}">
	  <img class="rounded-md object-cover" width="70" hieght="70" src=${item.strCategoryThumb}>
	  <span class="text-2xl text-white w-full">${item.strCategory}</span>
      </li>
    `
	})
}


function fetchMeals(categoryElement) {
	sidebar.classList.remove("sm:flex")
	sidebar.classList.add("sm:hidden")
	arr.map(item => {
		main.innerHTML += `
	<div role="status" class="max-w-sm animate-pulse">
          <div class="bg-gray-50 dark:bg-opacity-20 rounded-md  h-[300px] p-4">
            <div class="flex items-center justify-center w-full h-[230px] bg-gray-100 rounded-md dark:bg-opacity-20">
              <i class="bx bx-image-alt text-8xl text-gray-100 dark:text-gray-400"></i>
            </div>
            <div class="w-full mt-4 mx-auto rounded-md bg-gray-100 dark:bg-opacity-20 h-[30px]"></div>
          </div>
    </div>
	`
	})
	selectedCategory = categoryElement?.dataset?.category
	fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryElement?.dataset?.category || 'beef'}`
	)
		.then(res => res.json())
		.then(data => renderMeals(data.meals))
		.catch(err => console.log(err))
}

function renderMeals(array){
	categoryName.innerHTML = selectedCategory || "Beef"
	main.innerHTML = ""
	array.map(item => {
		main.innerHTML += `
		<div class="item transition duration-300 hover:scale-105 transform rounded-md shadow-md p-4 flex flex-col gap-2 cursor-pointer justify-center hover:shadow-none">
		<img class="mx-auto rounded-md object-cover" width="250" height="250" src=${item.strMealThumb}>
		<h1 class="text-lg text-center font-semibold text-white">${item.strMeal}</h1>
		</div>
		`
	})
}

btn.addEventListener("click", () =>{
	sidebar.classList.remove('sm:hidden')
	sidebar.classList.add('sm:fixed')
})

fetchMeals('Beef')
fetchCategories()
