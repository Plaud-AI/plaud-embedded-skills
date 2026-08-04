---
name: plaud-embedded-ios-sdk-skill
description: Skill for users to implement Plaud Embedded's iOS SDK. Use this skill when a user mentions the iOS Plaud Starter App or wants to integrate the Plaud Embedded SDK with their existing ios app
---

# Plaud Embedded iOS SDK Skill
This skill provides context and instructions on how to implement the Plaud Embedded iOS SDK.

## When To Use This Skill
Use this skill when a user wants to connect their native iOS app with Plaud recording devices (Plaud NotePin S and Plaud Note Pro).

Before getting started with this skill, make sure the user has the following prerequisites

### Prerequisites
- [ ] Already has their Plaud Embedded credentials (`CLIENT_ID`, `CLIENT_SECRET`, and `API_KEY`) from their Plaud Developer Portal
- [ ] Has a way to retrieve their User Token via Plaud's Authentication API

If a user does not have both of these prerequisites, use the `plaud-embedded-project-setup-skill` for instructions

## Getting Started

Follow the instructions in the [Installation Guide](https://docs.plaud.ai/plaud-embedded/ios-sdk.md)

**Please Note** the compatibility version requirements and the entitlements necessary for the Embedded SDK for iOS. See the [sample xCode config](references/project.yml) for how to include bundle, frameworks, and entitlements.

### Choose Your Integration Path

The Embedded SDK is a **native iOS SDK**, but there are multiple ways to use it depending on the user's stack:

1. **No existing app** → Deploy Plaud's iOS Starter App. Jump to the "How to Deploy the Plaud Starter App" section.

2. **Existing native iOS app** → Implement the SDK directly. Jump to the "How to Implement the Embedded SDK for iOS" section.

3. **React Native app** → Use Plaud's Expo Native Module. Jump to the "How to Use the Embedded SDK from React Native" section.

4. **Web app** → Wrap it into a native iOS app with Plaud's Capacitor plugin. Jump to the "How to Use the Embedded SDK from a Web App (Capacitor)" section.


#### How to Deploy the Plaud Starter App
The Plaud Starter App is a fully built out iOS app with the Embedded SDK already implemented.

The Starter App comes with [many built-out features](https://docs.plaud.ai/plaud-embedded/starter-app-specs.md) the user can immediately use.

Direct the user to clone the Starter App repo and go through the steps in the [Starter App Guide](https://docs.plaud.ai/plaud-embedded/starter-app-guide.md)

#### How to Implement the Embedded SDK for iOS
The Embedded SDK is an iOS library for :

1. Connecting (binding) and unbinding Plaud devices to the user's iOS mobile app
2. Syncing audio from Plaud devices to the user's mobile app — via BLE or WiFi Fast Transfer (~10x faster), including batch download of all recordings
3. Exporting audio in multiple formats (`.opus`, `.mp3`, `.wav`, `.pcm`)
4. Firmware over-the-air (OTA) updates for connected Plaud devices

The SDK is delegate-driven — you implement protocols (`PlaudDeviceAgentProtocol`, `AudioExportCallback`, `PlaudWiFiAgentProtocol`) to receive device events, transfer progress, and results.

Use the [iOS SDK documentation](https://docs.plaud.ai/plaud-embedded/ios-sdk.md) for the key methods and protocols included in the SDK.

For further reference, explore:

* The [SDK repo](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/sdk/ios) to view the header files in the SDK
* The [Plaud Starter App](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/plaud-template-app/ios) with the iOS Embedded SDK fully implemented
* The most relevant files to use as reference in the Starter App are:
    * [DeviceManager.swift](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/plaud-template-app/ios/PlaudTemplateApp/Managers/DeviceManager.swift)
    * [SyncManager.swift](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/plaud-template-app/ios/PlaudTemplateApp/Managers/SyncManager.swift)

## Definition of Done - Completed Implementation of the Embedded SDK
When the user can: 
- [ ] Connect Plaud devices to their mobile app
- [ ] Sync audio files from Plaud devices to their app via BLE or WiFi fast transfer
