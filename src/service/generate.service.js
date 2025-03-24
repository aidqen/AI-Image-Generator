/**
 * Service for handling image generation API requests
 */
export const generateService = {
  /**
   * Generate an image using Stable Diffusion 3
   * @param {Object} params - Generation parameters
   * @param {string} params.prompt - The main prompt for image generation
   * @param {string} params.negativePrompt - Things to avoid in the generated image
   * @param {string} params.style - The selected style for the image
   * @param {string} params.aspectRatio - The aspect ratio for the image (e.g., '1:1', '16:9')
   * @param {number} params.guidance - The guidance scale (1-10)
   * @param {string} params.color - The selected color scheme
   * @returns {Promise<Blob>} - A promise that resolves to the image blob
   */
  generateImage: async ({ prompt, negativePrompt, style, aspectRatio, guidance, color }) => {
    try {
      // Validate required parameters
      if (!prompt) {
        throw new Error('Prompt is required');
      }

      // Make the API request
      const response = await fetch('/api/generate/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          negativePrompt,
          style,
          aspectRatio,
          guidance,
          color,
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        // Try to parse error message
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Failed to generate image: ${response.status} ${response.statusText}`
        );
      }

      // Convert the response to a blob
      const imageBlob = await response.blob();
      
      // Create a URL for the blob
      return URL.createObjectURL(imageBlob);
    } catch (error) {
      console.error('Error in generateImage service:', error);
      throw error;
    }
  }
};