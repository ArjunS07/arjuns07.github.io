---
title: "Overengineering a Crypt Hunt: on /best practices/ and the evolution of a Django developer"
date: 2023-04-30T00:51:33+05:30
draft: false
type: "post"
description: "Why keeping your views fat and models thin is important in Django development, shown through two different approaches to the same problem" # used in HTML metadata
showFullContent: false 
summary: "An analysis of two different approaches I took to writing code for an intra-school event" # used in website
keywords: [] # used in HTML metadata
tags: ["Deep Dives", "Experiences", "Programming", "Django", "Python"] # used in website
---

From 2021 to 2023, I was lucky enough to be on the organising team for one of my school's largest annual events: the **Crypt Hunt**.

Inspired by collegiate [mystery](http://puzzles.mit.edu/) [hunts](https://puzzlehunt.club.cc.cmu.edu/) and [puzzle days](https://cs50.harvard.edu/x/2023/puzzles/), the Crypt Hunt involves dozens–sometimes hundreds–of students of the school working over the course of multiple days, with the rest of their houses, to tackle a series of cryptic puzzles. The answer to each puzzle was typically a short string, which must be entered on the online platform for the event.

All four times I was on the organising team (thrice for the intra-school edition, once for an inter-school version), I've led the development of the online platform for the event. The website for 2021 was the first semi-serious application with _real users_ and _real stakes_ that I had ever written; and by the 2023 iteration of the event, I'd rewritten the website from scratch four times.

Developing such a site is not a remarkably difficult programming task. But it is an unusual one. In this post, I want to compare two differing approaches I've used to design the view function which lies at the heart of the event. I'll argue why I think the most recent approach is significantly superior, from the perspective of user experience, maintainability, and extensibility–and what this has to say about Django development as a whole.

### Preface

The code for all years was written in Python with the Django framework. As in a conventional Django app, I defined model classes which directly mapped onto PostgreSQL tables in `models.py` files, and wrote view functions in `views.py` files which were triggered by requests to application endpoints. For the purposes of this post, I've modified and shortened the code to keep the focus on the core application logic.

### The code from 2021

This was the first time I'd ever coded _anything_ in Django. Here, I took what seemed like the obvious approach: at the point where forms are submitted and validated, answers should be validated and houses should be levelled up. This resulted in the creation of a few small model classes and bulky view functions in which the business logic of the app lived.

```python
# models.py
from django.conf import settings
from django.db import models
  
class House(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE...)
    level = models.IntegerField(default=1)
    levelup_time = models.DateTimeField(auto_now = True)

class Question(models.Model):
    ...
    answer = models.CharField(max_length=150)

class Submission(models.Model):
    contents = models.CharField(max_length=150)
    submitted_by = models.CharField(max_length=100)

```

```python
# app/views.py

def play(request):
    # Only contains the code for POST endpoint

    # 1. Read data from the authentication status
    house = CryptHouse.objects.get(...)
    house_question = models.Level.objects.get(serial_no=house.level)

    # 2. Read data from the form
    user_answer = ...
    user_id = ...

    # 3. Look up corresponding database objects and save them
    sub = Submission(content=user_answer, submitted_by=user_id)
    sub.save()

    # 4. Validate the submission and manipulate the database
    is_correct = utils.validate_submission(sub, initial_level)
    if is_correct:
        house.level += 1
        house.save()

    # 5. Render template response
    ...
```

This view carries out the following steps for any submission:

1. Receiving the request
2. Reading data from the request
3. Checking if the submission is correct
4. Writing information about the submission, including its correctness, to the corresponding database table
5. If the submission is correct: levelling up the house (an external object not directly involved in the request)
6. Returning a response

This design _worked_. No glitches associated with answer validation or levelling up were reported by participants. But it was far from perfect.

The first major issue is that if the application had to be extended to allow alternative means to submit answers–for example, implementing a RESTful API for a client-side application or hardware endpoint–all the validation had be duplicated in another view. The first rule of software development is not to repeat yourself, but that's exactly what I was doing here: making it more difficult to maintain the codebase over time, and increasing the possibility of inconsistent behaviour.

We saw this during testing with the admin database: adding correct answers directly to the database had no impact on the house. Only when data was entered in the database through the site was there a change in application state. It was possible for the same database state to correspond to two possible application states.

### The new and improved approach in 2023

```python
# users/models.py
class House(models.Model):
    account = models.ForeignKey(User, on_delete=models.CASCADE)
    current_question = models.ForeignKey("api.Question", on_delete=models.SET_NULL, null=True, blank=True)
    levelup_time = models.DateTimeField(null=True, blank=True, default=None)

    def advance_question(self):
        try:
            self.current_question = self.current_question.next_question
        except AttributeError:
            self.current_question = None
        self.levelup_time = make_aware(datetime.now()) # 
        self.save()

class Player(models.Model):
    school_user_id = models.CharField(max_length=100, unique=True)
    house = models.ForeignKey(House, on_delete=models.CASCADE)

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
    # Read data from the authentication status
    account = request.user
    matching_house = get_object_or_404(House, account=account)

    # Read data from the form
    school_user_id = ...
    text_contents = ...
    question_num = ...

    # Look up corresponding database objects and save them
    matching_player = Player.objects.get_or_create(house=matching_house, school_user_id=school_user_id)[0]
    for_question = get_object_or_404(Question, serial_num=question_num)
    new_submission = Submission(text_contents=text_contents, by_player=matching_player, for_question=for_question)
    new_submission.save()

    # Render template response
    ...
```

Now, the view only concerns itself with:

1. Receiving a request
2. Reading data from the request
3. Directly writing that information to the correct database table
4. Returning a response

Steps 3 and 5 from the previous approach are now missing. No longer does the view function need to know if the submission was correct. All the application logic associated with a submission is automatically triggered by the submission itself at the point of creation.

Instead, between steps 3 and 4, a series of operations in the database are automatically triggered. When created, a submission validates itself–no other external model or function ever intervenes to determine its correctness. In validating itself, it automatically calls a function on the associated house object, which then mutates itself. Only after this is step 4 executed.

Every model now contains its own business logic. That _sounds_ nice, and it definitely makes for more elegant code. But there are more important benefits. It is no longer possible to create a correct submission without levelling up the application.

The result of creating a correct submission in the database is now _deterministic_. The same operation (adding a correct answer) results in the same eventual database and application state, no matter how that operation was carried out. And if we were to extend the app, as described previously, we'd skip all the hassles associated with rewriting the same business logic again.

### So what?

It didn't take long for us to realise the benefits of minimising the role of view functions and keeping business logic as close to models as possible. When we ran short of time, the 2023 backend design allowed us to switch from a client-side JavaScript app to a conventional server-side approach without having to make any significant changes to the application logic. The only new code that had to be written was the unavoidable result of switching from POST requests that read from form submissions instead of API calls.

### Why does this matter?

In general, there's a tendency in programming to embellish ideas without justification until they seem to be no more than clever aphorisms. In the Django world, this is 'keeping views fat and models thin'. I didn't understand why this was true until I saw for myself both sides of conformity to it.

I opened this piece by talking about how the site for the crypt hunt may sem trivial to some. That's true, but it's often the simplest projects which ask the most interesting questions of developers by offering the greatest contrast in possible approaches.

To conclude, here are three takeaways from this experience which may be useful pieces of advice for newer programmers:

1. Participate in the community surrounding the technologies you use. Nothing beats documentation, books, and blog posts for actively learning a technology; but supplementing those with discussions on GitHub, Reddit, YouTube, and Hacker News ensure that you're passively engaged in thinking about new approaches to solve the same problems.

2. Trust in programming adages–the more clichéd, the better. But make sure to practically understand the downsides of not adhering to these rules as well as you practice the upsides of following them.

3. At the end of the day, prioritise functionality over elegance. It's much better to ship something that works than it is to cost your clients and users by misguided worship of 'best practices'.
