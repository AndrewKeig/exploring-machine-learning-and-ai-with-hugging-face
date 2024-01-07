import fs from 'fs'
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const textToSpeech = async (text) => {
  const hf = new HfInference(key)
  const blob1 = await hf.textToSpeech({
    model: 'espnet/kan-bayashi_ljspeech_vits',
    inputs: text
  })

  const buffer1 = Buffer.from( await blob1.arrayBuffer() );
  return fs.writeFileSync('audio.wav', buffer1)
}

await textToSpeech('The development of full artificial intelligence could spell the end of the human race….It would take off on its own, and re-design itself at an ever increasing rate. Humans, who are limited by slow biological evolution, couldn’t compete, and would be superseded. Stephen Hawking')
