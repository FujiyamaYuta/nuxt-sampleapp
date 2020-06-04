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
import LoginModal from '~/components/LoginModal'

export default {
  name: 'Gijiroku',

  components: {
    ArticleCompornent,
    LoginModal
  },
  data() {
    return {
      gijirokuId: this.$route.params.id,
      dataArray: [
        {
          name: '藤原 祐太',
          uid: '12345',
          description:
            'MARRON側の処理状況は順調です。なお、hogehoge3:30に、ヘラクレスへIFしているCXSENS送信処理は、通常よりおよそ10分程度遅延する見込みです。（3:40頃に配信予定）',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: '神谷',
          uid: '12345',
          description:
            '今までカテゴリはひとつしか設定できなかったのが複数設定できるようになります。※ あくまでもリニューアル向けのものになるので、複数設定しても現行ステージングサイトに反映されません。',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: '森',
          uid: '12345',
          description:
            'hogehogeニュースメールの受信トラブルについて問い合わせたところ下記の返答が来ました。早急な対応ありがとうございます。',
          time: '23:12:24',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: '藤原',
          uid: '12345',
          description:
            '状況から考えてまた私の経験上からも貴社起因によるものと考えます。なお、貴社からの回答メールではこの現象は起きないことからテキスト形式のメールでは現象は発生せず HTML形式のメールのみ発生するものと考えます。こちらも困っているのでなにとぞ再度考察(トラブルシューティング)よろしくお願いします。',
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
