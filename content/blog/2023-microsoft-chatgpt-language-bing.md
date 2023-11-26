---
title: "Bing's planned ChatGPT integration will shape the future of generative AI"
date: 2023-01-04T23:47:13+05:30
draft: false
type: "post"
showTableOfContents: true
showHeadingAnchors: true
showFullContent: false
summary: "An analysis of the current state of LLMs and what Microsoft's plans with OpenAI's ChatGPT technology might mean for the technology's future."
tags: ["Deep Dives", "Artificial Intelligence"]
---

Yesterday, [The Information reported](https://www.theinformation.com/articles/microsoft-and-openai-working-on-chatgpt-powered-bing-in-challenge-to-google) that Microsoft is planning to integrate ChatGPT, OpenAI’s breakthrough conversational AI, into Bing.

This isn’t the first time Microsoft’s indicated a desire to make concrete use of their [$1 billion investment in OpenAI](https://openai.com/blog/microsoft/) in their flagship products - they mentioned their intention to integrate DALL-E 2, OpenAI’s image generation software, into consumer products in a [blog post](https://news.microsoft.com/source/features/innovation/from-hot-wheels-to-handling-content-how-brands-are-using-microsoft-ai-to-be-more-productive-and-imaginative/) last year.

It’s still only an anonymous report from ‘a person familiar with the plans’, and even if the claims materialise, they’ll probably manifest as gradual changes over the next several months.

This doesn’t make it any less interesting, though, because the exact manner in which Microsoft integrates ChatGPT into the Bing search interface and how well their plans are executed, could be a defining moment in the development of generative AI.

Microsoft’s going to have to be careful. Other big tech firms appear wary of the technology, and probably for good reason - notably, Google executives cited the [‘reputational risk’](https://www.theverge.com/2022/12/14/23508756/google-vs-chatgpt-ai-replace-search-reputational-risk) associated with generative models as a deterrent in launching their chatbots into the public. And there's no shortage of valid reasons as to why.

## The three main challenges facing large language models (LLMs) today

1. **Veracity**–Even within mainstream circles, interest in ChatGPT’s genuinely impressive generative abilities is balanced by a general understanding to take what it says with a grain of salt.

    If you prompt it with a question based on a false factual premise, it’ll still 'hallucinate' and [confidently spew](https://mashable.com/article/chatgpt-amazing-wrong) incorrect information.

    Because of how the model works–it’s trained on a large corpus of texts and doesn’t directly refer to anything in its training set when prompted–[it also makes up false references](https://news.ycombinator.com/item?id=33841672) when asked to provide sources. In short, it is structurally incapable of distinguishing fact from fiction.

    OpenAI CEO Sam Altman himself [cautioned](https://twitter.com/sama/status/1601731295792414720) that the model is ‘incredibly limited’ for anything ‘factual’.

2. **Insensitivity**–OpenAI’s added enough guardrails to attempt to prevent the model from generating anything problematic to the point where they can impede legitimate uses of the technology.

    However, that doesn’t mean there aren’t ways to trick ChatGPT - with some not-so-difficult prompt engineering, people have [gotten](https://twitter.com/zswitten/status/1598380220943593472) [around](https://www.newstatesman.com/quickfire/2022/12/chatgpt-shows-ai-racism-problem) those filters.

    The above two problems are probably what the Google executives were worried about and what most of the public's attention seems to have been on so far. But I think there's another significant problem that people aren't talking enough about outside academic and programming circles.

3. **Closed-sourcedness**–LLMs are increasingly inaccessible to anyone interested in tinkering or experimenting with them. Despite their name, OpenAI has been somewhat opaque on the exact working of their most significant breakthroughs - notably, Microsoft has an [exclusive licence](https://blogs.microsoft.com/blog/2020/09/22/microsoft-teams-up-with-openai-to-exclusively-license-gpt-3-language-model/) to the code behind GPT-3. OpenAI’s also heavily reliant on Microsoft Azure for the infrastructure powering its services and for training the model, which is estimated to cost $3 million / day.

    Even still, the computational resources required to _run_ a service like ChatGPT are completely dwarfed by those required to _train_ the underlying LLMs.

    Even if the code for these tremendously powerful models was made publicly available - which it rarely is, the last such release was OpenAI's GPT-2 which is multiple orders of magnitude less powerful than the GPT-3.5 powering ChatGPT - its use to developers for fine-tuning and testing, and the extent to which an open-source ecosystem can be built around it, is restricted by the computational resources required to train these models.

    Previous developments in computer science eventually trickled down. But I'm not sure how long it will take for the resources required to train something like that DALL-E 2–4 weeks on 256 Nvidia V100 GPUs–to become accessible to the average research lab.

## What does this mean for Microsoft?

Microsoft will have to conquer these challenges completely, or they'll otherwise likely find out what those Google execs meant by long-term reputational risk.

If they play it safe, they might be able to build something that rivals [Google’s Knowledge Graph](https://support.google.com/knowledgepanel/answer/9787176?hl=en).

That’d perhaps be useful and have a positive impact on the Bing user experience–but considering it’s something Google’s had since long before LLMs were mainstream technology, it's probably not something which Microsoft executives would see as a justification for their massive investment in OpenAI. Besides, it's not exactly the best application of ChatGPT. ChatGPT is tuned for guided conversation, not general NLP tasks like its underlying GPT-3 model.

## Where Microsoft could go

The far more exciting possibility, then, is them truly tapping into what makes ChatGPT unique.

It’s not yet known what exactly Microsoft’s vision is for ChatGPT in Bing. Still, my guess is it most likely involves a version of the conversational AI specifically tuned to the search engine’s results to improve veracity. This means being able to have a conversation with Bing about your query, which would undoubtedly make complex queries and multi-stage research studies significantly easier.

## How will this interface with the underlying problems?

### 1 - Veracity

In some sense, this idea could be what some people are already using ChatGPT for (which they’re advised against doing), but with the intent to address the pitfalls relating to the veracity of information by tapping into Bing’s search data.

### 2 - Sensitivity

For that to happen, though, Microsoft will have to find a way to deal with the second problem. They know all too well how letting an AI basing responses based on content on the internet can go disastrously wrong, being the same company that released a Twitter chatbot almost seven years ago which quickly became a [racist, hateful PR nightmare](https://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist), and probably set back the mainstream perception of chatbot technology by several years.

If Microsoft can make ChatGPT’s conversations tuned to search results, but their filters fail to control its output, the result and fallout will probably be far more consequential than anything else in artificial intelligence as a whole so far - probably not just damaging Microsoft and OpenAI, but also setting back the public and legislative perception of generative models as a whole.

### 3 - OpaqueAI?

Any integration at this scale would make OpenAI even more dependent on Microsoft than it already is.

So far, generative models haven’t been at the centre of public-facing products for big tech companies. As soon as that happens, Microsoft will want to keep their secrets as close to its chest as possible.

At the same time, OpenAI’s been at the forefront of the public’s relationship with AI over the past few years - sure, competing services such as Midjourney have created a storm, but nothing like GPT (and its various iterations), as well as DALL-E, have.

Microsoft is the only major firm with which OpenAI shares a close relationship. The two companies becoming more dependent on each other doesn’t spell good things for transparency in the field of generative AI in the near future.

I don’t think OpenAI will completely stop existing as an independent entity. At the same time, though, Microsoft has a history of not exactly embracing open relationships with developers, from the time they [shut down Atom](https://github.blog/2022-06-08-sunsetting-atom/) or when they [came under fire](https://www.theverge.com/2022/11/8/23446821/microsoft-openai-github-copilot-class-action-lawsuit-ai-copyright-violation-training-data) for using unlicensed code from GitHub to train Copilot.

If this planned integration is a success and genuinely improves the Bing search experience, it would probably pressure rivals such as Google to pursue public-facing uses of LLMs - and might be the tipping point for mass integration of powerful generative AI into consumer products.

And as competition heats up in the search space, the incentives for Microsoft to allow the research lab to reveal any part of their technology dramatically decrease.

As its ties to Microsoft increase, I think OpenAI can be expected to become increasingly opaque. At best, what remains ‘open’ might be open only in name, similar to how Google maintains its open-source Chromium project: contributions from independent developers are rarely accepted by the maintainers, and the repositories are essentially glorified public packages, with no real interest in supporting a developer ecosystem.

---

_Update: In Sam Altman's February 24th post titled ['Planning for AGI and beyond'](https://openai.com/blog/planning-for-agi-and-beyond/), he tucks away this in the footnotes (emphasis my own)_:

> As another example, we now believe we were wrong in our original thinking about openness, and have pivoted from thinking we should release everything (though we open source **some** things, and expect to open source more exciting things in the future!) to thinking that we should figure out how to safely share access to and benefits of the systems.

_Validation!_

---

That's why this might be the moment where a downward spiral in the transparency of generative models might begin. That would be bad news for everyone - it would make it much harder for researchers and developers to tinker with and resarch the technology, and would reduce the public's understanding of what exactly these increasingly influential pieces of technology are capable of.

## What this means in the long term

I don’t know if this claim will ever come to fruition, or if it does, to what extent. But I’m interested in seeing where this goes next. Because there are going to be an increasing number of inflection points like this in coming the years, as the reliability and sensitivity of LLMs is improved; and public, academic, and corporate entities struggle to balance their competing interests.

What generative models will be capable of, and what they’re being used for, in this decade is going to be defined by what decisions are made at inflection points like these.

The last decades of innovation in artificial intelligence have happened in the open. Microsoft may now determine whether that'll be true for the decades to come.
