<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'
const login = ref('')
const pass = ref('')

const OnSend = () => {
	if (login.value == 'admin' && pass.value == '1234') {
		window.location.href = '/dashboard'
	} else if (login.value == 'admin' && pass.value == 'mobile') {
		window.location.href = '/mobile/Index'
	} else {
		toast.error('Логин ва рамзро нодуруст ворид намудед!')
	}
}
</script>

<template>
	<Card class="w-[350px] mx-auto ml-auto mt-40">
		<CardHeader>
			<CardTitle class="text-center"
				>Барномаи худкорсозӣ ва баҳисобгирии китобхонаи Коллеҷи технологии
				ш.Душанбе</CardTitle
			>
			<CardDescription class="text-center ml-20">
				<img src="../public/лого.png" class="w-32 text-center" />
			</CardDescription>
		</CardHeader>
		<form @submit.prevent="OnSend">
			<CardContent>
				<div class="grid items-center w-full gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Логин</Label>
						<Input
							id="name"
							placeholder="Логин"
							v-model="login"
							class="focus:border-blue-500"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Рамз</Label>
						<Input
							type="password"
							placeholder="Рамз"
							v-model="pass"
							class="focus:border-blue-500"
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter class="flex justify-between px-6 pb-6">
				<Button type="submit" variant="primary" class="w-full"
					>Воридшавӣ</Button
				>
			</CardFooter>
		</form>
	</Card>
	<Toaster position="top-center" richColors />
</template>
<style>
body {
	background-repeat: no-repeat;
}
</style>
