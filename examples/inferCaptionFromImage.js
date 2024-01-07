import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const inferCaptionFromImage = async (url) => {
  const hf = new HfInference(key)
  const model = 'Salesforce/blip-image-captioning-base'
  const response = await fetch(url)
  const data = await response.blob()
  return await hf.imageToText({ data, model })
}

const caption = await inferCaptionFromImage('https://i.cbc.ca/1.4209267.1500324221!/fileImage/httpImage/coltrane-1.png')
console.log(caption)
