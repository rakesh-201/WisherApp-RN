# My Wisher


## Screenshots

![image](https://play-lh.googleusercontent.com/sT9Li9ChQFaecaXY5qgKO7WhmD7xx2-MWQLt4K8RDEbx_YO-XlfBa7OjQzk0W1bLyNo=w720-h310-rw)
![image](https://play-lh.googleusercontent.com/1GcF86n2j_nCjfdLL9YDG6jhA_yRS7FnhcQjxxt-_-aqlC24ay7OvPq5qB-KbPKE4w=w720-h310-rw)
![image](https://play-lh.googleusercontent.com/lQ81-5tauStJeSfOIZJrclvh9cf4ZUQEp990ZQ1-eJyzfTm1n3CFmQ56xBxiPJhVKcGX=w720-h310-rw)
![image](https://play-lh.googleusercontent.com/vll2HyIuyJrwon27bAwS6wsKeZFnINQrJ3JInvxyc-4hoHz-wccKixHf61r2SvJgsew=w720-h310-rw)

## Description

As the name suggests, this is an app which wishes people whom you wanna wish on their special day like birthday, anniversary or any other day.

What you have to do is to add the person's special day's ( say birthday's ) date along with a short message and save it in this app, rest all is managed by us.

This app will send you a notification on that saved day at 12 (mid-night) and upon clicking on that notification you will be directed to a page where you will be asked to confirm the sending of the message, and upon doing that the message will be send to the respective person.

This is one of our best apps and we are constantly working on it.

Hope you'll enjoy using it.

## Some Features

- Wishing through Email
- Wishing through SMS
- Dark Theme
- Image adding feature

## Links:

- Website link: [Website link here](https://bit.ly/my-wisher)

## Challenges

- SMS Sending Feature
  - Although there are various APIs available for sending SMS, non of them is free. 
  - So finding a way to integrate the SMS functionality at a cheaper to zero cost was a task. 
  - However, I did found a work around using Expo's services which helped do this quite comfortably with zero cost.

- Notification Redirection Issue
  - Upon clicking on the notification received, the user gets redirected to the email sending screen.
  - However, because of some internal working of the notification system, this redirection sometimes don't quite work in some mobiles.
  - Moreover, I tried to reduce this issues, but for some older mobiles this issue still exist.
  - For such mobiles, I successfully found a work around, which is to fisrt open `My Wisher` app and then click on the notification.
  - Doing this revolves the issue.

## Technology stack

- React Native
- Redux
- SQLite

## Applications

- Helps avoiding the need of remembering the birthday and other dates.
- Also no need of typing messages for wishing, at 12 mid night, as the messages can be presaved.

## Future scope

- The Performance can be improved by using Cloud Functions for sending Emails and SMS.
