import type { LegalDoc } from '@/data/types';

/**
 * 英文站政策与下载页（基准语言）。
 *
 * 写作口径：读者是支付审核员与买家，不写营销修辞。
 * 与产品对外描述必须逐条对得上：桌面助理 / 自备模型 / 本地处理 / 无成人内容 / 非真人形象。
 */
export const legalEn = {
  privacy: {
    heading: 'Privacy Policy',
    lead: 'What stays on your computer, what our servers see, and what we never do with your data.',
    updated: 'Last updated: 28 November 2026',
    sections: [
      {
        heading: 'Scope',
        paragraphs: [
          'This policy covers the INP desktop application for Windows and the website at inpagent.com. It does not cover services you choose to connect yourself, such as a third-party model provider or a local model server.',
          'INP ("we", "us") operates inpagent.com. Subscriptions are sold and processed by Paddle.com Market Ltd ("Paddle") as Merchant of Record. Paddle is the seller of record for your order and handles payment data under its own privacy policy.',
        ],
      },
      {
        heading: 'What stays on your device',
        paragraphs: [
          'Everything you say to the assistant, and everything it says back, is processed on your computer.',
        ],
        bullets: [
          'Conversations are session-based. History is not kept across restarts, and closing the app ends the session.',
          'Task lists, reminders, preferences, avatar settings, and voice reference audio live in the app data folder on your machine.',
          'Model configuration, including your own API key, is stored locally. We never receive your key.',
          'Clearing the app data or deleting the app folder removes these records from your device. We cannot restore them, because we hold no copy.',
        ],
      },
      {
        heading: 'What our servers handle',
        paragraphs: [
          'We run a deliberately small set of services for activation and, where a build offers it, for model relay.',
        ],
        bullets: [
          'Activation and subscription checks: email address, the order ID issued by Paddle, subscription status, app version, and a hashed device identifier. The hash is used to enforce device limits and rate limits, and cannot be reversed by us into a device fingerprint.',
          'Trial quota: a counter tied to the same hashed device identifier. No message content is involved.',
          'Optional model relay: if your build offers the built-in relay and you choose it instead of configuring your own key, your prompt passes through our relay to the model provider and the reply comes back to you. The relay does not store prompt or reply content; it keeps request counts and error codes for capacity planning. If you use your own key or a local model, no prompt data passes through us at all.',
          'Diagnostic bundles: only when you export one and deliberately send it. They contain logs, app version, and system information. We ask you to review the bundle before sending, and to remove anything you consider private.',
        ],
      },
      {
        heading: 'What we never do',
        bullets: [
          'We do not receive, store, or read your conversations.',
          'We do not use your conversations or voice recordings to train models, ours or anyone else\'s.',
          'We do not sell personal data, and we do not share it for advertising.',
          'We do not run advertising or cross-site tracking scripts on inpagent.com.',
        ],
      },
      {
        heading: 'Voice and avatar data',
        paragraphs: [
          'If you import a reference audio clip for voice synthesis, it is processed and stored locally on your machine.',
          'You must own the rights to every voice you import. Importing another person\'s voice without documented permission is a breach of our terms and grounds for suspension.',
          'Avatars are original fictional characters shipped with the app. No photograph or recording of a real person is used to create them.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'INP is intended for users aged 18 and over, and we do not knowingly collect data from anyone under 18. If you believe a minor has used the product, write to us and we will close the associated records.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Depending on where you live, you may have the right to access, correct, delete, or port your personal data, and to object to certain processing. To exercise any of these rights, write to support@inpagent.com.',
          'The legal bases for the limited processing described above are performance of contract (activation, billing, support) and legitimate interest (fraud prevention, capacity planning).',
          'Payment records are held by Paddle as seller. Requests about card data, invoices, or payment history go to Paddle buyer support.',
          'We delete account and activation records within 30 days of a verified request. Records we must keep for tax and accounting purposes are held for the period required by law.',
        ],
      },
      {
        heading: 'Where data is processed',
        paragraphs: [
          'Our servers and those of Paddle may be located outside your country. Where transfer rules require it, we rely on standard contractual clauses or an equivalent mechanism offered by the provider.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If a change materially affects how your data is handled, we will update the date at the top of this page and, for account holders, notify you by email before it takes effect.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Questions about this policy: support@inpagent.com'],
      },
    ],
    zhFallbackFields: [],
  },

  terms: {
    heading: 'Terms of Service',
    lead: 'The agreement between you and INP for using the desktop application and any subscription you buy.',
    updated: 'Last updated: 28 November 2026',
    sections: [
      {
        heading: 'Agreement',
        paragraphs: [
          'By installing or using INP, you agree to these terms. If you do not agree, do not install or use the app.',
          'These terms are between you and INP, the operator of inpagent.com. Your payment is processed by Paddle.com Market Ltd as Merchant of Record, which means Paddle is the seller of record for your order and its buyer terms also apply to the transaction.',
        ],
      },
      {
        heading: 'What you are buying',
        paragraphs: [
          'INP is a Windows desktop application with a subscription. The subscription grants you a licence to use the app and the services attached to it: activation, updates within your plan, and support.',
          'The app does not include a language model. You connect your own, either a cloud key from a provider you choose or a local model running on your own hardware. Your use of a third-party model is governed by that provider\'s terms, and its output is not produced or controlled by us.',
        ],
      },
      {
        heading: 'Trial and subscription',
        paragraphs: [
          'A trial quota may be offered so you can evaluate the app before paying. The quota is tied to a device and is not a payment.',
          'Subscriptions renew automatically at the interval shown at checkout, at the price shown at checkout, until you cancel. Applicable taxes are shown before you confirm the order.',
        ],
      },
      {
        heading: 'Cancellation and renewal',
        paragraphs: [
          'You can cancel at any time from the billing portal linked in your order confirmation email.',
          'Cancellation takes effect immediately and stops all further charges. Amounts already paid for the current period are not refunded. Access continues until the end of the period you have paid for, then stops.',
        ],
      },
      {
        heading: 'Refunds',
        paragraphs: [
          'Refunds follow the Refund Policy page. In short: a first purchase can be refunded in full within 7 days, no explanation required.',
        ],
      },
      {
        heading: 'Licence scope',
        paragraphs: [
          'We grant you a personal, non-exclusive, non-transferable licence to use the app for your own purposes.',
        ],
        bullets: [
          'One subscription covers up to three devices that you own or control.',
          'You may not resell, sublicense, rent, or share access with others.',
          'You may not reverse engineer, decompile, or attempt to derive the source code, or circumvent the protection applied to the application assets.',
          'You may not remove or alter ownership notices.',
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: [
          'You are responsible for how you use the app and for the prompts you submit.',
        ],
        bullets: [
          'No use for unlawful purposes, harassment, fraud, malware, or unauthorized access to systems.',
          'No sexual content involving minors. This prohibition is absolute.',
          'No pornographic or sexually explicit content.',
          'No impersonation of real people, and no voice cloning of a third party without documented permission.',
          'No use to surveil, profile, or impersonate another person without their consent.',
          'No reliance on the assistant for medical, legal, financial, or emergency advice. It is not a professional and must not be treated as one.',
        ],
      },
      {
        heading: 'Content moderation',
        paragraphs: [
          'Prompts that request prohibited material are blocked before they reach the model, and replies are filtered before they are shown or spoken. Reports can be sent to support@inpagent.com. We may suspend an account that repeatedly attempts prohibited use.',
          'Filtering reduces risk; it does not guarantee that every output is appropriate. You remain responsible for what you do with the output.',
        ],
      },
      {
        heading: 'Availability',
        paragraphs: [
          'The app is provided "as is". Preview and beta builds may change, break, or be withdrawn. We do not guarantee uninterrupted availability of activation or relay services.',
        ],
      },
      {
        heading: 'Termination',
        paragraphs: [
          'We may suspend or terminate your licence if you materially breach these terms, attempt to bypass technical protection, or file a fraudulent chargeback. On termination your right to use the app ends. Provisions that by their nature survive termination, such as liability and governing law, remain in force.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'To the extent permitted by law, our total liability for any claim is limited to the amount you paid us in the twelve months before the claim.',
          'We are not liable for indirect or consequential loss, lost data, or lost profits.',
          'Nothing in these terms excludes liability that cannot be excluded by law, including liability for death or personal injury caused by negligence, or for fraud.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'These terms are governed by the laws of the jurisdiction in which the operating entity is registered, as stated on your order confirmation. Before starting formal proceedings, write to support@inpagent.com; we will try to resolve the matter directly.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'We may update these terms as the product evolves. Material changes are announced on this page and, for account holders, by email before they take effect.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['support@inpagent.com'],
      },
    ],
    zhFallbackFields: [],
  },

  refund: {
    heading: 'Refund Policy',
    lead: 'When you can get your money back, how to ask, and how long it takes.',
    updated: 'Last updated: 28 November 2026',
    sections: [
      {
        heading: 'Seven days, no questions, first purchase only',
        paragraphs: [
          'If this is your first paid subscription, you can request a full refund within 7 days of the payment, for any reason. No explanation is required.',
          'This applies to the first payment only, once per customer.',
        ],
      },
      {
        heading: 'Renewals',
        paragraphs: [
          'Renewal charges are not refundable. Cancel before the renewal date and no further charge is made; the app stays usable until the end of the period already paid.',
        ],
      },
      {
        heading: 'Cancellation',
        paragraphs: [
          'You can cancel at any time. Cancellation takes effect immediately and stops future billing. The period already paid is neither refunded nor prorated.',
        ],
      },
      {
        heading: 'How to request a refund',
        paragraphs: [
          'Email support@inpagent.com with the address used at checkout and the order ID from your Paddle receipt.',
          'Because Paddle is the seller of record, you can also open a request with Paddle buyer support and quote the same order ID.',
        ],
      },
      {
        heading: 'How long it takes',
        paragraphs: [
          'Approved refunds are returned by Paddle to the original payment method. Card refunds usually appear within 5 to 10 business days, depending on your bank.',
        ],
      },
      {
        heading: 'What is not refundable',
        bullets: [
          'Renewal charges, and periods already used.',
          'Trial quota, which involves no payment.',
          'Purchases made after a chargeback has been filed.',
          'Accounts suspended for prohibited use under the Terms of Service.',
        ],
      },
      {
        heading: 'Chargebacks',
        paragraphs: [
          'If something went wrong, contact us first. A chargeback filed without contacting us slows the resolution, and your licence may be suspended while the bank investigates.',
        ],
      },
      {
        heading: 'Your statutory rights',
        paragraphs: [
          'This policy adds to your statutory rights rather than replacing them. Where local consumer law gives you a stronger right of withdrawal, that right prevails.',
        ],
      },
    ],
    zhFallbackFields: [],
  },

  compliance: {
    heading: 'Content Standards',
    lead: 'What INP will not generate, who may use it, and how prohibited use is handled. Written so that reviewers, platforms, and payment providers can verify our position in one place.',
    updated: 'Last updated: 28 November 2026',
    sections: [
      {
        heading: 'No adult content',
        paragraphs: [
          'The product does not generate, host, or distribute pornographic or sexually explicit material. Requests for sexual content are blocked at input, and outputs are filtered before they are shown or spoken.',
          'Any sexual content involving minors is prohibited without exception. Attempts are logged and reported.',
        ],
      },
      {
        heading: 'No real-person likeness or voice',
        bullets: [
          'Avatars are original fictional characters. They are not modelled on, and do not depict, any real person, celebrity, or public figure.',
          'The app ships with no likeness of a real individual.',
          'Voice synthesis may use a reference clip supplied by the user. Users must own the rights to that voice. Cloning a third party, a public figure, or anyone who has not consented is prohibited and is grounds for suspension.',
          'We do not offer a service that produces content in the voice or likeness of a real individual.',
        ],
      },
      {
        heading: 'Age requirement',
        paragraphs: [
          'The product is for users aged 18 and over. Age is confirmed when an account is created, and the product is not directed at children.',
        ],
      },
      {
        heading: 'What the product is, and is not',
        paragraphs: [
          'INP is a productivity-oriented desktop assistant: scheduling, reminders, task tracking, quick lookups, voice interaction, and a 3D character rendered on the desktop.',
          'It is not a dating service, a matchmaking service, or a paid companionship service. We do not market it as a substitute for human relationships.',
        ],
      },
      {
        heading: 'Not professional advice',
        paragraphs: [
          'The assistant does not provide medical, legal, financial, or mental-health advice. It is not a clinician, lawyer, or adviser, and must not be used in an emergency.',
        ],
      },
      {
        heading: 'How content is checked',
        bullets: [
          'An input filter screens prompts before they reach the model.',
          'An output filter screens replies before they are shown or spoken.',
          'Reports go to support@inpagent.com; we aim to review them within 3 business days.',
          'Repeated attempts at prohibited use lead to suspension.',
          'Logs of blocked attempts are kept to the minimum needed to enforce the rules.',
        ],
      },
      {
        heading: 'How data is handled',
        paragraphs: [
          'Conversations are processed on the user\'s machine and are not stored on our servers. The Privacy Policy lists the narrow set of data our servers do handle.',
        ],
      },
      {
        heading: 'Contact for reviewers',
        paragraphs: [
          'Payment providers and platform reviewers can reach us at support@inpagent.com with "review" in the subject line. We answer within 2 business days.',
        ],
      },
    ],
    zhFallbackFields: [],
  },

  download: {
    heading: 'Download INP for Windows',
    lead: 'Current build, system requirements, and what to expect the first time you run it.',
    updated: 'Last updated: 28 November 2026',
    sections: [
      {
        heading: 'Current build',
        paragraphs: [
          'The build in circulation is a technical preview for Windows: v0.1, preview channel. Public download opens with the paid release; test builds are delivered by email to testers.',
        ],
      },
      {
        heading: 'System requirements',
        bullets: [
          'Windows 10 or Windows 11, 64-bit.',
          '4-core CPU or better.',
          '8 GB RAM minimum, 16 GB recommended.',
          '3.2 GB of disk space for the app and the bundled speech model.',
          'An NVIDIA GPU is optional and speeds up speech synthesis considerably.',
          'An internet connection for activation and for cloud models.',
        ],
      },
      {
        heading: 'You bring the model',
        paragraphs: [
          'INP does not include a language model. Before the assistant can reply, you need one of the following:',
        ],
        bullets: [
          'An API key from a model provider you choose.',
          'A local model server on your own machine, for example llama.cpp listening on 127.0.0.1:8080.',
        ],
      },
      {
        heading: 'Unsigned build notice',
        paragraphs: [
          'The current installer is not code-signed. Windows will show "Windows protected your PC", naming an unknown publisher. This is expected for this build, not a sign of tampering.',
          'To proceed, click "More info", then "Run anyway".',
          'Each build ships with a SHA-256 checksum so you can confirm the file you downloaded is the file we published. Code signing is planned before the public release.',
        ],
      },
      {
        heading: 'Install steps',
        bullets: [
          'Download the build archive sent to you.',
          'Extract it to a folder you can write to, such as Documents\\INP.',
          'Double-click INP.exe.',
          'Complete the first-run wizard: choose your model source, pick a voice language, choose an avatar.',
        ],
      },
      {
        heading: 'Uninstall and local data',
        paragraphs: [
          'Delete the app folder to remove the application. Conversations, tasks, settings, and voice profiles live in the app data directory next to it; deleting that directory removes them. Once deleted, we cannot recover them.',
        ],
      },
      {
        heading: 'Request a test build',
        paragraphs: [
          'Write to support@inpagent.com. Tell us your Windows version and whether you have an NVIDIA GPU, and we will send the build that fits your machine.',
        ],
      },
    ],
    zhFallbackFields: [],
  },
} satisfies Record<string, LegalDoc>;

export type LegalKey = keyof typeof legalEn;
