<template>
    <b-navbar>
        <template #brand>
            <section>
                <b-sidebar
                    type="is-light"
                    :fullheight="fullheight"
                    :fullwidth="fullwidth"
                    :overlay="overlay"
                    :right="right"
                    v-model="open"
                >
                    <div class="p-1">
                    <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    />
                    <b-menu>
                        <b-menu-list label="Menu">
                        <b-menu-item icon="information-outline" label="Info"></b-menu-item>
                        <b-menu-item icon="settings">
                            <template #label="props">
                            Administrator
                            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                            </template>
                            <b-menu-item icon="account" label="Users"></b-menu-item>
                            <b-menu-item icon="cellphone-link">
                            <template #label>
                                Devices
                                <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                                    <template #trigger>
                                        <b-icon icon="dots-vertical"></b-icon>
                                    </template>
                                    <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                                </b-dropdown>
                            </template>
                            </b-menu-item>
                            <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
                        </b-menu-item>
                        <b-menu-item icon="account" label="My Account">
                            <b-menu-item label="Account data"></b-menu-item>
                            <b-menu-item label="Addresses"></b-menu-item>
                        </b-menu-item>
                        </b-menu-list>
                        <b-menu-list>
                        <b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo"></b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Actions">
                        <b-menu-item label="Logout"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
                    </div>
                </b-sidebar>
                <b-button @click="open = true">Show sidebar</b-button>
            </section>
    
    </template>
        <template #start>
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-button class="is-primary" tag="router-link" to="/signUp">
                <strong>Sign up</strong>
            </b-button>

            <div>
                <b-dropdown
                        position="is-bottom-left"
                        append-to-body
                        aria-role="menu"
                        trap-focus
                    >
                    <template #trigger>
                        <a
                            class="navbar-item"
                            role="button">
                            <span>Login</span>
                            <b-icon icon="menu-down"></b-icon>
                        </a>
                    </template>


                    <b-dropdown-item
                        aria-role="menu-item"
                        :focusable="false"
                        custom
                        paddingless>
                        <form action="">
                            <div class="modal-card" style="width:300px;">
                                <section class="modal-card-body">
                                    <b-field label="Email">
                                        <b-input
                                            type="email"
                                            placeholder="Your email"
                                            required>
                                        </b-input>
                                    </b-field>

                                    <b-field label="Password">
                                        <b-input
                                            type="password"
                                            password-reveal
                                            placeholder="Your password"
                                            required>
                                        </b-input>
                                    </b-field>

                                    <b-checkbox>Remember me</b-checkbox>
                                </section>
                                <footer class="modal-card-foot">
                                    <b-button
                                        label="Login"
                                        type="is-primary" />
                                </footer>
                            </div>
                        </form>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </template>
    </b-navbar>

</template>

<script>
export default {
  name: 'Topbar',
  data() {
    return {
      open: false,
    }
  }
}
</script>

<style scoped lang="scss">

