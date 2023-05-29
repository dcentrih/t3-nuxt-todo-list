<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

const { signIn } = useAuth();

const state = reactive({
  email: "",
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, state);

const signInWithEmail = async () => {
  const isValid = await v$.value.$validate();

  if (isValid) signIn("email", { email: state.email });
};
definePageMeta(guestMode);
</script>

<template>
  <v-card width="350">
    <v-card-title> Sign in </v-card-title>
    <v-card-text>
      <v-btn
        append-icon="mdi-github"
        color="grey-lighten-2"
        block
        @click="signIn('github')"
        >Sign in with Github</v-btn
      >
      <div style="padding-block: 1rem">
        <v-row align="center" no-gutters>
          <v-col cols="3"><v-divider></v-divider></v-col>
          <v-col
            ><div style="text-align: center">or continue with...</div></v-col
          >
          <v-col cols="3"><v-divider></v-divider></v-col>
        </v-row>
      </div>
      <v-form @submit.prevent="signInWithEmail">
        <v-text-field
          v-model="state.email"
          variant="solo"
          type="email"
          required
          placeholder="your@email.com"
          style="margin-bottom: 0.25rem"
          @input="v$.email.$touch"
          @blur="state.email ? v$.email.$touch : v$.$reset()"
          :error-messages="
            v$.email.$errors.map((err) => err.$message.toString())
          "
        ></v-text-field>
        <v-btn
          append-icon="mdi-email"
          type="submit"
          color="primary"
          block
          :disabled="v$.$error || state.email === ''"
          >Sign in with your email</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>
