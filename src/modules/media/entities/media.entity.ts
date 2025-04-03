import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum MediaType {
    IMAGE = 'Image',
    VIDEO = 'Video',
}

@Entity('media')
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: MediaType,
    })
    type: MediaType;

    @Column({ type: 'varchar', length: 255 })
    url: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updated_at: Date;

    @Column({ type: 'text', nullable: true })
    images: string;

    @Column({ type: 'text', nullable: true })
    videos: string;
}