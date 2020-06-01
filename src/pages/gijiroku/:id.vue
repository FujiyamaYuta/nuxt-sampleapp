<template>
  <section class="section">
    <div class="tabs-page is-show js-tabs-page js-tabs-page_design">
      <Article-compornent
        v-for="(post, i) in dataArray"
        :key="i"
        :name="post.name"
        :uid="post.uid"
        :description="post.description"
        :time="post.time"
        :icon="post.icon"
      />
    </div>
  </section>
</template>
<script>
import ArticleCompornent from '~/components/ArticleCompornent'

export default {
  name: 'Gijiroku',

  components: {
    ArticleCompornent
  },
  data() {
    return {
      gijirokuId: this.$route.params.id,
      dataArray: [
        {
          name: '藤原 祐太',
          uid: '12345',
          description: 'hogehogehugahuga',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: '神谷',
          uid: '12345',
          description: 'hogehogehugahugapiyppiyo',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: '森',
          uid: '12345',
          description: 'hugahugahugahuga',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: '藤原',
          uid: '12345',
          description:
            'asitaasita HTML形式のメールのみ発生するものと考えます。こちらも困っているのでなにとぞ再度考察(トラブルシューティング)よろしくお願いします。',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        }
      ]
    }
  },
  mounted() {
    console.log(this.gijirokuId)
  }
}
</script>
