import Constants from 'expo-constants';
import axios from 'axios';

const OPENAI_API_KEY = Constants.manifest.extra.openai.apiKey;
const OPENAI_ORG_ID = Constants.manifest.extra.openai.orgId;
const OPENAI_MODAL = 'gpt-3.5-turbo';
// eslint-disable-next-line no-unused-vars
const MAX_TOKENS = 1000;

export const sendMessageToOpenAI = async (text, context, focusMsg, focus, interestsMsg, interests) => {
  const interestsRef = interests? interestsMsg+interests.join(', '): '';
  const focusRef = focus? focusMsg+focus.join(', '): '';

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions',
      {
        messages: [
          { role: 'system', content: `${context}${interestsRef}${focusRef}` },
          { role: 'user', content: text },
        ],
        model: OPENAI_MODAL,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Organization': OPENAI_ORG_ID
        },
      },
    );

    console.log('cluey', response.data.usage.total_tokens);
    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(err, 'api call error');
  }
};


