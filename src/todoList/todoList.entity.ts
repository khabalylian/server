import { TodoCard } from 'src/todoList/todoCard.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class TodoList {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => TodoCard, todo => todo.listCard)
    card: TodoCard[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAr: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}
