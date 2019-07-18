<template>
  <div>
    <div id="main">
      <h1>Toxicity Notifier</h1>
      <div class="description">Detects toxic Facebook posts.</div>
      <div id="table-wrapper"></div>
      <div>
        <!-- <button><img :src="image"><div class="logo"></div> Detect toxic posts</button> -->
        <button><img :src="image" /> Detect toxic posts</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as toxicity from '@tensorflow-models/toxicity';
import image from '../../../assets/img/poison.png';

export default {
  data() {
    return {
      image: image,
    };
  },
  created() {
    // // The minimum prediction confidence.
    // const threshold = 0.9;

    // // Load the model. Users optionally pass in a threshold and an array of
    // // labels to include.
    // toxicity.load(threshold).then(model => {
    //   const sentences = ['Fuck your whole shit!'];

    //   model.classify(sentences).then(predictions => {
    //     // `predictions` is an array of objects, one for each prediction head,
    //     // that contains the raw probabilities for each input along with the
    //     // final prediction in `match` (either `true` or `false`).
    //     // If neither prediction exceeds the threshold, `match` is `null`.

    //     for (let index = 0; index < predictions.length; index++) {
    //       let label = predictions[index].label;
    //       let results = predictions[index].results;

    //       for (let result = 0; result < results.length; result++) {
    //         let match = results[result].match;
    //         if (match == true) {
    //           console.log('The phrase: ' + sentences[0] + ' is ' + label);
    //         } else {
    //           console.log('The phrase: ' + sentences[0] + ' might not be ' + label);
    //         }
    //       }
    //     }
    //   });
    // });
    this.test();
  },
  methods: {
    test() {
      console.log('testiiiiiiiiiiiiiiiiing');
    },
  },
};
</script>

<style lang="scss" scoped>
#main {
  width: 200px;
}

button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

button .logo {
  background-image: url('../../../assets/img/poison.png');
  width: 100px;
  height: 100px;
}

button:hover {
  cursor: pointer;
}

p {
  font-size: 20px;
}
</style>
