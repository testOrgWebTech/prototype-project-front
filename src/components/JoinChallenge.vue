<template>
  <div class="card draft">
    <div class="card-content">
     this challenge mode is {{this.challenge.mode}}
    
    <b-field v-if="checkMode()">
        <b-select placeholder="Select Your Team"
        v-model="selectedTeam" @input="selectTeam">
            <option
            v-for="(team, index) in teamWithUser" :key="index" 
            :value="team"
            >
            {{ team.name }}
            </option>
          </b-select>
    </b-field>
    
    <b-field v-if="this.selectedTeam !== null">
        <b-checkbox v-model="selectedPlayer" v-for="(email, index) in selectedTeamPlayer" :key="index" :native-value="email">
            {{ email }}
        </b-checkbox>
      </b-field>

     <b-button type="is-primary is-light" @click="join">
        Join
     </b-button>
     <b-button @click="showData">data</b-button>
     <b-loading v-model="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>
import ChallengeService from '@/services/ChallengeService'
import TeamApiStore from '@/store/TeamApi'
import AuthUser from '@/store/AuthUser'
import ChallengeStore from '@/store/ChallengeApi'
export default {
    data(){
        return{
            teams: [],
            teamWithUser: [],
            selectedTeam: null,
            selectedTeamPlayer: [],
            selectedPlayer: [
                AuthUser.getters.user.email
            ],
            isLoading: true,
            challenge: null,
        }
    },
    props:{
        id:null,
        challenge_id: null,
    },
    methods:{
        showData(){
            console.log(this.challenge);
        },
        async findChallenge(){
            this.isLoading = true
            this.challenge = await ChallengeService.getChallengeById(this.$props.challenge_id)
            this.isLoading = false
        },
        async fetchTeam(){
            this.isLoading = true
            await TeamApiStore.dispatch("fetchTeams");
            this.teams = TeamApiStore.getters.teams;
            let user_id = AuthUser.getters.user.id.toString();
            this.teams.forEach(team =>{
                if(team.users_id.includes(user_id) && team.id !== this.challenge.teamA_id){
                    this.teamWithUser.push(team);
                }
            })
            this.isLoading = false
        },
        selectTeam(){
            this.selectedTeamPlayer = []
            let stringArray = this.selectedTeam.users_email.trim().split(', ')
            stringArray.forEach(string => {
                if(string !== AuthUser.getters.user.email){
                this.selectedTeamPlayer.push(string)
                }
            });
        },
        checkMode(){
            if(this.challenge.mode[0] === "1"){
                return false;
            }
            return true;
        },
        async join(){
            if(this.selectedPlayer.length > this.challenge.mode[0]){
                this.$buefy.dialog.alert({
                title: 'Error',
                message: 'The selected player is more than the limit.',
                type: 'is-danger',
                hasIcon: true,
                icon: 'times-circle',
                iconPack: 'fa',
                ariaRole: 'alertdialog',
                ariaModal: true
                })
            }
            else if(this.selectedPlayer.length < this.challenge.mode[0]){
                this.$buefy.dialog.alert({
                title: 'Error',
                message: 'The selected player is less than the limit.',
                type: 'is-danger',
                hasIcon: true,
                icon: 'times-circle',
                iconPack: 'fa',
                ariaRole: 'alertdialog',
                ariaModal: true
                })
            }
            else{
                //update challenge and delete post
                let player = this.selectedPlayer.join(', ')
                let payload
                if(this.challenge.mode[0] === '1'){
                    payload = {
                        id: this.$props.challenge_id,
                        teamB_id: "",
                        match_progress: "ENDED",
                        players: player,
                        player_team: "teamB",
                    }
                }
                else{
                    payload = {
                        id: this.$props.challenge_id,
                        teamB_id: this.selectedTeam.id,
                        match_progress: "ENDED",
                        players: player,
                        player_team: "teamB",
                    };
                }
                await ChallengeStore.dispatch("editChallenge", payload);
                this.$emit('fetchPost');
                this.$emit("closeCreate");
                this.$router.go(0)
            }
        }
    },
    created(){
        this.findChallenge();
        this.fetchTeam();
    }
}
</script>

<style lang="scss" scoped>

</style>