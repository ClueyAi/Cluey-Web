import React, {useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

const OPENAI_API_KEY = Constants.manifest.extra.openai.apiKey;
const OPENAI_ORG_ID = Constants.manifest.extra.openai.orgId;
const OPENAI_MODAL = 'gpt-3.5-turbo';
const MAX_TOKENS = 1000;

export const sendMessageToOpenAI = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [
          {
            role: 'user',
            content: text,
          },
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

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(err, 'api call error');
  }
/*
  try {
    let responseMessage = '';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Organization': OPENAI_ORG_ID
      },
      body: JSON.stringify({
        model: OPENAI_MODAL,
        prompt: text,
        max_tokens: MAX_TOKENS,
      })
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
    const data = await response.json();
    responseMessage = await data.choices[0].text.trim();
    
    return responseMessage;
  } catch (error) {
    console.error(error);
  }
  */
};
