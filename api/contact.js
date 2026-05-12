const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'Info@MutazAIStudio.com';
const DEFAULT_FROM_EMAIL = 'Mutaz AI Studio <noreply@mutazaistudio.com>';
const SITE_URL = 'https://mutazaistudio.com';

const COPY = {
    en: {
        dir: 'ltr',
        subject: 'New website contact request',
        heading: 'New website contact request',
        intro: 'A visitor submitted the contact form on mutazaistudio.com.',
        name: 'Full name',
        email: 'Email',
        phone: 'Phone number',
        message: 'Message',
        language: 'Form language',
        languageValue: 'English',
        submittedAt: 'Submitted at',
        source: 'Source',
        notProvided: 'Not provided'
    },
    ar: {
        dir: 'rtl',
        subject: '\u0637\u0644\u0628 \u062a\u0648\u0627\u0635\u0644 \u062c\u062f\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639',
        heading: '\u0637\u0644\u0628 \u062a\u0648\u0627\u0635\u0644 \u062c\u062f\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639',
        intro: '\u0642\u0627\u0645 \u0632\u0627\u0626\u0631 \u0628\u062a\u0639\u0628\u0626\u0629 \u0646\u0645\u0648\u0630\u062c \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0641\u064a mutazaistudio.com.',
        name: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
        email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        phone: '\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644',
        message: '\u0627\u0644\u0631\u0633\u0627\u0644\u0629',
        language: '\u0644\u063a\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062c',
        languageValue: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
        submittedAt: '\u0648\u0642\u062a \u0627\u0644\u0625\u0631\u0633\u0627\u0644',
        source: '\u0627\u0644\u0645\u0635\u062f\u0631',
        notProvided: '\u063a\u064a\u0631 \u0645\u0630\u0643\u0648\u0631'
    }
};

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('Missing RESEND_API_KEY environment variable.');
        return res.status(500).json({ error: 'Email service is not configured' });
    }

    const body = parseBody(req.body);
    const language = body.language === 'ar' ? 'ar' : 'en';
    const copy = COPY[language];
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 80);
    const message = clean(body.message, 5000);

    if (!name || !email || !message || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid form data' });
    }

    const submittedAt = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Riyadh'
    }).format(new Date());

    const emailHtml = renderEmailHtml({
        copy,
        name,
        email,
        phone: phone || copy.notProvided,
        message,
        languageValue: copy.languageValue,
        submittedAt
    });

    const emailText = renderEmailText({
        copy,
        name,
        email,
        phone: phone || copy.notProvided,
        message,
        languageValue: copy.languageValue,
        submittedAt
    });

    const payload = {
        from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL],
        subject: `${copy.subject}: ${name}`,
        html: emailHtml,
        text: emailText,
        reply_to: email
    };

    try {
        const response = await fetch(RESEND_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'User-Agent': 'mutazaistudio-contact-form/1.0'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Resend request failed:', response.status, errorText);
            return res.status(502).json({ error: 'Email could not be sent' });
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Contact form send failed:', error);
        return res.status(502).json({ error: 'Email could not be sent' });
    }
};

function parseBody(body) {
    if (!body) return {};
    if (typeof body === 'object') return body;

    try {
        return JSON.parse(body);
    } catch (error) {
        return {};
    }
}

function clean(value, maxLength) {
    return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderEmailHtml(data) {
    const textAlign = data.copy.dir === 'rtl' ? 'right' : 'left';
    const rows = [
        [data.copy.name, data.name],
        [data.copy.email, data.email],
        [data.copy.phone, data.phone],
        [data.copy.message, data.message],
        [data.copy.language, data.languageValue],
        [data.copy.submittedAt, data.submittedAt],
        [data.copy.source, SITE_URL]
    ];

    const rowHtml = rows.map(([label, value]) => `
        <tr>
            <th style="width: 34%; padding: 12px; border: 1px solid #e5e7eb; color: #4b5563; font-weight: 700; text-align: ${textAlign}; vertical-align: top;">${escapeHtml(label)}</th>
            <td style="padding: 12px; border: 1px solid #e5e7eb; color: #111827; white-space: pre-wrap; text-align: ${textAlign}; vertical-align: top;">${escapeHtml(value)}</td>
        </tr>
    `).join('');

    return `<!doctype html>
<html lang="${data.copy.dir === 'rtl' ? 'ar' : 'en'}" dir="${data.copy.dir}">
<body style="margin: 0; background: #f9fafb; font-family: Arial, sans-serif; direction: ${data.copy.dir};">
    <div style="max-width: 680px; margin: 0 auto; padding: 28px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
            <h1 style="margin: 0 0 8px; color: #111827; font-size: 22px; line-height: 1.35; text-align: ${textAlign};">${escapeHtml(data.copy.heading)}</h1>
            <p style="margin: 0 0 22px; color: #4b5563; font-size: 15px; line-height: 1.7; text-align: ${textAlign};">${escapeHtml(data.copy.intro)}</p>
            <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 15px; line-height: 1.6;">
                ${rowHtml}
            </table>
        </div>
    </div>
</body>
</html>`;
}

function renderEmailText(data) {
    return [
        data.copy.heading,
        data.copy.intro,
        '',
        `${data.copy.name}: ${data.name}`,
        `${data.copy.email}: ${data.email}`,
        `${data.copy.phone}: ${data.phone}`,
        `${data.copy.message}: ${data.message}`,
        `${data.copy.language}: ${data.languageValue}`,
        `${data.copy.submittedAt}: ${data.submittedAt}`,
        `${data.copy.source}: ${SITE_URL}`
    ].join('\n');
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
