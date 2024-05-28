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
		toLink="/catalog"
		ListItemHref="/AddBook"
		class="overflow-y-hidden"
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
							Форма барои дидани маълумоти китоб
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
							v-model="book"
							disabled
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
							disabled
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
							disabled
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
								Санаи бақайдгирӣ
							</label>
						</div>
					</div>
					<div class="sm:col-span-9">
						<Input
							class="focus:border-blue-500"
							type="text"
							placeholder="Санаи бақайдгирӣ"
							v-model="datetime"
							disabled
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
							type="text"
							placeholder="Санаи бозгашти китоб"
							v-model="returnbook"
							disabled
						/>
					</div>
				</div>
				<div class="flex items-center justify-center border-t">
					<div class="flex mt-2">
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
import { ChevronLeft } from 'lucide-vue-next'
const isSidebar = ref(false)

function updateSidebar(value: any) {
	isSidebar.value = value
}
const Icon = ref(true)
const book = ref('')
const name = ref('')
const passport = ref('')
const street = ref('')
const kol = ref('')
const datetime = ref('')
const returnbook = ref('')
const onSubmit = async () => {
	try {
		const route = useRoute()
		const id = route.params.id
		const response = await $fetch(`/api/get/bookread/${id}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		name.value = response.name
		book.value = response.namebook
		passport.value = response.passport
		street.value = response.street
		kol.value = response.kol
		datetime.value = response.datetime
		returnbook.value = response.returnbook
		console.log('Data Id', datetime.value)
	} catch (error) {
		console.error('Error:', error)
	}
}
onMounted(onSubmit)
</script>
<style>
body {
	background: none;
}
</style>
