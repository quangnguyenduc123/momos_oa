import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_name', type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ name: 'hash_password', length: 255 })
    hashPassword: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updated_at: Date;
}
