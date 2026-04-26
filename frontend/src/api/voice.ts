interface TranscribeResponse {
  success: boolean;
  text?: string;
  error?: string;
}

export const voiceApi = {
  async transcribe(audioBlob: Blob): Promise<TranscribeResponse> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');

    const token = localStorage.getItem('token');

    const response = await fetch('/api/voice/transcribe', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });

    const data = await response.json();
    return data;
  },
};
