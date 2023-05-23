<template>
    <div>
        <h1>コンポーネントの内容</h1>
        <p>{{ count }}</p>
        <button @click="increment" class="button is-primary">カウントアップ</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const message = ref('初期メッセージ');
const count = ref(0);

const increment = () => {
    count.value++;
};

onMounted(() => {
    // マウント後の処理をここに記述
    console.log('Component mounted!');
});
</script>
