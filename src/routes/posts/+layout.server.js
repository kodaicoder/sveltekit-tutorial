/** @type {import('./$types').PageServerLoad} */
import axios from 'axios';

export async function load(page) {
	console.log(page);
	//const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=32d96239d93643b582d4c88482d4de33';
	const apiUrl = 'https://jsonplaceholder.typicode.com/photos/?_start=20&_limit=10';

	//! normal fetching
	// const res = await fetch(apiUrl);
	// const data = await res.json();

	//! axios fetching
	const { data } = await axios.get(apiUrl);

	//! axios fetching with .then
	// axios.get(apiUrl)
	// .then(function (res) {
	//? handle success
	//   console.log(res);
	// })
	// .catch(function (err) {
	//? handle error
	//   console.log(err);
	// })
	// .then(function () {
	//? always executed
	// });

	return {
		posts: data
	};
}
