import fs from 'fs'
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const generateImage = async (text, negative) => {
  const hf = new HfInference(key)
  const blob = await hf.textToImage({
    inputs: text,
    model: 'runwayml/stable-diffusion-v1-5',
    parameters: {
      negative_prompt: negative,
    }
  })
  const buffer = Buffer.from( await blob.arrayBuffer() );
  return fs.writeFileSync('image.png', buffer)
}

await generateImage('An old black and white photo of an alien', 'pixelated blurry')
