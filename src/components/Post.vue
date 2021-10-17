<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <router-link :to="`/profile/${ownerId}`">
            <p class="title is-4">{{ name }}</p>
            <p class="subtitle is-6">{{ email }}</p>
          </router-link>


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

      <b-modal
        :active.sync="showJoinModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <JoinChallenge @closeCreate="showJoinModal = false"
        :id="id"
        :challenge_id="this.challenge_id">
        </JoinChallenge>
      </b-modal>

      <b-button
          type="is-primary is-light"
          label="Direct Message"
          class="msg-button"
          v-if="AuthUser.getters.user"
          @click="showPostModal=true"
      >Message
      </b-button>
      <b-button
          type="is-primary is-light"
          class="join-button"
          v-if="AuthUser.getters.user && checkOwnPost()"
          @click="showJoinModal = true"
          >Join
      </b-button>
    </div>
    <div>
      <b-modal
          :active.sync="showPostModal"
          :can-cancel="['escape', 'x', 'outside']"
      >
        <MessagePost :receiver_id="ownerId" :username="name"></MessagePost>
      </b-modal>
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
import MessagePost from "./MessagePost";
import JoinChallenge from '@/components/JoinChallenge.vue'

export default {
  name: "Post",
  components: {
    MessagePost,
    JoinChallenge
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
    showJoinModal: false,
    message: null,
    user: null,
    ownerId: '',
    challenge_id: null,
  },
  methods: {
    checkOwnPost(){
      return !(AuthUser.getters.user.id === this.$props.user.id);
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
.msg-button {
  margin-left: 550px;
}
</style>