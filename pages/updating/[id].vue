<template>
	<Sidebar
		bread="Саҳифаи асосӣ"
		:Icon="Icon"
		breadList="Китобҳо"
		:IconItem="Icon"
		:linkItem="Icon"
		ListItemLink="Бақайдгирии китобҳо"
		breadListItem="Додани китоб"
		hrefLink="/givebook"
		toLink="/givebook"
		ListItemHref="/GiveAddBook"
		:isSidebar="isSidebar"
		@update:isSidebar="updateSidebar"
	/>
	<!-- Card Section -->
	<div
		:class="[
			'max-w-4xl -mt-10 lg:px-8 lg:py-14 mx-auto',
			isSidebar ? 'ml-40' : 'mx-auto',
		]"
	>
		<div class="bg-white rounded-xl shadow p-4 sm:p-7">
			<form @submit.prevent="onSubmit">
				<div
					class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent"
				>
					<div class="sm:col-span-12">
						<h2
							class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
						>
							Форма барои таҳрири китоб
						</h2>
					</div>

					<div class="sm:col-span-3">
						<label
							class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
						>
							Номи китоб
						</label>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Номи китоб"
							v-model="namebook"
							required
						/>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
							>
								Номи пурра
							</label>
						</div>
					</div>
					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Номи пурра"
							v-model="name"
							required
						/>
					</div>

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Паспорт
							</label>
						</div>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Рақами паспорт"
							v-model="passport"
							required
						/>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Суроға
							</label>
						</div>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Textarea
							type="text"
							class="focus:border-blue-500"
							placeholder="Суроға"
							v-model="street"
							required
						/>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Миқдор
							</label>
						</div>
					</div>
					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Миқдор"
							v-model="kol"
							required
						/>
					</div>
					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Санаи бақайдгирӣ
							</label>
						</div>
					</div>
					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="datetime-local"
							v-model="datetime"
							required
						/>
					</div>
					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Санаи бозгашти китоб
							</label>
						</div>
					</div>
					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="datetime-local"
							v-model="returnbook"
							required
						/>
					</div>
				</div>
				<div class="flex items-center justify-center border-t">
					<div class="flex mt-2">
						<div>
							<Button type="submit" variant="primary">
								<SquarePen class="flex-shrink-0 mt-0.5 size-5" />
								<span class="px-3">Таҳрир</span>
							</Button>
						</div>
						<div class="ml-3">
							<NuxtLink to="/givebook">
								<Button variant="outline">
									<ChevronLeft class="flex-shrink-0 mt-0.5 size-5" />
									<span class="px-3">Баргаштан </span>
								</Button>
							</NuxtLink>
						</div>
					</div>
				</div>
			</form>
		</div>
		<!-- End Card -->
	</div>
	<!-- End Card Section -->

	<Toaster position="top-center" richColors />
</template>
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, SquarePen } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
const Icon = ref(true)
const namebook = ref('')
const name = ref('')
const passport = ref('')
const street = ref('')
const kol = ref('')
const datetime = ref('')
const returnbook = ref('')
const isSidebar = ref(false)

function updateSidebar(value: any) {
	isSidebar.value = value
}
const getBook = async () => {
	try {
		const route = useRoute()
		const id = route.params.id
		const response = await $fetch(`/api/get/bookread/${id}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		namebook.value = response.namebook
		name.value = response.name
		passport.value = response.passport
		street.value = response.street
		kol.value = response.kol
		datetime.value = response.datetime
		returnbook.value = response.returnbook
		console.log('data book', response)
	} catch (error) {
		console.error('Error:', error)
	}
}
const onSubmit = async () => {
	try {
		const route = useRoute()
		const id = route.params.id
		const response = await $fetch(`/api/givebook/update/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				namebook: namebook.value,
				name: name.value,
				passport: passport.value,
				street: street.value,
				kol: kol.value,
				datetime: datetime.value,
				returnbook: returnbook.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
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
		toast.success('Китоб бомуввақият таҳрир шуд!', {
			description: `${formattedDate}`,
		})
		console.log('Add Book', response)
	} catch (error) {
		console.error('Error:', error)
		toast.error('Маълумот илова нашуд!')
	}
}
onMounted(getBook)
</script>
<style>
body {
	background: none;
}
</style>
