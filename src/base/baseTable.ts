import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

export class BaseTable{
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at:Date
}
