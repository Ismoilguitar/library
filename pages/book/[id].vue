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
		class="overflow-y-hidden"
		:isSidebar="isSidebar"
		@update:isSidebar="updateSidebar"
	/>
	<!-- Card Section -->
	<div :class="['max-w-4xl -mt-10 lg:px-8 lg:py-14 mx-auto', isSidebar ? 'ml-40' : 'mx-auto']">
		<!-- Card -->
		<div class="bg-white rounded-xl shadow p-4 sm:p-7">
			<form>
				<!-- Section -->
				<div
					class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent"
				>
					<div class="sm:col-span-12">
						<h2
							class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
						>
							Форма барои дидани китоб
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
							disabled
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
							disabled
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
							disabled
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
							disabled
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
							disabled
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
						<Input type="file" disabled />
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
						<div class="ml-3">
							<NuxtLink to="/catalog">
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
import { ChevronLeft } from 'lucide-vue-next'
const isSidebar = ref(false)

function updateSidebar(value: any) {
	isSidebar.value = value
}
const Icon = ref(true)
const imageUrl = ref('')
const name = ref('')
const years = ref('')
const author = ref('')
const price = ref('')
const kol = ref('')
const onSubmit = async () => {
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
onMounted(onSubmit)
</script>
