// Nurture sequence message history and AI summaries, keyed by lead ID.
// These represent the ongoing automated SMS nurture campaign conversations.

export const nurtureData = {
  // David Rodriguez — First-Time Buyer, Day 3 of 7
  '3': {
    aiSummary:
      "David is a motivated first-time buyer focused on Riverside neighborhoods. He responded positively to the pre-approval info request in Day 3, signaling he's moving from research to action. His main hesitation is financial readiness — he's aware of his credit score and is cautious about timing. Best next step is a soft introduction to a broker to answer affordability questions.",
    keyTopics: ['Riverside neighborhoods', 'Pre-approval process', 'FHA down payment options'],
    sentiment: 'Positive',
    nextSteps: 'Send pre-approval guide, then offer broker intro call',
    messages: [
      { from: 'ai', text: "Hi David! Just checking in — have you had a chance to explore any neighborhoods you're excited about?", time: 'Day 1 · 10:00 AM', date: '3 days ago' },
      { from: 'lead', text: "Yes actually found a couple I like in Riverside!", time: 'Day 1 · 11:32 AM', date: '3 days ago' },
      { from: 'ai', text: "Riverside has some great options in your range — especially for FHA buyers. Are you currently working with a real estate agent?", time: 'Day 2 · 10:00 AM', date: '2 days ago' },
      { from: 'lead', text: "Not yet, still just browsing online", time: 'Day 2 · 3:45 PM', date: '2 days ago' },
      { from: 'ai', text: "No rush! Quick tip: getting pre-approved early actually helps you move faster AND negotiate better when you find the right place. Want me to send you info on our quick pre-approval process? Takes about 10 minutes.", time: 'Day 3 · 10:00 AM', date: 'Yesterday' },
      { from: 'lead', text: "Yeah that would be really helpful thanks", time: 'Day 3 · 2:15 PM', date: 'Yesterday' },
    ],
  },

  // Jennifer Walsh — Warm Buyer, Day 5 of 10
  '4': {
    aiSummary:
      "Jennifer is a repeat buyer who sold in 2022 and has been renting while waiting for the right opportunity. She's financially prepared with a 730 credit score and 10–15% down saved. Her main concern seems to be timing the market. She's been very responsive to messages — engagement rate is high. She's likely 2–4 weeks from being ready for a broker conversation.",
    keyTopics: ['Spring buying timeline', 'Market timing concerns', 'Repeat buyer process'],
    sentiment: 'Engaged',
    nextSteps: 'Offer a no-pressure market update call with broker',
    messages: [
      { from: 'ai', text: "Hi Jennifer! Spring is just around the corner — are you still eyeing the $600–615k range, or has your search evolved?", time: 'Day 1 · 9:00 AM', date: '5 days ago' },
      { from: 'lead', text: "Still in that range yeah, just waiting to see if prices come down a bit more", time: 'Day 1 · 10:22 AM', date: '5 days ago' },
      { from: 'ai', text: "That's a common question right now. Rates have actually moved more than prices recently — sometimes locking in a rate at the right time matters more. Would a quick 10-minute call with our market expert be helpful?", time: 'Day 2 · 9:00 AM', date: '4 days ago' },
      { from: 'lead', text: "Maybe, I'll think about it", time: 'Day 2 · 6:30 PM', date: '4 days ago' },
      { from: 'ai', text: "No pressure at all! In the meantime — would it help to see a personalized breakdown of what your monthly payment would look like at your price range?", time: 'Day 3 · 9:00 AM', date: '3 days ago' },
      { from: 'lead', text: "Yes actually that would be great", time: 'Day 3 · 11:05 AM', date: '3 days ago' },
      { from: 'ai', text: "Sent! Based on $615k at 10% down and today's rates, you're looking at roughly $3,800–$4,100/month depending on final rate. Does that fit your budget?", time: 'Day 4 · 9:00 AM', date: '2 days ago' },
      { from: 'lead', text: "Yes that works for me. Starting to feel more ready", time: 'Day 4 · 2:40 PM', date: '2 days ago' },
      { from: 'ai', text: "That's exciting to hear! Our top broker just had a cancellation this week — would a 15-minute call be useful to talk through next steps?", time: 'Day 5 · 9:00 AM', date: 'Today' },
    ],
  },

  // Michael Park — First-Time Buyer, Day 1 of 7
  '5': {
    aiSummary:
      "Michael is early in his homebuying journey, still saving and doing research. He's interested in condos or townhomes under $300k with 5–10% down. Engagement has been light so far — only replied to the initial qualification message. Needs educational nurture content to build confidence and keep Apex top-of-mind.",
    keyTopics: ['Condo vs townhome decision', 'First-time buyer programs', 'Savings timeline'],
    sentiment: 'Neutral',
    nextSteps: 'Send first-time buyer guide, check in on savings progress',
    messages: [
      { from: 'ai', text: "Hi Michael! Thanks again for connecting with Apex Mortgage. Since you're thinking about a 3–4 month timeline, I'll send you some helpful info along the way. First up: did you know there are first-time buyer programs that let you put as little as 3% down?", time: 'Day 1 · 2:00 PM', date: 'Yesterday' },
    ],
  },

  // Lisa Nguyen — Relocation Buyer, Day 2 of 5
  '6': {
    aiSummary:
      "Lisa is a highly motivated relocation buyer with a hard deadline — she starts her new job in 8 weeks and wants to be moved in by then. She's financially strong (720 credit, 15% down ready) and is transactional in her communication style. She needs speed and certainty. This is a near-hot lead that should be escalated to a broker soon.",
    keyTopics: ['Job relocation timeline', 'Fast closing requirements', 'Conventional loan options'],
    sentiment: 'Urgent',
    nextSteps: 'Escalate to broker immediately — 8-week hard deadline',
    messages: [
      { from: 'ai', text: "Hi Lisa! Given your 8-week timeline for your new job, I want to make sure we're moving fast. Have you started looking at properties in your new city yet?", time: 'Day 1 · 8:00 AM', date: '2 days ago' },
      { from: 'lead', text: "Yes I've been doing video tours online, have a few I like", time: 'Day 1 · 9:15 AM', date: '2 days ago' },
      { from: 'ai', text: "That's smart! For a relocation purchase we'd recommend getting fully pre-approved immediately — it gives sellers confidence and speeds up the close. Can I connect you with our relocation specialist today?", time: 'Day 2 · 8:00 AM', date: 'Today' },
      { from: 'lead', text: "Yes please, the sooner the better", time: 'Day 2 · 8:45 AM', date: 'Today' },
    ],
  },

  // Robert Garcia — Credit Builder, Day 6 of 14
  '7': {
    aiSummary:
      "Robert is on a credit improvement journey and is genuinely motivated to buy, but needs to reach a higher credit score first. He's been consistent in responding and seems to be actively working on his credit. The nurture sequence is educating him on timeline and score milestones. He's a good long-term pipeline lead — likely ready in 4–6 months.",
    keyTopics: ['Credit score improvement', 'FHA minimum requirements', 'Debt paydown strategy'],
    sentiment: 'Optimistic',
    nextSteps: 'Send credit milestone tracker, offer free credit review call',
    messages: [
      { from: 'ai', text: "Hi Robert! How's the credit journey going? Even small improvements can make a big difference in what rate you qualify for.", time: 'Day 1 · 10:00 AM', date: '6 days ago' },
      { from: 'lead', text: "Slowly but surely, paid off one card this month", time: 'Day 1 · 7:22 PM', date: '6 days ago' },
      { from: 'ai', text: "That's a great move — paying down revolving credit is one of the fastest ways to boost your score. How are you tracking right now, roughly?", time: 'Day 3 · 10:00 AM', date: '4 days ago' },
      { from: 'lead', text: "Got up to 631 from 625, small progress", time: 'Day 3 · 5:10 PM', date: '4 days ago' },
      { from: 'ai', text: "That's meaningful progress! FHA loans accept scores as low as 580, but at 640+ you unlock significantly better rate tiers. You're close. Are you working with a credit counselor or going solo?", time: 'Day 5 · 10:00 AM', date: '2 days ago' },
      { from: 'lead', text: "Going solo, mostly reading stuff online", time: 'Day 5 · 8:35 PM', date: '2 days ago' },
      { from: 'ai', text: "We actually offer a free 20-minute credit review call with our loan officer — no obligation, just advice on the fastest path to 640+. Would that be useful?", time: 'Day 6 · 10:00 AM', date: '2 days ago' },
    ],
  },

  // Amanda Foster — Self-Employed Buyer, Day 4 of 10
  '8': {
    aiSummary:
      "Amanda is a self-employed freelancer who understands that her income documentation will be more complex. She replied positively to the Day 4 message about bank statement loans, which is a strong signal of interest. Her main blocker is uncertainty around whether she'll qualify. Reassurance and education on self-employed mortgage options will move her forward.",
    keyTopics: ['Self-employed income documentation', 'Bank statement loans', '2-year income averaging'],
    sentiment: 'Curious',
    nextSteps: 'Send self-employed loan guide, book educational consultation',
    messages: [
      { from: 'ai', text: "Hi Amanda! Quick question — when you say you're self-employed, are you a freelancer, business owner, or contractor? This helps us identify the best loan program for you.", time: 'Day 1 · 10:00 AM', date: '4 days ago' },
      { from: 'lead', text: "Mix of freelance and my own small business, been doing it 3 years", time: 'Day 1 · 1:45 PM', date: '4 days ago' },
      { from: 'ai', text: "3 years is solid. Most lenders want 2 years minimum, so you qualify. The key docs you'll need are your last 2 years of tax returns. Do you have those available?", time: 'Day 2 · 10:00 AM', date: '3 days ago' },
      { from: 'lead', text: "Yes I have them. My income varies a lot though year to year", time: 'Day 2 · 3:20 PM', date: '3 days ago' },
      { from: 'ai', text: "Variable income is normal for self-employed buyers — lenders typically average the two years. But there's also an option called a Bank Statement Loan where they qualify you on 12–24 months of deposits instead. Sounds like it could be a fit for you.", time: 'Day 3 · 10:00 AM', date: '2 days ago' },
      { from: 'ai', text: "Want me to send you a quick comparison of traditional vs bank statement loan options for self-employed buyers?", time: 'Day 4 · 10:00 AM', date: 'Yesterday' },
      { from: 'lead', text: "Yes please that would be super helpful", time: 'Day 4 · 12:55 PM', date: 'Yesterday' },
    ],
  },

  // James Williams — Credit Builder, Day 2 of 14
  '9': {
    aiSummary:
      "James is a first-time buyer with a low credit score who's just starting his homeownership journey. He's been somewhat unresponsive but did engage with the first message. He needs educational support and encouragement. Long-term lead — 6+ months out — best nurtured with light-touch, helpful content.",
    keyTopics: ['First-time buyer education', 'Credit score basics', 'FHA eligibility'],
    sentiment: 'Uncertain',
    nextSteps: 'Continue light-touch educational sequence',
    messages: [
      { from: 'ai', text: "Hi James! No worries about where your credit score is right now — many of our best clients started right where you are. Did you know FHA loans accept scores as low as 580?", time: 'Day 1 · 3:00 PM', date: '4 days ago' },
      { from: 'lead', text: "Really? I didn't know that, that's good to hear", time: 'Day 1 · 9:05 PM', date: '4 days ago' },
      { from: 'ai', text: "Absolutely! And the good news is — going from 610 to 640 can happen in 3–6 months with the right steps. I'll send you a simple credit improvement guide we put together. No cost, no obligation.", time: 'Day 2 · 3:00 PM', date: '3 days ago' },
    ],
  },

  // Patricia Kim — Long-Term Buyer, Day 3 of 21
  '10': {
    aiSummary:
      "Patricia and her family are long-term planners — school district focus and a 6+ month timeline. She's been warm in her responses and appreciates the educational approach. The booked discovery call is a positive signal. She'll need sustained nurturing but has strong eventual intent. Her credit at 700 will need to improve slightly for jumbo loan best rates.",
    keyTopics: ['School district priorities', 'Jumbo loan qualification', 'Long-term planning'],
    sentiment: 'Warm',
    nextSteps: 'Honor discovery call Friday, provide jumbo loan overview',
    messages: [
      { from: 'ai', text: "Hi Patricia! Thanks for chatting with us earlier. Since you mentioned school districts are a priority — which areas are on your shortlist?", time: 'Day 1 · 9:00 AM', date: '3 days ago' },
      { from: 'lead', text: "Looking at Westlake and Sycamore Hills mainly, both have great schools", time: 'Day 1 · 11:30 AM', date: '3 days ago' },
      { from: 'ai', text: "Both excellent choices! Westlake in particular has seen strong appreciation over 5 years. At your price range ($675k), you'd be looking at a jumbo loan — which I know can sound intimidating, but with your profile it's very achievable.", time: 'Day 2 · 9:00 AM', date: '2 days ago' },
      { from: 'lead', text: "Good to know. We're not in a rush but want to be prepared", time: 'Day 2 · 4:15 PM', date: '2 days ago' },
      { from: 'ai', text: "That's the best way to approach it! Our broker, Alex, does a free 'Home Ready' planning call that maps out exactly what you need to do over the next 6 months. Would Friday work for a quick chat?", time: 'Day 3 · 9:00 AM', date: 'Yesterday' },
      { from: 'lead', text: "Friday works! Let's do 2pm if available", time: 'Day 3 · 10:45 AM', date: 'Yesterday' },
    ],
  },

  // Kevin O'Brien — Warm Buyer, Day 7 of 10
  '11': {
    aiSummary:
      "Kevin has a new job (2 months) which is a qualification challenge, but his engagement in the nurture sequence has been strong — he replied to Day 7 and recently upgraded from COLD to WARM. His credit at 670 is borderline conventional; FHA might be more appropriate. The employment gap needs to be addressed directly with a broker before he gets too far in the process.",
    keyTopics: ['New employment qualification rules', 'FHA vs conventional for credit tier', 'Condo financing'],
    sentiment: 'Improving',
    nextSteps: 'Warm intro to broker to address employment timing directly',
    messages: [
      { from: 'ai', text: "Hey Kevin! How are things going at the new job? Settling in well?", time: 'Day 3 · 5:00 PM', date: '5 days ago' },
      { from: 'lead', text: "Yeah it's going really well actually, loving it so far", time: 'Day 3 · 6:20 PM', date: '5 days ago' },
      { from: 'ai', text: "That's great news! Just so you know — for mortgage qualification, most lenders want to see 2 months of pay stubs at a new job, plus that the job is in the same field as your previous one. If that's the case for you, you might be closer to qualifying than you think.", time: 'Day 5 · 5:00 PM', date: '3 days ago' },
      { from: 'lead', text: "Same field yeah, moved from another retail company to this one. And I just got month 2 pay stub!", time: 'Day 5 · 8:45 PM', date: '3 days ago' },
      { from: 'ai', text: "That's actually big news — that's the key milestone many lenders need! Would you be open to a quick 10-minute call with one of our loan officers this week to see what you actually qualify for?", time: 'Day 7 · 5:00 PM', date: 'Today' },
      { from: 'lead', text: "Yes! I'd love that actually", time: 'Day 7 · 5:30 PM', date: 'Today' },
    ],
  },

  // Diana Martinez — Self-Employed Buyer, Day 8 of 10
  '12': {
    aiSummary:
      "Diana is a business owner with 5 years of operating history and 20% down ready — she's actually in a strong position despite being self-employed. At Day 8 of her sequence she's been highly engaged and even proactively provided information. The main gap is her credit score at 690, which is below ideal for conventional but workable. She should be escalated for a broker conversation soon.",
    keyTopics: ['Business owner loan programs', '5-year income documentation', 'Credit score for conventional'],
    sentiment: 'Ready to engage',
    nextSteps: 'Broker intro — she has docs ready and is engaged',
    messages: [
      { from: 'ai', text: "Hi Diana! Since you've had your business running for 5 years, you're in a strong position. Do you file as an LLC, S-Corp, or sole proprietor?", time: 'Day 1 · 9:00 AM', date: '8 days ago' },
      { from: 'lead', text: "LLC taxed as S-Corp", time: 'Day 1 · 10:30 AM', date: '8 days ago' },
      { from: 'ai', text: "Perfect — S-Corp is great for mortgages because it often shows more documented income. Did you take a salary from the business or just distributions?", time: 'Day 2 · 9:00 AM', date: '7 days ago' },
      { from: 'lead', text: "Combination of both, around $95k salary plus distributions", time: 'Day 2 · 11:15 AM', date: '7 days ago' },
      { from: 'ai', text: "That's a very solid income structure for mortgage purposes. Combined with 20% down on a $540k purchase, you're looking at a strong application. What's been the biggest hesitation for you so far?", time: 'Day 4 · 9:00 AM', date: '5 days ago' },
      { from: 'lead', text: "Honestly just wasn't sure I'd qualify. Starting to feel more optimistic", time: 'Day 4 · 2:00 PM', date: '5 days ago' },
      { from: 'ai', text: "You absolutely can qualify! Would you be open to a complimentary pre-qualification review? Our broker can look at your docs and give you a real answer in 24 hours.", time: 'Day 6 · 9:00 AM', date: '3 days ago' },
      { from: 'lead', text: "Yes let's do it. What do I need to send?", time: 'Day 6 · 12:40 PM', date: '3 days ago' },
      { from: 'ai', text: "Excellent! Just your last 2 years of personal + business tax returns, 3 months of bank statements, and a recent pay stub. You can reply to this text with photos or I can send you a secure upload link — which do you prefer?", time: 'Day 8 · 9:00 AM', date: '2 days ago' },
    ],
  },
};
