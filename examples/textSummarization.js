import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const textSummarization = async (text) => {
  const hf = new HfInference(key)
  return hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: text,
    parameters: {
      max_length: 200,
      min_length: 100,
      do_sample: true
    }
  })
}

const summary = await textSummarization('A Love Supreme is an album by American jazz saxophonist John Coltrane. He recorded it in one session on December 9, 1964, at Van Gelder Studio in Englewood Cliffs, New Jersey, leading a quartet featuring pianist McCoy Tyner, bassist Jimmy Garrison and drummer Elvin Jones.  A Love Supreme was released by Impulse! Records in January 1965. It ranks among Coltranes best-selling albums and is widely considered as his masterpiece.')
console.log(summary)
