---
title: "How much would it cost to supply one can of Coca-Cola to the entire world? An overengineered solution using Julia"
date: 2023-01-06T22:20:32+05:30
draft: true
showFullContent: false
---

In an [episode](https://nerdfighteria.info/v/250775376/#:~:text=%22Dear%20Hank%20and%20John%2C%C2%A0Given%20its%20varying%20price%20points%20throughout%20the%20world%2C%20how%20much%20in%20USD%20would%20it%20actually%20cost%20to%20buy%20the%20world%20a%20coke%3F%22) of a podcast I was listening to recently, the question of how much it would cost to purchase the entire world a Coca-Cola was brought up. The hosts did a reasonable job of calculating an estimate, but for some reason.  

Just to be clear, I harbour no illusions that this is a good idea, or that this exploration has any practical benefits aside from being an abdusrd exercise in programming (unless, of course, your name is Elon Musk, and you've now found the second-worst use of your $44 billion). This post is inherently ridiculous, so all you should hope to get out of this is a primer on Julia for a non-scientific application, and perhaps a few painful laughs.

Disclaimer: This is my first time using Julia for anything serious, so while I've tried my best to write the code in the best way possible, I apologise in advance for any mistakes or unrealised improvements.

## The method

### How we're going to calculate prices
In an ideal world, Coca-Colas would cost the same everywhere and we could just multiply the number of people in the world by the price of a can of Coke.

Unfortunately, one of the many ways in which the world we live in is far from ideal, millions are disenfranchised from the goodness of Coca-Cola, and they'