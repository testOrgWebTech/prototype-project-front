<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ name }}</p>
          <p class="subtitle is-6">{{ email }}</p>
        </div>
        <b-dropdown
          v-model="option"
          append-to-body
          aria-role="menu"
          v-if="AuthUser.getters.user"
        >
          <template #trigger>
            <a class="navbar-item" role="button">
              <h2>...</h2>
            </a>
          </template>

          <b-dropdown-item custom aria-role="menuitem">
            <h3>select your action</h3>
          </b-dropdown-item>
          <hr class="dropdown-divider" />
          <b-dropdown-item
            value="edit"
            aria-role="menuitem"
            @click="$emit('showEdit', id)"
          >
            Edit
          </b-dropdown-item>
          <b-dropdown-item
            value="delete"
            aria-role="menuitem"
            @click="$emit('delete', id)"
          >
            Delete
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div>
        {{ message }}
        <br /><br />
        <time>{{
          new Date(datetime).toLocaleDateString("en-EN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}</time>
      </div>
      <b-button
        type="is-primary is-light"
        class="join-button"
        v-if="AuthUser.getters.user"
        @click="onClickJoin"
        >Join</b-button
      >
    </div>

    <!--create post-->
    <!--<b-modal v-if="isDraft" :active.sync="showCreateModal" @close="$emit('closeCreateModal')">
            <div class="card-content draft" style="background-color: white;">
                <b-field label="create-post">
                  <b-input maxlength="300" type="textarea"></b-input>
                </b-field>
                <b-button type="is-primary is-light" @click="newPost">Create Post</b-button>
            </div>
        </b-modal>-->
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import ChallengeStore from "@/store/ChallengeApi";

export default {
  name: "Post",
  data() {
    return {
      categories: null,
      category: null,
      option: null,
      AuthUser,
      chellenge_form: {
        location: "",
        teamB_id: "",
        victory_team: "",
        players: "",
      },
    };
  },
  props: {
    id: null,
    email: null,
    imageUrl: null,
    name: null,
    datetime: null,
    isDraft: null,
    showCreateModal: false,
    message: null,
    user: null,
    challenge_id: null,
  },
  methods: {
    async onClickJoin() {
      this.$buefy.dialog.confirm({
        message: "Join this activity?",
        onConfirm: async () => {
          let payload = {
            id: this.challenge_id,
            teamB_id: challenge_form.teamB_id,
            match_progress: "ENDED",
            players: challenge_form.players,
            player_team: "teamB",
            //victory team rand on backend so we dont have to pass vcitory team
            // victory_team: challenge_form.victory_team,
          };
          await ChallengeStore.dispatch("editChallenge", payload);
          this.$buefy.toast.open("Join Success");
        },
      });
    },
  },
  created() {
    if (this.isDraft) {
      this.fetchCategory();
    }
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 50%;
  margin: auto;
  margin-top: 30px;
  word-wrap: break-word;
}
.join-button {
  margin-left: 630px;
}
</style>