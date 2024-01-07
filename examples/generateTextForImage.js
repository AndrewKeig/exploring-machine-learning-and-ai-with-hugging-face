import fs from 'fs'
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const generateTextForImage = async (path) => {
  const hf = new HfInference(key)
  return hf.imageToText({
    data: fs.readFileSync(path),
    model: 'nlpconnect/vit-gpt2-image-captioning'
  })
}

const text = await generateTextForImage('./image.png')
console.log(text)
