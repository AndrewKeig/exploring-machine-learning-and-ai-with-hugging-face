## Exploring Machine Learning and AI with Hugging Face

Hugging Face develops tools for building applications using machine learning. The Hugging Face Hub is a platform with around half a million open source models, finding the appropriate model is simplified with a documentation project called `Tasks` which list available models.

https://huggingface.co

Here is an example for `text-to-speech` which provides an exmaple of the problem space, the various models available to use, and how to use the `Inference API`  with examples in `python` and `javascript`

https://huggingface.co/tasks/text-to-speech

Hugging Face provides a unified API for accessing and using pre-trained language models.

### Lets start

The following git repository contains various examples in javascript.

https://github.com/AndrewKeig/exploring-machine-learning-and-ai-with-hugging-face

Lets install the Hugging Face Inference API.

```
npm install @huggingface/inference
```

The Hugging Face API should work without an API key, but will be rate limited, so I suggest you register and create an account.  This config file contains the key.

`examples/config.js`

```
export const key = 'YOUR_KEY'
```

The following model translates text into another language

`node examples/translate.js`

```
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const translate = async (model, text) => {
  const hf = new HfInference(key)
  return await hf.translation({
    model: model,
    inputs: text,
  })
}

// Helsinki-NLP/opus-mt-en-es spanish
// Helsinki-NLP/opus-mt-en-de german
// Helsinki-NLP/opus-mt-en-fr french

const response = await translate("Helsinki-NLP/opus-mt-en-fr", 'hello')
console.log(response)
```

The following model translates text into speech and saves to an audio wav

`node examples/textToSpeech.js`

```
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
  fs.writeFileSync('audio.wav', buffer1)
}

await textToSpeech('I have a dream')

```

The following model allows us to summarise text to a min/max length

`node examples/textSummarization.js`

```
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const textSummarization = async (text) => {
  const hf = new HfInference(key)
  return hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: text,
    parameters: {
      max_length: 200,
      min_length: 100,
      do_sample: true
    }
  })
}

const summary = await textSummarization('A Love Supreme is an album by American jazz saxophonist John Coltrane. He recorded it in one session on December 9, 1964, at Van Gelder Studio in Englewood Cliffs, New Jersey, leading a quartet featuring pianist McCoy Tyner, bassist Jimmy Garrison and drummer Elvin Jones.  A Love Supreme was released by Impulse! Records in January 1965. It ranks among Coltranes best-selling albums and is widely considered as his masterpiece.')

console.log(summary)
```

The following model tokenises a text string into tokens

`node examples/classify.js`

```
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

const classify = async (text) => {
  const hf = new HfInference(key)
  return hf.tokenClassification({
    model: 'dbmdz/bert-large-cased-finetuned-conll03-english',
    inputs: text
  })
}

const calssification = await classify('A Love Supreme is an album by American jazz saxophonist John Coltrane')

console.log(calssification)

```

The following model generates a text response to a prompt

`node examples/textGeneration.js`

```
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

```

The following model translates text into an image in png format

`node examples/generateImage.js`

```
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
  fs.writeFileSync('image.png', buffer)
}

await generateImage('An old black and white photo of an alien', 'pixelated blurry')
```

The following model generates text for an image

`node examples/generateTextForImage.js`

```
import fs from 'fs'
import { HfInference } from '@huggingface/inference'
import { key } from './config.js'

// The following model gets m
const generateTextForImage = async (path) => {
  const hf = new HfInference(key)
  return hf.imageToText({
    data: fs.readFileSync(path),
    model: 'nlpconnect/vit-gpt2-image-captioning'
  })
}

const text = await generateTextForImage('./image.png')
console.log(text)


```
The following model allows us to infer a text caption for a url

`node examples/inferCaptionFromImage.js`

```
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

```
