<template>
	<Sidebar
		bread="Саҳифаи асосӣ"
		:Icon="Icon"
		breadList="Китобҳо"
		:IconItem="Icon"
		:linkItem="Icon"
		ListItemLink="Бақайдгирии китобҳо"
		breadListItem="Каталоги китобҳо"
		hrefLink="/catalog"
		toLink="/catalog"
		ListItemHref="/AddBook"
		:isSidebar="isSidebar"
		@update:isSidebar="updateSidebar"
	/>
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
							v-model="name"
						/>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
							>
								Соли нашр
							</label>
						</div>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Соли нашри"
							v-model="years"
						/>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Муаллиф
							</label>
						</div>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Муаллиф"
							v-model="author"
						/>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Нарх
							</label>
						</div>
					</div>
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Input
							type="text"
							class="focus:border-blue-500"
							placeholder="Нарх"
							v-model="price"
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
					<!-- End Col -->

					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Миқдор"
							v-model="kol"
						/>
					</div>
					<div class="sm:col-span-3">
						<div class="inline-block">
							<label
								class="inline-block text-sm font-medium text-gray-500 mt-2.5"
							>
								Расм
							</label>
						</div>
					</div>
					<!-- End Col -->
					<div class="sm:col-span-9">
						<Input type="file" @change="handleFileUpload" />
						<div class="sm:col-span-9">
							<div class="flex w-full">
								<img
									v-if="imageUrl"
									class="rounded-xl sm:size-48 lg:size-60"
									:src="imageUrl"
									alt="Image Description"
								/>
							</div>
							<Input class="sr-only" v-model="imageUrl" />
						</div>
					</div>
					<!-- End Col -->
				</div>
				<!-- End Section -->
				<div class="flex items-center justify-center border-t">
					<div class="flex mt-2">
						<div>
							<Button
								type="submit"
								variant="primary"
								class="bg-green-500 hover:bg-green-400 overflow-y-hidden"
							>
								<SquarePen class="flex-shrink-0 mt-0.5 size-5" />
								<span class="px-3">Таҳрир</span>
							</Button>
						</div>
						<div class="ml-3">
							<NuxtLink to="/catalog">
								<Button variant="outline" class="overflow-y-hidden">
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
import axios from 'axios'
import { ChevronLeft, SquarePen } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
const Icon = ref(true)
const imageUrl = ref('')
const name = ref('')
const years = ref('')
const author = ref('')
const price = ref('')
const kol = ref('')
const isSidebar = ref(false)

function updateSidebar(value: any) {
	isSidebar.value = value
}
const handleFileUpload = async (event: Event) => {
	const target = event.target as HTMLInputElement
	const files = target.files
	if (!files || files.length === 0) return

	const file = files[0]
	if (file && file.type.startsWith('image/')) {
		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await axios.post('/api/post/images', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			imageUrl.value = response.data.filePath
			console.log('File uploaded successfully:', response.data)
		} catch (error) {
			console.error('Error uploading file:', error)
			alert('Error uploading file')
		}
	} else {
		alert('Please select a valid image file.')
	}
}
const getBook = async () => {
	try {
		const route = useRoute()
		const id = route.params.id
		const response = await $fetch(`/api/get/book/${id}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		name.value = response.name
		years.value = response.year
		author.value = response.author
		price.value = response.price
		kol.value = response.kol
		imageUrl.value = response.image
	} catch (error) {
		console.error('Error:', error)
	}
}
const onSubmit = async () => {
	try {
		const route = useRoute()
		const id = route.params.id
		const response = await $fetch(`/api/update/${id}`, {
			method: 'PUT',
			body: {
				name: name.value,
				year: years.value,
				author: author.value,
				price: price.value,
				kol: kol.value,
				image: imageUrl.value,
			},
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
		console.log('Data Book', response)
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
