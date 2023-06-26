---
title: "Overengineering a Crypt Hunt: on *best practices*, and the becoming of a Serious Django Developer"
date: 2023-04-30T00:51:33+05:30
draft: true
description: "" # used in HTML metadata
summary: "" # used in website
keywords: [] # used in HTML metadata
tags: [] # used in website
---

Since 2021, I've been lucky enough to be on the organising house for one of my school's biggest annual inter-house events: the **Crypt Hunt**. The concept of the event is simple: houses, consisting of hundreds of students*, work collectively to decipher answers to a series of cryptic puzzles. They get unlimited attempts to enter these answers on a website where the event is hosted.

Since 2021, I've been in charge of the development and deployment of this platform four times.

The code for 2021 was the first semi-serious Django application I wrote. The 2023 code was the fourth time I wrote that same code from scratch, and followed several serious projects across languages which had forced me to accept much of conventional software development.

In a vacuum, the task of designing it is not a difficult one. But its unusual functionality means that it's so far removed from the land of CRUD apps, that the choices a developer makes while designing it say a lot about them.

Here, I'll go over two remarkably different methods of designing a solution for the exact same task–reading an answer from a user, and levelling up their house if they're correct. For seasoned developers: you'll see why pundits keep harping on the importance of seemingly obvious principles that constitute capital-G Good Django Code than others. For those just getting started with serious development–as I was in 2021–you'll see why I was wrong to think that label didn't matter.

## The code from 2021


```python
# models.py
from django.conf import settings
from django.db import models
  
class House(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE...)
    level = models.IntegerField(default=1)
    levelup_time = models.DateTimeField(auto_now = True)

# Create your models here.
class Question(models.Model):
    contents = RichTextUploadingField(default=None, blank=True, null=True)
    answer = models.CharField(max_length=150)
    serial_num = models.SmallIntegerField(unique=True)

class Submission(models.Model):
    contents = models.CharField(max_length=150)
    submitted_by = models.CharField(max_length=100)

```


```python
# app/views.py

def play(request):
    # 1
    initial_house = CryptHouse.objects.get(account=request.user)
    initial_house_level = initial_house.level

    initial_question = models.Level.objects.get(serial_no=initial_house_level)

    data = request.POST form.cleaned_data["contents"]
        user_id = request.session["user_id"]
        sub = Submission(...)
        sub.save()

        # 3
        current_house = CryptHouse.objects.get(account=request.user) 
        current_house_level = current_house.level
            
        if current_house_level == initial_house_level:
            is_correct = validate_submission(sub, initial_level)
            if is_correct:
                current_house = CryptHouse.objects.get(account=request.user)
                current_house.level += 1
                current_house.save()
    ...
```

```python
# users/models.py
class House(models.Model):
    account = models.ForeignKey(User, on_delete=models.CASCADE)
    current_question = models.ForeignKey("api.Question", on_delete=models.SET_NULL, null=True, blank=True)
    levelup_time = models.DateTimeField(null=True, blank=True, default=None)
    is_banned = models.BooleanField(default=False)

    def advance_question(self):
        try:
            self.current_question = self.current_question.next_question
        except AttributeError:
            self.current_question = None
        now = datetime.now()
        aware_datetime = make_aware(now)
        self.levelup_time = aware_datetime
        self.save()


class Player(models.Model):
    school_user_id = models.CharField(max_length=100, unique=True)
    house = models.ForeignKey(House, on_delete=models.CASCADE)
```

```python
# api/models.py


class Question(models.Model):
    contents = RichTextUploadingField(default=None, blank=True, null=True)
    answer = models.CharField(max_length=100)
    serial_num = models.SmallIntegerField(unique=True)

    @property
    def next_question(self):
        try:
            matching = self.__class__.objects.get(serial_num=self.serial_num + 1)
            return matching
        except self.__class__.DoesNotExist:
            return None

class Submission(models.Model):
    for_question = models.ForeignKey(Question, on_delete=models.SET_NULL, null=True, default=None, blank=True)
    text_contents = models.CharField(max_length=1024)

    time_submitted = models.DateTimeField(auto_now_add=True)
    by_player = models.ForeignKey(Player, on_delete=models.CASCADE, default=None, null=True)
    by_house = models.ForeignKey(House, on_delete=models.CASCADE, default=None, null=True)

    STATUS_CHOICES = [("ODT", "Outdated"), ("COR", "Correct"), ("INC", "Incorrect")]
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default=None, blank=True, editable=False)

    def validate(self):
        if self.by_house.current_question != self.for_question: self.status = "ODT"

        elif self.text_contents == self.for_question.answer:
            self.status = "COR"
            self.by_house.advance_question()
        else:
            self.status = "INC"

    def save(self, *args, **kwargs):
        self.by_house = self.by_player.house
        self.validate()
        super().save(*args, **kwargs)
```

```python
# api/views.py
def play(request):
    account = request.user
    matching_house = get_object_or_404(House, account=account)

    data = request.POST
    school_user_id = data.get("school_user_id", None)
    text_contents = data.get("contents", None)
    question_num = data.get("question_num", None)

    matching_player = Player.objects.get_or_create(house=matching_house, school_user_id=school_user_id)[0]
    for_question = get_object_or_404(Question, serial_num=question_num)
    new_submission = Submission(text_contents=text_contents, by_player=matching_player, for_question=for_question)
    ...
```


This view does three things better:
1. It only cares about things that it should care . How 


* Documentation exists for a reason.
* Don
* At the heart of all good systems is modularity.
* [You don't know how your users will use your application](https://twitter.com/brenankeller/status/1068615953989087232). Your design shouldn't have to care about it either.
