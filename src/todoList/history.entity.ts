import { TodoCard } from 'src/todoList/todoCard.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    time: string;

    @ManyToOne(() => TodoCard, todo => todo.history, { onDelete: 'CASCADE' })
    card: TodoCard;

    @Column({ nullable: true })
    cardId: number;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;
}
