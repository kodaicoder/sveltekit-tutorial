/** @type {import('./$types').PageServerLoad} */
import { error } from '@sveltejs/kit';
//? using lodash check object is empty ?
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function load(page) {
	//console.log(page);
	const apiUrl = 'https://jsonplaceholder.typicode.com/posts/' + page.params.slug;

	//! normal fetching
	//const res = await fetch(apiUrl);
	//const data = await res.json();

	await delay(3000);
	//! axios fetching
	const { data } = await axios.get(apiUrl);

	//! axios fetching with .then
	// axios.get(apiUrl)
	// .then(function (res) {
	//? handle success
	//   if (isEmpty(res.data)) throw error(404);
	//   return {
	//        post: res.data
	//   };
	// })
	// .catch(function (err) {
	//? handle error
	//   console.log(err);
	// })
	// .then(function () {
	//? always executed
	// });

	if (isEmpty(data)) throw error(404);
	return {
		post: data
	};
}
