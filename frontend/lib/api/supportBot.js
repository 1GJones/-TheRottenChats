const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api';

async function sendToSupportBot(payload) {
    const res = await fetch(`${BACKEND_BASE_URL}/support-bot/message`,{
        method :'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('support bot has failed'); 
    }
    return res.json();
}

export {sendToSupportBot};