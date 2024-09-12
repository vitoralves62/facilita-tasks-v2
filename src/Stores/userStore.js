import { defineStore } from "pinia";
import userDTO from "@/Model/userDTO";
import profilePic from '@/assets/imgs/pics/vitor2.png';

const userData = [
    {
        username: 'Vitor Alves de Brito',
        email: 'vitor.alves@appfacilita.com',
        password: 'vitor123',
        role: 'Front-End Developer',
        profilepic: profilePic
    }
]

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {}
    }),
    actions: {
        validateUser(email, password){
            const user = userData.find(user => user.email === email && user.password === password);
            if (user) {
                return new userDTO(user.username, user.email, user.password, user.role, user.profilepic);
            }
            return user || null;
        },
        login(dto){
            const user = this.validateUser(dto.email, dto.password);
            if(user){
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                return true;
            }
            return false; 
        },
        loadUser() {
            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                this.user = new userDTO(
                    parsedUser.username,
                    parsedUser.email,
                    parsedUser.password,
                    parsedUser.role,
                    parsedUser.profilepic
                );
            }
        }        
    }
})