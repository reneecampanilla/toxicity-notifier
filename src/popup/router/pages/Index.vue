<template>
  <div>
    <div id="main">
      <h1>Toxicity Notifier</h1>
      <div class="description">Click the button below!</div>
      <div id="table-wrapper"></div>
      <div>
        <button v-on:click="startScreening" class="rainbow rainbow-5"><div class="logo"></div></button>
      </div>
      <div>
        <p class="note">Only for Facebook Newsfeed</p>
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
      image: require(image),
    };
  },
  created() {},
  methods: {
    startScreening() {
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
    },
  },
};
</script>

<style lang="scss" scoped>
#main {
  width: 200px;
  height: 175px;
  text-align: center;
}

.description {
  margin: 10px 0;
}

button {
  width: 175px;
  margin: auto;
  display: block;
  border-radius: 4px;
}

button .logo {
  background-image: url(/poison.png);
  background-size: contain;
  width: 50px;
  height: 50px;
  margin: auto;
}

button:hover {
  cursor: pointer;
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px 8px #888888;
}

p {
  font-size: 20px;
}

.rainbow {
  background-color: #343a40;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 8px 16px;
}

.rainbow-5:hover {
  background-image: linear-gradient(
    to right,
    #e7484f,
    #e7484f 16.65%,
    #f68b1d 16.65%,
    #f68b1d 33.3%,
    #fced00 33.3%,
    #fced00 49.95%,
    #009e4f 49.95%,
    #009e4f 66.6%,
    #00aac3 66.6%,
    #00aac3 83.25%,
    #732982 83.25%,
    #732982 100%,
    #e7484f 100%
  );
  animation: slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}

.note {
  color: red;
  font-size: 10px;
}
</style>
