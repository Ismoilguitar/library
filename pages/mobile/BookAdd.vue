<template>
	<div
		class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200"
	>
		<div
			class="grid items-center justify-center h-full max-w-lg grid-cols-4 mx-auto font-medium lg:flex mt-1"
		>
			<NuxtLink
				to="/mobile/Index"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<LayoutGrid
					class="w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600"
				/>
				<span class="text-sm text-gray-500 group-hover:text-blue-600"
					>Асосӣ</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/BookCatalog"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<LibraryBig
					class="w-5 h-5 mb-2 text-blue-600 group-hover:text-blue-600"
				/>
				<span class="text-sm text-blue-600 group-hover:text-blue-600"
					>Китобҳо</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/Info"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<Info class="w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600" />
				<span class="text-sm text-gray-500 group-hover:text-blue-600"
					>Маълумот</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/Invoce"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<Power class="w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600" />
				<span class="text-sm text-gray-500 group-hover:text-blue-600"
					>Баромад</span
				>
			</NuxtLink>
		</div>
	</div>

	<div class="flex h-15 bg-gray-100 p-4 border">
		<NuxtLink to="/mobile/BookCatalog">
			<ChevronLeft class="text-blue-400 mt-1" />
		</NuxtLink>
		<h1 class="ml-12 text-ellipsis font-semibold text-xl">
			Саҳифаи бақайдгирӣ
		</h1>
	</div>
	<div class="max-w-4xl -mt-8 px-4 py-10 sm:px-6 lg:px-8 mx-auto">
		<div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
			<div class="mb-8">
				<h2 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
					Бақайдгирии китобҳо
				</h2>
				<p class="text-sm text-gray-600 dark:text-neutral-400">
					Ҳоҳишмандем тамоми маълумотҳоро ворид намоед
				</p>
			</div>

			<form @prevent.submit="fetchAddData">
				<div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Расм
						</label>
					</div>
					<div class="sm:col-span-9">
						<div class="flex items-center gap-5">
							<div
								v-if="photo"
								class="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
							>
								<img :src="photo" id="imagePreview" />
							</div>
							<div class="flex gap-x-2">
								<div>
									<Input type="file" @change="handleFileUpload" />
								</div>
							</div>
						</div>
					</div>
					<div class="mt-10 sm:col-span-3">
						<label
							for="af-account-full-name"
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Номи китоб
						</label>
					</div>
					<div class="sm:col-span-3">
						<div class="sm:flex">
							<input
								id="af-account-full-name"
								type="text"
								class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
								placeholder="Номи китоб"
								v-model="name"
							/>
						</div>
					</div>
					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Соли нашр
						</label>
					</div>
					<div class="sm:col-span-9">
						<input
							type="text"
							class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							placeholder="Соли нашр"
							v-model="year"
						/>
					</div>
					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Муаллиф
						</label>
					</div>
					<div class="sm:col-span-9">
						<input
							type="text"
							class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							placeholder="Муаллиф"
							v-model="author"
						/>
					</div>
					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Санаи бақайдгирӣ
						</label>
					</div>
					<div class="sm:col-span-9">
						<input
							type="text"
							class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							placeholder="Нарх"
							v-model="price"
						/>
					</div>
					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Нарх
						</label>
					</div>
					<div class="sm:col-span-9">
						<input
							type="datetime-local"
							class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							placeholder="Санаи бақайдгирӣ"
							v-model="datetime"
						/>
					</div>
					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm text-gray-800 dark:text-neutral-200"
						>
							Миқдор
						</label>
					</div>
					<div class="sm:col-span-9">
						<input
							type="text"
							class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							placeholder="Миқдор"
							v-model="kol"
						/>
					</div>
				</div>

				<div class="mt-8 flex justify-end gap-x-2">
					<NuxtLink
						to="/mobile/BookCatalog"
						type="button"
						class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
					>
						<ChevronLeft />
						Баргаштан
					</NuxtLink>
					<button
						type="submit"
						class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
					>
						Иловаи китоб
						<BookPlus />
					</button>
				</div>
			</form>
		</div>
	</div>
	<br /><br />
</template>
<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import {
	BookPlus,
	ChevronLeft,
	Info,
	LayoutGrid,
	LibraryBig,
	Power,
} from 'lucide-vue-next'
import { ref } from 'vue'
const photo = ref('')
const name = ref('')
const price = ref('')
const year = ref('')
const datetime = ref('')
const kol = ref('')
const author = ref('')
const error = ref('')

const fetchAddData = async () => {
	try {
		if (name.value == '') {
			error.value = 'майдон бояд холи набошад!'
		} else if (year.value == '') {
			error.value = 'майдон бояд холи набошад!'
		} else if (datetime.value == '') {
			error.value = 'майдон бояд холи набошад!'
		} else if (kol.value == '') {
			error.value = 'майдон бояд холи набошад!'
		} else {
			await axios.post('http://localhost:8181/addbook', {
				name: name.value,
				year: year.value,
				author: author.value,
				datetime: datetime.value,
				kol: kol.value,
				photo: photo.value,
			})
			var currentDate = new Date()
			var years = currentDate.getFullYear()
			var month = currentDate.getMonth() + 1 // Месяцы начинаются с 0, поэтому добавляем 1
			var day = currentDate.getDate()
			var hours = currentDate.getHours()
			var minutes = currentDate.getMinutes()
			var seconds = currentDate.getSeconds()
			var dateString =
				years +
				'-' +
				month +
				'-' +
				day +
				' ' +
				hours +
				':' +
				minutes +
				':' +
				seconds

			console.log(dateString)
		}
	} catch (err) {
		console.log(err)
	}
}
const handleFileUpload = (event: any) => {
	const file = event.target.files[0]
	if (file && file.type.startsWith('image/')) {
		photo.value = URL.createObjectURL(file)
		console.log('image src', photo.value)
	} else {
		alert('Please select a valid image file.')
	}
}
</script>
