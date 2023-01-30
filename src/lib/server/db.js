import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getTodos(userId) {
	return await prisma.toDos.findMany({
		where: {
			createBy: userId,
			isDone: false
		}
	});
}

export async function createTodo(userid, title) {
	await prisma.toDos.create({
		data: {
			title: title,
			createBy: userid
		}
	});
}

export async function deleteTodo(todoid) {
	todoid = parseInt(todoid);
	await prisma.toDos.update({
		where: {
			id: todoid
		},
		data: {
			isDone: true
		}
	});
}
