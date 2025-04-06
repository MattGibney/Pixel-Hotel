---
title: Refactor
date: 2025-04-06
author: Matt Gibney
tags: [prototyping, refactor]
---

After nearly a year of sitting dormant, I'm back to working on the server again.
I hit a bit of a wall before and I couldn't figure out how to get past it. I
have a general rule that I go by when it comes to software development. If it's
hard to do, then it's probably wrong. It doesn't always apply, but it's a good
rule of thumb.

The approach I was taking before was modelled after a similar approach to a REST
API. While it technically works, it doesn't feel right. Especially onsidering
the call and response nature of the websocket protocol that Habbo uses. I found
the approach I was taking to be too messy and difficult to work with. I was
getting lost in the code and I couldn't figure out how to get it to work.

## The New Approach

After coming back with fresh eyes, I decided to take a different approach. I
now have seperate functions for handling both incoming and outgoing requests.
This approach makes it much easier to follow the flow of the code and understand
what's going on. It's also much easier to re-use these commands without having
to repeat code. I can now easily add new commands and handle them in a
consistent way.

## A better development environment

Another drastic improvement I've made over a year ago is my development
environment. The original Habbo Clients were built with Macromedia Shockwave.
This is a proprietary technology that is no longer supported. It's also very,
very dead. It may be possible to continue to use it on Windows systems, but I
don't have access to a Windows machine. I did consider purchasing an old Windows
laptop, but it's a bit extreme to do so simply to run Habbo Hotel.

I discovered [UTM](https://mac.getutm.app/), a virtual machine application for
macOS that is capable of emulating the x86 architecture. This allows me to run
Windows XP SP3 in a virtual machine. I can now run the original Habbo Client and
test my server with it. It's honestly pretty remarkable how well it works.
Considering it's fully emulating the CPU, the performance is exactly what I
would expect from a 20 year old machine. I guess it just goes to show how
incredibly capable the Apple Silicon chips are. I can run a full Windows XP VM
and my CPU and RAM usage is still under 10%. It's pretty impressive!

With the ability to easily spin up a Windows XP VM, I can now run the original
Habbo Client on Internet Explorer 8. Truly taking me all the way back to 2001.

## Documentation

One of my goals for this project is to document everything as I go. I think it's
interesting to be able to look back on some of this old tech and understand how
it works. It's easy to laugh at it now, but back in the day, this was cutting
edge technology. I want to be able to share this with others and help them
understand how it works, and to understand the limitations of computers back
then. I also want to be able to look back on this in 20 years and remember how
far we've come.

## Next Steps

Before I stopped working on this nearly a year ago, I was in a position where I
could have multiple users in the same space as one another and able to
communicate with words using the chat feature. I had just begun to work on
navigation implementing simple path finding for waklking around the room, but
that's where I stopped as I kept hitting walls with the approach I was taking.

The new approach will make this significantly easier, so I plan to get back to
that same state first. Once I am able to walk around and chat with multiple
users, i'll move onto the next phase of the project.

--

Thanks for reading. I hope you enjoy the journey with me. I'm not sure where
this project will take me but I'm excited to find out. If you have any questions
or comments then please feel free to reach out to me. I'm always happy to chat
about my projects.

- Matt
