<template>
	<div
		class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200"
	>
		<div
			class="grid items-center justify-center h-full max-w-lg grid-cols-4 mx-auto font-medium lg:flex mt-1"
		>
			<NuxtLink
				to="/mobile/Index"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
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
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
			>
				<LibraryBig
					class="w-5 h-5 mb-2 text-blue-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				/>
				<span
					class="text-sm text-blue-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>Китобҳо</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/Info"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
			>
				<Info
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
					>Маълумот</span
				>
			</NuxtLink>
			<NuxtLink
				to="/"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
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
			<ChevronLeft class="text-blue-400 mt-1" />
		</NuxtLink>
		<h1 class="ml-12 text-ellipsis font-semibold text-xl">Саҳифаи содирот</h1>
	</div>

	<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
		<nav
			class="max-w-6xl mx-auto grid sm:flex gap-y-px sm:gap-y-0 sm:gap-x-4"
			aria-label="Tabs"
			role="tablist"
		>
			<Button type="button" @click="exportData">
				Содирот бо pdf каталоги китобҳо
			</Button>
			<Button type="button"> Содирот бо pdf додани китобҳо </Button>
			<Button type="button"> Содирот бо pdf бозгашти китобҳо </Button>
		</nav>
	</div>
</template>
<script setup lang="ts">
import {
	ChevronLeft,
	Info,
	LayoutGrid,
	LibraryBig,
	Power,
} from 'lucide-vue-next'
interface ApiReq {
	data: any
}
const book = ref<any[]>([])
const getBook = async () => {
	try {
		const response: ApiReq = await $fetch('/api/book', {
			method: 'get',
		})

		book.value = response.data
	} catch (error) {
		console.log(error)
	}
}
const dateDB = (dateString: any) => {
	const date = new Date(dateString)
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const formattedDay = day < 10 ? `0${day}` : day
	const formattedMonth = month < 10 ? `0${month}` : month
	const formattedDate = `${formattedDay}-${formattedMonth}-${year}`
	return formattedDate
}
const exportData = () => {
	const { $pdfMake } = useNuxtApp()
	const docDefinition: any = {
		pageSize: 'A4',
		pageOrientation: 'landspace',
		pageMargins: [50, 50, 30, 60],

		content: [
			{ text: 'Cодирот ба формати pdf', style: 'header' },
			{
				table: {
					headerRows: 2,
					widths: [
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
					],
					body: [
						[
							'№',
							'Номи китоб',
							'Соли нашр',
							'Муаллиф',
							'Нарх',
							'Миқдор',
							'Санаи бақайдгирӣ',
							'QR-код',
						],
						...book.value.map((item, index) => [
							index + 1,
							item.name,
							item.year,
							item.author,
							item.price,
							item.kol,
							dateDB(item.datetime),
							{
								qr: `${index + 1},${item.name}, ${item.year},${item.author}, ${
									item.price
								}, ${item.kol}, ${dateDB(item.datetime)}`,
								fit: '50',
							}, // Создание QR-кода для каждой записи
						]),
					],
				},
				layout: {
					defaultBorder: false,
					paddingLeft: function (i: any, node: any) {
						return 4
					},
					paddingRight: function (i: any, node: any) {
						return 4
					},
					paddingTop: function (i: any, node: any) {
						return 2
					},
					paddingBottom: function (i: any, node: any) {
						return 2
					},
				},
			},
		],
		styles: {
			header: {
				fontSize: 15,
				bold: true,
				margin: [0, 0, 0, 10],
			},
		},
		header: function (currentPage: number, pageCount: number) {
			return {
				text:
					'Саҳифа ' + currentPage.toString() + ' аз ' + pageCount.toString(),
				alignment: 'right',
				margin: [0, 30, 10, 50],
			}
		},
		footer: {
			text: 'Ҳисобот',
			alignment: 'center',
			margin: [0, 0, 0, 10],
		},
		// Установка минимальной высоты ячеек таблицы
		defaultStyle: {
			fontSize: 10, // Уменьшение размера шрифта
			minCellHeight: 60, // Установите высоту по вашему усмотрению
		},
	}
	$pdfMake.createPdf(docDefinition).download('book.pdf')
}
onMounted(getBook)
</script>
<style>
body {
	background: none;
}
</style>
