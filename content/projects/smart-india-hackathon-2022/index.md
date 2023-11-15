---
title: "EduDaan"
description: "A mobile app for facilitating volunteer tutoring that was a winner in the Government of India Smart India Hackathon 2022"
draft: false
thumbnail: "images/edudaan_logo.png"
layout: "simple"
weight: 100
timeline: "June–August 2022"
url: "sih" # define a short URL for easy sharing
xml: false
---

I built **EduDaan**, a volunteer tutoring mobile app, for the [Junior Smart India Hackathon](https://sih.gov.in) 2022, which was organised by the innovation cell of the Indian Government's Ministry of Education. The app was one of 5 winners in the 'Smart Education category', and one of 50 winners in total, amongst 3000+ submissions, in the grand finale of the hackathon.

## TL;DR

{{< alert "github" >}}
You can check out the code I wrote for the [backend](https://github.com/ArjunS07/sih-backend) and the [frontend](https://github.com/ArjunS07/sih_app) on GitHub
{{< /alert >}}

The best way to learn about the app is to check out the presentation I gave to the judges in the grand finale:

{{< raw-html >}}
<iframe src="/sih/edudaan_app_presentation_sih.pdf" width="100%" height="650px"> </iframe>
{{< /raw-html >}}

Some screenshots from the app are included below, and you can find a full folder [here](https://www.dropbox.com/sh/967xcf0lpur900e/AADiW5OEy_6xRFNqo9dOLUVHa?dl=0).

{{< figure src="images/student_app_gallery.png" >}}
{{< figure src="images/tutor_app_gallery.png" >}}
{{< figure src="images/web_app_screenshots.png" >}}

## More information

### Timeline

In April 2022, I submitted a proposal for the app in the preliminary round of the hackathon in April 2022, under the 'Smart Education' category.  In June, I was notified that my proposal was one of fifty that had been shortlisted in the category for the grand finals in August. Over July and August, I put together a complete app and fully functioning backend for the product, and gave a presentation to a panel of experts from education, technology, and the government on August 12th, 2022.

A week later, the results of the hackathon were revealed. I received the award and a ₹25,000 cash prize on August 26th, 2022 at the Noida Institute of Engineering and Technology.

{{< figure src="images/sih-grandfinal-award.jpg" >}}

### Motivation

I identified a problem and opportunity in the education space, that had become particularly pronounced during the time of COVID-19:

* Personalised attention, and one-on-one tutoring, results in dramatically improved learning outcomes, especially for younger students
* Most socioeconomic segments of students do not have the means to access to private tutoring
* There exists a vast number of people with an interest in volunteering and education, generally with the ability to teach up to the primary and lower secondary level

However, I could find no existing platform for connecting these two parties with mutual interests, and so decided to build one.

I realised that any such solution would need to satisfy a few criteria:

1. It should ensure that the requirements and abilities of a tutor match those of the student. It doesn't do much good if you put together a student and volunteer who don't speak the language, or make a tutor teach a student of an age or subject that they're not interested in.
2. It should be a place which parents are comfortable with their children spending time on, and which volunteers feel will respect their time. However, when you're making what's essentially a hyper-specialised social platform, you need to add checks and balances to make sure it doesn't devolve into a toxic, unusuable hellscape.
3. That's why a student's school, as a major stakeholder in their education, should be able to at least monitor them, and potentially contact their volunteer tutors.
4. Furthermore, users should never have to leave the app, and when absolutely necessary, the app should facilitate going off-platform.

### About the app

I created a mobile app which allowed students and volunteer tutors to find and interact with each other.

Volunteers signing up on the application would need to enter essential information abut themselves while signing up, including:

* Name
* Age and gender
* Languages and location
* Their educational qualification
* Subjects they wanted to teach, as well as the educational boards and grades which they wanted to teach them for

Students would go through the following process:

1. Enter their school's unique 6-characteric alphanumeric code (this does mean that only students whose schools have created accounts on EduDaan would be able to use it, but I decided the tradeoff was worth it)
2. Enter information about themselves, including their:
    * Name
    * Age
    * Languages and location
    * Grade and educational board
3. Upon signing up, they'd see a list of volunteers who teach their grade and board, and speak any one of the same languages as them. They'd then be able to filter that list by volunteers who teach a specific subject.
4. After finding a volunteer who matched their interests, they'd be able to send a request to them.

A volunteer has the ability to accept or reject a request. If they accepted it, a private chat room would open up between the student and volunteer. Within this room, they'd be able to:

* Engage in real-time conversations, with the ability to share media
* Initiate a private Zoom meeting
* If necessary, report the other user. This would suspend the chat room.

I also set up a web interface for school administrators (had there been more time, I'd have liked to set up a web application for tutors and students, but figured that the market I was targeting would probably prefer a mobile app anyways). This allowed them to:

* View their unique 6-character alphanumeric join code
* View all their current students using the app
* View information about each of their student's tutors
* Download logs of their student's chat rooms

### Tech Talk

This slide from my pitch sums up the tech stack pretty well:
{{< figure src="images/EduDaan_TechStack.png" alt="EduDaan tech stack: Django, DRF, PostgreSQL, Heroku, Flutter, Firebase Firestore, Flyer Chat UI, Bulma CSS, Zoom API" >}}

Some interesting notes about the tech stack listed above:

* This was also my first time working with Flutter for anything complex, and given the time pressure I was under, a lot of the code in the app was hacked together. You can see some rough edges in the layout, because I generally tried to fit stock Flutter Material UI components to my specific needs.
* I couldn't figure out a way to scale the Zoom API - I had to use my own personal API key for testing, which has a cap of 100 meetings / month. I was quite surprised by this, given that generating Zoom meetings en masse is probably something that a lot of enterprise software could probably make use of and do make use of.
* The real-time chat setup was, generally, a disaster. I initially wanted to build it using Django websockets, and had I had more time, I would have probably been able to, but I eventually ended up making it with Firebase Firestore just a few days before the finals. I used Flyer Chat to throw together a decent-looking interface quickly, but having built custom chat pages in Flutter since then, it would have probably been easier to just write a custom chat UI.
* I'd worked extensively with Django for server-rendered web applications before, but this was my first time working with Django REST Framework. Looking back at the code I wrote for the hackathon, not a lot of it makes use of the best features of DRF, and it'd probably have been better using something like FastAPI.
