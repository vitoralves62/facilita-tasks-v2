<template>
    <div class="main-container-login">
        <div class="blue-container">
            <div class="blue-container-content">
                <LogoType class="logo-type-login" />
                <h1 class="main-title">
                    <span class="title-bold">FACILITA</span>
                    <span class="title-regular">TASKS</span>
                </h1>
                <p class="sub-title">Gestão de tarefas pessoais</p>
            </div>
        </div>
        <div class="form-container">
            <form class="form-block" @submit.prevent="handleLogin">
                <p class="login-title">Entre com seus dados de acesso</p>
                <div class="email-block">
                    <legend>Nome de usuário ou e-mail:</legend>
                    <EmailInput v-model="email" class="email-input" />
                </div>
                <div class="password-block">
                    <legend>Senha:</legend>
                    <PasswordInput v-model="password" class="password-input"/>
                </div>
                <div>
                    <LoginButton class="login-button"/>
                </div>
                <a class="forgot-pass">Esqueci minha senha</a>
            </form>
        </div>
    </div>
</template>

<script>
import EmailInput from '@/components/inputs/email-input/email-input.vue';
import LogoType from "@/components/Logotype/LogoType.vue";
import PasswordInput from "@/components/inputs/password-input/password-input.vue";
import LoginButton from "@/components/login-button/login-button.vue"
import { useUserStore } from '@/Stores/userStore';
import userDTO from '@/Model/userDTO';

export default {
    name: "LoginPage",
    components: {
        LogoType,
        EmailInput,
        PasswordInput,
        LoginButton
    },
    data() {
        return {
            email: '',
            password: ''
        };
    },
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    methods: {
        async handleLogin() {
            const loginDto = new userDTO(null, this.email, this.password, null, null);
            const isAuthenticated = await this.userStore.login(loginDto);

            if (isAuthenticated) {
                this.$router.push({ name: 'Dashboard' });
            } else {
                alert('Credenciais inválidas');
            }
        }
    }
};
</script>

<style lang="stylus">
    @import './LoginPage.styl';
</style>
