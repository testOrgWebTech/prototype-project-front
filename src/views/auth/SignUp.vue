<template>
    <div class="form">
        <section>
            <b-field label="Name" horizontal>
            <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid"
            horizontal>
            <b-input type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Username"
            type="is-success"
            message="This username is available"
            horizontal>
            <b-input value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password" horizontal>
            <b-input type="password"
                value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>

        

        <b-button class="button is-danger" tag="router-link" to="/">
            Cancel
        </b-button>
        <b-button class="is-success">
            Sign Up
        </b-button>
            
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.form{
    margin: 200px;
}
.label{
    text-align: left;
}
.button{
    margin: 10px;
}
</style>