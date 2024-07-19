import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity() 
export class Url extends BaseEntity{   

   @PrimaryGeneratedColumn() 
   id: number;
   
   @Column({
    nullable: true
   }) 
   shortUrl: string
   
   @Column() 
   longUrl: string

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date
}