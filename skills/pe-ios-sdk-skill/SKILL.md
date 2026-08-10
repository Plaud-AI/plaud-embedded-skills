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

### Compatibility Requirements

| Requirement | Value |
| ---- | ---- |
| iOS deployment target | 14.0+ |
| Xcode | 16.0+ (the SDK is built with Swift 6.0.3) |
| Architecture | `arm64` **physical devices only — the iOS Simulator is NOT supported** |

The SDK ships as pre-built frameworks, cloned from [plaud-sdk-public](https://github.com/Plaud-AI/plaud-sdk-public) at `sdk/ios/`:

| Framework | Xcode action |
| ---- | ---- |
| `PlaudBleSDK.framework` | Embed & Sign |
| `PlaudWiFiSDK.framework` | Embed & Sign |
| `PlaudDeviceBasicSDK.framework` | Embed & Sign |
| `PlaudDeviceBasicSDK.bundle` | Copy Bundle Resources |

**Please Note** the entitlements necessary for the Embedded SDK for iOS — WiFi Fast Transfer requires the `Hotspot Configuration` entitlement. See the [sample xCode config](references/project.yml) for how to include the bundle, frameworks, and entitlements.

### Choose Your Integration Path

The Embedded SDK is a **native iOS SDK**, but there are multiple ways to use it depending on the user's stack:

| User's stack | Path | Where to go |
| ---- | ---- | ---- |
| No existing app | Deploy Plaud's iOS Starter App | "How to Deploy the Plaud Starter App" below |
| Existing native iOS app | Implement the SDK directly | "How to Implement the Embedded SDK for iOS" below |
| React Native app | Plaud's Expo Native Module | [React Native docs](https://docs.plaud.ai/plaud-embedded/react-native.md) · [embedded-react-native](https://github.com/Plaud-AI/embedded-react-native) |
| Flutter app | Plaud's `plaud_sdk` Flutter plugin | [Flutter docs](https://docs.plaud.ai/plaud-embedded/flutter.md) · [embedded-flutter](https://github.com/Plaud-AI/embedded-flutter) |
| Web app | Wrap into a native iOS app with Plaud's Capacitor plugin | [Web app wrapper docs](https://docs.plaud.ai/plaud-embedded/web-app-wrapper.md) · [embedded-capacitor](https://github.com/Plaud-AI/embedded-capacitor) |

The React Native, Flutter, and Capacitor plugins implement the basics (device connection, file sync, transcription). For advanced usage like WiFi Fast Transfer, add methods to the plugin or use the native iOS SDK directly.

#### How to Deploy the Plaud Starter App
The Plaud Starter App is a fully built out iOS app with the Embedded SDK already implemented.

The Starter App comes with [many built-out features](https://docs.plaud.ai/plaud-embedded/starter-app-specs.md) the user can immediately use.

Direct the user to clone the Starter App repo and go through the steps in the [Starter App Guide](https://docs.plaud.ai/plaud-embedded/ios-starter-app.md)

**IMPORTANT**: `PlaudTemplateApp.xcodeproj` is **not** in source control — it is generated from `project.yml`. The user must install [XcodeGen](https://github.com/yonaskolb/XcodeGen) (`brew install xcodegen`) and run `xcodegen generate` before opening the project, and re-run it after any `project.yml` edit.

Credentials go in `PartnerConfig.xcconfig` (`USER_ACCESS_TOKEN`, `PLAUD_CLIENT_ID`, `PLAUD_API_KEY`). For local development, create a gitignored `PartnerConfig.local.xcconfig` alongside it, which overrides the placeholders.

#### How to Implement the Embedded SDK for iOS
The Embedded SDK is an iOS library for :

1. Connecting (binding) and unbinding Plaud devices to the user's iOS mobile app
2. Syncing audio from Plaud devices to the user's mobile app — via BLE or WiFi Fast Transfer (~10x faster), including batch download of all recordings
3. Exporting audio in multiple formats — `.pcm` (0), `.mp3` (1), `.wav` (2), `.opus` (3). **Recommend `.mp3`** — it plays everywhere and is accepted directly by the transcription upload API
4. Firmware over-the-air (OTA) updates for connected Plaud devices

The two high-level facades are **`PlaudDeviceAgent`** (BLE lifecycle, file sync, firmware) and **`PlaudWiFiAgent`** (WiFi Fast Transfer), both reached through their `.shared` singleton. Initialize once with `initSDK(userAccessToken:customDomain:)`, where `customDomain` is the Plaud domain **without** the `https://` prefix (e.g. `platform-us.plaud.ai`).

The SDK is delegate-driven — you implement protocols (`PlaudDeviceAgentProtocol`, `AudioExportCallback`, `PlaudWiFiAgentProtocol`) to receive device events, transfer progress, and results.

**IMPORTANT**: Plaud devices can only be bound to **one application at a time**. Warn the user to **unbind the device before uninstalling their app** — otherwise it cannot be bound to another app (or the Plaud app) until it is recovered.

**NOTE**: Plaud devices record **up to 5 hours** per file. Longer recordings should be broken up.

Use the [iOS SDK documentation](https://docs.plaud.ai/plaud-embedded/ios-sdk.md) for the key methods and protocols included in the SDK.

For behavior the high-level facades don't expose, see the [Advanced iOS SDK usage docs](https://docs.plaud.ai/plaud-embedded/advanced-ios-sdk.md), which cover the low-level `BleAgent`, `WiFiAgent`, and `PlaudPartnerApiManager`. High-level and low-level facades can be mixed, but **the high-level facades should stay the main driver** — they handle the partner pre-handshake, E2EE decryption, audio format conversion, and parameter validation that the low-level agents do not.

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
- [ ] Unbind a Plaud device from their app (over both cloud and BLE)
