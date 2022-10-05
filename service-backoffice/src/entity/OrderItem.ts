import { Product } from './Product';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";

@Entity()
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number;

    @ManyToOne(() => Order, {eager: true, nullable: false})
    order: Order;

    @ManyToOne(() => Product, {eager: true, nullable: false})
    product: Product;

    @Column({ nullable: false })
    amount: number;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    value: number;

    @Column()
    invoicedDate: Date;

    @Column()
    canceledDate: Date;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}