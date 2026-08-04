---
name: plaud-embedded-android-sdk-skill
description: Skill for users to implement Plaud Embedded's Android SDK. Use this skill when a user mentions the Android Plaud Starter App or wants to integrate the Plaud Embedded SDK with their existing android app
---

# Plaud Embedded Android SDK Skill
This skill provides context and instructions on how to implement the Plaud Embedded Android SDK.

## When To Use This Skill
Use this skill when a user wants to connect their native Android app with Plaud recording devices (Plaud NotePin S and Plaud Note Pro).

Before getting started with this skill, make sure the user has the following prerequisites

### Prerequisites
- [ ] Already has their Plaud Embedded credentials (`CLIENT_ID`, `CLIENT_SECRET`, and `API_KEY`) from their Plaud Developer Portal
- [ ] Has a way to retrieve their User Token via Plaud's Authentication API

If a user does not have both of these prerequisites, use the `plaud-embedded-project-setup-skill` for instructions

**Please Note** the compatibility version requirements and the entitlements necessary for the Embedded SDK for Android. See the [sample build.gradle config](references/build.gradle) for how to build a project with the Android SDK.

## Getting Started

Follow the instructions in the [Installation Guide](https://docs.plaud.ai/plaud-embedded/android-sdk.md)

### How to Deploy the Plaud Starter App
The Plaud Starter App is a fully built out Android app with the Embedded SDK already implemented.

The Starter App comes with [many built-out features](https://docs.plaud.ai/plaud-embedded/starter-app-specs.md) the user can immediately use.

Direct the user to clone the Starter App repo and go through the steps in the [Starter App Guide](https://docs.plaud.ai/plaud-embedded/starter-app-guide.md)

### How to Implement the Embedded SDK for iOS
The Embedded SDK is an Android library for :

1. Connecting (binding) and unbinding Plaud devices to the user's iOS mobile app
2. Syncing audio from Plaud devices to the user's mobile app — via BLE or WiFi Fast Transfer (~10x faster), including batch download of all recordings
3. Exporting audio in multiple formats (`.opus`, `.mp3`, `.wav`, `.pcm`)
4. Firmware over-the-air (OTA) updates for connected Plaud devices

The SDK is a callback-driven library - you implement callbacks (`PlaudDeviceAgentListener`, `AudioExporter.ExportCallback`, `IWifiTransferAgent.WifiTransferCallback`) to receive device events, transfer progress, and results.

Use the [Android SDK documentation](https://docs.plaud.ai/plaud-embedded/android-sdk.md) for the key methods and protocols included in the SDK.

For further reference, explore:

* The [SDK repo](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/sdk/android/plaud-adk.aar) to view the header files in the SDK
* The [Plaud Starter App](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/android) with the iOS Embedded SDK fully implemented
* The most relevant files to use as reference in the Starter App are:
    * [DeviceManager.swift](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/android/app/src/main/java/com/plaud/template/managers/DeviceManager.kt)
    * [SyncManager.swift](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/blob/main/android/app/src/main/java/com/plaud/template/managers/SyncManager.kt)

## Definition of Done - Completed Implementation of the Embedded SDK
When the user can: 
- [ ] Connect Plaud devices to their mobile app
- [ ] Sync audio files from Plaud devices to their app via BLE or WiFi fast transfer
