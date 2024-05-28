<template>
	<div class="w-full">
		<div class="flex items-center py-4">
			<Input
				class="max-w-sm"
				placeholder="Ҷустҷӯи китоб..."
				v-model="booksItemSearch"
			/>
			<NuxtLink to="/AddBook">
				<Button class="ml-3" variant="primary">
					<BookPlus class="flex-shrink-0 mt-0.5 size-5" />
					<span class="px-3">Бақайдгирӣ</span>
				</Button>
			</NuxtLink>
			<Button @click="exportData" class="ml-3">
				<Upload class="flex-shrink-0 mt-0.5 size-5" />
				<span class="px-3">Содирот бо pdf</span>
			</Button>
		</div>
		<div>
			<Popover v-model:open="open">
				<PopoverTrigger as-child>
					<Button
						variant="outline"
						role="combobox"
						:aria-expanded="open"
						class="w-[200px] justify-between"
					>
						{{
							value
								? frameworks.find(framework => framework.value === value)?.label
								: 'Ҷобаҷогузорӣ'
						}}
						<CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent class="w-[200px] p-0">
					<Command>
						<CommandInput class="h-9" placeholder="Ҷустуҷӯ" />
						<CommandEmpty>Маълумот ёфт нашуд</CommandEmpty>
						<CommandList>
							<CommandGroup>
								<CommandItem
									v-for="framework in frameworks"
									:key="framework.value"
									:value="framework.value"
									@select="
										ev => {
											if (typeof ev.detail.value === 'string') {
												value = ev.detail.value
											}
											open = false
										}
									"
									@click="sortTable(framework.value)"
								>
									{{ framework.label }}

									<CheckIcon
										:class="
											cn(
												'ml-auto h-4 w-4',
												value === framework.value ? 'opacity-100' : 'opacity-0'
											)
										"
									/>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>

		<div>
			<div class="max-w-[85rem] overflow-x-hidden overflow-y-hidden">
				<div class="flex flex-col">
					<div class="-m-1.5 overflow-y-auto">
						<div class="p-1.5 min-w-full inline-block align-middle">
							<div
								class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700"
							>
								<table
									class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 overflow-y-hidden"
								>
									<thead class="bg-gray-50 dark:bg-neutral-800">
										<tr>
											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('id')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														#
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'id'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>
											<th
												scope="col"
												class="ps-6 lg:ps-4 xl:ps-1 pe-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('name')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Номи китоб
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'name'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('year')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Соли нашр
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'year'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('author')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Муаллиф
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'author'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('price')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Нарх
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'price'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('kol')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Миқдор
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'kol'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('datetime')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Санаи бақайдгирӣ
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'datetime'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>
											<th scope="col" class="px-6 py-3 text-start">
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Амалҳо
													</span>
												</div>
											</th>
										</tr>
									</thead>

									<tbody
										class="divide-y divide-gray-200 dark:divide-neutral-700"
										v-for="(items, index) in filteredItems"
										:key="items.id"
										v-if="filteredItems.length > 0"
									>
										<tr v-if="book.length > 0" class="hover:bg-gray-50">
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													{{ index + 1 }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<img
													class="inline-block size-[38px] rounded-full"
													:src="items.image"
													alt="Image"
												/>

												{{ items.name }}
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													{{ items.year }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													{{ items.author }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													{{ items.price }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													{{ items.kol }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													{{ dateDB(items.datetime) }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-6 py-1.5">
													<DropdownMenu>
														<DropdownMenuTrigger>
															<Button variant="primary">
																<EllipsisVertical class="size-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuGroup>
															<DropdownMenuContent>
																<DropdownMenuSeparator />
																<DropdownMenuItem>
																	<NuxtLink
																		class="flex"
																		:to="`/book/${items.id}`"
																	>
																		<Eye class="mr-2 h-4 w-4 text-gray-600" />
																		Дидан
																	</NuxtLink>
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<NuxtLink
																		class="flex"
																		:to="`/book/update/${items.id}`"
																	>
																		<SquarePen
																			class="mr-2 h-4 w-4 text-gray-600"
																		/>
																		Таҳрир
																	</NuxtLink>
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<button
																		class="cursor-pointer flex"
																		@click="handleDelete(items.id)"
																	>
																		<Trash class="mr-2 h-4 w-4 text-gray-600" />
																		Несткунӣ
																	</button>
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenuGroup>
													</DropdownMenu>
												</div>
											</td>
										</tr>
									</tbody>
									<tbody v-else>
										<tr>
											<td
												class="px-6 py-4 whitespace-nowrap text-sm font-medium items-center justify-center"
											>
												Маълумот ёфт нашуд
											</td>
										</tr>
									</tbody>
								</table>
								<div
									class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700"
								>
									<div>
										<p class="text-sm text-gray-600 dark:text-neutral-400">
											<span class="font-semibold text-gray-800">{{
												filteredItems.length
											}}</span>
											ёфт шуд
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Toaster position="top-center" richColors />
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Toaster } from '@/components/ui/sonner'
import { Table } from '@/components/ui/table'
import { cn } from '@/utils'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import {
	BookPlus,
	EllipsisVertical,
	Eye,
	SquarePen,
	Trash,
	Upload,
} from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
const booksItemSearch = ref('')
const counts = ref(0)
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
interface ApiReq {
	data: any
}
const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const sortTable = (key: string) => {
	if (sortKey.value === key) {
		sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
	} else {
		sortKey.value = key
		sortOrder.value = 'asc'
	}
	sortItems()
}

const sortItems = () => {
	book.value.sort((a, b) => {
		const itemA = a[sortKey.value as keyof typeof a]
		const itemB = b[sortKey.value as keyof typeof b]
		if (itemA < itemB) return sortOrder.value === 'asc' ? -1 : 1
		if (itemA > itemB) return sortOrder.value === 'asc' ? 1 : -1
		return 0
	})
}

const sortedItems = computed(() => {
	return [...book.value]
})
const frameworks = [
	{ value: 'name', label: 'Ном' },
	{ value: 'year', label: 'Соли нашр' },
	{ value: 'author', label: 'Муаллиф' },
	{ value: 'price', label: 'Нарх' },
	{ value: 'kol', label: 'Миқдор' },
	{ value: 'datetime', label: 'Сана' },
]

const open = ref(false)
const value = ref('')
const book = ref<any[]>([])
const getBook = async () => {
	try {
		const response: ApiReq = await $fetch('/api/book', {
			method: 'get',
		})

		book.value = response.data
		counts.value = filteredItems.value.length
	} catch (error) {
		console.log(error)
	}
}
const handleDelete = async (id: number) => {
	try {
		await $fetch(`/api/delete/${id}`, {
			method: 'DELETE',
		})
		await getBook()
		const date = new Date()
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const formattedDay = day < 10 ? `0${day}` : day
		const formattedMonth = month < 10 ? `0${month}` : month
		const formattedHours = hours < 10 ? `0${hours}` : hours
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
		const formattedDate = `${formattedDay}-${formattedMonth}-${year}  ${formattedHours}:${formattedMinutes}`
		toast.success('Китоб бомуввақият нест шуд', {
			description: `${formattedDate}`,
		})
		location.reload()
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

const filteredItems = computed(() => {
	return book.value.filter(item => {
		return Object.values(item).some(value => {
			return String(value).includes(booksItemSearch.value)
		})
	})
})
onMounted(getBook)
</script>
