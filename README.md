# Invoices App

A mobile app that shows, updates and deletes invoices


### Getting started

```sh
bin/pull

# Make sure to add your token
cp .env.example .env

yarn

yarn start

a - run on Android
i - run on iOS

```

## Some key feature/tech improvements that can be done

- As it is now, when the app has a small number of invoices (10 - 20), it works fine. If more than that, it would be nice to implement some sort of "pagination" logic that makes the API call invoices per batch ( exp: 10 each ) when scrolling down for performance purposes
- It would be nice to have a way of filtering invoices by invoice number and by date as well
- When adding invoices, specifically the date fields, the screen could have a calendar component that helps the user select and add dates more "easily"
- The form validaton is somehow "basic", could be better
- An invoice details screen that shows all details could be added to offer full data information to the user
- More test coverage could be added
- Sure it can be styled to look more attractive and moderm

## What might be missing for you to implement it (API limitations, technical constraints)

- I could not properly figutate out the invoice post api call, no matter what I tried, it created the invoice without invoice_lines, I'm also not clear wich are the must parameters to pass or not, the swagger page could do a better job explaning this

- I could not find any of this accounts when trying to invite collaborators: @julienpinquie @soyoh @LucaGaspa @greeeg

