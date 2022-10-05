import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({nullable: false, length: 50})
    name: string;

    @Column({length: 255})
    address: string;

    @Column({length: 8})
    zipcode: string;

    @Column({length: 2})
    state: string;

    @Column({length: 50})
    city: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}