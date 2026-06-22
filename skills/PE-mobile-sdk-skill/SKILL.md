---
name: plaud-embedded-mobile-sdk-skill
description: Skill for users to implement Plaud Embedded's iOS SDK. Use this skill when a user mentions the Plaud Starter App or wants to integrate the Plaud Embedded SDK with their existing mobile app
---

# Plaud Embedded Mobile SDK Skill
This skill provides context and instructions on how to implement the Plaud Embedded SDK (currently iOS only, Android SDK coming soon).

## When To Use This Skill
Use this skill when a user wants to connect their mobile app with Plaud recording devices (Plaud NotePin S and Plaud Note Pro).

Before getting started with this skill, make sure the user has the following prerequisites

### Prerequisites
- [ ] Already has their Plaud Embedded credentials (`CLIENT_ID`, `CLIENT_SECRET`, and `API_KEY`) from their Plaud Developer Portal
- [ ] Has a way to retrieve their User Token via Plaud's Authentication API

If a user does not have both of these prerequisites, use the `plaud-embedded-project-setup-skill` for instructions

## Getting Started

Follow the instructions in the [Installation Guide](https://docs.plaud.ai/plaud-embedded/ios-sdk.md)

**Please Note** the compatibility version requirements and the entitlements necessary for the Embedded SDK for iOS. See the [sample xCode config](references/project.yml) for how to include bundle, frameworks, and entitlements.

### Two Ways to Start

1. If the user does NOT have an existing mobile app, and would like to use Plaud's Starter App, jump to the "How to Deploy the Plaud Starter App" section

2. If the user already has an existing mobile app they're working on, jump to the section on "How to Implement the Embedded SDK for iOS"


#### How to Deploy the Plaud Starter App
The Plaud Starter App is a fully built out iOS app with the Embedded SDK already implemented.

The Starter App comes with [many built-out features](https://docs.plaud.ai/plaud-embedded/starter-app-specs.md) the user can immediately use.

Direct the user to clone the Starter App repo and go through the steps in the [Starter App Guide](https://docs.plaud.ai/plaud-embedded/starter-app-guide.md)

#### How to Implement the Embedded SDK for iOS
The Embedded SDK is an iOS library for :

1. Connecting (binding) Plaud devices to the user's iOS mobile app
2. Syncing audio from Plaud devices to the user's mobile app

Use the [iOS SDK documentation](https://docs.plaud.ai/plaud-embedded/ios-sdk.md) for the key methods and protocols included in the SDK.

For further reference, explore:

* The [SDK repo](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/sdk/ios) to view the header files in the SDK
* The [Plaud Starter App](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/plaud-template-app/ios) with the iOS Embedded SDK fully implemented
* The most relevant files to use as reference in the Starter App are:
    * [DeviceManager.swift](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/plaud-template-app/ios/PlaudTemplateApp/Managers/DeviceManager.swift)
    * [SyncManager.swift](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/plaud-template-app/ios/PlaudTemplateApp/Managers/SyncManager.swift)

#### How to Implement the Embedded SDK for Android
The Embedded SDK for Android is not out yet! Get started with using the SDK for the user's iOS in the meantime.

## Definition of Done - Completed Implementation of the Embedded SDK
When the user can: 
- [ ] Connect Plaud devices to their mobile app
- [ ] Sync audio files from Plaud devices to their app via BLE or WiFi fast transfer
