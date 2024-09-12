<template>
    <div class="MainHeader" v-if="user && user.username">
        <div class="ProfileBlock">
            <img
                v-if="user.profilepic"
                :src="user.profilepic"
                class="profile-pic"
            />
            <div class="profile-infos" v-if="user.username && user.role">
                <a class="name">{{ user.username }}</a><br>
                <a class="role">{{ user.role }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { useUserStore } from '@/Stores/userStore';

    export default {
    name: 'HeaderMain',
    computed: {
        user() {
        return useUserStore().user;  // Acessa diretamente a store
        }
    },
    mounted() {
        const userStore = useUserStore();
        if (!userStore.user || Object.keys(userStore.user).length === 0) {
            userStore.loadUser();
        }
    }


    }
</script>


<style lang="stylus">
    @import './header-main.styl';
</style>
