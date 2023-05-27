---
title: "How I overengineered a crypt hunt: on becoming an increasingly Serious Django developer"
date: 2023-04-30T00:51:33+05:30
draft: true
description: "" # used in HTML metadata
summary: "" # used in website
keywords: [] # used in HTML metadata
tags: [] # used in website
---

_If you're only interested in the code, skip [here]() to avoid the background preamble introducing the Crypt Hunt._

event in my school is capable of inviting as much as Since 2021, I've been lucky enough to be on the organising team for one of my school's biggest annual inter-house events: the **Crypt Hunt**. There's something wildly intoxicating about being challenged as a participant to find , and it's all the more . I've been lucky enough to have been on the other side of this event for the past three years.

The concept of the event is simple: houses, consisting of hundreds of students*, work collectively to find answers to a series of cryptic puzzles. These answers are typically short strings which have to be entered into an online platform

_*As far as I am aware, our crypt hunt's collaborative model is unique, at least among Indian schools and universities. I'm not sure how exactly this twist on the traditional cryptic hunt model originated, but I've definitely got an alumnus from many years ago to thank for what is likely the primary reason this event continues to be embraced by the student community year after year._

-----

Building and deploying a crypt hunt site, to be used by at most by a few hundred concurrent users, is by no means a particularly difficult problem. But I think the way in which a novice programmer–specifically, this novice programmer–approaches it says a lot about them.

In this post, I'm going to compare the code I wrote to implement the most important view in the Crypt Hunt in 2021 vs 2023. For the sake of brevity, and because of the fact that I did not make many significant changes to the code due to time constraints, I'm skipping the 2022 version.

As you'll see, this year's code is still not perfect–but the marked difference across just two years says a lot about my evolution as a Django developer, and how novice programmers approach Python in a world in which 13-year-olds are [promised](https://twitter.com/beastoftraal/status/1331074275181174784/photo/1) that they are only one short course away from a six-figure big tech salary.

## Hacking together the 2021 Crypt Hunt

Two things you need to know about the site for this year's Crypt Hunt:

1. It was hacked together in a weekend

2. It marked _many_ firsts:

   * My first full-stack web app

   * My first Django project

   * My first Python project that wasn't a simple scripting or data science task

   * My first production application

   * My first application for the school

Needless to say, it was a near miracle that the site did not spectacularly crash and burn over the three-day event.

Without further

```python
# views.py

def play(request):
    # 1
    initial_house = models.CryptHouse.objects.get(account=request.user)
    initial_house_level = initial_house.level

    if initial_house.level <= MAX_LEVEL:
        # 2
        initial_level = models.Level.objects.get(serial_no=initial_house_level)

        form = SubmissionForm(request.POST)
        if form.is_valid():
            answer = form.cleaned_data["contents"]
            user_id = request.session["user_id"]
            sub = Submission(...)
            sub.save()

            # 3
            current_house = models.CryptHouse.objects.get(account=request.user) 
            current_house_level = current_house.level
            
            if current_house_level == initial_house_level:
                is_correct = validate_submission(sub, initial_level)
                if is_correct:
                    current_house = user_models.CryptHouse.objects.get(account=request.user)
                    current_house.level += 1
                    current_house.save()
    return redirect("play")
```

```python
# models.py
from django.conf import settings
from django.db import models
  
class CryptHouse(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, default = None, null =rue, blank = True, )
    level = models.IntegerField(default=1)
    date_modified = models.DateTimeField(auto_now = True)

# Create your models here.
class Level(models.Model):
    question = models.TextField()
    serial_no = models.PositiveIntegerField()
    answer = models.CharField(max_length=150)

class Submission(models.Model):
    contents = models.CharField(max_length=150)
    submitted_by = models.CharField(max_length=100)
    account = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, default = None, null = True, blank = True, )
    house_name = models.CharField(max_length=150, default = "None")
    time_submitted = models.TimeField(auto_now = True)

```
