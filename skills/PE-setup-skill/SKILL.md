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

**IMPORTANT**: Plaud Embedded currently only supports the **Plaud Note Pro** and **Plaud NotePin S**. The Plaud Note and Plaud NotePin are **NOT** supported under Plaud Embedded. See the [devices doc](https://docs.plaud.ai/plaud-embedded/devices.md) for device specs.

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
2. The Embedded SDK for **iOS and Android** - enables the user's mobile app to connect to Plaud devices and sync recording files
3. The Transcription API - An API (can be used on mobile or from backend) to upload audio files and receive transcriptions

**NOTE**: The Android Embedded SDK is generally available and has **full feature parity with iOS** (scanning, connection, recording, file listing/sync/delete, settings, WiFi provisioning, WiFi fast transfer, and OTA). See the [Embedded changelog](https://docs.plaud.ai/plaud-embedded/changelog.md) for the current release state.

Read [these docs](https://docs.plaud.ai/plaud-embedded/how-plaud-embedded-works.md) for a high-level view on how Plaud Embedded's components work together.

## How to Set Up the User's Project for Plaud Embedded

1. If a user does not have their Plaud Embedded application created yet: Use [this guide](https://docs.plaud.ai/plaud-embedded/quickstart.md) to help the user create their Plaud Embedded application, retrieve their `CLIENT_ID`, `CLIENT_SECRET`, and `API_KEY`
    * They can do this on the [Plaud Developer Portal](https://portal.plaud.ai)
2. Once a user has their Plaud Embedded credentials, use [this guide on Plaud authentication](https://docs.plaud.ai/plaud-embedded/auth-api-overview.md) to build a server-side endpoint OR a script (if testing locally) to generate a user token
    * Use this [user-token-script.ts](references/user-token-script.ts) for reference on how to retrieve a partner and a user token
    * Alternatively, use the [Plaud Embedded API Playground](https://plaud-embedded-playground.vercel.app/) to generate tokens and walk through the full flow (authentication → recording → uploading → transcription) with your own client credentials
    
<Note>
    The **Partner Token** is application-level (Basic auth with `client_id:secret_key`) and is used to mint **User Tokens**. A User Token is user-level and is what the Embedded SDK and the File Upload API accept

    The `user_id` you mint a User Token for should be a **stable ID, 6–120 characters**
</Note>

After a user has their Plaud Embedded credentials and authentication setup, they're ready to start building with the **Plaud Embedded SDK and the Transcription API**! 

The Embedded SDK supports both native iOS and android. If the user wants to setup a native app:

1. Use the `plaud-embedded-ios-sdk-skill` for native iOS apps
2. Use the `plaud-embedded-android-sdk-skill` for native Android apps

If the user is NOT building a native app, the Embedded SDK can also be used as a native plugin:

1. A **React Native** app via Plaud's Expo Native Module ([docs](https://docs.plaud.ai/plaud-embedded/react-native.md)) — repo: [embedded-react-native](https://github.com/Plaud-AI/embedded-react-native)
2. A **Flutter** app via Flutter's platform channels and native plugins ([docs](https://docs.plaud.ai/plaud-embedded/flutter.md)) — repo: [embedded-flutter](https://github.com/Plaud-AI/embedded-flutter)
3. A **web app** wrapped into a native iOS app via Plaud's Capacitor plugin ([docs](https://docs.plaud.ai/plaud-embedded/web-app-wrapper.md)) — repo: [embedded-capacitor](https://github.com/Plaud-AI/embedded-capacitor)

Each of these plugins implements the basics (device connection, file sync, transcription). For advanced usage like WiFi Fast Transfer, add methods to the plugin or use the native iOS SDK directly.

## Authentication API Reference
* [Get Partner Token API](https://docs.plaud.ai/api-reference/authentication-api/get-partner-token.md)
* [Refresh Partner Token API](https://docs.plaud.ai/api-reference/authentication-api/refresh-partner-token.md)
* [Get User Token API](https://docs.plaud.ai/api-reference/authentication-api/get-user-token.md)
