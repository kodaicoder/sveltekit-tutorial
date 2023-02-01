import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export async function getTodos(userId) {
	return await prisma.toDos
		.findMany({
			where: {
				createBy: userId,
				isDone: false
			}
		})
		.then(async (res) => {
			await prisma.$disconnect();
			return res;
		})
		.catch(async (e) => {
			await prisma.$disconnect();
			console.error(e);
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(e.code + ':' + e.message);
			}
			throw new Error('Unexpected error occurred.');
		});
}

export async function createTodo(userId, title) {
	return await prisma.toDos
		.create({
			data: {
				title: title,
				createBy: userId
			}
		})
		.then(async (res) => {
			await prisma.$disconnect();
			return res;
		})
		.catch(async (e) => {
			await prisma.$disconnect();
			console.error(e);
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(e.code + ':' + e.message);
			}
			throw new Error('Unexpected error occurred.');
		});
}

export async function deleteTodo(todoid) {
	return await prisma.toDos
		.update({
			where: {
				id: todoid
			},
			data: {
				isDone: true
			}
		})
		.then(async (res) => {
			await prisma.$disconnect();
			return res;
		})
		.catch(async (e) => {
			await prisma.$disconnect();
			console.error(e);
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(e.code + ':' + e.message);
			}
			throw new Error('Unexpected error occurred.');
		});
}
