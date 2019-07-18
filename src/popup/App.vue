<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import * as toxicity from '@tensorflow-models/toxicity';

export default {
  data() {
    return {};
  },
  created: () => {
    // The minimum prediction confidence.
    const threshold = 0.9;

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    toxicity.load(threshold).then(model => {
      const sentences = ['He looks like a caveman, only far less intelligent'];

      model.classify(sentences).then(predictions => {
        // `predictions` is an array of objects, one for each prediction head,
        // that contains the raw probabilities for each input along with the
        // final prediction in `match` (either `true` or `false`).
        // If neither prediction exceeds the threshold, `match` is `null`.

        for (let index = 0; index < predictions.length; index++) {
          let label = predictions[index].label;
          let results = predictions[index].results;

          for (let result = 0; result < results.length; result++) {
            let match = results[result].match;
            if (match == true) {
              console.error('The phrase: ' + sentences[0] + ' is ' + label);
            } else {
              console.warn('The phrase: ' + sentences[0] + ' might not be ' + label);
            }
          }
        }
      });
    });
  },
};
</script>
