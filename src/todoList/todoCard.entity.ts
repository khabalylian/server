import { Exclude, Transform } from 'class-transformer';
import { TodoList } from 'src/todoList/todoList.entity';
import { History } from 'src/todoList/history.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TodoCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    time: string;

    @Column()
    priority: string;

    @ManyToOne(() => TodoList, todo => todo.card, { onDelete: 'CASCADE' })
    listCard: TodoList;

    @Column({ nullable: true })
    listCardId: string;

    @OneToMany(() => History, todo => todo.card)
    history: History[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAr: Date;
}


