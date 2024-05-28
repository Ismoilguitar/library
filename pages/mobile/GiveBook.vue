<template>
	<div
		class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200"
	>
		<div
			class="grid items-center justify-center h-full max-w-lg grid-cols-4 mx-auto font-medium lg:flex mt-1"
		>
			<NuxtLink
				to="/mobile/Index"
				class="inline-flex flex-col items-center justify-center px-5 group"
			>
				<LayoutGrid
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>Асосӣ</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/BookCatalog"
				class="inline-flex flex-col items-center justify-center px-5 group"
			>
				<LibraryBig
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>Китобҳо</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/Info"
				class="inline-flex flex-col items-center justify-center px-5 group"
			>
				<Info
					class="w-5 h-5 mb-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				/>
				<span
					class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>Маълумот</span
				>
			</NuxtLink>
			<NuxtLink
				to="/"
				class="inline-flex flex-col items-center justify-center px-5 group"
			>
				<Power
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>Баромад</span
				>
			</NuxtLink>
		</div>
	</div>
	<div class="flex h-15 bg-gray-100 p-4 border">
		<NuxtLink to="/mobile/BookCatalog">
			<ChevronLeft class="text-blue-400" />
		</NuxtLink>
		<h1 class="ml-12 text-ellipsis font-semibold text-xl">
			Каталоги додани китобҳо
		</h1>
	</div>

	<table
		class="table-auto lg:w-full text-sm snap-x scroll-pl-5 max-md:grid max-md:gap-x-12 max-md:overflow-x-scroll max-md:-mx-4 max-md:px-4 [&_thead]:bg-slate-50 max-md:[&_thead]:contents max-md:[&_tbody]:contents [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-100 max-md:[&_tr]:contents [&_th]:text-slate-900 [&_th]:font-semibold [&_td]:text-slate-600 [&_th]:py-3 md:[&_th]:first:pl-3 [md:&_th]:last:pr-3 [&_td]:pb-3 md:[&_td]:pt-3 md:[&_td]:first:pl-3 md:[&_td]:last:pr-3 [&_tr_td:first-child]:font-medium [&_tr_td:first-child]:text-slate-900 [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap max-md:[&_th]:min-w-[60vw] max-md:[&_td]:min-w-[60vw] max-md:[&_tr:last-child_td]:min-w-[calc(100vw-2rem)] [&_th]:text-left [&_th]:group-last:text-right [&_td]:text-left md:[&_td:last-of-type]:text-right max-md:[&_th]:sticky max-md:[&_th]:left-0 [&_td]:snap-start max-md:[&_td]:border-b max-md:[&_td:last-of-type]:border-none [&_td]:border-slate-100"
	>
		<thead>
			<tr>
				<th class="max-md:row-start-1 max-md:col-start-1">№</th>
				<th class="max-md:row-start-3 max-md:col-start-1">Номи китоб</th>
				<th class="max-md:row-start-5 max-md:col-start-1">Номи пурра</th>
				<th class="max-md:row-start-7 max-md:col-start-1">Паспорт</th>
				<th class="max-md:row-start-9 max-md:col-start-1">Суроға</th>
				<th class="max-md:row-start-11 max-md:col-start-1">Миқдор</th>
				<th class="max-md:row-start-13 max-md:col-start-1">Бозгашт</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(data, index) in book" :key="index">
				<td :class="{ 'max-md:row-start-2 max-md:col-start-': index + 1 }">
					{{ index + 1 }}
				</td>
				<td :class="{ 'max-md:row-start-4 max-md:col-start-': index + 1 }">
					{{ data.namebook }}
				</td>
				<td :class="{ 'max-md:row-start-6 max-md:col-start-': index + 1 }">
					{{ data.name }}
				</td>
				<td :class="{ 'max-md:row-start-8 max-md:col-start-': index + 1 }">
					{{ data.passport }}
				</td>
				<td :class="{ 'max-md:row-start-10 max-md:col-start-': index + 1 }">
					{{ data.street }}
				</td>
				<td :class="{ 'max-md:row-start-12 max-md:col-start-': index + 1 }">
					{{ data.kol }}
				</td>
				<td :class="{ 'max-md:row-start-[14] max-md:col-start-': index + 1 }">
					{{ data.returnbook }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script setup lang="ts">
import {
	ChevronLeft,
	Info,
	LayoutGrid,
	LibraryBig,
	Power,
} from 'lucide-vue-next'
interface ApiResponse {
	data: any
}
const book = ref<any[]>([])
let indexofBook = []
const getBook = async () => {
	try {
		const response: ApiResponse = await $fetch('/api/givebook/book', {
			method: 'get',
		})

		book.value = response.data
	} catch (error) {
		console.log(error)
	}
}
onMounted(getBook)
</script>
<style>
body {
	background: #f4f6f5;
}
</style>
