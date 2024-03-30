import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './todoList.entity';
import { Repository } from 'typeorm';
import { TodoCard } from 'src/todoList/todoCard.entity';
import { CreateTodoCardDto } from './create-card.dto';
import { v4 } from 'uuid';
import { HistoryDto } from './create-history.dto';
import { History } from './history.entity';

@Injectable()
export class TodoListService {
    constructor(
        @InjectRepository(TodoList) private TodoList: Repository<TodoList>,
        @InjectRepository(TodoCard) private TodoCard: Repository<TodoCard>,
        @InjectRepository(History) private History: Repository<History>
    ) {}

    async createList(createTodoList: CreateTodoListDto) {
        const idList = v4();

        if (createTodoList.name === '') {
            return new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Name don't be empty"
                },
                HttpStatus.BAD_REQUEST
            );
        }

        const todoList = new TodoList();

        (todoList.name = createTodoList.name), (todoList.id = idList);
        todoList.card = [];

        return await this.TodoList.save(todoList);
    }

    async createCard(id: string, createTodoCard: CreateTodoCardDto) {
        const list = await this.TodoList.findOne({
            where: {
                id: id
            },
            relations: ['card']
        });

        if (!list) {
            throw new Error('Object list not found');
        }
        const card = await this.TodoCard.save(createTodoCard);

        list.card.push(card);

        return await this.TodoList.save(list);
    }

    async getAllList() {
        const todoList = await this.TodoList.find({ relations: ['card'] });

        return todoList;
    }

    async getCards(id: string) {
        const todoList = await this.TodoCard.find({
            where: {
                listCardId: id
            },
            relations: ['cards']
        });

        return { todoList };
    }

    async deleteCard(idCard: number) {
        return await this.TodoCard.delete(idCard);
    }

    async deleteList(idList: string) {
        return await this.TodoList.delete(idList);
    }

    async editCard(idCard: number, editTodoCard: CreateTodoCardDto) {
        const card = await this.TodoCard.findOne({
            where: {
                id: idCard
            }
        });

        const updatedCard = Object.assign(card, editTodoCard);

        return await this.TodoCard.save(updatedCard);
    }

    async addHistoryCard(history: HistoryDto, idCard?: number) {
        const card = await this.TodoCard.findOne({
            where: {
                id: idCard
            },
            relations: ['history']
        });

        if (!idCard) return await this.History.save(history);

        const date = await this.History.save(history);

        card.history.push(date);

        return await this.TodoCard.save(card);
    }

    async getHistoryCard(id: number) {
        const card = await this.History.find({
            where: {
                cardId: id
            },
            order: {
                id: 'ASC'
            }
        });

        return card;
    }

    async getAllHistoryCard() {
        const card = await this.History.find({
            order: {
                id: 'ASC'
            }
        });

        return card;
    }
}
