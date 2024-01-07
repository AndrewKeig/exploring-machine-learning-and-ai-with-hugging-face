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

await textToSpeech('I have a dream')
