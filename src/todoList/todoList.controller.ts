import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { TodoListService } from './todoList.service';
import { CreateTodoListDto } from './create-user.dto';
import { CreateTodoCardDto } from './create-card.dto';
import { HistoryDto } from './create-history.dto';

@Controller()
export class TodoListController {
    constructor(private readonly TodoListService: TodoListService) {}

    @Get('card/:id')
    getCards(@Param('id') id: string) {
        return this.TodoListService.getCards(id);
    }

    @Get('list')
    getTodo() {
        return this.TodoListService.getAllList();
    }

    @Post('list')
    @UsePipes(new ValidationPipe())
    create(@Body() createTodoListDto: CreateTodoListDto) {
        return this.TodoListService.createList(createTodoListDto);
    }

    @Post('card/:id')
    @UsePipes(new ValidationPipe())
    createCard(
        @Param('id') id: string,
        @Body() createTodoCardDto: CreateTodoCardDto
    ) {
        return this.TodoListService.createCard(id, createTodoCardDto);
    }

    @Delete('card/:id')
    deleteCard(@Param('id', ParseIntPipe) id: number) {
        return this.TodoListService.deleteCard(id);
    }

    @Delete('list/:id')
    deleteList(@Param('id') id: string) {
        return this.TodoListService.deleteList(id);
    }

    @Patch('card/:id')
    editCard(
        @Param('id', ParseIntPipe) id: number,
        @Body() EditTodoCardDto: CreateTodoCardDto
    ) {
        return this.TodoListService.editCard(id, EditTodoCardDto);
    }

    @Post('historyCard/:id?')
    addHistoryCard(@Body() historyDto: HistoryDto, @Param('id') id?: number) {
        return this.TodoListService.addHistoryCard(historyDto, id);
    }

    @Get('historyCard/:id')
    getHistoryCard(@Param('id') id: number) {
        return this.TodoListService.getHistoryCard(id);
    }

    @Get('historyCard')
    getAllHistoryCard() {
        return this.TodoListService.getAllHistoryCard();
    }
}
