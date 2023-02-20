---
title: "Tom Scott's 'Two of These People are Lying' is great, so I built it with Vue.js and Pocketbase."  
date: 2022-12-04T13:36:19+05:30
draft: true
tags: ["Vue.js", "Tutorial"]
---

The endeavour to  of the Hank and John]() which are, in essence, a delightful pursuit of splendidly unhelpful information.

Perhaps most dedicated to this pursuit of knowledge of the splendidly impractical are [_Tom Scott and The Technical Difficulties_](), who've been producing a variety of creative game shows and trivia series on YouTube for a decade and a half now. [Two of These People are Lying]() is a delight to watch. The rules of the game are as follows:

* 3 people pick out random Wikipedia articles, and write the titles of those articles onto chits which they put in a bowl
* The other player is the 'guesser'. They pick out a random chit and read out the title written on it
* All three players must attempt to convince the guesser that was the article they chose, by answering questions about the supposed contents of it
* The guesser must attempt to deduce which of these players is telling the truth, and which two are lying

When you're able to do this physically – complete with chits and a bowl – this works great, and tends to result in tirades of [hilarious banter](). The problem is when factors beyond your control – say, a pandemic – stop you from doing that. This game essentially requires:

* An interface for easily generating random encyclopedia articles
* A way of putting the titles of those articles into a 'bowl'
* A way to randomly select one of those titles
* An interface for the guesser to keep track of people they're asking questions of

I realise that, to some extent, the point of this game is for its participants to not have to rely on technology actually play it. And I'm about three years too late to getting around to making this. But I don't plan to be the first programmer to bother for irrelevant side details such as a clear use case or the consideration that some problems don't need a computer to solve them. This, then, is how I plan to spend several wild, precious hours from my wild, precious life.

## The plan

We're going to develop this as a Vue.JS-based single page app (SPA). All the code will be executed in the browser and the app will be hosted on Netlify. We won't be implementing any kind of authentication here.

We essentially need to:

1. Allow users to create rooms, and generate a unique random 6-character code for each room
2. Allow users to join rooms using codes
3. Allowing room hosts to pick a player in the room as the guesser, and decide how long 'reading time' will be
4. Allowing players to indicate they are ready to start
5. Allowing room hosts to start the game once:
    * A guesser has been nominated
    * Three or more players are present
    * All players have confirmed they are ready
6. Allowing non-guessers to randomly generate Wikipedia articles and read them during the allocated reading time, with the ability to go forward or back in a 'stack'.
7. A player should be able to 'lock' their article once they like it. By defualt, if a player does not lock an article, the one they're viewing at the moment reading time ends. The titles of these articles are stored in the room's database.
8. Once reading time ends, the article disappears for all players. The guesser sees a new screen with the article title, and a list of players with a field where they can take notes for each player.
9. Assuming the discussion is happening over another platform - such as Discord - the guesser can cross out players while interrogating them. They can un-cross players if they change their mind.
10. Then, once they've eliminated all but one player, they can press 'reveal' to find out who was lying and who wasn't.
