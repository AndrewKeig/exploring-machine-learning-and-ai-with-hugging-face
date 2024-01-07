import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const translate = async (model, text) => {
  const hf = new HfInference(key)
  return await hf.translation({ model: model, inputs: text })
}

const response = await translate("Helsinki-NLP/opus-mt-en-fr", 'hello')

console.log(response)
