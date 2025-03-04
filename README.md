# Invoices App

A mobile app built with React Native, Expo and Tamagui UI that shows, updates, and deletes invoices

<p align="center">
  <img src="https://reactnative.dev/img/header_logo.svg" alt="React JS" width="60"/>
  <img src="https://cdn.brandfetch.io/idzGRYC3u5/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667740799142" alt="Expo" width="60"/>
  <img src="https://cdn.brandfetch.io/idsSceG8fK/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1668829260323" alt="Supabase" width="80"/>
</p>

### Getting started

```sh
bin/pull

# Make sure to add your token
cp .env.example .env

yarn

yarn start

a - run on Android
i - run on iOS

# To run tests
npm test

```

## Some key feature/tech improvements that can be done

- As it is now, when the app has a small number of invoices (10 - 20), it works fine. If more than that, it would be nice to implement some sort of "pagination" logic that makes the API call invoices per batch ( exp: 10 each ) when scrolling down for performance purposes
- It would be nice to have a way of filtering invoices by invoice number and by date as well
- When adding invoices, specifically the date fields, the screen could have a calendar component that helps the user select and add dates more "easily"
- The form validaton is somehow "basic", could be better
- An invoice details screen that shows all details could be added to offer full data or a drop down menu in the card
- More test coverage could be added
- Sure it can be styled to look more attractive and moderm

## What might be missing for you to implement it (API limitations, technical constraints)

- I could not properly figutate out the invoice post api call, no matter what I tried, it created the invoice without invoice_lines, I'm also not clear wich are the must parameters to pass or not, the swagger page could do a better job explaning this

- There is a unit test warning that needs to be tackle

- I could not find any of this accounts when trying to invite collaborators: @julienpinquie @soyoh @LucaGaspa @greeeg

