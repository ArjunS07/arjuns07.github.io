---
title: "Bot Xchange"
description: "An original ML-based algorithmic stock trading event I co-developed for ShriTeq, an inter-school technology competition, in 2022"
draft: false
thumbnail: "images/random-forest-model.png"
layout: "simple"
timeline: "September – October 2022"
weight: 300
url: "bx-22"
---

In my post of Secretary of ICT at my school, I was one of the three lead organising committee members at ShriTeq 2022 - my school's annual inter-school technology competition. We were responsible for every aspect of it from start to finish, which included coming up with and implementing what eventually amounted to around fourteen events.

**Bot Xchange** was a machine learning-based virtual stock trading competition which I ideated in August 2022 and  co-developed the next month.

 Most ML competitions tend to be straightforward races to maximise the accuracy of your neural network, and as far as I know, an ML-based virtual event like this was unprecedented at the high school level in India when we organised it.

## TL;DR

{{< alert "github" >}}
You can check out the code [another student](https://github.com/advay168) and I wrote for the event on [GitHub](https://github.com/tsrsmict/bot-xchange-22)
{{< /alert >}}

The best way to familiarise yourself with Bot Xchange is to check out the [starter pack](https://docs.google.com/document/d/1GLSzUIFsBLgRW3jMwuqC1hBKS6GZoRRGJKd6vrlX83o/), which was a nine-page document provided to all participating teams the day the event opened.

{{< raw-html >}}
<iframe src="/bx-22/botxchange_starterpack.pdf" width="100%" height="500px"> </iframe>
{{< /raw-html >}}

### How the event worked

After a lot of deliberation, we eventually settled on a static Python-based structure:

* We would provide teams with historic stock data, and nudges on how to train machine learning models to predict future stock prices based on past price data
* Teams would make custom ML models, as well as write programs to make stock trading decisions based on the models that they developed
* Our coderunner would run their Python programs, assuming they were in a specific format, and run its stock trades against our stock market data for a selected set of stocks in a past historic time period.

## What I worked on

We needed to do a few things to make this event happen:

1. Choose a set of stocks for the real stock market exchange, and scrape historic stock prices for them. The general theme of the event was biotechnology, so after acquiring a list of around 200 biotech stocks, I wrote a Python notebook to download historic stock prices for them since 1999.

2. Choose a set of stocks which teams could train their models on. We used the same approach described above to collect data for medical stocks, and anonymised the stock tickers before providing them to teams

3. Write our own machine learning model on that training data, which would take in an ordered  list of _N_ prices in the last _N_ days for that stock, and predict the price on the _N+1th_ day. I developed a neural network which used LSTM layers for this.

4. Defined a structure for participants' programs to make trades, and write a 'coderunner' to execute trades for those programs. It would take a Pandas DataFrame consisting of stock market data we scraped in step 1, and pass it to the team's `make_trades()` function, revealing one new day of price data every time. It would do this 50 times. It had code to keep track of the team's profit, and had extensive logging for each of the 50 'days' in which trades were made.

5. Write a sample program to test the viability of the event. We used a simple algorithm to make trades after getting price predictions from our LSTM model, and made around ~30% profit. This program was rather complicated to develop, and involved a lot of work by the [other student](https://github.com/Advay168) and I.

6. Extensively document the requirements for the event. We put together a sample machine learning model with an even simpler trading algorithm, and gave it to teams in the starter pack document.