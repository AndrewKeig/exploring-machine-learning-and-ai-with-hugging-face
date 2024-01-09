import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const classify = async (text) => {
  const hf = new HfInference(key)
  return hf.tokenClassification({
    model: 'dbmdz/bert-large-cased-finetuned-conll03-english',
    inputs: text
  })
}

const classification = await classify('A Love Supreme is an album by American jazz saxophonist John Coltrane')

console.log(classification)
