import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const classify = async (text) => {
  const hf = new HfInference(key)
  return hf.tokenClassification({
    model: 'dbmdz/bert-large-cased-finetuned-conll03-english',
    inputs: text
  })
}

const calssification = await classify('My name is Drew but you can call me Andrew')

console.log(calssification)
