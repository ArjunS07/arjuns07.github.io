---
title: "How much would it cost to supply one can of Coca-Cola to the entire world? An overengineered solution with Julia"
date: 2023-01-06T22:20:32+05:30
draft: true
---

In an [episode](https://nerdfighteria.info/v/250775376/#:~:text=%22Dear%20Hank%20and%20John%2C%C2%A0Given%20its%20varying%20price%20points%20throughout%20the%20world%2C%20how%20much%20in%20USD%20would%20it%20actually%20cost%20to%20buy%20the%20world%20a%20coke%3F%22) of a podcast I was listening to recently, the question of how much it would cost to purchase the entire world a Coca-Cola was brought up. The hosts did a reasonable job of calculating an estimate, but for some reason.  

Just to be clear, I harbour no illusions that this is a good idea, or whether this exploration has any practical benefits aside from being an abdusrd exercise in programming (unless, of course, your name is Elon Musk, and you've now found the only use of your $44 billion that's worse than the current one). This post is inherently ridiculous, so all you should hope to get out of this, and perhaps a few pained laughs. 

Disclaimer: This is my first time using Julia for anything serious, so while I've tried my best to keep it as clean and straightforward as possible, I apologise in advance for any mistakes or missed room for improvement in the code. 

## The method
In an ideal world, Coca-Colas would cost the same everywhere and we could just multiply the number of people in the world by the price of a can of Coke. 

Unfortunately, we live in a world in which 