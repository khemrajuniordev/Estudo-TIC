<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
    <Card class="w-full max-w-md shadow-2xl">
      <template #content>
        <!-- Brand -->
        <div class="text-center mb-6">
          <p class="text-3xl mb-1">🛍️</p>
          <h1 class="text-xl font-extrabold text-gray-800 dark:text-gray-100">E-commerce</h1>
          <p class="text-xs text-gray-400 mt-1">Acesse sua conta ou crie uma nova</p>
        </div>

        <Tabs v-model:value="activeTab">
          <TabList class="mb-4">
            <Tab value="0" class="flex-1 justify-center">Login</Tab>
            <Tab value="1" class="flex-1 justify-center">Criar Conta</Tab>
          </TabList>

          <TabPanels>
            <!-- ── LOGIN ── -->
            <TabPanel value="0">
              <form class="flex flex-col gap-4" @submit.prevent="submitLogin">

                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                  <InputText
                    v-model="loginForm.email"
                    placeholder="seu@email.com"
                    :invalid="v$.loginForm.email.$error"
                    fluid
                    @blur="v$.loginForm.email.$touch()"
                  />
                  <small v-if="v$.loginForm.email.$error" class="text-red-500 text-xs">
                    {{ v$.loginForm.email.$errors[0]?.$message }}
                  </small>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                  <Password
                    v-model="loginForm.password"
                    placeholder="••••••"
                    :feedback="false"
                    toggle-mask
                    :invalid="v$.loginForm.password.$error"
                    fluid
                    @blur="v$.loginForm.password.$touch()"
                  />
                  <small v-if="v$.loginForm.password.$error" class="text-red-500 text-xs">
                    {{ v$.loginForm.password.$errors[0]?.$message }}
                  </small>
                </div>

                <Button
                  type="submit"
                  label="Entrar"
                  icon="pi pi-sign-in"
                  class="w-full mt-2"
                  :loading="authStore.isLoading"
                />

                <p class="text-center text-xs text-gray-400 mt-1">
                  Dica: use <strong>admin@...</strong> para entrar como Admin
                </p>
              </form>
            </TabPanel>

            <!-- ── REGISTRO ── -->
            <TabPanel value="1">
              <form class="flex flex-col gap-4" @submit.prevent="submitRegister">

                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
                  <InputText
                    v-model="registerForm.name"
                    placeholder="Seu nome"
                    :invalid="v$.registerForm.name.$error"
                    fluid
                    @blur="v$.registerForm.name.$touch()"
                  />
                  <small v-if="v$.registerForm.name.$error" class="text-red-500 text-xs">
                    {{ v$.registerForm.name.$errors[0]?.$message }}
                  </small>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                  <InputText
                    v-model="registerForm.email"
                    placeholder="seu@email.com"
                    :invalid="v$.registerForm.email.$error"
                    fluid
                    @blur="v$.registerForm.email.$touch()"
                  />
                  <small v-if="v$.registerForm.email.$error" class="text-red-500 text-xs">
                    {{ v$.registerForm.email.$errors[0]?.$message }}
                  </small>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                  <Password
                    v-model="registerForm.password"
                    placeholder="Mínimo 6 caracteres"
                    :feedback="false"
                    toggle-mask
                    :invalid="v$.registerForm.password.$error"
                    fluid
                    @blur="v$.registerForm.password.$touch()"
                  />
                  <small v-if="v$.registerForm.password.$error" class="text-red-500 text-xs">
                    {{ v$.registerForm.password.$errors[0]?.$message }}
                  </small>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Senha</label>
                  <Password
                    v-model="registerForm.confirmPassword"
                    placeholder="Repita a senha"
                    :feedback="false"
                    toggle-mask
                    :invalid="v$.registerForm.confirmPassword.$error"
                    fluid
                    @blur="v$.registerForm.confirmPassword.$touch()"
                  />
                  <small v-if="v$.registerForm.confirmPassword.$error" class="text-red-500 text-xs">
                    {{ v$.registerForm.confirmPassword.$errors[0]?.$message }}
                  </small>
                </div>

                <Button
                  type="submit"
                  label="Criar Conta"
                  icon="pi pi-user-plus"
                  class="w-full mt-2"
                  :loading="authStore.isLoading"
                />
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import Card       from 'primevue/card';
import InputText  from 'primevue/inputtext';
import Password   from 'primevue/password';
import Button     from 'primevue/button';
import Tabs       from 'primevue/tabs';
import TabList    from 'primevue/tablist';
import Tab        from 'primevue/tab';
import TabPanels  from 'primevue/tabpanels';
import TabPanel   from 'primevue/tabpanel';
import { useAuthStore } from '../../stores/auth';

const ptMessages = {
  required: helpers.withMessage('Campo obrigatório', required),
  email:    helpers.withMessage('E-mail inválido', email),
};

export default defineComponent({
  name: 'AuthView',
  components: { Card, InputText, Password, Button, Tabs, TabList, Tab, TabPanels, TabPanel },

  setup() {
    return {
      v$: useVuelidate(),
      authStore: useAuthStore(),
    };
  },

  data() {
    return {
      activeTab: (this.$route.query.tab === 'register' ? '1' : '0') as string,
      loginForm:    { email: '', password: '' },
      registerForm: { name: '', email: '', password: '', confirmPassword: '' },
    };
  },

  validations() {
    return {
      loginForm: {
        email:    { required: ptMessages.required, email: ptMessages.email },
        password: { required: ptMessages.required },
      },
      registerForm: {
        name:  { required: ptMessages.required },
        email: { required: ptMessages.required, email: ptMessages.email },
        password: {
          required: ptMessages.required,
          minLength: helpers.withMessage('Mínimo de 6 caracteres', minLength(6)),
        },
        confirmPassword: {
          required: ptMessages.required,
          sameAs: helpers.withMessage(
            'As senhas não coincidem',
            (value: string) => value === this.registerForm.password,
          ),
        },
      },
    };
  },

  methods: {
    async submitLogin(): Promise<void> {
      const valid = await this.v$.loginForm.$validate();
      if (!valid) return;
      try {
        await this.authStore.login(this.loginForm.email, this.loginForm.password);
        this.$toast.add({ severity: 'success', summary: 'Bem-vindo!', detail: `Olá, ${this.authStore.user?.username}!`, life: 3000 });
        const redirect = (this.$route.query.redirect as string) || '/';
        this.$router.push(redirect);
      } catch {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Credenciais inválidas.', life: 4000 });
      }
    },

    async submitRegister(): Promise<void> {
      const valid = await this.v$.registerForm.$validate();
      if (!valid) return;
      try {
        await this.authStore.register(
          this.registerForm.name,
          this.registerForm.email,
          this.registerForm.password,
        );
        this.$toast.add({ severity: 'success', summary: 'Conta criada!', detail: `Bem-vindo, ${this.registerForm.name}!`, life: 3000 });
        this.$router.push('/');
      } catch {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível criar a conta.', life: 4000 });
      }
    },
  },
});
</script>
