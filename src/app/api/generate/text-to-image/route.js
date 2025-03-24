import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(request) {
  try {
    // Parse the request body
    const { 
      prompt, 
      negativePrompt, 
      style, 
      aspectRatio, 
      guidance, 
      color 
    } = await request.json();

    // Prepare the prompt with style and color if provided
    let enhancedPrompt = prompt;
    if (style && style !== 'none') {
      enhancedPrompt += `, ${style} style`;
    }
    if (color) {
      enhancedPrompt += `, ${color} color scheme`;
    }

    // Prepare the payload for Stability API
    const payload = {
      prompt: enhancedPrompt,
      negative_prompt: negativePrompt || '',
      cfg_scale: guidance || 7,
      aspect_ratio: aspectRatio || '1:1',
      output_format: 'jpeg'
    };

    // Make the request to Stability AI
    const response = await axios.postForm(
      'https://api.stability.ai/v2beta/stable-image/generate/sd3',
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${process.env.STABLE_DIFFUSION_API_KEY}`,
          Accept: 'image/*'
        },
      }
    );

    // Handle the response
    if (response.status === 200) {
      // Return the image as a blob
      return new NextResponse(response.data, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': 'inline'
        }
      });
    } else {
      // Handle error
      const errorText = Buffer.from(response.data).toString();
      return NextResponse.json(
        { error: `API Error: ${errorText}` },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
}
