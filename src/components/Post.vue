<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content" id="media">
          <figure class="image is-64x64 media-left is-inline-block">
            <router-link :to="`/profile/${post.user.id}`">
              <img
                class="is-rounded"
                :src="`http://localhost:8000${post.user.imagePath}`"
              />
            </router-link>
          </figure>
          <div class="media-content is-inline-block">
            <div class="content">
              <router-link :to="`/profile/${post.user.id}`">
                <p class="title is-4">{{ post.user.name }}</p>
                <p class="subtitle is-6">{{ post.user.email }}</p>
              </router-link>
              <time>{{
                new Date(post.created_at).toLocaleDateString("en-EN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}</time>
              <div>
                <b-taglist>
                  <b-tag type="is-info">{{ post.category.name }}</b-tag>
                </b-taglist>
              </div>
            </div>
          </div>
        </div>
        <b-dropdown
          v-model="option"
          append-to-body
          aria-role="menu"
          v-if="(AuthUser.getters.user && !checkOwnPost()) || AuthUser.getters.user.role == 'ADMIN'"
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
            @click="$emit('showEdit', post)"
          >
            Edit
          </b-dropdown-item>
          <b-dropdown-item
            value="delete"
            aria-role="menuitem"
            @click="$emit('delete', post.id)"
          >
            Delete
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div >
        <div v-if="post.mode == 'challenge'">
          Location: {{post.challenge.location}}
          
          <br>
          
          Mode: {{ post.challenge.mode }}
         
          <br>
          <br>
        </div>
        {{ post.message }}
        <br /><br />

      </div>
      



      <b-modal
        :active.sync="showJoinModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <JoinChallenge
          v-if="post.challenge"
          @closeCreate="showJoinModal = false"
          :id="post.id"
          :challenge_id="post.challenge.id"
        >
        </JoinChallenge>
      </b-modal>
      <section id="btn">
        <b-button
            type="is-primary is-light"
            class="post-btn is-right"
            v-if="
            AuthUser.getters.user &&
            checkOwnPost() &&
            checkUserInTeamA() &&
            checkChallengeIsFull() &&
            post.mode == 'challenge'
          "
            @click="
            () => {
              showJoinModal = true;
            }
          "
        >Join
        </b-button>

        <b-button
          type="is-primary is-light"
          label="Direct Message"
          class="post-btn is-right"
          v-if="AuthUser.getters.user && checkOwnPost()"
          @click="showPostModal = true"
          >Message
        </b-button>

        <b-button
            type="is-primary is-light"
            class="post-btn is-right"
            v-if="AuthUser.getters.user"
            @click="$emit('showComment', post.id)"
        >Comment</b-button
        >
      </section>
    </div>
    <div>
      <b-modal
        :active.sync="showPostModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <MessagePost id="x"
          :receiver_id="post.user.id"
          :username="post.user.name"
        ></MessagePost>
      </b-modal>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import MessagePost from "./MessagePost";
import JoinChallenge from "@/components/JoinChallenge.vue";

export default {
  name: "Post",
  components: {
    MessagePost,
    JoinChallenge,
  },
  data() {
    return {
      categories: null,
      category: null,
      option: null,
      showPostModal: false,
      AuthUser,
      chellenge_form: {
        teamB_id: "",
        players: "",
      },
      showJoinModal: null,
    };
  },
  // edit send post send each prop
  props: {
    post: null,
  },
  methods: {
    onClickJoin() {
      this.$buefy.dialog.confirm({
        message: "Join this activity?",
        onConfirm: async () => {
          this.$buefy.toast.open("Join Success");
        },
      });
    },
    checkOwnPost() {
      return AuthUser.getters.user.id !== this.post.user.id;
    },
    checkUserInTeamA() {
      if (
        this.post.challenge &&
        this.post.challenge.teamA_players_id.includes(AuthUser.getters.user.id)
      ) {
        return false;
      }
      return true;
    },
    checkChallengeIsFull() {
      if (this.post.challenge && this.post.challenge.teamB_players_id !== "") {
        return false;
      }
      return true;
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.card {
  width: 50%;
  margin: auto;
  margin-top: 30px;
  word-wrap: break-word;

}
.post-btn {
  margin-left: 10px;
}
#btn {
  text-align: right;
  margin-top: 10px;
  padding-left: 0%;
}
#x {
  width: 100%;
}

</style>