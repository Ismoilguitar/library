<template>
	<div class="w-full">
		<div class="flex items-center py-4">
			<Input
				class="max-w-sm"
				placeholder="Ҷустҷӯи китоб..."
				v-model="booksItemSearch"
			/>
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
			<!-- Table Section -->
			<div class="max-w-[85rem] overflow-x-hidden overflow-y-hidden">
				<!-- Card -->
				<div class="flex flex-col">
					<div class="-m-1.5 overflow-x-auto">
						<div class="p-1.5 min-w-full inline-block align-middle">
							<div
								class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700"
							>
								<!-- Table -->
								<table
									class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 overflow-x-hidden"
								>
									<thead class="bg-gray-50 dark:bg-neutral-800">
										<tr>
											<th
												scope="col"
												class="px-6 py-2 text-start hover:bg-gray-200 cursor-pointer"
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
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('namebook')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Номи китоб
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'namebook'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-6 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('name')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Номи пурра
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
												@click="sortTable('passport')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Паспорт
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'passport'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-3 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('street')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Суроға
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'street'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>

											<th
												scope="col"
												class="px-3 py-3 text-start hover:bg-gray-200 cursor-pointer"
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
												class="px-3 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('returnbook')"
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
											<th
												scope="col"
												class="px-3 py-3 text-start hover:bg-gray-200 cursor-pointer"
												@click="sortTable('returnbook')"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Бозгашт
													</span>
													<CaretSortIcon
														class="h-4 w-4 shrink-0 opacity-50"
														:isSorted="sortKey === 'returnbook'"
														:isAsc="sortOrder === 'asc'"
													/>
												</div>
											</th>
											<th
												scope="col"
												class="px-3 py-3 text-start hover:bg-gray-200 cursor-pointer"
											>
												<div class="flex items-center gap-x-2">
													<span
														class="text-xs font-semibold uppercase tracking-wide text-gray-800"
													>
														Идораи вақт
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
												<div class="px-2 py-1 text-center">
													{{ index + 1 }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ items.namebook }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ items.name }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ items.passport }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ items.street }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ items.kol }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ formattedTimes[items.id] }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
													{{ TimerClock(items.returnbook) }}
												</div>
											</td>
											<td class="size-px whitespace-nowrap">
												<div class="px-2 py-1">
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
																	<button class="flex" @click="startTimer">
																		<Clock class="mr-2 h-4 w-4 text-gray-600" />
																		Старт
																	</button>
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<button class="flex" @click="stopTimer">
																		<Ban class="mr-2 h-4 w-4 text-gray-600" />
																		Стоп
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
												class="px-4 py-3 whitespace-nowrap text-sm font-medium items-center justify-center"
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
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Table } from '@/components/ui/table'
import { cn } from '@/utils'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { Ban, Clock, EllipsisVertical, Upload } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
const formattedTimes = ref<Record<number, string>>({})
const booksItemSearch = ref('')
let timerInterval: ReturnType<typeof setInterval> | null = null
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
							'Номи пурра',
							'Паспорт',
							'Суроға',
							'Миқдор',
							'Бозгашт',
							'QR-код',
						],
						...book.value.map((item, index) => [
							index + 1,
							item.namebook,
							item.name,
							item.passport,
							item.street,
							item.kol,
							dateDB(item.datetime),
							{
								qr: `${index + 1},${item.namebook}, ${item.name},${
									item.passport
								}, ${item.street}, ${item.kol}, ${dateDB(item.datetime)}`,
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
		defaultStyle: {
			fontSize: 10,
			minCellHeight: 60,
		},
	}
	$pdfMake.createPdf(docDefinition).download('bookgive.pdf')
}
interface ApiResponse {
	data: any[]
}
interface ApiReq {
	data: any
}
const updateTimers = () => {
	const now = new Date()
	filteredItems.value.forEach(item => {
		formattedTimes.value[item.id] = formatTime(item.datetime, now)
	})
}
const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')
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

const frameworks = [
	{ value: 'namebook', label: 'Номи китоб' },
	{ value: 'name', label: 'Номи пурра' },
	{ value: 'passport', label: 'Паспорт' },
	{ value: 'kol', label: 'Миқдор' },
	{ value: 'datetime', label: 'Сана' },
	{ value: 'return', label: 'Бозгашт' },
]

const open = ref(false)
const value = ref('')
const book = ref<any[]>([])
const startTimer = () => {
	if (timerInterval) return
	timerInterval = setInterval(updateTimers, 1000)
}
const stopTimer = () => {
	if (timerInterval) {
		clearInterval(timerInterval)
		timerInterval = null
	}
}
const getBook = async () => {
	try {
		const response: ApiResponse = await $fetch<ApiReq>('/api/givebook/book', {
			method: 'get',
		})

		book.value = response.data
		counts.value = filteredItems.value.length
		updateTimers()
	} catch (error) {
		console.log(error)
	}
}
const TimerClock = (id: Date) => {
	const date = new Date(id)
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()
	const formattedHours = hours < 10 ? `0${hours}` : hours
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
	const formattedDate = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
	return formattedDate
}
const formatTime = (datetime: string, now: Date) => {
	const date = new Date(datetime)
	const diff = now.getTime() - date.getTime()

	const diffDate = new Date(diff)
	const hours = diffDate.getUTCHours()
	const minutes = diffDate.getUTCMinutes()
	const seconds = diffDate.getUTCSeconds()

	const formattedHours = hours < 10 ? `0${hours}` : hours
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
const filteredItems = computed(() => {
	return book.value.filter(item => {
		return Object.values(item).some(value => {
			return String(value).includes(booksItemSearch.value)
		})
	})
})
onMounted(() => {
	getBook()
	//setInterval(updateTimers, 1000)
})
</script>
