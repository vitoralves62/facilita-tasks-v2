<template>
    <nav class="sidebar">
        <div class="Logo">
            <LogoType />
        </div>
        <ul class="sidebar-itens">
            <li class="dashboard">
                <router-link to="/Dashboard" class="dash-button">
                    <img
                        src='@/assets/imgs/chart-bar-light1.svg'
                        class="graph"
                    />
                    <a class="a-dash" href="/Dashboard">Dashboard</a>
                </router-link>
            </li>
            <li class="tasks">
                <router-link to="/Tarefas" class="tasks-button">
                    <img
                        src="@/assets/imgs/check-circle.svg"
                        class="check-circle"
                    />
                    <a class="a-tasks" href="/Tarefas">Tarefas</a>
                </router-link>
            </li>
            <li class="settings">
                <router-link to="/Configuracoes" class="config-button">
                    <img
                        src="@/assets/imgs/triple-gear.svg"
                        class="gears"
                    />
                    <a class="a-settings" href="/Configuracoes">Configurações</a>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import LogoType from '@/components/Logotype/LogoType.vue';

    export default {
        name: 'SidebarMain',
        components: {
            LogoType
        },
    }
</script>

<style lang="stylus">
    @import './sidebar-main.styl' 
</style>