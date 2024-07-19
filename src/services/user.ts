import { User } from '../entity/user' 
import { QueryFailedError } from 'typeorm';
import { DBError, UniqueContraintError } from '../responses/customErrors';


class UserService {

    public create = async (userName:string, email:string, password:string) => {
        try{
            const user = User.create({ userName, email, password })
            await user.save()
            const userData = {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
            return userData
        }
        catch(err){
            if (err instanceof QueryFailedError) {
                if (err.driverError.errno == 19){
                    throw new UniqueContraintError("User already exists")
                }
                else{
                    throw new DBError("DB query failed")
                }
            }
        }
    }

    public getAllUsers = async () => {
        try{
            const users = await User.find();
            return users
        }
        catch(err){
            if (err instanceof QueryFailedError) {
                throw new DBError("DB query failed")
            }
        }
    }

    public getUserById = async (id:number) => {
        try{
            const user = await User.findOneBy({id: id});
            return user
        }
        catch(err){
            if (err instanceof QueryFailedError) {
                throw new DBError("DB query failed")
            }
        }
    }

    public getUserByEmailPassword = async (email:string) => {
        try{
            const user = await User.createQueryBuilder().addSelect("User.password").where("email = :email", { email: email }).getOne()
            return user
        }
        catch(err){
            if (err instanceof QueryFailedError) {
                throw new DBError("DB query failed")
            }
        }
    }

    public update = async (id:number, userName:string, password:string) => {
        try{
            const user = await User.findOneBy({id: id});
            if(user){
                if (userName){
                    user.userName = userName
                }
                if(password){
                    user.password = password
                }
                await user.save()
            }
            return user
        }
        catch(err){
            if (err instanceof QueryFailedError) {
                throw new DBError("DB query failed")
            }
        }
    }

}

export default UserService;
