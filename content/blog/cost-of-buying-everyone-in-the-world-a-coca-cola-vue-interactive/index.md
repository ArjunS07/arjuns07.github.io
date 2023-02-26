---
title: "My kingdom for a Coca-Cola: developing an interactive visualisation of what it would mean to buy everyone a can of coke"
summary: "Surely my most practical idea yet."
date: 2023-05-06T22:20:32+05:30
draft: true
showFullContent: false
tags: ["Tutorial", "Vue.js"]
---

In an [episode](https://nerdfighteria.info/v/250775376/#:~:text=%22Dear%20Hank%20and%20John%2C%C2%A0Given%20its%20varying%20price%20points%20throughout%20the%20world%2C%20how%20much%20in%20USD%20would%20it%20actually%20cost%20to%20buy%20the%20world%20a%20coke%3F%22) of a podcast I was recently listening to, the the question of how much it would cost to purchase everyone in the world a can of Coca-Cola was brought up. The hosts did a reasonable job of calculating a back-of-the-napkin estimate, but I'm still not satisfied.

Perhaps, in the eight years since that podcast came out, the world has seen some inarguably worse usees of billions. Perhaps, after the last three years, we all just need some idle sources of amusement. Or perhaps this is a truly noble endeavour to which we as a species must shift our focus to.

Whatever the reason may be, I want to know the exact cost of buying everyone in the world a Coca-Cola, and I want to know it _to the last cent_.

So that's exactly what I'm going to do.

Let the games begin.

## The method

### How are we going to calculate cost?

In an ideal world, Coca-Colas would cost the same everywhere and we could just multiply the number of people in the world by the price of a can of Coke.

Unfortunately, one of the many ways in which the world we live in is far from ideal is that millions are disenfranchised from Coca-Cola, and those lucky enough to avoid such a fate still face price discrimination across borders.

To tackle this challenge, we're first going to find a list of how much a can of Coca-Cola costs in every country in which it is available. For countries in which Coca-Cola isn't normally available, we're going to find the nearest country where it is available, and use that price. Perhaps accounting for the cost of shipping would result in a more accurate result, but we can't solve all the world's problems at once.

### Who are we buying Coca-Cola for?

As benevelot bestowers of privileges to humankind, we still do need to consider that a can of coke may not be a gift for everyone.

We're going to get a list of population counts for every age from 1-100 for every country in the world, and set up a system to adjust the upper and lower bound of the ages we want to purchase Coca-Cola for.

### Where are we getting the data from?

* **Population per country per age**: I've reduced a file provided by the [UN Department of Economic and Social Affairs](https://population.un.org/wpp/Download/Standard/Population/) to just the population of every country for every age from 1-100 as of 2021. You can download it as a CSV file [here](UN_WPP_2021_Population_SingleAge_BothSexes_Cleaned.csv).

* **Coca-Cola prices per country**: [globalproductprices.com](https://globalproductprices.com) provides a [list](https://www.globalproductprices.com/rankings/coca_cola_price/) of Coca-Cola prices per country. I've copied them to a CSV file [here](coca_cola_prices.csv).

## The code

### Basic Setup
