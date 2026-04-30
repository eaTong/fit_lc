import client from './client';

export const uploadApi = {
  /**
   * Upload image for chat
   * @param file Image file to upload
   * @returns URL of uploaded image
   */
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await client.post<{ url: string }>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.url;
  },
};
