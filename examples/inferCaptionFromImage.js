import fs from 'fs'
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const inferCaptionFromImage = async (path) => {
  const hf = new HfInference(key)
  return hf.imageToText({
    data: fs.readFileSync(path),
    model: 'Salesforce/blip-image-captioning-base'
  })
}

const text = await inferCaptionFromImage('./image.png')
console.log(text)
