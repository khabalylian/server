import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './todoList.entity';
import { TodoListService } from './todoList.service';
import { TodoListController } from './todoList.controller';
import { TodoCard } from 'src/todoList/todoCard.entity';
import * as cors from 'cors';
import { History } from './history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TodoList, TodoCard, History])],
    controllers: [TodoListController],
    providers: [TodoListService]
})
export class TodoListModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(cors())
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
