# ChatApp



https://github.com/lorayoconnell/angular-chat-app


I can't get the build --prod to work
because I keep getting this error:
ERROR in src/app/chat-message/chat-message.component.html(6,29): Expected 2 arguments, but got 1.

looking online, it's some kind of Angular 8 migration issue where @ViewChild needs to
take 2 parameters instead of 1. I can't figure out how to incorporate @ViewChild into my
chat-message.component.ts
There's some kind of issue about nested queries & when the change detection occurs.

if I remove this line:
 <!--<p class="time">{{message.author}} • {{message.sentAt | fromNow}}</p>-->
ng build --prod  
works, but the code worked ok prior to prod build
So I removed it just to create the dist

but I still can't get the dist to run.......







completed requirements
completed extra credit = logout of the app
didn't complete the uploading of msgs to firebase db


1. Expand on the chat application from the reading by adding a login component, an authguard, blocking unauthorized users from navigating to the chat component, and add firebase authentication.

2. when the user successfully logs in, the application routes to the chat application.

3. when the user login is unsuccessful the chat component route is guarded from unauthorized users

4. when the user would like to chat they click on an icon fixed in the bottom right corner

5. when the user is done chatting they can click the fixed icon to toggle or hide the display of the chat component.

6. Extra credit:  When the user clicks the logout button in the logout component, the user is signed out of the chat application.

7. Extra credit: when a user enters messages upload the messages to a thread list or messages list in the firebase database.




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
