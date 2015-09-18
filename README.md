
## Overview

LiveTesting is meant to make basic code testing simple.  Type your JavaScript into the textarea on the left, and add your test statements on the right.  That's it.  Add as many or as few as you want.

This is built with Angular, Express and Node, but all of the work is done in Angular.

## Usage

Just type stuff.  Angular binding makes it so that when you update your code and then either move off the textarea, click the button below, or hit Ctrl+Enter, all of your tests automatically run again.  Each individual test also runs again when you edit it.  Results of your tests are displayed below each text box.  Beware, eval is used to run these functions and tests.

##To-dos (i.e. wish list):

* Add CodeMirror code editors
* Some kind of design/styling (I didn't feel like doing it at the time)
* Something better than eval to run code - possibly Angular's $eval
* Persistent storage or URL encoding, for sharing stuff
* Make new tests appear immediately after clicked element in list, instead of sometimes before and sometimes after

## Contributing

There's no formal process at the moment, so just add issues or make a pull request.  Any feedback or contributions are much appreciated.  
