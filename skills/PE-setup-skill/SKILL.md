---
name: plaud-embedded-project-setup-skill
description: Skill for users to get started building with Plaud Embedded. Use this skill when a user is first setting up their mobile app (or backend) with Plaud Embedded
---

# Plaud Embedded Project Setup Skill
This skills provides:

1. Context on what Plaud Embedded is 
2. Instructions for setting up Plaud Embedded either in a new project or in an existing project

## When To Use This Skill
Use this skill if a user doesn't have the Plaud Embedded SDK or APIs implemented yet.

**NOTE: If the user already has their Plaud client credentials, API, key, and authentication setup, consider using 
the `plaud-embedded-mobile-sdk-skill` or the `plaud-embedded-transcription-api-skill`**

For example, a user may ask
- How to get started with Plaud Embedded
- How to start implementing the Embedded SDK for their ios or android app
- How to connect their application to a Plaud device (i.e. Plaud NotePin S or Plaud Note Pro)
- How to authenticate to Plaud and grab partner and user tokens

## Context on Plaud and Plaud Embedded

Plaud is an industry leader in **recording devices for AI Note Taking and Conversation Recording**.

Plaud devices include the:

* Plaud Note Pro: thin card-like device that can inserted in a phone card holder to record phone calls and in-person conversations
* Plaud NotePin S: wearable pin for recording in-person conversations

Common use cases for Plaud devices include:

1. Doctors using Plaud to transcribe their patient visits
2. Field sales reps using Plaud to AI-generate notes on their meetings

Plaud's strength is not only their hardware, but also their ASR models for audio transcription.

---

**Plaud Embedded** is part of Plaud's developer platform for users **to build their own products** that integrate with:

1. Plaud devices (Plaud NotePin S and Plaud Note Pro)
2. Plaud's SOTA transcription models

The core components of Plaud Embedded are:

1. The Plaud Developer Portal - users should create an application on the portal to receive their client credentials
2. The Embedded SDK for iOS (Android coming soon) - enables the user's mobile app to connect to Plaud devices and sync recording files
3. The Transcription API - An API (can be used on mobile or from backend) to upload audio files and receive transcriptions

Read [these docs](https://docs.plaud.ai/plaud-embedded/how-plaud-embedded-works.md) for a high-level view on how Plaud Embedded's components work together.

## How to Set Up the User's Project for Plaud Embedded

1. If a user does not have their Plaud Embedded application created yet: Use [this guide](https://docs.plaud.ai/plaud-embedded/quickstart.md) to help the user create their Plaud Embedded application, retrieve their `CLIENT_ID`, `CLIENT_SECRET_KEY`, and `API_KEY`
    * They can do this on the [Plaud Developer Portal](https://portal.plaud.ai)
2. Once a user has their Plaud Embedded credentials, use [this guide on Plaud authentication](https://docs.plaud.ai/plaud-embedded/auth-api-overview.md) to build a server-side endpoint OR a script (if testing locally) to generate a user token
    * **IMPORTANT**: Confirm the Region URL with the user
    * Use this [user-token-script.ts](references/user-token-script.ts) for reference on how to retrieve a partner and a user token
        * Note: The script uses the US region as the base URL

After a user has their Plaud Embedded credentials and authentication setup, they're ready to start building with the **Plaud Embedded SDK (currently only for iOS, Android coming soon) and the Transcription API**! 

Once they're ready, use the `plaud-embedded-mobile-sdk-skill` and the `plaud-embedded-transcription-api-skill` to help the user implement the Embedded SDK and Transcription API

## Authentication API Reference
* [Get Partner Token API](https://docs.plaud.ai/api-reference/authentication-api/get-partner-token.md)
* [Refresh Partner Token API](https://docs.plaud.ai/api-reference/authentication-api/refresh-partner-token.md)
* [Get User Token API](https://docs.plaud.ai/api-reference/authentication-api/get-user-token.md)
