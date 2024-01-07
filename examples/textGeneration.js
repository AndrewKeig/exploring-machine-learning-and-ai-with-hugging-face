import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const textGeneration = async (text) => {
  const hf = new HfInference(key)
  return hf.textGeneration({
    model: 'gpt2',
    inputs: text
  })
}

const generated = await textGeneration('What is the meaning of life')
console.log(generated)
