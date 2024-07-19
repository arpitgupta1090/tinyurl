import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity() 
export class User extends BaseEntity{   

   @PrimaryGeneratedColumn() 
   id: number;
   
   @Column() 
   userName: string
   
   @Column({
    unique: true
   }) 
   email: string

   @Column({ select: false }) 
   password: string

   @Column({
    default: false
   }) 
   isAdmin: boolean

   @Column({
    default: false
   }) 
   isSuperUser: boolean

   @Column({
    default: false
   }) 
   isActive: boolean

   @Column({
      default: false
   }) 
   isDeleted: boolean

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date
}