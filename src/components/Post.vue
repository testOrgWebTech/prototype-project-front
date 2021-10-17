<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ post.user.name }}</p>
          <p class="subtitle is-6">{{ post.email }}</p>
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
      <div>
        {{ post.message }}
        <br /><br />
        <time>{{
          new Date(post.created_at).toLocaleDateString("en-EN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}</time>
      </div>

      <b-modal
        :active.sync="showJoinModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <JoinChallenge
          @closeCreate="showJoinModal = false"
          :id="post.id"
          :challenge_id="this.challenge_id"
        >
        </JoinChallenge>
      </b-modal>

      <b-button
        type="is-primary is-light"
        class="comment-button"
        v-if="AuthUser.getters.user && post.comments.length > 0"
        @click="$emit('showComment', post.id)"
        >Comment</b-button
      >
      <b-button
        type="is-primary is-light"
        class="join-button"
        v-if="AuthUser.getters.user && AuthUser.getters.user.id != post.user_id"
        @click="showJoinModal = true"
        >Join
      </b-button>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import JoinChallenge from "@/components/JoinChallenge.vue";

export default {
  components: {
    JoinChallenge,
  },
  name: "Post",
  data() {
    return {
      categories: null,
      category: null,
      option: null,
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
    challenge_id: null,
  },
  methods: {
    onClickJoin() {
      this.$buefy.dialog.confirm({
        message: "Join this activity?",
        onConfirm: async () => {
          this.$buefy.toast.open("Join Success");
        },
      });
      console.log(this.post);
    },
    /*checkOwnPost() {
      return !(AuthUser.getters.user.id === this.$props.user.id);
    },*/
  },
  created() {
    console.log(this.post);
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
  margin-left: 85%;
}
</style>